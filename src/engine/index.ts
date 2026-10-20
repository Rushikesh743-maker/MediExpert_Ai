import {
  AssessmentInput,
  AssessmentResult,
  ComparisonResult,
} from '../types';
import { runForwardChaining } from './forwardChaining';
import { runBackwardChaining } from './backwardChaining';

export * from './ruleMatcher';
export * from './forwardChaining';
export * from './backwardChaining';
export * from './medicalAttention';
export * from './knowledgeBaseAudit';

/**
 * Runs both Forward and Backward chaining on the exact same set of facts,
 * generating a detailed comparative analysis.
 */
export function compareInference(
  initialFacts: string[],
  targetGoalId?: string
): ComparisonResult {
  const forwardResult = runForwardChaining(initialFacts);
  const backwardResult = runBackwardChaining(
    initialFacts,
    targetGoalId ? { targetGoals: [targetGoalId] } : undefined
  );

  const forwardConclusions = new Set(forwardResult.conclusions.map((c) => c.id));
  const backwardConclusions = new Set(backwardResult.supportedGoals.map((c) => c.id));

  const agreements: string[] = [];
  const differences: string[] = [];

  for (const c of forwardResult.conclusions) {
    if (backwardConclusions.has(c.id)) {
      agreements.push(`Condition pattern "${c.title}" was independently derived by both Forward and Backward chaining.`);
    } else {
      differences.push(
        `Forward chaining derived "${c.title}", but Backward chaining did not confirm it under the target evaluation scope.`
      );
    }
  }

  for (const b of backwardResult.supportedGoals) {
    if (!forwardConclusions.has(b.id)) {
      differences.push(
        `Backward chaining confirmed "${b.title}", but Forward chaining did not derive it from the initial observation set.`
      );
    }
  }

  if (agreements.length === 0 && differences.length === 0) {
    differences.push('Neither inference engine identified matching condition patterns from the provided symptom observations.');
  }

  const summary = `Forward chaining evaluated ${forwardResult.rulesEvaluatedCount} rule(s) and fired ${forwardResult.rulesFiredCount} rule(s) in ${forwardResult.executionTimeMs}ms via bottom-up data-driven aggregation. Backward chaining verified ${backwardResult.supportedGoals.length} goal hypothesis(es) across ${backwardResult.rulesEvaluatedCount} rule checks in ${backwardResult.executionTimeMs}ms via top-down recursive subgoal testing.`;

  return {
    method: 'compare',
    forwardResult,
    backwardResult,
    comparisonAnalysis: {
      agreements,
      differences,
      summary,
    },
    diagnostics: forwardResult.diagnostics,
  };
}

/**
 * Executes the requested assessment workflow based on user options.
 */
export function executeAssessment(input: AssessmentInput): AssessmentResult {
  switch (input.method) {
    case 'forward':
      return runForwardChaining(input.selectedSymptomIds);
    case 'backward':
      return runBackwardChaining(
        input.selectedSymptomIds,
        input.targetGoalId ? { targetGoals: [input.targetGoalId] } : undefined
      );
    case 'compare':
      return compareInference(input.selectedSymptomIds, input.targetGoalId);
    default:
      return runForwardChaining(input.selectedSymptomIds);
  }
}
