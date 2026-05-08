import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createKaam } from '@/services/kaamService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Sword } from 'lucide-react';

interface KaamModalProps {
  lakshyaId: number;
}

export function KaamModal({ lakshyaId }: KaamModalProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [xpReward, setXpReward] = useState('10');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'epic'>('medium');
  const [isUrgent, setIsUrgent] = useState(false);
  const [description, setDescription] = useState('');
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [deadline, setDeadline] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Parameters<typeof createKaam>[1]) => createKaam(lakshyaId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setOpen(false);
      setTitle('');
      setXpReward('10');
      setDifficulty('medium');
      setIsUrgent(false);
      setDescription('');
      setRequiresVerification(false);
      setDeadline('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !xpReward) return;

    mutation.mutate({
      title,
      xp_reward: parseInt(xpReward, 10),
      difficulty,
      is_urgent: isUrgent,
      description: description.trim() === '' ? null : description.trim(),
      requires_verification: requiresVerification,
      deadline: deadline ? new Date(deadline).toISOString() : null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="font-bold uppercase text-xs tracking-wider gap-2 border-primary/20 hover:bg-primary/10">
            <Plus className="w-3 h-3" /> Add Kaam
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[425px] border-primary/20 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-widest text-primary flex items-center gap-2">
            <Sword className="w-5 h-5" /> Assign New Kaam
          </DialogTitle>
          <DialogDescription>
            Define a specific task for this Lakshya.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="uppercase text-xs font-bold tracking-wider text-muted-foreground">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Read 10 pages"
              className="font-bold border-primary/20 focus-visible:ring-primary/50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="uppercase text-xs font-bold tracking-wider text-muted-foreground">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details about the quest..."
              className="resize-none h-20 border-primary/20 focus-visible:ring-primary/50"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="xp_reward" className="uppercase text-xs font-bold tracking-wider text-muted-foreground">XP Reward</Label>
              <Input
                id="xp_reward"
                type="number"
                min="1"
                value={xpReward}
                onChange={(e) => setXpReward(e.target.value)}
                className="font-bold border-primary/20 focus-visible:ring-primary/50 text-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="uppercase text-xs font-bold tracking-wider text-muted-foreground">Difficulty</Label>
              <Select value={difficulty} onValueChange={(v) => { if (v) setDifficulty(v as 'easy' | 'medium' | 'hard' | 'epic'); }}>
                <SelectTrigger className="border-primary/20 focus-visible:ring-primary/50 font-bold capitalize">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline" className="uppercase text-xs font-bold tracking-wider text-muted-foreground">Deadline (Optional)</Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="font-bold border-primary/20 focus-visible:ring-primary/50"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-primary/20 p-4">
              <div className="space-y-0.5">
                <Label className="uppercase text-xs font-bold tracking-wider text-muted-foreground">Requires Proof</Label>
                <div className="text-[10px] text-muted-foreground">
                  Must offer saboot to clear
                </div>
              </div>
              <Switch
                checked={requiresVerification}
                onCheckedChange={setRequiresVerification}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-primary/20 p-4">
            <div className="space-y-0.5">
              <Label className="uppercase text-xs font-bold tracking-wider text-muted-foreground">Urgent Quest</Label>
              <div className="text-[10px] text-muted-foreground">
                Mark this kaam as high priority
              </div>
            </div>
            <Switch
              checked={isUrgent}
              onCheckedChange={setIsUrgent}
            />
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full font-black uppercase tracking-widest gap-2" 
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Assigning...' : 'Assign Kaam'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
