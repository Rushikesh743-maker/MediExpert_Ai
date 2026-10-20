import { Rule } from '../types';
import { getSymptomLabel } from '../data/symptoms';
import { RULES_DATA } from '../data/rules';

/**
 * Standardizes raw symptom identifiers, handling objects, capitalization,
 * whitespace, and medical synonym aliases.
 */
export function normalizeSymptomId(raw: any): string {
  if (!raw) return '';
  let id = typeof raw === 'object' ? (raw.id ?? raw.value ?? '') : String(raw);
  id = id.trim().toLowerCase().replace(/[\s-]+/g, '_');

  // Clinical alias mapping dictionary
  const ALIAS_MAP: Record<string, string> = {
    // Fever
    high_fever: 'fever',
    pyrexia: 'fever',
    elevated_temperature: 'fever',
    feverish: 'fever',

    // Chills
    chilling: 'chills',
    rigors: 'chills',
    shivering: 'chills',

    // Body aches
    myalgia: 'body_aches',
    muscle_pain: 'body_aches',
    body_pain: 'body_aches',
    body_ache: 'body_aches',
    muscle_aches: 'body_aches',

    // Fatigue
    weakness: 'fatigue',
    exhaustion: 'fatigue',
    malaise: 'fatigue',
    lethargy: 'fatigue',
    tiredness: 'fatigue',

    // Headache
    cephalea: 'headache',
    cranial_pain: 'headache',

    // Runny nose
    rhinorrhea: 'runny_nose',
    nasal_discharge: 'runny_nose',

    // Blocked nose
    nasal_congestion: 'blocked_nose',
    stuffy_nose: 'blocked_nose',
    stuffy: 'blocked_nose',
    congestion: 'blocked_nose',

    // Sneezing
    sternutation: 'sneezing',

    // Sore throat
    pharyngitis: 'sore_throat',
    throat_pain: 'sore_throat',
    throat_irritation: 'sore_throat',

    // Cough
    coughing: 'cough',

    // Shortness of breath
    dyspnea: 'shortness_of_breath',
    breathing_difficulty: 'shortness_of_breath',
    breathlessness: 'shortness_of_breath',
    labored_breathing: 'shortness_of_breath',

    // Eyes
    itchy_eyes: 'itchy_or_watery_eyes',
    watery_eyes: 'itchy_or_watery_eyes',
    ocular_pruritus: 'itchy_or_watery_eyes',
    lacrimation: 'itchy_or_watery_eyes',

    // Skin itching
    itchy_skin: 'skin_itching',
    pruritus: 'skin_itching',

    // Skin rash / hives
    rash: 'skin_rash_or_hives',
    hives: 'skin_rash_or_hives',
    urticaria: 'skin_rash_or_hives',
    exanthem: 'skin_rash_or_hives',

    // Facial pressure
    facial_pressure: 'facial_pressure_or_pain',
    sinus_pressure: 'facial_pressure_or_pain',
    sinus_pain: 'facial_pressure_or_pain',

    // Reduced smell
    hyposmia: 'reduced_smell',
    anosmia: 'reduced_smell',
    loss_of_smell: 'reduced_smell',

    // Vomiting
    emesis: 'vomiting',

    // Diarrhea
    loose_stools: 'diarrhea',

    // Abdominal pain
    stomach_pain: 'abdominal_pain',
    stomach_cramps: 'abdominal_pain',
    abdominal_cramps: 'abdominal_pain',

    // Heartburn / Acid Reflux
    heartburn: 'heartburn_or_acid_reflux',
    acid_reflux: 'heartburn_or_acid_reflux',
    sour_taste: 'heartburn_or_acid_reflux',
    pyrosis: 'heartburn_or_acid_reflux',
    reflux: 'heartburn_or_acid_reflux',

    // Sensitivity to light
    photophobia: 'sensitivity_to_light',
    light_sensitivity: 'sensitivity_to_light',

    // Neck stiffness
    stiff_neck: 'neck_stiffness',
    nuchal_rigidity: 'neck_stiffness',

    // Burning urination
    dysuria: 'burning_urination',
    painful_urination: 'burning_urination',

    // Frequent urination
    urinary_frequency: 'frequent_urination',
    frequent_voiding: 'frequent_urination',
  };

  return ALIAS_MAP[id] ?? id;
}

/**
 * Deduplicates and normalizes a list of facts while maintaining stable ordering.
 */
export function deduplicateFacts(facts: any[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const raw of facts) {
    const normalized = normalizeSymptomId(raw);
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      result.push(normalized);
    }
  }

  return result;
}

/**
 * Checks whether the prerequisites of a rule are satisfied in working memory.
 * Supports:
 * 1. Explicit Disjunctive Normal Form (rule.conditionGroups): Group1 OR Group2.
 * 2. Explicit OR semantics (rule.logicOperator === 'OR'): Any condition satisfied.
 * 3. Default AND semantics: Every listed condition must be satisfied.
 */
export function isRuleSatisfied(rule: Rule, workingMemory: Set<string>): boolean {
  // Case 1: Explicit alternative prerequisite groups (Group1 OR Group2 OR ...)
  if (rule.conditionGroups && rule.conditionGroups.length > 0) {
    return rule.conditionGroups.some((group) =>
      group.length > 0 && group.every((condition) => workingMemory.has(condition))
    );
  }

  // Case 2: Explicit OR operator
  if (rule.logicOperator === 'OR') {
    if (!rule.conditions || rule.conditions.length === 0) return false;
    return rule.conditions.some((condition) => workingMemory.has(condition));
  }

  // Case 3: Default AND semantics
  if (!rule.conditions || rule.conditions.length === 0) {
    return false;
  }
  return rule.conditions.every((condition) => workingMemory.has(condition));
}

