// src/FocusTimer.jsx
import React, { useState, useEffect } from 'react';

// Configuration
const FOCUS_TIME_SECONDS = 25 * 60; // 25 minutes
const SHORT_BREAK_SECONDS = 5 * 60;  // 5 minutes

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const FocusTimer = ({ isDarkMode }) => {
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_TIME_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'

  // --- Core Timer Logic using useEffect ---
  useEffect(() => {
    let interval = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      clearInterval(interval);
      // Logic to switch modes when timer hits 0
      const newMode = mode === 'focus' ? 'break' : 'focus';
      const newTime = newMode === 'focus' ? FOCUS_TIME_SECONDS : SHORT_BREAK_SECONDS;
      
      // Notify the user (optional: play a short sound for the demo)
      alert(`Time's up! Starting ${newMode} time.`);

      setMode(newMode);
      setSecondsLeft(newTime);
      setIsActive(false); // Optionally stop the timer after switching

    } else {
      clearInterval(interval);
    }
    
    // Cleanup function
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, mode]);
  // ----------------------------------------

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('focus');
    setSecondsLeft(FOCUS_TIME_SECONDS);
  };
  
  // Tailwind class adjustments for the 'Vibe'
  const buttonBase = 'px-6 py-3 rounded-full font-bold text-sm tracking-widest transition duration-300 transform hover:scale-[1.03] shadow-lg';
  const startButtonClass = isActive ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-indigo-500 text-white hover:bg-indigo-600';
  const resetButtonClass = isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  
  const timerTitle = mode === 'focus' ? 'FOCUS VIBE (25:00)' : 'BREAK VIBE (5:00)';

  return (
    <div className="flex flex-col items-center p-6 rounded-xl w-full max-w-md">
      <h2 className="text-xl font-extrabold uppercase tracking-widest mb-6 text-indigo-400">{timerTitle}</h2>
      
      {/* Timer Display */}
      <div className="text-9xl font-extrabold tabular-nums mb-8">
        {formatTime(secondsLeft)}
      </div>

      {/* Controls */}
      <div className="flex space-x-4">
        <button 
          onClick={toggleTimer} 
          className={`${buttonBase} ${startButtonClass}`}
        >
          {isActive ? 'PAUSE VIBE' : secondsLeft === FOCUS_TIME_SECONDS && mode === 'focus' ? 'START FOCUS' : 'RESUME VIBE'}
        </button>
        <button 
          onClick={resetTimer} 
          className={`${buttonBase} ${resetButtonClass}`}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;