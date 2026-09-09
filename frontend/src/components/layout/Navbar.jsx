import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SegmentedPersonaSwitcher from './SegmentedPersonaSwitcher';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              KC
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-[#0f172a] font-display">
                Kaam<span className="text-[#f97316]">Chahiye</span>
              </span>
              <span className="text-[10px] block text-slate-500 font-semibold uppercase tracking-wider -mt-1">
                Local Worker Marketplace
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-700">
            <Link to="/" className="hover:text-[#f97316] transition-colors">Home</Link>
            <Link to="/about" className="hover:text-[#f97316] transition-colors">About Us</Link>
            <Link to="/workers" className="hover:text-[#f97316] transition-colors">Find Workers</Link>
            <Link to="/jobs/post" className="hover:text-[#f97316] transition-colors">Post a Job</Link>
            <Link to="/khata" className="hover:text-[#f97316] transition-colors">Daily Khata</Link>
            <Link to="/attendance/muster-roll" className="hover:text-[#f97316] transition-colors">Muster Roll</Link>
            <Link to="/support" className="hover:text-[#f97316] transition-colors">Customer Desk</Link>
            <Link to="/chat" className="hover:text-[#f97316] transition-colors">In-app Chat</Link>
          </nav>
        </div>

        {/* Center Persona Switcher (Desktop) */}
        <div className="hidden md:block">
          <SegmentedPersonaSwitcher />
        </div>

        {/* Right Auth / Profile Controls */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link 
                to={user.role === 'ADMIN' ? '/dashboard/admin' : user.role === 'WORKER' ? '/dashboard/worker' : '/dashboard/client'} 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <img 
                  src={user.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"} 
                  alt={user.fullName} 
                  className="w-8 h-8 rounded-full object-cover border border-[#f97316]"
                />
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-none">{user.fullName}</p>
                  <p className="text-[10px] text-slate-500 font-semibold">{user.role}</p>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                title="Logout"
              >
                <span className="material-symbols-outlined text-xl">logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-bold text-white bg-[#f97316] hover:bg-[#ea580c] rounded-full shadow-md transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
