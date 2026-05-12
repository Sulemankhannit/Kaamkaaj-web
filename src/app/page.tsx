'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Target, 
  Zap, 
  Trophy, 
  Users, 
  ChevronRight, 
  Star, 
  Shield,
  Flame,
  Crown,
  Rocket,
  LucideIcon,
  Brain,
  MessageSquare,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Game Master',
    description: 'Your work gets reviewed by an intelligent Game Master. Get personalized feedback and level up your skills.',
    color: 'text-chart-3'
  },
  {
    icon: Target,
    title: 'Set Your Lakshyas',
    description: 'Define big goals and break them into conquerable Kaams. Your quest log awaits.',
    color: 'text-primary'
  },
  {
    icon: Zap,
    title: 'Earn XP & Level Up',
    description: 'Complete tasks to gain experience. Rise through the ranks from Novice to Legend.',
    color: 'text-success'
  },
  {
    icon: Users,
    title: 'Join or Create Clans',
    description: 'Team up with fellow Khiladis. Together, no quest is impossible.',
    color: 'text-chart-4'
  }
];

const stats = [
  { value: '1M+', label: 'Khiladis', icon: Users },
  { value: '10M+', label: 'Kaams Completed', icon: Zap },
  { value: '500K+', label: 'Lakshyas Achieved', icon: Target }
];

const testimonials = [
  {
    name: 'Shadow_Ninja',
    level: 'Level 47',
    quote: 'KaamKaaj transformed my life. I went from chaos to clarity. My productivity skyrocketed!',
    achievement: 'Completed 500+ Kaams'
  },
  {
    name: 'TechWarrior',
    level: 'Level 89',
    quote: 'The gamification is addictive. I actually look forward to completing my daily tasks now.',
    achievement: 'Reached Legend Rank'
  },
  {
    name: 'GoalGetter_99',
    level: 'Level 156',
    quote: 'Lost 30 pounds by turning my fitness journey into a game. Every workout gave me XP!',
    achievement: '3 Clans Founded'
  }
];

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-destructive/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />
    </div>
  );
}

