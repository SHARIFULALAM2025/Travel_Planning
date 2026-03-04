"use client";

import { useState, useEffect, useRef } from "react";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=85",
    location: "Bali, Indonesia",
    tag: "🏝️ Beach Paradise",
  },
  {
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=85",
    location: "Paris, France",
    tag: "🗼 City of Light",
  },
  {
    url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=85",
    location: "Maasai Mara, Kenya",
    tag: "🦁 Wildlife Safari",
  },
  {
    url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=85",
    location: "Santorini, Greece",
    tag: "⛵ Aegean Dreams",
  },
];

const stats = [
  { value: "12K+", label: "Happy Travelers" },
  { value: "48",   label: "Countries" },
  { value: "629+", label: "Tours" },
  { value: "4.9★", label: "Avg Rating" },
];

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=80",
];

export default function HeroExplore() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [query, setQuery] = useState("");
  const sectionRef = useRef(null);

  
  useEffect(() => {
    const t = setInterval(() => goToSlide((activeSlide + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, [activeSlide]);


  useEffect(() => {
    const handler = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 12,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 8,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const goToSlide = (idx) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveSlide(idx);
      setTransitioning(false);
    }, 400);
  };

  const slide = heroImages[activeSlide];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600&display=swap');
        .hero-section { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }

        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .anim-1 { animation: fadeSlideUp 0.8s ease-out 0.1s both; }
        .anim-2 { animation: fadeSlideUp 0.8s ease-out 0.3s both; }
        .anim-3 { animation: fadeSlideUp 0.8s ease-out 0.5s both; }
        .anim-4 { animation: fadeSlideUp 0.8s ease-out 0.7s both; }
        .anim-5 { animation: fadeSlideUp 0.8s ease-out 0.9s both; }
        .anim-6 { animation: fadeSlideUp 0.8s ease-out 1.1s both; }

        @keyframes imgFadeIn  { from { opacity:0; transform:scale(1.04); } to { opacity:1; transform:scale(1); } }
        .img-enter  { animation: imgFadeIn 0.7s ease-out both; }

        @keyframes imgFadeOut { from { opacity:1; } to { opacity:0; } }
        .img-exit   { animation: imgFadeOut 0.4s ease-out both; }

        @keyframes floatBadge {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .float-badge { animation: floatBadge 4s ease-in-out infinite; }
        .float-badge-2 { animation: floatBadge 5s ease-in-out 1s infinite; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-line {
          background: linear-gradient(90deg, #f59e0b 0%, #fde68a 40%, #f59e0b 60%, #d97706 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        @keyframes pulseRing {
          0%   { transform:scale(1);   opacity:0.5; }
          100% { transform:scale(1.7); opacity:0; }
        }
        .pulse-btn::after {
          content:'';
          position:absolute; inset:0; border-radius:inherit;
          border: 2px solid #f59e0b;
          animation: pulseRing 2s ease-out infinite;
        }

        .search-input::placeholder { color:#9ca3af; }
        .search-input:focus { outline:none; }

        @keyframes progressBar {
          from { width:0%; }
          to   { width:100%; }
        }
        .progress-bar { animation: progressBar 5s linear; }

        /* Clip-path diagonal split */
        .clip-diagonal {
          clip-path: polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
        @media (max-width: 1024px) {
          .clip-diagonal { clip-path: none; }
        }
      `}</style>

      <section ref={sectionRef} className="hero-section relative w-full min-h-screen flex overflow-hidden bg-stone-950">

        
        <div className="relative z-20 flex flex-col justify-center
          w-full lg:w-[52%] px-8 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-0">

          {/* Background for left panel */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950" />
          {/* Decorative dot grid */}
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"28px 28px" }} />
          
          <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background:"radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%)" }} />

          <div className="relative z-10 max-w-xl">

        
            <div className="anim-1 flex items-center gap-3 mb-5">
              <span className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/30
                text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                World's #1 Travel App — 2024
              </span>
            </div>


            <h1 className="anim-2 display-font font-black leading-[1.05] mb-6">
              <span className="text-white text-5xl sm:text-6xl xl:text-7xl block">Discover</span>
              <span className="shimmer-line text-5xl sm:text-6xl xl:text-7xl block italic">the World</span>
              <span className="text-white text-5xl sm:text-6xl xl:text-7xl block">Your Way.</span>
            </h1>

            <p className="anim-3 text-stone-400 text-base sm:text-lg leading-relaxed mb-8 max-w-sm">
              Not sure where to go? Let us craft your perfect journey —
              handpicked tours, zero hassle, unforgettable memories.
            </p>

            
            <div className="anim-4 flex items-center gap-0 bg-white/5 border border-white/10 rounded-2xl
              overflow-hidden mb-6 focus-within:border-amber-400/50 focus-within:bg-white/8
              transition-all duration-300 shadow-xl shadow-black/30">
              <span className="pl-4 text-stone-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                </svg>
              </span>
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Where do you want to go?"
                className="search-input flex-1 bg-transparent px-4 py-4 text-sm text-white" />
              <button className="pulse-btn relative m-1.5 flex items-center gap-2 px-5 py-3 bg-amber-400
                hover:bg-amber-300 text-gray-900 text-sm font-black rounded-xl transition-all duration-200
                hover:scale-105 whitespace-nowrap shadow-lg shadow-amber-900/30">
                Plan My Trip →
              </button>
            </div>

         
            <div className="anim-4 flex flex-wrap gap-2 mb-10">
              {["🏖️ Beach", "🏔️ Adventure", "🏛️ Culture", "🍜 Food", "💎 Luxury"].map((tag) => (
                <button key={tag}
                  className="px-3 py-1.5 bg-white/5 hover:bg-amber-400/15 border border-white/10
                    hover:border-amber-400/40 text-stone-400 hover:text-amber-300 text-xs font-medium
                    rounded-full transition-all duration-200">
                  {tag}
                </button>
              ))}
            </div>

         
            <div className="anim-5 flex flex-col sm:flex-row sm:items-center gap-4">
        
              <div className="flex items-center">
                {avatars.map((src, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-stone-900 overflow-hidden -ml-2 first:ml-0 shadow-md">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                <span className="ml-3 text-xs text-stone-400">
                  <span className="text-white font-bold">12,000+</span> travelers trust us
                </span>
              </div>

      
              <div className="flex items-center gap-1.5 sm:ml-4 sm:pl-4 sm:border-l sm:border-stone-800">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.351 2.438c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.763 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"/>
                  </svg>
                ))}
                <span className="text-xs text-stone-400 ml-1"><span className="text-white font-bold">4.9</span> / 5.0</span>
              </div>
            </div>

   
            <div className="anim-6 grid grid-cols-4 gap-3 mt-10 pt-8 border-t border-stone-800/60">
              {stats.map((s, i) => (
                <div key={i} className="text-center group">
                  <div className="display-font text-xl sm:text-2xl font-black text-white group-hover:text-amber-400
                    transition-colors duration-200">{s.value}</div>
                  <div className="text-stone-500 text-xs mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

       
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[52%] z-10 clip-diagonal overflow-hidden">

          <div
            className={`absolute inset-0 transition-opacity duration-700 ${transitioning ? "opacity-0" : "opacity-100"}`}
            style={{
              transform: `scale(1.06) translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
              transition: "transform 0.8s ease-out, opacity 0.7s ease",
            }}
          >
            <img
              key={activeSlide}
              src={slide.url}
              alt={slide.location}
              className="w-full h-full object-cover img-enter"
            />
          </div>

         
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-stone-950/20" />

         
          <div className="float-badge absolute top-10 right-10 flex items-center gap-2
            bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl shadow-xl">
            <span className="text-lg">{slide.tag.split(" ")[0]}</span>
            <div>
              <div className="text-white text-xs font-bold">{slide.location}</div>
              <div className="text-white/50 text-xs">{slide.tag.split(" ").slice(1).join(" ")}</div>
            </div>
          </div>

          
          <div className="float-badge-2 absolute bottom-32 right-10 bg-white/10 backdrop-blur-md
            border border-white/20 rounded-2xl px-4 py-3 shadow-xl text-right">
            <div className="text-white/50 text-xs mb-0.5">Starting from</div>
            <div className="display-font text-2xl font-black text-amber-400">$720</div>
            <div className="text-white/40 text-xs">per person · 7 nights</div>
          </div>

        
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
           
            <div className="w-32 h-0.5 bg-white/20 rounded-full overflow-hidden">
              <div key={activeSlide} className="progress-bar h-full bg-amber-400 rounded-full" />
            </div>
            
            <div className="flex gap-2">
              {heroImages.map((_, i) => (
                <button key={i} onClick={() => goToSlide(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: activeSlide === i ? "20px" : "6px",
                    height: "6px",
                    backgroundColor: activeSlide === i ? "#f59e0b" : "rgba(255,255,255,0.3)",
                  }} />
              ))}
            </div>
          </div>

         
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {heroImages.map((img, i) => (
              <button key={i} onClick={() => goToSlide(i)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300
                  ${activeSlide === i ? "border-amber-400 scale-110 shadow-lg shadow-amber-900/40" : "border-white/10 opacity-50 hover:opacity-80"}`}>
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        
        <div className="lg:hidden absolute inset-0 z-0">
          <img src={slide.url} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/90 via-stone-950/70 to-stone-950" />
        </div>

        <div className="absolute bottom-6 left-8 z-30 hidden lg:flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-white/30" style={{ animation: "fadeSlideUp 2s ease-in-out infinite alternate" }} />
          <span className="text-white text-xs tracking-widest uppercase rotate-90 origin-center translate-y-4">Scroll</span>
        </div>

      </section>
    </>
  );
}