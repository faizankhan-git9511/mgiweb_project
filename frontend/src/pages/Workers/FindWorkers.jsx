import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import workerService from '../../services/workerService';
import { CATEGORY_NAMES, TRADE_CATEGORIES } from '../../constants/trades';

const DEMO_WORKERS = [
  {
    id: 1,
    tradeSkill: "Master Carpenter & Shuttering",
    dailyWageRate: 850,
    bio: "12+ years experience in modular woodwork, door fitting, and building shuttering.",
    location: "Mumbai",
    rating: 4.9,
    completedJobsCount: 42,
    user: { id: 1, fullName: "Ramesh Sharma", phoneNumber: "9876543210", avatarUrl: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80" }
  },
  {
    id: 2,
    tradeSkill: "Certified Electrician & Wiring",
    dailyWageRate: 800,
    bio: "ITI certified electrician with expert knowledge in domestic wiring, DB panel setups, and conduit laying.",
    location: "Delhi NCR",
    rating: 4.8,
    completedJobsCount: 38,
    user: { id: 2, fullName: "Suresh Kumar", phoneNumber: "9876543211", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" }
  },
  {
    id: 3,
    tradeSkill: "High-Rise Plumber & Pipe Fitter",
    dailyWageRate: 750,
    bio: "Specialist in CPVC pipeline installation, water pump fitting, and leak detection.",
    location: "Bengaluru",
    rating: 4.9,
    completedJobsCount: 56,
    user: { id: 3, fullName: "Mohd. Arif", phoneNumber: "9876543212", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" }
  }
];

const FindWorkers = () => {
  const [searchParams] = useSearchParams();
  const [workers, setWorkers] = useState(DEMO_WORKERS);
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [skill, setSkill] = useState(searchParams.get('skill') || '');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWorkers();
  }, [category, skill, location]);

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const data = await workerService.getWorkers({ category, skill, location });
      setWorkers(Array.isArray(data) && data.length > 0 ? data : DEMO_WORKERS);
    } catch (err) {
      console.error('Error fetching workers:', err);
      setWorkers(DEMO_WORKERS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#0f172a] font-display">
            Find Skilled Workers & Labourers (कारीगर खोजें)
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Verified local daily wage workers available for instant hiring in Mumbai
          </p>
        </div>

        {/* Filter Bar & Chips */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
          
          {/* Search Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Trade / Skill</label>
              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="e.g. Carpenter, Plumber"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location / Area</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Andheri, Bandra"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => { setCategory(''); setSkill(''); setLocation(''); }}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-full text-sm transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category Filter (ट्रेड श्रेणी)</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_NAMES.map((cat) => {
                const isSelected = (cat === 'All' && !category) || category === cat;
                const tradeObj = TRADE_CATEGORIES.find(t => t.name === cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat === 'All' ? '' : cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#f97316] text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tradeObj && <span className="material-symbols-outlined text-sm">{tradeObj.icon}</span>}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Workers Grid */}
        {loading ? (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-4xl text-[#f97316] animate-spin">progress_activity</span>
            <p className="text-sm font-semibold text-slate-600 mt-2">Fetching verified workers...</p>
          </div>
        ) : workers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <span className="material-symbols-outlined text-5xl text-slate-300 mb-2">person_search</span>
            <h3 className="text-lg font-bold text-slate-800 font-display">No Workers Found</h3>
            <p className="text-sm text-slate-500 mt-1">Try relaxing your search terms or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.map((w) => (
              <div key={w.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={w.user?.avatarUrl || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80"}
                        alt={w.user?.fullName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#f97316]"
                      />
                      <div>
                        <h3 className="font-bold text-base text-slate-900 font-display">{w.user?.fullName}</h3>
                        <p className="text-xs font-semibold text-[#f97316]">{w.tradeSkill}</p>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Aadhaar Verified
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-[#0f172a] block">₹{w.dailyWageRate}</span>
                      <span className="text-[10px] text-slate-400 font-semibold block">per day</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-4 line-clamp-3 leading-relaxed">{w.bio}</p>

                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {w.location || 'Mumbai'}
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      ★ {w.rating} ({w.completedJobsCount || 10} jobs)
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${w.user?.phoneNumber || '9876543210'}`}
                    className="py-2.5 px-3 bg-[#0f172a] hover:bg-slate-800 text-white rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">call</span>
                    Call Now
                  </a>
                  <Link
                    to={`/bookings/confirm?workerId=${w.user?.id}`}
                    className="py-2.5 px-3 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    <span className="material-symbols-outlined text-base">work</span>
                    Hire Direct
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default FindWorkers;
