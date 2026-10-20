import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Cpu,
  GitPullRequest,
  HelpCircle,
  Code2,
  BookOpen,
  Stethoscope,
} from 'lucide-react';
import { RULES_DATA } from '../data/rules';
import { SYMPTOMS_DATA } from '../data/symptoms';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300">About & Expert System Theory</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30 font-semibold">
                Rule-Based Medical Diagnosis System
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              MediExpert AI: Theoretical Foundations & Architecture
            </h1>
          </div>

          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-[#0B1220] font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Start Assessment</span>
          </Link>
        </div>
      </div>

      {/* Safety Notice */}
      <MedicalDisclaimer />

      {/* Project Overview */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="w-6 h-6 text-teal-400" />
          <h2 className="text-xl font-bold text-white">System Overview & Objectives</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong>MediExpert AI</strong> is a client-side medical symptom assessment system implementing symbolic Artificial Intelligence. While modern clinical computing often employs statistical machine learning models, classical expert systems represent a foundational paradigm in which domain expertise is codified as transparent, human-interpretable propositional IF–THEN production rules.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The primary objective is to demonstrate <strong>explainable AI</strong> by exposing the complete inner workings of inference engines: how patient observations enter Working Memory, how rules are tested and fired, how intermediate facts derive higher-order conclusions, and how goal-driven hypotheses are verified recursively without black-box opacity.
        </p>
      </section>

      {/* Classical Expert Systems Background */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">Expert System History & Evolution</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          In the history of Artificial Intelligence, rule-based expert systems pioneered clinical decision support in the 1970s and 1980s:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-4 list-disc">
          <li>
            <strong className="text-white">MYCIN (Stanford University, 1976):</strong> Used approximately 600 production rules to identify infectious bacterial blood pathogens and recommend antimicrobial therapies using backward chaining.
          </li>
          <li>
            <strong className="text-white">DENDRAL (Stanford University, 1965):</strong> Automated the identification of organic chemical molecular structures from mass spectrometry data.
          </li>
          <li>
            <strong className="text-white">INTERNIST-I / QMR (University of Pittsburgh):</strong> Built an extensive knowledge base covering internal medicine syndromes.
          </li>
        </ul>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          MediExpert AI modernizes these algorithmic principles into a reactive, high-performance web application built with TypeScript, evaluating {RULES_DATA.length} rules and {SYMPTOMS_DATA.length} clinical facts directly in the browser.
        </p>
      </section>

      {/* Forward Chaining vs Backward Chaining Deep Dive */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase text-teal-400 font-semibold">
            Inference Algorithms
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Data-Driven vs. Goal-Driven Reasoning
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            A comprehensive side-by-side comparison of bottom-up aggregation vs top-down verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Forward Chaining Card */}
          <div className="glass-card p-6 rounded-2xl border border-teal-500/30 space-y-4">
            <div className="flex items-center gap-2.5 text-teal-400">
              <GitPullRequest className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Forward Chaining</h3>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold inline-block">
              Data-Driven / Bottom-Up Reasoning
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Forward chaining starts with the known facts in Working Memory and applies inference rules to extract more data until a goal or terminal state is reached.
            </p>
            <div className="space-y-2 text-xs bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <span className="font-mono text-cyan-400 font-semibold block text-[11px]">
                Execution Flow:
              </span>
              <ol className="list-decimal pl-4 space-y-1 text-slate-300 text-[11px]">
                <li>Initialize Working Memory with user's symptom facts.</li>
                <li>Search rule base for all rules whose IF conditions match facts in Working Memory.</li>
                <li>Fire satisfied rules and append their THEN conclusions to Working Memory.</li>
                <li>Allow derived intermediate facts to activate chained rules in subsequent iterations.</li>
                <li>Repeat until no new facts are derived or fixed point is reached.</li>
              </ol>
            </div>
            <div className="text-xs text-slate-400">
              <strong className="text-teal-300">Best applied when:</strong> Starting without a specific hypothesis and discovering all possible conclusions supported by observable facts.
            </div>
          </div>

          {/* Backward Chaining Card */}
          <div className="glass-card p-6 rounded-2xl border border-cyan-500/30 space-y-4">
            <div className="flex items-center gap-2.5 text-cyan-400">
              <HelpCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Backward Chaining</h3>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold inline-block">
              Goal-Driven / Top-Down Reasoning
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Backward chaining begins with a list of target hypotheses (goals) and works backwards through rule conclusions to identify what facts are required to substantiate the hypothesis.
            </p>
            <div className="space-y-2 text-xs bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <span className="font-mono text-cyan-400 font-semibold block text-[11px]">
                Execution Flow:
              </span>
              <ol className="list-decimal pl-4 space-y-1 text-slate-300 text-[11px]">
                <li>Accept target goal <code className="text-cyan-200">G</code>.</li>
                <li>If <code className="text-cyan-200">G</code> is in Working Memory, return SUPPORTED.</li>
                <li>Locate rules that yield <code className="text-cyan-200">G</code> as their conclusion.</li>
                <li>For each rule, test antecedent conditions; if a condition is missing, recursively evaluate it as a subgoal.</li>
                <li>Detect recursion cycles to prevent infinite call stacks.</li>
                <li>Return SUPPORTED if all conjuncts hold; otherwise report missing facts.</li>
              </ol>
            </div>
            <div className="text-xs text-slate-400">
              <strong className="text-cyan-300">Best applied when:</strong> Verifying or refuting a specific suspected disease or condition pattern.
            </div>
          </div>
        </div>

        {/* Algorithm Comparison Table */}
        <div className="overflow-x-auto rounded-2xl glass-panel border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-200 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3.5 sm:p-4">Dimension</th>
                <th className="p-3.5 sm:p-4 text-teal-400">Forward Chaining</th>
                <th className="p-3.5 sm:p-4 text-cyan-400">Backward Chaining</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              <tr>
                <td className="p-3.5 sm:p-4 font-semibold text-white">Starting Point</td>
                <td className="p-3.5 sm:p-4">Initial observations & facts</td>
                <td className="p-3.5 sm:p-4">Hypothesized condition goal</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-semibold text-white">Direction of Search</td>
                <td className="p-3.5 sm:p-4">Antecedents → Consequents</td>
                <td className="p-3.5 sm:p-4">Consequents → Antecedents</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-semibold text-white">Search Paradigm</td>
                <td className="p-3.5 sm:p-4">Data-driven / bottom-up</td>
                <td className="p-3.5 sm:p-4">Goal-driven / top-down</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-semibold text-white">Execution Strategy</td>
                <td className="p-3.5 sm:p-4">Iterative matching until fixpoint</td>
                <td className="p-3.5 sm:p-4">Recursive depth-first subgoal search</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-semibold text-white">Cycle Handling</td>
                <td className="p-3.5 sm:p-4">Fired-rule tracking set</td>
                <td className="p-3.5 sm:p-4">Call-stack recursion active goal set</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-semibold text-white">Intermediate Facts</td>
                <td className="p-3.5 sm:p-4">Appended to Working Memory dynamically</td>
                <td className="p-3.5 sm:p-4">Verified as subgoals and memoized</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Common Technical & Clinical Questions */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800/80">
          <BookOpen className="w-5 h-5 text-teal-400" />
          <h2 className="text-xl font-bold text-white">
            Architecture FAQ & Design Principles
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <h4 className="font-semibold text-teal-300">
              Why use a rule-based expert system instead of a neural network for this system?
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              Neural networks are empirical statistical models that act as black boxes, making them difficult to audit. In medical contexts, explainability is critical. A rule-based expert system guarantees 100% deterministic traceability: every deduction can be tied to explicit human-readable clinical rules without probabilistic hallucinations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <h4 className="font-semibold text-cyan-300">
              How does the system handle conflicting rules or overlapping symptoms?
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              MediExpert AI does not artificially pick a single winner through arbitrary heuristics. Instead, it identifies and presents all satisfied rule patterns, explicitly noting that symptoms like headache, fatigue, or cough can appear in multiple clinical syndromes simultaneously.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <h4 className="font-semibold text-sky-300">
              How are infinite loops prevented during backward chaining recursion?
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              The engine maintains an <code className="text-sky-200">activeGoalStack</code> Set along the recursive call hierarchy. If an antecedent condition requires a goal currently in the call stack, a cycle is immediately flagged, the branch is safely aborted with status <code className="text-rose-300">CYCLE_DETECTED</code>, and the recursion unwinds gracefully.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack Specifications */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5 pb-2">
          <Code2 className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">System Architecture & Tech Stack</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-white block">React 19</span>
            <span className="text-[10px] text-slate-400">UI Framework</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-teal-400 block">TypeScript</span>
            <span className="text-[10px] text-slate-400">Strict Typing</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-cyan-400 block">Vite 8</span>
            <span className="text-[10px] text-slate-400">Build Tool</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-sky-400 block">Tailwind CSS</span>
            <span className="text-[10px] text-slate-400">Utility Styling</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-emerald-400 block">Vitest</span>
            <span className="text-[10px] text-slate-400">Automated Tests</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-amber-400 block">Vercel SPA</span>
            <span className="text-[10px] text-slate-400">Static Edge</span>
          </div>
        </div>
      </section>
    </div>
  );
};
