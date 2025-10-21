import React from 'react';

const History = ({ vibeHistory = [], isDarkMode }) => {
  const containerClass = isDarkMode
    ? 'bg-gray-800 border border-gray-700'
    : 'bg-white border border-gray-300 shadow';

  const dividerClass = isDarkMode ? 'divide-gray-700' : 'divide-gray-200';
  const titleClass = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const metaClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`p-4 rounded-xl ${containerClass}`}>
      <h3 className="text-sm font-medium uppercase tracking-widest text-indigo-400 mb-3">
        Vibe History
      </h3>

      <div className="max-h-64 overflow-y-auto pr-1">
        {vibeHistory.length === 0 ? (
          <p className="text-sm text-gray-500">No completed vibes yet.</p>
        ) : (
          <ul className={`divide-y ${dividerClass}`}>
            {vibeHistory.map((item) => (
              <li key={item.id + (item.completedAt || '')} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <p className={`text-sm font-semibold truncate ${titleClass}`}>{item.title || 'Untitled Task'}</p>
                  <span className={`text-xs whitespace-nowrap ${metaClass}`}>
                    {item.completedAt ? new Date(item.completedAt).toLocaleString() : ''}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;
