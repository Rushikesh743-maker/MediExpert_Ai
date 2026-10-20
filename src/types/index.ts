export type SymptomCategory = 
  | 'general' 
  | 'respiratory' 
  | 'allergy' 
  | 'sinus'
  | 'digestive' 
  | 'headache'
  | 'skin'
  | 'urinary';

export interface Symptom {
  id: string;
  label: string;
  category: SymptomCategory;
  description: string;
  isUrgentFlag?: boolean;
  urgencyNote?: string;
}

export interface Rule {
  id: string;
  title: string;
  category: string;
  conditions: string[]; // List of symptom or intermediate fact IDs required (evaluated as AND by default)
  conditionGroups?: string[][]; // Optional explicit alternative prerequisite groups (Disjunctive Normal Form: Group1 OR Group2). Each group has AND semantics; if any group is satisfied, the rule fires.
  logicOperator?: 'AND' | 'OR'; // Explicit operator when evaluating conditions array (default 'AND')
  conclusion: string; // Identifier for the pattern or intermediate derived fact
  conclusionTitle: string; // Human-readable title of conclusion
  explanation: string;
  references?: string[]; // Medical literature / public health reference citations
  nextSteps?: string; // Conservative, non-prescriptive next-step information
  clinicalContext?: string; // Additional physiological or epidemiological context
  isIntermediate?: boolean; // If true, derives an intermediate fact used to chain
  associatedSymptoms?: string[]; // Other clinically associated symptoms (for reporting unknown status)
  homeCare?: string[]; // Evidence-based self-care guidance measures
  urgencyLevel?: 'emergency' | 'prompt_doctor' | 'home_monitoring';
}

export type InferenceMethod = 'forward' | 'backward' | 'compare';

export type ActionType = 'FIRED' | 'SKIPPED_UNMATCHED' | 'ALREADY_FIRED';

export interface ForwardStep {
  stepNumber: number;
  ruleId: string;
  ruleTitle: string;
  conditionsEvaluated: string[];
  conditionsSatisfied: string[];
  missingConditions: string[];
  actionTaken: ActionType;
  explanation: string;
  workingMemorySnapshot: string[];
  derivedFact?: string;
}

export interface DerivedConclusion {
  id: string;
  title: string;
  category: string;
  supportingRuleId: string;
  supportingRuleTitle: string;
  supportingSymptoms: string[];
  missingSymptoms?: string[];
  unreportedAssociatedSymptoms?: string[];
  explanation: string;
  references?: string[];
  nextSteps?: string;
  clinicalContext?: string;
  homeCare?: string[];
  urgencyLevel?: 'emergency' | 'prompt_doctor' | 'home_monitoring';
  ruleConditions?: string[];
}

export interface UnmatchedRuleInfo {
  rule: Rule;
  satisfiedConditions: string[];
  missingConditions: string[];
}

export interface InferenceDiagnostics {
  selectedSymptomIds: string[];
  initialWorkingMemory: string[];
  totalRulesLoaded: number;
  rulesEvaluatedCount: number;
  rulesFiredCount: number;
  firedRuleIds: string[];
  derivedConclusionIds: string[];
  unmatchedRuleIds: string[];
  filteredOutConclusionIds: string[];
  executionTimeMs: number;
}

export interface ForwardChainingResult {
  method: 'forward';
  initialWorkingMemory: string[];
  finalWorkingMemory: string[];
  conclusions: DerivedConclusion[];
  firedRules: Rule[];
  unmatchedRules: UnmatchedRuleInfo[];
  rulesEvaluatedCount: number;
  rulesFiredCount: number;
  iterations?: number;
  steps: ForwardStep[];
  executionTimeMs: number;
  diagnostics?: InferenceDiagnostics;
}

export type GoalStatus = 'SUPPORTED' | 'UNSUPPORTED' | 'CYCLE_DETECTED';

export interface BackwardSubGoal {
  goal: string;
  goalTitle: string;
  ruleId?: string;
  status: GoalStatus;
  requiredPrerequisites: string[];
  factsVerified: string[];
  missingPrerequisites: string[];
  subgoals: BackwardSubGoal[];
  explanation: string;
  depth: number;
}

export interface BackwardStep {
  stepNumber: number;
  currentGoal: string;
  supportingRuleId?: string;
  requiredPrerequisites: string[];
  factsVerified: string[];
  missingPrerequisites: string[];
  subgoalStatus: GoalStatus;
  explanation: string;
}

export interface UnsupportedGoalInfo {
  goal: string;
  goalTitle: string;
  reason: string;
  missingFacts: string[];
}

export interface BackwardChainingResult {
  method: 'backward';
  initialWorkingMemory: string[];
  finalWorkingMemory: string[];
  targetGoals: string[];
  supportedGoals: DerivedConclusion[];
  unsupportedGoals: UnsupportedGoalInfo[];
  goalTrees: BackwardSubGoal[];
  rulesEvaluatedCount: number;
  rulesFiredCount: number;
  steps: BackwardStep[];
  executionTimeMs: number;
  diagnostics?: InferenceDiagnostics;
}

export interface ComparisonResult {
  method: 'compare';
  forwardResult: ForwardChainingResult;
  backwardResult: BackwardChainingResult;
  comparisonAnalysis: {
    agreements: string[];
    differences: string[];
    summary: string;
  };
  diagnostics?: InferenceDiagnostics;
}

export type AssessmentResult = ForwardChainingResult | BackwardChainingResult | ComparisonResult;

export interface AssessmentInput {
  selectedSymptomIds: string[];
  duration?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  method: InferenceMethod;
  targetGoalId?: string; // Optional target for backward chaining
  assessmentDate?: string;
}

export type MedicalAttentionLevel = 'emergency' | 'prompt_doctor' | 'home_monitoring';

export interface MedicalAttentionAssessment {
  level: MedicalAttentionLevel;
  levelBadge: string;
  title: string;
  summary: string;
  reasons: string[];
  urgencyAlertRequired: boolean;
  emergencyWarningMessage?: string;
  guidance: string[];
}