function FloatingIcon({ icon: Icon, delay, left, top }: { icon: LucideIcon, delay: number, left: string, top: string }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`absolute transition-all duration-1000 ${visible ? 'opacity-30 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ left, top }}
    >
      <Icon className="w-6 h-6 text-primary animate-bounce" style={{ animationDuration: '3s' }} />
    </div>
  );
}

export default function LandingPage() {
  const [mounted] = useState(true);

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      
      <FloatingIcon icon={Star} delay={0} left="10%" top="20%" />
      <FloatingIcon icon={Flame} delay={200} left="85%" top="15%" />
      <FloatingIcon icon={Crown} delay={400} left="75%" top="60%" />
      <FloatingIcon icon={Shield} delay={600} left="5%" top="70%" />
      <FloatingIcon icon={Rocket} delay={800} left="90%" top="80%" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Level Up Your Life</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight">
            Turn Your Goals Into{' '}
            <span className="text-primary drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">
              Adventures
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            KaamKaaj is the ultimate gamified productivity app. Set <span className="text-primary font-bold">Lakshyas</span>, 
            complete <span className="text-success font-bold">Kaams</span>, earn <span className="text-primary font-bold">XP</span>, 
            and become the <span className="text-chart-5 font-bold">Legend</span> you were meant to be.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider px-8 py-6 text-lg rounded-md">
              Start Your Journey
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary/10 font-bold uppercase tracking-wider px-8 py-6 text-lg rounded-md">
              Enter the Guild
            </Link>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="relative mx-auto max-w-4xl">
              <div className="relative rounded-3xl bg-card/50 backdrop-blur-xl border border-border p-8 md:p-12 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-success/10 rounded-full blur-[60px] pointer-events-none" />
                
                <div className="relative z-10 grid md:grid-cols-3 gap-8">
                  {/* Avatar Preview */}
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-secondary border-4 border-primary flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-black uppercase text-foreground">Shadow_Khiladi</h3>
                    <p className="text-primary font-bold">Level 42</p>
                  </div>

                  {/* XP Bar */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Experience</span>
                      <span className="text-primary font-black">12,450 / 15,000 XP</span>
                    </div>
                    <div className="h-4 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-1000" style={{ width: '83%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Complete <span className="text-success font-bold">3 more Kaams</span> to level up!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Game Master Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-card/50 to-background relative overflow-hidden">
        {/* Background geometric patterns - left side */}
        <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none">
          {/* Crimson runic lines */}
          <div className="absolute left-4 top-20 w-px h-32 bg-gradient-to-b from-[#dc143c] to-transparent shadow-[0_0_10px_#dc143c]" />
          <div className="absolute left-8 top-32 w-px h-24 bg-gradient-to-b from-[#dc143c]/60 to-transparent shadow-[0_0_8px_#dc143c]" />
          <div className="absolute left-4 bottom-32 w-16 h-px bg-[#dc143c] shadow-[0_0_10px_#dc143c]" />
          <div className="absolute left-6 bottom-28 w-12 h-px bg-[#dc143c]/60" />
          {/* Neon green runic lines */}
          <div className="absolute left-2 top-40 w-20 h-px bg-[#39ff14] shadow-[0_0_10px_#39ff14]" />
          <div className="absolute left-6 top-48 w-px h-20 bg-gradient-to-b from-[#39ff14] to-transparent shadow-[0_0_8px_#39ff14]" />
          <div className="absolute left-4 bottom-20 w-24 h-px bg-[#39ff14] shadow-[0_0_12px_#39ff14]" />
          <div className="absolute left-10 bottom-16 w-px h-16 bg-gradient-to-b from-[#39ff14]/60 to-transparent" />
          {/* Circuit pattern accents */}
          <svg className="absolute left-0 top-1/3 w-24 h-24 opacity-40" viewBox="0 0 100 100">
            <path d="M10 50 L30 50 L40 30 L60 30 L70 50 L90 50" stroke="#dc143c" strokeWidth="2" fill="none" className="shadow-[0_0_5px_#dc143c]" />
            <circle cx="10" cy="50" r="4" fill="#dc143c" className="shadow-[0_0_8px_#dc143c]" />
            <circle cx="90" cy="50" r="4" fill="#dc143c" className="shadow-[0_0_8px_#dc143c]" />
          </svg>
          <svg className="absolute left-0 bottom-1/3 w-20 h-20 opacity-40" viewBox="0 0 100 100">
            <path d="M10 50 L40 50 L50 70 L80 70" stroke="#39ff14" strokeWidth="2" fill="none" className="shadow-[0_0_5px_#39ff14]" />
            <circle cx="10" cy="50" r="3" fill="#39ff14" className="shadow-[0_0_6px_#39ff14]" />
            <circle cx="80" cy="70" r="3" fill="#39ff14" className="shadow-[0_0_6px_#39ff14]" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-3/10 border border-chart-3/30 mb-6 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                <Brain className="w-4 h-4 text-chart-3" />
                <span className="text-sm font-medium text-chart-3">AI Accountability System</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                Your Personal <span className="text-chart-3">Game Master</span>
              </h2>
              <p className="text-xl text-[#E5E5E5] mb-8">
                No more skipping tasks or half-hearted work. When you submit a Kaam, the <span className="text-chart-3 font-bold">AI Game Master</span> reviews it and decides:
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#121212] border-2 border-[#39ff14] flex items-center justify-center flex-shrink-0 mt-0 shadow-[0_0_20px_rgba(57,255,20,0.6)]">
                    <Sparkles className="w-5 h-5 text-[#39ff14]" />
                  </div>
                  <div>
                    <span className="font-black text-lg text-[#39ff14] tracking-wider drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]">BLESSED</span>
                    <p className="text-[#E5E5E5] text-sm mt-1">Your work is approved, XP is granted</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#121212] border-2 border-[#dc143c] flex items-center justify-center flex-shrink-0 mt-0 shadow-[0_0_20px_rgba(220,20,60,0.6)]">
                    <MessageSquare className="w-5 h-5 text-[#dc143c]" />
                  </div>
                  <div>
                    <span className="font-black text-lg text-[#dc143c] tracking-wider drop-shadow-[0_0_8px_rgba(220,20,60,0.8)]">REJECTED</span>
                    <p className="text-[#E5E5E5] text-sm mt-1">Feedback provided, try again</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-chart-3/10 rounded-3xl blur-[60px]" />
              <div className="relative bg-[#121212]/90 backdrop-blur-xl border border-[#27272a] rounded-2xl p-6 overflow-hidden">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <div className="w-12 h-12 rounded-full bg-chart-3/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-chart-3" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Game Master</p>
                    <p className="text-sm text-[#A1A1AA]">AI Reviewer</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#39ff14]/20 text-[#39ff14] text-xs font-bold shadow-[0_0_10px_rgba(57,255,20,0.4)]">ONLINE</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#121212] border border-[#27272a] shadow-[0_0_20px_rgba(220,20,60,0.15)]">
                    <p className="text-sm font-bold text-[#dc143c] mb-2">✖ REJECTED: Daily Workout Log</p>
                    <p className="text-sm text-[#E5E5E5]">
                      Your log shows only 15 minutes of activity but claims 45. Be honest, Khiladi. The Game Master sees all. Retry with accurate data.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#121212] border border-[#27272a] shadow-[0_0_20px_rgba(57,255,20,0.15)]">
                    <p className="text-sm font-bold text-[#39ff14] mb-2">★ BLESSED: Project Alpha Code</p>
                    <p className="text-sm text-[#E5E5E5]">
                      Clean code, proper documentation, all tests passing. +500 XP awarded. You&apos;re on your way to Senior Developer, Khiladi!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.value}</p>
                <p className="text-lg text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Your Quest Begins <span className="text-primary">Now</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to transform your productivity into an epic adventure
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group bg-card/50 backdrop-blur-md border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.1)]"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-wider mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-card/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              How It <span className="text-success">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to start your transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Your Khiladi', description: 'Sign up and build your avatar. Choose your username and start your journey.' },
              { step: '02', title: 'Set Your Lakshyas', description: 'Define big goals that excite you. Break them into achievable Kaams (tasks).' },
              { step: '03', title: 'Complete & Level Up', description: 'Finish tasks to earn XP, unlock achievements, and become a Legend!' }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-8xl font-black text-primary/10 absolute -top-4 -left-2">{item.step}</div>
                <div className="relative pt-12">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Stories from <span className="text-chart-5">Khiladis</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real people, real transformations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-md border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Achievement</p>
                      <p className="text-sm font-medium text-success">{testimonial.achievement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-card to-card/50 border border-primary/30 p-12 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-success/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <Crown className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                Ready to <span className="text-primary">Level Up</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of Khiladis who have transformed their productivity into an epic adventure.
              </p>
              <Link href="/register" className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider px-10 py-6 text-xl rounded-md">
                  Begin Your Quest
                  <ChevronRight className="ml-2 w-6 h-6" />
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            <span className="text-lg font-black uppercase tracking-wider">KaamKaaj</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2026 KaamKaaj. Turn work into adventure.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
