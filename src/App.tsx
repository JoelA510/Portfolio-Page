/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Github, ExternalLink, Activity, Database, Cpu, Network, ArrowRight, Bot, Search, UserCheck, ChevronDown, ArrowUp, Sun, Moon, ShieldCheck, Target, Layers, Menu, X, Command, CornerDownLeft, Mail } from 'lucide-react';
import { Chatbot } from './components/Chatbot';
import { ErrorBoundary } from './components/ErrorBoundary';

// ==========================================
// PORTFOLIO DATA - UPDATE YOUR DETAILS HERE
// ==========================================
const PORTFOLIO = {
  name: "JOEL ABRAHAM",
  title: "AI-AUGMENTED SOFTWARE ENGINEER",
  manifesto: "I build production software by directing AI agents through rigorous constraints - architecture, schemas, and test suites I define up front. The agents ship the code; the design discipline is mine. The result is high-velocity engineering without the hallucination tax: systems that pass their tests, survive their audits, and hold up under real users.",
  email: "hire.joel.abraham@gmail.com",
  github: "https://github.com/JoelA510",
  linkedin: "https://linkedin.com/in/joel-abraham-cv",
  traits: [
    {
      title: "Architecture First",
      description: "Prioritizing secure system design, scalable data models, and API blueprints before generating code.",
      icon: Layers
    },
    {
      title: "Agentic Orchestration",
      description: "Mastery of steering complex LLM toolchains via test-driven constraints and precise prompt engineering.",
      icon: Target
    },
    {
      title: "Rigorous Validation",
      description: "Enforcing quality through BDD frameworks and E2E Playwright suites to catch AI hallucinations early.",
      icon: ShieldCheck
    }
  ]
};

