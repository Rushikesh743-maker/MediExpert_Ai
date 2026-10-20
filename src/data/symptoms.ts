import { Symptom } from '../types';

export const SYMPTOMS_DATA: Symptom[] = [
  {
    id: 'fever',
    label: 'Fever',
    category: 'general',
    description: 'Elevated core body temperature (≥ 38.0°C / 100.4°F), typically reflecting an active immune response.',
    isUrgentFlag: false,
  },
  {
    id: 'chills',
    label: 'Chills',
    category: 'general',
    description: 'Episodes of cold sensation accompanied by involuntary muscular shivering or rigors.',
    isUrgentFlag: false,
  },
  {
    id: 'body_aches',
    label: 'Body aches',
    category: 'general',
    description: 'Generalized musculoskeletal soreness and diffuse muscle tenderness across major muscle groups.',
    isUrgentFlag: false,
  },
  {
    id: 'fatigue',
    label: 'Fatigue or weakness',
    category: 'general',
    description: 'Persistent physical exhaustion, low stamina, or generalized bodily weakness not relieved by rest.',
    isUrgentFlag: false,
  },
  {
    id: 'headache',
    label: 'Headache',
    category: 'headache',
    description: 'Aching, throbbing, or tight cranial discomfort across the frontal, temporal, or occipital regions.',
    isUrgentFlag: false,
  },
  {
    id: 'runny_nose',
    label: 'Runny nose',
    category: 'respiratory',
    description: 'Excessive thin or watery mucus discharge flowing from the anterior nasal passages (rhinorrhea).',
    isUrgentFlag: false,
  },
  {
    id: 'blocked_nose',
    label: 'Blocked nose',
    category: 'respiratory',
    description: 'Swollen nasal mucosa or congestion causing restricted airflow and a stuffy sensation.',
    isUrgentFlag: false,
  },
  {
    id: 'sneezing',
    label: 'Sneezing',
    category: 'respiratory',
    description: 'Spasmodic involuntary expulsions of air from the nose provoked by mucosal irritation.',
    isUrgentFlag: false,
  },
  {
    id: 'sore_throat',
    label: 'Sore throat',
    category: 'respiratory',
    description: 'Pharyngeal irritation, scratchiness, or painful swallowing.',
    isUrgentFlag: false,
  },
  {
    id: 'cough',
    label: 'Cough',
    category: 'respiratory',
    description: 'Reflexive airway clearance of bronchial secretions, mucus, or mucosal irritants.',
    isUrgentFlag: false,
  },
  {
    id: 'shortness_of_breath',
    label: 'Shortness of breath',
    category: 'respiratory',
    description: 'Subjective feeling of breathing difficulty, air hunger, or labored respiration.',
    isUrgentFlag: true,
    urgencyNote: 'Sudden or severe difficulty breathing is a medical emergency requiring immediate attention.',
  },
  {
    id: 'itchy_or_watery_eyes',
    label: 'Itchy or watery eyes',
    category: 'allergy',
    description: 'Ocular itching, conjunctival tearing, redness, or watery weeping.',
    isUrgentFlag: false,
  },
  {
    id: 'skin_itching',
    label: 'Skin itching',
    category: 'allergy',
    description: 'Irritating dermal sensation provoking a compelling desire to scratch (pruritus).',
    isUrgentFlag: false,
  },
  {
    id: 'skin_rash_or_hives',
    label: 'Skin rash or hives',
    category: 'skin',
    description: 'Cutaneous eruption, erythematous patches, raised wheals, or urticarial skin swelling.',
    isUrgentFlag: false,
  },
  {
    id: 'facial_pressure_or_pain',
    label: 'Facial pressure or pain',
    category: 'sinus',
    description: 'Fullness, aching pressure, or tenderness over the cheeks, forehead, or periorbital sinuses.',
    isUrgentFlag: false,
  },
  {
    id: 'reduced_smell',
    label: 'Reduced sense of smell',
    category: 'sinus',
    description: 'Partial or complete loss of olfactory sensation (hyposmia or anosmia).',
    isUrgentFlag: false,
  },
  {
    id: 'nausea',
    label: 'Nausea',
    category: 'digestive',
    description: 'Unpleasant subjective gastrointestinal sensation characterized by an urge to vomit.',
    isUrgentFlag: false,
  },
  {
    id: 'vomiting',
    label: 'Vomiting',
    category: 'digestive',
    description: 'Forceful retrograde expulsion of gastric contents through the mouth (emesis).',
    isUrgentFlag: false,
  },
  {
    id: 'diarrhea',
    label: 'Diarrhea',
    category: 'digestive',
    description: 'Abnormally loose, watery, or frequent bowel evacuations.',
    isUrgentFlag: false,
  },
  {
    id: 'abdominal_pain',
    label: 'Abdominal pain',
    category: 'digestive',
    description: 'Aching, cramping, or sharp discomfort localized to the stomach or intestinal regions.',
    isUrgentFlag: false,
  },
  {
    id: 'heartburn_or_acid_reflux',
    label: 'Heartburn or acid reflux',
    category: 'digestive',
    description: 'Burning retrosternal chest sensation or acidic regurgitation rising into the throat or mouth.',
    isUrgentFlag: false,
  },
  {
    id: 'sensitivity_to_light',
    label: 'Sensitivity to light',
    category: 'headache',
    description: 'Discomfort, glare aversion, or exacerbated headache pain triggered by ordinary light (photophobia).',
    isUrgentFlag: false,
  },
  {
    id: 'neck_stiffness',
    label: 'Neck stiffness',
    category: 'headache',
    description: 'Painful resistance or difficulty flexing the cervical spine forward toward the chest.',
    isUrgentFlag: true,
    urgencyNote: 'Sudden neck stiffness with fever or severe headache warrants urgent emergency hospital assessment.',
  },
  {
    id: 'burning_urination',
    label: 'Burning during urination',
    category: 'urinary',
    description: 'Discomfort, stinging, or painful burning sensation during or immediately after voiding (dysuria).',
    isUrgentFlag: false,
  },
  {
    id: 'frequent_urination',
    label: 'Frequent urination',
    category: 'urinary',
    description: 'Need to urinate noticeably more often than usual, often with small voided volumes.',
    isUrgentFlag: false,
  },
];

export const SYMPTOM_MAP = new Map<string, Symptom>(
  SYMPTOMS_DATA.map((symptom) => [symptom.id, symptom])
);

// Helpful alias map for backwards compatibility / normalized lookups
const SYMPTOM_ALIASES: Record<string, string> = {
  nasal_congestion: 'blocked_nose',
  itchy_eyes: 'itchy_or_watery_eyes',
  watery_eyes: 'itchy_or_watery_eyes',
  itchy_skin: 'skin_itching',
  rash: 'skin_rash_or_hives',
  hives: 'skin_rash_or_hives',
  facial_pressure: 'facial_pressure_or_pain',
  heartburn: 'heartburn_or_acid_reflux',
  sour_taste: 'heartburn_or_acid_reflux',
};

export function getSymptomById(id: string): Symptom | undefined {
  if (SYMPTOM_MAP.has(id)) {
    return SYMPTOM_MAP.get(id);
  }
  const aliasId = SYMPTOM_ALIASES[id];
  if (aliasId && SYMPTOM_MAP.has(aliasId)) {
    return SYMPTOM_MAP.get(aliasId);
  }
  return undefined;
}

export function getSymptomLabel(id: string): string {
  const symptom = getSymptomById(id);
  if (symptom) return symptom.label;
  // If it's an intermediate fact or derived token, format cleanly
  return id
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
