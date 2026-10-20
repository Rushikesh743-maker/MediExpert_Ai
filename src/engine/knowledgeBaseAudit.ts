import { Rule } from '../types';
import { RULES_DATA } from '../data/rules';
import { SYMPTOMS_DATA } from '../data/symptoms';

export interface RuleAuditIssue {
  ruleId: string;
  type: 'ERROR' | 'WARNING';
  message: string;
}

export interface KnowledgeBaseAuditResult {
  totalRules: number;
  totalSymptoms: number;
  validRuleCount: number;
  isAllValid: boolean;
  issues: RuleAuditIssue[];
  reachabilitySummary: {
    reachableRules: number;
    unreachableRules: string[];
  };
}

/**
 * Performs comprehensive automated integrity audit on the knowledge base.
 */
export function auditKnowledgeBase(
  rules: Rule[] = RULES_DATA,
  symptoms = SYMPTOMS_DATA
): KnowledgeBaseAuditResult {
  const issues: RuleAuditIssue[] = [];
  const validSymptomIds = new Set(symptoms.map((s) => s.id));
  const ruleIds = new Set<string>();
  const derivedConclusionIds = new Set(rules.map((r) => r.conclusion));

  // 1. Check ID uniqueness and field completeness
  for (const rule of rules) {
    if (!rule.id || !rule.id.trim()) {
      issues.push({
        ruleId: 'UNKNOWN',
        type: 'ERROR',
        message: 'Rule missing unique ID',
      });
    } else if (ruleIds.has(rule.id)) {
      issues.push({
        ruleId: rule.id,
        type: 'ERROR',
        message: `Duplicate rule ID: ${rule.id}`,
      });
    } else {
      ruleIds.add(rule.id);
    }

    if (!rule.title || !rule.title.trim()) {
      issues.push({
        ruleId: rule.id,
        type: 'ERROR',
        message: `Rule ${rule.id} has empty title`,
      });
    }

    if (!rule.conclusion || !rule.conclusion.trim()) {
      issues.push({
        ruleId: rule.id,
        type: 'ERROR',
        message: `Rule ${rule.id} has empty conclusion`,
      });
    }

    if (!rule.conclusionTitle || !rule.conclusionTitle.trim()) {
      issues.push({
        ruleId: rule.id,
        type: 'ERROR',
        message: `Rule ${rule.id} has empty conclusionTitle`,
      });
    }

    // Check conditions exist either as a primitive symptom or an intermediate derived fact
    const allReferencedConditions = [
      ...rule.conditions,
      ...(rule.conditionGroups ? rule.conditionGroups.flat() : []),
    ];

    for (const condition of allReferencedConditions) {
      if (!validSymptomIds.has(condition) && !derivedConclusionIds.has(condition)) {
        issues.push({
          ruleId: rule.id,
          type: 'ERROR',
          message: `Rule ${rule.id} references non-existent symptom or fact: "${condition}"`,
        });
      }
    }
  }

  // 2. Reachability Check: Can each rule be fired starting from primitive symptoms?
  const knownDerivableFacts = new Set<string>(validSymptomIds);
  let changed = true;
  const firedInReachability = new Set<string>();

  while (changed) {
    changed = false;
    for (const rule of rules) {
      if (firedInReachability.has(rule.id)) continue;

      // Check if conditions can be satisfied by known derivable facts
      let canFire = false;
      if (rule.conditionGroups && rule.conditionGroups.length > 0) {
        canFire = rule.conditionGroups.some((group) =>
          group.every((c) => knownDerivableFacts.has(c))
        );
      } else if (rule.logicOperator === 'OR') {
        canFire = rule.conditions.some((c) => knownDerivableFacts.has(c));
      } else {
        canFire = rule.conditions.every((c) => knownDerivableFacts.has(c));
      }

      if (canFire) {
        firedInReachability.add(rule.id);
        if (!knownDerivableFacts.has(rule.conclusion)) {
          knownDerivableFacts.add(rule.conclusion);
          changed = true;
        }
      }
    }
  }

  const unreachableRules = rules
    .filter((r) => !firedInReachability.has(r.id))
    .map((r) => r.id);

  if (unreachableRules.length > 0) {
    for (const unreachId of unreachableRules) {
      issues.push({
        ruleId: unreachId,
        type: 'ERROR',
        message: `Rule ${unreachId} is unreachable from primitive symptom inputs (orphaned or impossible prerequisite).`,
      });
    }
  }

  const isAllValid = issues.filter((i) => i.type === 'ERROR').length === 0;

  return {
    totalRules: rules.length,
    totalSymptoms: symptoms.length,
    validRuleCount: rules.length - unreachableRules.length,
    isAllValid,
    issues,
    reachabilitySummary: {
      reachableRules: firedInReachability.size,
      unreachableRules,
    },
  };
}
