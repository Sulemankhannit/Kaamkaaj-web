import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitSaboot } from '@/services/kaamService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UploadCloud, Image as ImageIcon, CheckCircle, ShieldAlert } from 'lucide-react';
import { Ceremony } from './Ceremony';

interface SabootModalProps {
  kaamId: number;
  kaamTitle: string;
}

export function SabootModal({ kaamId, kaamTitle }: SabootModalProps) {
  const [open, setOpen] = useState(false);
  const [sabootText, setSabootText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Ceremony State
  const [ceremonyOpen, setCeremonyOpen] = useState(false);
  const [ceremonyStatus, setCeremonyStatus] = useState<'completed' | 'rejected' | null>(null);
  const [aiFeedback, setAiFeedback] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => submitSaboot(kaamId, formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      
      // If the backend completes or rejects it immediately
      if (data.status === 'completed' || data.status === 'rejected') {
        setCeremonyStatus(data.status);
        setAiFeedback(data.ai_feedback || '');
        setCeremonyOpen(true);
        setOpen(false); // Close the submit modal
      } else {
        // If it's just 'in_review' or 'pending', close normally. 
        // We could also show a toast here.
        setOpen(false);
      }
      
      // Reset form
      setSabootText('');
      setSelectedFile(null);
      setPreviewUrl(null);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sabootText && !selectedFile) return;

    const formData = new FormData();
    if (sabootText) formData.append('saboot_text', sabootText);
    if (selectedFile) formData.append('saboot_image', selectedFile);

    mutation.mutate(formData);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button size="sm" className="font-bold uppercase text-xs tracking-wider gap-2">
              <UploadCloud className="w-3 h-3" /> Submit Saboot
            </Button>
          }
        />
        <DialogContent className="sm:max-w-[500px] border-primary/20 bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-widest text-primary flex items-center gap-2">
              The Saboot Ceremony
            </DialogTitle>
            <DialogDescription>
              Submit proof for <span className="font-bold text-foreground">"{kaamTitle}"</span>. The AI Game Master will judge your effort.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="saboot_text" className="uppercase text-xs font-bold tracking-wider text-muted-foreground">Written Proof</Label>
              <Textarea
                id="saboot_text"
                value={sabootText}
                onChange={(e) => setSabootText(e.target.value)}
                placeholder="Describe how you completed this task..."
                className="resize-none h-24 border-primary/20 focus-visible:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="uppercase text-xs font-bold tracking-wider text-muted-foreground">Visual Proof (Optional)</Label>
              <div 
                className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer ${previewUrl ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-primary/5'}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/20">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="text-center py-6 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-bold text-muted-foreground">Click to upload image</span>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {mutation.isPending && (
              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg flex items-center gap-4 animate-pulse">
                <ShieldAlert className="w-6 h-6 text-primary" />
                <span className="text-sm font-bold uppercase tracking-widest text-primary">The AI is judging your soul...</span>
              </div>
            )}

            <DialogFooter>
              <Button 
                type="submit" 
                className="w-full font-black uppercase tracking-widest gap-2" 
                disabled={mutation.isPending || (!sabootText && !selectedFile)}
              >
                {mutation.isPending ? 'Submitting...' : 'Offer Saboot'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Ceremony 
        isOpen={ceremonyOpen} 
        status={ceremonyStatus} 
        aiFeedback={aiFeedback} 
        onClose={() => setCeremonyOpen(false)} 
      />
    </>
  );
}
