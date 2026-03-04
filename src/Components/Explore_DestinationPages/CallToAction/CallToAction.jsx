"use client";

import { useState, useEffect } from "react";

const bgImages = [
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80",
];

const floatingWords = ["Adventure", "Discovery", "Wonder", "Freedom", "Journey", "TravelMate"];

export default function CallToAction() {
  const [bgIndex, setBgIndex] = useState(0);
  const [fade, setFade]       = useState(true);
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setBgIndex((i) => (i + 1) % bgImages.length);
        setFade(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (email.trim()) { setSent(true); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@400;500;600&display=swap');
        .cta-section { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }

        @keyframes bgFade { from { opacity:0; } to { opacity:1; } }
        .bg-fade-in  { animation: bgFade 0.8s ease-out forwards; }
        .bg-fade-out { animation: bgFade 0.6s ease-out reverse forwards; }

        @keyframes floatUp {
          0%   { opacity:0; transform: translateY(0px); }
          20%  { opacity:0.15; }
          80%  { opacity:0.08; }
          100% { opacity:0; transform: translateY(-120px); }
        }
        .float-word { animation: floatUp linear infinite; }

        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity:0.6; }
          100% { transform: scale(1.8); opacity:0; }
        }
        .pulse-ring { animation: pulseRing 2s ease-out infinite; }

        @keyframes shimmerText {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #f59e0b 0%, #fde68a 40%, #f59e0b 60%, #d97706 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 3s linear infinite;
        }

        @keyframes slideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        .slide-up-1 { animation: slideUp 0.7s ease-out 0.1s both; }
        .slide-up-2 { animation: slideUp 0.7s ease-out 0.3s both; }
        .slide-up-3 { animation: slideUp 0.7s ease-out 0.5s both; }
        .slide-up-4 { animation: slideUp 0.7s ease-out 0.7s both; }
        .slide-up-5 { animation: slideUp 0.7s ease-out 0.9s both; }

        .email-input::placeholder { color: rgba(255,255,255,0.35); }
        .email-input:focus { outline: none; }

        @keyframes successPop { 0%{transform:scale(0.8);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        .success-pop { animation: successPop 0.4s ease-out both; }
      `}</style>

      <section className="cta-section relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

       
        <div className="absolute inset-0 z-0">
          <img
            src={bgImages[bgIndex]}
            alt=""
            className={`w-full h-full object-cover ${fade ? "bg-fade-in" : "bg-fade-out"}`}
            style={{ transition: "opacity 0.8s ease" }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>

      
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {floatingWords.map((word, i) => (
            <span
              key={word}
              className="float-word absolute text-white font-black select-none"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: `${2 + (i % 3)}rem`,
                left: `${10 + i * 14}%`,
                bottom: "-20px",
                animationDuration: `${8 + i * 2}s`,
                animationDelay: `${i * 1.5}s`,
                opacity: 0,
              }}>
              {word}
            </span>
          ))}
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

    
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">

          <div className="slide-up-1 flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-amber-400/60" />
            <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">Your Story Starts Here</span>
            <div className="w-12 h-px bg-amber-400/60" />
          </div>

       
          <div className="slide-up-2 mb-4">
            <p className="text-white/40 text-lg mb-1" style={{ fontFamily: "Playfair Display, serif" }}>"</p>
            <h2 className="display-font text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Not sure where to go?
              <br />
              <span className="shimmer-text italic">Let us craft your</span>
              <br />
              <span className="text-white">perfect journey.</span>
            </h2>
            <p className="text-white/40 text-lg mt-1 text-right pr-8" style={{ fontFamily: "Playfair Display, serif" }}>"</p>
          </div>

         
          <p className="slide-up-3 text-white/50 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-10">
            Tell us your dream destination and we'll handle everything —
            flights, stays, tours & unforgettable experiences.
          </p>

         
          <div className="slide-up-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
           
            <div className="relative">
            
              <div className="pulse-ring absolute inset-0 rounded-2xl border-2 border-amber-400" />
              <button className="relative flex items-center gap-2.5 px-8 py-4 bg-amber-400 hover:bg-amber-300
                text-gray-900 font-black text-base rounded-2xl transition-all duration-200 hover:scale-105
                shadow-2xl shadow-amber-900/40 group">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
                Plan My Trip →
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
                  Free
                </span>
              </button>
            </div>

            <button className="flex items-center gap-2.5 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20
              text-white font-bold text-base rounded-2xl border border-white/20 hover:border-white/40
              transition-all duration-200 hover:scale-105">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Browse Destinations
            </button>
          </div>

          
          <div className="slide-up-5">
            {!sent ? (
              <div className="flex flex-col items-center gap-3">
                <p className="text-white/30 text-xs uppercase tracking-widest">Or get travel inspiration in your inbox</p>
                <div className="flex items-center gap-0 w-full max-w-sm bg-white/10 backdrop-blur-sm
                  border border-white/20 rounded-2xl overflow-hidden focus-within:border-amber-400/60
                  transition-all duration-300 focus-within:bg-white/15">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="your@email.com"
                    className="email-input flex-1 bg-transparent px-5 py-3.5 text-sm text-white"
                  />
                  <button onClick={handleSubmit}
                    className="px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold
                      transition-colors duration-200 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            ) : (
              <div className="success-pop flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-emerald-400 font-bold text-sm">You're in! Travel inspiration coming soon ✈️</p>
              </div>
            )}
          </div>

          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: "🛡️", text: "Free Cancellation" },
              { icon: "⭐", text: "4.9 / 5 Rating" },
              { icon: "🌍", text: "48+ Countries" },
              { icon: "💬", text: "24/7 Support" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors duration-200">
                <span className="text-base">{badge.icon}</span>
                <span className="text-xs font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

       
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-30">
          <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full"
              style={{ animation: "slideUp 1.5s ease-in-out infinite alternate" }} />
          </div>
        </div>

       
        <div className="absolute bottom-8 right-8 z-10 flex gap-1.5">
          {bgImages.map((_, i) => (
            <button key={i} onClick={() => setBgIndex(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: bgIndex === i ? "20px" : "6px",
                height: "6px",
                backgroundColor: bgIndex === i ? "#f59e0b" : "rgba(255,255,255,0.3)",
              }} />
          ))}
        </div>

      </section>
    </>
  );
}