import { describe, it, expect } from 'vitest';
import { runForwardChaining } from './forwardChaining';
import { runBackwardChaining } from './backwardChaining';
import { compareInference, executeAssessment } from './index';
import { evaluateMedicalAttention } from './medicalAttention';
import { Rule } from '../types';
import { RULES_DATA, RULE_MAP } from '../data/rules';
import { SYMPTOMS_DATA, SYMPTOM_MAP } from '../data/symptoms';
import { normalizeSymptomId, deduplicateFacts } from './ruleMatcher';
import { auditKnowledgeBase } from './knowledgeBaseAudit';

describe('MediExpert AI Clinical Knowledge Base & Inference Engine', () => {
  // Test 1: Fever plus body aches activates an explicitly defined rule requiring those two symptoms
  it('1. should activate an explicitly defined rule (R006) when fever and body aches are provided', () => {
    const facts = ['fever', 'body_aches'];
    const result = runForwardChaining(facts);

    expect(result.firedRules.some((r) => r.id === 'R006')).toBe(true);
    expect(result.conclusions.some((c) => c.id === 'influenza_like_pattern')).toBe(true);
    expect(result.finalWorkingMemory).toContain('influenza_like_pattern');

    const conclusion = result.conclusions.find((c) => c.id === 'influenza_like_pattern');
    expect(conclusion).toBeDefined();
    expect(conclusion?.supportingSymptoms).toContain('fever');
    expect(conclusion?.supportingSymptoms).toContain('body_aches');
    expect(conclusion?.urgencyLevel).toBe('prompt_doctor');
  });

  // Test 2: Runny nose plus sneezing activates an appropriate documented rule
  it('2. should activate an appropriate documented rule (R001) when runny nose and sneezing are provided', () => {
    const facts = ['runny_nose', 'sneezing'];
    const result = runForwardChaining(facts);

    expect(result.firedRules.some((r) => r.id === 'R001')).toBe(true);
    expect(result.conclusions.some((c) => c.id === 'common_cold_pattern')).toBe(true);

    const conclusion = result.conclusions.find((c) => c.id === 'common_cold_pattern');
    expect(conclusion?.title).toContain('Common Cold');
    expect(conclusion?.supportingSymptoms).toEqual(expect.arrayContaining(['runny_nose', 'sneezing']));
  });

  // Test 3: Two unrelated symptoms do not automatically produce an unsupported condition
  it('3. should not produce an unsupported condition when two clinically unrelated symptoms are selected', () => {
    // Itchy or watery eyes (allergic/ocular) + Frequent urination (urological)
    const unrelatedFacts = ['itchy_or_watery_eyes', 'frequent_urination'];
    const result = runForwardChaining(unrelatedFacts);

    // Neither Allergic Rhinitis (requires sneezing or runny nose), UTI (requires burning urination),
    // nor any other condition rule has prerequisites matching this disjoint pair alone.
    expect(result.firedRules.length).toBe(0);
    expect(result.conclusions.length).toBe(0);
    expect(result.finalWorkingMemory).toEqual(expect.arrayContaining(unrelatedFacts));
  });

  // Test 4: A rule requiring A AND B does not fire when only A is present
  it('4. should not fire a rule requiring A AND B when only prerequisite A is present', () => {
    // R041 requires burning_urination AND frequent_urination
    const singleFact = ['burning_urination'];
    const result = runForwardChaining(singleFact);

    expect(result.firedRules.some((r) => r.id === 'R041')).toBe(false);
    expect(result.conclusions.some((c) => c.id === 'uti_cystitis_pattern')).toBe(false);

    // Verify unmatched rules records the missing prerequisite
    const unmatched = result.unmatchedRules.find((u) => u.rule.id === 'R041');
    expect(unmatched).toBeDefined();
    expect(unmatched?.missingConditions).toContain('frequent_urination');
    expect(unmatched?.satisfiedConditions).toContain('burning_urination');
  });

  // Test 5: A rule with explicitly defined OR alternatives fires when the appropriate alternative is present
  it('5. should fire a rule with explicitly defined OR alternatives when the appropriate alternative is present', () => {
    // R011 (Allergic Rhinitis) defines conditionGroups alternatives:
    // Group 1: ['sneezing', 'itchy_or_watery_eyes']
    // Group 2: ['sneezing', 'runny_nose', 'itchy_or_watery_eyes']
    const alternativeFacts = ['sneezing', 'itchy_or_watery_eyes'];
    const result = runForwardChaining(alternativeFacts);

    expect(result.firedRules.some((r) => r.id === 'R011')).toBe(true);
    expect(result.conclusions.some((c) => c.id === 'allergic_rhinitis_pattern')).toBe(true);

    // Also verify with an explicit logicOperator: 'OR' test rule
    const orRule: Rule = {
      id: 'TEST_OR_1',
      title: 'Test OR Rule',
      category: 'Test',
      conditions: ['fever', 'chills'],
      logicOperator: 'OR',
      conclusion: 'test_febrile_state',
      conclusionTitle: 'Test Febrile State',
      explanation: 'Either fever OR chills satisfies this rule',
      references: ['TEST'],
    };

    const orResult = runForwardChaining(['chills'], { rules: [orRule] });
    expect(orResult.firedRules.some((r) => r.id === 'TEST_OR_1')).toBe(true);
    expect(orResult.conclusions.some((c) => c.id === 'test_febrile_state')).toBe(true);
  });

  // Test 6: A multi-level rule chain produces its expected intermediate and final conclusions
  it('6. should execute multi-level rule chaining to produce both intermediate and final conclusions', () => {
    // Level 1: R005 ['cough', 'fatigue'] -> acute_bronchial_irritation (isIntermediate: true)
    // Level 2: R006 ['acute_bronchial_irritation', 'fever', 'body_aches'] -> influenza_like_pattern
    const facts = ['cough', 'fatigue', 'fever', 'body_aches'];
    const result = runForwardChaining(facts);

    // Intermediate fact added to working memory
    expect(result.finalWorkingMemory).toContain('acute_bronchial_irritation');

    // Both rules fired in correct sequence
    const firedIds = result.firedRules.map((r) => r.id);
    expect(firedIds).toContain('R005');
    expect(firedIds).toContain('R006');

    // Only final clinical pattern is exposed as conclusion (intermediate fact filtered from diagnosis cards)
    expect(result.conclusions.some((c) => c.id === 'influenza_like_pattern')).toBe(true);
    expect(result.conclusions.some((c) => c.id === 'acute_bronchial_irritation')).toBe(false);

    // Second chain test: GERD (R026) -> Reflux Cough (R027)
    const gerdFacts = ['heartburn_or_acid_reflux', 'cough'];
    const gerdResult = runForwardChaining(gerdFacts);
    expect(gerdResult.finalWorkingMemory).toContain('gerd_pattern');
    expect(gerdResult.conclusions.some((c) => c.id === 'reflux_associated_cough_pattern')).toBe(true);
  });

  // Test 7: Forward chaining terminates when no new facts can be derived
  it('7. should terminate forward chaining safely without infinite loops when no new facts can be derived', () => {
    const facts = ['runny_nose', 'sneezing', 'sore_throat'];
    const result = runForwardChaining(facts);

    expect(result.iterations).toBeGreaterThanOrEqual(1);
    expect(result.iterations).toBeLessThan(10);
    expect(result.firedRules.length).toBeGreaterThanOrEqual(1);

    // Test with cyclic rule set to verify fixed-point loop guard
    const cyclicRules: Rule[] = [
      {
        id: 'CYCLE_A',
        title: 'Rule A',
        category: 'Test',
        conditions: ['fact_start'],
        conclusion: 'fact_loop_1',
        conclusionTitle: 'Loop Fact 1',
        explanation: 'Start to loop 1',
        references: ['TEST'],
      },
      {
        id: 'CYCLE_B',
        title: 'Rule B',
        category: 'Test',
        conditions: ['fact_loop_1'],
        conclusion: 'fact_loop_2',
        conclusionTitle: 'Loop Fact 2',
        explanation: 'Loop 1 to loop 2',
        references: ['TEST'],
      },
      {
        id: 'CYCLE_C',
        title: 'Rule C',
        category: 'Test',
        conditions: ['fact_loop_2'],
        conclusion: 'fact_loop_1',
        conclusionTitle: 'Loop Fact 1 duplicate',
        explanation: 'Loop 2 back to loop 1',
        references: ['TEST'],
      },
    ];

    const cycleResult = runForwardChaining(['fact_start'], { rules: cyclicRules });
    expect(cycleResult.finalWorkingMemory).toContain('fact_loop_1');
    expect(cycleResult.finalWorkingMemory).toContain('fact_loop_2');
    // Terminated cleanly
    expect(cycleResult.iterations).toBeLessThanOrEqual(5);
  });

  // Test 8: Backward chaining proves a goal when all required prerequisites are available
  it('8. should prove a target goal in backward chaining when all required prerequisites are available', () => {
    const facts = ['sneezing', 'runny_nose', 'itchy_or_watery_eyes'];
    const result = runBackwardChaining(facts, { targetGoals: ['allergic_rhinitis_pattern'] });

    expect(result.supportedGoals.some((g) => g.id === 'allergic_rhinitis_pattern')).toBe(true);
    expect(result.unsupportedGoals.length).toBe(0);

    const goalTree = result.goalTrees[0];
    expect(goalTree.status).toBe('SUPPORTED');
    expect(goalTree.factsVerified).toEqual(expect.arrayContaining(['sneezing', 'runny_nose', 'itchy_or_watery_eyes']));
  });

  // Test 9: Unknown symptom IDs and invalid rule references are handled safely
  it('9. should handle unknown symptom IDs, aliases, and invalid input formats safely', () => {
    // Normalization handles aliases: high_fever -> fever, rhinorrhea -> runny_nose
    expect(normalizeSymptomId('high_fever')).toBe('fever');
    expect(normalizeSymptomId('rhinorrhea')).toBe('runny_nose');
    expect(normalizeSymptomId('dyspnea')).toBe('shortness_of_breath');
    expect(normalizeSymptomId({ id: 'Fever' })).toBe('fever');

    // Deduplication handles dirty array with duplicates, null, undefined, and unrecognized IDs
    const dirtyInputs = ['high_fever', 'FEVER', 'unknown_gibberish_id_999', null, undefined, 'fever'];
    const cleanFacts = deduplicateFacts(dirtyInputs);
    expect(cleanFacts).toEqual(['fever', 'unknown_gibberish_id_999']);

    // Engine runs safely without throwing exceptions on unrecognized facts
    const result = runForwardChaining(dirtyInputs);
    expect(result).toBeDefined();
    expect(result.finalWorkingMemory).toContain('fever');
    expect(result.finalWorkingMemory).toContain('unknown_gibberish_id_999');
  });

  // Test 10: The results page displays supported conclusions returned by the engine
  it('10. should ensure conclusion objects contain all presentation fields required by the UI', () => {
    const facts = ['runny_nose', 'sneezing', 'sore_throat'];
    const result = runForwardChaining(facts);

    expect(result.conclusions.length).toBeGreaterThan(0);
    for (const conclusion of result.conclusions) {
      expect(conclusion.id).toBeDefined();
      expect(conclusion.title.trim().length).toBeGreaterThan(0);
      expect(conclusion.category.trim().length).toBeGreaterThan(0);
      expect(conclusion.supportingRuleId.trim().length).toBeGreaterThan(0);
      expect(conclusion.explanation.trim().length).toBeGreaterThan(0);
      expect(conclusion.supportingSymptoms).toBeDefined();
      expect(conclusion.supportingSymptoms.length).toBeGreaterThan(0);
      expect(conclusion.references).toBeDefined();
      expect(conclusion.references!.length).toBeGreaterThan(0);
      expect(conclusion.homeCare).toBeDefined();
      expect(conclusion.homeCare!.length).toBeGreaterThan(0);
      expect(conclusion.urgencyLevel).toBeDefined();
      expect(['home_monitoring', 'prompt_doctor', 'emergency']).toContain(conclusion.urgencyLevel);
    }
  });

  // Test 11: Compare Both executes both algorithms using the same initial facts and knowledge base
  it('11. should execute Compare Both with identical initial facts and knowledge base', () => {
    const facts = ['diarrhea', 'nausea', 'abdominal_pain'];
    const comparison = compareInference(facts);

    expect(comparison.method).toBe('compare');
    expect(comparison.forwardResult).toBeDefined();
    expect(comparison.backwardResult).toBeDefined();
    // Identical initial facts
    expect(comparison.forwardResult.initialWorkingMemory).toEqual(comparison.backwardResult.initialWorkingMemory);
    expect(comparison.comparisonAnalysis).toBeDefined();
    expect(comparison.comparisonAnalysis.agreements).toBeDefined();
    expect(comparison.comparisonAnalysis.agreements.some((a) => a.includes('Acute Gastroenteritis'))).toBe(true);
  });

  // Test 12: Safety-related rules are evaluated independently of ordinary condition matches
  it('12. should evaluate safety-related medical attention triage independently of condition rules', () => {
    // Shortness of breath alone is an emergency triage alert, even if condition rules differ
    const triageEmergency = evaluateMedicalAttention(['shortness_of_breath']);
    expect(triageEmergency.level).toBe('emergency');
    expect(triageEmergency.urgencyAlertRequired).toBe(true);
    expect(triageEmergency.levelBadge).toContain('Emergency');

    // Meningeal triad (neck stiffness + fever)
    const triageMeningeal = evaluateMedicalAttention(['neck_stiffness', 'fever']);
    expect(triageMeningeal.level).toBe('emergency');
    expect(triageMeningeal.reasons.some((r) => r.toLowerCase().includes('meningeal'))).toBe(true);

    // Prompt doctor for febrile abdominal pain
    const triagePrompt = evaluateMedicalAttention(['fever', 'abdominal_pain']);
    expect(triagePrompt.level).toBe('prompt_doctor');
    expect(triagePrompt.urgencyAlertRequired).toBe(true);

    // Mild self-limiting symptoms require only home monitoring
    const triageHome = evaluateMedicalAttention(['runny_nose', 'sneezing']);
    expect(triageHome.level).toBe('home_monitoring');
    expect(triageHome.urgencyAlertRequired).toBe(false);
  });

  // Test 13: Knowledge Base Integrity Audit — All 50 Rules Unique, Valid, and 100% Reachable
  it('13. should pass automated integrity audit with 0 errors and 100% reachability across all 50 rules', () => {
    const audit = auditKnowledgeBase();

    expect(audit.totalRules).toBe(50);
    expect(audit.totalSymptoms).toBe(25);
    expect(audit.validRuleCount).toBe(50);
    expect(audit.reachabilitySummary.reachableRules).toBe(50);
    expect(audit.reachabilitySummary.unreachableRules).toEqual([]);
    expect(audit.issues.filter((i) => i.type === 'ERROR')).toEqual([]);
    expect(audit.isAllValid).toBe(true);
  });

  // Test 14: Backward Chaining — Recursive Cycle Detection
  it('14. should detect recursive cycles in backward chaining and terminate branch gracefully', () => {
    const cyclicRules: Rule[] = [
      {
        id: 'CYC_1',
        title: 'Cyclic Rule 1',
        category: 'Test',
        conditions: ['subgoal_B'],
        conclusion: 'subgoal_A',
        conclusionTitle: 'Subgoal A',
        explanation: 'A requires B',
        references: ['TEST'],
      },
      {
        id: 'CYC_2',
        title: 'Cyclic Rule 2',
        category: 'Test',
        conditions: ['subgoal_A'],
        conclusion: 'subgoal_B',
        conclusionTitle: 'Subgoal B',
        explanation: 'B requires A',
        references: ['TEST'],
      },
    ];

    const result = runBackwardChaining([], {
      rules: cyclicRules,
      targetGoals: ['subgoal_A'],
    });

    expect(result.steps.some((s) => s.subgoalStatus === 'CYCLE_DETECTED')).toBe(true);
    expect(result.supportedGoals.length).toBe(0);
  });

  // Test 15: No Fabricated Probabilities or Confidence Scores
  it('15. should verify that inferences do not inject fabricated probability percentages', () => {
    const facts = ['heartburn_or_acid_reflux', 'nausea'];
    const result = runForwardChaining(facts);

    for (const conclusion of result.conclusions) {
      expect((conclusion as any).probability).toBeUndefined();
      expect((conclusion as any).confidenceScore).toBeUndefined();
      expect(conclusion.explanation).not.toContain('%');
    }
  });

  // Test 16: Coordinator Integration via executeAssessment
  it('16. should execute clean assessment via the coordinator function and include diagnostics', () => {
    const output = executeAssessment({
      selectedSymptomIds: ['runny_nose', 'sneezing', 'sore_throat'],
      method: 'forward',
      duration: '1-3_days',
      severity: 'mild',
    });

    expect(output.method).toBe('forward');
    expect((output as any).conclusions.length).toBeGreaterThan(0);
    expect((output as any).diagnostics).toBeDefined();
    expect((output as any).diagnostics.totalRulesLoaded).toBe(50);
    expect((output as any).diagnostics.rulesFiredCount).toBeGreaterThanOrEqual(1);
  });
});
