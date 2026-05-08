import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from '@/components/ui/Typewriter';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Trophy, X } from 'lucide-react';

interface CeremonyProps {
  isOpen: boolean;
  status: 'completed' | 'rejected' | null;
  aiFeedback: string;
  onClose: () => void;
}

export function Ceremony({ isOpen, status, aiFeedback, onClose }: CeremonyProps) {
  if (!isOpen || !status) return null;

  const isSuccess = status === 'completed';
  const color = isSuccess ? 'text-success' : 'text-destructive';
  const shadowColor = isSuccess ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
          className="relative max-w-lg w-full bg-card border border-border/50 rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl"
          style={{ boxShadow: `0 0 50px ${shadowColor}` }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
            className="mb-6"
          >
            {isSuccess ? (
              <div className="w-32 h-32 rounded-full bg-success/10 flex items-center justify-center border-4 border-success shadow-[0_0_30px_rgba(34,197,94,0.6)]">
                <Trophy className="w-16 h-16 text-success" />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-destructive/10 flex items-center justify-center border-4 border-destructive shadow-[0_0_30px_rgba(239,68,68,0.6)]">
                <ShieldAlert className="w-16 h-16 text-destructive" />
              </div>
            )}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`text-4xl font-black uppercase tracking-tighter mb-2 ${color}`}
          >
            {isSuccess ? 'Quest Completed' : 'Quest Failed'}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 p-4 rounded-lg bg-black/40 border border-white/10 w-full min-h-[100px] text-left"
          >
            <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground mb-2">
              Game Master's Verdict:
            </p>
            <Typewriter 
              key={aiFeedback || (isSuccess ? "success" : "failure")}
              text={aiFeedback || (isSuccess ? "Excellent work. You have proven your worth." : "Disappointing. Try harder next time.")} 
              className={`font-mono text-sm leading-relaxed ${isSuccess ? 'text-success/90' : 'text-destructive/90'}`}
              delay={40}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="mt-8"
          >
            <Button onClick={onClose} className="font-bold uppercase tracking-widest px-8">
              Continue
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
