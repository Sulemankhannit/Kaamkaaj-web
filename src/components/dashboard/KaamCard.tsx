import { motion } from 'framer-motion';
import { ShieldAlert, Sword, CheckCircle, Clock } from 'lucide-react';
import { SabootModal } from './SabootModal';
import { Typewriter } from '@/components/ui/Typewriter';

interface KaamProps {
  id: number;
  title: string;
  description: string | null;
  status: string;
  xp_reward: number;
  requires_verification: boolean;
  deadline: string | null;
  ai_feedback?: string | null;
}

export function KaamCard({ kaam }: { kaam: KaamProps }) {
  const getStatusConfig = () => {
    switch (kaam.status) {
      case 'completed': return { color: 'text-success', border: 'border-success/30', bg: 'bg-success/5' };
      case 'rejected': return { color: 'text-destructive', border: 'border-destructive/30', bg: 'bg-destructive/5' };
      case 'in_review': return { color: 'text-yellow-500', border: 'border-yellow-500/30', bg: 'bg-yellow-500/5' };
      default: return { color: 'text-primary', border: 'border-primary/20', bg: 'bg-primary/5' };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden p-4 rounded-lg border ${config.border} ${config.bg} backdrop-blur-sm transition-all group`}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-primary/5 to-transparent transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex justify-between items-start gap-4 relative z-10">
        <div className="flex-1 space-y-1">
          <h4 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
            {kaam.status === 'completed' && <CheckCircle className="w-4 h-4 text-success" />}
            {kaam.title}
          </h4>
          {kaam.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{kaam.description}</p>
          )}
          
          <div className="flex items-center gap-3 mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-1 text-primary">
              <Sword className="w-3 h-3" /> +{kaam.xp_reward} XP
            </span>
            {kaam.requires_verification && (
              <span className="flex items-center gap-1 text-yellow-500">
                <ShieldAlert className="w-3 h-3" /> Verification Req
              </span>
            )}
            {kaam.deadline && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {new Date(kaam.deadline).toLocaleDateString()}
              </span>
            )}
          </div>

          {(kaam.status === 'pending' || (kaam.status === 'in_review' && kaam.requires_verification)) && (
            <div className="mt-4 pt-3 border-t border-border/50 flex justify-end">
              <SabootModal kaamId={kaam.id} kaamTitle={kaam.title} />
            </div>
          )}

          {kaam.ai_feedback && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
              className={`mt-4 p-4 rounded-xl border-2 backdrop-blur-md relative overflow-hidden group/feedback ${
                kaam.status === 'completed' 
                  ? 'bg-success/10 border-success/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]' 
                  : 'bg-destructive/10 border-destructive/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/feedback:animate-[scan_2s_ease-in-out_infinite] group-hover/feedback:translate-x-full transition-transform duration-1000 ease-in-out" />
              
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2 ${
                kaam.status === 'completed' ? 'text-success/80' : 'text-destructive/80'
              }`}>
                {kaam.status === 'completed' ? '★ Game Master Approved' : '☠ Game Master Rejected'}
              </p>
              
              <div className="relative z-10">
                <Typewriter
                  text={`"${kaam.ai_feedback}"`}
                  delay={30}
                  className={`font-mono text-sm leading-relaxed ${
                    kaam.status === 'completed' ? 'text-success drop-shadow-[0_0_5px_rgba(34,197,94,0.4)]' : 'text-destructive drop-shadow-[0_0_5px_rgba(239,68,68,0.4)]'
                  }`}
                />
              </div>
            </motion.div>
          )}
        </div>
        
        <div className={`shrink-0 whitespace-nowrap px-2 py-1 text-[10px] uppercase font-black tracking-widest rounded border ${config.border} ${config.color}`}>
          {kaam.status.replace('_', ' ')}
        </div>
      </div>
    </motion.div>
  );
}
