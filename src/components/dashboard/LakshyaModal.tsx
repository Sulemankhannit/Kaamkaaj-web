import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLakshya } from '@/services/lakshyaService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

export function LakshyaModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createLakshya,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setOpen(false);
      setTitle('');
      setDeadline('');
      setDescription('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !deadline) return;

    mutation.mutate({
      title,
      deadline: new Date(deadline).toISOString(),
      description: description.trim() === '' ? null : description.trim(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="w-full sm:w-auto font-black uppercase tracking-wider gap-2 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            <Plus className="w-5 h-5" /> Banao Lakshya
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[425px] border-primary/20 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-widest text-primary">Forge New Lakshya</DialogTitle>
          <DialogDescription>
            Declare your grand goal. Set the deadline and prepare for the grind.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="uppercase text-xs font-bold tracking-wider text-muted-foreground">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Become a Master Coder"
              className="font-bold border-primary/20 focus-visible:ring-primary/50"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline" className="uppercase text-xs font-bold tracking-wider text-muted-foreground">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border-primary/20 focus-visible:ring-primary/50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="uppercase text-xs font-bold tracking-wider text-muted-foreground">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details about your grand vision..."
              className="resize-none h-24 border-primary/20 focus-visible:ring-primary/50"
            />
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full font-black uppercase tracking-widest gap-2" 
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Forging...' : 'Forge Lakshya'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
