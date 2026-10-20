import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  GitPullRequest,
  RotateCcw,
  Home,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Printer,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  Database,
  Calendar,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  ShieldAlert,
  Clock,
  Activity,
  BookOpen,
  Bug,
  Terminal,
} from 'lucide-react';
import {
  AssessmentInput,
  AssessmentResult,
  ForwardChainingResult,
  BackwardChainingResult,
  ComparisonResult,
  DerivedConclusion,
} from '../types';
import {
  getAssessmentInput,
  getAssessmentResult,
} from '../utils/sessionStorage';
import { getSymptomLabel, getSymptomById } from '../data/symptoms';
import { formatFactName, formatRuleLogicExpression } from '../engine/ruleMatcher';
import { RULE_MAP } from '../data/rules';
import { evaluateMedicalAttention } from '../engine/medicalAttention';
import { ReasoningTrace } from '../components/ReasoningTrace';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';

export const ResultsPage: React.FC = () => {
  const [input, setInput] = useState<AssessmentInput | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllEvaluations, setShowAllEvaluations] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  useEffect(() => {
    const savedInput = getAssessmentInput();
    const savedResult = getAssessmentResult();

    setInput(savedInput);
    setResult(savedResult);
    setIsLoading(false);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Compute medical attention triage assessment independently
  const medicalAttention = useMemo(() => {
    if (!input) return null;
    return evaluateMedicalAttention(
      input.selectedSymptomIds,
      input.duration,
      input.severity
    );
  }, [input]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-400 rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 text-sm">Compiling medical assessment report...</p>
      </div>
    );
  }

  // Safe fallback if user visits /results directly without running an assessment
  if (!result || !input) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">No Active Assessment Report Found</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Session storage does not currently contain an active evaluation. Please select your symptoms and generate an assessment report.
          </p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-[#0B1220] font-bold text-sm shadow-md"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Go to Symptom Assessment</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const isComparison = result.method === 'compare';
  const isForward = result.method === 'forward';
  const isBackward = result.method === 'backward';

  const forwardResult = isComparison
    ? (result as ComparisonResult).forwardResult
    : isForward
    ? (result as ForwardChainingResult)
    : null;

  const backwardResult = isComparison
    ? (result as ComparisonResult).backwardResult
    : isBackward
    ? (result as BackwardChainingResult)
    : null;

  const comparisonResult = isComparison ? (result as ComparisonResult) : null;

  // Extract all confirmed conclusions
  const derivedConclusions: DerivedConclusion[] = isComparison
    ? forwardResult?.conclusions ?? []
    : isForward
    ? forwardResult?.conclusions ?? []
    : backwardResult?.supportedGoals ?? [];

  // Summary counts directly from actual engine output
  const rulesEvaluatedCount = isComparison
    ? forwardResult?.rulesEvaluatedCount ?? 0
    : isForward
    ? forwardResult?.rulesEvaluatedCount ?? 0
    : backwardResult?.rulesEvaluatedCount ?? 0;

  const rulesFiredCount = isComparison
    ? forwardResult?.rulesFiredCount ?? 0
    : isForward
    ? forwardResult?.rulesFiredCount ?? 0
    : backwardResult?.rulesFiredCount ?? 0;

  const executionTimeMs = isComparison
    ? Number(((forwardResult?.executionTimeMs ?? 0) + (backwardResult?.executionTimeMs ?? 0)).toFixed(2))
    : isForward
    ? forwardResult?.executionTimeMs ?? 0
    : backwardResult?.executionTimeMs ?? 0;

  const assessmentTimestamp = input.assessmentDate
    ? new Date(input.assessmentDate).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : new Date().toLocaleString();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 print:p-0 print:m-0 print:max-w-none">
      {/* Print-Only Document Header */}
      <div className="hidden print:block border-b-2 border-slate-900 pb-4 mb-6 text-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black">MediExpert AI</h1>
            <p className="text-sm text-slate-700">Clinical Symptom Assessment & Rule-Based Inference Report</p>
          </div>
          <div className="text-right text-xs text-slate-700 font-mono">
            <p>Evaluation Date: {assessmentTimestamp}</p>
            <p>Inference Method: {result.method.toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Screen Header & Top Action Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
            <Link to="/assessment" className="hover:underline flex items-center gap-1">
              <span>Symptom Assessment</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300">Assessment Report</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-teal-400" />
            <span>Medical Assessment Report</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Generated via deterministic forward/backward rule-based inference. Not a confirmed diagnosis.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-teal-400" />
            <span>Print / Save as PDF</span>
          </button>
          <Link
            to="/assessment"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Modify Symptoms</span>
          </Link>
        </div>
      </div>

      {/* 1. PRIORITY EMERGENCY / SAFETY ALERT (Displayed before ordinary results if triggered) */}
      {medicalAttention && medicalAttention.urgencyAlertRequired && (
        <div
          role="alert"
          className={`p-5 sm:p-6 rounded-2xl border shadow-xl animate-in fade-in ${
            medicalAttention.level === 'emergency'
              ? 'bg-red-950/70 border-red-500 text-white shadow-red-950/50'
              : 'bg-amber-950/70 border-amber-500/70 text-white shadow-amber-950/50'
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                medicalAttention.level === 'emergency'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}
            >
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    medicalAttention.level === 'emergency'
                      ? 'bg-red-500 text-slate-950'
                      : 'bg-amber-400 text-slate-950'
                  }`}
                >
                  {medicalAttention.levelBadge}
                </span>
                <span className="text-xs text-slate-300">Independent Safety Rule Evaluation</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                {medicalAttention.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {medicalAttention.emergencyWarningMessage}
              </p>

              {/* Specific Triggering Reasons */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-slate-300 mb-1">
                  Triggered Warning Features:
                </p>
                <ul className="space-y-1 text-xs text-slate-200 list-disc list-inside">
                  {medicalAttention.reasons.map((reason, idx) => (
                    <li key={idx} className="leading-relaxed">{reason}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Assessment Summary Banner (Derived directly from Engine Output) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-5 print:border-slate-300 print:bg-white print:text-black">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 print:border-slate-300">
          <div>
            <h2 className="text-base font-bold text-white print:text-black">
              Clinical Assessment Summary
            </h2>
            <p className="text-xs text-slate-400 print:text-slate-600">
              Generated on {assessmentTimestamp}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700 print:border-slate-400 print:bg-slate-100 print:text-black">
              Method: {result.method.toUpperCase()}
            </span>
            {input.duration && (
              <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700 print:border-slate-400 print:bg-slate-100 print:text-black">
                Duration: {input.duration.replace('_', ' ')}
              </span>
            )}
            {input.severity && (
              <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700 print:border-slate-400 print:bg-slate-100 print:text-black capitalize">
                Severity: {input.severity}
              </span>
            )}
          </div>
        </div>

        {/* Selected Symptoms Chips */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 print:text-slate-600">
            <span className="font-semibold text-slate-300 print:text-black">
              Reported Symptoms ({input.selectedSymptomIds.length} observations):
            </span>
            <span>Verified in Working Memory</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {input.selectedSymptomIds.map((id) => {
              const symptom = getSymptomById(id);
              const isUrgent = symptom?.isUrgentFlag;
              return (
                <span
                  key={id}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${
                    isUrgent
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 print:border-amber-600 print:text-amber-800'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 print:border-slate-400 print:bg-slate-100 print:text-black'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 print:text-teal-700 shrink-0" />
                  <span>{getSymptomLabel(id)}</span>
                  {isUrgent && (
                    <span className="text-[10px] text-amber-400 font-bold ml-1">
                      (Warning sign)
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Dynamic Engine Execution Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 print:border-slate-300">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-300">
            <div className="text-[11px] font-medium text-slate-400 print:text-slate-600">Rules Evaluated</div>
            <div className="text-xl font-extrabold text-white print:text-black mt-0.5">
              {rulesEvaluatedCount}
            </div>
            <div className="text-[10px] text-slate-400">Total rules tested</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-300">
            <div className="text-[11px] font-medium text-slate-400 print:text-slate-600">Rules Fired</div>
            <div className="text-xl font-extrabold text-teal-400 print:text-teal-700 mt-0.5">
              {rulesFiredCount}
            </div>
            <div className="text-[10px] text-slate-400">Prerequisites met</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-300">
            <div className="text-[11px] font-medium text-slate-400 print:text-slate-600">Possible Conditions</div>
            <div className="text-xl font-extrabold text-cyan-400 print:text-cyan-700 mt-0.5">
              {derivedConclusions.length}
            </div>
            <div className="text-[10px] text-slate-400">Supported patterns</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-300">
            <div className="text-[11px] font-medium text-slate-400 print:text-slate-600">Execution Time</div>
            <div className="text-xl font-extrabold text-slate-300 print:text-black mt-0.5 font-mono">
              {executionTimeMs}ms
            </div>
            <div className="text-[10px] text-slate-400">Deterministic cycle</div>
          </div>
        </div>
      </div>

      {/* 3. Section: "Do I Need to See a Doctor?" (Medical-Attention Assessment) */}
      {medicalAttention && (
        <section
          id="doctor-attention-section"
          className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-4 print:border-slate-300 print:bg-white print:text-black"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-800 print:border-slate-300">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-400" />
              <h2 className="text-lg font-bold text-white print:text-black">
                Do I Need to See a Doctor?
              </h2>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 ${
                medicalAttention.level === 'emergency'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                  : medicalAttention.level === 'prompt_doctor'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Action Level: {medicalAttention.levelBadge}</span>
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-slate-200 print:text-slate-800 leading-relaxed font-medium">
              {medicalAttention.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Triage Rationale */}
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-2 print:border-slate-300 print:bg-slate-50">
                <h4 className="text-xs font-bold text-slate-300 print:text-black uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  Clinical Evaluation Reasons
                </h4>
                <ul className="space-y-1 text-xs text-slate-300 print:text-slate-700 list-disc list-inside">
                  {medicalAttention.reasons.map((r, i) => (
                    <li key={i} className="leading-relaxed">{r}</li>
                  ))}
                </ul>
              </div>

              {/* Actionable Guidance */}
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-2 print:border-slate-300 print:bg-slate-50">
                <h4 className="text-xs font-bold text-slate-300 print:text-black uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Recommended Action Steps
                </h4>
                <ul className="space-y-1 text-xs text-slate-300 print:text-slate-700 list-disc list-inside">
                  {medicalAttention.guidance.map((g, i) => (
                    <li key={i} className="leading-relaxed">{g}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Section: Possible Condition Patterns */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white print:text-black flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span>Possible Condition Patterns</span>
            </h2>
            <p className="text-xs text-slate-400 print:text-slate-600">
              Candidate symptom patterns derived from satisfied rule prerequisites in working memory.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {derivedConclusions.length} pattern(s) supported
          </span>
        </div>

        {derivedConclusions.length > 0 ? (
          <div className="space-y-5">
            {derivedConclusions.map((conclusion, index) => (
              <div
                key={`${conclusion.id}-${index}`}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-5 print:border-slate-300 print:bg-white print:text-black"
              >
                {/* Condition Title & Category */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800 print:border-slate-300">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                      {conclusion.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white print:text-black tracking-tight">
                      {conclusion.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded text-xs font-mono bg-slate-800 text-teal-300 border border-slate-700 print:border-slate-300 print:text-black">
                      Rule: {conclusion.supportingRuleId}
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-sm text-slate-300 print:text-slate-800 leading-relaxed">
                  {conclusion.explanation}
                </p>

                {/* IF-THEN Formal Rule Logic */}
                {conclusion.ruleConditions && (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs print:border-slate-300 print:bg-slate-50">
                    <span className="text-slate-400 font-semibold">Rule [{conclusion.supportingRuleId}]: </span>
                    <span className="text-teal-300 print:text-teal-800">
                      {RULE_MAP.get(conclusion.supportingRuleId)
                        ? formatRuleLogicExpression(RULE_MAP.get(conclusion.supportingRuleId)!)
                        : `IF ${conclusion.ruleConditions.join(' AND ')} THEN ${conclusion.title}`}
                    </span>
                  </div>
                )}

                {/* Symptom Match Analysis: Reported vs Unreported/Unknown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Reported & Supporting Symptoms */}
                  <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 print:border-slate-300 print:bg-slate-50 space-y-2">
                    <div className="text-xs font-bold text-slate-300 print:text-black flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-teal-300 print:text-teal-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Reported & Matched Symptoms
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Present in Memory</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {conclusion.supportingSymptoms.map((symId) => (
                        <span
                          key={symId}
                          className="px-2.5 py-1 rounded-md text-xs bg-teal-500/10 border border-teal-500/30 text-teal-200 print:text-teal-900 font-medium"
                        >
                          {formatFactName(symId)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Other Relevant Symptoms (Clearly labelled as UNKNOWN rather than absent) */}
                  <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 print:border-slate-300 print:bg-slate-50 space-y-2">
                    <div className="text-xs font-bold text-slate-300 print:text-black flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                        Other Relevant Symptoms (Unreported / Status Unknown)
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Not assessed</span>
                    </div>
                    {conclusion.unreportedAssociatedSymptoms && conclusion.unreportedAssociatedSymptoms.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {conclusion.unreportedAssociatedSymptoms.map((symId) => (
                          <span
                            key={symId}
                            className="px-2.5 py-1 rounded-md text-xs bg-slate-800/60 border border-slate-700/60 text-slate-400 print:text-slate-600 font-medium"
                          >
                            {formatFactName(symId)} (Unknown)
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        All primary symptoms associated with this pattern were reported.
                      </p>
                    )}
                  </div>
                </div>

                {/* Section: Home Care & Symptom Relief */}
                {conclusion.homeCare && conclusion.homeCare.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5 print:border-slate-300 print:bg-slate-50">
                    <h4 className="text-xs font-bold text-teal-300 print:text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                      <HeartHandshake className="w-4 h-4 text-teal-400" />
                      Home Care & Symptom Relief
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300 print:text-slate-800 list-disc list-inside">
                      {conclusion.homeCare.map((measure, idx) => (
                        <li key={idx} className="leading-relaxed">{measure}</li>
                      ))}
                    </ul>
                    <div className="pt-1 border-t border-slate-800/80 text-[11px] text-slate-400 print:text-slate-600 italic">
                      Precaution: General supportive advice only. Avoid aspirin in children. If self-care fails to improve symptoms within 48–72 hours, seek medical review.
                    </div>
                  </div>
                )}

                {/* Conservative Next Steps */}
                {conclusion.nextSteps && (
                  <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs text-slate-300 print:text-slate-800 space-y-1">
                    <span className="font-bold text-slate-200 print:text-black">Clinical Next Steps: </span>
                    <span className="leading-relaxed">{conclusion.nextSteps}</span>
                  </div>
                )}

                {/* Evidence References */}
                {conclusion.references && conclusion.references.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap pt-1 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-slate-400">
                      <BookOpen className="w-3 h-3 text-slate-400" />
                      Medical Literature Citations:
                    </span>
                    {conclusion.references.map((ref) => (
                      <span
                        key={ref}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[10px]"
                      >
                        {ref}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Useful Empty State (No Rules Matched) */
          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="text-lg font-bold text-white">
                No matching condition pattern was identified from the selected symptoms
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                The 50-rule knowledge base did not find an established rule where all required prerequisites were satisfied by this specific combination of symptoms.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs text-slate-300 space-y-1.5 mt-3">
                <span className="font-bold text-amber-300">Important Clinical Context:</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  This does <strong>not</strong> imply that you are healthy or that no illness is present. Many medical conditions involve subtle physical signs, laboratory blood work, imaging, or symptom combinations not captured by this educational symbolic rule set.
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  If your symptoms persist, cause discomfort, or if you feel unwell, consult a licensed healthcare professional for a personalized clinical evaluation.
                </p>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Review or Add Symptoms</span>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 5. Collapsible Rule Evaluation Details (Transparent Inspector) */}
      <section className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 print:hidden">
        <button
          type="button"
          onClick={() => setShowAllEvaluations(!showAllEvaluations)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors flex items-center gap-2">
              <Database className="w-4 h-4 text-teal-400" />
              <span>Rule Evaluation Details (Knowledge Base Inspector)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Inspect exactly which rules fired and why other rules failed to fire due to missing prerequisites.
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>{showAllEvaluations ? 'Hide Details' : 'View Rule Evaluations'}</span>
            {showAllEvaluations ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showAllEvaluations && forwardResult && (
          <div className="pt-4 border-t border-slate-800 space-y-4 animate-in fade-in">
            {/* Fired Rules */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                Fired Rules ({forwardResult.firedRules.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {forwardResult.firedRules.map((rule) => (
                  <div key={rule.id} className="p-3 rounded-xl bg-slate-950 border border-teal-500/30 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-teal-300">[{rule.id}]</span>
                      <span className="text-[10px] text-teal-400 font-semibold">FIRED</span>
                    </div>
                    <div className="text-slate-200 font-semibold">{rule.title}</div>
                    <div className="text-[11px] text-slate-400">
                      Conditions satisfied: {rule.conditions.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unmatched Rules (Near Misses) */}
            <div className="space-y-2 pt-3 border-t border-slate-800/80">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Unmatched Rules Sample ({forwardResult.unmatchedRules.length} evaluated)
              </h4>
              <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                {forwardResult.unmatchedRules.slice(0, 10).map(({ rule, satisfiedConditions, missingConditions }) => (
                  <div key={rule.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-400">[{rule.id}] {rule.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">UNMATCHED</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Present: <span className="text-teal-300">{satisfiedConditions.length > 0 ? satisfiedConditions.join(', ') : 'None'}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Missing: <span className="text-red-400">{missingConditions.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 6. Section: Inference Engine Development Diagnostics (Step 2 Audit Panel) */}
      <section className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 print:hidden">
        <button
          type="button"
          onClick={() => setShowDiagnostics(!showDiagnostics)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
              <Bug className="w-4 h-4 text-cyan-400" />
              <span>Inference Engine Development Diagnostics</span>
            </h3>
            <p className="text-xs text-slate-400">
              Trace working memory facts, loaded rules, evaluation metrics, and filter audits.
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>{showDiagnostics ? 'Hide Diagnostics' : 'View Diagnostics'}</span>
            {showDiagnostics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showDiagnostics && (
          <div className="pt-4 border-t border-slate-800 space-y-4 animate-in fade-in">
            {/* Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 block">Total Rules Loaded</span>
                <span className="text-base font-bold text-white font-mono">
                  {result.diagnostics?.totalRulesLoaded ?? 50}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 block">Rules Evaluated</span>
                <span className="text-base font-bold text-cyan-300 font-mono">
                  {result.diagnostics?.rulesEvaluatedCount ?? rulesEvaluatedCount}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 block">Rules Fired</span>
                <span className="text-base font-bold text-teal-300 font-mono">
                  {result.diagnostics?.rulesFiredCount ?? rulesFiredCount}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 block">Filtered Intermediate Facts</span>
                <span className="text-base font-bold text-amber-300 font-mono">
                  {result.diagnostics?.filteredOutConclusionIds?.length ?? 0}
                </span>
              </div>
            </div>

            {/* Diagnostic Details Lists */}
            <div className="space-y-3 text-xs">
              {/* 1. Selected Symptom IDs */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <span className="font-semibold text-slate-300">1. Selected Symptom IDs (User Input):</span>
                <div className="font-mono text-xs text-teal-300">
                  {input.selectedSymptomIds.length > 0 ? input.selectedSymptomIds.join(', ') : 'None'}
                </div>
              </div>

              {/* 2. Initial Working-Memory Facts */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <span className="font-semibold text-slate-300">2. Initial Working-Memory Facts (Normalized):</span>
                <div className="font-mono text-xs text-cyan-300">
                  {(result.diagnostics?.initialWorkingMemory ?? input.selectedSymptomIds).join(', ')}
                </div>
              </div>

              {/* 3. Fired Rule IDs */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <span className="font-semibold text-slate-300">3. Rules Fired:</span>
                <div className="font-mono text-xs text-teal-300">
                  {result.diagnostics?.firedRuleIds && result.diagnostics.firedRuleIds.length > 0
                    ? result.diagnostics.firedRuleIds.join(', ')
                    : 'No rules fired'}
                </div>
              </div>

              {/* 4. Derived Conclusions */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <span className="font-semibold text-slate-300">4. Conclusions Derived:</span>
                <div className="font-mono text-xs text-cyan-300">
                  {derivedConclusions.length > 0
                    ? derivedConclusions.map((c) => `${c.id} (${c.title})`).join(', ')
                    : 'None'}
                </div>
              </div>

              {/* 5. Filtered-out Intermediate Facts */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <span className="font-semibold text-slate-300">5. Intermediate Conclusions Filtered from Final Condition Cards:</span>
                <div className="font-mono text-xs text-amber-300">
                  {result.diagnostics?.filteredOutConclusionIds && result.diagnostics.filteredOutConclusionIds.length > 0
                    ? result.diagnostics.filteredOutConclusionIds.join(', ')
                    : 'None (all fired clinical patterns are displayed in report)'}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 7. Section: Detailed Inference Trace */}
      <section className="space-y-4 print:hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-cyan-400" />
            <span>Reasoning Algorithm Trace</span>
          </h2>
          <span className="text-xs text-slate-400">
            {isComparison
              ? 'Side-by-side concordance'
              : isForward
              ? 'Forward chaining step log'
              : 'Backward goal tree'}
          </span>
        </div>

        {isComparison && comparisonResult && (
          <div className="space-y-5">
            {/* Concordance Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider">
                Concordance Analysis Summary
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {comparisonResult.comparisonAnalysis.summary}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                  <span className="font-semibold text-teal-300">Agreements:</span>
                  <ul className="list-disc list-inside text-slate-400 text-[11px]">
                    {comparisonResult.comparisonAnalysis.agreements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                  <span className="font-semibold text-cyan-300">Differences / Scope:</span>
                  <ul className="list-disc list-inside text-slate-400 text-[11px]">
                    {comparisonResult.comparisonAnalysis.differences.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <ReasoningTrace result={comparisonResult.forwardResult} title="Forward Chaining (Data-Driven Trace)" />
            <ReasoningTrace result={comparisonResult.backwardResult} title="Backward Chaining (Goal Tree Trace)" />
          </div>
        )}

        {isForward && forwardResult && (
          <ReasoningTrace result={forwardResult} />
        )}

        {isBackward && backwardResult && (
          <ReasoningTrace result={backwardResult} />
        )}
      </section>

      {/* 7. Bottom Navigation & Disclaimer */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <Link
          to="/assessment"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>New Assessment</span>
        </Link>
        <Link
          to="/knowledge-base"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors"
        >
          <Database className="w-4 h-4" />
          <span>Explore 50-Rule Knowledge Base</span>
        </Link>
      </div>

      <MedicalDisclaimer />
    </div>
  );
};
