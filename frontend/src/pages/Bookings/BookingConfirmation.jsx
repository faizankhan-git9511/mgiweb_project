import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import workerService from '../../services/workerService';
import bookingService from '../../services/bookingService';

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const workerUserId = searchParams.get('workerId') || '1';
  const { user } = useAuth();
  const navigate = useNavigate();

  const [worker, setWorker] = useState(null);
  const [startDate, setStartDate] = useState('2026-09-10');
  const [endDate, setEndDate] = useState('2026-09-15');
  const [agreedRate, setAgreedRate] = useState('950');
  const [loading, setLoading] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);

  useEffect(() => {
    fetchWorker();
  }, [workerUserId]);

  const fetchWorker = async () => {
    try {
      const data = await workerService.getWorkerByUserId(workerUserId);
      setWorker(data);
      if (data.dailyWageRate) {
        setAgreedRate(data.dailyWageRate.toString());
      }
    } catch (err) {
      console.error('Failed to load worker for booking:', err);
    }
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const employerId = user?.id || 3;
      const res = await bookingService.createBooking(employerId, {
        workerId: parseInt(workerUserId),
        startDate,
        endDate,
        agreedDailyRate: parseFloat(agreedRate)
      });
      setSuccessBooking(res);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to confirm booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {successBooking ? (
          <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-xl text-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#0f172a] font-display">
              Booking Confirmed Successfully!
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              Booking ID: <span className="font-bold text-slate-900">#BK-2026-{successBooking.id}</span>
            </p>

            <div className="my-6 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-left max-w-md mx-auto space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Worker:</span>
                <span className="font-bold text-slate-900">{successBooking.worker?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Daily Rate:</span>
                <span className="font-bold text-[#f97316]">₹{successBooking.agreedDailyRate}/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Amount:</span>
                <span className="font-bold text-slate-900">₹{successBooking.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dates:</span>
                <span className="font-bold text-slate-900">{successBooking.startDate} to {successBooking.endDate}</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Link
                to="/dashboard/client"
                className="px-6 py-3 bg-[#0f172a] text-white font-bold rounded-full text-sm hover:bg-slate-800"
              >
                Go to Employer Dashboard
              </Link>
              <Link
                to="/khata"
                className="px-6 py-3 bg-[#f97316] text-white font-bold rounded-full text-sm hover:bg-[#ea580c]"
              >
                View Worker Khata
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md">
            
            <div className="mb-6 border-b border-slate-100 pb-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full uppercase">
                Direct Hire Contract (सुरक्षित बुकिंग)
              </span>
              <h1 className="text-3xl font-extrabold text-[#0f172a] font-display mt-2">
                Confirm Worker Booking & Wage Lock
              </h1>
            </div>

            {worker && (
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                <img
                  src={worker.user?.avatarUrl || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80"}
                  alt={worker.user?.fullName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#f97316]"
                />
                <div>
                  <h3 className="font-bold text-lg text-slate-900 font-display">{worker.user?.fullName}</h3>
                  <p className="text-xs font-semibold text-[#f97316]">{worker.tradeSkill}</p>
                  <p className="text-xs text-slate-500">{worker.location || 'Mumbai'}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleConfirmBooking} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Agreed Daily Wage Rate (₹/day)</label>
                <input
                  type="number"
                  required
                  value={agreedRate}
                  onChange={(e) => setAgreedRate(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
                />
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-amber-600">gavel</span>
                Wage agreement is legally protected under KaamChahiye Dispute Redressal Cell rules.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold text-base rounded-full shadow-lg transition-colors"
              >
                {loading ? 'Processing Booking...' : 'Confirm Booking & Lock Wage'}
              </button>
            </form>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
