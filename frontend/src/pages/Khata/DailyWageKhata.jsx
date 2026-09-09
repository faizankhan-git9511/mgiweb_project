import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import khataService from '../../services/khataService';

const DailyWageKhata = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('CASH_ADVANCE');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKhata();
  }, [user]);

  const fetchKhata = async () => {
    setLoading(true);
    try {
      const workerId = user?.id || 1;
      const data = await khataService.getWorkerKhata(workerId);
      setTransactions(data);
    } catch (err) {
      console.error('Error fetching Khata:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const workerId = user?.id || 1;
      const employerId = 3; // Demo employer
      await khataService.addTransaction({
        workerId,
        employerId,
        bookingId: 1,
        amount: parseFloat(amount),
        transactionType,
        notes
      });
      setShowAddModal(false);
      setAmount('');
      setNotes('');
      fetchKhata();
    } catch (err) {
      alert('Failed to add transaction entry');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full uppercase">
              Worker Daily Wage Khata & Passbook (खाता बही)
            </span>
            <h1 className="text-3xl font-extrabold text-[#0f172a] font-display mt-2">
              Daily Wage Ledger & Voucher Clearance
            </h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold text-sm rounded-full shadow-lg transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Add Cash / Wage Entry
          </button>
        </div>

        {/* Khata Transactions Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          {loading ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-4xl text-[#f97316] animate-spin">progress_activity</span>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-medium">No Khata transactions recorded yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Employer / Contractor</th>
                    <th className="py-3 px-4">Notes</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="py-4 px-4 font-bold text-slate-900">{t.transactionDate}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          t.transactionType === 'CASH_ADVANCE'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {t.transactionType}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-800">{t.employer?.fullName || 'Verma Builders'}</td>
                      <td className="py-4 px-4 text-slate-600">{t.notes || '-'}</td>
                      <td className={`py-4 px-4 font-extrabold text-base ${
                        t.transactionType === 'CASH_ADVANCE' ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        ₹{t.amount}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-full">
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal for Adding Cash Entry */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 font-display">Add Cash Entry (नकद प्रविष्टि)</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleAddTransaction} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Entry Type</label>
                  <select
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
                  >
                    <option value="CASH_ADVANCE">Cash Advance (अग्रिम राशि)</option>
                    <option value="WAGE_PAYMENT">Wage Payout (दैनिक मजदूरी भुगतान)</option>
                    <option value="BONUS">Bonus (बोनस)</option>
                    <option value="DEDUCTION">Deduction (कटौती)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Notes / Description</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Material advance"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
                  />
                </div>

                <div className="pt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 py-3 bg-slate-100 text-slate-700 font-bold rounded-full text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 bg-[#f97316] text-white font-bold rounded-full text-sm hover:bg-[#ea580c]"
                  >
                    Save Entry
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

export default DailyWageKhata;
