import {
  Rule,
  BackwardStep,
  BackwardSubGoal,
  BackwardChainingResult,
  GoalStatus,
  DerivedConclusion,
  UnsupportedGoalInfo,
} from '../types';
import { RULES_DATA } from '../data/rules';
import {
  deduplicateFacts,
  findRulesForConclusion,
  formatFactName,
  getNonIntermediateConclusions,
  getSatisfiedConditions,
} from './ruleMatcher';

export interface BackwardChainingOptions {
  rules?: Rule[];
  targetGoals?: string[];
  maxDepth?: number;
}

/**
 * Executes a recursive Goal-Driven Backward Chaining algorithm.
 *
 * Algorithm:
 * 1. Takes one or more target hypothesis goals (e.g., 'common_cold_pattern').
 * 2. Checks if goal is already directly established in working memory.
 * 3. Finds all production rules that can derive the target goal.
 * 4. For each candidate rule, recursively proves prerequisite conditions (subgoals).
 *    Supports explicit alternative prerequisite groups (conditionGroups) and OR semantics.
 * 5. Uses cycle-detection stack to prevent infinite recursion on cyclic knowledge bases.
 * 6. Adds successfully proven subgoals to working memory for subsequent branches.
 * 7. Records the complete reasoning tree and step-by-step trace.
 */
