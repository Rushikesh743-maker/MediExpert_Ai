# MediExpert AI — Rule-Based Medical Diagnosis System

> **Architecture:** Propositional Rule-Based Expert System  
> **Inference Engines:** Forward Chaining (Data-Driven) & Backward Chaining (Goal-Driven)  
> **Knowledge Base:** 50 Clinical Rules across 10 Public Health Categories  
> **Clinical Facts:** 25 Standardized Clinical Symptoms in a Clean, Searchable Checklist  
> **Triage Engine:** Independent Medical Attention Assessment (Emergency, Prompt Doctor, Home Monitoring)  
> **Execution:** 100% Client-Side In-Browser Execution (Zero APIs, Zero Backend)  

---

## 1. Project Overview

**MediExpert AI** is a professional medical symptom assessment expert system operating on deterministic symbolic Artificial Intelligence. Unlike opaque machine learning models or generative probabilistic systems, MediExpert AI operates with **100% deterministic traceability**: every clinical pattern deduction is derived from explicit propositional IF–THEN rules grounded in public health evidence (CDC, NHS, MedlinePlus, NIDDK, AAAAI, and International Headache Society guidelines).

The system generates dynamic, comprehensive **Assessment Reports** complete with:
- Selected patient observations and Working Memory state
- **"Do I Need to See a Doctor?"** independent clinical triage assessment (Emergency Help, Seek Prompt Medical Assessment, or Home Monitoring)
- Possible matching conditions with clinical explanations, supporting symptoms present, and other relevant symptoms clearly labelled as **unreported / status unknown**
- Dedicated **Home Care & Symptom Relief** section tailored to each supported pattern
- Conservative, non-prescriptive next-step recommendations
- Prominent red-flag alerts for clinically urgent symptoms (e.g., severe dyspnea, nuchal rigidity)
- Step-by-step reasoning traces and Working Memory transition snapshots
- Native browser **Print / Save as PDF** support

---

## 2. Key Features

- **Dual-Engine Inference Modes:**
  - **Forward Chaining (Data-Driven):** Aggregates reported symptoms in Working Memory and fires matching rules from the ground up, asserting intermediate and final condition patterns.
  - **Backward Chaining (Goal-Driven):** Starts with suspected condition hypotheses and recursively verifies prerequisite subgoals, with active call-stack cycle detection.
  - **Compare Both Mode:** Simultaneously runs Forward and Backward Chaining on identical observations, contrasting deduction pathways side by side.
- **50 Evidence-Based Production Rules:**
  - Codified across 10 distinct categories (Common Cold, Influenza-Like, Allergy, Sinus, Gastrointestinal, Acid Reflux, Headache/Migraine, Skin/Cutaneous, Urinary/Renal, and General/Systemic).
  - Multi-tier chained rules where intermediate analytical states feed into deeper clinical patterns.
- **Standardized 25-Symptom Checklist:**
  - Single, compact, searchable checklist containing 25 clean clinical symptoms.
  - Real-time search filter with instant keyword matching.
  - Select All, Clear Selection, and live selected-symptom counter.
  - Quick example presets for instantaneous 2–3 symptom selection.
  - Contextual duration and subjective severity selectors.
- **Dynamic Assessment Reports:**
  - Actual rule counts, evaluated rules, fired rules, and derived conclusions computed directly from the engine.
  - Full evidence citations mapped to every matched pattern.
  - Collapsible unmatched rule inspector explaining why non-matching rules failed to fire.
  - Responsive print layout formatted for clean PDF export.
- **Interactive Knowledge Base Explorer:**
  - Searchable by rule ID, title, symptom, or citation.
  - Real-time category filtering.
  - Complete IF–THEN condition formalisms, home care guidance, and next-step clinical advice.

---

## 3. Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 | Component-based reactive user interface |
| **Language** | TypeScript 5.8+ | Strict type safety for engine models, rules, and traces |
| **Build & Dev Tool** | Vite 8 | Instant Hot Module Replacement and production bundling |
| **Styling** | Tailwind CSS 4 | Custom medical dashboard palette (`#0B1220`, `#111C2E`, teal, cyan) |
| **Icons** | Lucide React | Clean, scalable vector medical and system icons |
| **Routing** | React Router 7 | Client-side routing with deep link support |
| **Unit Testing** | Vitest 5 | 16 comprehensive automated test suites for the engine |
| **Deployment** | Vercel | Static SPA deployment via `vercel.json` |

---

## 4. Project Structure

