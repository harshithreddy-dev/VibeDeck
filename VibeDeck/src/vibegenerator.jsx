// src/VibeGenerator.jsx
import React, { useState, useCallback, useEffect } from 'react';

const VibeGenerator = ({ isDarkMode, updateActiveTask }) => {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated API response based on input length
  const generateFakeResponse = useCallback((input) => {
    // This function convincingly simulates the API call and result
    const base = input.length > 20 ? input.substring(0, 20) : "Vibe Coding Tool";
    return {
      title: ` I Built ${base}... in 24 Hours!`,
      caption: `Tired of distractions? My new VibeDeck forces deep work. Code faster, focus harder. #VibeCoding`,
      tags: `${base.replace(/ /g, ', ')}, React, Tailwind, DeepWork, VibeCoding, Tech`,
    };
  }, []);

  useEffect(() => {
    try {
      const savedPrompt = window.localStorage.getItem('vibeGenPrompt');
      const savedResults = window.localStorage.getItem('vibeGenResults');
      if (savedPrompt) setPrompt(JSON.parse(savedPrompt));
      if (savedResults) setResults(JSON.parse(savedResults));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('vibeGenPrompt', JSON.stringify(prompt));
      window.localStorage.setItem('vibeGenResults', JSON.stringify(results));
    } catch {}
  }, [prompt, results]);

  const handleGenerate = () => {
    if (!prompt) return;

    setIsLoading(true);
    setResults(null);
    
    // 1. **Simulate API latency (crucial for a convincing demo)**
    setTimeout(() => {
      const newResults = generateFakeResponse(prompt);
      setResults(newResults);
      setIsLoading(false);
    }, 1500); // 1.5 second delay
  };

  const handleClear = () => {
    setPrompt('');
    setResults(null);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  const inputClass = isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700 focus:border-indigo-500' : 'bg-white text-gray-900 border-gray-300 focus:border-indigo-500';
  const buttonClass = 'px-4 py-2 bg-indigo-500 text-white rounded-lg font-bold hover:bg-indigo-600 transition-colors';
  const resultCardClass = isDarkMode ? 'bg-gray-800 p-4 rounded-lg shadow' : 'bg-white p-4 rounded-lg shadow';

  return (
    <div className="pt-12">
      <h3 className="text-xl font-extrabold uppercase tracking-widest text-indigo-400 mb-4">
        The Vibe Generator (AI Helper)
      </h3>
      
      {/* --- Prompt Input --- */}
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your content idea (e.g., 'React app for fitness tracking')"
        className={`w-full p-3 mb-4 rounded-lg transition duration-150 ease-in-out border ${inputClass}`}
        disabled={isLoading}
      />
      
      {/* --- Generate Button --- */}
      <div className="flex gap-3">
        <button 
          onClick={handleGenerate}
          className={`${buttonClass} flex-1 disabled:opacity-60`}
          disabled={isLoading || !prompt}
        >
          {isLoading ? 'GENERATING VIBE...' : 'GENERATE VIBE'}
        </button>
        <button 
          onClick={handleClear}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          disabled={isLoading}
        >
          CLEAR
        </button>
      </div>

      {/* --- Results Area --- */}
      {results && (
        <div className="mt-6 space-y-4">
          <div className={resultCardClass}>
            <p className="text-xs font-medium uppercase text-indigo-400">Video Title</p>
            <div className="flex items-start gap-2">
              <p className="font-semibold flex-1">{results.title}</p>
              <button
                onClick={() => copyToClipboard(results.title)}
                className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                Copy
              </button>
              <button
                onClick={() => typeof updateActiveTask === 'function' && updateActiveTask(results.title)}
                className={`text-xs px-2 py-1 rounded font-semibold ${isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
                title="Apply to active task"
              >
                Use Title
              </button>
            </div>
          </div>
          <div className={resultCardClass}>
            <p className="text-xs font-medium uppercase text-indigo-400">YouTube Hook / Caption</p>
            <div className="flex items-start gap-3">
              <p className="text-sm flex-1">{results.caption}</p>
              <button onClick={() => copyToClipboard(results.caption)} className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>Copy</button>
            </div>
          </div>
          <div className={resultCardClass}>
            <p className="text-xs font-medium uppercase text-indigo-400">Keyword Tags</p>
            <div className="flex items-start gap-3">
              <p className="text-sm opacity-80 flex-1">{results.tags}</p>
              <button onClick={() => copyToClipboard(results.tags)} className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>Copy</button>
            </div>
          </div>
        </div>
      )}
      
      <p className="text-xs opacity-60 mt-4">
        *Simulated Gemini API integration. Structure ready for real deployment.
      </p>
    </div>
  );
};

export default VibeGenerator;