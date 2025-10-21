// src/VibeDeck.jsx
import ProfileCard from './ProfileCard';
import React, { useState, useEffect } from 'react';
import FocusTimer from './FocusTimer';
import VibeGenerator from './vibegenerator';
import TaskList from './TaskList';
import History from './History';
import ConfettiAnimation from './ConfettiAnimation';
// DeepVibeOverlay no longer used; deep mode is handled inside FocusTimer

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
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);
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

// Update active task title from generator
const updateActiveTask = (newTitle) => {
    setTasks(prev => prev.length ? [{ ...prev[0], title: newTitle }, ...prev.slice(1)] : prev);
};

const VibeDeck = () => {
  // 1. Local Storage for Task and Reference
  const [currentTask, setCurrentTask] = useLocalStorage('vibeDeckTask', '');
  const [vibeRef, setVibeRef] = useLocalStorage('vibeDeckRef', '');

  // 2. Simple State for Theme Toggle (Default to Dark Vibe)
  const [isDarkMode, setIsDarkMode] = useState(true);
  const themeClass = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900';
  const inputClass = isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700 focus:border-indigo-500' : 'bg-white text-gray-900 border-gray-300 focus:border-indigo-500';

  // 3. Dashboard state (moved inside component; hooks must run in components)
  const [tasks, setTasks] = useLocalStorage('vibeTasks', []);
  const [profile, setProfile] = useLocalStorage('vibeProfile', {
    name: 'Vibe Coder',
    vibesCompleted: 0,
    currentStreak: 0,
  });
  const [vibeHistory, setVibeHistory] = useLocalStorage('vibeHistory', []);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationVariant, setAnimationVariant] = useState('congrats');
  const [isDeepVibe, setIsDeepVibe] = useState(false);

  // Derive the active task (first in queue)
  const activeTask = tasks[0];
  const plannedTotalSeconds = tasks.reduce((sum, t) => sum + (t.durationSeconds || 0), 0);

  

  // src/VibeDeck.jsx (Inside the VibeDeck return statement)

// ... Theme and other logic ...
const addTask = (title, minutes = 25) => {
    if (!title?.trim()) return;
    const durationSeconds = Math.max(1, parseInt(minutes, 10) || 25) * 60;
    const newTask = {
        id: generateId(),
        title: title.trim(),
        durationSeconds,
        isActive: false,
        isCompleted: false,
        createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
};

// CRITICAL: The Vibe Check / Task Completion Logic
const completeTask = (taskId) => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const completedTask = tasks[taskIndex];

    // 1. Update Profile & Streak (Simplified daily streak logic)
    setProfile(prev => ({
        ...prev,
        vibesCompleted: prev.vibesCompleted + 1,
        // For a real app, streak logic is complex, but for demo:
        currentStreak: prev.currentStreak + 1, // Simply increment for demo
    }));

    // 2. Add to History
    setVibeHistory(prev => [
        { 
            ...completedTask, 
            isCompleted: true,
            completedAt: new Date().toISOString(),
        },
        ...prev
    ]);

    // 3. Remove the task from the active list
    setTasks(prev => prev.filter(t => t.id !== taskId));

    // Trigger completion animation overlay
    setAnimationVariant('congrats');
    setShowConfetti(true);
};

// Called by FocusTimer when focus session reaches 0
const handleTimesUp = () => {
    setAnimationVariant('timesup');
    setShowConfetti(true);
};

// Smooth scroll to the vibes section when timer requires tasks to start
const scrollToVibes = () => {
    const el = document.getElementById('vibes-section');
    if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${themeClass} font-sans`}>
        
        {/* --- Top Bar & Profile (IMPROVED) --- */}
        <div className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
            <h1 className="text-3xl font-extrabold tracking-tight text-indigo-500">VibeDeck.</h1>
            <div className="flex items-center space-x-4">
                <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-2 rounded-full transition duration-250 ${isDarkMode ? 'bg-gray-800 text-indigo-400 hover:bg-gray-700' : 'bg-white text-indigo-600 hover:bg-gray-100 shadow'}`}
                    title="Toggle Theme"
                >
                    {isDarkMode ? '🌞' : '🌙'}
                </button>
            </div>
        </div>

        {/* --- Dashboard Layout (Sidebar + Main Content) --- */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* --- Left Sidebar (Profile & History) --- */}
            <div className="lg:col-span-4 space-y-8">
                <ProfileCard profile={profile} isDarkMode={isDarkMode} />
                <History vibeHistory={vibeHistory} isDarkMode={isDarkMode} />
            </div>

            {/* --- Right Main Content (Timer, Task, Generator) --- */}
            <div className="lg:col-span-8 space-y-12">

                {/* Row 1: Focus Timer & Task List */}
                <div className="flex flex-col items-center">

                    {/* Single FocusTimer instance controls both normal and deep mode */}
                    <FocusTimer
                      isDarkMode={isDarkMode}
                      activeTask={activeTask}
                      plannedSeconds={plannedTotalSeconds}
                      onComplete={completeTask}
                      onTimesUp={handleTimesUp}
                      onRequireTasks={scrollToVibes}
                      onEnterDeepVibe={() => setIsDeepVibe(true)}
                      onExitDeepVibe={() => setIsDeepVibe(false)}
                      isDeepVibe={isDeepVibe}
                      tasks={tasks}
                      completeTask={completeTask}
                    />

                    {/* Task List */}
                    <TaskList 
                        tasks={tasks} 
                        addTask={addTask} 
                        completeTask={completeTask} 
                        isDarkMode={isDarkMode} 
                    />
                </div>

                {/* Row 2: Vibe Generator */}
                <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
                    <VibeGenerator isDarkMode={isDarkMode} updateActiveTask={updateActiveTask} />
                </div>
            </div>

        </div>
        {/* Global overlay animation */}
        <ConfettiAnimation isVisible={showConfetti} variant={animationVariant} onAutoHide={() => setShowConfetti(false)} />
    </div>
);
};

export default VibeDeck;