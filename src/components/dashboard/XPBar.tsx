'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface XPBarProps {
  currentXP: number;
  level: number;
  xpDebt?: number;
  inShadowRealm?: boolean;
  xpToNextLevel?: number;
}

export function XPBar({ currentXP, level, xpDebt = 0, inShadowRealm = false, xpToNextLevel = 1000 }: XPBarProps) {
  const [mounted, setMounted] = useState(false);
  
  // A safe modulo that always relies on 1000 XP tiers, preventing divide-by-zero
  const xpInCurrentLevel = currentXP >= 0 ? currentXP % 1000 : currentXP;
  const progressPercentage = Math.min(100, Math.max(0, (xpInCurrentLevel / 1000) * 100));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-4 w-full bg-input rounded-full" />;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-end text-sm uppercase tracking-widest font-bold">
        <span className="text-muted-foreground">
          {inShadowRealm ? (
            <span className="text-destructive text-lg">LVL 0: SHADOW REALM</span>
          ) : (
            <>LVL <span className="text-primary text-lg">{level}</span></>
          )}
        </span>
        <span className="text-muted-foreground">
          {inShadowRealm ? (
            <span className="text-destructive">
              <span className="line-through">{xpInCurrentLevel}</span> / {xpToNextLevel} XP
              {xpDebt > 0 && <span className="ml-2 text-xs">(-{xpDebt} debt)</span>}
            </span>
          ) : (
            <span className="text-foreground">{xpInCurrentLevel}</span>
          )} / {xpToNextLevel} XP
        </span>
      </div>
      
      {/* Container */}
      <div className="relative h-4 w-full bg-input rounded-full overflow-hidden border border-border/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
        {/* Animated Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${inShadowRealm ? 0 : progressPercentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut", type: "spring", bounce: 0.2 }}
          className={`absolute top-0 left-0 h-full ${inShadowRealm ? 'bg-destructive' : 'bg-primary'} relative`}
        >
          {/* Shine effect inside the bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse" />
        </motion.div>
        
        {/* Shadow Realm debt indicator */}
        {inShadowRealm && xpDebt > 0 && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (xpDebt / xpToNextLevel) * 100)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-0 right-0 h-full bg-destructive/40 border-l-2 border-destructive"
          />
        )}
        
        {/* Glow behind bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: `${inShadowRealm ? 0 : progressPercentage}%`, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`absolute top-0 left-0 h-full blur-[8px] mix-blend-screen pointer-events-none ${inShadowRealm ? 'bg-destructive' : 'bg-primary'}`}
        />
      </div>
    </div>
  );
}
