'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Code2,
  Play,
  Radio,
  Layers,
  Users,
  PanelRight,
  ShieldAlert,
  ShieldCheck,
  Zap,
  ArrowRight,
  Terminal,
  Cpu,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ExternalLink,
  Flame,
  Activity,
  Sparkles,
  GitCommit,
  Wifi,
} from 'lucide-react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type PreviewTab = 'spec' | 'monaco' | 'sandpack' | 'api';

export default function PremiumLandingPage() {
  const router = useRouter();
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Interactive specimen state
  const [activeTab, setActiveTab] = useState<PreviewTab>('monaco');
  const [customRoomInput, setCustomRoomInput] = useState<string>('');
  const [testState, setTestState] = useState<'passing' | 'failing'>('passing');
  const [sandboxLocked, setSandboxLocked] = useState<boolean>(false);
  const [sandboxCharges, setSandboxCharges] = useState<number>(1);
  const [sandboxLoading, setSandboxLoading] = useState<boolean>(false);
  const [copiedPatch, setCopiedPatch] = useState<boolean>(false);

  // Initialize Lenis smooth scroll and GSAP entrances
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const reqId = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6 })
        .from('.hero-title', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.hero-cta-group', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-specimen', { y: 40, opacity: 0, scale: 0.98, duration: 0.9 }, '-=0.4');

      gsap.utils.toArray<HTMLElement>('.feature-bento-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      });
    }, mainContainerRef);

    return () => {
      cancelAnimationFrame(reqId);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const handleCustomRoomJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (customRoomInput.trim()) {
      router.push(`/room/${encodeURIComponent(customRoomInput.trim())}`);
    }
  };

  const handleSandboxClick = () => {
    if (sandboxLocked && sandboxLoading) return;
    setSandboxLoading(true);
    setTimeout(() => {
      setSandboxCharges((prev) => prev + 1);
      setSandboxLoading(false);
    }, 400);
  };

  const copyPatchCode = () => {
    const code = `// Mutex Guard + UUID Idempotency Header
const [isSubmitting, setIsSubmitting] = useState(false);

const handleCheckout = async () => {
  if (isSubmitting) return; // Mutex Lock
  setIsSubmitting(true);
  try {
    const key = crypto.randomUUID();
    await fetch('/api/v1/checkout/process', {
      method: 'POST',
      headers: { 'x-idempotency-key': key }
    });
  } finally {
    setIsSubmitting(false);
  }
};`;
    navigator.clipboard.writeText(code);
    setCopiedPatch(true);
    setTimeout(() => setCopiedPatch(false), 2000);
  };

  return (
    <div
      ref={mainContainerRef}
      className="min-h-screen bg-[#07080B] text-slate-100 font-sans relative overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300"
    >
      {/* 1. ATMOSPHERIC LIGHTING & GRADIENTS */}
      {/* Dynamic top-center emerald/cyan ambient radiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-emerald-500/[0.12] via-cyan-500/[0.04] to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute top-80 right-0 w-[500px] h-[500px] bg-emerald-600/[0.05] blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[1600px] left-0 w-[600px] h-[600px] bg-indigo-600/[0.04] blur-[140px] pointer-events-none z-0" />

      {/* Cyber Grid Texture Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none z-0" />

      {/* 2. PREMIUM HEADER / NAVBAR */}
      <nav className="sticky top-0 z-50 h-16 border-b border-white/[0.07] bg-[#07080B]/80 backdrop-blur-xl px-6 md:px-12 flex items-center justify-between">
        {/* Brand Left */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400/60 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Activity className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-sm tracking-wider font-mono text-white">
              DEVHUDDLE
            </span>
            <span className="text-[11px] font-mono text-emerald-400/90 hidden sm:inline">
              // KINETIC ARENA
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-mono text-slate-400 tracking-wide">
          <a href="#cockpit" className="hover:text-emerald-400 transition-colors">
            01. COCKPIT
          </a>
          <a href="#architecture" className="hover:text-emerald-400 transition-colors">
            02. ARCHITECTURE
          </a>
          <a href="#comparison" className="hover:text-emerald-400 transition-colors">
            03. DSA VS INCIDENTS
          </a>
          <a href="#sessions" className="hover:text-emerald-400 transition-colors">
            04. SESSIONS
          </a>
        </div>

        {/* Right Status + Action CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>P1 ROOM ACTIVE</span>
          </div>

          <Link
            href="/room/INC-8420"
            className="group px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-bold text-xs hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2 active:scale-95"
          >
            <span>Enter Cockpit</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-16 pb-24 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-8 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-mono font-medium text-slate-300">
              NEXT-GEN TECHNICAL EVALUATION // NO MORE TOY DSA
            </span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] uppercase">
            Debug Real Incidents.{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Together in Real Time.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="hero-subtitle mt-6 text-base sm:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
            DevHuddle replaces artificial single-file algorithm puzzles with a realistic,
            persistent cockpit: collaborative Monaco IDE with Yjs CRDTs, live React runtimes via
            Sandpack, and in-browser HTTP API inspectors.
          </p>

          {/* Hero CTA Group */}
          <div className="hero-cta-group mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/room/INC-8420"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-slate-950 font-extrabold text-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-3 active:scale-95 group"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Launch Live Incident Room [INC-8420]</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#cockpit"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] text-slate-300 font-mono text-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Explore 4-Panel Cockpit</span>
              <Layers className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Key Metric Highlights */}
          <div className="hero-cta-group mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl border-y border-white/[0.07] py-6 text-center font-mono">
            <div>
              <div className="text-xl font-bold text-white">&lt; 20ms</div>
              <div className="text-[11px] text-slate-400 mt-1">Yjs CRDT Latency</div>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-400">4-in-1</div>
              <div className="text-[11px] text-slate-400 mt-1">Persistent Cockpit</div>
            </div>
            <div>
              <div className="text-xl font-bold text-cyan-400">React 18</div>
              <div className="text-[11px] text-slate-400 mt-1">In-Browser Sandpack</div>
            </div>
            <div>
              <div className="text-xl font-bold text-amber-400">Ctrl + \</div>
              <div className="text-[11px] text-slate-400 mt-1">War Room Sidecar</div>
            </div>
          </div>
        </div>

        {/* 4. INTERACTIVE COCKPIT SPECIMEN (HERO SHOWCASE) */}
        <section id="cockpit" className="hero-specimen mt-16 scroll-mt-24">
          <div className="rounded-2xl bg-[#0D0F15] border border-white/[0.1] shadow-[0_20px_70px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Specimen Window Header */}
            <div className="h-12 bg-[#12141C] border-b border-white/[0.08] px-4 flex items-center justify-between">
              {/* Left Mac-like dots + incident badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-white/[0.1] mx-1" />
                <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-2">
                  <span className="text-emerald-400">ROOM:</span> INC-8420 // Mutex Race Condition
                </span>
              </div>

              {/* Center Specimen Tabs */}
              <div className="hidden sm:flex items-center bg-black/40 border border-white/[0.08] p-1 rounded-lg gap-1 font-mono text-xs">
                <button
                  onClick={() => setActiveTab('spec')}
                  className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
                    activeTab === 'spec'
                      ? 'bg-white/[0.1] text-white shadow-xs font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3 h-3 text-cyan-400" />
                  <span>01. Spec</span>
                </button>

                <button
                  onClick={() => setActiveTab('monaco')}
                  className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
                    activeTab === 'monaco'
                      ? 'bg-white/[0.1] text-white shadow-xs font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3 h-3 text-emerald-400" />
                  <span>02. Monaco</span>
                </button>

                <button
                  onClick={() => setActiveTab('sandpack')}
                  className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
                    activeTab === 'sandpack'
                      ? 'bg-white/[0.1] text-white shadow-xs font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Play className="w-3 h-3 text-amber-400" />
                  <span>03. Sandpack</span>
                </button>

                <button
                  onClick={() => setActiveTab('api')}
                  className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
                    activeTab === 'api'
                      ? 'bg-white/[0.1] text-white shadow-xs font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Radio className="w-3 h-3 text-purple-400" />
                  <span>04. API Console</span>
                </button>
              </div>

              {/* Right Peer presence */}
              <div className="flex items-center gap-2">
                <div className="flex items-center -space-x-1.5">
                  <div
                    className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-bold text-slate-950 border border-black"
                    title="Vikram Dev (Driver)"
                  >
                    VD
                  </div>
                  <div
                    className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-[9px] font-bold text-slate-950 border border-black"
                    title="Alex Kumar (Navigator)"
                  >
                    AK
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 hidden md:inline">
                  2 PEERS ACTIVE
                </span>
              </div>
            </div>

            {/* Specimen Interactive Body */}
            <div className="min-h-[460px] bg-[#0A0C10] p-6 flex flex-col justify-between">
              {/* TAB 1: INCIDENT SPEC */}
              {activeTab === 'spec' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-rose-500/[0.05] border border-rose-500/20">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                            P1 CRITICAL
                          </span>
                          <span className="text-xs font-mono text-slate-400">TICKET #ENG-402</span>
                        </div>
                        <h3 className="text-base font-bold text-white mt-1">
                          Fix Race Condition in Checkout Hook
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                          Rapid double tap on checkout submit triggers 2 parallel Stripe settlements
                          under high network latency (&gt;350ms).
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={copyPatchCode}
                      className="px-3.5 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-slate-200 flex items-center gap-2 self-start md:self-center transition-all"
                    >
                      {copiedPatch ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Patch Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Recommended Patch</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Assertion Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3.5 rounded-lg bg-[#11141D] border border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-300">unit_checkout_payload_validation</span>
                      </div>
                      <span className="text-emerald-400 font-bold">PASSED (42ms)</span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#11141D] border border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-300">integration_idempotency_key_header</span>
                      </div>
                      <span className="text-emerald-400 font-bold">PASSED (89ms)</span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#11141D] border border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-300">e2e_single_click_payment_settlement</span>
                      </div>
                      <span className="text-emerald-400 font-bold">PASSED (112ms)</span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-rose-500/[0.08] border border-rose-500/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span className="text-rose-200">e2e_rapid_double_tap_race_condition</span>
                      </div>
                      <span className="text-rose-400 font-bold">FAILED (ConcurrencyError)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MONACO CODE EDITOR */}
              {activeTab === 'monaco' && (
                <div className="space-y-4">
                  {/* Monaco Subbar */}
                  <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400 font-bold">useIdempotentCheckout.ts</span>
                      <span className="text-slate-500">TypeScript · UTF-8</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">CRDT: Synced</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                        Yjs Connected
                      </span>
                    </div>
                  </div>

                  {/* Monaco Code Specimen */}
                  <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.08] font-mono text-xs leading-relaxed overflow-x-auto text-slate-300 relative">
                    {/* Simulated Peer Cursor */}
                    <div className="absolute top-16 left-[280px] flex items-center gap-1 pointer-events-none">
                      <div className="w-0.5 h-4 bg-cyan-400 animate-pulse" />
                      <span className="px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 text-[9px] font-bold">
                        @alex (Navigator)
                      </span>
                    </div>

                    <p className="text-slate-500">// 1. Concurrency Guard (Mutex Lock)</p>
                    <p>
                      <span className="text-rose-400">if</span> (isSubmitting) &#123;
                    </p>
                    <p className="pl-4 text-slate-400">
                      console.warn(
                      <span className="text-amber-300">
                        &apos;[DEVHUDDLE] Payment in-flight. Blocking duplicate tap.&apos;
                      </span>
                      );
                    </p>
                    <p className="pl-4">
                      <span className="text-rose-400">return</span>;
                    </p>
                    <p>&#125;</p>
                    <br />
                    <p className="text-slate-500">
                      // 2. Generate UUID Idempotency Lock Header for Payment Gateway
                    </p>
                    <p>
                      <span className="text-cyan-400">const</span> idempotencyKey ={' '}
                      <span className="text-amber-300">
                        `idemp_&#36;&#123;cartId&#125;_&#36;&#123;Date.now()&#125;`
                      </span>
                      ;
                    </p>
                    <p>
                      <span className="text-cyan-400">await</span> fetch(
                      <span className="text-amber-300">&apos;/api/v1/checkout/process&apos;</span>,
                      &#123;
                    </p>
                    <p className="pl-4 text-slate-300">method: &apos;POST&apos;,</p>
                    <p className="pl-4 text-slate-300">
                      headers: &#123;{' '}
                      <span className="text-emerald-300">&apos;x-idempotency-key&apos;</span>:{' '}
                      idempotencyKey &#125;,
                    </p>
                    <p className="pl-4 text-slate-300">
                      body: JSON.stringify(&#123; cartId, amount &#125;)
                    </p>
                    <p>&#125;);</p>
                  </div>
                </div>
              )}

              {/* TAB 3: SANDPACK LIVE RUNTIME */}
              {activeTab === 'sandpack' && (
                <div className="flex flex-col items-center justify-center p-6 bg-[#08090C] rounded-xl border border-white/[0.08]">
                  <div className="w-full max-w-sm p-5 rounded-xl bg-[#111319] border border-white/[0.08] shadow-xl flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Interactive Sandpack Runtime
                      </span>
                      <span className="text-slate-400">React 18</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/[0.06]">
                      <span className="text-xs text-slate-300 font-medium">Enterprise License</span>
                      <span className="text-base font-bold text-emerald-400 font-mono">$149.00</span>
                    </div>

                    {/* Toggle Bug vs Fix */}
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono">
                      <span className="text-slate-400">Mutex Guard:</span>
                      <button
                        onClick={() => setSandboxLocked(!sandboxLocked)}
                        className={`px-3 py-1 rounded-md font-bold transition-all ${
                          sandboxLocked
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {sandboxLocked ? 'PATCHED (Locked)' : 'BUGGY (Double Tap)'}
                      </button>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={handleSandboxClick}
                      disabled={sandboxLocked && sandboxLoading}
                      className={`w-full py-3 rounded-lg font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                        sandboxLocked && sandboxLoading
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 active:scale-95 shadow-md shadow-emerald-500/20'
                      }`}
                    >
                      {sandboxLoading ? 'Executing Mutex Lock...' : 'Pay $149.00 Now'}
                    </button>

                    {/* Telemetry Output */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/[0.06] pt-3">
                      <span>Total Charges Triggered:</span>
                      <span
                        className={`font-bold ${
                          sandboxCharges > 1 && !sandboxLocked
                            ? 'text-rose-400 animate-pulse'
                            : 'text-emerald-400'
                        }`}
                      >
                        {sandboxCharges}{' '}
                        {sandboxCharges > 1 && !sandboxLocked ? '⚠️ DUPLICATE CHARGE' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: API CONSOLE */}
              {activeTab === 'api' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#111319] border border-white/[0.08] font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      POST
                    </span>
                    <span className="text-slate-300 flex-1">/api/mock/checkout?latency=350</span>
                    <span className="text-slate-500">Status: 200 OK</span>
                    <span className="text-emerald-400 font-bold">42ms</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.08] font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
                    <p className="text-slate-500">// Simulated Idempotent API Response</p>
                    <p>&#123;</p>
                    <p className="pl-4">
                      <span className="text-cyan-400">&quot;status&quot;</span>:{' '}
                      <span className="text-emerald-300">&quot;SUCCESS&quot;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-400">&quot;statusCode&quot;</span>: 200,
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-400">&quot;transactionId&quot;</span>:{' '}
                      <span className="text-amber-300">&quot;tx_devhuddle_94021&quot;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-400">&quot;auditLog&quot;</span>: &#123;
                    </p>
                    <p className="pl-8">
                      <span className="text-cyan-400">&quot;idempotencyLockAcquired&quot;</span>:{' '}
                      <span className="text-emerald-400">true</span>,
                    </p>
                    <p className="pl-8">
                      <span className="text-cyan-400">&quot;duplicateTapPrevented&quot;</span>:{' '}
                      <span className="text-emerald-400">true</span>
                    </p>
                    <p className="pl-4">&#125;</p>
                    <p>&#125;</p>
                  </div>
                </div>
              )}

              {/* Specimen Footer CTA */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                <span className="text-slate-400">
                  Ready to test this full cockpit live in your browser?
                </span>
                <Link
                  href="/room/INC-8420"
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
                >
                  <span>Launch /room/INC-8420</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ARCHITECTURAL BENTO GRID (4 CORE MODULES) */}
        <section id="architecture" className="mt-32 scroll-mt-24">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase">
              [ 02 // COCKPIT ANATOMY ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
              Four Panels. One Persistent Cockpit.
            </h2>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              Engineered so components never unmount, WebSocket states never drop, and peer presence
              persists uninterrupted while diagnosing production fires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* MODULE 1: INCIDENT SPEC (Col 7) */}
            <div className="feature-bento-card md:col-span-7 p-8 rounded-2xl bg-[#0D0F15] border border-white/[0.08] hover:border-emerald-500/30 transition-all shadow-xl flex flex-col justify-between gap-6 group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                  <span className="text-emerald-400 font-bold">[MODULE 01]</span>
                  <span>ROOT CAUSE RUNNER</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  RFC Spec &amp; Bug Assertion Engine
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Clear reproduction steps, impacted user metrics, stack traces, and automated
                  integration assertions verifying concurrency locks and idempotency keys.
                </p>
              </div>

              {/* Mini Assertion Log Card */}
              <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.06] font-mono text-xs flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-slate-400">
                  <span>test_runner_telemetry.log</span>
                  <button
                    onClick={() =>
                      setTestState(testState === 'passing' ? 'failing' : 'passing')
                    }
                    className="text-emerald-400 hover:underline cursor-pointer font-bold"
                  >
                    [ Toggle State ]
                  </button>
                </div>
                {testState === 'passing' ? (
                  <div className="text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>✔ test_mutex_lock_double_tap (124ms) PASSED</span>
                  </div>
                ) : (
                  <div className="text-rose-400 flex items-center gap-2">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>✖ ConcurrencyError: Double billing triggered!</span>
                  </div>
                )}
              </div>
            </div>

            {/* MODULE 2: YJS CRDT MONACO (Col 5) */}
            <div className="feature-bento-card md:col-span-5 p-8 rounded-2xl bg-[#0D0F15] border border-white/[0.08] hover:border-cyan-500/30 transition-all shadow-xl flex flex-col justify-between gap-6 group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                  <span className="text-cyan-400 font-bold">[MODULE 02]</span>
                  <span>DISTRIBUTED CRDT</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  Collaborative Monaco IDE
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Real-time multi-cursor awareness, remote peer selections, and conflict-free editing
                  synced via Yjs CRDT documents over WebSockets.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.06] font-mono text-xs flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>@vikram: editing useIdempotentCheckout.ts</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>@alex: reviewing idempotency header key</span>
                </div>
              </div>
            </div>

            {/* MODULE 3: SANDPACK RUNTIME (Col 5) */}
            <div className="feature-bento-card md:col-span-5 p-8 rounded-2xl bg-[#0D0F15] border border-white/[0.08] hover:border-amber-500/30 transition-all shadow-xl flex flex-col justify-between gap-6 group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                  <span className="text-amber-400 font-bold">[MODULE 03]</span>
                  <span>ISOLATED RUNTIME</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  In-Browser Sandpack Runtime
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Live React 18 / Tailwind sandbox running inside an isolated iframe. Reproduce UI
                  glitches and race conditions interactively on the fly.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#08090C] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Sandpack Iframe Engine</span>
                <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  60 FPS VIRTUAL DOM
                </span>
              </div>
            </div>

            {/* MODULE 4: HTTP API INSPECTOR (Col 7) */}
            <div className="feature-bento-card md:col-span-7 p-8 rounded-2xl bg-[#0D0F15] border border-white/[0.08] hover:border-purple-500/30 transition-all shadow-xl flex flex-col justify-between gap-6 group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                  <span className="text-purple-400 font-bold">[MODULE 04]</span>
                  <span>POSTMAN-LITE CONSOLE</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  Live HTTP API Inspector
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Tamper with request headers, assert x-idempotency-key signatures, adjust network
                  latency from 50ms to 2000ms, and verify backend idempotency safeguards.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.06] font-mono text-xs flex items-center justify-between">
                <span className="text-purple-400 font-bold">POST /api/mock/checkout</span>
                <span className="text-slate-400">Latency: 350ms</span>
                <span className="text-emerald-400 font-bold">200 OK (Audited)</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. COMPARISON: REAL INCIDENTS VS TOY DSA */}
        <section id="comparison" className="mt-32 scroll-mt-24">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase">
              [ 03 // PARADIGM SHIFT ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
              Why Real Incidents Beat LeetCode
            </h2>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              Evaluating engineers on invert-binary-tree memorization is broken. Real engineering is
              about debugging concurrency, distributed state, and system contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way: DSA Puzzles */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase mb-4">
                  <XCircle className="w-4 h-4 text-slate-500" />
                  <span>The Old Way: Single-File DSA Assessment</span>
                </div>
                <h3 className="text-xl font-bold text-slate-400">
                  Artificial Puzzles in Synthetic Isolations
                </h3>
                <ul className="mt-6 space-y-3.5 text-xs text-slate-400 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>Focuses on rote algorithm memorization rather than diagnostic instinct</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>Zero multiplayer collaboration or pair-programming telemetry</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>No UI runtimes, network layers, or HTTP header assertions</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>Fails to measure how engineers respond under production latency spikes</span>
                  </li>
                </ul>
              </div>
              <div className="text-[11px] font-mono text-slate-500 border-t border-white/[0.06] pt-4">
                RESULT: High false negatives, ignores real system skills.
              </div>
            </div>

            {/* The DevHuddle Way */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-cyan-500/[0.04] border border-emerald-500/30 flex flex-col justify-between gap-6 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase mb-4">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>The DevHuddle Way: Kinetic Arena</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Real Production Incident Cockpits
                </h3>
                <ul className="mt-6 space-y-3.5 text-xs text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>Tests real-world race conditions, mutex locks, and idempotency guarantees</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>Real-time multi-cursor Monaco pair debugging synced via Yjs CRDTs</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>Interactive live React app runtime via Sandpack and Postman-lite console</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>Integrated slide-over War Room drawer (Ctrl + \) for traces and chats</span>
                  </li>
                </ul>
              </div>
              <div className="text-[11px] font-mono text-emerald-400 border-t border-emerald-500/20 pt-4">
                RESULT: Identifies true staff-level engineering and problem-solving talent.
              </div>
            </div>
          </div>
        </section>

        {/* 7. QUICK SESSION LAUNCHER SECTION */}
        <section id="sessions" className="mt-32 scroll-mt-24">
          <div className="rounded-3xl bg-gradient-to-br from-[#12141D] via-[#0E1017] to-[#0A0C11] border border-white/[0.1] p-8 md:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/[0.08] blur-3xl pointer-events-none" />

            <div className="max-w-3xl relative z-10">
              <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase">
                [ 04 // ACTIVE ROOM SESSIONS ]
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                Ready to Enter the Arena?
              </h2>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Launch the primary P1 incident simulation directly, or type a custom room session ID to
                collaborate with your team in real time.
              </p>

              {/* Sample Incident Badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/room/INC-8420"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono text-emerald-300 font-bold flex items-center gap-2 transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>INC-8420 (Checkout Mutex Race Condition)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/room/INC-4091"
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 flex items-center gap-2 transition-all"
                >
                  <span>INC-4091 (WebSocket Buffer Drift)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>

                <Link
                  href="/room/INC-2048"
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 flex items-center gap-2 transition-all"
                >
                  <span>INC-2048 (JWT Token Rotation Lock)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </div>

              {/* Custom Room Input Form */}
              <form onSubmit={handleCustomRoomJoin} className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg">
                <input
                  type="text"
                  value={customRoomInput}
                  onChange={(e) => setCustomRoomInput(e.target.value)}
                  placeholder="Enter custom room ID (e.g. ENG-502)..."
                  className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/[0.12] text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-md shadow-emerald-500/20 active:scale-95"
                >
                  Join Room
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* 8. FOOTER */}
        <footer className="mt-32 pt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono text-[10px] font-bold">
              DH
            </div>
            <span className="font-mono">
              DevHuddle (Kinetic Arena) — MIT License
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <Link href="/playground" className="hover:text-emerald-400 transition-colors">
              Kinetic Studio Playground
            </Link>
            <Link href="/room/INC-8420" className="hover:text-emerald-400 transition-colors">
              Live Room INC-8420
            </Link>
            <a
              href="https://github.com/miidaystudio/Dev-Huddles"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
