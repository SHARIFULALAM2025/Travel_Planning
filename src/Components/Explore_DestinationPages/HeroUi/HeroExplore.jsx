'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { HiArrowRight } from 'react-icons/hi' // একটি আইকন যোগ করা হয়েছে

const HeroExplore = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-slate-950">
      {/* Background Image with Zoom Effect */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out ${
          loaded ? 'scale-105' : 'scale-125'
        }`}
        style={{
          backgroundImage: `url('https://i.ibb.co.com/S7J312R6/pascal-meier-UYies-SO4-Fi-M-unsplash.jpg')`,
        }}
      />

      {/* Modern Overlay Layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-20 flex flex-col justify-between h-full px-6 md:px-12 lg:px-20 py-12 md:py-20">
        {/* Top Section: Heading */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 md:w-12 h-[2px] bg-indigo-500"></span>
            <p className="text-indigo-400 text-sm md:text-lg font-bold uppercase tracking-[0.3em]">
              Ready To
            </p>
          </div>
          <h1
            className="font-black uppercase tracking-tighter text-white select-none"
            style={{
              fontSize: 'clamp(3.5rem, 15vw, 12rem)',
              lineHeight: 0.85,
            }}
          >
            EXPLORE
          </h1>
        </div>

        {/* Middle Section: Description & Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          {/* Industry Label / Info Card */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-6 max-w-sm shadow-2xl">
              <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&q=80',
                  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=80&q=80',
                  'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=80&q=80',
                ].map((src, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-slate-900 overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt="avatar"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                  +1k
                </div>
              </div>
              <div>
                <h2 className="text-white font-bold text-base md:text-lg">
                  100+ Destinations
                </h2>
                <p className="text-white/60 text-xs md:text-sm">
                  World-class curated guides for your soul.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white"></div>
      </div>
    </section>
  )
}

export default HeroExplore
