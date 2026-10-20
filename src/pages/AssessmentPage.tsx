import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RotateCcw,
  Play,
  CheckCircle2,
  AlertTriangle,
  GitPullRequest,
  Sparkles,
  Search,
  X,
  Stethoscope,
  Clock,
  Activity,
  Layers,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { SYMPTOMS_DATA } from '../data/symptoms';
import { getNonIntermediateConclusions } from '../engine/ruleMatcher';
import { executeAssessment } from '../engine';
import { saveAssessmentInput, saveAssessmentResult } from '../utils/sessionStorage';
import { AssessmentInput, InferenceMethod } from '../types';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';

export const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [inferenceMethod, setInferenceMethod] = useState<InferenceMethod>('forward');
  const [targetGoalId, setTargetGoalId] = useState<string>('');
  const [duration, setDuration] = useState<string>('1-3_days');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('moderate');
  const [symptomSearch, setSymptomSearch] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Candidate goals for backward chaining
  const candidateGoals = useMemo(() => getNonIntermediateConclusions(), []);

  // Filter symptoms based on search input
  const filteredSymptoms = useMemo(() => {
    const query = symptomSearch.trim().toLowerCase();
    if (!query) return SYMPTOMS_DATA;
    return SYMPTOMS_DATA.filter(
      (s) =>
        s.label.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
    );
  }, [symptomSearch]);

  const toggleSymptom = (id: string) => {
    setValidationError(null);
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setValidationError(null);
    // If searching, select all filtered; otherwise select all 25
    const idsToAdd = filteredSymptoms.map((s) => s.id);
    setSelectedSymptoms((prev) => Array.from(new Set([...prev, ...idsToAdd])));
  };

  const handleClearSelection = () => {
    setValidationError(null);
    setSelectedSymptoms([]);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setValidationError(null);
    setTargetGoalId('');
    setSymptomSearch('');
    setInferenceMethod('forward');
    setDuration('1-3_days');
    setSeverity('moderate');
  };

  // Quick symptom presets to make selecting 2-3 symptoms instantaneous
  const applyPreset = (
    symptomIds: string[],
    method: InferenceMethod = 'forward'
  ) => {
    setValidationError(null);
    setSelectedSymptoms(symptomIds);
    setInferenceMethod(method);
  };

  const handleGenerateAssessment = () => {
    if (selectedSymptoms.length === 0) {
      setValidationError('Please select at least one symptom from the checklist to run the assessment.');
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    setValidationError(null);

    const inputData: AssessmentInput = {
      selectedSymptomIds: selectedSymptoms,
      duration,
      severity,
      method: inferenceMethod,
      targetGoalId: targetGoalId || undefined,
      assessmentDate: new Date().toISOString(),
    };

    try {
      const assessmentResult = executeAssessment(inputData);
      saveAssessmentInput(inputData);
      saveAssessmentResult(assessmentResult);
      navigate('/results');
    } catch (err) {
      setValidationError(
        'An error occurred during inference. Please review selected symptoms and retry.'
      );
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 border border-teal-500/30 text-teal-300">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Clinical Symptom Assessment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Symptom Checklist & Inference Setup
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Select all active observations from the standardized checklist of 25 symptoms below.
          The rule-based expert system will evaluate the knowledge base and derive matching condition patterns
          using your chosen inference method.
        </p>
      </div>

      {/* Validation Alert */}
      {validationError && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 flex items-start gap-3 shadow-lg animate-in fade-in"
        >
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-red-200">Selection Required</h4>
            <p className="text-xs sm:text-sm text-red-300/90">{validationError}</p>
          </div>
        </div>
      )}

      {/* Quick Presets for Instant 2–3 Symptom Selection */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            Quick Example Sets (Click to test 2–3 symptoms)
          </span>
          <span className="text-[11px] text-slate-400">Pre-loads symptoms directly into the checklist</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyPreset(['runny_nose', 'sneezing', 'sore_throat'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-teal-500/20 text-slate-300 hover:text-teal-200 border border-slate-700/60 hover:border-teal-500/40 transition-colors"
          >
            Cold Triad (3 symptoms)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(['fever', 'chills', 'body_aches', 'cough'], 'compare')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-teal-500/20 text-slate-300 hover:text-teal-200 border border-slate-700/60 hover:border-teal-500/40 transition-colors"
          >
            Flu-Like Illness (4 symptoms)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(['sneezing', 'runny_nose', 'itchy_or_watery_eyes'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-teal-500/20 text-slate-300 hover:text-teal-200 border border-slate-700/60 hover:border-teal-500/40 transition-colors"
          >
            Allergic Rhinitis (3 symptoms)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(['blocked_nose', 'facial_pressure_or_pain', 'headache'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-teal-500/20 text-slate-300 hover:text-teal-200 border border-slate-700/60 hover:border-teal-500/40 transition-colors"
          >
            Acute Sinusitis (3 symptoms)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(['diarrhea', 'nausea', 'abdominal_pain'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-teal-500/20 text-slate-300 hover:text-teal-200 border border-slate-700/60 hover:border-teal-500/40 transition-colors"
          >
            Gastroenteritis (3 symptoms)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(['heartburn_or_acid_reflux', 'nausea'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-teal-500/20 text-slate-300 hover:text-teal-200 border border-slate-700/60 hover:border-teal-500/40 transition-colors"
          >
            Acid Reflux / GERD (2 symptoms)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(['headache', 'sensitivity_to_light', 'nausea'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-teal-500/20 text-slate-300 hover:text-teal-200 border border-slate-700/60 hover:border-teal-500/40 transition-colors"
          >
            Migraine Pattern (3 symptoms)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(['burning_urination', 'frequent_urination'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-teal-500/20 text-slate-300 hover:text-teal-200 border border-slate-700/60 hover:border-teal-500/40 transition-colors"
          >
            Lower Urinary / UTI (2 symptoms)
          </button>
        </div>
      </div>

      {/* Main Checklist Container */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
        {/* Search, Action Toolbar & Live Counter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="symptom-search-input"
              value={symptomSearch}
              onChange={(e) => setSymptomSearch(e.target.value)}
              placeholder="Search 25 symptoms (e.g. fever, cough, nausea)..."
              className="w-full pl-9 pr-8 py-2 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/40 transition-all"
            />
            {symptomSearch && (
              <button
                type="button"
                onClick={() => setSymptomSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Counter and Batch Controls */}
          <div className="flex items-center gap-2.5 flex-wrap justify-between sm:justify-end">
            <span
              id="selected-symptoms-counter"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{selectedSymptoms.length} of {SYMPTOMS_DATA.length} selected</span>
            </span>

            <button
              type="button"
              id="select-all-btn"
              onClick={handleSelectAll}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              Select All
            </button>

            <button
              type="button"
              id="clear-selection-btn"
              onClick={handleClearSelection}
              disabled={selectedSymptoms.length === 0}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Clear Selection
            </button>
          </div>
        </div>

        {/* 25-Symptom Checklist (Single Responsive Compact Grid) */}
        <div
          id="symptoms-checklist-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
        >
          {filteredSymptoms.map((symptom, index) => {
            const isSelected = selectedSymptoms.includes(symptom.id);

            return (
              <label
                key={symptom.id}
                htmlFor={`symptom-checkbox-${symptom.id}`}
                className={`group relative flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'bg-teal-950/30 border-teal-500/60 shadow-sm ring-1 ring-teal-500/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Accessible Native Checkbox */}
                <input
                  type="checkbox"
                  id={`symptom-checkbox-${symptom.id}`}
                  checked={isSelected}
                  onChange={() => toggleSymptom(symptom.id)}
                  className="sr-only"
                  aria-label={symptom.label}
                />

                {/* Custom Checkbox Indicator */}
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-teal-500 border-teal-400 text-slate-950'
                      : 'border-slate-700 group-hover:border-slate-500 bg-slate-900'
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />}
                </div>

                {/* Symptom Label & Urgency Badge */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs text-slate-400 font-mono">
                      {index + 1}.
                    </span>
                    <span
                      className={`text-sm font-semibold transition-colors ${
                        isSelected ? 'text-teal-200' : 'text-slate-200 group-hover:text-white'
                      }`}
                    >
                      {symptom.label}
                    </span>
                    {symptom.isUrgentFlag && (
                      <span
                        title="High-priority clinical warning sign"
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0"
                      >
                        Warning Sign
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 group-hover:line-clamp-2 transition-all">
                    {symptom.description}
                  </p>
                </div>
              </label>
            );
          })}
        </div>

        {filteredSymptoms.length === 0 && (
          <div className="py-12 text-center space-y-2">
            <Search className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-400">No matching symptoms found</p>
            <p className="text-xs text-slate-400">
              Try searching with another keyword or clear the search filter.
            </p>
            <button
              type="button"
              onClick={() => setSymptomSearch('')}
              className="mt-2 px-3 py-1 rounded-lg text-xs bg-slate-800 text-slate-300 hover:text-white"
            >
              Clear Search Filter
            </button>
          </div>
        )}
      </div>

      {/* Clinical Context & Reasoning Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Clinical Duration & Severity */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Clock className="w-4 h-4 text-teal-400" />
            <span>Clinical Context (Duration & Severity)</span>
          </div>

          <div className="space-y-3">
            <div>
              <label htmlFor="duration-select" className="block text-xs font-medium text-slate-400 mb-1">
                Approximate Symptom Duration
              </label>
              <select
                id="duration-select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500/60"
              >
                <option value="under_24h">Less than 24 hours (Sudden onset)</option>
                <option value="1-3_days">1 to 3 days (Acute)</option>
                <option value="4-7_days">4 to 7 days (Subacute)</option>
                <option value=">1_week">More than 1 week (Prolonged / Persistent)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Overall Symptom Severity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['mild', 'moderate', 'severe'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSeverity(lvl)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-medium capitalize border transition-all ${
                      severity === lvl
                        ? 'bg-teal-500/20 border-teal-500/60 text-teal-200 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inference Method Selection */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <GitPullRequest className="w-4 h-4 text-cyan-400" />
            <span>Reasoning Algorithm</span>
          </div>

          <div className="space-y-2">
            {[
              {
                id: 'forward' as InferenceMethod,
                label: 'Forward Chaining (Data-Driven)',
                desc: 'Starts with selected symptoms as working memory facts, fires applicable rules, and derives all supported condition patterns.',
              },
              {
                id: 'backward' as InferenceMethod,
                label: 'Backward Chaining (Goal-Driven)',
                desc: 'Selects a clinical condition pattern as a target goal and recursively verifies whether required prerequisites are present in working memory.',
              },
              {
                id: 'compare' as InferenceMethod,
                label: 'Compare Both (Concordance)',
                desc: 'Executes Forward and Backward Chaining simultaneously on identical facts and inspects inference traces side-by-side.',
              },
            ].map((method) => (
              <label
                key={method.id}
                htmlFor={`method-${method.id}`}
                className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer ${
                  inferenceMethod === method.id
                    ? 'bg-cyan-950/20 border-cyan-500/60 text-white'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  id={`method-${method.id}`}
                  name="inference-method"
                  value={method.id}
                  checked={inferenceMethod === method.id}
                  onChange={() => setInferenceMethod(method.id)}
                  className="mt-0.5 text-cyan-500 focus:ring-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-200">
                    {method.label}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                    {method.desc}
                  </p>
                </div>
              </label>
            ))}

            {/* Target Goal for Backward Chaining if chosen */}
            {inferenceMethod === 'backward' && (
              <div className="pt-2 animate-in fade-in">
                <label
                  htmlFor="target-goal-select"
                  className="block text-xs font-medium text-slate-300 mb-1"
                >
                  Hypothesis Target (Optional)
                </label>
                <select
                  id="target-goal-select"
                  value={targetGoalId}
                  onChange={(e) => setTargetGoalId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Evaluate all candidate condition patterns</option>
                  {candidateGoals.map((goal) => (
                    <option key={goal.id} value={goal.id}>
                      {goal.title} ({goal.category})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={handleReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-sm font-semibold transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All</span>
        </button>

        <button
          type="button"
          id="generate-assessment-btn"
          onClick={handleGenerateAssessment}
          disabled={isProcessing}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-teal-500/20 transition-all transform active:scale-95 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              <span>Running Inference Engine...</span>
            </>
          ) : (
            <>
              <Stethoscope className="w-4 h-4" />
              <span>Generate Assessment Report</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Single Clear Disclaimer at Bottom */}
      <MedicalDisclaimer />
    </div>
  );
};
