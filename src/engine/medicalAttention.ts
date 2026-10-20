import { MedicalAttentionAssessment, MedicalAttentionLevel } from '../types';

/**
 * Evaluates clinical warning signs and safety criteria independently of rule matches.
 * Determines whether the user requires emergency assistance, prompt clinical review,
 * or whether conservative home monitoring is reasonable.
 */
export function evaluateMedicalAttention(
  selectedSymptomIds: string[],
  duration?: string,
  severity?: 'mild' | 'moderate' | 'severe'
): MedicalAttentionAssessment {
  const symptoms = new Set(selectedSymptomIds);
  const reasons: string[] = [];

  // -------------------------------------------------------------------------
  // Level 1: EMERGENCY HELP
  // -------------------------------------------------------------------------
  let isEmergency = false;

  // 1. Difficulty breathing / shortness of breath
  if (symptoms.has('shortness_of_breath')) {
    isEmergency = true;
    reasons.push(
      'Shortness of breath / labored respiration is a high-priority red flag indicating potential acute pulmonary or systemic compromise.'
    );
  }

  // 2. Meningeal signs (neck stiffness with fever or severe headache)
  if (
    symptoms.has('neck_stiffness') &&
    (symptoms.has('fever') || symptoms.has('headache'))
  ) {
    isEmergency = true;
    reasons.push(
      'Neck stiffness combined with fever or headache is a hallmark sign of meningeal irritation (suspected meningitis) requiring immediate emergency evaluation.'
    );
  }

  // 3. Systemic allergic / anaphylactic reaction pattern (rash/hives/itching + shortness of breath)
  if (
    (symptoms.has('skin_rash_or_hives') || symptoms.has('skin_itching')) &&
    symptoms.has('shortness_of_breath')
  ) {
    isEmergency = true;
    reasons.push(
      'Cutaneous allergic manifestations (rash, hives, itching) coinciding with respiratory distress suggest possible acute anaphylaxis.'
    );
  }

  if (isEmergency) {
    return {
      level: 'emergency',
      levelBadge: 'Emergency Help',
      title: 'Immediate Emergency Medical Assistance Required',
      summary:
        'One or more of your reported symptoms indicate a critical warning sign that warrants immediate medical evaluation at an emergency department.',
      reasons,
      urgencyAlertRequired: true,
      emergencyWarningMessage:
        'CRITICAL SAFETY ALERT: Severe warning signs (such as breathing difficulty or acute neck stiffness with fever) have been reported. Do not delay seeking emergency care or calling your local emergency services (e.g. 911, 999, 112).',
      guidance: [
        'Call your local emergency services (911, 999, 112) or have someone drive you to the nearest emergency room immediately.',
        'Do not attempt to drive yourself if experiencing breathing distress or severe dizziness.',
        'Remain calm and sit in an upright position to facilitate easier breathing if short of breath.',
        'Do not take non-prescribed sedatives or wait to see if symptoms improve on their own.',
      ],
    };
  }

  // -------------------------------------------------------------------------
  // Level 2: SEEK PROMPT MEDICAL ASSESSMENT
  // -------------------------------------------------------------------------
  let isPrompt = false;

  // 1. Febrile Urinary Symptoms (Upper UTI / Pyelonephritis concern)
  if (
    (symptoms.has('fever') || symptoms.has('chills')) &&
    (symptoms.has('burning_urination') || symptoms.has('frequent_urination'))
  ) {
    isPrompt = true;
    reasons.push(
      'Fever or chills accompanying urinary symptoms (dysuria or frequency) raises concern for upper urinary tract involvement (pyelonephritis).'
    );
  }

  // 2. Febrile Abdominal Pain
  if (symptoms.has('abdominal_pain') && symptoms.has('fever')) {
    isPrompt = true;
    reasons.push(
      'Abdominal pain co-occurring with fever requires timely evaluation to rule out acute inflammatory conditions (e.g., acute appendicitis, diverticulitis, or bacterial gastroenteritis).'
    );
  }

  // 3. Acute Enteric Fluid Depletion (Vomiting + Diarrhea + Abdominal Pain)
  if (
    symptoms.has('vomiting') &&
    symptoms.has('diarrhea') &&
    symptoms.has('abdominal_pain')
  ) {
    isPrompt = true;
    reasons.push(
      'The triad of vomiting, diarrhea, and abdominal pain presents significant risk for rapid dehydration and electrolyte imbalance.'
    );
  }

  // 4. Febrile Respiratory Illness (Fever + Cough)
  if (symptoms.has('fever') && symptoms.has('cough')) {
    isPrompt = true;
    reasons.push(
      'Fever with cough may signify acute bronchitis, influenza, or early pneumonia requiring clinician lung auscultation and assessment.'
    );
  }

  // 5. Unexplained Neck Stiffness
  if (symptoms.has('neck_stiffness')) {
    isPrompt = true;
    reasons.push(
      'Cervical stiffness (neck stiffness) warrants professional clinical evaluation to rule out neurological or muscular complications.'
    );
  }

  // 6. Urinary tract symptoms (isolated dysuria or frequent urination)
  if (symptoms.has('burning_urination') || symptoms.has('frequent_urination')) {
    isPrompt = true;
    reasons.push(
      'Urinary burning or increased frequency indicates potential bacterial cystitis requiring clinician-ordered urinalysis.'
    );
  }

  // 7. Severe Intensity reported by user
  if (severity === 'severe') {
    isPrompt = true;
    reasons.push(
      'You indicated that your overall symptom severity is severe, warranting a formal in-person clinical assessment.'
    );
  }

  // 8. Prolonged Duration with Fever
  if (duration === '>1_week' && symptoms.has('fever')) {
    isPrompt = true;
    reasons.push(
      'Fever persisting for more than 7 days constitutes a prolonged febrile illness requiring physician investigation.'
    );
  }

  if (isPrompt) {
    return {
      level: 'prompt_doctor',
      levelBadge: 'Seek Prompt Medical Assessment',
      title: 'Prompt Clinical Evaluation Recommended',
      summary:
        'Your symptoms include concerning features or combinations that should be formally assessed by a general practitioner, urgent care physician, or clinician.',
      reasons,
      urgencyAlertRequired: true,
      emergencyWarningMessage:
        'CLINICAL ADVICE: Your symptoms warrant timely medical evaluation to establish an accurate diagnosis and consider targeted therapy if appropriate.',
      guidance: [
        'Contact your doctor’s office, health clinic, or urgent care center today for an appointment.',
        'Monitor your body temperature and fluid intake closely while awaiting evaluation.',
        'Seek immediate emergency care if new red flags emerge (such as sudden shortness of breath, confusion, or inability to retain liquids).',
        'Avoid self-medicating with prescription antibiotics without a doctor’s culture and confirmation.',
      ],
    };
  }

  // -------------------------------------------------------------------------
  // Level 3: HOME MONITORING MAY BE REASONABLE
  // -------------------------------------------------------------------------
  return {
    level: 'home_monitoring',
    levelBadge: 'Home Monitoring May Be Reasonable',
    title: 'Supportive Home Monitoring May Be Reasonable',
    summary:
      'Based on the symptoms reported, no critical red-flag warning signs were triggered. Conservative home care and close self-monitoring may be appropriate at this stage.',
    reasons: [
      'No acute airway compromise, respiratory distress, or severe neurological signs were reported.',
      'Reported symptoms appear consistent with self-limiting, mild-to-moderate patterns suitable for supportive care.',
    ],
    urgencyAlertRequired: false,
    guidance: [
      'Prioritize adequate rest, quality sleep, and steady oral hydration (water, broths, electrolyte fluids).',
      'Follow the specific supportive measures outlined in the Home Care & Symptom Relief section below.',
      'Consult a physician if symptoms worsen significantly, fail to improve after 5–7 days, or if high fever develops.',
      'Seek emergency assistance immediately if you experience shortness of breath, chest pain, confusion, or severe neck stiffness.',
    ],
  };
}
