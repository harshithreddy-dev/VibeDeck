import React, { useEffect, useMemo, useRef, useState } from 'react';

const EMOJIS_CONGRATS = ['✨', '🎉', '💥', '⭐', '🎊', '🌟', '🪩', '🎈'];
const EMOJIS_TIMEUP = ['⏰', '⌛', '🕒', '⭐', '✨'];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

const ConfettiAnimation = ({ isVisible, onAutoHide, variant = 'congrats' }) => {
  const [show, setShow] = useState(false);
  const hasPlayedRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isVisible && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      setShow(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShow(false);
        hasPlayedRef.current = false;
        if (typeof onAutoHide === 'function') onAutoHide();
      }, 2000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isVisible, onAutoHide]);

  const particles = useMemo(() => {
    const EMOJIS = variant === 'timesup' ? EMOJIS_TIMEUP : EMOJIS_CONGRATS;
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: `${randomBetween(5, 95)}%`,
      delay: `${randomBetween(0, 0.6)}s`,
      duration: `${randomBetween(1.2, 1.9)}s`,
      size: `${randomBetween(16, 28)}px`,
      rotate: `${randomBetween(-40, 40)}deg`,
    }));
  }, [show, variant]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none flex items-center justify-center">
      <style>
        {`
          @keyframes confettiFall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } }
          @keyframes popScale { 0% { transform: scale(0.6); opacity: 0; } 30% { transform: scale(1.1); opacity: 1; } 60% { transform: scale(1.0); } 100% { transform: scale(0.9); opacity: 0; } }
        `}
      </style>

      <div className="absolute inset-0 overflow-hidden">
        {particles.map(p => (
          <span
            key={p.id}
            className="absolute will-change-transform select-none"
            style={{
              left: p.left,
              top: '-5vh',
              fontSize: p.size,
              animation: `confettiFall ${p.duration} ease-in forwards`,
              animationDelay: p.delay,
              transform: `rotate(${p.rotate})`,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      <div className="relative">
        <div className={`rounded-full backdrop-blur-sm border flex items-center justify-center ${variant === 'timesup' ? 'bg-red-500/10 border-red-400/40' : 'bg-indigo-500/20 border-indigo-400/40'}`}>
          <span className="text-7xl">{variant === 'timesup' ? '⏰' : '✨'}</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-6xl ${variant === 'timesup' ? 'text-red-400/90' : 'text-indigo-400/90'}`} style={{ animation: 'popScale 1200ms ease-out forwards' }}>
            {variant === 'timesup' ? 'TIME\'S UP' : '✔'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfettiAnimation;
