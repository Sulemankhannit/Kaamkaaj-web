'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { XPBar } from '@/components/dashboard/XPBar';
import { LakshyaCard } from '@/components/dashboard/LakshyaCard';
import { LakshyaModal } from '@/components/dashboard/LakshyaModal';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Shield } from 'lucide-react';

interface DashboardKaamResponse {
  id: number;
  title: string;
  description: string | null;
  status: string;
  xp_reward: number;
  requires_verification: boolean;
  deadline: string | null;
  ai_feedback?: string | null;
}

interface DashboardLakshyaResponse {
  id: number;
  title: string;
  description: string | null;
  is_accomplished: boolean;
  deadline: string | null;
  kaams: DashboardKaamResponse[];
}

interface DashboardResponse {
  khiladi_id: number;
  name: string;
  level: number;
  current_xp: number;
  xp_debt: number;
  in_shadow_realm: boolean;
  shadow_realm_message: string | null;
  net_xp: number;
  xp_to_next_level: number;
  current_streak: number;
  clan_name?: string | null;
  bio?: string | null;
  lakshyas: DashboardLakshyaResponse[];
}

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery<DashboardResponse>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const [dashboardRes, kaamsRes] = await Promise.all([
        api.get('/dashboard'),
        api.get('/kaam/')
      ]);
      const dashboardData = dashboardRes.data;
      const allKaams = kaamsRes.data;

      // Merge ai_feedback into dashboardData
      dashboardData.lakshyas = dashboardData.lakshyas.map((lakshya: any) => ({
        ...lakshya,
        kaams: lakshya.kaams.map((kaam: any) => {
          const detailedKaam = allKaams.find((k: any) => k.id === kaam.id);
          return {
            ...kaam,
            ai_feedback: detailedKaam?.ai_feedback || null,
          };
        })
      }));

      return dashboardData;
    },
    refetchInterval: (query) => {
      const dashboardData = query.state.data as DashboardResponse | undefined;
      if (!dashboardData) return false;
      
      // Radar Logic: Poll every 2s if any Kaam is in_review
      const hasInReview = dashboardData.lakshyas.some(lakshya => 
        lakshya.kaams.some(kaam => kaam.status === 'in_review')
      );
      
      return hasInReview ? 2000 : false;
    }
  });

  const prevStatuses = useRef<Record<number, string>>({});

  // Cinematic Reveal (UX): Detect status transitions from 'in_review'
  useEffect(() => {
    if (!data) return;
    
    data.lakshyas.forEach(lakshya => {
      lakshya.kaams.forEach(kaam => {
        const prevStatus = prevStatuses.current[kaam.id];
        
        if (prevStatus === 'in_review' && (kaam.status === 'completed' || kaam.status === 'rejected')) {
          const isSuccess = kaam.status === 'completed';
          const message = isSuccess 
            ? `★ THE GAME MASTER HAS BLESSED YOUR WORK: ${kaam.title}!` 
            : `☠ THE GAME MASTER HAS REJECTED YOUR SABOOT: ${kaam.title}!`;

          // Using a visible console-styled alert as a fallback for toast
          console.log(`%c ${message}`, `background: ${isSuccess ? '#22c55e' : '#ef4444'}; color: white; padding: 8px; border-radius: 4px; font-weight: bold;`);
          
          // Triggering a standard browser alert for visibility until a toast library is integrated
          // In a production app, replace this with toast.success() or toast.error()
          alert(message);
        }
        
        prevStatuses.current[kaam.id] = kaam.status;
      });
    });
  }, [data]);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 rounded-2xl bg-card/30 border border-border/50">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-48" />
            </div>
          </div>
          <div className="w-full md:max-w-md">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Lakshyas Skeleton */}
        <div className="space-y-4 mt-8">
          <Skeleton className="h-6 w-40 mb-6" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center space-y-4">
          <Shield className="w-12 h-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-black uppercase tracking-widest text-destructive">Signal Lost</h2>
          <p className="text-muted-foreground">Failed to synchronize with the server. Are you online, Khiladi?</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Shadow Realm Alert */}
      {data.in_shadow_realm && (
        <div className="p-4 rounded-xl bg-destructive/20 border-2 border-destructive shadow-[0_0_20px_rgba(220,20,60,0.3)] animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/40 flex items-center justify-center">
              <span className="text-2xl">👁</span>
            </div>
            <div>
              <h3 className="font-black uppercase tracking-widest text-destructive">You Have Entered The Shadow Realm</h3>
              {data.shadow_realm_message && (
                <p className="text-sm text-destructive/80 mt-1">{data.shadow_realm_message}</p>
              )}
              {data.xp_debt > 0 && (
                <p className="text-xs text-muted-foreground mt-1">XP Debt: {data.xp_debt} — Complete tasks to escape!</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Character Header Component */}
      <section className={`relative p-6 md:p-8 rounded-3xl backdrop-blur-xl border overflow-hidden shadow-2xl ${
        data.in_shadow_realm ? 'bg-destructive/10 border-destructive/50' : 'bg-card/40 border-border'
      }`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-2 flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.3)] ${
                data.in_shadow_realm ? 'bg-destructive/20 border-destructive' : 'bg-secondary border-primary/50'
              }`}>
                {data.in_shadow_realm ? (
                  <span className="text-4xl">👁</span>
                ) : (
                  <User className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                )}
              </div>
              <div className={`absolute -bottom-2 -right-2 px-2 py-0.5 rounded text-xs font-black uppercase shadow-[0_0_10px_rgba(255,215,0,0.4)] ${
                data.in_shadow_realm ? 'bg-destructive text-white border border-destructive' : 'bg-background text-primary border border-primary/50'
              }`}>
                {data.in_shadow_realm ? 'DISHONORED' : `LVL ${data.level}`}
              </div>
            </div>
            
            <div className="space-y-1 min-w-0 flex-1">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Welcome Back,</p>
              <div className="flex items-center flex-wrap gap-3">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tighter text-foreground drop-shadow-md flex flex-wrap items-baseline gap-x-3 gap-y-0 break-words whitespace-pre-wrap leading-tight">
                  {data.name}
                  {data.clan_name && (
                    <span className="text-lg font-bold text-primary opacity-80">[{data.clan_name}]</span>
                  )}
                </h2>
                {data.current_streak > 0 && (
                  <div className="flex items-center gap-1 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/40">
                    <span className="text-lg">🔥</span>
                    <span className="font-black text-orange-400 text-sm">{data.current_streak}</span>
                    <span className="text-xs text-orange-400/60 ml-1">STREAK</span>
                  </div>
                )}
              </div>
              {data.bio && (
                <p className="text-sm text-muted-foreground italic max-w-md line-clamp-2 mt-2 border-l-2 border-primary/50 pl-3">
                  "{data.bio}"
                </p>
              )}
            </div>
          </div>

          <div className="w-full lg:max-w-md lg:pb-2">
            <XPBar 
              currentXP={data.current_xp} 
              level={data.level}
              xpDebt={data.xp_debt}
              inShadowRealm={data.in_shadow_realm}
              xpToNextLevel={data.xp_to_next_level}
            />
          </div>
        </div>
      </section>

      {/* Lakshyas Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black uppercase tracking-widest text-foreground flex items-center gap-2">
            Active <span className="text-primary">Lakshyas</span>
          </h2>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-sm font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-full">
              {data.lakshyas.length} Quests
            </span>
            <LakshyaModal />
          </div>
        </div>

        {data.lakshyas.length === 0 ? (
          <div className="p-12 border-2 border-dashed border-border rounded-xl text-center space-y-4 bg-card/20 backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center text-muted-foreground">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-wider">No Active Lakshyas</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your quest log is empty. Visit the forge to create a new Lakshya and continue your grind.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.lakshyas.map((lakshya) => (
              <LakshyaCard key={lakshya.id} lakshya={lakshya} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
