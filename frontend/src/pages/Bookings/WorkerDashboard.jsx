import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import workerService from '../../services/workerService';
import bookingService from '../../services/bookingService';

const WorkerDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [availability, setAvailability] = useState('AVAILABLE');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkerData();
  }, [user]);

  const fetchWorkerData = async () => {
    setLoading(true);
    try {
      const workerUserId = user?.id || 1;
      const [profData, bookData] = await Promise.all([
        workerService.getWorkerByUserId(workerUserId),
        bookingService.getBookingsByWorker(workerUserId)
      ]);
      setProfile(profData);
      setBookings(bookData);
      setAvailability(profData.availabilityStatus || 'AVAILABLE');
    } catch (err) {
      console.error('Error fetching worker dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (newStatus) => {
    setAvailability(newStatus);
    try {
      const workerUserId = user?.id || 1;
      await workerService.updateAvailability(workerUserId, newStatus);
    } catch (err) {
      console.error('Failed to update availability status:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Worker Header & Availability Toggle */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <img
                src={user?.avatarUrl || profile?.user?.avatarUrl || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80"}
                alt={user?.fullName}
                className="w-20 h-20 rounded-full object-cover border-4 border-[#f97316]"
              />
              <div>
                <h1 className="text-2xl font-extrabold text-[#0f172a] font-display">
                  {user?.fullName || profile?.user?.fullName || 'Suresh Patil'}
                </h1>
                <p className="text-sm font-bold text-[#f97316]">
                  {profile?.tradeSkill || 'Master Carpenter (राजमिस्त्री/कारपेंटर)'}
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200 mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Aadhaar Verified Worker
                </span>
              </div>
            </div>

            {/* Availability Pill Selector */}
            <div className="bg-slate-100 p-2 rounded-2xl border border-slate-200 w-full md:w-auto">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 px-2">Work Availability Status</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleAvailability('AVAILABLE')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    availability === 'AVAILABLE'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Available Today (आज खाली हैं)
                </button>
                <button
                  onClick={() => handleToggleAvailability('ON_JOB')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    availability === 'ON_JOB'
                      ? 'bg-[#0f172a] text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  On Job (काम पर हैं)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Weekly Earnings</span>
            <span className="text-3xl font-extrabold text-emerald-600 mt-1 block">₹6,650</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Agreed Daily Rate</span>
            <span className="text-3xl font-extrabold text-[#f97316] mt-1 block">₹{profile?.dailyWageRate || '950'}/day</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Completed Assignments</span>
            <span className="text-3xl font-extrabold text-[#0f172a] mt-1 block">{profile?.completedJobsCount || 142}</span>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link
            to="/khata"
            className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:border-[#f97316] transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#f97316]/10 text-[#f97316] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Wage Khata & Passbook</h4>
                <p className="text-xs text-slate-500">Track advances & payments</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </Link>

          <Link
            to="/attendance/muster-roll"
            className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:border-[#f97316] transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">badge</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Site Roll Call</h4>
                <p className="text-xs text-slate-500">Punch daily attendance</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </Link>

          <Link
            to="/disputes"
            className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:border-[#f97316] transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">gavel</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Wage Grievance Cell</h4>
                <p className="text-xs text-slate-500">File wage disputes</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default WorkerDashboard;
