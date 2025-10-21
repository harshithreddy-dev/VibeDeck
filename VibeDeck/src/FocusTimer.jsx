// src/FocusTimer.jsx
import React, { useState, useEffect } from 'react';

// Configuration
const SHORT_BREAK_SECONDS = 5 * 60;  // 5 minutes

// Motivational quotes for countdown overlay
const QUOTES = [
  'Small steps, big gains.',
  'Deep work starts now.',
  'One focus, one win.',
  'You got this.',
  'Ship it with focus.',
  'Make it count.',
  'Trust the process.',
];

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const FocusTimer = ({
  isDarkMode,
  activeTask,
  plannedSeconds,
  onComplete,
  onTimesUp,
  onRequireTasks,
  onEnterDeepVibe,
  isDeepVibe,
  onExitDeepVibe,
  tasks = [],
  completeTask,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'
  const [preCountdown, setPreCountdown] = useState(0); // 0 means not counting down
  const [countdownQuote, setCountdownQuote] = useState('');
  const [requireMsg, setRequireMsg] = useState('');
  const [deepQuote, setDeepQuote] = useState('');

  const effectiveFocusDuration = (plannedSeconds && plannedSeconds > 0) ? plannedSeconds : 0;

  // --- Core Timer Logic ---
  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    } else if (isActive && secondsLeft === 0) {
      // Focus finished
      const shouldRecommendBreak = (mode === 'focus') && (effectiveFocusDuration >= 25 * 60);
      if (mode === 'focus') {
        if (typeof onComplete === 'function' && activeTask && activeTask.id) {
          try { onComplete(activeTask.id); } catch {}
        }
        if (typeof onTimesUp === 'function') {
          try { onTimesUp(); } catch {}
        }
      }
      const newMode = (mode === 'focus' && shouldRecommendBreak) ? 'break' : 'focus';
      const newTime = (mode === 'focus' && shouldRecommendBreak) ? SHORT_BREAK_SECONDS : 0;
      setMode(newMode);
      setSecondsLeft(newTime);
      setIsActive(false);
    }
    return () => interval && clearInterval(interval);
  }, [isActive, secondsLeft, mode, effectiveFocusDuration, activeTask, onComplete, onTimesUp]);

  // Sync to plannedSeconds when idle on focus
  useEffect(() => {
    if (!isActive && mode === 'focus') setSecondsLeft(effectiveFocusDuration);
  }, [effectiveFocusDuration, isActive, mode]);

  // Rotate quotes in Deep Vibe mode
  useEffect(() => {
    if (!isDeepVibe) return;
    setDeepQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    const id = setInterval(() => {
      setDeepQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, 7000);
    return () => clearInterval(id);
  }, [isDeepVibe]);

  const toggleTimer = () => {
    if (isActive) { setIsActive(false); return; }
    if (!effectiveFocusDuration || effectiveFocusDuration <= 0) {
      setRequireMsg('Add vibe');
      setTimeout(() => setRequireMsg(''), 2000);
      if (typeof onRequireTasks === 'function') { try { onRequireTasks(); } catch {} }
      return;
    }
    if (preCountdown > 0) return;
    setPreCountdown(3);
    setCountdownQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    const id = setInterval(() => {
      setPreCountdown((c) => {
        if (c <= 1) {
          clearInterval(id);
          setPreCountdown(0);
          setIsActive(true);
          return 0;
        }
        setCountdownQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
        return c - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('focus');
    setSecondsLeft(effectiveFocusDuration);
  };

  const buttonBase = 'px-6 py-3 rounded-full font-bold text-sm tracking-widest transition duration-300 transform hover:scale-[1.03] shadow-lg';
  const startButtonClass = isActive ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-indigo-500 text-white hover:bg-indigo-600';
  const resetButtonClass = isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  const timerTitle = mode === 'focus' ? `FOCUS VIBE (${formatTime(effectiveFocusDuration)})` : 'BREAK VIBE (5:00)';

return (
  <div className="flex flex-col items-center p-6 rounded-xl w-full max-w-md">
    <h2 className="text-xl font-extrabold uppercase tracking-widest mb-6 text-indigo-400">{timerTitle}</h2>
    
    {/* Timer Display */}
    <div className="text-9xl font-extrabold tabular-nums mb-8">
      {formatTime(secondsLeft)}
    </div>

    {/* Pre-start 3-2-1 Overlay */}
    {preCountdown > 0 && (
      <div className="fixed inset-0 z-[900] pointer-events-none">
        <div className={`${(preCountdown % 2 === 1) ? 'bg-white' : 'bg-gray-900'} w-full h-full flex flex-col items-center justify-center transition-colors duration-500`}>
          <div className={`text-[18vw] font-extrabold ${(preCountdown % 2 === 1) ? 'text-gray-900' : 'text-white'}`}>{preCountdown}</div>
          <div className={`mt-4 text-xl px-6 text-center ${(preCountdown % 2 === 1) ? 'text-gray-700' : 'text-gray-300'}`}>{countdownQuote}</div>
        </div>
      </div>
    )}

    {/* Controls */}
    <div className="flex space-x-4">
      {!isDeepVibe && (
        <>
          <button 
            onClick={toggleTimer} 
            className={`${buttonBase} ${startButtonClass}`}
          >
            {isActive ? 'PAUSE VIBE' : 'START FOCUS'}
          </button>
          <button 
            onClick={resetTimer} 
            className={`${buttonBase} ${resetButtonClass}`}
          >
            RESET
          </button>
          <button
            onClick={() => typeof onEnterDeepVibe === 'function' && effectiveFocusDuration > 0 && onEnterDeepVibe()}
            className={`${buttonBase} ${isDarkMode ? 'bg-amber-500 text-gray-900 hover:bg-amber-400' : 'bg-amber-400 text-gray-900 hover:bg-amber-300'}`}
            disabled={!effectiveFocusDuration}
            title="Enter Deep Vibe Mode"
          >
            Deep Vibe
          </button>
        </>
      )}
      {isDeepVibe && (
        <>
          <button 
            onClick={toggleTimer} 
            className={`${buttonBase} ${startButtonClass}`}
          >
            {isActive ? 'PAUSE VIBE' : 'RESUME VIBE'}
          </button>
          <button
            onClick={() => typeof onExitDeepVibe === 'function' && onExitDeepVibe()}
            className={`${buttonBase} ${isDarkMode ? 'bg-gray-100 text-gray-900 hover:bg-white' : 'bg-gray-900 text-white hover:bg-black'}`}
            title="Exit Deep Vibe"
          >
            Exit Deep Vibe
          </button>
        </>
      )}
    </div>
    {!!requireMsg && (
      <div className="mt-4 text-sm font-semibold px-3 py-2 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
        {requireMsg}
      </div>
    )}

    {/* Deep Vibe Fullscreen Layer */}
    {isDeepVibe && (
      <div className={`fixed inset-0 z-[950] ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} overflow-auto`}>
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm uppercase tracking-widest text-indigo-400 font-bold">Deep Vibe Mode</div>
            <div className="flex gap-3">
              <button 
                onClick={toggleTimer}
                className={`${buttonBase} ${startButtonClass}`}
              >
                {isActive ? 'PAUSE VIBE' : 'RESUME VIBE'}
              </button>
              <button 
                onClick={() => typeof onExitDeepVibe === 'function' && onExitDeepVibe()}
                className={`${buttonBase} ${isDarkMode ? 'bg-gray-100 text-gray-900 hover:bg-white' : 'bg-gray-900 text-white hover:bg-black'}`}
              >
                Exit Deep Vibe
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="text-9xl font-extrabold tabular-nums mb-4">{formatTime(secondsLeft)}</div>
              <div className="text-lg italic opacity-80 text-center max-w-2xl">{deepQuote}</div>
            </div>
            <div className="lg:col-span-5">
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <h3 className="text-sm font-medium uppercase tracking-widest text-indigo-400 mb-3">Your Vibes</h3>
                {(!tasks || tasks.length === 0) ? (
                  <p className="text-gray-500">No vibes in the list.</p>
                ) : (
                  <ul className="space-y-2">
                    {tasks.map(t => (
                      <li key={t.id} className={`flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-700/40 ${isDarkMode ? 'bg-gray-800/30' : 'bg-white'}`}>
                        <span className="text-sm truncate">
                          {t.title} <span className="opacity-70">· {Math.round((t.durationSeconds || 0)/60)}m</span>
                        </span>
                        <button
                          onClick={() => completeTask && completeTask(t.id)}
                          className="shrink-0 px-3 py-1 bg-green-500 text-white font-bold rounded-full text-xs hover:bg-green-600 transition-colors"
                        >
                          Vibe Check
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
};
export default FocusTimer;