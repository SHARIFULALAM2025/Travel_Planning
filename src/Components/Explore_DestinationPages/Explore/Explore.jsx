"use client";

import { useState, useRef } from "react";

const categories = [
  {
    id: 1,
    name: "Adventure",
    emoji: "🏔️",
    count: "124 Tours",
    description: "Thrilling hikes, climbs & expeditions",
    gradient: "from-orange-400 to-red-500",
    bg: "bg-orange-50",
    accent: "text-orange-500",
    border: "border-orange-200",
    hoverBorder: "hover:border-orange-400",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
  },
  {
    id: 2,
    name: "Beach",
    emoji: "🏖️",
    count: "98 Tours",
    description: "Sun, sand & turquoise shorelines",
    gradient: "from-cyan-400 to-blue-500",
    bg: "bg-cyan-50",
    accent: "text-cyan-600",
    border: "border-cyan-200",
    hoverBorder: "hover:border-cyan-400",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
  },
  {
    id: 3,
    name: "Culture",
    emoji: "🏛️",
    count: "87 Tours",
    description: "Museums, heritage & local traditions",
    gradient: "from-violet-400 to-purple-600",
    bg: "bg-violet-50",
    accent: "text-violet-600",
    border: "border-violet-200",
    hoverBorder: "hover:border-violet-400",
    img: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80",
  },
  {
    id: 4,
    name: "Nightlife",
    emoji: "🎆",
    count: "56 Tours",
    description: "Rooftop bars, clubs & city lights",
    gradient: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    accent: "text-pink-600",
    border: "border-pink-200",
    hoverBorder: "hover:border-pink-400",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
  },
  {
    id: 5,
    name: "Nature",
    emoji: "🌿",
    count: "112 Tours",
    description: "Forests, wildlife & scenic landscapes",
    gradient: "from-emerald-400 to-green-600",
    bg: "bg-emerald-50",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    hoverBorder: "hover:border-emerald-400",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
  },
  {
    id: 6,
    name: "Food",
    emoji: "🍜",
    count: "73 Tours",
    description: "Street food, cooking classes & tastings",
    gradient: "from-amber-400 to-yellow-500",
    bg: "bg-amber-50",
    accent: "text-amber-600",
    border: "border-amber-200",
    hoverBorder: "hover:border-amber-400",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
  },
  {
    id: 7,
    name: "Luxury",
    emoji: "💎",
    count: "41 Tours",
    description: "5-star resorts, private villas & spas",
    gradient: "from-slate-500 to-gray-700",
    bg: "bg-slate-50",
    accent: "text-slate-600",
    border: "border-slate-200",
    hoverBorder: "hover:border-slate-400",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
  },
  {
    id: 8,
    name: "Wellness",
    emoji: "🧘",
    count: "38 Tours",
    description: "Yoga retreats, spas & mindful escapes",
    gradient: "from-teal-400 to-cyan-600",
    bg: "bg-teal-50",
    accent: "text-teal-600",
    border: "border-teal-200",
    hoverBorder: "hover:border-teal-400",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
  },
];

export default function Explore() {
  const [active, setActive] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');
        .cat-section { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }

        .cat-scroll::-webkit-scrollbar { display: none; }
        .cat-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-slide-up { animation: fadeSlideUp 0.5s ease-out both; }
      `}</style>

      <section className="cat-section bg-white py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">

          {/* ── Heading ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="fade-slide-up">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-px bg-amber-400" />
                <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">Browse by Interest</span>
              </div>

              {/* Main title */}
              <h2 className="display-font text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                What Kind of
                <br />
                <span className="relative">
                  <span className="text-amber-500 italic">Explorer</span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 160 6" preserveAspectRatio="none">
                    <path d="M0 4 Q20 0 40 4 Q60 8 80 4 Q100 0 120 4 Q140 8 160 4"
                      fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
                {" "}Are You?
              </h2>

              <p className="text-gray-400 text-sm mt-4 max-w-md leading-relaxed">
                From adrenaline-packed adventures to serene wellness retreats —
                discover tours perfectly matched to your travel style.
              </p>
            </div>

            {/* Scroll arrows (desktop) + View All */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button onClick={() => scroll(-1)}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center
                  text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all duration-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={() => scroll(1)}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center
                  text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all duration-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <a href="#"
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-900 text-gray-900
                  text-sm font-bold rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-200 group whitespace-nowrap">
                All Categories
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Icon Circle Row (quick nav) ── */}
          <div className="flex flex-wrap gap-4 mb-10 justify-center md:justify-start">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActive(active === cat.id ? null : cat.id)}
                className={`flex flex-col items-center gap-1.5 group transition-all duration-200`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border-2 transition-all duration-200
                  ${active === cat.id
                    ? `bg-gradient-to-br ${cat.gradient} border-transparent shadow-lg scale-110`
                    : `${cat.bg} ${cat.border} ${cat.hoverBorder} hover:scale-105 hover:shadow-md`}`}>
                  {cat.emoji}
                </div>
                <span className={`text-xs font-semibold transition-colors duration-200
                  ${active === cat.id ? cat.accent : "text-gray-500 group-hover:text-gray-800"}`}>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          {/* ── Horizontal Scroll Cards ── */}
          <div className="relative">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div ref={scrollRef}
              className="cat-scroll flex gap-4 overflow-x-auto pb-3 -mx-2 px-2">
              {categories.map((cat, i) => (
                <div key={cat.id}
                  onClick={() => setActive(active === cat.id ? null : cat.id)}
                  className={`flex-shrink-0 w-64 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300
                    shadow-sm hover:shadow-xl hover:-translate-y-1
                    ${active === cat.id ? "border-gray-900 shadow-lg -translate-y-1" : `${cat.border} ${cat.hoverBorder}`}`}
                  style={{ animationDelay: `${i * 60}ms` }}>

                  {/* Image */}
                  <div className="relative h-36 overflow-hidden">
                    <img src={cat.img} alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-50`} />
                    {/* Emoji big */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl drop-shadow-lg">{cat.emoji}</span>
                    </div>
                    {/* Count badge */}
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full">
                      {cat.count}
                    </span>
                  </div>

                  {/* Body */}
                  <div className={`p-4 ${cat.bg} transition-colors duration-200`}>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "Playfair Display, serif" }}>
                        {cat.name}
                      </h3>
                      {active === cat.id && (
                        <span className={`text-xs font-bold ${cat.accent}`}>✓ Selected</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">{cat.description}</p>
                    <button className={`w-full py-2 rounded-xl text-xs font-bold transition-all duration-200
                      bg-gradient-to-r ${cat.gradient} text-white hover:opacity-90 hover:scale-[1.02] shadow-sm`}>
                      Explore {cat.name} →
                    </button>
                  </div>
                </div>
              ))}

              {/* End spacer */}
              <div className="flex-shrink-0 w-4" />
            </div>
          </div>

          {/* ── Stats Row ── */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "629+", label: "Total Tours", emoji: "🗺️" },
              { value: "48",   label: "Countries",   emoji: "🌍" },
              { value: "12K+", label: "Happy Travelers", emoji: "😊" },
              { value: "4.9",  label: "Avg. Rating", emoji: "⭐" },
            ].map((stat, i) => (
              <div key={i} className="bg-stone-50 border border-gray-100 rounded-2xl px-5 py-5 text-center hover:shadow-md transition-shadow duration-200">
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="display-font text-2xl font-black text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}