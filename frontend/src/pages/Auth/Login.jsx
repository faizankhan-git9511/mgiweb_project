import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('WORKER');
  const [tradeSkill, setTradeSkill] = useState('Master Carpenter (राजमिस्त्री/कारपेंटर)');
  const [dailyWageRate, setDailyWageRate] = useState('950');
  const [error, setError] = useState('');

  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        await register({
          fullName,
          phoneNumber,
          password,
          role,
          tradeSkill,
          dailyWageRate: parseFloat(dailyWageRate) || 800,
          city: 'Mumbai'
        });
      } else {
        await login(phoneNumber, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f97316] text-white text-3xl font-extrabold shadow-lg mb-4">
          KC
        </div>
        <h2 className="text-3xl font-extrabold text-[#0f172a] font-display">
          Kaam<span className="text-[#f97316]">Chahiye</span>.com
        </h2>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          Grassroots Civic Worker Portal & Payout Clearance
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl sm:px-10 border border-slate-200">
          
          {/* Persona / Role Selector */}
          <div className="mb-6 text-center">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Your Role (आपकी भूमिका चुनें)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { key: 'WORKER', label: 'Worker / कारीगर', icon: 'engineering' },
                { key: 'EMPLOYER', label: 'Employer / मालिक', icon: 'person_search' },
                { key: 'CONTRACTOR', label: 'Contractor / ठेकेदार', icon: 'domain' },
                { key: 'SUPERVISOR', label: 'Supervisor', icon: 'badge' },
                { key: 'ADMIN', label: 'CEO / Admin', icon: 'admin_panel_settings' },
              ].map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRole(r.key)}
                  className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                    role === r.key
                      ? 'border-[#f97316] bg-[#f97316]/10 text-[#f97316] shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{r.icon}</span>
                  <span className="text-[11px]">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-2xl border border-red-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-slate-700">Full Name (पूरा नाम)</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Suresh Patil"
                  className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700">Phone Number (मोबाइल नंबर)</label>
              <div className="mt-1 relative rounded-full shadow-sm">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-sm font-bold text-slate-500">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="9876543210"
                  className="block w-full pl-14 pr-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f97316] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Password (पासवर्ड)</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] text-sm"
              />
            </div>

            {isSignUp && role === 'WORKER' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Trade / Skill</label>
                  <input
                    type="text"
                    value={tradeSkill}
                    onChange={(e) => setTradeSkill(e.target.value)}
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Daily Rate (₹/Day)</label>
                  <input
                    type="number"
                    value={dailyWageRate}
                    onChange={(e) => setDailyWageRate(e.target.value)}
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-full text-sm"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 px-6 border border-transparent rounded-full shadow-md text-base font-bold text-white bg-[#f97316] hover:bg-[#ea580c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f97316] transition-colors"
            >
              {loading ? 'Authenticating...' : isSignUp ? 'Create Account & Continue' : 'Sign In with OTP / Password'}
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Quick Demo Accounts (1-Click Login):</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-medium">
              <button
                type="button"
                onClick={() => { setPhoneNumber('9999999999'); setPassword('password123'); setRole('ADMIN'); }}
                className="p-2 bg-slate-900 text-white rounded-xl border border-slate-800 hover:border-[#f97316] text-left"
              >
                <p className="font-bold text-white flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#f97316]">admin_panel_settings</span>
                  Faizan Khan (CEO)
                </p>
                <p className="text-slate-400 text-[10px]">9999999999 / password123</p>
              </button>
              <button
                type="button"
                onClick={() => { setPhoneNumber('9876543210'); setPassword('password123'); setRole('WORKER'); }}
                className="p-2 bg-white rounded-xl border border-slate-200 hover:border-[#f97316] text-left"
              >
                <p className="font-bold text-slate-900">Suresh Patil (Worker)</p>
                <p className="text-slate-500 text-[10px]">9876543210 / password123</p>
              </button>
              <button
                type="button"
                onClick={() => { setPhoneNumber('9876543212'); setPassword('password123'); setRole('EMPLOYER'); }}
                className="p-2 bg-white rounded-xl border border-slate-200 hover:border-[#f97316] text-left"
              >
                <p className="font-bold text-slate-900">Anil Sharma (Employer)</p>
                <p className="text-slate-500 text-[10px]">9876543212 / password123</p>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm font-semibold text-[#f97316] hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'New to KaamChahiye? Register as Worker or Employer'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
