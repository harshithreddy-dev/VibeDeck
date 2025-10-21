// src/VibeGenerator.jsx
import React, { useState, useCallback } from 'react';

const VibeGenerator = ({ isDarkMode }) => {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated API response based on input length
  const generateFakeResponse = useCallback((input) => {
    // This function convincingly simulates the API call and result
    const base = input.length > 20 ? input.substring(0, 20) : "Vibe Coding Tool";
    return {
      title: `🔥 I Built ${base}... in 24 Hours!`,
      caption: `Tired of distractions? My new VibeDeck forces deep work. Code faster, focus harder. #VibeCoding`,
      tags: `${base.replace(/ /g, ', ')}, React, Tailwind, DeepWork, VibeCoding, Tech`,
    };
  }, []);

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
      <button 
        onClick={handleGenerate}
        className={`${buttonClass} w-full`}
        disabled={isLoading}
      >
        {isLoading ? 'GENERATING VIBE...' : 'GENERATE VIBE'}
      </button>

      {/* --- Results Area --- */}
      {results && (
        <div className="mt-6 space-y-4">
          <div className={resultCardClass}>
            <p className="text-xs font-medium uppercase text-indigo-400">Video Title</p>
            <p className="font-semibold">{results.title}</p>
          </div>
          <div className={resultCardClass}>
            <p className="text-xs font-medium uppercase text-indigo-400">YouTube Hook / Caption</p>
            <p className="text-sm">{results.caption}</p>
          </div>
          <div className={resultCardClass}>
            <p className="text-xs font-medium uppercase text-indigo-400">Keyword Tags</p>
            <p className="text-sm opacity-80">{results.tags}</p>
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