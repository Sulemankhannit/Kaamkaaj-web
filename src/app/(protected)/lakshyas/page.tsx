'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { LakshyaCard } from '@/components/dashboard/LakshyaCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Target, ShieldAlert } from 'lucide-react';

export default function LakshyasPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['lakshyas'],
    queryFn: async () => {
      const [dashboardRes, kaamsRes] = await Promise.all([
        api.get('/dashboard'),
        api.get('/kaam/')
      ]);
      const dashboardData = dashboardRes.data;
      const allKaams = kaamsRes.data;

      // Merge ai_feedback
      const lakshyas = dashboardData.lakshyas.map((lakshya: any) => ({
        ...lakshya,
        kaams: lakshya.kaams.map((kaam: any) => {
          const detailedKaam = allKaams.find((k: any) => k.id === kaam.id);
          return {
            ...kaam,
            ai_feedback: detailedKaam?.ai_feedback || null,
          };
        })
      }));

      return { lakshyas };
    },
    refetchInterval: (query) => {
      const data = query.state.data as any;
      if (!data || !data.lakshyas) return false;
      
      // Radar Logic: Poll every 2s if any Kaam is in_review
      const hasInReview = data.lakshyas.some((l: any) => 
        l.kaams?.some((k: any) => k.status === 'in_review')
      );
      
      return hasInReview ? 2000 : false;
    }
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-24 w-full rounded-xl" />
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
          <ShieldAlert className="w-12 h-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-black uppercase tracking-widest text-destructive">Quest Log Corrupted</h2>
          <p className="text-muted-foreground">Failed to retrieve your Lakshyas.</p>
        </div>
      </div>
    );
  }

  // Ensure we have an array of lakshyas. If the API returns KhiladiWithLakshyas, it should have a 'lakshyas' array.
  const lakshyas = data.lakshyas || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8 p-6 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-xl">
        <div className="w-16 h-16 rounded-xl bg-primary/20 border border-primary/50 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(255,215,0,0.3)]">
          <Target className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground drop-shadow-md">
            All Lakshyas
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            {lakshyas.length} Quests Total
          </p>
        </div>
      </div>

      {lakshyas.length === 0 ? (
        <div className="p-12 border-2 border-dashed border-border rounded-xl text-center space-y-4 bg-card/20 backdrop-blur-sm">
          <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center text-muted-foreground">
            <Target className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wider">Empty Quest Log</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            You currently have no Lakshyas. Head back to the dashboard or forge to create one.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {lakshyas.map((lakshya: any) => (
            <LakshyaCard 
              key={lakshya.id} 
              lakshya={{
                ...lakshya,
                // Ensure kaams array exists to prevent crashes if this endpoint doesn't return nested kaams
                kaams: lakshya.kaams || []
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