```text
mediexpert-ai/
├── public/
│   └── favicon.svg              # Medical pulse & AI spark SVG icon
├── src/
│   ├── components/
│   │   ├── Footer.tsx           # Technical specs, navigation & safety notice
│   │   ├── GoalTreeViewer.tsx   # Collapsible recursive subgoal tree viewer
│   │   ├── MedicalDisclaimer.tsx# Reusable safety & emergency warning banners
│   │   ├── Navbar.tsx           # Responsive header with branding & route links
│   │   └── ReasoningTrace.tsx   # Step timeline, memory snapshots & filters
│   ├── data/
│   │   ├── rules.ts             # 50 IF–THEN production rules with citations
│   │   └── symptoms.ts          # 33 clinical symptoms across 8 categories
│   ├── engine/
│   │   ├── backwardChaining.ts  # Goal-driven recursive hypothesis engine
│   │   ├── forwardChaining.ts   # Data-driven iterative deduction engine
│   │   ├── ruleMatcher.ts       # Satisfiability, deduplication & explanations
│   │   ├── index.ts             # Engine coordinator & comparative analyzer
│   │   └── engine.test.ts       # 16 automated Vitest unit tests
│   ├── pages/
│   │   ├── AboutPage.tsx        # Theory, history, comparison table & FAQ
│   │   ├── AssessmentPage.tsx   # Categorized & searchable symptom selector
│   │   ├── HomePage.tsx         # Hero, workflow diagram & metrics
│   │   ├── KnowledgeBasePage.tsx# Dynamic rule base explorer & filters
│   │   └── ResultsPage.tsx      # Medical report, print PDF & traces
│   ├── types/
│   │   └── index.ts             # Strict domain types & interfaces
│   ├── utils/
│   │   └── sessionStorage.ts    # Browser session persistence
│   ├── App.tsx                  # Client-side router layout
│   ├── index.css                # Tailwind CSS theme & glassmorphism
│   └── main.tsx                 # React application entry point
├── package.json                 # Dependencies and test/build scripts
├── REFERENCES.md                # Full medical reference index & citations
├── tsconfig.app.json            # TypeScript configuration
├── vercel.json                  # Vercel SPA rewrite configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
└── README.md                    # Project documentation
```

---

## 5. Knowledge Base Rule Categories (50 Rules)

The 50 production rules are distributed across 10 clinical domains (5 rules each):

1. **Common Cold & Upper Respiratory (`R001` - `R005`):** Viral rhinitis, cough patterns, post-nasal drip reflex, viral pharyngitis, and acute bronchial irritation.
2. **Influenza-Like & Acute Respiratory (`R006` - `R010`):** Influenza-like illness, dyspnea warning, febrile rigors, bronchospastic wheezing, and post-viral asthenia.
3. **Allergy & Allergic Rhinitis (`R011` - `R015`):** Allergic rhinoconjunctivitis, allergic conjunctivitis, upper airway allergy, systemic histaminic reaction, and atopic dermatitis.
4. **Sinus & Craniofacial (`R016` - `R020`):** Acute rhinosinusitis, febrile sinus infection, hyposmia obstruction, frontofacial pressure headache, and sinobronchial cough reflex.
5. **Digestive & Gastrointestinal (`R021` - `R025`):** Acute gastroenteritis, enteric emesis/diarrhea syndrome, febrile enteric infection, dehydration risk, and functional dyspepsia.
6. **Acid Reflux & Heartburn (`R026` - `R030`):** GERD pattern, reflux cough syndrome, laryngopharyngeal reflux (LPR), dyspeptic reflux, and gastric dysmotility.
7. **Headache & Migraine (`R031` - `R035`):** Migraine neurovascular pattern, tension-type headache, vestibular migraine, cervicogenic fatigue headache, and meningeal irritation warning.
8. **Skin & Cutaneous (`R036` - `R040`):** Acute urticaria, febrile viral exanthem, post-infectious rash, cutaneous-ocular allergy, and reactive enteric exanthem.
9. **Urinary & Renal (`R041` - `R045`):** Acute cystitis, febrile UTI / pyelonephritis warning, urinary rigors triad, pelvic discomfort pattern, and frequency syndrome.
10. **General & Systemic (`R046` - `R050`):** Febrile systemic viremia, chronic musculoskeletal fatigue, acute febrile rigors, neurovascular exhaustion with dizziness, and febrile asthenia dehydration warning.

For full clinical literature citations corresponding to each rule, consult [`REFERENCES.md`](file:///c:/Users/Hrushikesh/OneDrive/Desktop/mediexpert-ai/REFERENCES.md).

---

## 6. Local Installation & Execution

### Prerequisites
- Node.js (v18 or higher; v22 recommended)
- npm (v9 or higher)

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/mediexpert-ai.git
cd mediexpert-ai

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Vite development server
npm run dev

# Open browser at:
# http://127.0.0.1:5173/
```

### Automated Testing
```bash
# Run all 18 Vitest unit tests
npm run test
```

### Production Build & Preview
```bash
# Compile and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 7. Vercel Deployment

MediExpert AI is pre-configured for static edge deployment on Vercel:

1. Push your repository to GitHub.
2. Log into [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your `mediexpert-ai` repository.
4. Framework settings will be automatically detected:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **"Deploy"**. The included `vercel.json` rewrite file ensures deep links to `/assessment`, `/results`, `/knowledge-base`, and `/about` resolve cleanly without 404 errors.

---

## 8. Clinical Safety & Medical Disclaimer

> [!WARNING]
> **INFORMATIONAL USE ONLY — NOT CERTIFIED CLINICAL DIAGNOSIS**  
> 
> MediExpert AI is an Artificial Intelligence software system designed for informational and educational symptom assessment based on published public health reference patterns.
> 
> - **Non-Diagnostic:** The application does not provide confirmed medical diagnoses, prognosis, or prescription medication recommendations.
> - **Propositional Logic Limitations:** Clinical pathology involves complex, multi-factorial physical examinations, laboratory cultures, imaging, and patient history that cannot be reduced to Boolean rules alone.
> - **Emergency Warning:** Anyone experiencing severe or rapidly worsening symptoms — including acute shortness of breath, severe chest pressure, sudden high fever with neck stiffness, or confusion — must contact emergency medical services (such as 911 or 112) or proceed to the nearest emergency medical facility immediately.
