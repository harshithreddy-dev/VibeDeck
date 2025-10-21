// src/VibeDeck.jsx
import React, { useState, useEffect } from 'react';
import FocusTimer from './FocusTimer';
import VibeGenerator from './vibegenerator';

// Stable, memoized input component to avoid remounting on each parent render
const TaskInput = React.memo(function TaskInput({ label, value, setter, placeholder, inputClass }) {
  return (
    <div className="mb-8">
      <label className="block text-xs font-medium uppercase tracking-widest text-indigo-400 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder={placeholder}
        className={`w-full p-3 rounded-lg shadow-inner transition duration-150 ease-in-out border ${inputClass}`}
      />
    </div>
  );
});

// Custom hook for localStorage persistence
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const VibeDeck = () => {
  // 1. Local Storage for Task and Reference
  const [currentTask, setCurrentTask] = useLocalStorage('vibeDeckTask', '');
  const [vibeRef, setVibeRef] = useLocalStorage('vibeDeckRef', '');

  // 2. Simple State for Theme Toggle (Default to Dark Vibe)
  const [isDarkMode, setIsDarkMode] = useState(true);
  const themeClass = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900';
  const inputClass = isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700 focus:border-indigo-500' : 'bg-white text-gray-900 border-gray-300 focus:border-indigo-500';

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${themeClass} font-sans`}>
      
      {/* --- Top Bar & Theme Toggle --- */}
      <div className="flex justify-between items-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-indigo-500">VibeDeck.</h1>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full transition duration-150 ${isDarkMode ? 'bg-gray-800 text-indigo-400 hover:bg-gray-700' : 'bg-white text-indigo-600 hover:bg-gray-100 shadow'}`}
          title="Toggle Theme"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        {/* --- Left Column: Timer & Main Task --- */}
        <div className="flex flex-col items-center">
          <FocusTimer isDarkMode={isDarkMode} />
          <div className="mt-12 w-full max-w-md">
             <TaskInput 
                label="The Single Task Slot (What I'm doing now)"
                value={currentTask}
                setter={setCurrentTask}
                placeholder="e.g., Scripting Vibe Coding Demo Video"
                inputClass={inputClass}
              />
          </div>
        </div>

        <div className="pt-2">
   <VibeGenerator isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default VibeDeck;