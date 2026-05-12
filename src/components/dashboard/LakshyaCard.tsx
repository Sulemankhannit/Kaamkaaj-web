import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Target, Trophy, Clock, Trash2, Loader2 } from 'lucide-react';
import { KaamCard } from './KaamCard';
import { KaamModal } from './KaamModal';
import { deleteLakshya } from '@/services/lakshyaService';

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

export function LakshyaCard({ lakshya }: { lakshya: DashboardLakshyaResponse }) {
  const queryClient = useQueryClient();
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  const totalKaams = lakshya.kaams.length;
  const completedKaams = lakshya.kaams.filter(k => k.status === 'completed').length;
  const progress = totalKaams === 0 ? 0 : Math.round((completedKaams / totalKaams) * 100);

  const deleteMutation = useMutation({
    mutationFn: () => deleteLakshya(lakshya.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['lakshyas'] });
      setDeleteOpen(false);
    },
  });

  return (
    <Accordion className="w-full">
      <AccordionItem value={`lakshya-${lakshya.id}`} className="border border-border/50 bg-card/40 backdrop-blur-md rounded-xl overflow-hidden mb-4 data-[state=open]:border-primary/50 transition-colors">
        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/[0.02] transition-colors group">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full pr-4 gap-4 text-left">
            <div className="space-y-1">
              <h3 className="font-black text-lg uppercase tracking-tight flex items-center gap-2 group-hover:text-primary transition-colors">
                {lakshya.is_accomplished ? (
                  <Trophy className="w-5 h-5 text-primary drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
                ) : (
                  <Target className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                )}
                {lakshya.title}
              </h3>
              {lakshya.description && (
                <p className="text-sm text-muted-foreground line-clamp-1">{lakshya.description}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!lakshya.is_accomplished && (
                <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Lakshya</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete "{lakshya.title}"? This action cannot be undone and all associated kaams will also be removed.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => deleteMutation.mutate()}
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="flex items-center gap-6 text-sm font-bold uppercase tracking-wider">
              {lakshya.deadline && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {new Date(lakshya.deadline).toLocaleDateString()}
                </span>
              )}
              <div className="flex flex-col items-end gap-1 min-w-[80px]">
                <span className="text-xs text-muted-foreground">Progress</span>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 h-1.5 bg-input rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary shadow-[0_0_5px_rgba(255,215,0,0.5)]" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                  <span className="text-primary">{progress}%</span>
                </div>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 pt-2">
          <div className="border-t border-border/50 pt-4 mt-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Quest Objectives (Kaams)</h4>
              <KaamModal lakshyaId={lakshya.id} />
            </div>
            {totalKaams === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4 italic">No kaams assigned to this Lakshya yet.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {lakshya.kaams.map((kaam) => (
                  <KaamCard key={kaam.id} kaam={kaam} />
                ))}
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
