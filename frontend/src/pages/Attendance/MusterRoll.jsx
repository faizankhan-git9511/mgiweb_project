import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import attendanceService from '../../services/attendanceService';

const MusterRoll = () => {
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('2026-09-01');

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const data = await attendanceService.getAttendanceByDate(selectedDate);
      setAttendanceLogs(data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePunchAttendance = async (workerId, status) => {
    try {
      await attendanceService.recordAttendance({
        workerId,
        bookingId: 1,
        siteLocation: 'Andheri Site A',
        attendanceDate: selectedDate,
        status,
        checkInTime: '08:30 AM',
        checkOutTime: '05:30 PM',
        verificationMethod: 'MANUAL_SUPERVISOR'
      });
      fetchAttendance();
    } catch (err) {
      alert('Failed to update attendance status');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="px-3 py-1 bg-blue-100 text-blue-900 font-bold text-xs rounded-full uppercase">
              Site Attendance & Roll Call (मस्टर रोल)
            </span>
            <h1 className="text-3xl font-extrabold text-[#0f172a] font-display mt-2">
              Weekly Site Muster Roll & Roll-call Sheet
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase px-2">Select Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-900"
            />
          </div>
        </div>

        {/* Muster Roll Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          {loading ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-4xl text-[#f97316] animate-spin">progress_activity</span>
            </div>
          ) : attendanceLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-medium">
              No attendance records logged for {selectedDate}.
              <div className="mt-4">
                <button
                  onClick={() => handlePunchAttendance(1, 'PRESENT')}
                  className="px-6 py-2.5 bg-[#f97316] text-white font-bold text-xs rounded-full shadow"
                >
                  + Record Sample Roll Call for Suresh Patil
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                    <th className="py-3 px-4">Worker</th>
                    <th className="py-3 px-4">Site Location</th>
                    <th className="py-3 px-4">Check-in / Check-out</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Supervisor Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendanceLogs.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50">
                      <td className="py-4 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-3">
                          <img
                            src={a.worker?.avatarUrl || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80"}
                            alt={a.worker?.fullName}
                            className="w-8 h-8 rounded-full object-cover border border-[#f97316]"
                          />
                          <span>{a.worker?.fullName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 font-medium">{a.siteLocation}</td>
                      <td className="py-4 px-4 text-slate-800 font-bold">{a.checkInTime} - {a.checkOutTime}</td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">
                          {a.verificationMethod}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          a.status === 'PRESENT' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 flex gap-2">
                        <button
                          onClick={() => handlePunchAttendance(a.worker?.id || 1, 'PRESENT')}
                          className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full hover:bg-emerald-700"
                        >
                          P
                        </button>
                        <button
                          onClick={() => handlePunchAttendance(a.worker?.id || 1, 'ABSENT')}
                          className="px-3 py-1 bg-red-600 text-white font-bold text-xs rounded-full hover:bg-red-700"
                        >
                          A
                        </button>
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

export default MusterRoll;
