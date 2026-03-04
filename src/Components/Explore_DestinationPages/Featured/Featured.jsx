"use client";

import { useState, useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    flag: "🇮🇩",
    rating: 4.8,
    description: "Tropical paradise of temples, rice terraces & surf beaches.",
    price: "$720",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    tag: "Trending",
    tagColor: "bg-amber-400",
  },
  {
    id: 2,
    name: "Paris, France",
    flag: "🇫🇷",
    rating: 4.9,
    description: "The city of love, art, haute cuisine & the Eiffel Tower.",
    price: "$2,800",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    tag: "Popular",
    tagColor: "bg-rose-500",
  },
  {
    id: 3,
    name: "Tokyo, Japan",
    flag: "🇯🇵",
    rating: 4.7,
    description: "Neon-lit streets meet ancient shrines in this vibrant capital.",
    price: "$1,450",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    tag: "Top Pick",
    tagColor: "bg-violet-500",
  },
  {
    id: 4,
    name: "Santorini, Greece",
    flag: "🇬🇷",
    rating: 4.9,
    description: "Iconic white-washed cliffs, blue domes & Aegean sunsets.",
    price: "$3,100",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
    tag: "Romantic",
    tagColor: "bg-pink-500",
  },
  {
    id: 5,
    name: "Safari, Kenya",
    flag: "🇰🇪",
    rating: 4.9,
    description: "Witness the Great Migration across the Maasai Mara savanna.",
    price: "$5,400",
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80",
    tag: "Wildlife",
    tagColor: "bg-emerald-500",
  },
  {
    id: 6,
    name: "Machu Picchu, Peru",
    flag: "🇵🇪",
    rating: 4.8,
    description: "Lost Incan citadel perched high in the misty Andes mountains.",
    price: "$950",
    img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80",
    tag: "Iconic",
    tagColor: "bg-teal-500",
  },
  {
    id: 7,
    name: "Amalfi Coast, Italy",
    flag: "🇮🇹",
    rating: 4.8,
    description: "Dramatic cliffs, pastel villages & crystal-clear Mediterranean waters.",
    price: "$2,600",
    img: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=600&q=80",
    tag: "Scenic",
    tagColor: "bg-sky-500",
  },
  {
    id: 8,
    name: "Kyoto, Japan",
    flag: "🇯🇵",
    rating: 4.9,
    description: "Ancient geisha districts, bamboo groves & golden pavilions.",
    price: "$1,300",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    tag: "Serene",
    tagColor: "bg-indigo-500",
  },
];

const categories = ["All", "Trending", "Popular", "Adventure", "Relaxation", "Culture"];

// ─── Star Rating ───────────────────────────────────────────────────────────────

function Stars({ value }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-3 h-3 ${value >= s ? "text-amber-400" : "text-white/30"}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.351 2.438c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.763 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-white/80 font-medium">{value.toFixed(1)}</span>
    </div>
  );
}

// ─── Destination Card ──────────────────────────────────────────────────────────

function DestinationCard({ item, index }) {
  const [saved, setSaved] = useState(false);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        transition: "opacity 0.5s ease, transform 0.5s ease",
        transitionDelay: `${index * 80}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {/* Card shadow lift on hover */}
      <div className="relative rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl group-hover:-translate-y-1.5
        transition-all duration-400 ease-out"
        style={{ transition: "box-shadow 0.35s ease, transform 0.35s ease" }}>

        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={item.img} alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Tag badge */}
          <span className={`absolute top-3 left-3 ${item.tagColor} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md`}>
            {item.tag}
          </span>

          {/* Save button */}
          <button
            onClick={(e) => { e.stopPropagation(); setSaved((p) => !p); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
              border border-white/30 hover:bg-white/40 transition-all duration-200 hover:scale-110"
          >
            <svg className={`w-4 h-4 transition-colors duration-200 ${saved ? "text-red-400 fill-red-400" : "text-white"}`}
              fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Bottom info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Flag + Rating row */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xl">{item.flag}</span>
              <Stars value={item.rating} />
            </div>

            {/* Destination name */}
            <h3 className="text-white font-bold text-base leading-tight mb-0.5"
              style={{ fontFamily: "Playfair Display, serif" }}>
              {item.name}
            </h3>

            {/* Description */}
            <p className="text-white/70 text-xs leading-relaxed line-clamp-1 mb-3">
              {item.description}
            </p>

            {/* Price + CTA */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white/50 text-xs">Starting from</span>
                <div className="text-white font-bold text-lg leading-none">{item.price}</div>
              </div>
              <button className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-gray-900
                text-xs font-bold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-amber-900/30">
                Explore More
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Featured() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? destinations
    : destinations.filter((d) => d.tag === activeCategory || d.tag.toLowerCase().includes(activeCategory.toLowerCase()));

  const display = filtered.length > 0 ? filtered : destinations;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');
        .dest-section { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }
      `}</style>

      <section className="dest-section bg-gradient-to-b from-stone-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* ── Section Heading ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-px bg-amber-400" />
                <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">Explore the World</span>
              </div>

              {/* Main heading */}
              <h2 className="display-font text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Featured
                <span className="relative inline-block mx-3">
                  <span className="relative z-10 text-amber-500 italic">Destinations</span>
                  {/* Underline squiggle */}
                  <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                    <path d="M0 4 Q25 0 50 4 Q75 8 100 4 Q125 0 150 4 Q175 8 200 4"
                      fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </span>
                <br />for You
              </h2>

              <p className="text-gray-400 text-sm mt-4 max-w-md leading-relaxed">
                Hand-picked tours and travel packages crafted for every kind of explorer —
                from sun-soaked beaches to ancient mountain citadels.
              </p>
            </div>

            {/* View All CTA */}
            <a href="#"
              className="self-start md:self-auto flex items-center gap-2 px-5 py-3 border-2 border-gray-900 text-gray-900
                text-sm font-bold rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-200 group whitespace-nowrap">
              View All Destinations
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* ── Category Filter Tabs ── */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                  ${activeCategory === cat
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-amber-400 hover:text-amber-600 shadow-sm"
                  }`}
              >
                {cat}
              </button>
            ))}

            {/* Result count */}
            <span className="ml-auto self-center text-xs text-gray-400 font-medium">
              {display.length} destination{display.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* ── Card Grid ── */}
          {/* 1 col mobile / 2 col tablet / 4 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {display.map((item, i) => (
              <DestinationCard key={item.id} item={item} index={i} />
            ))}
          </div>

          {/* ── Bottom CTA Banner ── */}
          <div className="mt-16 rounded-3xl overflow-hidden relative bg-gray-900">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=60)", backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-10">
              <div>
                <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">Limited Time Offer</p>
                <h3 className="display-font text-2xl md:text-3xl font-black text-white leading-tight">
                  Plan Your Dream Trip<br />
                  <span className="text-amber-400">& Save Up to 30%</span>
                </h3>
                <p className="text-white/50 text-sm mt-2">Book before April 30 · No hidden fees · Free cancellation</p>
              </div>
              <button className="flex-shrink-0 flex items-center gap-2 px-7 py-3.5 bg-amber-400 hover:bg-amber-300
                text-gray-900 font-bold text-sm rounded-2xl transition-all duration-200 hover:scale-105 shadow-xl shadow-amber-900/30">
                Start Planning
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}