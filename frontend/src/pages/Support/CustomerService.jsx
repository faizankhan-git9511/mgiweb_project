import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { TRADE_CATEGORIES } from '../../constants/trades';

const CustomerService = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userRole, setUserRole] = useState('WORKER');
  const [issueType, setIssueType] = useState('Job Posting & Worker Hiring');
  const [tradeCategory, setTradeCategory] = useState('Carpentry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Support Header */}
        <div className="bg-[#0f172a] text-white p-8 sm:p-12 rounded-3xl shadow-xl mb-10 text-center relative overflow-hidden">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f97316]/20 border border-[#f97316]/40 text-[#f97316] font-bold text-xs uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse"></span>
            24/7 Grassroots Customer Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight max-w-3xl mx-auto">
            KaamChahiye Expert Support & Customer Service
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Connect directly with our local trade experts for help with job posting, biometric verification, Khata calculations, and wage clearance.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur border border-white/20 px-6 py-3 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined text-[#f97316] text-3xl">call</span>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase">24/7 Toll-Free Support</p>
                <p className="text-lg font-black text-white">1800-123-KAAM (5226)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Request Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-md">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-display">Callback Request Submitted!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong className="text-slate-900">{fullName}</strong>. A KaamChahiye Customer Service Expert will call you back on <strong className="text-[#f97316]">{phoneNumber}</strong> within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-[#f97316] text-white font-bold text-xs rounded-full shadow transition-colors mt-4"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="px-3 py-1 bg-orange-100 text-[#f97316] font-bold text-xs rounded-full uppercase">
                    Connect With An Expert
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#0f172a] font-display mt-2">
                    Request an Immediate Expert Callback
                  </h2>
                  <p className="text-xs text-slate-500">
                    Fill in your details below and our bilingual support team will call you back immediately.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Patil"
                      className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">I Am A</label>
                    <select
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316] bg-white font-medium"
                    >
                      <option value="WORKER">Worker / Karigar (काम चाहिए)</option>
                      <option value="EMPLOYER">Employer / House Owner (काम देना है)</option>
                      <option value="CONTRACTOR">Site Contractor / Supervisor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Trade Skill</label>
                    <select
                      value={tradeCategory}
                      onChange={(e) => setTradeCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316] bg-white font-medium"
                    >
                      {TRADE_CATEGORIES.map(t => (
                        <option key={t.id} value={t.name}>{t.name} ({t.label})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Help Required With</label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-full text-sm focus:ring-2 focus:ring-[#f97316] bg-white font-medium"
                  >
                    <option value="Job Posting & Worker Hiring">Job Posting & Worker Hiring Assistance</option>
                    <option value="Aadhaar KYC & Verification">Aadhaar KYC & Worker Profile Verification</option>
                    <option value="Daily Wage Khata Passbook">Daily Wage Khata & Passbook Receipts</option>
                    <option value="Biometric Attendance">Biometric Roll Call & Attendance Setup</option>
                    <option value="Wage Dispute Settlement">Wage Grievance & Dispute Redressal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Brief Description / Notes</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your site location or issue..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-2xl text-sm focus:ring-2 focus:ring-[#f97316]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold rounded-full text-sm shadow-md transition-colors text-center"
                >
                  Request Expert Callback Now
                </button>
              </form>
            )}
          </div>

          {/* Right Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <span className="material-symbols-outlined text-[#f97316] text-3xl mb-2">support_agent</span>
              <h3 className="font-bold text-lg text-slate-900 font-display">Bilingual Helpline Support</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Our support experts assist callers in <strong>Hindi, English, Marathi, Gujarati, and Tamil</strong> to guide illiterate or semi-skilled workers through Aadhaar verification and daily wage claims.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <span className="material-symbols-outlined text-emerald-600 text-3xl mb-2">shield</span>
              <h3 className="font-bold text-lg text-slate-900 font-display">Grievance Resolution Guarantee</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                All reported wage discrepancies are arbitrated directly by site supervisors and KaamChahiye support desk officers within 24 hours.
              </p>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md">
              <h3 className="font-bold text-base font-display">Platform Leadership Desk</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                KaamChahiye.com is overseen by <strong>Faizan Khan (Founder & CEO)</strong> to maintain complete transparency and worker dignity across India.
              </p>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default CustomerService;
