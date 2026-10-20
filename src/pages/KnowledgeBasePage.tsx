import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Workflow,
  ChevronRight,
  Stethoscope,
  ShieldCheck,
} from 'lucide-react';
import { RULES_DATA } from '../data/rules';
import { formatFactName } from '../engine/ruleMatcher';

export const KnowledgeBasePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories dynamically from the actual knowledge base
  const categories = ['all', ...Array.from(new Set(RULES_DATA.map((r) => r.category)))];

  // Dynamic filter
  const filteredRules = RULES_DATA.filter((rule) => {
    if (selectedCategory !== 'all' && rule.category !== selectedCategory) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      rule.id.toLowerCase().includes(q) ||
      rule.title.toLowerCase().includes(q) ||
      rule.conclusionTitle.toLowerCase().includes(q) ||
      rule.explanation.toLowerCase().includes(q) ||
      rule.conditions.some((c) => c.toLowerCase().includes(q)) ||
      (rule.references && rule.references.some((ref) => ref.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
          <Link to="/" className="hover:underline">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-300">Knowledge Base Explorer</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30 font-semibold">
                Clinical Production Rules
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {RULES_DATA.length} Formally Codified Rules
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Medical Knowledge Base & Propositional Logic
            </h1>
          </div>

          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-[#0B1220] font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Test In Inference Engine</span>
          </Link>
        </div>
      </div>

      {/* Logic Architecture Guide Card */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800/80">
          <Workflow className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">
            Architecture of a Rule-Based Expert System
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          {/* Concept 1: Facts */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-300 flex items-center justify-center font-bold font-mono">
              1
            </div>
            <h3 className="font-semibold text-white text-sm">Clinical Facts</h3>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Atomic propositional assertions representing verified patient symptoms or observations (e.g., <em>fever</em>, <em>cough</em>, <em>dysuria</em>).
            </p>
          </div>

          {/* Concept 2: Rules */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-bold font-mono">
              2
            </div>
            <h3 className="font-semibold text-white text-sm">IF–THEN Rules</h3>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Domain knowledge codified as condition conjunctions driving consequential patterns: <code className="text-cyan-200">IF C1 ∧ C2 THEN K</code>.
            </p>
          </div>

          {/* Concept 3: Working Memory */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-sky-500/15 text-sky-300 flex items-center justify-center font-bold font-mono">
              3
            </div>
            <h3 className="font-semibold text-white text-sm">Working Memory</h3>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Dynamic blackboard storing currently active patient facts and newly deduced intermediate states during inference passes.
            </p>
          </div>

          {/* Concept 4: Inference Engine */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-300 flex items-center justify-center font-bold font-mono">
              4
            </div>
            <h3 className="font-semibold text-white text-sm">Inference Engine</h3>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Algorithmic engine that matches working memory against the rule base via forward chaining or backward chaining.
            </p>
          </div>

          {/* Concept 5: Conclusions */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center font-bold font-mono">
              5
            </div>
            <h3 className="font-semibold text-white text-sm">Conclusions</h3>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Derived condition patterns accompanied by step-by-step supporting evidence traces and references.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                selectedCategory === category
                  ? 'bg-teal-500/20 text-cyan-300 border border-teal-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {category === 'all' ? `All Rules (${RULES_DATA.length})` : category}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rules, symptoms, citations (e.g. R001, cough, CDC)..."
            className="w-full sm:w-80 pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Rules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-teal-300 font-mono">{filteredRules.length}</strong> of{' '}
            <strong className="text-slate-200 font-mono">{RULES_DATA.length}</strong> rules
          </span>
          {selectedCategory !== 'all' && (
            <span>Filtered by category: <strong className="text-cyan-300">{selectedCategory}</strong></span>
          )}
        </div>

        {filteredRules.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-500 text-sm">
            No rules match the current search query or category filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRules.map((rule) => (
              <div
                key={rule.id}
                className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30">
                          {rule.id}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {rule.category}
                        </span>
                        {rule.isIntermediate && (
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                            Intermediate Rule
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white">
                        {rule.title}
                      </h3>
                    </div>
                  </div>

                  {/* IF-THEN Formal Structure */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 text-xs">
                    {/* IF conditions */}
                    <div className="space-y-1">
                      <span className="font-mono font-bold text-cyan-400 text-[11px] uppercase tracking-wider block">
                        IF ALL CONDITIONS ARE SATISFIED:
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {rule.conditions.map((c, i) => (
                          <React.Fragment key={c}>
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 font-mono text-[11px]">
                              {formatFactName(c)}
                            </span>
                            {i < rule.conditions.length - 1 && (
                              <span className="text-cyan-400 font-mono text-[11px] self-center">
                                ∧
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* THEN conclusion */}
                    <div className="pt-2 border-t border-slate-800 space-y-1">
                      <span className="font-mono font-bold text-emerald-400 text-[11px] uppercase tracking-wider block">
                        THEN ASSERT CONCLUSION:
                      </span>
                      <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium text-xs">
                        {rule.conclusionTitle}
                      </span>
                    </div>
                  </div>

                  {/* Clinical Explanation */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rule.explanation}
                  </p>

                  {/* Evidence Citations */}
                  {rule.references && rule.references.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] uppercase font-mono text-slate-500 font-semibold block">
                        Evidence Sources:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {rule.references.map((ref) => (
                          <span
                            key={ref}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                          >
                            {ref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Home Care Summary if available */}
                  {rule.homeCare && rule.homeCare.length > 0 && (
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                      <span className="font-semibold text-teal-300 block">Home Care & Symptom Relief:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                        {rule.homeCare.slice(0, 2).map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Next Steps Guidance */}
                {rule.nextSteps && (
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 leading-normal flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-amber-400 font-medium">Clinical Guidance: </strong>
                      {rule.nextSteps}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
