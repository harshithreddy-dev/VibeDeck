import React, { useState } from 'react';

const TaskList = ({ tasks, addTask, completeTask, isDarkMode }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskMinutes, setNewTaskMinutes] = useState('');

    const handleAddTask = () => {
        const minutes = parseInt(newTaskMinutes, 10);
        if (!Number.isFinite(minutes) || minutes <= 0) return; // require explicit positive minutes
        addTask(newTaskTitle, minutes);
        setNewTaskTitle('');
        setNewTaskMinutes('');
    };

    // Styling helpers
    const inputClass = isDarkMode 
        ? 'bg-gray-800 text-gray-100 border-gray-700' 
        : 'bg-white text-gray-900 border-gray-300';
    
    const baseCardClass = isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-300 shadow';

    return (
        <div className={`p-6 rounded-xl border transition-colors duration-300 ${baseCardClass} w-full`}>
            
            {/* --- 1. Vibes List (Newest first) --- */}
            <div className="mb-8" id="vibes-section">
                <h3 className="text-xl font-extrabold uppercase tracking-widest text-indigo-400 mb-4">
                    Your Vibes
                </h3>
                {tasks.length === 0 ? (
                    <p className="text-gray-500">No vibes yet. Add one below!</p>
                ) : (
                    <ul className="space-y-2">
                        {tasks.map(task => (
                            <li key={task.id} className="flex items-center justify-between gap-2 p-3 rounded-lg border border-gray-700 bg-indigo-900/20">
                                <span className="text-sm text-gray-200 truncate">
                                  {task.title} <span className="opacity-70">· {Math.round((task.durationSeconds || 0)/60)}m</span>
                                </span>
                                <button
                                  onClick={() => completeTask(task.id)}
                                  className="shrink-0 px-3 py-1 bg-green-500 text-white font-bold rounded-full text-xs hover:bg-green-600 transition-colors"
                                  title="Mark this task as completed"
                                >
                                  Vibe Check
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* --- 2. Add New Task Input --- */}
            <div className="mt-6 pt-6 border-t border-gray-700">
                <h4 className="text-sm font-medium uppercase text-gray-400 mb-2">New Vibe Task</h4>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                        placeholder="e.g., Implementing the Vibe Check logic"
                        className={`flex-1 p-3 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    <input
                        type="number"
                        min={1}
                        max={240}
                        value={newTaskMinutes}
                        onChange={(e) => setNewTaskMinutes(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                        placeholder="min (reqd)"
                        className={`w-24 p-3 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        title="Minutes"
                    />
                    <button
                        onClick={handleAddTask}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-bold hover:bg-indigo-600 transition-colors"
                    >
                        Add Vibe
                    </button>
                </div>
            </div>
            
            {/* --- 3. (Queue removed) --- */}
        </div>
    );
};

export default TaskList;