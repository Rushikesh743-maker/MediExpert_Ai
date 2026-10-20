import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Shield, ArrowRight, Activity, BookOpen, Stethoscope, Sparkles } from 'lucide-react';
import { RULES_DATA } from '../data/rules';
import { SYMPTOMS_DATA } from '../data/symptoms';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070B14] border-t border-slate-800 text-slate-400 text-sm mt-auto print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & System Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#0B1220] rounded-[6px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                MediExpert<span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A clinical symptom assessment expert system operating on genuine Forward and Backward Chaining algorithms across 50 public health production rules.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 bg-teal-950/40 border border-teal-500/20 px-3 py-2 rounded-xl">
              <Activity className="w-4 h-4 shrink-0" />
              <span>Deterministic Symbolic AI • Zero API Keys</span>
            </div>
          </div>

          {/* Column 2: Inference Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Inference Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>Data-Driven Forward Chaining</span>
              </li>
              <li className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Goal-Driven Backward Chaining</span>
              </li>
              <li className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Step-by-Step Reasoning Traces</span>
              </li>
              <li className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Multi-Tier Chained Rule Dependencies</span>
              </li>
              <li className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Dual Method Concordance Analysis</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span>Home & Overview</span>
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span>Symptom Assessment Tool</span>
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span>Assessment Report</span>
                </Link>
              </li>
              <li>
                <Link to="/knowledge-base" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span>Knowledge Base ({RULES_DATA.length} Rules)</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span>Theory & Architecture</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Architecture Specifications */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Knowledge Base Specs
            </h4>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Knowledge Base:</span>
                <span className="text-teal-400">{RULES_DATA.length} Curated Rules</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Symptom Space:</span>
                <span className="text-cyan-400">{SYMPTOMS_DATA.length} Clinical Facts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Evidence Sources:</span>
                <span className="text-sky-300">CDC, NHS, NIDDK, AAAAI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Execution:</span>
                <span className="text-emerald-400">100% Client-Side SPA</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Static single-page architecture with deterministic reasoning traces, deployable to Vercel.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} MediExpert AI — Rule-Based Medical Diagnosis System.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-amber-400/90 text-[11px]">
              <Shield className="w-3.5 h-3.5" />
              <span>Informational & Non-Prescriptive • Consult a Doctor for Medical Advice</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
