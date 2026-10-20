import React, { useState } from 'react';
import {
  ForwardChainingResult,
  BackwardChainingResult,
} from '../types';
import { GoalTreeViewer } from './GoalTreeViewer';
import { formatFactName } from '../engine/ruleMatcher';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Search,
  Database,
  GitCommit,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ReasoningTraceProps {
  result: ForwardChainingResult | BackwardChainingResult;
  title?: string;
}

export const ReasoningTrace: React.FC<ReasoningTraceProps> = ({
  result,
  title,
}) => {
  const isForward = result.method === 'forward';
  const forwardResult = isForward ? (result as ForwardChainingResult) : null;
  const backwardResult = !isForward ? (result as BackwardChainingResult) : null;

  const [activeTab, setActiveTab] = useState<'timeline' | 'trees'>('timeline');
  const [filterType, setFilterType] = useState<'all' | 'fired' | 'unmatched'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMemoryStep, setExpandedMemoryStep] = useState<number | null>(null);

  // Filter Forward steps
  const filteredForwardSteps = forwardResult
    ? forwardResult.steps.filter((step) => {
        if (filterType === 'fired' && step.actionTaken !== 'FIRED') return false;
        if (filterType === 'unmatched' && step.actionTaken !== 'SKIPPED_UNMATCHED') return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          step.ruleId.toLowerCase().includes(q) ||
          step.ruleTitle.toLowerCase().includes(q) ||
          step.explanation.toLowerCase().includes(q) ||
          (step.derivedFact && step.derivedFact.toLowerCase().includes(q))
        );
      })
    : [];

  // Filter Backward steps
  const filteredBackwardSteps = backwardResult
    ? backwardResult.steps.filter((step) => {
        if (filterType === 'fired' && step.subgoalStatus !== 'SUPPORTED') return false;
        if (filterType === 'unmatched' && step.subgoalStatus !== 'UNSUPPORTED') return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          step.currentGoal.toLowerCase().includes(q) ||
          (step.supportingRuleId && step.supportingRuleId.toLowerCase().includes(q)) ||
          step.explanation.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="rounded-2xl glass-panel p-5 sm:p-7 border border-slate-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/15 text-teal-400 border border-teal-500/30">
              <GitCommit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {title || (isForward ? 'Forward Chaining Reasoning Trace' : 'Backward Chaining Reasoning Trace')}
              </h3>
              <p className="text-xs text-slate-400">
                {isForward
                  ? 'Bottom-up data-driven progression from reported symptoms to confirmed patterns.'
                  : 'Top-down goal-driven recursive hypothesis testing against patient observations.'}
              </p>
            </div>
          </div>
        </div>

        {/* Runtime Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Execution: {result.executionTimeMs} ms</span>
          </div>

          {!isForward && (
            <div className="flex rounded-lg bg-slate-900/80 p-0.5 border border-slate-800 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('timeline')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'timeline'
                    ? 'bg-teal-500/20 text-cyan-300 border border-teal-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Step Timeline
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('trees')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'trees'
                    ? 'bg-teal-500/20 text-cyan-300 border border-teal-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Goal Trees ({backwardResult?.goalTrees.length})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Backward Chaining Trees Tab */}
      {!isForward && activeTab === 'trees' && backwardResult && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-cyan-400 font-semibold">Goal-Driven Hypothesis Trees:</strong> Each card below represents a condition pattern hypothesis. Click to expand nested subgoals and inspect how the engine tested each prerequisite condition recursively.
          </div>
          <div className="space-y-3">
            {backwardResult.goalTrees.map((tree, idx) => (
              <GoalTreeViewer key={`${tree.goal}-${idx}`} tree={tree} />
            ))}
          </div>
        </div>
      )}

      {/* Step Timeline View */}
      {(isForward || activeTab === 'timeline') && (
        <div className="space-y-4">
          {/* Controls: Search and Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900/80 border border-slate-800">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  filterType === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Steps ({isForward ? forwardResult?.steps.length : backwardResult?.steps.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterType('fired')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  filterType === 'fired'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isForward ? 'Fired Only' : 'Supported Only'}
              </button>
              <button
                type="button"
                onClick={() => setFilterType('unmatched')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  filterType === 'unmatched'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isForward ? 'Unmatched Only' : 'Unsupported Only'}
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rule ID, condition..."
                className="w-full sm:w-60 pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs"
              />
            </div>
          </div>

          {/* Forward Steps Timeline */}
          {isForward && (
            <div className="space-y-3 pt-2">
              {filteredForwardSteps.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No inference steps match the selected filter criteria.
                </div>
              ) : (
                filteredForwardSteps.map((step) => {
                  const isFired = step.actionTaken === 'FIRED';
                  const isMemoryExpanded = expandedMemoryStep === step.stepNumber;

                  return (
                    <div
                      key={step.stepNumber}
                      className={`rounded-xl border p-4 sm:p-5 transition-all text-xs ${
                        isFired
                          ? 'bg-gradient-to-r from-emerald-950/25 to-slate-900/60 border-emerald-500/40 shadow-md shadow-emerald-950/20'
                          : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700/80'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-800/60">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            Step #{step.stepNumber}
                          </span>
                          <span className="font-mono text-cyan-300 font-semibold text-xs">
                            [{step.ruleId}]
                          </span>
                          <h4 className="font-semibold text-slate-100 text-sm">
                            {step.ruleTitle}
                          </h4>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold self-start sm:self-auto ${
                            isFired
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {isFired ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>RULE FIRED</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-amber-400" />
                              <span>UNMATCHED</span>
                            </>
                          )}
                        </span>
                      </div>

                      {/* Explanation */}
                      <p className="text-slate-300 text-xs py-2 leading-relaxed">
                        {step.explanation}
                      </p>

                      {/* Conditions Breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/50">
                        {/* Satisfied Conditions */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Verified Observations:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {step.conditionsSatisfied.length > 0 ? (
                              step.conditionsSatisfied.map((c) => (
                                <span
                                  key={c}
                                  className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]"
                                >
                                  {formatFactName(c)}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-500 italic text-[11px]">None</span>
                            )}
                          </div>
                        </div>

                        {/* Missing Conditions */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            Missing Prerequisites:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {step.missingConditions.length > 0 ? (
                              step.missingConditions.map((m) => (
                                <span
                                  key={m}
                                  className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px]"
                                >
                                  {formatFactName(m)}
                                </span>
                              ))
                            ) : (
                              <span className="text-emerald-400/80 text-[11px] italic">
                                None (All conditions satisfied)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Working memory snapshot toggle */}
                      {isFired && step.workingMemorySnapshot && (
                        <div className="mt-3 pt-2 border-t border-slate-800/60">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedMemoryStep(isMemoryExpanded ? null : step.stepNumber)
                            }
                            className="flex items-center gap-1.5 text-[11px] font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <Database className="w-3 h-3" />
                            <span>
                              Working Memory State ({step.workingMemorySnapshot.length} facts)
                            </span>
                            {isMemoryExpanded ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </button>

                          {isMemoryExpanded && (
                            <div className="mt-2 p-2.5 rounded-lg bg-[#0B1220] border border-slate-800 space-y-1.5">
                              <span className="text-[10px] uppercase font-mono text-slate-500 font-semibold block">
                                Working Memory Contents at Step #{step.stepNumber}:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {step.workingMemorySnapshot.map((fact) => (
                                  <span
                                    key={fact}
                                    className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                                      fact === step.derivedFact
                                        ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/50 font-bold'
                                        : 'bg-slate-800/80 text-slate-300 border-slate-700'
                                    }`}
                                  >
                                    {formatFactName(fact)}
                                    {fact === step.derivedFact && ' ★ (New)'}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Backward Steps Timeline */}
          {!isForward && (
            <div className="space-y-3 pt-2">
              {filteredBackwardSteps.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No inference steps match the selected filter criteria.
                </div>
              ) : (
                filteredBackwardSteps.map((step) => {
                  const isSupported = step.subgoalStatus === 'SUPPORTED';
                  const isCycle = step.subgoalStatus === 'CYCLE_DETECTED';

                  return (
                    <div
                      key={step.stepNumber}
                      className={`rounded-xl border p-4 sm:p-5 transition-all text-xs ${
                        isSupported
                          ? 'bg-gradient-to-r from-emerald-950/25 to-slate-900/60 border-emerald-500/40'
                          : isCycle
                          ? 'bg-rose-950/25 border-rose-500/40'
                          : 'bg-slate-900/40 border-slate-800/80'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-800/60">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            Step #{step.stepNumber}
                          </span>
                          <span className="font-semibold text-slate-100 text-sm">
                            Hypothesis: {formatFactName(step.currentGoal)}
                          </span>
                          {step.supportingRuleId && (
                            <span className="font-mono text-cyan-300 text-xs px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                              Rule {step.supportingRuleId}
                            </span>
                          )}
                        </div>

                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold self-start sm:self-auto ${
                            isSupported
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : isCycle
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {isSupported ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>SUPPORTED</span>
                            </>
                          ) : isCycle ? (
                            <>
                              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                              <span>CYCLE ABORTED</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-slate-400" />
                              <span>UNSUPPORTED</span>
                            </>
                          )}
                        </span>
                      </div>

                      <p className="text-slate-300 text-xs py-2 leading-relaxed">
                        {step.explanation}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/50">
                        <div className="space-y-1">
                          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Verified Observations:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {step.factsVerified.length > 0 ? (
                              step.factsVerified.map((v) => (
                                <span
                                  key={v}
                                  className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]"
                                >
                                  {formatFactName(v)}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-500 italic text-[11px]">None</span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            Missing Prerequisites:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {step.missingPrerequisites.length > 0 ? (
                              step.missingPrerequisites.map((m) => (
                                <span
                                  key={m}
                                  className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px]"
                                >
                                  {formatFactName(m)}
                                </span>
                              ))
                            ) : (
                              <span className="text-emerald-400/80 text-[11px] italic">
                                None (Satisfied)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
