import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import jobService from '../../services/jobService';
import { TRADE_CATEGORIES } from '../../constants/trades';

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Carpentry');
  const [tradeSkillRequired, setTradeSkillRequired] = useState('Master Carpenter');
  const [location, setLocation] = useState('Andheri West, Mumbai');
  const [dailyRate, setDailyRate] = useState('950');
  const [workerCountNeeded, setWorkerCountNeeded] = useState(2);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const employerId = user?.id || 3; // Fallback to demo employer if not signed in
      await jobService.createJob(employerId, {
        title,
        category,
        tradeSkillRequired,
        location,
        dailyRate: parseFloat(dailyRate),
        workerCountNeeded: parseInt(workerCountNeeded),
        description
      });
      navigate('/workers');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job requirement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md">
          
          <div className="mb-6">
            <span className="px-3 py-1 bg-[#f97316]/10 text-[#f97316] font-bold text-xs rounded-full uppercase">
              Employer Gateway (काम पोस्ट करें)
            </span>
            <h1 className="text-3xl font-extrabold text-[#0f172a] font-display mt-2">
              Post a Worker Requirement
            </h1>
            <p className="text-sm text-slate-600">
              Broadcast your daily wage job requirement to thousands of verified local karigars in your area.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-2xl border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Job Title (काम का शीर्षक)</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Kitchen Modular Fitting & Woodwork"
                className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Trade Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316] bg-white font-medium"
                >
                  {TRADE_CATEGORIES.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.label}) [{t.type}]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Skill Required</label>
                <input
                  type="text"
                  required
                  value={tradeSkillRequired}
                  onChange={(e) => setTradeSkillRequired(e.target.value)}
                  placeholder="e.g. Master Carpenter"
                  className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Site Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Andheri West"
                  className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Daily Wage Rate (₹)</label>
                <input
                  type="number"
                  required
                  value={dailyRate}
                  onChange={(e) => setDailyRate(e.target.value)}
                  placeholder="950"
                  className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Workers Needed</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={workerCountNeeded}
                  onChange={(e) => setWorkerCountNeeded(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Work Description & Notes</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe scope of work, working hours, and tools provided..."
                className="w-full px-4 py-3 border border-slate-300 rounded-2xl text-sm focus:ring-2 focus:ring-[#f97316]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold text-base rounded-full shadow-lg transition-colors"
            >
              {loading ? 'Publishing Requirement...' : 'Publish Job & Match Workers'}
            </button>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostJob;