/**
 * Returns the list of conditions in a rule that are already present in working memory.
 * If alternative groups exist, returns the conditions satisfied in the winning group(s).
 */
export function getSatisfiedConditions(rule: Rule, workingMemory: Set<string>): string[] {
  const allRuleConditions = new Set<string>(rule.conditions || []);
  if (rule.conditionGroups) {
    for (const group of rule.conditionGroups) {
      for (const c of group) {
        allRuleConditions.add(c);
      }
    }
  }

  return Array.from(allRuleConditions).filter((condition) => workingMemory.has(condition));
}

/**
 * Returns the list of conditions in a rule that are missing from working memory.
 * If alternative groups exist, identifies the closest group (fewest missing symptoms).
 */
export function getMissingConditions(rule: Rule, workingMemory: Set<string>): string[] {
  if (rule.conditionGroups && rule.conditionGroups.length > 0) {
    // If rule is satisfied, nothing is missing
    if (isRuleSatisfied(rule, workingMemory)) {
      return [];
    }
    // Find the group closest to matching (fewest missing conditions)
    let bestMissing: string[] = [];
    let minMissingCount = Infinity;

    for (const group of rule.conditionGroups) {
      const missing = group.filter((c) => !workingMemory.has(c));
      if (missing.length < minMissingCount) {
        minMissingCount = missing.length;
        bestMissing = missing;
      }
    }
    return bestMissing;
  }

  if (rule.logicOperator === 'OR') {
    if (isRuleSatisfied(rule, workingMemory)) {
      return [];
    }
    return [...rule.conditions];
  }

  return rule.conditions.filter((condition) => !workingMemory.has(condition));
}

/**
 * Finds all rules in the rule base capable of deriving a given conclusion.
 */
export function findRulesForConclusion(
  conclusion: string,
  rules: Rule[] = RULES_DATA
): Rule[] {
  return rules.filter((rule) => rule.conclusion === conclusion);
}

/**
 * Deduplicates a list of rules by ID.
 */
export function deduplicateRules(rules: Rule[]): Rule[] {
  const seen = new Set<string>();
  const result: Rule[] = [];
  for (const rule of rules) {
    if (!seen.has(rule.id)) {
      seen.add(rule.id);
      result.push(rule);
    }
  }
  return result;
}

/**
 * Converts a condition or conclusion identifier into a human-friendly label.
 */
export function formatFactName(factId: string, rules: Rule[] = RULES_DATA): string {
  const matchingRule = rules.find((r) => r.conclusion === factId);
  if (matchingRule) {
    return matchingRule.conclusionTitle;
  }
  return getSymptomLabel(factId);
}

/**
 * Formats a rule's logical prerequisite expression for transparent display.
 */
export function formatRuleLogicExpression(rule: Rule): string {
  if (rule.conditionGroups && rule.conditionGroups.length > 0) {
    const groupExprs = rule.conditionGroups.map(
      (g) => `(${g.map((c) => formatFactName(c)).join(' ∧ ')})`
    );
    return `IF ${groupExprs.join(' ∨ ')} THEN ${rule.conclusionTitle}`;
  }

  if (rule.logicOperator === 'OR') {
    return `IF (${rule.conditions.map((c) => formatFactName(c)).join(' ∨ ')}) THEN ${rule.conclusionTitle}`;
  }

  return `IF (${rule.conditions.map((c) => formatFactName(c)).join(' ∧ ')}) THEN ${rule.conclusionTitle}`;
}

/**
 * Generates an informative human-readable explanation for a rule evaluation.
 */
export function generateRuleExplanation(
  rule: Rule,
  satisfiedConditions: string[],
  missingConditions: string[],
  action: 'FIRED' | 'SKIPPED_UNMATCHED' | 'ALREADY_FIRED'
): string {
  const satisfiedLabels = satisfiedConditions.map((c) => formatFactName(c)).join(', ');
  const missingLabels = missingConditions.map((c) => formatFactName(c)).join(', ');

  switch (action) {
    case 'FIRED':
      return `Rule [${rule.id}: ${rule.title}] fired successfully. Prerequisites satisfied: [${satisfiedLabels}]. Derived pattern: "${rule.conclusionTitle}".`;
    case 'ALREADY_FIRED':
      return `Rule [${rule.id}: ${rule.title}] has already fired and its derived conclusion "${rule.conclusionTitle}" is active in working memory.`;
    case 'SKIPPED_UNMATCHED':
      return `Rule [${rule.id}: ${rule.title}] did not match. Present: [${satisfiedLabels || 'none'}]. Missing required symptoms: [${missingLabels}].`;
  }
}

/**
 * Returns all unique non-intermediate conclusions present in the knowledge base.
 */
export function getNonIntermediateConclusions(rules: Rule[] = RULES_DATA): {
  id: string;
  title: string;
  category: string;
}[] {
  const map = new Map<string, { id: string; title: string; category: string }>();
  for (const rule of rules) {
    if (!rule.isIntermediate && !map.has(rule.conclusion)) {
      map.set(rule.conclusion, {
        id: rule.conclusion,
        title: rule.conclusionTitle,
        category: rule.category,
      });
    }
  }
  return Array.from(map.values());
}
