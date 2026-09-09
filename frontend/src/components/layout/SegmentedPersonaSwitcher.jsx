import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SegmentedPersonaSwitcher = () => {
  const [activePersona, setActivePersona] = useState('hire'); // 'hire' | 'work'
  const navigate = useNavigate();

  const handleToggle = (persona) => {
    setActivePersona(persona);
    if (persona === 'work') {
      navigate('/dashboard/worker');
    } else {
      navigate('/workers');
    }
  };

  return (
    <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200">
      <button
        onClick={() => handleToggle('hire')}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
          activePersona === 'hire'
            ? 'bg-[#0f172a] text-white shadow-md'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base">person_search</span>
          Kaam Dena Hai (Hire)
        </span>
      </button>
      <button
        onClick={() => handleToggle('work')}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
          activePersona === 'work'
            ? 'bg-[#f97316] text-white shadow-md'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base">engineering</span>
          Kaam Chahiye (Work)
        </span>
      </button>
    </div>
  );
};

export default SegmentedPersonaSwitcher;
