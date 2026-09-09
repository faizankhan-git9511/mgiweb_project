import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import bookingService from '../../services/bookingService';
import jobService from '../../services/jobService';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const employerId = user?.id || 3;
      const [bookingData, jobData] = await Promise.all([
        bookingService.getBookingsByEmployer(employerId),
        jobService.getJobsByEmployer(employerId)
      ]);
      setBookings(bookingData);
      setJobs(jobData);
    } catch (err) {
      console.error('Error loading client dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Welcome Banner */}
        <div className="bg-[#0f172a] text-white p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="px-3 py-1 bg-[#f97316] text-white text-xs font-bold rounded-full uppercase">
              Employer / Contractor Dashboard
            </span>
            <h1 className="text-3xl font-extrabold font-display mt-2">
              Welcome, {user?.fullName || 'Anil Sharma (Verma Builders)'}
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Manage your site active workers, daily attendance roll calls, and Khata cash approvals.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/jobs/post"
              className="px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold rounded-full text-sm shadow transition-colors"
            >
              + Post New Job
            </Link>
            <Link
              to="/cash-approval"
              className="px-6 py-3 bg-white text-slate-900 font-bold rounded-full text-sm hover:bg-slate-100 transition-colors"
            >
              Cash Approvals
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Site Bookings</span>
            <span className="text-3xl font-extrabold text-[#0f172a] mt-1 block">{bookings.length}</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Posted Requirements</span>
            <span className="text-3xl font-extrabold text-[#f97316] mt-1 block">{jobs.length}</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Wage Payout</span>
            <span className="text-3xl font-extrabold text-emerald-600 mt-1 block">₹6,650</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Open Disputes</span>
            <span className="text-3xl font-extrabold text-amber-500 mt-1 block">1</span>
          </div>
        </div>

        {/* Bookings & Active Workers Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#0f172a] font-display">Active Site Bookings & Workers</h2>
            <Link to="/attendance/muster-roll" className="text-sm font-bold text-[#f97316] hover:underline">
              View Muster Roll
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-3xl text-[#f97316] animate-spin">progress_activity</span>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">No active bookings yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                    <th className="py-3 px-4">Booking ID</th>
                    <th className="py-3 px-4">Worker Name</th>
                    <th className="py-3 px-4">Daily Rate</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="py-4 px-4 font-bold text-slate-900">#BK-2026-{b.id}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.worker?.avatarUrl || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80"}
                            alt={b.worker?.fullName}
                            className="w-8 h-8 rounded-full object-cover border border-[#f97316]"
                          />
                          <span className="font-bold text-slate-800">{b.worker?.fullName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-[#f97316]">₹{b.agreedDailyRate}/day</td>
                      <td className="py-4 px-4 font-extrabold text-slate-900">₹{b.totalAmount}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
                          {b.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Link
                          to="/khata"
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-full shadow"
                        >
                          View Khata
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ClientDashboard;
