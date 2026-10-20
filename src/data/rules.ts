import { Rule } from '../types';

export const RULES_DATA: Rule[] = [
  // =========================================================================
  // Category 1: Common Cold & Upper Respiratory Symptoms (R001 - R005)
  // =========================================================================
  {
    id: 'R001',
    title: 'Common Cold (Viral Rhinitis) Pattern',
    category: 'Common Cold & Upper Respiratory',
    conditions: ['runny_nose', 'sneezing', 'sore_throat'],
    conditionGroups: [
      ['runny_nose', 'sneezing'],
      ['runny_nose', 'sneezing', 'sore_throat'],
      ['runny_nose', 'sore_throat'],
    ],
    conclusion: 'common_cold_pattern',
    conclusionTitle: 'Common Cold (Acute Viral Rhinitis) Pattern',
    explanation:
      'Clear rhinorrhea and paroxysmal sneezing, with or without mild pharyngeal scratchiness, is the classic presentation of acute self-limiting viral rhinitis.',
    references: ['NHS-COLD-2024', 'CDC-COLD-2024'],
    nextSteps:
      'Ensure adequate rest and hydration. Saline nasal rinses may provide symptomatic relief. Seek medical advice if symptoms progressively worsen after 10 days.',
    associatedSymptoms: ['blocked_nose', 'cough', 'fatigue', 'headache'],
    homeCare: [
      'Prioritize rest and stay well-hydrated with warm fluids (water, broth, herbal tea).',
      'Use isotonic saline nasal spray to rinse nasal passages and ease stuffiness.',
      'Gargle with warm salt water (1/2 teaspoon salt in 8 oz water) to soothe pharyngeal scratchiness.',
      'Use a cool-mist humidifier or steam inhalation to keep respiratory mucous membranes moist.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R002',
    title: 'Upper Respiratory Cough-Dominant Pattern',
    category: 'Common Cold & Upper Respiratory',
    conditions: ['cough', 'sore_throat', 'blocked_nose'],
    conditionGroups: [
      ['cough', 'sore_throat'],
      ['cough', 'sore_throat', 'blocked_nose'],
    ],
    conclusion: 'upper_respiratory_cough_pattern',
    conclusionTitle: 'Upper Respiratory Cough-Dominant Pattern',
    explanation:
      'Cough accompanied by throat irritation and pharyngeal inflammation indicates upper respiratory airway reactivity of viral etiology.',
    references: ['MEDLINE-URI-2023', 'NHS-COUGH-2024'],
    nextSteps:
      'Warm fluids, honey or lozenges can ease throat irritation. Monitor for elevated fever or shortness of breath.',
    associatedSymptoms: ['runny_nose', 'fatigue', 'headache', 'sneezing'],
    homeCare: [
      'Drink warm fluids (warm water with honey or lemon for adults and children over 1 year).',
      'Elevate your head with an extra pillow when sleeping to reduce overnight coughing fits.',
      'Avoid cold, dry air and airborne respiratory irritants such as tobacco smoke.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R003',
    title: 'Upper Airway Cough Syndrome Pattern',
    category: 'Common Cold & Upper Respiratory',
    conditions: ['blocked_nose', 'cough', 'runny_nose'],
    conditionGroups: [
      ['blocked_nose', 'cough'],
      ['blocked_nose', 'cough', 'runny_nose'],
    ],
    conclusion: 'upper_airway_cough_syndrome_pattern',
    conclusionTitle: 'Upper Airway Cough Syndrome Pattern',
    explanation:
      'Posterior pharyngeal secretions from nasal congestion trigger airway sensory receptors, producing a frequent clearing cough without lower airway distress.',
    references: ['CHEST-COUGH-2023', 'NHS-COUGH-2024'],
    nextSteps:
      'Steam inhalation and saline nasal irrigation can help thin secretions. Elevating the head while resting helps reduce coughing.',
    associatedSymptoms: ['sore_throat', 'fatigue', 'sneezing', 'headache'],
    homeCare: [
      'Perform regular saline nasal irrigation to clear excess secretions before they reach the throat.',
      'Take a warm, steamy shower or inhale steam from a bowl of hot water.',
      'Maintain steady fluid intake throughout the day to keep mucus thin and mobile.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R004',
    title: 'Acute Viral Pharyngitis Pattern',
    category: 'Common Cold & Upper Respiratory',
    conditions: ['sore_throat', 'fatigue', 'runny_nose'],
    conditionGroups: [
      ['sore_throat', 'fatigue'],
      ['sore_throat', 'fatigue', 'runny_nose'],
    ],
    conclusion: 'acute_viral_pharyngitis_pattern',
    conclusionTitle: 'Acute Viral Pharyngitis Pattern',
    explanation:
      'Pharyngeal discomfort accompanied by fatigue and mild upper respiratory secretions strongly points toward viral pharyngeal inflammation.',
    references: ['CDC-STREP-2024', 'NHS-SORETHROAT-2024'],
    nextSteps:
      'Warm saline gargles, adequate fluid intake, and rest. Consult a physician if swallowing becomes severely painful or if high fever develops.',
    associatedSymptoms: ['fever', 'blocked_nose', 'headache', 'cough'],
    homeCare: [
      'Perform warm salt-water gargles 3–4 times daily to reduce throat swelling.',
      'Consume smooth, soothing foods (soups, smoothies, oatmeal) and avoid dry or spicy foods.',
      'Rest your voice and avoid speaking loudly or shouting.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R005',
    title: 'Acute Bronchial Irritation (Intermediate Fact)',
    category: 'Common Cold & Upper Respiratory',
    conditions: ['cough', 'fatigue'],
    conclusion: 'acute_bronchial_irritation',
    conclusionTitle: 'Acute Bronchial Irritation',
    explanation:
      'Airway coughing combined with systemic fatigue indicates active bronchial reactivity and cytokine release.',
    references: ['MEDLINE-BRONCH-2023'],
    nextSteps:
      'Avoid airborne irritants, cold air exposure, and tobacco smoke. Maintain hydration.',
    isIntermediate: true,
    associatedSymptoms: ['fever', 'body_aches', 'shortness_of_breath'],
    homeCare: [
      'Rest in a comfortable, well-ventilated room with clean air.',
      'Sip warm caffeine-free herbal teas or broths to moisten airway passages.',
      'Avoid exposure to active or passive cigarette smoke, dust, and harsh fumes.',
    ],
    urgencyLevel: 'home_monitoring',
  },

  // =========================================================================
  // Category 2: Influenza-Like & Acute Respiratory Symptoms (R006 - R010)
  // =========================================================================
  {
    id: 'R006',
    title: 'Influenza-Like Illness (ILI) Pattern',
    category: 'Influenza-Like & Respiratory',
    conditions: ['fever', 'body_aches'],
    conditionGroups: [
      ['acute_bronchial_irritation', 'fever', 'body_aches'],
      ['fever', 'body_aches'],
      ['fever', 'chills', 'body_aches'],
    ],
    conclusion: 'influenza_like_pattern',
    conclusionTitle: 'Influenza-Like Illness (ILI) Pattern',
    explanation:
      'The sudden onset of fever accompanied by generalized myalgias (body aches) matches the core clinical definition for Influenza-Like Illness (CDC/WHO).',
    references: ['CDC-FLU-2024', 'WHO-ILI-2023'],
    nextSteps:
      'Strict bed rest, oral electrolyte rehydration, and temperature monitoring. Seek immediate clinical assessment for chest pain or breathing difficulty.',
    associatedSymptoms: ['chills', 'headache', 'sore_throat', 'fatigue', 'cough'],
    homeCare: [
      'Adhere to strict bed rest; conserve bodily energy for the immune response.',
      'Drink plenty of liquids: water, clear broths, and diluted fruit juices or oral rehydration drinks.',
      'Apply cool compresses to the forehead or neck for fever-related discomfort.',
      'Isolate at home away from vulnerable family members to prevent viral transmission.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R007',
    title: 'Lower Respiratory Tract Infection with Dyspnea (Urgent)',
    category: 'Influenza-Like & Respiratory',
    conditions: ['shortness_of_breath', 'cough'],
    conditionGroups: [
      ['shortness_of_breath', 'cough'],
      ['fever', 'cough', 'shortness_of_breath'],
    ],
    conclusion: 'febrile_lower_respiratory_warning',
    conclusionTitle: 'Lower Respiratory Tract Infection with Dyspnea (Urgent)',
    explanation:
      'Shortness of breath (dyspnea) accompanying a cough suggests acute lower airway or alveolar involvement (e.g. pneumonia, acute bronchitis) requiring prompt clinician assessment.',
    references: ['NHS-PNEUMO-2024', 'CDC-RESP-2024'],
    nextSteps:
      'URGENT: Prompt physician evaluation is advised to assess oxygen saturation, lung sounds, and chest status.',
    associatedSymptoms: ['chills', 'fatigue', 'body_aches', 'headache'],
    homeCare: [
      'URGENT: Do not rely solely on home remedies for breathing difficulty.',
      'Sit fully upright in a supportive chair to ease lung expansion while arranging clinical assessment.',
      'Keep warm and avoid any physical exertion or rapid movements.',
    ],
    urgencyLevel: 'emergency',
  },
  {
    id: 'R008',
    title: 'Acute Febrile Respiratory Syndrome with Rigors',
    category: 'Influenza-Like & Respiratory',
    conditions: ['fever', 'cough'],
    conditionGroups: [
      ['fever', 'cough'],
      ['fever', 'chills', 'cough'],
    ],
    conclusion: 'acute_febrile_chills_respiratory_pattern',
    conclusionTitle: 'Acute Febrile Respiratory Syndrome with Rigors',
    explanation:
      'Elevated body temperature alongside cough reflects an active infectious pyrogen response typical of acute respiratory tract infection.',
    references: ['MEDLINE-FEVER-2024', 'NHS-FLU-2024'],
    nextSteps:
      'Rest, cool compresses, and adequate fluid intake. Consult a healthcare provider if fever persists beyond 72 hours.',
    associatedSymptoms: ['body_aches', 'fatigue', 'headache', 'blocked_nose', 'chills'],
    homeCare: [
      'Dress in light, breathable layers; avoid overbundling with heavy blankets when shivering.',
      'Sip oral fluids frequently to counteract fluid loss from elevated body temperature.',
      'Monitor body temperature with a digital thermometer every 4 to 6 hours.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R009',
    title: 'Acute Respiratory Distress Airway Pattern (Urgent)',
    category: 'Influenza-Like & Respiratory',
    conditions: ['cough', 'shortness_of_breath', 'fatigue'],
    conditionGroups: [
      ['shortness_of_breath', 'fatigue'],
      ['cough', 'shortness_of_breath', 'fatigue'],
    ],
    conclusion: 'acute_respiratory_distress_pattern',
    conclusionTitle: 'Acute Respiratory Distress Airway Pattern (Urgent)',
    explanation:
      'Shortness of breath paired with profound systemic fatigue reflects significant respiratory compromise requiring professional evaluation.',
    references: ['GINA-ASTHMA-2023', 'NHS-ASTHMA-2024'],
    nextSteps:
      'Seek urgent clinical assessment. If breathing becomes increasingly labored or speech is interrupted, call emergency services.',
    associatedSymptoms: ['fever', 'body_aches', 'chills'],
    homeCare: [
      'Sit upright and lean slightly forward with arms supported to assist breathing muscles.',
      'Maintain slow, steady pursed-lip breathing while preparing for clinical assessment.',
      'Ensure the room is well-ventilated and free from smoke, aerosols, or chemical odors.',
    ],
    urgencyLevel: 'emergency',
  },
  {
    id: 'R010',
    title: 'Post-Viral Asthenia & Myalgia Pattern',
    category: 'Influenza-Like & Respiratory',
    conditions: ['cough', 'body_aches'],
    conditionGroups: [
      ['cough', 'body_aches'],
      ['cough', 'fatigue', 'body_aches'],
    ],
    conclusion: 'post_viral_asthenia_pattern',
    conclusionTitle: 'Post-Viral Asthenia & Myalgia Pattern',
    explanation:
      'Lingering cough with generalized muscle aching is characteristic of a protracted post-viral convalescent phase.',
    references: ['MEDLINE-MYALGIA-2023', 'NHS-FATIGUE-2024'],
    nextSteps:
      'Gradual resumption of light activities, restorative sleep, balanced nutrition, and hydration. Contact a clinician if fatigue remains unremitting after 3–4 weeks.',
    associatedSymptoms: ['headache', 'runny_nose', 'sore_throat', 'fatigue'],
    homeCare: [
      'Pace your daily activities and avoid pushing through severe exhaustion.',
      'Aim for 8 to 9 hours of uninterrupted nighttime sleep in a cool, quiet room.',
      'Soak in a warm Epsom salt bath to alleviate muscular soreness and body aches.',
    ],
    urgencyLevel: 'home_monitoring',
  },

  // =========================================================================
  // Category 3: Allergy & Allergic Rhinitis (R011 - R015)
  // =========================================================================
  {
    id: 'R011',
    title: 'Allergic Rhinitis (Hay Fever) Pattern',
    category: 'Allergy & Allergic Rhinitis',
    conditions: ['sneezing', 'itchy_or_watery_eyes'],
    conditionGroups: [
      ['sneezing', 'itchy_or_watery_eyes'],
      ['sneezing', 'runny_nose', 'itchy_or_watery_eyes'],
    ],
    conclusion: 'allergic_rhinitis_pattern',
    conclusionTitle: 'Allergic Rhinitis (Hay Fever) Pattern',
    explanation:
      'Paroxysmal sneezing accompanied by itchy or watery eyes reflects classic IgE-mediated mast cell degranulation in response to airborne allergens.',
    references: ['AAAAI-AR-2024', 'NHS-HAYFEVER-2024'],
    nextSteps:
      'Identify and minimize allergen exposure (pollen, dust mites, pet dander). Saline eye drops and nasal rinses provide non-pharmacological relief.',
    associatedSymptoms: ['blocked_nose', 'skin_itching', 'fatigue', 'headache', 'runny_nose'],
    homeCare: [
      'Keep home and car windows closed during high pollen count periods.',
      'Wash face, hair, and change clothes after returning from outdoor exposure.',
      'Rinse nasal passages with isotonic sterile saline to remove trapped allergens.',
      'Use cold damp washcloths over closed eyes to soothe ocular pruritus.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R012',
    title: 'Ocular-Nasal Allergic Pattern',
    category: 'Allergy & Allergic Rhinitis',
    conditions: ['itchy_or_watery_eyes', 'blocked_nose'],
    conclusion: 'ocular_nasal_allergic_pattern',
    conclusionTitle: 'Ocular-Nasal Allergic Pattern',
    explanation:
      'Concurrent ocular irritation (lacrimation, pruritus) and nasal obstruction suggest localized allergen-driven mucosal edema.',
    references: ['MEDLINE-ALLERGIC-2023', 'AAAAI-OCULAR-2024'],
    nextSteps:
      'Cold ocular compresses and nasal saline irrigation. Consult an optometrist or physician if eye pain or purulent discharge occurs.',
    associatedSymptoms: ['sneezing', 'runny_nose', 'headache', 'skin_itching'],
    homeCare: [
      'Refrain strictly from rubbing eyes, which triggers further histamine release from mast cells.',
      'Apply preservative-free lubricating artificial tears or cold eye compresses.',
      'Use a HEPA air purifier in the bedroom to filter airborne allergen particles.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R013',
    title: 'Allergic Upper Airway Pattern',
    category: 'Allergy & Allergic Rhinitis',
    conditions: ['sneezing', 'blocked_nose', 'itchy_or_watery_eyes'],
    conclusion: 'allergic_upper_airway_pattern',
    conclusionTitle: 'Allergic Upper Airway Pattern',
    explanation:
      'Bilateral nasal obstruction, sneezing, and ocular weeping indicate a pronounced upper respiratory allergic hypersensitivity reaction.',
    references: ['AAAAI-RHIN-2023', 'NHS-ALLERGIES-2024'],
    nextSteps:
      'Environmental control measures. Saline nasal rinses twice daily. Seek allergy specialist evaluation if persistent.',
    associatedSymptoms: ['runny_nose', 'skin_itching', 'cough', 'fatigue'],
    homeCare: [
      'Wash bed linens weekly in hot water (at least 60°C / 140°F) to eliminate dust mites.',
      'Vacuum living spaces using a vacuum cleaner equipped with a certified HEPA filter.',
      'Perform gentle nasal irrigation with sterile saline morning and evening.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R014',
    title: 'Histaminic Ocular-Cutaneous Pattern',
    category: 'Allergy & Allergic Rhinitis',
    conditions: ['skin_itching', 'itchy_or_watery_eyes'],
    conclusion: 'histamine_ocular_cutaneous_pattern',
    conclusionTitle: 'Histaminic Ocular-Cutaneous Pattern',
    explanation:
      'Pruritus affecting both cutaneous and conjunctival surfaces indicates widespread systemic mast cell degranulation.',
    references: ['MEDLINE-PRURITUS-2023', 'AAAAI-ANAPHYLAXIS-2023'],
    nextSteps:
      'Avoid identified contact allergens, scented soaps, and hot baths. Seek urgent care if lip swelling or breathing changes develop.',
    associatedSymptoms: ['skin_rash_or_hives', 'sneezing', 'runny_nose'],
    homeCare: [
      'Take lukewarm (not hot) baths and pat skin dry gently with a soft towel.',
      'Wear loose-fitting, soft cotton clothing; avoid wool and synthetic fabrics.',
      'Apply cold, wet compresses directly to itchy skin and ocular areas for soothing relief.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R015',
    title: 'Atopic Dermal Flare Pattern',
    category: 'Allergy & Allergic Rhinitis',
    conditions: ['skin_itching', 'skin_rash_or_hives'],
    conclusion: 'atopic_dermatitis_flare_pattern',
    conclusionTitle: 'Atopic Dermal Flare Pattern',
    explanation:
      'Intense cutaneous pruritus alongside visible eruptive erythema or urticarial lesions indicates an active atopic or allergic dermal flare.',
    references: ['AAD-ECZEMA-2024', 'NHS-HIVES-2024'],
    nextSteps:
      'Gentle skin barrier moisturization with bland emollients. Consult a dermatologist if lesions blister or show signs of secondary infection.',
    associatedSymptoms: ['itchy_or_watery_eyes', 'fatigue', 'fever'],
    homeCare: [
      'Apply thick, fragrance-free emollient cream within 3 minutes of bathing to seal skin moisture.',
      'Keep fingernails trimmed short to minimize mechanical skin damage from scratching.',
      'Use mild, hypoallergenic, fragrance-free laundry detergents and avoid fabric softeners.',
    ],
    urgencyLevel: 'home_monitoring',
  },

  // =========================================================================
  // Category 4: Sinus & Craniofacial Symptoms (R016 - R020)
  // =========================================================================
  {
    id: 'R016',
    title: 'Acute Rhinosinusitis Pattern',
    category: 'Sinus & Craniofacial',
    conditions: ['facial_pressure_or_pain', 'blocked_nose'],
    conditionGroups: [
      ['facial_pressure_or_pain', 'blocked_nose'],
      ['blocked_nose', 'facial_pressure_or_pain', 'headache'],
    ],
    conclusion: 'acute_rhinosinusitis_pattern',
    conclusionTitle: 'Acute Rhinosinusitis Pattern',
    explanation:
      'Nasal obstruction accompanied by paranasal facial pressure or aching pain is characteristic of acute rhinosinusitis.',
    references: ['AAO-HNS-SINUS-2023', 'NHS-SINUSITIS-2024'],
    nextSteps:
      'Warm facial compresses, steam inhalation, and nasal saline rinses. Most cases are viral; consult a physician if worsening after 10 days.',
    associatedSymptoms: ['reduced_smell', 'cough', 'runny_nose', 'fever', 'headache'],
    homeCare: [
      'Apply warm, moist towels across the cheeks, bridge of nose, and forehead for 10–15 minutes.',
      'Perform saline nasal irrigation using distilled or boiled-and-cooled water 2–3 times daily.',
      'Drink plenty of warm liquids to thin paranasal sinus secretions and aid drainage.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R017',
    title: 'Febrile Acute Sinusitis Pattern',
    category: 'Sinus & Craniofacial',
    conditions: ['blocked_nose', 'facial_pressure_or_pain', 'fever'],
    conclusion: 'febrile_sinusitis_pattern',
    conclusionTitle: 'Febrile Acute Sinusitis Pattern',
    explanation:
      'Sinus congestion and facial tenderness accompanied by fever suggests pronounced inflammation or secondary bacterial infection.',
    references: ['CDC-SINUS-2024', 'AAO-HNS-SINUS-2023'],
    nextSteps:
      'Medical consultation is recommended if fever persists beyond 3 days or if orbital swelling develops.',
    associatedSymptoms: ['headache', 'fatigue', 'reduced_smell', 'chills'],
    homeCare: [
      'Rest with your head propped up on 2–3 pillows to encourage gravity drainage of the sinuses.',
      'Maintain regular hydration to prevent sinus mucus from drying out and blocking ostia.',
      'Monitor body temperature and watch for periorbital swelling or redness.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R018',
    title: 'Sinus Olfactory Impairment Pattern',
    category: 'Sinus & Craniofacial',
    conditions: ['blocked_nose', 'reduced_smell'],
    conditionGroups: [
      ['blocked_nose', 'reduced_smell'],
      ['blocked_nose', 'reduced_smell', 'facial_pressure_or_pain'],
    ],
    conclusion: 'sinus_olfactory_impairment_pattern',
    conclusionTitle: 'Sinus Olfactory Impairment Pattern',
    explanation:
      'Impaired olfaction associated with nasal blockage indicates mucosal swelling within the olfactory cleft and superior nasal vault.',
    references: ['MEDLINE-SMELL-2023', 'NHS-ANOSMIA-2024'],
    nextSteps:
      'Saline nasal irrigation to reduce mucosal edema. Seek clinical assessment if olfactory impairment persists after resolution of congestion.',
    associatedSymptoms: ['headache', 'runny_nose', 'sneezing', 'facial_pressure_or_pain'],
    homeCare: [
      'Gently irrigate the nasal cavities with sterile saline to cleanse the olfactory cleft.',
      'Maintain adequate ambient indoor humidity (40–50%) using a clean room humidifier.',
      'Avoid active and passive tobacco smoke, which impairs olfactory neuroepithelium recovery.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R019',
    title: 'Frontal Sinus Cephalalgia Pattern',
    category: 'Sinus & Craniofacial',
    conditions: ['facial_pressure_or_pain', 'headache'],
    conclusion: 'frontal_sinus_headache_pattern',
    conclusionTitle: 'Frontal Sinus Cephalalgia Pattern',
    explanation:
      'Facial pressure localized to the supraorbital rim paired with frontal cranial aching indicates pressure dysregulation within the frontal sinuses.',
    references: ['IHS-HEADACHE-2023', 'MEDLINE-SINUS-2024'],
    nextSteps:
      'Warm facial compresses and hydration. Differentiate from tension or migraine headaches if nasal symptoms are absent.',
    associatedSymptoms: ['blocked_nose', 'reduced_smell', 'fatigue', 'sore_throat'],
    homeCare: [
      'Apply a warm compress over the forehead and bridge of the nose for 10 minutes at a time.',
      'Rest in a quiet room with dimmed lighting to reduce ocular and cranial strain.',
      'Sip warm water or decaffeinated tea consistently to maintain systemic hydration.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R020',
    title: 'Sinobronchial Drainage Pattern',
    category: 'Sinus & Craniofacial',
    conditions: ['facial_pressure_or_pain', 'blocked_nose', 'cough'],
    conclusion: 'sinobronchial_drainage_pattern',
    conclusionTitle: 'Sinobronchial Drainage Pattern',
    explanation:
      'Concurrent sinus pressure, nasal blockage, and productive cough reflect downward pharyngeal drainage triggering laryngeal cough receptors.',
    references: ['CHEST-POSTNASAL-2023', 'NHS-COUGH-2024'],
    nextSteps:
      'Target upper airway clearance with nasal irrigation and hydration. Medical review if cough persists >3 weeks.',
    associatedSymptoms: ['sore_throat', 'headache', 'fatigue', 'reduced_smell'],
    homeCare: [
      'Perform saline nasal irrigation to clear the nasopharynx before bedtime.',
      'Elevate the head of your bed slightly to prevent nocturnal accumulation of mucus in the pharynx.',
      'Inhale warm steam from a warm shower or facial steamer to loosen thick upper airway secretions.',
    ],
    urgencyLevel: 'home_monitoring',
  },

  // =========================================================================
  // Category 5: Digestive & Acute Gastrointestinal (R021 - R025)
  // =========================================================================
  {
    id: 'R021',
    title: 'Acute Gastroenteritis Pattern',
    category: 'Digestive & Gastrointestinal',
    conditions: ['diarrhea', 'abdominal_pain'],
    conditionGroups: [
      ['diarrhea', 'abdominal_pain'],
      ['diarrhea', 'nausea', 'abdominal_pain'],
    ],
    conclusion: 'acute_gastroenteritis_pattern',
    conclusionTitle: 'Acute Gastroenteritis Pattern',
    explanation:
      'Loose watery stools accompanied by cramping abdominal pain is characteristic of acute infectious gastroenteritis.',
    references: ['CDC-NORO-2024', 'NIDDK-GASTRO-2023'],
    nextSteps:
      'Oral rehydration therapy with balanced electrolyte solutions is the cornerstone of management. Seek urgent care for signs of severe dehydration.',
    associatedSymptoms: ['vomiting', 'fever', 'fatigue', 'chills', 'nausea'],
    homeCare: [
      'Take frequent, small sips of oral rehydration salts (ORS) or diluted broths rather than large gulps.',
      'When ready to eat, follow a gentle bland diet: bananas, plain white rice, applesauce, and toast (BRAT diet).',
      'Avoid high-fat foods, dairy products, spicy dishes, alcohol, and caffeine until bowel movements normalize.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R022',
    title: 'Acute Enteric Emesis & Diarrhea Pattern',
    category: 'Digestive & Gastrointestinal',
    conditions: ['vomiting', 'diarrhea'],
    conclusion: 'acute_enteric_emesis_diarrhea_pattern',
    conclusionTitle: 'Acute Enteric Emesis & Diarrhea Pattern',
    explanation:
      'Concurrent vomiting and diarrhea indicates generalized acute gastrointestinal tract inflammation with accelerated fluid loss.',
    references: ['MEDLINE-GASTRO-2024', 'NHS-DIARRHOEA-2024'],
    nextSteps:
      'Small, frequent sips of oral rehydration solution. Seek medical review if unable to retain fluids for over 24 hours.',
    associatedSymptoms: ['nausea', 'abdominal_pain', 'fatigue', 'fever'],
    homeCare: [
      'Rest your stomach for 30–60 minutes after an episode of vomiting, then resume small sips of fluid.',
      'Sip 1 to 2 tablespoons (15–30 mL) of electrolyte fluid every 10–15 minutes.',
      'Monitor urination frequency and color: dark, infrequent urine indicates emerging dehydration.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R023',
    title: 'Febrile Enteric Infection Pattern',
    category: 'Digestive & Gastrointestinal',
    conditions: ['fever', 'diarrhea'],
    conditionGroups: [
      ['fever', 'diarrhea'],
      ['fever', 'diarrhea', 'abdominal_pain'],
    ],
    conclusion: 'febrile_enteric_infection_pattern',
    conclusionTitle: 'Febrile Enteric Infection Pattern',
    explanation:
      'Diarrhea coinciding with pyrexia raises suspicion for an invasive enteric bacterial or viral pathogen.',
    references: ['CDC-FOODBORNE-2024', 'NIDDK-DIARRHEA-2023'],
    nextSteps:
      'Medical assessment is recommended for stool evaluation and hydration monitoring, particularly if blood is noted in stool.',
    associatedSymptoms: ['vomiting', 'nausea', 'chills', 'fatigue', 'abdominal_pain'],
    homeCare: [
      'Maintain active oral rehydration with balanced electrolyte solutions.',
      'Practice meticulous hand hygiene with soap and water to prevent cross-contamination.',
      'Rest comfortably and avoid solid foods during the initial acute febrile phase.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R024',
    title: 'Enteric Fluid Depletion Risk Pattern (Chained)',
    category: 'Digestive & Gastrointestinal',
    conditions: ['acute_gastroenteritis_pattern', 'fatigue', 'vomiting'],
    conditionGroups: [
      ['acute_gastroenteritis_pattern', 'vomiting'],
      ['acute_gastroenteritis_pattern', 'fatigue', 'vomiting'],
    ],
    conclusion: 'enteric_dehydration_risk_pattern',
    conclusionTitle: 'Enteric Fluid Depletion Risk Pattern',
    explanation:
      'Gastroenteritis compounded by persistent vomiting and systemic fatigue strongly points toward early hypovolemia and dehydration.',
    references: ['WHO-REHYDRATION-2023', 'NHS-DEHYDRATION-2024'],
    nextSteps:
      'URGENT: Prioritize active electrolyte replacement. Seek medical evaluation if unable to keep liquids down or experiencing lightheadedness.',
    associatedSymptoms: ['fever', 'chills', 'abdominal_pain', 'fatigue'],
    homeCare: [
      'URGENT: Use oral rehydration solution (ORS) by teaspoon or syringe every few minutes.',
      'Rest in a recumbent position; avoid sudden standing to prevent orthostatic dizziness.',
      'Seek prompt urgent care if urine output ceases for more than 8 hours or if extreme thirst develops.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R025',
    title: 'Functional Gastric Distress Pattern',
    category: 'Digestive & Gastrointestinal',
    conditions: ['nausea', 'vomiting'],
    conditionGroups: [
      ['nausea', 'vomiting'],
      ['abdominal_pain', 'nausea', 'heartburn_or_acid_reflux'],
    ],
    conclusion: 'functional_gastric_distress_pattern',
    conclusionTitle: 'Functional Gastric Distress Pattern',
    explanation:
      'Nausea and vomiting or upper abdominal discomfort paired with acid reflux features matches an acute dyspeptic or delayed gastric emptying pattern.',
    references: ['NIDDK-INDIGESTION-2023', 'NHS-INDIGESTION-2024'],
    nextSteps:
      'Dietary modification, smaller meal portions, avoiding NSAIDs. Consult a physician for persistent or severe symptoms.',
    associatedSymptoms: ['vomiting', 'fatigue', 'diarrhea', 'abdominal_pain'],
    homeCare: [
      'Eat small, frequent, low-fat meals rather than two or three large meals.',
      'Remain upright for at least 2 hours after consuming any food or beverage.',
      'Sip warm chamomile or ginger tea to naturally settle gastric discomfort.',
    ],
    urgencyLevel: 'home_monitoring',
  },

  // =========================================================================
  // Category 6: Acid Reflux & Dyspepsia (R026 - R030)
  // =========================================================================
  {
    id: 'R026',
    title: 'Gastroesophageal Reflux (GERD) Pattern',
    category: 'Acid Reflux & Heartburn',
    conditions: ['heartburn_or_acid_reflux'],
    conditionGroups: [
      ['heartburn_or_acid_reflux'],
      ['heartburn_or_acid_reflux', 'nausea'],
    ],
    conclusion: 'gerd_pattern',
    conclusionTitle: 'Gastroesophageal Reflux (GERD) Pattern',
    explanation:
      'Retrosternal pyrosis or acidic regurgitation reflects retrograde transit of acidic gastric contents across an incompetent lower esophageal sphincter.',
    references: ['NIDDK-GERD-2023', 'ACG-GERD-2022'],
    nextSteps:
      'Lifestyle modifications: avoid recumbency within 3 hours of meals, elevate head of bed, and limit dietary triggers. Physician consult if refractory.',
    associatedSymptoms: ['abdominal_pain', 'cough', 'sore_throat', 'nausea'],
    homeCare: [
      'Elevate the head of your bed by 6 to 8 inches (15–20 cm) using bed risers or a wedge pillow.',
      'Do not eat within 3 hours before lying down or going to bed.',
      'Limit or avoid common reflux triggers: citrus fruits, chocolate, peppermint, fried foods, and coffee.',
      'Wear loose-fitting clothing to eliminate external mechanical pressure on the stomach.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R027',
    title: 'Reflux-Associated Airway Cough Pattern (Chained)',
    category: 'Acid Reflux & Heartburn',
    conditions: ['gerd_pattern', 'cough'],
    conclusion: 'reflux_associated_cough_pattern',
    conclusionTitle: 'Reflux-Associated Airway Cough Pattern',
    explanation:
      'Chronic dry cough co-occurring with acid reflux results from micro-aspiration of acidic aerosol or vagally mediated esophagobronchial reflexes.',
    references: ['CHEST-GERD-COUGH-2023', 'NHS-GERD-2024'],
    nextSteps:
      'Reflux lifestyle measures often resolve the cough. Clinical evaluation is warranted to differentiate from asthma or post-infectious cough.',
    associatedSymptoms: ['sore_throat', 'heartburn_or_acid_reflux'],
    homeCare: [
      'Avoid evening meals and bedtime snacks; sleep on your left side to minimize nighttime reflux events.',
      'Sip room-temperature water when an episode of coughing occurs.',
      'Avoid caffeinated, carbonated, and alcoholic beverages.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R028',
    title: 'Laryngopharyngeal Reflux Pattern (Chained)',
    category: 'Acid Reflux & Heartburn',
    conditions: ['gerd_pattern', 'sore_throat'],
    conclusion: 'laryngopharyngeal_reflux_pattern',
    conclusionTitle: 'Laryngopharyngeal Reflux Pattern',
    explanation:
      'Gastroesophageal reflux reaching the laryngeal inlet produces chemical irritation, throat clearing, and pharyngeal discomfort.',
    references: ['AAO-HNS-LPR-2023', 'MEDLINE-REFLUX-2023'],
    nextSteps:
      'Strict anti-reflux measures. ENT or gastroenterology consultation if hoarseness, dysphagia, or persistent irritation occurs.',
    associatedSymptoms: ['cough', 'heartburn_or_acid_reflux', 'nausea'],
    homeCare: [
      'Avoid throat-clearing forcefully; swallow small sips of water instead.',
      'Maintain an alkaline diet with non-acidic foods (oatmeal, melons, bananas, green vegetables).',
      'Refrain from eating large meals and avoid lying down flat during the daytime.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R029',
    title: 'Dyspeptic Epigastric Reflux Pattern',
    category: 'Acid Reflux & Heartburn',
    conditions: ['heartburn_or_acid_reflux', 'abdominal_pain'],
    conclusion: 'dyspeptic_reflux_pattern',
    conclusionTitle: 'Dyspeptic Epigastric Reflux Pattern',
    explanation:
      'Epigastric discomfort combined with heartburn points to combined upper gastrointestinal dysmotility and acid hypersecretion.',
    references: ['NIDDK-DYSPEPSIA-2023', 'NHS-HEARTBURN-2024'],
    nextSteps:
      'Avoid NSAID use, reduce meal sizes, and limit dietary irritants. Consult a clinician if pain is severe, radiating, or accompanied by black stools.',
    associatedSymptoms: ['nausea', 'vomiting', 'fatigue'],
    homeCare: [
      'Avoid non-steroidal anti-inflammatory drugs (NSAIDs like ibuprofen or aspirin) which irritate stomach lining.',
      'Chew food slowly and thoroughly in a relaxed, upright dining posture.',
      'Sip a cup of warm chamomile or ginger tea after dining.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R030',
    title: 'Reflux Upper Abdominal Discomfort Pattern',
    category: 'Acid Reflux & Heartburn',
    conditions: ['heartburn_or_acid_reflux', 'abdominal_pain', 'nausea'],
    conclusion: 'reflux_discomfort_pattern',
    conclusionTitle: 'Reflux Upper Abdominal Discomfort Pattern',
    explanation:
      'Concurrent heartburn, abdominal pain, and nausea indicates severe upper gastric irritation with delayed stomach emptying.',
    references: ['MEDLINE-REFLUX-2024', 'ACG-DYSPEPSIA-2022'],
    nextSteps:
      'Bland diet and upright positioning. Clinical assessment recommended to rule out peptic ulcer disease or biliary pathology.',
    associatedSymptoms: ['fatigue', 'vomiting', 'diarrhea'],
    homeCare: [
      'Take small, frequent portions of bland foods: plain oatmeal, boiled potatoes, or crackers.',
      'Keep a detailed 7-day food and symptom journal to detect specific personal trigger ingredients.',
      'Avoid lying down or bending forward at the waist immediately following meals.',
    ],
    urgencyLevel: 'home_monitoring',
  },

  // =========================================================================
  // Category 7: Headache & Migraine Symptom Patterns (R031 - R035)
  // =========================================================================
  {
    id: 'R031',
    title: 'Migraine Symptom Complex Pattern',
    category: 'Headache & Migraine',
    conditions: ['headache', 'sensitivity_to_light'],
    conditionGroups: [
      ['headache', 'sensitivity_to_light'],
      ['headache', 'sensitivity_to_light', 'nausea'],
    ],
    conclusion: 'migraine_pattern',
    conclusionTitle: 'Migraine Symptom Complex Pattern',
    explanation:
      'Headache coupled with photophobia (light sensitivity) and optional nausea reflects trigeminovascular activation and neurogenic inflammation characteristic of migraine.',
    references: ['IHS-ICHD3-2023', 'NHS-MIGRAINE-2024'],
    nextSteps:
      'Rest in a dark, quiet room with cold cranial compresses. Consult a neurologist or GP for targeted prescription triptans or preventive therapies.',
    associatedSymptoms: ['fatigue', 'neck_stiffness', 'reduced_smell', 'nausea'],
    homeCare: [
      'Retreat to a dark, quiet, climate-controlled room at the earliest onset of headache symptoms.',
      'Apply an ice pack or cold gel compress wrapped in a cloth across the forehead or base of skull.',
      'Sip small amounts of chilled water slowly to prevent dehydration-induced exacerbation.',
      'Turn off electronic screens, smartphones, and harsh fluorescent lighting.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R032',
    title: 'Tension-Type Headache Pattern',
    category: 'Headache & Migraine',
    conditions: ['headache', 'fatigue'],
    conclusion: 'tension_headache_pattern',
    conclusionTitle: 'Tension-Type Headache Pattern',
    explanation:
      'Bilateral, pressing, band-like cranial aching occurring in the context of fatigue is typical of episodic tension-type headache.',
    references: ['IHS-TENSION-2023', 'MEDLINE-TENSION-2023'],
    nextSteps:
      'Stress reduction, ergonomic adjustments, adequate hydration, and regular sleep. Seek evaluation if frequency increases or pattern changes.',
    associatedSymptoms: ['body_aches', 'neck_stiffness', 'blocked_nose'],
    homeCare: [
      'Perform gentle neck, shoulder, and upper back stretches to release muscular tension.',
      'Apply a warm heating pad or take a warm shower to relax tight paracervical muscles.',
      'Take regular 5-minute visual and physical breaks during prolonged computer screen work.',
      'Ensure adequate daily fluid intake of at least 2 liters of water.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R033',
    title: 'Photophobic Cephalalgia Pattern',
    category: 'Headache & Migraine',
    conditions: ['headache', 'sensitivity_to_light', 'fatigue'],
    conclusion: 'photophobic_cephalalgia_pattern',
    conclusionTitle: 'Photophobic Cephalalgia Pattern',
    explanation:
      'Headache coupled with photophobia and generalized exhaustion points toward migraine-spectrum neurovascular irritability.',
    references: ['IHS-MIGRAINE-2023', 'NHS-HEADACHE-2024'],
    nextSteps:
      'Sensory deprivation in a dim room. Physician review recommended for recurrent episodes to discuss abortive migraine medications.',
    associatedSymptoms: ['nausea', 'neck_stiffness', 'body_aches'],
    homeCare: [
      'Wear sunglasses or tinted lenses if you must navigate brightly lit environments.',
      'Rest quietly with eyes closed in a calm, dimly lit environment.',
      'Maintain consistent sleep and meal schedules to avoid triggering neurovascular flares.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R034',
    title: 'Cervicogenic Fatigue Headache Pattern',
    category: 'Headache & Migraine',
    conditions: ['headache', 'body_aches', 'fatigue'],
    conclusion: 'cervicogenic_fatigue_headache_pattern',
    conclusionTitle: 'Cervicogenic Fatigue Headache Pattern',
    explanation:
      'Cranial aching co-occurring with generalized myalgias and fatigue suggests tension-type or cervicogenic headache linked to musculoskeletal strain.',
    references: ['MEDLINE-CERVICOGENIC-2023', 'NHS-PAIN-2024'],
    nextSteps:
      'Physical therapy assessment, ergonomic review, and heat therapy. Clinical evaluation if headache is severe or progressive.',
    associatedSymptoms: ['neck_stiffness', 'sensitivity_to_light'],
    homeCare: [
      'Apply moist heat (warm towel or heating pad) across the back of the neck for 15 minutes.',
      'Practice gentle range-of-motion neck movements: slow chin tucks and side-to-side head turns.',
      'Check desk chair height and computer screen level to ensure neutral cervical spine posture.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R035',
    title: 'Meningeal Irritation Warning Pattern (Urgent)',
    category: 'Headache & Migraine',
    conditions: ['neck_stiffness', 'fever'],
    conditionGroups: [
      ['neck_stiffness', 'fever'],
      ['headache', 'neck_stiffness', 'fever'],
    ],
    conclusion: 'meningeal_irritation_warning_pattern',
    conclusionTitle: 'Meningeal Irritation Warning Pattern (Urgent)',
    explanation:
      'Nuchal rigidity (neck stiffness) co-occurring with fever, with or without headache, is a critical red-flag sign of acute meningeal inflammation (meningitis).',
    references: ['CDC-MENING-2024', 'NHS-MENINGITIS-2024', 'WHO-MENINGITIS-2023'],
    nextSteps:
      'EMERGENCY: Immediate emergency hospital evaluation is imperative. Do not wait for additional symptoms to develop.',
    associatedSymptoms: ['sensitivity_to_light', 'nausea', 'vomiting', 'fatigue', 'headache'],
    homeCare: [
      'CRITICAL: Do not attempt home treatment. This is a potential medical emergency.',
      'Call emergency services (911, 999, 112) or proceed immediately to the nearest hospital emergency department.',
    ],
    urgencyLevel: 'emergency',
  },

  // =========================================================================
  // Category 8: Skin & Cutaneous Symptoms (R036 - R040)
  // =========================================================================
  {
    id: 'R036',
    title: 'Acute Urticaria / Pruritic Flare Pattern',
    category: 'Skin & Cutaneous',
    conditions: ['skin_rash_or_hives', 'skin_itching'],
    conclusion: 'acute_urticaria_pattern',
    conclusionTitle: 'Acute Urticaria / Pruritic Flare Pattern',
    explanation:
      'Intensely pruritic, transient erythematous wheals and cutaneous eruptions reflect mast cell activation within the superficial dermis.',
    references: ['EAACI-URTICARIA-2023', 'NHS-URTICARIA-2024'],
    nextSteps:
      'Cool compresses, avoid tight clothing and known triggers. Seek emergency assessment immediately if lip, tongue, or airway swelling occurs.',
    associatedSymptoms: ['itchy_or_watery_eyes', 'fatigue', 'fever'],
    homeCare: [
      'Apply cool, damp washcloths to affected skin areas for 10–15 minutes at a time to reduce itching.',
      'Take a lukewarm bath and avoid scrubbing with rough sponges or washcloths.',
      'Wear loose-fitting, soft cotton clothing; avoid wool and synthetic fabrics that rub against skin.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R037',
    title: 'Febrile Viral Exanthem Pattern',
    category: 'Skin & Cutaneous',
    conditions: ['skin_rash_or_hives', 'fever'],
    conditionGroups: [
      ['skin_rash_or_hives', 'fever'],
      ['skin_rash_or_hives', 'fever', 'body_aches'],
    ],
    conclusion: 'febrile_viral_exanthem_pattern',
    conclusionTitle: 'Febrile Viral Exanthem Pattern',
    explanation:
      'A cutaneous eruption arising alongside fever is characteristic of a systemic viral exanthem.',
    references: ['CDC-EXANTHEM-2024', 'MEDLINE-RASH-2023'],
    nextSteps:
      'Hydration, rest, and skin observation. Seek prompt clinical review to determine underlying viral etiology and exclude invasive infections.',
    associatedSymptoms: ['fatigue', 'headache', 'chills', 'skin_itching', 'body_aches'],
    homeCare: [
      'Keep skin clean, dry, and cool; avoid hot showers which intensify itching and vasodilation.',
      'Drink plenty of oral fluids to compensate for fever-induced evaporative water loss.',
      'Monitor rash carefully for any signs of blistering, purpura (dark purple spots that don’t fade on pressure), or skin peeling.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R038',
    title: 'Post-Infectious Asthenic Rash Pattern',
    category: 'Skin & Cutaneous',
    conditions: ['skin_rash_or_hives', 'fatigue'],
    conclusion: 'post_infectious_rash_pattern',
    conclusionTitle: 'Post-Infectious Asthenic Rash Pattern',
    explanation:
      'Cutaneous eruption paired with systemic fatigue without high fever suggests a post-infectious immune-complex-mediated exanthem.',
    references: ['NHS-RASH-2024', 'MEDLINE-EXANTHEM-2023'],
    nextSteps:
      'Rest, gentle skin barrier care, and emollient application. Consult a doctor if lesions become tender, blister, or persist past 14 days.',
    associatedSymptoms: ['body_aches', 'skin_itching', 'headache'],
    homeCare: [
      'Apply gentle, fragrance-free moisturizing lotions or ointments to support skin barrier repair.',
      'Rest adequately and avoid strenuous physical exercise until energy levels recover.',
      'Avoid harsh chemical soaps, body washes, and perfumed cosmetics.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R039',
    title: 'Cutaneous-Ocular Hypersensitivity Pattern',
    category: 'Skin & Cutaneous',
    conditions: ['skin_rash_or_hives', 'itchy_or_watery_eyes'],
    conclusion: 'cutaneous_ocular_hypersensitivity_pattern',
    conclusionTitle: 'Cutaneous-Ocular Hypersensitivity Pattern',
    explanation:
      'Concurrent rash/hives and ocular allergic signs indicate multi-site histaminergic hypersensitivity from systemic or environmental allergen contact.',
    references: ['AAAAI-HYPERSENS-2023', 'NHS-ALLERGY-2024'],
    nextSteps:
      'Avoid suspect allergens (food, medication, plant contact). Urgent evaluation needed if accompanied by wheezing or throat tightness.',
    associatedSymptoms: ['skin_itching', 'sneezing', 'runny_nose'],
    homeCare: [
      'Rinse affected skin and face thoroughly with cool, clean water to remove trace allergens.',
      'Apply cold compresses over closed eyes and irritated skin areas.',
      'Review any newly introduced medications, soaps, foods, or lotions with a healthcare provider.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R040',
    title: 'Reactive Enteric Exanthem Pattern',
    category: 'Skin & Cutaneous',
    conditions: ['skin_rash_or_hives', 'diarrhea'],
    conditionGroups: [
      ['skin_rash_or_hives', 'diarrhea'],
      ['skin_rash_or_hives', 'fever', 'diarrhea'],
    ],
    conclusion: 'reactive_enteric_exanthem_pattern',
    conclusionTitle: 'Reactive Enteric Exanthem Pattern',
    explanation:
      'Cutaneous eruption accompanied by acute diarrheal illness points to a reactive cutaneous response to an enteric pathogen.',
    references: ['CDC-ENTERIC-2023', 'NIDDK-GI-2023'],
    nextSteps:
      'Physician evaluation is recommended. Maintain oral fluid hydration and monitor for signs of systemic toxicity.',
    associatedSymptoms: ['abdominal_pain', 'nausea', 'vomiting', 'fatigue', 'fever'],
    homeCare: [
      'Prioritize oral electrolyte solutions to replace fluid and minerals lost from fever and diarrhea.',
      'Practice strict hand hygiene before touching food or other household items.',
      'Rest in bed and avoid solid, heavy meals until evaluated by a healthcare professional.',
    ],
    urgencyLevel: 'prompt_doctor',
  },

  // =========================================================================
  // Category 9: Urinary Symptoms (R041 - R045)
  // =========================================================================
  {
    id: 'R041',
    title: 'Uncomplicated Lower Urinary (Cystitis) Pattern',
    category: 'Urinary Tract & Renal',
    conditions: ['burning_urination', 'frequent_urination'],
    conclusion: 'uti_cystitis_pattern',
    conclusionTitle: 'Uncomplicated Lower Urinary (Cystitis) Pattern',
    explanation:
      'The classic pairing of dysuria (burning micturition) and urinary frequency without fever is highly predictive of lower urinary tract infection (cystitis).',
    references: ['CDC-UTI-2024', 'NHS-UTI-2024', 'NIDDK-UTI-2023'],
    nextSteps:
      'Clinical consultation is recommended for urine dipstick/culture and prescription antimicrobial therapy if confirmed. Drink plenty of water.',
    associatedSymptoms: ['abdominal_pain', 'fever', 'fatigue'],
    homeCare: [
      'Drink plenty of water throughout the day to help flush bacteria out of the urinary tract.',
      'Empty your bladder completely as soon as you feel the urge; do not hold urine.',
      'Apply a warm hot-water bottle or heating pad wrapped in a towel to the lower abdomen for comfort.',
      'Avoid coffee, alcohol, carbonated sodas, and citrus juices which can irritate the bladder lining.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R042',
    title: 'Febrile Urinary Tract Warning (Potential Pyelonephritis)',
    category: 'Urinary Tract & Renal',
    conditions: ['burning_urination', 'frequent_urination', 'fever'],
    conclusion: 'febrile_uti_pyelonephritis_warning',
    conclusionTitle: 'Febrile Urinary Tract Warning (Potential Pyelonephritis)',
    explanation:
      'Lower urinary symptoms combined with fever indicates potential ascent of infection to the upper urinary tract and renal parenchyma (acute pyelonephritis).',
    references: ['NHS-PYELO-2024', 'CDC-UTI-2024'],
    nextSteps:
      'PROMPT CLINICAL EVALUATION: Timely medical evaluation is necessary to prevent renal parenchymal injury or bacteremia.',
    associatedSymptoms: ['chills', 'nausea', 'vomiting', 'abdominal_pain'],
    homeCare: [
      'PROMPT MEDICAL ATTENTION REQUIRED: Do not attempt self-care alone; antibiotic therapy is needed for upper UTI.',
      'Drink water frequently while waiting for or traveling to your medical appointment.',
      'Rest in bed and monitor your body temperature closely.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R043',
    title: 'Pyelonephritis Systemic Triad Warning',
    category: 'Urinary Tract & Renal',
    conditions: ['burning_urination', 'fever'],
    conditionGroups: [
      ['burning_urination', 'fever'],
      ['burning_urination', 'fever', 'chills'],
    ],
    conclusion: 'pyelonephritis_systemic_triad',
    conclusionTitle: 'Pyelonephritis Systemic Triad Warning',
    explanation:
      'Dysuria accompanied by fever represents a systemic infectious warning strongly suggestive of upper urinary tract involvement.',
    references: ['MEDLINE-PYELO-2023', 'NHS-KIDNEY-INFECTION-2024'],
    nextSteps:
      'Seek prompt medical care at an urgent care clinic or emergency facility for urine microscopy, blood cultures, and targeted therapy.',
    associatedSymptoms: ['frequent_urination', 'vomiting', 'nausea', 'fatigue', 'chills'],
    homeCare: [
      'Seek urgent clinical assessment. This condition typically requires clinician-prescribed antibiotics.',
      'Rest quietly and stay hydrated with small, regular sips of water.',
      'Do not take over-the-counter painkillers that contain ibuprofen without medical advice, as NSAIDs can impact kidney function.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R044',
    title: 'Lower Urinary Discomfort Pattern',
    category: 'Urinary Tract & Renal',
    conditions: ['burning_urination', 'abdominal_pain'],
    conclusion: 'lower_urinary_discomfort_pattern',
    conclusionTitle: 'Lower Urinary Discomfort Pattern',
    explanation:
      'Dysuria occurring with lower abdominal or suprapubic aching reflects bladder wall inflammation and localized detrusor muscle irritation.',
    references: ['NIDDK-CYSTITIS-2023', 'NHS-UTI-2024'],
    nextSteps:
      'Urinalysis and clinical review recommended. Maintain high fluid intake. Seek prompt care if fever or flank pain develops.',
    associatedSymptoms: ['frequent_urination', 'fever', 'fatigue'],
    homeCare: [
      'Increase your daily fluid intake (primarily water) to encourage regular urination.',
      'Apply a warm heating pad across the lower pelvis/abdomen to relax muscular cramping.',
      'Wear loose cotton underwear and avoid perfumed bubble baths or feminine hygiene sprays.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R045',
    title: 'Frequent Micturition with Lower Abdominal Discomfort',
    category: 'Urinary Tract & Renal',
    conditions: ['frequent_urination', 'abdominal_pain'],
    conclusion: 'frequent_micturition_pelvic_pattern',
    conclusionTitle: 'Frequent Micturition with Lower Abdominal Discomfort',
    explanation:
      'Elevated urinary voiding frequency coupled with lower abdominal discomfort indicates bladder hypersensitivity or pelvic visceral inflammation.',
    references: ['MEDLINE-DYSURIA-2023', 'CDC-UTI-2024'],
    nextSteps:
      'Urine screening and medical assessment recommended to differentiate between cystitis, interstitial cystitis, or pelvic congestion.',
    associatedSymptoms: ['burning_urination', 'fever', 'fatigue'],
    homeCare: [
      'Avoid bladder-stimulating drinks including coffee, dark teas, energy drinks, and alcohol.',
      'Schedule regular bathroom breaks rather than straining or delaying urination.',
      'Maintain adequate fluid intake and see a healthcare provider for proper urinalysis.',
    ],
    urgencyLevel: 'prompt_doctor',
  },

  // =========================================================================
  // Category 10: General & Systemic Symptoms (R046 - R050)
  // =========================================================================
  {
    id: 'R046',
    title: 'Febrile Systemic Viremia Pattern',
    category: 'General & Systemic',
    conditions: ['fever', 'chills', 'body_aches'],
    conditionGroups: [
      ['fever', 'chills', 'body_aches'],
      ['fever', 'chills', 'body_aches', 'fatigue'],
    ],
    conclusion: 'febrile_systemic_viremia_pattern',
    conclusionTitle: 'Febrile Systemic Viremia Pattern',
    explanation:
      'The combination of fever, chills, and diffuse body myalgias represents a generalized acute systemic inflammatory or viral response.',
    references: ['CDC-VIRAL-2024', 'NHS-FEVER-2024', 'MEDLINE-FEVER-2023'],
    nextSteps:
      'Rest, oral hydration, and temperature monitoring. Seek medical assessment if fever exceeds 39.5°C (103°F) or lasts beyond 3 days.',
    associatedSymptoms: ['headache', 'cough', 'sore_throat', 'fatigue'],
    homeCare: [
      'Prioritize complete bed rest in a quiet, temperate, well-ventilated room.',
      'Drink 2 to 3 liters of fluids daily (water, diluted electrolyte solutions, clear broths).',
      'Wear lightweight, loose clothing and use a light blanket rather than heavy quilts.',
      'Place a cool, damp cloth across the forehead or back of the neck for soothing relief.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R047',
    title: 'Fatigue & Generalized Myalgia Syndrome',
    category: 'General & Systemic',
    conditions: ['fatigue', 'body_aches'],
    conclusion: 'fatigue_myalgia_syndrome',
    conclusionTitle: 'Fatigue & Generalized Myalgia Syndrome',
    explanation:
      'Co-occurring diffuse muscular aching and bodily fatigue in the absence of high fever points to post-viral convalescence or musculoskeletal strain.',
    references: ['NHS-MYALGIA-2023', 'MEDLINE-FATIGUE-2024'],
    nextSteps:
      'Rest, gentle stretching, adequate sleep, and hydration. Clinical investigation recommended if persistent beyond 2–3 weeks.',
    associatedSymptoms: ['headache', 'chills', 'fever'],
    homeCare: [
      'Prioritize 8–9 hours of sleep each night and pace your daily physical activities.',
      'Take a warm bath with Epsom salts to relax sore and tender muscle groups.',
      'Maintain balanced, nutrient-dense nutrition and drink water consistently throughout the day.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R048',
    title: 'Acute Febrile Chills Response',
    category: 'General & Systemic',
    conditions: ['fever', 'chills'],
    conclusion: 'acute_febrile_chills_response',
    conclusionTitle: 'Acute Febrile Chills Response',
    explanation:
      'Elevated body temperature accompanied by shivering rigors reflects hypothalamic set-point elevation triggered by circulating endogenous pyrogens.',
    references: ['MEDLINE-CHILLS-2024', 'NHS-FEVER-2024'],
    nextSteps:
      'Hydration and temperature monitoring. Seek medical attention if fever is unremitting or accompanied by localizing pain.',
    associatedSymptoms: ['body_aches', 'fatigue', 'headache'],
    homeCare: [
      'Dress comfortably in light clothing; avoid heavy blankets during fever rises to prevent overheating.',
      'Sip cool or room-temperature liquids frequently to avoid dehydration.',
      'Check temperature every 4–6 hours with a clean digital thermometer.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
  {
    id: 'R049',
    title: 'Headache with Fatigue & Malaise',
    category: 'General & Systemic',
    conditions: ['fatigue', 'headache'],
    conditionGroups: [
      ['fatigue', 'headache'],
      ['fatigue', 'body_aches', 'headache'],
    ],
    conclusion: 'fatigue_headache_malaise_pattern',
    conclusionTitle: 'Headache with Fatigue & Malaise',
    explanation:
      'Cranial aching co-occurring with persistent fatigue indicates acute physical exhaustion or early systemic prodromal malaise.',
    references: ['IHS-HEADACHE-2023', 'NHS-TIREDNESS-2024'],
    nextSteps:
      'Rest in a quiet space, ensure restorative sleep and hydration. Consult a physician if headache worsens rapidly or if fever emerges.',
    associatedSymptoms: ['fever', 'neck_stiffness', 'sensitivity_to_light', 'body_aches'],
    homeCare: [
      'Rest in a quiet, dimmed room with comfortable neck and head support.',
      'Apply a cool washcloth to the forehead and a warm compress to tight shoulder muscles.',
      'Avoid high-stress activities, digital screens, and loud environments while recovering.',
    ],
    urgencyLevel: 'home_monitoring',
  },
  {
    id: 'R050',
    title: 'Febrile Exhaustion Pattern',
    category: 'General & Systemic',
    conditions: ['fever', 'headache'],
    conditionGroups: [
      ['fever', 'headache'],
      ['fatigue', 'fever', 'headache'],
    ],
    conclusion: 'febrile_exhaustion_pattern',
    conclusionTitle: 'Febrile Exhaustion Pattern',
    explanation:
      'Fever co-occurring with cranial aching suggests an active systemic infectious process requiring rest and close temperature monitoring.',
    references: ['CDC-FEVER-2024', 'NHS-FLU-2024'],
    nextSteps:
      'Strict rest and hydration. Medical review recommended if fever persists past 72 hours, or if warning signs develop.',
    associatedSymptoms: ['chills', 'body_aches', 'nausea', 'fatigue'],
    homeCare: [
      'Commit to thorough bed rest and avoid attempting to work or exercise.',
      'Drink water, clear broths, and oral rehydration solutions frequently.',
      'Consult a healthcare professional if fever remains elevated after 3 days or if localized pain appears.',
    ],
    urgencyLevel: 'prompt_doctor',
  },
];

export const RULE_MAP = new Map<string, Rule>(
  RULES_DATA.map((rule) => [rule.id, rule])
);

export function getRuleById(id: string): Rule | undefined {
  return RULE_MAP.get(id);
}
