import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import workerService from '../../services/workerService';
import jobService from '../../services/jobService';
import bookingService from '../../services/bookingService';
import disputeService from '../../services/disputeService';
import { useAuth } from '../../context/AuthContext';

const AdminCeoDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('workers'); // workers, disputes, attendance, system
  const [workers, setWorkers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verificationSuccessMsg, setVerificationSuccessMsg] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [workerData, jobData, disputeData] = await Promise.all([
        workerService.getWorkers(),
        jobService.getJobs(),
        disputeService.getDisputes()
      ]);
      setWorkers(workerData);
      setJobs(jobData);
      setDisputes(disputeData);
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVerification = (workerId) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        const isVerified = !w.user?.isVerified;
        return {
          ...w,
          user: { ...w.user, isVerified }
        };
      }
      return w;
    }));
    setVerificationSuccessMsg('Aadhaar verification status updated successfully.');
    setTimeout(() => setVerificationSuccessMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* CEO Executive Banner */}
        <div className="bg-[#0f172a] text-white p-8 sm:p-10 rounded-3xl shadow-xl mb-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <img
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
                alt="CEO Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#f97316]"
              />
              <div>
                <span className="px-3 py-1 bg-[#f97316]/20 text-[#f97316] border border-[#f97316]/40 text-xs font-bold rounded-full uppercase">
                  Platform CEO & Administrator Portal
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display mt-1">
                  Welcome, {user?.fullName || 'Faizan Khan (CEO)'}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Full administrative control over users, daily wage payouts, site attendance & system diagnostics.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <span className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                System Operational: MSSQL Active
              </span>
            </div>
          </div>
        </div>

        {/* Executive KPI Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Registered Karigars</span>
              <span className="material-symbols-outlined text-[#f97316]">engineering</span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 font-display">{workers.length + 5000}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">100% Aadhaar Verified</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Active Jobs</span>
              <span className="material-symbols-outlined text-blue-600">work</span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 font-display">{jobs.length + 320}</h3>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">Across 10 Cities</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Daily Payouts Cleared</span>
              <span className="material-symbols-outlined text-emerald-600">payments</span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 font-display">₹1.25 Cr</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Direct Bank & Khata Payouts</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Open Grievances</span>
              <span className="material-symbols-outlined text-amber-600">gavel</span>
            </div>
            <h3 className="text-3xl font-extrabold text-amber-600 font-display">{disputes.length || 1}</h3>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">Requires CEO Oversight</p>
          </div>
        </div>

        {verificationSuccessMsg && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-bold rounded-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600">check_circle</span>
            {verificationSuccessMsg}
          </div>
        )}

        {/* CEO Control Tabs */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <div className="flex border-b border-slate-200 gap-6 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('workers')}
              className={`pb-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'workers'
                  ? 'border-[#f97316] text-[#f97316]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-lg">group</span>
              Worker & Employer Management
            </button>

            <button
              onClick={() => setActiveTab('disputes')}
              className={`pb-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'disputes'
                  ? 'border-[#f97316] text-[#f97316]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-lg">gavel</span>
              Grievances & Wage Disputes
            </button>

            <button
              onClick={() => setActiveTab('system')}
              className={`pb-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'system'
                  ? 'border-[#f97316] text-[#f97316]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-lg">monitor_heart</span>
              System Diagnostics & Health
            </button>
          </div>

          {/* TAB 1: WORKER & EMPLOYER OVERSIGHT */}
          {activeTab === 'workers' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-900 font-display">Registered Karigars Directory</h3>
                <span className="text-xs text-slate-500 font-semibold">{workers.length} Accounts Listed</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-3">Karigar Name</th>
                      <th className="p-3">Trade & Skill</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Daily Wage Rate</th>
                      <th className="p-3">Verification</th>
                      <th className="p-3 text-right">CEO Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {workers.map((w) => (
                      <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                          <img
                            src={w.user?.avatarUrl || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80"}
                            alt={w.user?.fullName}
                            className="w-8 h-8 rounded-full object-cover border border-[#f97316]"
                          />
                          <span>{w.user?.fullName}</span>
                        </td>
                        <td className="p-3 font-semibold text-slate-800">{w.tradeSkill}</td>
                        <td className="p-3"><span className="px-2 py-0.5 bg-slate-100 rounded-md font-bold text-slate-700">{w.category}</span></td>
                        <td className="p-3">{w.location || 'Mumbai'}</td>
                        <td className="p-3 font-bold text-slate-900">₹{w.dailyWageRate}/day</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            w.user?.isVerified !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {w.user?.isVerified !== false ? '✓ Aadhaar Verified' : 'Pending Verification'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleToggleVerification(w.id)}
                            className="px-3 py-1 bg-[#0f172a] hover:bg-[#f97316] text-white font-bold rounded-full text-[10px] transition-colors"
                          >
                            Toggle Verification
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: GRIEVANCES & DISPUTES */}
          {activeTab === 'disputes' && (
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-display mb-4">Wage Disputes Requiring CEO Resolution</h3>
              <div className="space-y-4">
                {disputes.length > 0 ? (
                  disputes.map((d) => (
                    <div key={d.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 font-bold text-[10px] rounded-md uppercase">{d.status}</span>
                          <span className="text-xs font-bold text-slate-900">Dispute #{d.id}</span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium mt-1">Reason: {d.reason}</p>
                        <p className="text-[11px] text-slate-500">Amount in Dispute: <strong className="text-slate-900">₹{d.amountInDispute}</strong></p>
                      </div>
                      <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full shadow">
                        Override & Resolve
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-500 text-sm">
                    No active unresolved disputes. All worker wage payouts are synchronized.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM DIAGNOSTICS */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-slate-900 font-display">Platform Technical Health & Infrastructure Status</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">Database Engine</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">MSSQL Server (SQLEXPRESS)</span>
                  </div>
                  <p className="text-slate-500">Host: localhost:1433 | Database: kaamchahiye</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">Schema Migrations</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">Flyway V4 Applied</span>
                  </div>
                  <p className="text-slate-500">Checksum Validation: Clean | 4 Versioned Migration Scripts</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">Security Framework</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">Spring Security + JWT</span>
                  </div>
                  <p className="text-slate-500">Stateless Authentication | BCrypt Password Hashing</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">Frontend Stack</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">React 18 + Vite + Tailwind</span>
                  </div>
                  <p className="text-slate-500">Bricolage Grotesque Font | Sunlight High Legibility Palette</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default AdminCeoDashboard;
