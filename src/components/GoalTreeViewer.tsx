import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  Layers,
  ArrowRight,
  CornerDownRight,
} from 'lucide-react';
import { BackwardSubGoal } from '../types';
import { formatFactName } from '../engine/ruleMatcher';

interface GoalTreeViewerProps {
  tree: BackwardSubGoal;
  defaultExpanded?: boolean;
}

export const GoalTreeViewer: React.FC<GoalTreeViewerProps> = ({
  tree,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const hasSubgoals = tree.subgoals && tree.subgoals.length > 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUPPORTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Goal Supported</span>
          </span>
        );
      case 'CYCLE_DETECTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            <span>Cycle Detected</span>
          </span>
        );
      case 'UNSUPPORTED':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            <XCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Goal Unsupported</span>
          </span>
        );
    }
  };

  return (
    <div className="border border-slate-800 rounded-xl bg-slate-900/60 overflow-hidden my-2.5 transition-all">
      {/* Node Header */}
      <div
        className={`p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
          tree.status === 'SUPPORTED'
            ? 'bg-emerald-950/20 hover:bg-emerald-950/30'
            : tree.status === 'CYCLE_DETECTED'
            ? 'bg-rose-950/20 hover:bg-rose-950/30'
            : 'bg-slate-900/40 hover:bg-slate-800/40'
        }`}
        onClick={() => hasSubgoals && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start sm:items-center gap-3">
          {hasSubgoals ? (
            <button
              type="button"
              className="p-1 rounded hover:bg-slate-800 text-slate-400 mt-0.5 sm:mt-0"
              aria-label={isExpanded ? 'Collapse subgoals' : 'Expand subgoals'}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-cyan-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </button>
          ) : (
            <div className="w-6 flex justify-center text-slate-600">
              <CornerDownRight className="w-4 h-4" />
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-semibold text-slate-100 text-sm sm:text-base">
                {tree.goalTitle}
              </h4>
              {tree.ruleId && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  via Rule {tree.ruleId}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">{tree.explanation}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          {getStatusBadge(tree.status)}
        </div>
      </div>

      {/* Conditions / Prerequisites breakdown */}
      <div className="px-4 py-3 bg-[#0B1220]/70 border-t border-slate-800/80 text-xs space-y-2">
        {/* Verified Facts */}
        {tree.factsVerified.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-emerald-400 min-w-28 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Facts:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {tree.factsVerified.map((f) => (
                <span
                  key={f}
                  className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium"
                >
                  {formatFactName(f)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Missing Prerequisites */}
        {tree.missingPrerequisites.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-amber-400 min-w-28 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              Missing Facts:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {tree.missingPrerequisites.map((m) => (
                <span
                  key={m}
                  className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium"
                >
                  {formatFactName(m)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Nested Subgoals */}
      {hasSubgoals && isExpanded && (
        <div className="pl-4 sm:pl-6 pr-3 py-2 border-t border-slate-800/80 bg-slate-950/40 space-y-2">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold py-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Subgoal Hypotheses for {tree.goalTitle}:</span>
          </div>
          {tree.subgoals.map((subgoal, idx) => (
            <GoalTreeViewer key={`${subgoal.goal}-${idx}`} tree={subgoal} defaultExpanded={false} />
          ))}
        </div>
      )}
    </div>
  );
};
