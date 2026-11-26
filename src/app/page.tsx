'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Target,
  Zap,
  Users,
  ChevronRight,
  Shield,
  Flame,
  Camera,
  Brain,
  CheckCircle2,
  XCircle,
  Skull,
  Lock,
  ArrowRight,
  Scale,
} from 'lucide-react';

type VerdictKey = 'blessed' | 'rejected' | 'shadow';

interface VerdictScenario {
  key: VerdictKey;
  tabLabel: string;
  kaamTitle: string;
  stakes: string;
  proofLabel: string;
  verdictTitle: string;
  verdictCode: string;
  feedback: string;
  xpDelta: string;
  streakState: string;
  accentClass: string;
  borderClass: string;
  bgTintClass: string;
}

const VERDICT_SCENARIOS: Record<VerdictKey, VerdictScenario> = {
  blessed: {
    key: 'blessed',
    tabLabel: 'Approved',
    kaamTitle: 'System Design Notes — 2 Pages',
    stakes: 'High-Priority · Saboot Required',
    proofLabel: 'Photo submitted (412 KB)',
    verdictTitle: 'BLESSED',
    verdictCode: 'VERIFIED',
    feedback:
      'Clear handwritten diagrams covering load balancing and cache invalidation. Effort matches the stakes. XP granted.',
    xpDelta: '+250 XP',
    streakState: 'Streak +1',
    accentClass: 'text-[#39ff14]',
    borderClass: 'border-[#39ff14]/40',
    bgTintClass: 'bg-[#39ff14]/10',
  },
  rejected: {
    key: 'rejected',
    tabLabel: 'Rejected',
    kaamTitle: '45-Min Strength Session',
    stakes: 'High-Priority · Saboot Required',
    proofLabel: 'Photo submitted (388 KB)',
    verdictTitle: 'REJECTED',
    verdictCode: 'INSUFFICIENT PROOF',
    feedback:
      'The timer in your photo reads 14 minutes, not 45. Complete the full session and submit accurate evidence.',
    xpDelta: '0 XP',
    streakState: 'Streak at risk',
    accentClass: 'text-[#dc143c]',
    borderClass: 'border-[#dc143c]/40',
    bgTintClass: 'bg-[#dc143c]/10',
  },
  shadow: {
    key: 'shadow',
    tabLabel: 'Missed Day',
    kaamTitle: 'Daily Algorithm Practice',
    stakes: 'Deadline Passed · Reaper Triggered',
    proofLabel: 'No Saboot submitted before cutoff',
    verdictTitle: 'SHADOW REALM',
    verdictCode: 'XP DEBT ACTIVE',
    feedback:
      'You missed a full day without a Streak Freeze. Your streak is broken and XP has dropped negative. Grind verified Kaams to return.',
    xpDelta: '-150 XP Debt',
    streakState: 'Streak reset to 0',
    accentClass: 'text-[#dc143c]',
    borderClass: 'border-[#dc143c]/40',
    bgTintClass: 'bg-[#dc143c]/10',
  },
};

const CORE_LOOP = [
  {
    icon: Target,
    title: 'Forge a Lakshya',
    description:
      'Define a concrete long-term quest—like shipping a project, mastering a subject, or training consistently.',
    accent: 'text-primary',
  },
  {
    icon: Zap,
    title: 'Assign Kaams & Stakes',
    description:
      'Break your Lakshya into daily tasks. Set your own XP reward and mark high-stakes Kaams as requiring verification.',
    accent: 'text-primary',
  },
  {
    icon: Camera,
    title: 'Submit Saboot',
    description:
      'Upload a photo of your actual work—compressed automatically on your device before it reaches the Game Master.',
    accent: 'text-[#39ff14]',
  },
  {
    icon: Brain,
    title: 'Face the Verdict',
    description:
      'The AI Game Master inspects your proof against your task criteria and awards XP—or sends you back to try again.',
    accent: 'text-[#dc143c]',
  },
];

const PROTOCOL_PILLARS = [
  {
    value: 'Photo Proof',
    label: 'Mandatory Saboot on verified Kaams—no honor-system checkboxes.',
    icon: Camera,
  },
  {
    value: 'AI Judgment',
    label: 'Personalized Game Master feedback shaped by your streak and history.',
    icon: Brain,
  },
  {
    value: 'XP Debt',
    label: 'Miss a full day and enter the Shadow Realm until you earn your way out.',
    icon: Scale,
  },
];

