import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import platformService from '../../services/platformService';
import { OPERATIONAL_CITIES } from '../../constants/cities';

const AboutUs = () => {
  const [platformInfo, setPlatformInfo] = useState(null);

  useEffect(() => {
    loadPlatformInfo();
  }, []);

  const loadPlatformInfo = async () => {
    const data = await platformService.getPlatformInfo();
    setPlatformInfo(data);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#0f172a] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f97316]/20 border border-[#f97316]/40 text-[#f97316] font-bold text-xs uppercase tracking-wider mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] animate-pulse"></span>
            Empowering India's Grassroots Workforce
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display leading-tight max-w-4xl mx-auto">
            Dignity, Transparency & Aadhaar Trust for Every Karigar
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            KaamChahiye.com is India’s premier digital workplace & daily wage portal bridging local employers, site contractors, and skilled daily wage workers without middleman commissions.
          </p>
        </div>

        {/* Decorative Gradient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f97316]/10 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Founder & Leadership Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Founder Image & Badge */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-[#f97316] shadow-2xl bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                    alt="Faizan Khan - Founder & CEO"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#0f172a] text-white text-xs font-bold rounded-full border border-slate-700 shadow-md whitespace-nowrap">
                  Founder & CEO
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#0f172a] font-display mt-8">Faizan Khan</h2>
              <p className="text-sm font-bold text-[#f97316]">Founder & Chief Executive Officer</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">KaamChahiye Technologies Pvt. Ltd.</p>
            </div>

            {/* Founder Message & Vision */}
            <div className="lg:col-span-7 space-y-6">
              <span className="px-3 py-1 bg-orange-100 text-[#f97316] text-xs font-bold rounded-full uppercase tracking-wider">
                Founder's Message
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display leading-snug">
                "Eliminating Middleman Exploitation & Ensuring Instant Daily Wage Security"
              </h3>
              
              <blockquote className="border-l-4 border-[#f97316] pl-4 italic text-slate-700 text-base leading-relaxed bg-slate-50 py-3 rounded-r-2xl">
                "{platformInfo?.founderQuote || 'Every skilled karigar in India deserves transparent daily payouts, Aadhaar-backed identity verification, and direct connection with employers without middleman exploitation.'}"
              </blockquote>

              <div className="text-sm text-slate-600 space-y-3 leading-relaxed font-normal">
                <p>
                  Founded by <strong className="text-slate-900">Faizan Khan</strong>, KaamChahiye.com was born out of a vision to transform India’s informal labour sector into an organized, tech-enabled ecosystem where carpenters, electricians, plumbers, masons, and welders can build verifiable work histories.
                </p>
                <p>
                  By introducing biometric roll-call muster rolls, digital Khata passbooks, and automated daily payouts, Faizan Khan and the KaamChahiye team are empowering millions of daily wage workers with financial inclusion and social dignity.
                </p>
              </div>

              {/* Stat Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <h4 className="text-2xl font-black text-[#0f172a] font-display">5,000+</h4>
                  <p className="text-xs text-slate-500 font-medium">Verified Karigars</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-[#f97316] font-display">₹1.2+ Cr</h4>
                  <p className="text-xs text-slate-500 font-medium">Daily Wage Payouts</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-[#0f172a] font-display">10+</h4>
                  <p className="text-xs text-slate-500 font-medium">Major Cities</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Platform Pillars */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#f97316] uppercase tracking-wider">How KaamChahiye Works</span>
            <h2 className="text-3xl font-extrabold text-[#0f172a] font-display mt-2">Built for Trust, Security & Efficiency</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#f97316] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display mb-2">Aadhaar & Biometric KYC</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every worker profile is cross-verified against Aadhaar ID records to eliminate fake identities and guarantee employer safety on site.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">payments</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display mb-2">Transparent Daily Khata</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Track daily wage calculations, cash advances, and end-of-week balance clearance with digital passbook receipts visible to both parties.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">gavel</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display mb-2">Grievance Redressal Cell</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                On-site supervisors and support desk mediate wage disputes within 24 hours, ensuring fair treatment for both workers and employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Cities Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
              Pan-India Network
            </span>
            <h2 className="text-3xl font-extrabold text-[#0f172a] font-display mt-3">
              Operational Across Major Cities in India
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select your city to browse active verified karigars available for instant hiring.
            </p>
          </div>
          <Link
            to="/workers"
            className="mt-4 md:mt-0 text-sm font-bold text-[#f97316] hover:underline flex items-center gap-1"
          >
            Explore All Cities & Workers
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OPERATIONAL_CITIES.map((city) => (
            <div key={city.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#f97316] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#f97316] text-2xl">{city.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 font-display leading-tight">{city.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{city.state}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-full">
                    {city.activeWorkersCount} Workers
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">{city.description}</p>
                
                {/* Popular Hubs */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Key Local Hubs:</span>
                  <div className="flex flex-wrap gap-1">
                    {city.hubs.slice(0, 3).map((hub, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 bg-slate-50 text-slate-600 rounded-md border border-slate-200">
                        {hub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to={`/workers?location=${encodeURIComponent(city.name)}`}
                className="w-full py-2.5 bg-slate-100 hover:bg-[#f97316] text-slate-800 hover:text-white text-xs font-bold rounded-full transition-colors text-center block mt-2"
              >
                Find Workers in {city.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