const PROJECTS = [
  {
    id: 'squadlogic',
    title: 'SquadLogic',
    description: 'Youth sports management dashboard. Directed the modernization of a full-stack scheduling application utilizing AI coding assistants. Engineered robust prompt frameworks and repository context guidelines to steer AI outputs.',
    tech: [
      { name: 'React 18', description: 'UI library for scheduling dashboard' },
      { name: 'Vite', description: 'Fast frontend build tool' },
      { name: 'TypeScript', description: 'Static typing for robustness' },
      { name: 'Supabase', description: 'Managed backend and RLS enforcement' }
    ],
    aiStack: [
      { name: 'Antigravity IDE', description: 'Agent driving boilerplate generation' },
      { name: 'Claude Code', description: 'AI pairing for drafting roster algorithms' },
      { name: 'GitHub Copilot', description: 'Tactical inline code suggestions' }
    ],
    remediation: '1. AI generates roster algorithm ➔ 2. Automated unit tests verify distribution ➔ 3. AI refines balancing logic ➔ 4. Human review of edge cases.',
    previewUrl: 'https://squadlogic.secureyour.tech',
    githubUrl: 'https://github.com/JoelA510/SquadLogic',
    liveUrl: 'https://squadlogic.secureyour.tech/',
    architecture: `[USER INPUT] ---> [REACT 18 FRONTEND]
                        |
                        v
                [ALGORITHMIC ENGINE]
                (Roster Generation)
                        |
                        v
                [SUPABASE BACKEND]
                  (RLS Enforced)`
  },
  {
    id: 'planterplan',
    title: 'PlanterPlan',
    description: 'Orchestrated agentic AI models to rapidly architect and scale a React/TypeScript project management platform. Formulated comprehensive context rules and implemented strict BDD testing protocols via Playwright to autonomously verify AI-generated logic.',
    tech: [
      { name: 'React', description: 'Frontend framework for project management UI' },
      { name: 'TypeScript', description: 'Ensures safe state transitions' }
    ],
    aiStack: [
      { name: 'Antigravity', description: 'Autonomous architecture mapping' },
      { name: 'Claude Code', description: 'Complex unit test drafting' },
      { name: 'Playwright BDD', description: 'Automated verification of AI constraints' }
    ],
    remediation: '1. AI generates feature ➔ 2. Automated Playwright suite runs ➔ 3. AI analyzes test failures ➔ 4. Human review of the final patch.',
    previewUrl: 'https://planterplan.secureyour.tech',
    githubUrl: 'https://github.com/JoelA510/PlanterPlan-Alpha',
    liveUrl: 'https://planterplan.secureyour.tech',
    architecture: `[AI AGENTS] <---> [REPO CONTEXT (.agent/rules)]
                        |
                        v
                [CODE GENERATION]
                        |
                        v
                [PLAYWRIGHT BDD SUITE]
                        | (Fail)
                        +---> [AI REMEDIATION LOOP]
                        | (Pass)
                        v
                [HUMAN SECURITY AUDIT]`
  },
  {
    id: 'ai-advocate',
    title: 'AI Advocate',
    description: 'Cross-platform mobile/web application focusing on accessibility and AI interaction. Engineered a secure backend schema with granular Row Level Security (RLS) policies to ensure strict multi-tenant data privacy.',
    tech: [
      { name: 'React Native', description: 'Cross-platform mobile framework' },
      { name: 'Expo', description: 'React Native toolchain' },
      { name: 'Supabase', description: 'PostgreSQL-backed API and auth layer' },
      { name: 'PostgreSQL', description: 'Relational database for storing schemas' },
      { name: 'Edge Functions', description: 'Serverless backend logic execution' }
    ],
    aiStack: [
      { name: 'Antigravity IDE', description: 'Primary agentic development environment' },
      { name: 'Claude Code', description: 'AI assistant for security policy generation' },
      { name: 'GitHub Copilot', description: 'Inline context-aware auto-completion' }
    ],
    remediation: '1. AI generates RLS policies ➔ 2. Automated Supabase local tests run ➔ 3. AI analyzes permission leaks ➔ 4. Human review of final security patch.',
    previewUrl: 'https://www.ai-advocate.org/',
    githubUrl: 'https://github.com/JoelA510/AIAdvocate',
    liveUrl: 'https://www.ai-advocate.org/',
    architecture: `[CLIENT (React Native)] ---> [API GATEWAY (Supabase)]
                                    |
                            +-------+-------+
                            |               |
                            v               v
                    [EDGE FUNCTIONS]  [POSTGRES DB]
                            |               |
                            v               v
                    [AI SERVICES]     [RLS POLICIES]`
  },
  {
    id: 'formwaypoint',
    title: 'FormWaypoint',
    description: 'Enterprise data processing monorepo. Implemented hybrid search (BM25 + vector) using ParadeDB to enable sub-second retrieval across large shipment and logistics datasets. Designed underlying data schemas and Zod validation layers.',
    tech: [
      { name: 'Hono (Node.js)', description: 'Fast, lightweight web framework for APIs' },
      { name: 'Prisma', description: 'Next-generation ORM' },
      { name: 'ParadeDB', description: 'Postgres extension for hybrid vector search' },
      { name: 'Turborepo', description: 'High-performance monorepo build system' },
      { name: 'TypeScript', description: 'Strict typing across full-stack packages' }
    ],
    aiStack: [
      { name: 'Antigravity IDE', description: 'Core scaffolding and monorepo setup' },
      { name: 'Claude Code', description: 'Schema analyzer and config optimizer' },
      { name: 'Zod Validation', description: 'AI-generated runtime type guards' }
    ],
    remediation: '1. AI generates Zod schemas & endpoints ➔ 2. Automated integration tests run ➔ 3. AI analyzes type mismatches ➔ 4. Human review of data validation layers.',
    previewUrl: 'https://formwaypoint.secureyour.tech',
    githubUrl: 'https://github.com/JoelA510/FormWaypoint',
    liveUrl: 'https://formwaypoint.secureyour.tech',
    architecture: `[LOGISTICS DATA] ---> [HONO API (Node.js)]
                                |
                                v
                        [PRISMA ORM]
                                |
                                v
                        [PARADEDB]
                (Hybrid Search: BM25 + Vector)`
  }
];

// ==========================================
// COMPONENTS
// ==========================================

const CircuitBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.setProperty('--spotlight-x', `${targetX}px`);
            containerRef.current.style.setProperty('--spotlight-y', `${targetY}px`);
          }
          animationFrameId = null;
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base tech pattern (visible everywhere) */}
      <div className="absolute inset-0 text-slate-900/15 dark:text-white/15 md:ml-[380px] transition-colors duration-500">
        <svg className="w-full h-full opacity-60">
          <defs>
            <pattern id="circuit" width="80" height="80" patternUnits="userSpaceOnUse">
              {/* Main PCB traces */}
              <path d="M20 0 V20 L40 40 V60 L20 80 M60 0 V20 L40 40 V60 L60 80 M0 20 H20 L40 40 L60 20 H80 M0 60 H20 L40 40 L60 60 H80" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
              {/* Inner connecting trace */}
              <path d="M40 20 L60 40 L40 60 L20 40 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
              {/* Vias / Connection points */}
              <circle cx="40" cy="40" r="2.5" fill="currentColor" />
              <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              <circle cx="60" cy="20" r="1.5" fill="currentColor" />
              <circle cx="20" cy="60" r="1.5" fill="currentColor" />
              <circle cx="60" cy="60" r="1.5" fill="currentColor" />
              <circle cx="40" cy="20" r="1" fill="currentColor" opacity="0.5" />
              <circle cx="60" cy="40" r="1" fill="currentColor" opacity="0.5" />
              <circle cx="40" cy="60" r="1" fill="currentColor" opacity="0.5" />
              <circle cx="20" cy="40" r="1" fill="currentColor" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>
      
      {/* Spotlight pattern (intensifies around cursor) */}
      <div 
        className="absolute inset-0 text-indigo-500/40 dark:text-indigo-400/50 transition-colors duration-500"
        style={{
          WebkitMaskImage: `radial-gradient(circle 400px at var(--spotlight-x, -1000px) var(--spotlight-y, -1000px), black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 400px at var(--spotlight-x, -1000px) var(--spotlight-y, -1000px), black 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 md:ml-[380px]">
          <svg className="w-full h-full">
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const WakingState = ({ onReady }: { onReady: () => void }) => {
  const messages = [
    "Allocating container...",
    "Pulling image...",
    "Mounting volumes...",
    "Starting dev server...",
  ];
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (msgIdx < messages.length) {
      // Simulate random step durations
      const stepDuration = 500 + Math.random() * 600;
      timer = setTimeout(() => {
        setMsgIdx(prev => prev + 1);
      }, stepDuration);
    } else {
      onReady();
    }
    return () => clearTimeout(timer);
  }, [msgIdx, onReady, messages.length]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-5 w-56 sm:w-64 relative"
    >
      {/* Complex Loading Indicator */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Outer orbital ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-0 rounded-full border-[1.5px] border-transparent border-t-indigo-500/80 border-b-indigo-500/80 dark:border-t-indigo-400/80 dark:border-b-indigo-400/80"
        />
        {/* Inner reverse orbital ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-1.5 rounded-full border-[1.5px] border-transparent border-l-indigo-400/60 border-r-indigo-400/60 dark:border-l-indigo-300/60 dark:border-r-indigo-300/60"
        />
        {/* Core glowing pulse */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-2.5 h-2.5 bg-indigo-500 dark:bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)] dark:shadow-[0_0_10px_rgba(129,140,248,0.8)]"
        />
      </div>
      
      <div className="w-full space-y-2 relative">
        <div className="w-full bg-slate-200/80 dark:bg-slate-800/80 backdrop-blur-sm h-1.5 rounded-full overflow-hidden shadow-inner relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-indigo-500 dark:bg-indigo-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(100, (msgIdx / messages.length) * 100)}%` }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
          />
          {/* Subtle Shimmer effect overlay */}
          <motion.div 
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent skew-x-[-20deg]"
            initial={{ left: '-100%' }}
            animate={{ left: '200%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear", repeatDelay: 0.2 }}
          />
        </div>
        
        <div className="font-mono text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 h-4 flex justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={msgIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="block truncate"
            >
              {messages[msgIdx] || "Ready"}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const PreviewPlaceholder = ({ url, projectTitle }: { url: string, projectTitle: string }) => {
  const [state, setState] = useState<'idle' | 'waking' | 'loading' | 'ready' | 'error'>('idle');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLoad = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    if (state === 'loading') {
      setState('ready');
    }
  };

  const handleError = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    setLoadError(`The connection to "${projectTitle}" was refused by the destination server.`);
    setState('error');
    console.error(`[Security Constraint] Iframe load failed for ${projectTitle} (${url}). Origin: ${window.location.origin}. This usually indicates the 'X-Frame-Options' header is set to 'SAMEORIGIN' or 'DENY' on the target host.`);
  };

  useEffect(() => {
    if (state === 'loading') {
      // Set a 10s timeout to detect hidden frame blocks
      loadingTimeoutRef.current = setTimeout(() => {
        handleError();
      }, 10000);
    }
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [state]);

  return (
    <div className="absolute inset-0">
      <div 
        className={`w-full h-full flex flex-col relative overflow-hidden transition-all duration-500 rounded-b-xl ${state === 'ready' || state === 'loading' || state === 'error' ? '' : 'p-4 sm:p-6'} ${isFocused ? 'ring-2 ring-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : ''}`}
      >
        {state === 'idle' && (
          <div className="w-full h-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-inner dark:shadow-black/20">
            <motion.button 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={() => setState('waking')}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500 transition-all text-slate-700 dark:text-slate-200 font-medium text-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
            >
              <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Wake Instance
            </motion.button>
          </div>
        )}
        
        {state === 'waking' && (
          <div className="w-full h-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-inner dark:shadow-black/20">
            <WakingState onReady={() => setState('loading')} />
          </div>
        )}

        {(state === 'loading' || state === 'ready' || state === 'error') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full flex flex-col relative">
            <div className="bg-slate-900 text-slate-300 px-4 py-2 flex items-center justify-between border-b border-slate-800 shrink-0 z-20">
              <div className="flex items-center gap-2 overflow-hidden">
                <Terminal className="w-4 h-4 shrink-0" />
                <span className="font-mono text-[10px] sm:text-xs truncate">{url}</span>
              </div>
              <div className="flex items-center gap-2">
                {state === 'loading' && (
                  <div className="flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono text-indigo-400">LOADING</span>
                  </div>
                )}
                <a href={url} target="_blank" rel="noreferrer" aria-label="Open preview in new tab" className="text-slate-400 hover:text-white transition-colors p-1 shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="flex-1 bg-white relative overflow-hidden">
              {state === 'error' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-slate-950">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-200 dark:border-red-800/50">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-slate-900 dark:text-slate-100 font-bold text-lg mb-2">Framing Restricted</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-sm mb-8 leading-relaxed">
                    {loadError}<br/><br/>
                    Security headers on this project prevent it from being embedded in third-party environments for your protection.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={url} target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Open Real Instance
                    </a>
                    <button 
                      onClick={() => setState('idle')}
                      className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                    >
                      Dismiss Error
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <iframe 
                    ref={iframeRef}
                    src={url} 
                    title={`${projectTitle} live preview`}
                    className={`w-full h-full border-none bg-white transition-opacity duration-500 ${state === 'loading' ? 'opacity-0' : 'opacity-100'}`}
                    loading="lazy"
                    onLoad={handleLoad}
                    onMouseEnter={() => setIsFocused(true)}
                    onMouseLeave={() => setIsFocused(false)}
                    referrerPolicy="no-referrer"
                    sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin allow-storage-access-by-user-activation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                  {state === 'loading' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-slate-900 z-10 p-6">
                      <div className="relative w-12 h-12 mb-6">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="absolute inset-0 border-[3px] border-slate-100 dark:border-slate-800 border-t-indigo-500 rounded-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-indigo-500/40 animate-pulse" />
                        </div>
                      </div>
                      <div className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-slate-400 uppercase">Verifying Peer Connection</div>
                      
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 5.0 }}
                        className="mt-6 text-[10px] text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700/50"
                      >
                        Wait time may vary based on instance cold-start...
                      </motion.div>
                    </div>
                  )}
                </>
              )}
            </div>

            <button 
              onClick={() => { setState('idle'); setLoadError(null); }}
              aria-label="Spin down preview"
              className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-white px-3 py-1.5 rounded bg-black/80 hover:bg-black backdrop-blur-md shadow-2xl transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none z-30 flex items-center gap-2"
            >
              <Target className="w-3 h-3" />
              Spin Down
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const RemediationFlow = ({ text }: { text: string }) => {
  const steps = text.split('➔').map(s => s.replace(/^\d+\.\s*/, '').trim());
  const getIcon = (idx: number, length: number) => {
    if (idx === 0) return <Bot className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />;
    if (idx === length - 1) return <UserCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />;
    if (idx === 1) return <Activity className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />;
    return <Search className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />;
  };

  return (
    <div className="flex flex-col relative pt-1 pb-1">
       {/* Connecting vertical line */}
       <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-slate-200 dark:bg-slate-700 z-0 rounded-full" />
       
       {steps.map((step, idx) => (
         <div key={idx} className="flex items-start gap-4 relative z-10 pb-5 last:pb-0 group">
           <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-[2px] border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover:border-indigo-300 dark:group-hover:border-indigo-500 group-hover:shadow-[0_0_0_4px_rgba(99,102,241,0.05)] dark:group-hover:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] shadow-sm transition-all">
              {getIcon(idx, steps.length)}
           </div>
           <div className="pt-[2px] flex-1">
             <div className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-snug group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
               {step}
             </div>
           </div>
         </div>
       ))}
    </div>
  );
};