export default function LandingPage() {
  const [activeVerdict, setActiveVerdict] = useState<VerdictKey>('blessed');
  const shouldReduceMotion = useReducedMotion();
  const scenario = VERDICT_SCENARIOS[activeVerdict];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/icon.png"
              alt="KaamKaaj logo"
              width={36}
              height={36}
              className="rounded-lg border border-primary/30"
              priority
            />
            <span className="font-display text-xl font-bold uppercase tracking-wider text-foreground">
              KaamKaaj
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#loop" className="hover:text-foreground transition-colors">
              Core Loop
            </a>
            <a href="#game-master" className="hover:text-foreground transition-colors">
              Game Master
            </a>
            <a href="#stakes" className="hover:text-foreground transition-colors">
              Stakes &amp; Penalties
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-3.5 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-bold uppercase tracking-wider transition-colors"
            >
              Start Quest
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-14 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 border-b border-border">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Thesis & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.04] text-foreground">
              To-do lists let you lie.{' '}
              <span className="text-primary">KaamKaaj demands proof.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Set long-term <span className="text-foreground font-semibold">Lakshyas</span>,
              break them into daily <span className="text-foreground font-semibold">Kaams</span>,
              and submit photo <span className="text-[#39ff14] font-semibold">Saboot</span>. An AI
              Game Master reviews your work before awarding XP—and penalizes missed days with{' '}
              <span className="text-[#dc143c] font-semibold">XP Debt</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider px-7 py-3.5 text-base rounded-md transition-colors"
              >
                Create Your Khiladi
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center border border-border bg-card hover:border-primary/60 text-foreground font-bold uppercase tracking-wider px-7 py-3.5 text-base rounded-md transition-colors"
              >
                Enter the Guild
              </Link>
            </div>
          </div>

          {/* Right: Interactive Verdict Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-card border border-border p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Interactive Example · Verdict Engine
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">
                    Test how the Game Master responds
                  </p>
                </div>

                <div
                  role="tablist"
                  aria-label="Example Kaam outcomes"
                  className="inline-flex rounded-lg bg-secondary p-1 border border-border"
                >
                  {(Object.keys(VERDICT_SCENARIOS) as VerdictKey[]).map((key) => {
                    const item = VERDICT_SCENARIOS[key];
                    const isSelected = activeVerdict === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveVerdict(key)}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                          isSelected
                            ? 'bg-background text-foreground border border-border'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {item.tabLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={scenario.key}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="pt-5 space-y-4"
                >
                  {/* Kaam Task Row */}
                  <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-background border border-border">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-foreground">{scenario.kaamTitle}</p>
                      <p className="font-mono text-xs text-muted-foreground">{scenario.stakes}</p>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-secondary text-muted-foreground border border-border shrink-0">
                      {scenario.proofLabel}
                    </span>
                  </div>

                  {/* Verdict Panel */}
                  <div className={`p-4 rounded-xl border ${scenario.borderClass} ${scenario.bgTintClass}`}>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {scenario.key === 'blessed' && (
                          <CheckCircle2 className="w-4 h-4 text-[#39ff14]" />
                        )}
                        {scenario.key === 'rejected' && (
                          <XCircle className="w-4 h-4 text-[#dc143c]" />
                        )}
                        {scenario.key === 'shadow' && (
                          <Skull className="w-4 h-4 text-[#dc143c]" />
                        )}
                        <span className={`font-display text-base font-bold tracking-wider ${scenario.accentClass}`}>
                          {scenario.verdictTitle}
                        </span>
                      </div>
                      <span className={`font-mono text-xs font-bold ${scenario.accentClass}`}>
                        {scenario.verdictCode}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {scenario.feedback}
                    </p>
                  </div>

                  {/* Outcome Metrics */}
                  <div className="grid grid-cols-2 gap-3 tabular-nums">
                    <div className="p-3 rounded-xl bg-background border border-border flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        XP Impact
                      </span>
                      <span className={`font-mono text-sm font-bold ${scenario.accentClass}`}>
                        {scenario.xpDelta}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Streak
                      </span>
                      <span className="font-mono text-sm font-bold text-foreground">
                        {scenario.streakState}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Accountability Protocol Strip (Replaces Fake User Stats) */}
      <section className="py-12 px-4 sm:px-6 bg-card/50 border-b border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROTOCOL_PILLARS.map((pillar) => (
            <div key={pillar.value} className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                <pillar.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                  {pillar.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {pillar.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Loop */}
      <section id="loop" className="py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
              The Accountability Loop
            </h2>
            <p className="text-lg text-muted-foreground mt-3">
              Every quest follows four deliberate steps designed to turn intention into verifiable action.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_LOOP.map((step, index) => (
              <div
                key={step.title}
                className="relative p-6 rounded-2xl bg-card border border-border flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-secondary border border-border flex items-center justify-center">
                      <step.icon className={`w-5 h-5 ${step.accent}`} />
                    </div>
                    {index < CORE_LOOP.length - 1 && (
                      <ArrowRight className="hidden lg:block w-4 h-4 text-muted-foreground/50" />
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Game Master Section */}
      <section id="game-master" className="py-20 md:py-24 px-4 sm:px-6 bg-card/40 border-y border-border">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
              Your Personal <span className="text-primary">Game Master</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The Game Master doesn&apos;t just check a box. It knows your name, current streak,
              and Shadow Realm history—and shifts its tone based on your consistency.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#39ff14] shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-base font-bold uppercase tracking-wider text-[#39ff14]">
                    Blessed — XP Granted
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Your Saboot matches the Kaam criteria. XP is added and your streak advances.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <XCircle className="w-5 h-5 text-[#dc143c] shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-base font-bold uppercase tracking-wider text-[#dc143c]">
                    Rejected — Try Again
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Incomplete or mismatched proof is called out directly. No XP until you resubmit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-background border border-border p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">Game Master</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      Illustrative Evaluation Log
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] font-mono text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14]" />
                  ACTIVE
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-card border border-[#dc143c]/35">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="font-mono text-xs font-bold text-[#dc143c] uppercase">
                      Rejected · Daily Workout Log
                    </p>
                    <span className="font-mono text-xs text-muted-foreground">0 XP</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    &ldquo;Your log shows 15 minutes of activity, but the Kaam requires 45. Be
                    honest with yourself. Retry with accurate proof.&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-[#39ff14]/35">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="font-mono text-xs font-bold text-[#39ff14] uppercase">
                      Blessed · System Architecture Draft
                    </p>
                    <span className="font-mono text-xs text-[#39ff14] font-bold">+300 XP</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    &ldquo;Clean diagrams, clear failure modes, and your 12-day streak stays intact.
                    Keep pushing.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakes, Penalties & RPG Systems (Replaces Fake Testimonials) */}
      <section id="stakes" className="py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
              Real Stakes. <span className="text-[#dc143c]">Real Consequences.</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-3">
              Standard productivity apps reward you for tapping a checkbox. KaamKaaj uses loss
              aversion and verifiable proof so your progress actually means something.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Comparison Panel */}
            <div className="lg:col-span-5 rounded-2xl bg-card border border-border p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Why checklists fail
                  </p>
                  <h3 className="font-display text-2xl font-bold uppercase text-foreground">
                    Willpower vs. Proof
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-background border border-border">
                    <p className="text-xs font-mono uppercase text-muted-foreground mb-1">
                      Traditional To-Do Apps
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Tap &ldquo;Done&rdquo; even when you skipped the work. Postpone indefinitely
                      with zero penalty.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-background border border-primary/40">
                    <p className="text-xs font-mono uppercase text-primary mb-1">
                      KaamKaaj Protocol
                    </p>
                    <p className="text-sm text-foreground">
                      Upload photo Saboot for high-stakes Kaams. The Reaper flags missed deadlines,
                      and full-day misses trigger XP Debt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Core Mechanics */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#dc143c]/10 border border-[#dc143c]/30 flex items-center justify-center">
                  <Skull className="w-5 h-5 text-[#dc143c]" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-foreground">
                  The Shadow Realm
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Miss a full day and your XP plunges into negative debt. Only verified Kaams
                  bring you back into good standing.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-foreground">
                  Streaks &amp; Freezes
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Complete tasks daily to build your streak. Keep limited Streak Freezes as
                  emergency shields for unavoidable off-days.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-foreground">
                  You Set the Stakes
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Assign 10 XP to simple chores or 500 XP to deep work—and toggle Saboot
                  verification for the tasks that matter most.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center">
                  <Users className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-foreground">
                  Clans &amp; Guilds
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Team up with peers who hold the same standard. Track shared momentum without
                  hiding behind fake numbers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 border-t border-border bg-card/30">
        <div className="max-w-4xl mx-auto rounded-2xl bg-card border border-primary/35 p-8 sm:p-12 text-center space-y-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
            Ready to put proof behind your goals?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Create your Khiladi profile, forge your first Lakshya, and let the Game Master judge
            the work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider px-8 py-4 text-base rounded-md transition-colors w-full sm:w-auto"
            >
              Begin Your Quest
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center border border-border bg-background hover:border-primary/60 text-foreground font-bold uppercase tracking-wider px-8 py-4 text-base rounded-md transition-colors w-full sm:w-auto"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/icon.png"
              alt="KaamKaaj logo"
              width={28}
              height={28}
              className="rounded-md border border-primary/30"
            />
            <span className="font-display text-base font-bold uppercase tracking-wider">
              KaamKaaj
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2026 KaamKaaj. Accountability through proof.
          </p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/register" className="hover:text-primary transition-colors">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
