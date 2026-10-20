import {
  Rule,
  ForwardStep,
  ForwardChainingResult,
  DerivedConclusion,
  UnmatchedRuleInfo,
} from '../types';
import { RULES_DATA } from '../data/rules';
import {
  deduplicateFacts,
  isRuleSatisfied,
  getSatisfiedConditions,
  getMissingConditions,
  generateRuleExplanation,
} from './ruleMatcher';

export interface ForwardChainingOptions {
  rules?: Rule[];
  maxIterations?: number;
}

/**
 * Executes a pure Forward Chaining (data-driven) inference cycle.
 *
 * Algorithm:
 * 1. Initialize working memory with user-provided symptom facts.
 * 2. Iteratively evaluate all rules in the knowledge base.
 * 3. In each iteration, identify rules whose conditions are fully satisfied by working memory.
 * 4. Fire applicable rules, add derived conclusions to working memory, and record step traces.
 * 5. Allow newly added facts to satisfy chained rules in subsequent passes.
 * 6. Halt when a complete pass produces no new facts or maxIterations is reached.
 */
export function runForwardChaining(
  initialFacts: any[],
  options: ForwardChainingOptions = {}
): ForwardChainingResult {
  const startTime = performance.now();
  const rules = options.rules ?? RULES_DATA;
  const maxIterations = options.maxIterations ?? 50;

  // Initialize working memory with deduplicated facts
  const cleanFacts = deduplicateFacts(initialFacts);
  const workingMemory = new Set<string>(cleanFacts);
  const initialMemorySnapshot = Array.from(workingMemory);

  const steps: ForwardStep[] = [];
  const firedRules: Rule[] = [];
  const firedRuleIds = new Set<string>();
  const derivedConclusions: DerivedConclusion[] = [];
  const evaluatedRuleIds = new Set<string>();

  let iteration = 0;
  let newFactAdded = true;
  let stepNumber = 1;

  while (newFactAdded && iteration < maxIterations) {
    iteration++;
    newFactAdded = false;

    for (const rule of rules) {
      evaluatedRuleIds.add(rule.id);

      const satisfiedConditions = getSatisfiedConditions(rule, workingMemory);
      const missingConditions = getMissingConditions(rule, workingMemory);
      const isSatisfied = isRuleSatisfied(rule, workingMemory);

      if (firedRuleIds.has(rule.id)) {
        // Rule already fired in a previous iteration
        continue;
      }

      if (isSatisfied) {
        // Fire the rule
        firedRuleIds.add(rule.id);
        firedRules.push(rule);

        const isNewFact = !workingMemory.has(rule.conclusion);
        if (isNewFact) {
          workingMemory.add(rule.conclusion);
          newFactAdded = true;
        }

        const explanation = generateRuleExplanation(
          rule,
          satisfiedConditions,
          missingConditions,
          'FIRED'
        );

        steps.push({
          stepNumber: stepNumber++,
          ruleId: rule.id,
          ruleTitle: rule.title,
          conditionsEvaluated: [...rule.conditions],
          conditionsSatisfied: satisfiedConditions,
          missingConditions: [],
          actionTaken: 'FIRED',
          explanation,
          workingMemorySnapshot: Array.from(workingMemory),
          derivedFact: rule.conclusion,
        });

        // If this is a clinical pattern conclusion (not an internal intermediate marker), record it
        if (!rule.isIntermediate) {
          const unreported = (rule.associatedSymptoms ?? []).filter(
            (s) => !workingMemory.has(s)
          );

          derivedConclusions.push({
            id: rule.conclusion,
            title: rule.conclusionTitle,
            category: rule.category,
            supportingRuleId: rule.id,
            supportingRuleTitle: rule.title,
            supportingSymptoms: satisfiedConditions,
            unreportedAssociatedSymptoms: unreported,
            explanation: rule.explanation,
            references: rule.references,
            nextSteps: rule.nextSteps,
            clinicalContext: rule.clinicalContext,
            homeCare: rule.homeCare,
            urgencyLevel: rule.urgencyLevel,
            ruleConditions: [...rule.conditions],
          });
        }
      } else {
        // Record unmatched rule evaluation in the first iteration for transparent reporting
        if (iteration === 1) {
          const explanation = generateRuleExplanation(
            rule,
            satisfiedConditions,
            missingConditions,
            'SKIPPED_UNMATCHED'
          );

          steps.push({
            stepNumber: stepNumber++,
            ruleId: rule.id,
            ruleTitle: rule.title,
            conditionsEvaluated: [...rule.conditions],
            conditionsSatisfied: satisfiedConditions,
            missingConditions,
            actionTaken: 'SKIPPED_UNMATCHED',
            explanation,
            workingMemorySnapshot: Array.from(workingMemory),
          });
        }
      }
    }
  }

  // Calculate unmatched rules list for transparent explanation
  const unmatchedRules: UnmatchedRuleInfo[] = rules
    .filter((rule) => !firedRuleIds.has(rule.id) && !rule.isIntermediate)
    .map((rule) => ({
      rule,
      satisfiedConditions: getSatisfiedConditions(rule, workingMemory),
      missingConditions: getMissingConditions(rule, workingMemory),
    }));

  const endTime = performance.now();
  const executionTimeMs = Math.max(0.1, Number((endTime - startTime).toFixed(2)));

  const filteredOutConclusionIds = rules
    .filter((r) => r.isIntermediate && firedRuleIds.has(r.id))
    .map((r) => r.conclusion);

  const diagnostics = {
    selectedSymptomIds: Array.from(cleanFacts),
    initialWorkingMemory: initialMemorySnapshot,
    totalRulesLoaded: rules.length,
    rulesEvaluatedCount: evaluatedRuleIds.size,
    rulesFiredCount: firedRules.length,
    firedRuleIds: firedRules.map((r) => r.id),
    derivedConclusionIds: derivedConclusions.map((c) => c.id),
    unmatchedRuleIds: unmatchedRules.map((u) => u.rule.id),
    filteredOutConclusionIds,
    executionTimeMs,
  };

  return {
    method: 'forward',
    initialWorkingMemory: initialMemorySnapshot,
    finalWorkingMemory: Array.from(workingMemory),
    conclusions: derivedConclusions,
    firedRules,
    unmatchedRules,
    rulesEvaluatedCount: evaluatedRuleIds.size,
    rulesFiredCount: firedRules.length,
    iterations: Math.max(1, iteration - 1),
    steps,
    executionTimeMs,
    diagnostics,
  };
}
