import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

interface MedicalDisclaimerProps {
  compact?: boolean;
  className?: string;
}

export const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({
  compact = false,
  className = '',
}) => {
  if (compact) {
    return (
      <div
        className={`flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs ${className}`}
        role="alert"
      >
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <p>
          <strong className="font-semibold text-amber-300">Informational Assessment Notice:</strong> MediExpert AI provides rule-based symptom analysis based on public health reference patterns. It does not provide certified medical diagnoses and does not replace consultation with a qualified healthcare professional.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-4 md:p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 to-slate-900/60 border border-amber-500/30 text-slate-200 shadow-lg ${className}`}
      role="alert"
      aria-label="Medical Disclaimer"
    >
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 shrink-0 mt-0.5 border border-amber-500/30">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-amber-300 text-sm sm:text-base">
              Medical Information & Safety Notice
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30">
              Informational Only
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed text-xs">
            This tool evaluates symptom combinations using propositional IF–THEN rules derived from published public health guidance (CDC, NHS, MedlinePlus, NIDDK). Results represent <strong>possible symptom patterns</strong> and do not constitute a confirmed medical diagnosis or personalized treatment plan.
          </p>
          <p className="text-amber-200/90 text-xs pt-1.5 border-t border-amber-500/20">
            <strong>Emergency Warning:</strong> If you or someone in your care experiences severe shortness of breath, acute chest pain, persistent confusion, sudden high fever with neck stiffness, or rapid deterioration, seek immediate emergency medical care (call 911, 112, or visit the nearest emergency department).
          </p>
        </div>
      </div>
    </div>
  );
};
