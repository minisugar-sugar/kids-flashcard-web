import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ProgressContextValue {
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  playCorrectSound: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  function playCorrectSound() {
    if (!soundEnabled) return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // iOS may block auto-play — silent fallback
    }
  }

  return (
    <ProgressContext.Provider value={{ soundEnabled, setSoundEnabled, playCorrectSound }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgressContext must be used within ProgressProvider');
  return ctx;
}
