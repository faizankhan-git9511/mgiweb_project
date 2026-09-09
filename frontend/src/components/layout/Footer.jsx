import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#f97316] flex items-center justify-center text-white font-bold text-base">
                KC
              </div>
              <span className="font-bold text-xl text-white font-display">
                Kaam<span className="text-[#f97316]">Chahiye</span>.com
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Empowering India's grassroots daily wage workers and local employers with Aadhaar verification, automated muster rolls, and transparent daily Khata payouts.
            </p>
            <p className="text-xs text-slate-400 font-semibold mb-4">
              Founded & Designed by <strong className="text-white font-bold">Faizan Khan</strong> (CEO & Platform Architect).
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Aadhaar & Verification Compliant
            </span>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-200 uppercase tracking-wider mb-4 font-display">Company & Cities</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-[#f97316]">About Us & Founder</Link></li>
              <li><Link to="/about" className="hover:text-[#f97316]">Pan-India City Network</Link></li>
              <li><Link to="/workers?location=Mumbai" className="hover:text-[#f97316]">Mumbai Karigars</Link></li>
              <li><Link to="/workers?location=Delhi%20NCR" className="hover:text-[#f97316]">Delhi NCR Karigars</Link></li>
              <li><Link to="/workers?location=Bengaluru" className="hover:text-[#f97316]">Bengaluru Karigars</Link></li>
              <li><Link to="/workers?location=Pune" className="hover:text-[#f97316]">Pune Karigars</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-200 uppercase tracking-wider mb-4 font-display">For Employers & Workers</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/workers" className="hover:text-[#f97316]">Hire Verified Workers</Link></li>
              <li><Link to="/jobs/post" className="hover:text-[#f97316]">Post a Requirement</Link></li>
              <li><Link to="/khata" className="hover:text-[#f97316]">Daily Wage Passbook (Khata)</Link></li>
              <li><Link to="/attendance/muster-roll" className="hover:text-[#f97316]">Attendance Roll Call</Link></li>
              <li><Link to="/disputes" className="hover:text-[#f97316]">File Wage Grievance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-200 uppercase tracking-wider mb-4 font-display">Support & Helpline</h4>
            <p className="text-sm text-slate-400 mb-2">24/7 Toll-Free Bilingual Support:</p>
            <p className="text-lg font-bold text-[#f97316] mb-3">1800-123-KAAM (5226)</p>
            <p className="text-xs text-slate-500">Available in Hindi, English, Marathi, Gujarati, and Tamil.</p>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 KaamChahiye.com Technologies Pvt. Ltd. Founded by Faizan Khan. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link to="/about" className="hover:text-slate-300">About Us</Link>
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Aadhaar Security Protocol</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
