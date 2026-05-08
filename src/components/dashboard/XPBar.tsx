'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface XPBarProps {
  currentXP: number;
  level: number;
}

export function XPBar({ currentXP, level }: XPBarProps) {
  const [mounted, setMounted] = useState(false);
  
  // Calculate RPG math (Assume 1000 XP per level for now)
  const xpPerLevel = 1000 * level; 
  const xpInCurrentLevel = currentXP % xpPerLevel;
  const progressPercentage = Math.min(100, Math.max(0, (xpInCurrentLevel / xpPerLevel) * 100));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-4 w-full bg-input rounded-full" />;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-end text-sm uppercase tracking-widest font-bold">
        <span className="text-muted-foreground">LVL <span className="text-primary text-lg">{level}</span></span>
        <span className="text-muted-foreground">
          <span className="text-foreground">{xpInCurrentLevel}</span> / {xpPerLevel} XP
        </span>
      </div>
      
      {/* Container */}
      <div className="relative h-4 w-full bg-input rounded-full overflow-hidden border border-border/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
        {/* Animated Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut", type: "spring", bounce: 0.2 }}
          className="absolute top-0 left-0 h-full bg-primary relative"
        >
          {/* Shine effect inside the bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse" />
        </motion.div>
        
        {/* Glow behind bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: `${progressPercentage}%`, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-primary blur-[8px] mix-blend-screen pointer-events-none"
        />
      </div>
    </div>
  );
}
