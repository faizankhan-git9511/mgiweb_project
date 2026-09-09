import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import workerService from '../../services/workerService';
import jobService from '../../services/jobService';
import { TRADE_CATEGORIES } from '../../constants/trades';
import { OPERATIONAL_CITIES } from '../../constants/cities';

const HomeMarketplace = () => {
  const [workers, setWorkers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [workerData, jobData] = await Promise.all([
        workerService.getWorkers(),
        jobService.getJobs()
      ]);
      setWorkers(workerData);
      setJobs(jobData);
    } catch (err) {
      console.error('Failed to load marketplace data:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#0f172a] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f97316]/20 border border-[#f97316]/40 text-[#f97316] font-bold text-xs uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#f97316] animate-ping"></span>
              India's #1 Grassroots Skilled Workforce Portal
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display leading-tight">
              Instant Verified Workers & Transparent Daily Wage Payouts
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Connect with Aadhaar-verified local carpenters, electricians, plumbers, and helpers. Track daily attendance with biometric roll calls and instant Khata clearance.
            </p>

            {/* Sunlight High Legibility Search Bar */}
            <div className="mt-8 bg-white p-2 rounded-full shadow-2xl flex flex-col sm:flex-row items-center gap-2 max-w-xl">
              <div className="flex-1 flex items-center px-4 gap-2 text-slate-800 w-full">
                <span className="material-symbols-outlined text-slate-400">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search trade skill (e.g. Carpenter, Electrician, Plumber)..."
                  className="w-full text-slate-900 placeholder-slate-400 font-medium focus:outline-none text-sm"
                />
              </div>
              <Link
                to={`/workers?skill=${encodeURIComponent(searchQuery)}`}
                className="w-full sm:w-auto px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold rounded-full text-sm shadow-md transition-colors text-center"
              >
                Find Workers
              </Link>
            </div>
          </div>

          {/* Quick Dual Pathway Card */}
          <div className="bg-white/10 backdrop-blur border border-white/20 p-8 rounded-3xl text-white">
            <h3 className="text-xl font-bold font-display mb-4">Select Your Goal Today</h3>
            <div className="space-y-4">
              <Link
                to="/jobs/post"
                className="flex items-center justify-between p-4 bg-white text-slate-900 rounded-2xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#f97316] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">person_add</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-base">I Want to Hire Workers (काम देना है)</h4>
                    <p className="text-xs text-slate-500">Post a job or hire skilled karigars directly</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">arrow_forward</span>
              </Link>

              <Link
                to="/workers"
                className="flex items-center justify-between p-4 bg-slate-800 text-white rounded-2xl hover:bg-slate-700 transition-colors border border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">engineering</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-base">I Want Work (काम चाहिए)</h4>
                    <p className="text-xs text-slate-400">Browse open requirements & daily wage gigs</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trade Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a] font-display">Popular Trade Categories</h2>
            <p className="text-sm text-slate-600">Select a trade to find ready-to-deploy verified karigars</p>
          </div>
          <Link to="/workers" className="text-sm font-bold text-[#f97316] hover:underline flex items-center gap-1">
            View All Categories
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {TRADE_CATEGORIES.filter(cat => cat.popular).map((cat) => (
            <Link
              key={cat.id}
              to={`/workers?category=${encodeURIComponent(cat.name)}`}
              className="p-4 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#f97316] transition-all text-center flex flex-col items-center group relative overflow-hidden"
            >
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 ${
                cat.type.includes('Higher') 
                  ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {cat.type}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0f172a] group-hover:bg-[#f97316] group-hover:text-white transition-colors flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#f97316] transition-colors line-clamp-1">{cat.name}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Verified Workers Feed */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
                Available Today (आज खाली हैं)
              </span>
              <h2 className="text-2xl font-bold text-[#0f172a] font-display mt-2">Verified Local Workers</h2>
            </div>
            <Link to="/workers" className="text-sm font-bold text-[#f97316] hover:underline">
              Explore All Workers ({workers.length})
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.slice(0, 3).map((w) => (
              <div key={w.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <img
                    src={w.user?.avatarUrl || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80"}
                    alt={w.user?.fullName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#f97316]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-slate-900 font-display">{w.user?.fullName}</h3>
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        ★ {w.rating}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#f97316]">{w.tradeSkill}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{w.location || 'Mumbai'}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-4 line-clamp-2">{w.bio}</p>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Daily Wage Rate</span>
                    <span className="text-lg font-extrabold text-[#0f172a]">₹{w.dailyWageRate}<span className="text-xs text-slate-500 font-normal">/day</span></span>
                  </div>
                  <Link
                    to={`/workers/${w.id}`}
                    className="px-4 py-2 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-xs rounded-full shadow transition-colors"
                  >
                    View & Hire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available in Major Cities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
              Pan-India City Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display mt-2">
              Available Across Major Cities in India
            </h2>
            <p className="text-sm text-slate-600">
              Deploy verified local karigars instantly in your city
            </p>
          </div>
          <Link to="/about" className="text-sm font-bold text-[#f97316] hover:underline mt-2 sm:mt-0 flex items-center gap-1">
            Explore All 10+ Cities
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {OPERATIONAL_CITIES.slice(0, 6).map((city) => (
            <Link
              key={city.id}
              to={`/workers?location=${encodeURIComponent(city.name)}`}
              className="p-4 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#f97316] transition-all text-center flex flex-col items-center group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0f172a] group-hover:bg-[#f97316] group-hover:text-white transition-colors flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-2xl">{city.icon}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#f97316] transition-colors">{city.name}</h3>
              <p className="text-[11px] text-emerald-600 font-bold mt-0.5">{city.activeWorkersCount} Karigars</p>
            </Link>
          ))}
        </div>
      </section>

      {/* About Us & Founder Spotlight Section */}
      <section className="bg-[#0f172a] text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-8 sm:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Founder Avatar & Badge */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                  alt="Faizan Khan - Founder & CEO"
                  className="w-40 h-40 rounded-full object-cover border-4 border-[#f97316] shadow-xl"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#f97316] text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow">
                  Founder & CEO
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-white mt-5">Faizan Khan</h3>
              <p className="text-xs text-slate-400 font-medium">Founder & Architect of KaamChahiye.com</p>
            </div>

            {/* About Us Story */}
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 bg-[#f97316]/20 text-[#f97316] border border-[#f97316]/30 text-xs font-bold rounded-full uppercase">
                About KaamChahiye.com
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
                Empowering India's Unorganized Daily Wage Workforce
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Founded by <strong className="text-white">Faizan Khan</strong>, KaamChahiye.com is built on the core mission of providing digital identity, biometric muster rolls, and transparent daily Khata passbooks for skilled daily wage workers across India.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <Link
                  to="/about"
                  className="px-6 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-xs rounded-full shadow transition-colors inline-flex items-center gap-1.5"
                >
                  Read Our Full Story
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <span className="text-xs text-slate-400">Verified by Aadhaar Security Protocols</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeMarketplace;