const ProjectCard = ({ project, index }: { project: typeof PROJECTS[0], index: number }) => {
  const [view, setView] = useState<'preview' | 'architecture'>('preview');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = document.getElementById(`toggle-${PROJECTS[index + 1]?.id}`);
      if (next) next.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = document.getElementById(`toggle-${PROJECTS[index - 1]?.id}`);
      if (prev) prev.focus();
    }
  };
  
  return (
    <motion.div 
      id={project.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01, zIndex: 20, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + (index * 0.15) }}
      className="border border-slate-200 dark:border-slate-800 p-4 sm:p-5 md:p-6 bg-white dark:bg-slate-900 rounded-2xl flex flex-col relative shadow-sm dark:shadow-none transition-colors scroll-mt-[100px]"
    >
      {/* Header Container that is clickable */}
      <button 
        id={`toggle-${project.id}`}
        onKeyDown={handleKeyDown}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`project-details-${project.id}`}
        className="text-left w-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 rounded-xl outline-none transition-colors group cursor-pointer border hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent hover:border-slate-100 dark:hover:border-slate-700/50 -m-2 sm:-m-3 p-2 sm:p-3 mb-3"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight break-words">{project.title}</h2>
          <div className="relative group/chevron w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:border-indigo-100 dark:group-hover:border-indigo-800/50 transition-colors shrink-0">
             <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max p-1.5 px-2 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-medium leading-tight rounded border border-slate-700 dark:border-slate-200 shadow-lg opacity-0 invisible group-hover/chevron:opacity-100 group-hover/chevron:visible transition-all z-50 pointer-events-none text-center">
               {isExpanded ? 'Hide Details' : 'View Details'}
               <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 dark:border-t-slate-100"></div>
             </div>
          </div>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed pr-8">{project.description}</p>
      </button>

      {/* Preview Area */}
      <div className="flex-grow bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl relative overflow-hidden flex flex-col min-h-[360px] sm:min-h-[500px] lg:min-h-[600px] mt-2 mb-4">
        {/* Window Controls */}
        <div role="group" aria-label="Project view options" className="border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 px-3 py-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
           <button 
             onClick={() => setView('preview')}
             aria-pressed={view === 'preview'}
             className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 outline-none ${view === 'preview' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
           >
             Live Preview
           </button>
           <button 
             onClick={() => setView('architecture')}
             aria-pressed={view === 'architecture'}
             className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 outline-none ${view === 'architecture' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
           >
             System Design
           </button>
        </div>
        
        {/* Window Content */}
        <div className="flex-grow relative overflow-hidden">
          {view === 'preview' ? (
            <PreviewPlaceholder url={project.previewUrl} projectTitle={project.title} />
          ) : (
            <div className="absolute inset-0 p-3 sm:p-4 flex items-center justify-center">
               <div className="bg-slate-900 text-slate-300 p-4 sm:p-5 rounded-xl w-full h-full flex flex-col shadow-inner overflow-hidden min-w-0">
                  <div className="flex items-center gap-2 border-b border-slate-700 pb-3 mb-4 shrink-0">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    <h3 className="font-mono text-[10px] sm:text-xs font-semibold text-slate-200">architecture.txt</h3>
                  </div>
                  <pre className="font-mono text-[11px] sm:text-xs md:text-sm w-full text-left overflow-x-auto overflow-y-auto flex-1 leading-relaxed text-indigo-100/80 scrollbar-thin p-1 sm:p-2">
                    {project.architecture}
                  </pre>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Tech Stack (Expandable) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div 
            id={`project-details-${project.id}`}
            initial={{ height: 0, opacity: 0, overflow: "hidden" }}
            animate={{ height: "auto", opacity: 1, transitionEnd: { overflow: "visible" } }}
            exit={{ height: 0, opacity: 0, overflow: "hidden" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="mt-2 mb-6 space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 relative z-10 rounded-xl">
              <motion.div 
                className="absolute inset-0 -z-10 -mx-4 sm:-mx-5 md:-mx-6 -my-4 sm:-my-5 bg-indigo-50/50 dark:bg-indigo-900/10 pointer-events-none rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              />
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 mb-2">Core Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <div key={t.name} className="group relative flex">
                      <button tabIndex={0} aria-label={`${t.name}: ${t.description}`} className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 rounded-md font-medium border border-slate-200/60 dark:border-slate-700/50 cursor-help transition-colors hover:bg-slate-200 dark:hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 outline-none">
                        {t.name}
                      </button>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[150px] sm:max-w-xs whitespace-normal break-words p-2 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] leading-relaxed rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all z-50 text-center">
                        {t.description}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 dark:border-t-slate-100"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 mb-2">AI & Tooling Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.aiStack.map(t => (
                    <div key={t.name} className="group relative flex">
                      <button tabIndex={0} aria-label={`${t.name}: ${t.description}`} className="text-xs px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md font-medium border border-indigo-100 dark:border-indigo-800/50 cursor-help transition-colors hover:bg-indigo-100 dark:hover:bg-indigo-900/50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 outline-none">
                        {t.name}
                      </button>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[150px] sm:max-w-xs whitespace-normal break-words p-2 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] leading-relaxed rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all z-50 text-center">
                        {t.description}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 dark:border-t-slate-100"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 mb-4">Audit & Remediation Loop</div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-100/80 dark:border-slate-800 shadow-sm inset-ring-1 inset-ring-slate-900/5 dark:inset-ring-white/5">
                  <RemediationFlow text={project.remediation} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Links */}
      <div className="flex flex-wrap gap-4 mt-auto">
        <a href={project.githubUrl} aria-label={`View ${project.title} source code on GitHub`} className="group text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 rounded outline-none w-fit">
          <div className="relative group/icon flex items-center justify-center">
            <Github className="w-4 h-4 text-slate-400 transition-all duration-300 group-hover:scale-125 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max p-1.5 px-2 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-medium leading-tight rounded border border-slate-700 dark:border-slate-200 shadow-lg opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all z-50 pointer-events-none text-center">
              View Source Code
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 dark:border-t-slate-100"></div>
            </div>
          </div>
          Source
        </a>
        <a href={project.liveUrl} aria-label={`View ${project.title} live application`} className="group text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 rounded outline-none w-fit">
          <div className="relative group/icon flex items-center justify-center">
            <ExternalLink className="w-4 h-4 text-slate-400 transition-all duration-300 group-hover:scale-125 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max p-1.5 px-2 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-medium leading-tight rounded border border-slate-700 dark:border-slate-200 shadow-lg opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all z-50 pointer-events-none text-center">
              Open Live App
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 dark:border-t-slate-100"></div>
            </div>
          </div>
          Live App
        </a>
      </div>
    </motion.div>
  )
}

const CommandPalette = ({ 
  isOpen, 
  onClose, 
  projects, 
  theme, 
  toggleTheme, 
  email 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  projects: typeof PROJECTS, 
  theme: 'light' | 'dark', 
  toggleTheme: () => void, 
  email: string 
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = [
    ...projects.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      type: 'project' as const,
      action: () => {
        const node = document.getElementById(p.id);
        if (node) {
          node.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const btn = document.getElementById(`toggle-${p.id}`);
          if (btn) btn.focus({ preventScroll: true });
        }
        onClose();
      }
    })),
    {
      id: 'toggle-theme',
      title: 'Toggle theme',
      description: `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`,
      type: 'action' as const,
      icon: theme === 'light' ? Moon : Sun,
      action: () => {
        toggleTheme();
        onClose();
      }
    },
    {
      id: 'email-joel',
      title: 'Email Joel',
      description: email,
      type: 'action' as const,
      icon: Mail,
      action: () => {
        window.location.href = `mailto:${email}`;
        onClose();
      }
    }
  ].filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      filteredItems[selectedIndex]?.action();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <Command className="w-5 h-5 text-slate-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Jump to project, toggle theme, or link out..."
                className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm py-1"
              />
              <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[10px] font-mono font-medium text-slate-500">
                esc
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                      idx === selectedIndex 
                        ? 'bg-slate-100 dark:bg-slate-800' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm border ${
                        idx === selectedIndex 
                          ? 'bg-white dark:bg-slate-700 border-indigo-200 dark:border-indigo-900/50' 
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                      }`}>
                        {item.type === 'project' ? (
                          <ArrowRight className={`w-4 h-4 ${idx === selectedIndex ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                        ) : (
                          <item.icon className={`w-4 h-4 ${idx === selectedIndex ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <div className={`font-bold text-sm ${idx === selectedIndex ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-slate-100'}`}>
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    {idx === selectedIndex && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-4" />
                    )}
                  </button>
                ))
              ) : (
                <div className="p-10 text-center text-slate-500 dark:text-slate-400">
                  No items found for "{query}"
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-6 text-[11px] text-slate-500 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="px-1 py-0.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-400">↑↓</span>
                navigate
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1 py-0.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-400">↵</span>
                select
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1 py-0.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-400">esc</span>
                close
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Sidebar = ({ 
  theme, 
  toggleTheme, 
  isMobileOpen, 
  setIsMobileOpen,
  onPaletteToggle 
}: { 
  theme: 'light' | 'dark', 
  toggleTheme: () => void, 
  isMobileOpen: boolean, 
  setIsMobileOpen: (v: boolean) => void,
  onPaletteToggle: () => void
}) => (
  <>
    {/* Mobile Overlay */}
    <AnimatePresence>
      {isMobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden" 
        />
      )}
    </AnimatePresence>

    <motion.aside 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed md:sticky top-0 left-0 w-[85%] max-w-[380px] md:w-auto h-screen flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 overflow-hidden transition-transform duration-300 md:translate-x-0 ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}
    >
      <button 
        onClick={() => setIsMobileOpen(false)}
        className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 outline-none z-50"
      >
        <X className="w-5 h-5" />
      </button>
      
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8 lg:p-10 scrollbar-thin">
      <div className="mb-8 md:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2">
          {PORTFOLIO.name}
        </h1>
        <p className="text-base sm:text-lg text-indigo-600 dark:text-indigo-400 font-medium mb-4 sm:mb-6">
          {PORTFOLIO.title}
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
          {PORTFOLIO.manifesto}
        </p>
      </div>
      
      <div className="space-y-4">
        {PORTFOLIO.traits.map((trait, i) => {
          const Icon = trait.icon;
          return (
            <div key={i} className="group bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-2">
                <button tabIndex={0} aria-label={trait.title} className="relative group/traiticon p-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm group-hover:border-indigo-300 dark:group-hover:border-indigo-500/50 transition-colors cursor-help focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-800 focus-visible:ring-indigo-500 outline-none">
                  <Icon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max p-1.5 px-2 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-medium leading-tight rounded border border-slate-700 dark:border-slate-200 shadow-lg opacity-0 invisible group-hover/traiticon:opacity-100 group-hover/traiticon:visible group-focus-within:opacity-100 group-focus-within:visible transition-all z-50 pointer-events-none text-center">
                    {trait.title}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 dark:border-t-slate-100"></div>
                  </div>
                </button>
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 tracking-wide uppercase">{trait.title}</div>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-[34px]">{trait.description}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 mb-3 uppercase tracking-wider">Jump to Project</div>
        <div className="flex flex-col gap-2 relative z-20">
          {PROJECTS.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              onClick={(e) => {
                e.preventDefault();
                const node = document.getElementById(p.id);
                if (node) {
                  const performScroll = () => {
                    node.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    const btn = document.getElementById(`toggle-${p.id}`);
                    if (btn) btn.focus({ preventScroll: true });
                  };
                  
                  if (isMobileOpen) {
                    setIsMobileOpen(false);
                    // Wait for mobile menu transition to finish before scrolling
                    setTimeout(performScroll, 300);
                  } else {
                    performScroll();
                  }
                }
              }}
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 rounded outline-none w-fit group flex items-center"
            >
              <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:translate-x-1 transition-all duration-300 mr-1.5 text-indigo-500" />
              {p.title}
            </a>
          ))}
        </div>
      </div>
      </div>

      <div className="shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-6 md:px-10 py-4 flex flex-col justify-center transition-all duration-500 h-auto md:h-[136px] xl:h-[84px]">
        <div className="flex justify-between items-center mb-2 md:mb-4 xl:mb-2">
          <a href={`mailto:${PORTFOLIO.email}`} className="group flex items-center text-sm font-medium text-slate-900 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 rounded outline-none w-fit">
            {PORTFOLIO.email}
          </a>
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="p-2 -mr-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 outline-none transition-all"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <a href={PORTFOLIO.github} className="group flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 rounded outline-none">
            GitHub
          </a>
          <a href={PORTFOLIO.linkedin} className="group flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 rounded outline-none">
            LinkedIn
          </a>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={onPaletteToggle}
              aria-label="Open Command Palette"
              className="flex items-center gap-0.5 px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-white dark:hover:bg-slate-700/50 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
            >
              <Command className="w-2.5 h-2.5" />
              K
            </button>
          </div>
        </div>
      </div>
    </motion.aside>
  </>
)

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme from local storage or system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const localTheme = localStorage.getItem('theme');
    const computedTheme = localTheme === 'dark' || (!localTheme && isDark) ? 'dark' : 'light';
    setTheme(computedTheme);
    if (computedTheme === 'dark') document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (next === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', next);
      return next;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col md:flex-row selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900/50 dark:selection:text-indigo-100 transition-colors duration-500 relative`}>
      <CircuitBackground />

      {/* Mobile Top Header (Hidden on Desktop) */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-5 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{PORTFOLIO.name}</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -mr-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="md:w-[380px] shrink-0 z-40 relative md:bg-white md:dark:bg-slate-900 transition-colors duration-500">
        <Sidebar 
          theme={theme} 
          toggleTheme={toggleTheme} 
          isMobileOpen={isMobileMenuOpen} 
          setIsMobileOpen={setIsMobileMenuOpen} 
          onPaletteToggle={() => setIsCommandPaletteOpen(true)}
        />
      </div>
      <div className="flex-1 flex flex-col min-w-0 z-10 relative">
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10"
        >
          <div className="max-w-4xl mx-auto flex flex-col gap-10 md:gap-14 items-stretch pb-10">
            <div className="mb-2 md:mb-6">
              <div className="font-mono text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mb-4 md:mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></span>
                $ ls ~/work --selected
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.15] md:leading-[1.15]">
                Production software, architected with<br className="hidden md:block"/> AI as the <span className="font-mono text-cyan-600 dark:text-cyan-400 font-medium tracking-normal">execution_layer</span>.
              </h1>
            </div>

            {PROJECTS.map((project, idx) => (
              <ErrorBoundary key={project.id}>
                <ProjectCard project={project} index={idx} />
              </ErrorBoundary>
            ))}
          </div>
        </motion.main>
        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="sticky bottom-0 z-40 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-6 md:px-10 py-4 flex flex-col xl:flex-row justify-center xl:justify-between items-center gap-4 text-sm text-slate-600 dark:text-slate-400 transition-colors duration-500 h-auto md:h-[136px] xl:h-[84px]"
        >
          <div className="flex flex-col xl:flex-row items-center xl:items-baseline gap-2 xl:gap-8">
            <div className="text-center xl:text-left">&copy; {currentTime.getFullYear()} {PORTFOLIO.name}</div>
            <span className="font-mono text-[10px] sm:text-xs tabular-nums text-slate-400 dark:text-slate-500 text-center">
               Current as of {currentTime.toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
          <a href={PORTFOLIO.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="flex items-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 rounded outline-none p-1 -m-1">
            <span className="inline-block w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></span>
            Available for Technical Partnerships
          </a>
          <div className="flex items-center">
             <AnimatePresence>
               {showScrollTop && (
                 <motion.button 
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.8 }}
                   onClick={scrollToTop}
                   className="flex items-center justify-center w-8 h-8 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 text-slate-600 dark:text-slate-400"
                   aria-label="Scroll to top"
                 >
                   <ArrowUp className="w-4 h-4" />
                 </motion.button>
               )}
             </AnimatePresence>
          </div>
        </motion.footer>
      </div>
      <Chatbot />
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        projects={PROJECTS}
        theme={theme}
        toggleTheme={toggleTheme}
        email={PORTFOLIO.email}
      />
    </div>
  );
}
