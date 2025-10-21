import React from 'react';

const StatBox = ({ label, value }) => (
    <div className="p-3 text-center rounded-lg bg-gray-700/50">
        <div className="text-2xl font-extrabold text-indigo-400">{value}</div>
        <div className="text-xs font-medium uppercase tracking-widest text-gray-400">{label}</div>
    </div>
);

const ProfileCard = ({ profile, isDarkMode }) => {
    const cardClass = isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-300 shadow-xl';

    return (
        <div className={`p-6 rounded-xl border transition-colors duration-300 ${cardClass}`}>
            
            {/* --- Profile Header --- */}
            <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl">😎</span>
                <div className="flex-1">
                    <h2 className="text-lg font-bold">Vibe Coder Profile</h2>
                    <p className="text-sm text-gray-400">@{profile.name.toLowerCase().replace(/\s/g, '-')}</p>
                </div>
            </div>

            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-2 gap-3">
                <StatBox 
                    label="Vibes Done" 
                    value={profile.vibesCompleted} 
                />
                <StatBox 
                    label="Streak" 
                    value={`${profile.currentStreak} 🔥`} 
                />
            </div>
            
        </div>
    );
};

export default ProfileCard;