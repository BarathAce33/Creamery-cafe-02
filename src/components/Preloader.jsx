import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=loading, 1=text reveal, 2=fade out
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate towards end
        const increment = prev < 60 ? 3 : prev < 85 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Phase 1: Show tagline
      setTimeout(() => setPhase(1), 300);
      // Phase 2: Fade out
      setTimeout(() => setPhase(2), 1200);
      // Complete
      setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 1800);
    }
  }, [progress, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-700 ${
        phase === 2 ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#07130C' }}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(232,185,49,0.08) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo Container with Golden Ring */}
        <div className="relative">
          {/* Rotating golden ring */}
          <svg
            className="absolute -inset-4 animate-spin-slow"
            width="160"
            height="160"
            viewBox="0 0 160 160"
          >
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8B931" />
                <stop offset="50%" stopColor="#F5D060" />
                <stop offset="100%" stopColor="#D4A428" />
              </linearGradient>
            </defs>
            <circle
              cx="80"
              cy="80"
              r="76"
              fill="none"
              stroke="url(#goldGrad)"
              strokeWidth="1.5"
              strokeDasharray="120 360"
              strokeLinecap="round"
            />
          </svg>

          {/* Second ring - opposite rotation */}
          <svg
            className="absolute -inset-6"
            width="176"
            height="176"
            viewBox="0 0 176 176"
            style={{ animation: 'spinSlow 12s linear infinite reverse' }}
          >
            <circle
              cx="88"
              cy="88"
              r="84"
              fill="none"
              stroke="rgba(232,185,49,0.15)"
              strokeWidth="0.5"
              strokeDasharray="80 400"
            />
          </svg>

          {/* Logo */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#E8B931] shadow-lg"
               style={{ boxShadow: '0 0 40px rgba(232,185,49,0.2)' }}>
            <img
              src="/logo.jpg"
              alt="Creamery Café"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Brand Text */}
        <div className="text-center">
          <h1 className="font-cinzel text-2xl tracking-[0.3em] text-gold-gradient font-bold">
            CREAMERY
          </h1>
          <div
            className={`mt-1 overflow-hidden transition-all duration-500 ${
              phase >= 1 ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-xs tracking-[0.4em] uppercase font-light"
               style={{ color: 'var(--text-sub)' }}>
              The Gold Standard in Milkshakes
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-48 relative">
          <div className="h-[2px] bg-[rgba(232,185,49,0.1)] rounded-full overflow-hidden">
            <div
              className="h-full preloader-bar rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center mt-3 text-[11px] font-mono tracking-widest"
             style={{ color: 'var(--text-muted)' }}>
            {progress < 100 ? 'CRAFTING YOUR EXPERIENCE' : 'WELCOME'}
          </p>
        </div>
      </div>
    </div>
  );
}