export function runBackwardChaining(
  initialFacts: any[],
  options: BackwardChainingOptions = {}
): BackwardChainingResult {
  const startTime = performance.now();
  const rules = options.rules ?? RULES_DATA;

  // Initial working memory with deduplicated facts
  const cleanFacts = deduplicateFacts(initialFacts);
  const workingMemory = new Set<string>(cleanFacts);

  // Targets to verify: either user-specified or all non-intermediate conclusions
  const targetGoals =
    options.targetGoals && options.targetGoals.length > 0
      ? options.targetGoals
      : getNonIntermediateConclusions(rules).map((c) => c.id);

  const goalTrees: BackwardSubGoal[] = [];
  const steps: BackwardStep[] = [];
  const supportedGoals: DerivedConclusion[] = [];
  const unsupportedGoals: UnsupportedGoalInfo[] = [];

  const evaluatedRuleIds = new Set<string>();
  const firedRuleIds = new Set<string>();

  let stepCounter = 1;

  // Active stack of goals currently being evaluated on this recursive path (for cycle detection)
  const activeGoalStack = new Set<string>();

  function evaluateGoal(
    goal: string,
    depth: number = 0
  ): BackwardSubGoal {
    const goalTitle = formatFactName(goal, rules);

    // 1. Cycle detection
    if (activeGoalStack.has(goal)) {
      const cycleStep: BackwardStep = {
        stepNumber: stepCounter++,
        currentGoal: goal,
        requiredPrerequisites: [],
        factsVerified: [],
        missingPrerequisites: [goal],
        subgoalStatus: 'CYCLE_DETECTED',
        explanation: `Recursive cycle detected: Goal "${goalTitle}" is already active in the evaluation call stack. Aborting branch to prevent infinite recursion.`,
      };
      steps.push(cycleStep);

      return {
        goal,
        goalTitle,
        status: 'CYCLE_DETECTED',
        requiredPrerequisites: [],
        factsVerified: [],
        missingPrerequisites: [goal],
        subgoals: [],
        explanation: `Cycle detected for goal "${goalTitle}".`,
        depth,
      };
    }

    // 2. Already satisfied in working memory?
    if (workingMemory.has(goal)) {
      const step: BackwardStep = {
        stepNumber: stepCounter++,
        currentGoal: goal,
        requiredPrerequisites: [goal],
        factsVerified: [goal],
        missingPrerequisites: [],
        subgoalStatus: 'SUPPORTED',
        explanation: `Fact "${goalTitle}" is verified directly in working memory.`,
      };
      steps.push(step);

      return {
        goal,
        goalTitle,
        status: 'SUPPORTED',
        requiredPrerequisites: [goal],
        factsVerified: [goal],
        missingPrerequisites: [],
        subgoals: [],
        explanation: `Verified by patient observations in working memory.`,
        depth,
      };
    }

    // 3. Find candidate rules that can derive this goal
    const candidateRules = findRulesForConclusion(goal, rules);

    if (candidateRules.length === 0) {
      // It's a primitive symptom fact that was not reported by the user
      const step: BackwardStep = {
        stepNumber: stepCounter++,
        currentGoal: goal,
        requiredPrerequisites: [goal],
        factsVerified: [],
        missingPrerequisites: [goal],
        subgoalStatus: 'UNSUPPORTED',
        explanation: `Prerequisite observation "${goalTitle}" was not reported in working memory, and no secondary rules derive it.`,
      };
      steps.push(step);

      return {
        goal,
        goalTitle,
        status: 'UNSUPPORTED',
        requiredPrerequisites: [goal],
        factsVerified: [],
        missingPrerequisites: [goal],
        subgoals: [],
        explanation: `Observation not present in working memory.`,
        depth,
      };
    }

    // 4. Try rules that can establish this goal
    activeGoalStack.add(goal);

    let supportedTree: BackwardSubGoal | null = null;
    let bestFailureTree: BackwardSubGoal | null = null;

    for (const rule of candidateRules) {
      evaluatedRuleIds.add(rule.id);

      // Determine prerequisite sets to test:
      // If rule.conditionGroups is provided, test each alternative group (OR between groups).
      // If logicOperator is OR, test each condition as an alternative.
      // Otherwise, test rule.conditions as a single AND group.
      const groupsToTest: string[][] =
        rule.conditionGroups && rule.conditionGroups.length > 0
          ? rule.conditionGroups
          : rule.logicOperator === 'OR'
          ? rule.conditions.map((c) => [c])
          : [rule.conditions];

      let ruleSucceeded = false;
      let winningVerified: string[] = [];
      let winningMissing: string[] = [];
      let winningSubgoals: BackwardSubGoal[] = [];
      let bestGroupMissing: string[] = [];
      let minGroupMissingCount = Infinity;

      for (const group of groupsToTest) {
        const groupSubgoals: BackwardSubGoal[] = [];
        const groupVerified: string[] = [];
        const groupMissing: string[] = [];

        for (const condition of group) {
          if (workingMemory.has(condition)) {
            groupVerified.push(condition);
          } else {
            // Recursively evaluate condition as a subgoal
            const childResult = evaluateGoal(condition, depth + 1);
            groupSubgoals.push(childResult);

            if (childResult.status === 'SUPPORTED') {
              groupVerified.push(condition);
              workingMemory.add(condition);
            } else {
              groupMissing.push(condition);
            }
          }
        }

        if (groupMissing.length === 0) {
          ruleSucceeded = true;
          winningVerified = groupVerified;
          winningMissing = [];
          winningSubgoals = groupSubgoals;
          break; // This group satisfied the rule
        } else {
          if (groupMissing.length < minGroupMissingCount) {
            minGroupMissingCount = groupMissing.length;
            bestGroupMissing = groupMissing;
            winningVerified = groupVerified;
            winningSubgoals = groupSubgoals;
          }
        }
      }

      const finalVerified = ruleSucceeded
        ? Array.from(new Set([...winningVerified, ...getSatisfiedConditions(rule, workingMemory)]))
        : winningVerified;
      const finalMissing = ruleSucceeded ? [] : bestGroupMissing;
      const status: GoalStatus = ruleSucceeded ? 'SUPPORTED' : 'UNSUPPORTED';

      if (ruleSucceeded) {
        firedRuleIds.add(rule.id);
      }

      const missingLabels = finalMissing
        .map((m) => formatFactName(m, rules))
        .join(', ');
      const verifiedLabels = finalVerified
        .map((v) => formatFactName(v, rules))
        .join(', ');

      const explanation = ruleSucceeded
        ? `Rule [${rule.id}] successfully confirmed condition hypothesis "${goalTitle}". Prerequisites verified: [${verifiedLabels}].`
        : `Rule [${rule.id}] failed to confirm condition hypothesis "${goalTitle}". Missing: [${missingLabels}]. Verified: [${verifiedLabels || 'none'}].`;

      const ruleStep: BackwardStep = {
        stepNumber: stepCounter++,
        currentGoal: goal,
        supportingRuleId: rule.id,
        requiredPrerequisites: [...rule.conditions],
        factsVerified: finalVerified,
        missingPrerequisites: finalMissing,
        subgoalStatus: status,
        explanation,
      };
      steps.push(ruleStep);

      const candidateTree: BackwardSubGoal = {
        goal,
        goalTitle,
        ruleId: rule.id,
        status,
        requiredPrerequisites: [...rule.conditions],
        factsVerified: finalVerified,
        missingPrerequisites: finalMissing,
        subgoals: winningSubgoals,
        explanation,
        depth,
      };

      if (ruleSucceeded) {
        workingMemory.add(goal);
        supportedTree = candidateTree;
        break; // Goal successfully proved by this rule
      } else {
        if (!bestFailureTree) {
          bestFailureTree = candidateTree;
        }
      }
    }

    activeGoalStack.delete(goal);

    return (
      supportedTree ??
      bestFailureTree ?? {
        goal,
        goalTitle,
        status: 'UNSUPPORTED',
        requiredPrerequisites: [],
        factsVerified: [],
        missingPrerequisites: [goal],
        subgoals: [],
        explanation: `Hypothesis "${goalTitle}" could not be confirmed by any matching rule.`,
        depth,
      }
    );
  }

  // Evaluate each target
  for (const targetId of targetGoals) {
    const tree = evaluateGoal(targetId, 0);
    goalTrees.push(tree);

    if (tree.status === 'SUPPORTED') {
      const rule = tree.ruleId ? rules.find((r) => r.id === tree.ruleId) : undefined;
      const unreported = (rule?.associatedSymptoms ?? []).filter(
        (s) => !workingMemory.has(s)
      );

      supportedGoals.push({
        id: targetId,
        title: tree.goalTitle,
        category: rule?.category ?? 'General',
        supportingRuleId: tree.ruleId ?? 'DIRECT_FACT',
        supportingRuleTitle: rule?.title ?? 'Direct Observation',
        supportingSymptoms: tree.factsVerified,
        unreportedAssociatedSymptoms: unreported,
        explanation: rule?.explanation ?? tree.explanation,
        references: rule?.references,
        nextSteps: rule?.nextSteps,
        clinicalContext: rule?.clinicalContext,
        homeCare: rule?.homeCare,
        urgencyLevel: rule?.urgencyLevel,
        ruleConditions: rule ? [...rule.conditions] : [],
      });
    } else {
      unsupportedGoals.push({
        goal: targetId,
        goalTitle: tree.goalTitle,
        reason: tree.explanation,
        missingFacts: tree.missingPrerequisites,
      });
    }
  }

  const endTime = performance.now();
  const executionTimeMs = Math.max(0.1, Number((endTime - startTime).toFixed(2)));

  const diagnostics = {
    selectedSymptomIds: Array.from(cleanFacts),
    initialWorkingMemory: Array.from(cleanFacts),
    totalRulesLoaded: rules.length,
    rulesEvaluatedCount: evaluatedRuleIds.size,
    rulesFiredCount: firedRuleIds.size,
    firedRuleIds: Array.from(firedRuleIds),
    derivedConclusionIds: supportedGoals.map((g) => g.id),
    unmatchedRuleIds: Array.from(evaluatedRuleIds).filter((id) => !firedRuleIds.has(id)),
    filteredOutConclusionIds: [],
    executionTimeMs,
  };

  return {
    method: 'backward',
    initialWorkingMemory: Array.from(cleanFacts),
    finalWorkingMemory: Array.from(workingMemory),
    targetGoals,
    supportedGoals,
    unsupportedGoals,
    goalTrees,
    rulesEvaluatedCount: evaluatedRuleIds.size,
    rulesFiredCount: firedRuleIds.size,
    steps,
    executionTimeMs,
    diagnostics,
  };
}
