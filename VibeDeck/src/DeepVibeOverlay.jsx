import React, { useEffect, useState } from 'react';

const QUOTES = [
  'Protect this focus. Great things happen now.',
  'Silence the noise. Build the future.',
  'Momentum beats motivation. Keep moving.',
  'Tiny steps. Massive outcomes.',
  'Distraction-free is your superpower.',
];

const DeepVibeOverlay = ({
  isDarkMode,
  onClose,
  children, // Expect FocusTimer passed as child for a single source of truth
  tasks,
  completeTask,
}) => {
  const [quote, setQuote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  useEffect(() => {
    const id = setInterval(() => {
      setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const shellClass = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900';
  const cardClass = isDarkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-200';

  return (
    <div className={`fixed inset-0 z-[1100] ${shellClass} flex flex-col`}>      
      <div className="flex items-center justify-between p-4 border-b border-gray-700/40">
        <div className="text-sm uppercase tracking-widest text-indigo-400 font-bold">Deep Vibe Mode</div>
        <button
          onClick={onClose}
          className={`px-3 py-1 rounded-full text-sm font-bold ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          title="Exit Deep Vibe"
        >
          Exit
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-auto">
        {/* Timer Column */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {children}
          <p className="mt-6 text-center text-lg italic opacity-80 max-w-2xl">{quote}</p>
        </div>

        {/* Tasks Column */}
        <div className="lg:col-span-5">
          <div className={`p-4 rounded-xl border ${cardClass}`}>
            <h3 className="text-sm font-medium uppercase tracking-widest text-indigo-400 mb-3">Your Vibes</h3>
            {(!tasks || tasks.length === 0) ? (
              <p className="text-gray-500">No vibes in the list. Add some to plan your focus.</p>
            ) : (
              <ul className="space-y-2">
                {tasks.map(t => (
                  <li key={t.id} className="flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-700/40 bg-gray-800/30">
                    <span className="text-sm truncate">
                      {t.title} <span className="opacity-70">· {Math.round((t.durationSeconds || 0)/60)}m</span>
                    </span>
                    <button
                      onClick={() => completeTask(t.id)}
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
  );
};

export default DeepVibeOverlay;
