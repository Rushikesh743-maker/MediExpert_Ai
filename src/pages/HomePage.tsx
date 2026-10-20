import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  GitPullRequest,
  HelpCircle,
  Stethoscope,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Workflow,
  Check,
} from 'lucide-react';
import { RULES_DATA } from '../data/rules';
import { SYMPTOMS_DATA } from '../data/symptoms';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-8 overflow-hidden">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-teal-500/10 via-cyan-500/15 to-transparent blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-cyan-300 border border-teal-500/30 text-xs font-semibold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>EXPLAINABLE RULE-BASED INFERENCE SYSTEM</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Understand Symptoms Through{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-300">
              Explainable AI
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A fully deterministic medical symptom assessment expert system built with genuine{' '}
            <strong className="text-teal-300 font-semibold">Forward Chaining</strong> (data-driven) and{' '}
            <strong className="text-cyan-300 font-semibold">Backward Chaining</strong> (goal-driven) inference algorithms across {RULES_DATA.length} structured clinical rules. Inspect every deduction without black-box approximations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/assessment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-[#0B1220] bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 hover:from-teal-300 hover:to-cyan-300 rounded-xl shadow-lg shadow-teal-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Stethoscope className="w-5 h-5 text-[#0B1220]" />
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/knowledge-base"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all duration-200 hover:border-slate-600"
            >
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>Explore Knowledge Base ({RULES_DATA.length} Rules)</span>
            </Link>
          </div>

          {/* Metrics bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-800/80 text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <span className="text-xs text-slate-400 block">Knowledge Base</span>
              <span className="text-xl font-bold text-teal-300 font-mono">{RULES_DATA.length} Rules</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <span className="text-xs text-slate-400 block">Symptom Space</span>
              <span className="text-xl font-bold text-cyan-300 font-mono">{SYMPTOMS_DATA.length} Facts</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <span className="text-xs text-slate-400 block">Execution Mode</span>
              <span className="text-xl font-bold text-sky-300 font-mono">100% Client-Side</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <span className="text-xs text-slate-400 block">Reasoning Modes</span>
              <span className="text-xl font-bold text-emerald-300 font-mono">Dual Chaining</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Representation of Expert System Workflow */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <Workflow className="w-4 h-4" />
              <span>Symbolic AI Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How the MediExpert Inference Engine Operates
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              MediExpert AI evaluates patient symptoms against propositional medical rules, processing facts through deterministic rule chains with full auditability.
            </p>
          </div>

          {/* Workflow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 relative group hover:border-teal-500/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-teal-500/15 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-sm mb-3">
                01
              </div>
              <h3 className="font-semibold text-white text-base mb-1">
                Patient Observations
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                User selects clinical facts (e.g., cough, fever, dysuria) which are parsed and placed into active Working Memory.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 relative group hover:border-cyan-500/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-sm mb-3">
                02
              </div>
              <h3 className="font-semibold text-white text-base mb-1">
                Rule Base Matching
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The inference engine evaluates IF-conditions of all {RULES_DATA.length} propositional rules against working memory facts.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 relative group hover:border-sky-500/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-500/30 flex items-center justify-center font-mono font-bold text-sm mb-3">
                03
              </div>
              <h3 className="font-semibold text-white text-base mb-1">
                Chaining & Derivation
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Forward mode iteratively asserts derived facts; Backward mode recursively evaluates subgoals with cycle detection.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 relative group hover:border-emerald-500/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-sm mb-3">
                04
              </div>
              <h3 className="font-semibold text-white text-base mb-1">
                Dynamic Report & Trace
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All fired rules, missing prerequisites, working memory snapshots, and matched patterns are compiled into an assessment report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Feature Cards */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1: Forward Chaining */}
          <div className="glass-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <GitPullRequest className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-teal-400 font-semibold uppercase tracking-wider">
                  Data-Driven Inference
                </span>
                <h3 className="text-xl font-bold text-white">Forward Chaining</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Starts with reported symptom facts in working memory and works forwards by firing matching rules until no further conclusions can be derived. Ideal for exploratory symptom assessments.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span>Iterative rule evaluation cycle</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span>Derives chained intermediate facts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span>Infinite loop & repeat-fire prevention</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Backward Chaining */}
          <div className="glass-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Goal-Driven Inference
                </span>
                <h3 className="text-xl font-bold text-white">Backward Chaining</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Starts with candidate condition hypotheses (goals) and recursively checks whether supporting prerequisite facts exist or can be established via subgoals. Ideal for diagnostic verification.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Hypothesis verification tree</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Recursive subgoal evaluation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Cycle detection call stack protection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Explainable Reasoning */}
          <div className="glass-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-sky-400 font-semibold uppercase tracking-wider">
                  Transparent White-Box
                </span>
                <h3 className="text-xl font-bold text-white">Explainable Reasoning</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Unlike opaque deep learning models, every inference step is recorded: conditions evaluated, prerequisites satisfied, missing evidence, and the clinical literature behind each decision.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-sky-400" />
                  <span>Step-by-step visual timeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-sky-400" />
                  <span>Side-by-side algorithm comparison</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-sky-400" />
                  <span>Missing condition explanations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="max-w-6xl mx-auto px-4">
        <MedicalDisclaimer />
      </section>
    </div>
  );
};
