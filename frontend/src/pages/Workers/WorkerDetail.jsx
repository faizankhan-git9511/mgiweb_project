import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import workerService from '../../services/workerService';

const WorkerDetail = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkerDetail();
  }, [id]);

  const fetchWorkerDetail = async () => {
    setLoading(true);
    try {
      const data = await workerService.getWorkerById(id);
      setWorker(data);
    } catch (err) {
      console.error('Failed to load worker detail:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <Navbar />
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-4xl text-[#f97316] animate-spin">progress_activity</span>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-xl font-bold text-slate-800 font-display">Worker Profile Not Found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Worker Header Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <img
                src={worker.user?.avatarUrl || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80"}
                alt={worker.user?.fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#f97316]"
              />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-extrabold text-[#0f172a] font-display">{worker.user?.fullName}</h1>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Available Today
                  </span>
                </div>
                <p className="text-base font-bold text-[#f97316] mt-0.5">{worker.tradeSkill}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {worker.location || 'Mumbai'} • {worker.experienceYears || 10}+ Years Experience
                </p>
              </div>
            </div>

            <div className="text-left md:text-right bg-slate-50 p-4 rounded-2xl border border-slate-200 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Daily Wage Rate</span>
              <span className="text-3xl font-extrabold text-[#0f172a]">₹{worker.dailyWageRate}<span className="text-sm font-normal text-slate-500">/day</span></span>
              <div className="mt-2 flex items-center gap-2">
                <Link
                  to={`/bookings/confirm?workerId=${worker.user?.id}`}
                  className="px-6 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold rounded-full text-sm shadow transition-colors text-center block w-full"
                >
                  Book / Hire Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Details & Verification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200">
              <h3 className="text-lg font-bold text-[#0f172a] font-display mb-3">About & Work Profile</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{worker.bio}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200">
              <h3 className="text-lg font-bold text-[#0f172a] font-display mb-4">Past Work Showcase & Skills</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Modular Kitchen Assembly', 'Timber Door Fitting', 'Plywood Partition', 'Wardrobe Framing', 'Furniture Repair', 'Laminate Pasting'].map((skill, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#f97316]">check_circle</span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200">
              <h3 className="text-base font-bold text-[#0f172a] font-display mb-4">Verification & Credentials</h3>
              <ul className="space-y-3 text-xs font-medium text-slate-700">
                <li className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="flex items-center gap-2 font-bold text-emerald-900">
                    <span className="material-symbols-outlined text-emerald-600">verified</span>
                    Aadhaar Identity
                  </span>
                  <span className="text-emerald-700 font-bold">Verified</span>
                </li>
                <li className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-500">star</span>
                    Overall Rating
                  </span>
                  <span className="font-bold text-amber-600">★ {worker.rating} / 5.0</span>
                </li>
                <li className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-500">work_history</span>
                    Completed Jobs
                  </span>
                  <span className="font-bold text-slate-900">{worker.completedJobsCount || 142} Jobs</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default WorkerDetail;
