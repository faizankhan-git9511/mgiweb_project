import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import disputeService from '../../services/disputeService';

const DisputeRedressal = () => {
  const { user } = useAuth();
  const [disputes, setDisputes] = useState([]);
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [amountInDispute, setAmountInDispute] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDisputes();
  }, [user]);

  const fetchDisputes = async () => {
    setLoading(true);
    try {
      const workerId = user?.id || 1;
      const data = await disputeService.getDisputesByWorker(workerId);
      setDisputes(data);
    } catch (err) {
      console.error('Error loading disputes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRaiseDispute = async (e) => {
    e.preventDefault();
    try {
      const userId = user?.id || 1;
      await disputeService.raiseDispute(userId, {
        workerId: 1,
        employerId: 3,
        bookingId: 1,
        amountInDispute: parseFloat(amountInDispute),
        reason
      });
      setShowRaiseModal(false);
      setAmountInDispute('');
      setReason('');
      fetchDisputes();
    } catch (err) {
      alert('Failed to submit grievance');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="px-3 py-1 bg-red-100 text-red-900 font-bold text-xs rounded-full uppercase">
              Grassroots Grievance Cell (शिकायत निवारण)
            </span>
            <h1 className="text-3xl font-extrabold text-[#0f172a] font-display mt-2">
              Wage Dispute Redressal & Mediation
            </h1>
            <p className="text-sm text-slate-600">
              Legally binding dispute settlement for unpaid overtime, wage deductions, or booking cancellations.
            </p>
          </div>
          <button
            onClick={() => setShowRaiseModal(true)}
            className="px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold text-sm rounded-full shadow-lg transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">gavel</span>
            File New Wage Grievance
          </button>
        </div>

        {/* Disputes List */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          {loading ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-4xl text-[#f97316] animate-spin">progress_activity</span>
            </div>
          ) : disputes.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-medium">No active disputes on record.</div>
          ) : (
            <div className="space-y-4">
              {disputes.map((d) => (
                <div key={d.id} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-slate-900 text-base">Grievance #DSP-2026-{d.id}</span>
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                        {d.status}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 mt-2">Reason: {d.reason}</p>
                    <p className="text-xs text-slate-500 mt-1">Resolution Notes: {d.resolutionNotes || 'Under mediation review by contractor.'}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-bold block uppercase">Disputed Amount</span>
                    <span className="text-2xl font-extrabold text-red-600">₹{d.amountInDispute}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal for Filing Dispute */}
        {showRaiseModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 font-display">File Wage Grievance</h3>
                <button onClick={() => setShowRaiseModal(false)} className="text-slate-400 hover:text-slate-600">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleRaiseDispute} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Disputed Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={amountInDispute}
                    onChange={(e) => setAmountInDispute(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Grievance Reason / Details</label>
                  <textarea
                    rows="4"
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Describe unpaid overtime, improper deduction, or breach..."
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-2xl text-sm focus:ring-2 focus:ring-[#f97316]"
                  ></textarea>
                </div>

                <div className="pt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRaiseModal(false)}
                    className="w-1/2 py-3 bg-slate-100 text-slate-700 font-bold rounded-full text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 bg-[#f97316] text-white font-bold rounded-full text-sm hover:bg-[#ea580c]"
                  >
                    Submit Grievance
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default DisputeRedressal;
