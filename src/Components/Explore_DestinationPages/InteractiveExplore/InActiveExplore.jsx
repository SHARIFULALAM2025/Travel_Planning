"use client";

import { useState } from "react";



const regionData = {
  asia: {
    label: "Asia",
    color: "#f59e0b",
    destinations: [
      { name: "Bali, Indonesia", flag: "🇮🇩", price: "$720", rating: 4.8, tag: "Relaxation", duration: "7 nights", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=80" },
      { name: "Tokyo, Japan",    flag: "🇯🇵", price: "$1,450", rating: 4.7, tag: "Culture",    duration: "8 nights", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&q=80" },
      { name: "Kyoto, Japan",    flag: "🇯🇵", price: "$1,300", rating: 4.9, tag: "Serene",     duration: "7 nights", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&q=80" },
      { name: "Maldives",        flag: "🇲🇻", price: "$6,200", rating: 5.0, tag: "Luxury",     duration: "7 nights", img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=300&q=80" },
    ],
  },
  europe: {
    label: "Europe",
    color: "#6366f1",
    destinations: [
      { name: "Paris, France",       flag: "🇫🇷", price: "$2,800", rating: 4.9, tag: "Culture",   duration: "5 nights", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80" },
      { name: "Santorini, Greece",   flag: "🇬🇷", price: "$3,100", rating: 4.9, tag: "Romantic",  duration: "6 nights", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&q=80" },
      { name: "Amalfi Coast, Italy", flag: "🇮🇹", price: "$2,600", rating: 4.8, tag: "Scenic",    duration: "5 nights", img: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=300&q=80" },
      { name: "Barcelona, Spain",    flag: "🇪🇸", price: "$1,750", rating: 4.7, tag: "Vibrant",   duration: "5 nights", img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&q=80" },
    ],
  },
  americas: {
    label: "Americas",
    color: "#10b981",
    destinations: [
      { name: "New York, USA",       flag: "🇺🇸", price: "$1,800", rating: 4.6, tag: "City Life", duration: "4 nights", img: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=300&q=80" },
      { name: "Machu Picchu, Peru",  flag: "🇵🇪", price: "$950",   rating: 4.8, tag: "Iconic",    duration: "6 nights", img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=300&q=80" },
      { name: "Patagonia, Argentina",flag: "🇦🇷", price: "$2,200", rating: 4.7, tag: "Adventure", duration: "10 nights",img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=80" },
      { name: "Cancún, Mexico",      flag: "🇲🇽", price: "$1,100", rating: 4.5, tag: "Beach",     duration: "5 nights", img: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=300&q=80" },
    ],
  },
  africa: {
    label: "Africa",
    color: "#ef4444",
    destinations: [
      { name: "Safari, Kenya",       flag: "🇰🇪", price: "$5,400", rating: 4.9, tag: "Wildlife",  duration: "10 nights",img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=300&q=80" },
      { name: "Cape Town, S. Africa",flag: "🇿🇦", price: "$1,600", rating: 4.7, tag: "Adventure", duration: "9 nights", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=300&q=80" },
      { name: "Marrakech, Morocco",  flag: "🇲🇦", price: "$980",   rating: 4.6, tag: "Culture",   duration: "6 nights", img: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=300&q=80" },
      { name: "Zanzibar, Tanzania",  flag: "🇹🇿", price: "$1,800", rating: 4.8, tag: "Beach",     duration: "7 nights", img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=300&q=80" },
    ],
  },
  oceania: {
    label: "Oceania",
    color: "#0ea5e9",
    destinations: [
      { name: "Sydney, Australia",   flag: "🇦🇺", price: "$2,100", rating: 4.7, tag: "City Life", duration: "6 nights", img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=300&q=80" },
      { name: "Queenstown, NZ",      flag: "🇳🇿", price: "$1,900", rating: 4.8, tag: "Adventure", duration: "7 nights", img: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=300&q=80" },
      { name: "Fiji Islands",        flag: "🇫🇯", price: "$2,800", rating: 4.9, tag: "Beach",     duration: "8 nights", img: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=300&q=80" },
    ],
  },
};



function Stars({ value }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className={`w-3 h-3 ${value >= s ? "text-amber-400" : value >= s-0.5 ? "text-amber-300" : "text-gray-600"}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.351 2.438c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.763 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"/>
        </svg>
      ))}
      <span className="ml-1 text-xs text-gray-400">{value.toFixed(1)}</span>
    </span>
  );
}



function MapPin({ region, x, y, active, onClick, color }) {
  return (
    <g onClick={onClick} className="cursor-pointer">
    
      {active && (
        <circle cx={x} cy={y} r="14" fill={color} opacity="0.2">
          <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
        </circle>
      )}
     
      <circle cx={x} cy={y} r={active ? "9" : "7"}
        fill={active ? color : "#374151"}
        stroke={active ? "white" : color}
        strokeWidth={active ? "2.5" : "1.5"}
        style={{ transition: "all 0.25s ease" }}
      />
   
      <text x={x} y={y - 14} textAnchor="middle"
        fontSize="8" fontWeight="700" fill={active ? color : "#9ca3af"}
        style={{ fontFamily: "DM Sans, sans-serif", transition: "fill 0.25s ease" }}>
        {region.label}
      </text>
    </g>
  );
}


export default function InActiveExplore() {
  const [activeRegion, setActiveRegion] = useState("europe");
  const [activeCard, setActiveCard]     = useState(null);

  const region = regionData[activeRegion];

  const pins = [
    { key: "asia",     x: 680, y: 160, label: "Asia"     },
    { key: "europe",   x: 490, y: 120, label: "Europe"   },
    { key: "americas", x: 220, y: 180, label: "Americas" },
    { key: "africa",   x: 490, y: 230, label: "Africa"   },
    { key: "oceania",  x: 740, y: 280, label: "Oceania"  },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');
        .map-section { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }

        @keyframes fadeIn { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }
        .panel-enter { animation: fadeIn 0.3s ease-out both; }

        @keyframes cardPop { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .card-pop { animation: cardPop 0.25s ease-out both; }

        .dest-scroll::-webkit-scrollbar { width: 4px; }
        .dest-scroll::-webkit-scrollbar-track { background: #1f2937; border-radius:4px; }
        .dest-scroll::-webkit-scrollbar-thumb { background: #374151; border-radius:4px; }
      `}</style>

      <section className="map-section bg-gray-950 py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">

         
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-px bg-amber-400" />
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">Interactive Explorer</span>
              <div className="w-8 h-px bg-amber-400" />
            </div>
            <h2 className="display-font text-4xl md:text-5xl font-black text-white leading-tight">
              Explore the World,{" "}
              <span className="text-amber-400 italic">Your Way</span>
            </h2>
            <p className="text-gray-400 text-sm mt-4 max-w-md mx-auto leading-relaxed">
              Click any region on the map to discover curated destinations, prices & tours — all in one place.
            </p>
          </div>

         
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.entries(regionData).map(([key, r]) => (
              <button key={key} onClick={() => { setActiveRegion(key); setActiveCard(null); }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border
                  ${activeRegion === key
                    ? "text-gray-900 border-transparent shadow-lg scale-105"
                    : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
                  }`}
                style={activeRegion === key ? { backgroundColor: r.color } : {}}>
                {r.label}
              </button>
            ))}
          </div>


          <div className="flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">

        
            <div className="lg:w-3/5 bg-gray-900 relative min-h-72 lg:min-h-auto flex items-center justify-center p-4">
            
              <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"40px 40px" }}/>

    
              <svg viewBox="0 0 960 500" className="w-full max-w-2xl" style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.5))" }}>
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

            
                <path d="M80,60 L200,50 L260,80 L280,140 L260,200 L220,230 L180,240 L140,220 L100,180 L70,140 Z"
                  fill={activeRegion === "americas" ? "#10b981" : "#1f2937"}
                  stroke={activeRegion === "americas" ? "#10b981" : "#374151"} strokeWidth="1.5"
                  className="cursor-pointer transition-all duration-300 hover:opacity-80"
                  onClick={() => { setActiveRegion("americas"); setActiveCard(null); }}
                  filter={activeRegion === "americas" ? "url(#glow)" : ""}/>
            
                <path d="M180,250 L240,240 L270,280 L260,360 L220,400 L180,390 L150,340 L155,280 Z"
                  fill={activeRegion === "americas" ? "#10b981" : "#1f2937"}
                  stroke={activeRegion === "americas" ? "#10b981" : "#374151"} strokeWidth="1.5"
                  className="cursor-pointer transition-all duration-300 hover:opacity-80"
                  onClick={() => { setActiveRegion("americas"); setActiveCard(null); }}
                  filter={activeRegion === "americas" ? "url(#glow)" : ""}/>
                
                <path d="M420,60 L520,55 L550,90 L540,130 L500,150 L460,145 L430,120 L410,90 Z"
                  fill={activeRegion === "europe" ? "#6366f1" : "#1f2937"}
                  stroke={activeRegion === "europe" ? "#6366f1" : "#374151"} strokeWidth="1.5"
                  className="cursor-pointer transition-all duration-300 hover:opacity-80"
                  onClick={() => { setActiveRegion("europe"); setActiveCard(null); }}
                  filter={activeRegion === "europe" ? "url(#glow)" : ""}/>
                
                <path d="M430,160 L530,155 L560,200 L555,300 L510,370 L460,370 L420,300 L415,200 Z"
                  fill={activeRegion === "africa" ? "#ef4444" : "#1f2937"}
                  stroke={activeRegion === "africa" ? "#ef4444" : "#374151"} strokeWidth="1.5"
                  className="cursor-pointer transition-all duration-300 hover:opacity-80"
                  onClick={() => { setActiveRegion("africa"); setActiveCard(null); }}
                  filter={activeRegion === "africa" ? "url(#glow)" : ""}/>
                
                <path d="M560,50 L760,45 L800,90 L810,160 L760,200 L680,210 L620,190 L570,150 L550,100 Z"
                  fill={activeRegion === "asia" ? "#f59e0b" : "#1f2937"}
                  stroke={activeRegion === "asia" ? "#f59e0b" : "#374151"} strokeWidth="1.5"
                  className="cursor-pointer transition-all duration-300 hover:opacity-80"
                  onClick={() => { setActiveRegion("asia"); setActiveCard(null); }}
                  filter={activeRegion === "asia" ? "url(#glow)" : ""}/>
               
                <path d="M700,280 L800,270 L840,310 L820,360 L760,370 L700,340 Z"
                  fill={activeRegion === "oceania" ? "#0ea5e9" : "#1f2937"}
                  stroke={activeRegion === "oceania" ? "#0ea5e9" : "#374151"} strokeWidth="1.5"
                  className="cursor-pointer transition-all duration-300 hover:opacity-80"
                  onClick={() => { setActiveRegion("oceania"); setActiveCard(null); }}
                  filter={activeRegion === "oceania" ? "url(#glow)" : ""}/>

           
                {pins.map((p) => (
                  <MapPin key={p.key} region={regionData[p.key]} x={p.x} y={p.y}
                    active={activeRegion === p.key} color={regionData[p.key].color}
                    onClick={() => { setActiveRegion(p.key); setActiveCard(null); }}/>
                ))}
              </svg>

             
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {Object.entries(regionData).map(([key, r]) => (
                  <button key={key} onClick={() => { setActiveRegion(key); setActiveCard(null); }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                    style={{
                      backgroundColor: activeRegion === key ? r.color + "22" : "#111827",
                      border: `1px solid ${activeRegion === key ? r.color : "#374151"}`,
                      color: activeRegion === key ? r.color : "#6b7280",
                    }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

          
            <div key={activeRegion} className="panel-enter lg:w-2/5 bg-gray-900 border-l border-gray-800 flex flex-col">

             
              <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between"
                style={{ borderBottomColor: region.color + "40" }}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: region.color }}>
                    {region.label}
                  </p>
                  <h3 className="display-font text-xl font-black text-white">
                    {region.destinations.length} Destinations
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: region.color + "20", border: `1px solid ${region.color}40` }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                    style={{ color: region.color }}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
              </div>

         
              <div className="dest-scroll overflow-y-auto flex-1 divide-y divide-gray-800/60" style={{ maxHeight: "420px" }}>
                {region.destinations.map((dest, i) => (
                  <div key={i}
                    className={`card-pop p-4 cursor-pointer transition-all duration-200 hover:bg-gray-800/50 group
                      ${activeCard === i ? "bg-gray-800" : ""}`}
                    style={{ animationDelay: `${i * 60}ms` }}
                    onClick={() => setActiveCard(activeCard === i ? null : i)}>

                    <div className="flex gap-3">
               
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                        <img src={dest.img} alt={dest.name} className="w-full h-full object-cover
                          group-hover:scale-110 transition-transform duration-300"/>
                      </div>

                     
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1 mb-0.5">
                          <span className="text-sm font-bold text-white leading-tight truncate"
                            style={{ fontFamily: "Playfair Display, serif" }}>
                            {dest.flag} {dest.name}
                          </span>
                          <span className="text-xs font-bold text-amber-400 flex-shrink-0">{dest.price}</span>
                        </div>
                        <Stars value={dest.rating} />
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{ backgroundColor: region.color + "20", color: region.color }}>
                            {dest.tag}
                          </span>
                          <span className="text-xs text-gray-500">{dest.duration}</span>
                        </div>
                      </div>
                    </div>

                
                    {activeCard === i && (
                      <div className="mt-3 flex gap-2">
                        <button className="flex-1 py-2 rounded-xl text-xs font-bold text-gray-900 transition-all hover:opacity-90"
                          style={{ backgroundColor: region.color }}>
                          Book Now →
                        </button>
                        <button className="px-3 py-2 rounded-xl text-xs font-bold text-gray-400 bg-gray-700 hover:bg-gray-600 transition-colors">
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 border-t border-gray-800">
                <button className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                  style={{ backgroundColor: region.color, color: region.color === "#f59e0b" ? "#111827" : "white" }}>
                  View All {region.label} Tours →
                </button>
              </div>
            </div>
          </div>

         
          <p className="text-center text-gray-600 text-xs mt-6 tracking-wide">
            💡 Click any continent or region pill to explore destinations dynamically
          </p>
        </div>
      </section>
    </>
  );
}