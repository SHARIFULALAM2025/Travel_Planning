'use client';
import React, { useState, useEffect } from 'react';






const Destinations = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1800&q=90')`,
          transform: loaded ? 'scale(1)' : 'scale(1.08)',
        }}
      />

      {/* Dark vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      <div className="relative z-10 flex flex-col justify-between h-full px-6 md:px-12 pt-10 pb-8">

      
        <div
          className={`transition-all duration-1000 delay-200 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-white/80 text-lg md:text-xl font-medium tracking-wide mb-0 mt-12">
            Ready To
          </p>
          <h1
            className="font-black uppercase leading-none tracking-tight text-white"
            style={{
              fontSize: 'clamp(80px, 18vw, 200px)',
              lineHeight: 0.9,
              WebkitTextStroke: '0px transparent',
            }}
          >
            EXPLORE
          </h1>
        </div>

      
        <div
          className={`flex justify-center transition-all duration-1000 delay-400 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-white/70 text-sm md:text-base text-center max-w-md leading-relaxed">
            We don&apos;t just plan trips we create immersive travel experiences. Dive into
            cultures, uncover local secrets, and build journeys that match your style,
            pace, and passion for exploration.
          </p>
        </div>

        
        <div
          className={`flex items-end justify-between transition-all duration-1000 delay-600 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
            
            <div className="flex -space-x-3">
              {[
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&q=80',
                'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=80&q=80',
                'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=80&q=80',
              ].map((src, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-black/40 overflow-hidden flex-shrink-0"
                  style={{ zIndex: 3 - i }}
                >
                  <img
                    src={src}
                    alt="destination"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className='w-[200px]'>
              <h2 className="text-white mb-3 font-bold text-lg leading-tight">100+ Places</h2>
              <p className="text-white/50 text-xs leading-4">Explore 100+ destinations with stunning visuals, curated guides and all you need to plan your next journey</p>
            </div>
          </div>

          
          <button className="group w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white group-hover:translate-y-1 transition-transform duration-300"
            >
              <path
                d="M9 3v12M3.5 9.5l5.5 5.5 5.5-5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;