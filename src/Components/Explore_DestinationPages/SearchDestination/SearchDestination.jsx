"use client";

import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const allResults = [
  { id: 1, title: "Bali, Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80", tag: "Relaxation", country: "Indonesia", budget: "$500–$1,000", rating: 4.8, price: "$720", duration: "7 nights", badge: "Trending" },
  { id: 2, title: "Paris, France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80", tag: "Culture", country: "France", budget: "$2,500–$5,000", rating: 4.9, price: "$2,800", duration: "5 nights", badge: "Popular" },
  { id: 3, title: "Tokyo, Japan", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80", tag: "Culture", country: "Japan", budget: "$1,000–$2,500", rating: 4.7, price: "$1,450", duration: "8 nights", badge: "Top Pick" },
  { id: 4, title: "Santorini, Greece", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80", tag: "Relaxation", country: "Greece", budget: "$2,500–$5,000", rating: 4.9, price: "$3,100", duration: "6 nights", badge: "Romantic" },
  { id: 5, title: "New York, USA", img: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400&q=80", tag: "Adventure", country: "USA", budget: "$1,000–$2,500", rating: 4.6, price: "$1,800", duration: "4 nights", badge: "City Life" },
  { id: 6, title: "Cape Town, South Africa", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80", tag: "Adventure", country: "South Africa", budget: "$1,000–$2,500", rating: 4.7, price: "$1,600", duration: "9 nights", badge: "Adventure" },
  { id: 7, title: "Machu Picchu, Peru", img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&q=80", tag: "Adventure", country: "Peru", budget: "$500–$1,000", rating: 4.8, price: "$950", duration: "6 nights", badge: "Iconic" },
  { id: 8, title: "Kyoto, Japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80", tag: "Culture", country: "Japan", budget: "$1,000–$2,500", rating: 4.9, price: "$1,300", duration: "7 nights", badge: "Serene" },
  { id: 9, title: "Amalfi Coast, Italy", img: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=400&q=80", tag: "Relaxation", country: "Italy", budget: "$2,500–$5,000", rating: 4.8, price: "$2,600", duration: "5 nights", badge: "Scenic" },
  { id: 10, title: "Safari, Kenya", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80", tag: "Adventure", country: "Kenya", budget: "$5,000+", rating: 4.9, price: "$5,400", duration: "10 nights", badge: "Wildlife" },
  { id: 11, title: "Maldives", img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80", tag: "Relaxation", country: "Indonesia", budget: "$5,000+", rating: 5.0, price: "$6,200", duration: "7 nights", badge: "Luxury" },
  { id: 12, title: "Barcelona, Spain", img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=80", tag: "Culture", country: "Italy", budget: "$1,000–$2,500", rating: 4.7, price: "$1,750", duration: "5 nights", badge: "Vibrant" },
];

const countries  = ["All Countries","Indonesia","France","Japan","Greece","USA","South Africa","Peru","Italy","Kenya"];
const budgets    = ["Any Budget","Under $500","$500–$1,000","$1,000–$2,500","$2,500–$5,000","$5,000+"];
const activities = ["All Activities","Adventure","Culture","Relaxation","Popular","Trending"];
const ratings    = ["Any Rating","⭐ 3+","⭐ 4+","⭐ 4.5+","⭐ 5 only"];

function minRating(label) {
  if (label === "⭐ 3+")   return 3;
  if (label === "⭐ 4+")   return 4;
  if (label === "⭐ 4.5+") return 4.5;
  if (label === "⭐ 5 only") return 5;
  return 0;
}

// ─── Star Rating ─────────────────────────────────────────────────────────────

function StarRating({ value }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className={`w-3 h-3 ${value >= s ? "text-amber-400" : value >= s - 0.5 ? "text-amber-300" : "text-gray-200"}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.351 2.438c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.763 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"/>
        </svg>
      ))}
      <span className="ml-1 text-xs text-gray-500 font-medium">{value.toFixed(1)}</span>
    </span>
  );
}

// ─── Filter Dropdown ──────────────────────────────────────────────────────────

function FilterDropdown({ label, options, value, onChange, icon }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 whitespace-nowrap
          ${open
            ? "bg-amber-50 border-amber-400 text-amber-700 shadow-md shadow-amber-100"
            : "bg-white border-gray-200 text-gray-600 hover:border-amber-300 hover:bg-amber-50/50 shadow-sm"}`}
      >
        {icon && <span className="text-base">{icon}</span>}
        <span>{value || label}</span>
        <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180 text-amber-500" : "text-gray-400"}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in">
          {options.map((opt) => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150
                ${value === opt ? "bg-amber-50 text-amber-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({ item, index }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="card-enter bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100
      transition-all duration-300 hover:-translate-y-1 group"
      style={{ animationDelay: `${index * 60}ms` }}>

      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img src={item.img} alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          {item.badge}
        </span>
        <button onClick={() => setSaved((p) => !p)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center
            shadow-sm transition-all duration-200 hover:scale-110">
          <svg className={`w-4 h-4 transition-colors ${saved ? "text-red-500 fill-red-500" : "text-gray-400"}`}
            fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
        <div className="absolute bottom-3 right-3 bg-amber-400 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
          {item.price}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-sm font-bold text-gray-900 leading-tight">{item.title}</h3>
          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">{item.tag}</span>
        </div>
        <StarRating value={item.rating}/>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          {item.duration}
        </div>
        <button className="mt-3 w-full py-2 rounded-xl bg-gray-900 text-white text-xs font-semibold
          hover:bg-amber-500 transition-colors duration-200">
          View Tour →
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SearchDestination() {
  const [query,           setQuery]           = useState("");
  const [suggestions,     setSuggestions]     = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [country,         setCountry]         = useState("All Countries");
  const [budget,          setBudget]          = useState("Any Budget");
  const [activity,        setActivity]        = useState("All Activities");
  const [rating,          setRating]          = useState("Any Rating");
  const [searched,        setSearched]        = useState(false);
  const [results,         setResults]         = useState([]);
  const [loading,         setLoading]         = useState(false);

  const inputRef   = useRef(null);
  const resultsRef = useRef(null);

  // Live autocomplete suggestions
  useEffect(() => {
    if (query.trim().length > 0) {
      const f = allResults.filter((d) => d.title.toLowerCase().includes(query.toLowerCase()));
      setSuggestions(f);
      setShowSuggestions(f.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  // Re-filter when dropdowns change (only if already searched)
  useEffect(() => {
    if (searched) runSearch(false);
  }, [country, budget, activity, rating]);

  function runSearch(scroll = true) {
    setLoading(true);
    setShowSuggestions(false);

    setTimeout(() => {
      const r = allResults.filter((d) => {
        const matchQuery    = query.trim() === "" || d.title.toLowerCase().includes(query.toLowerCase());
        const matchCountry  = country  === "All Countries"   || d.country  === country;
        const matchBudget   = budget   === "Any Budget"      || d.budget   === budget;
        const matchActivity = activity === "All Activities"  || d.tag      === activity || d.badge === activity;
        const matchRating   = d.rating >= minRating(rating);
        return matchQuery && matchCountry && matchBudget && matchActivity && matchRating;
      });
      setResults(r);
      setSearched(true);
      setLoading(false);
      if (scroll && resultsRef.current)
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  }

  const activeFilters = [
    country  !== "All Countries"  && country,
    budget   !== "Any Budget"     && budget,
    activity !== "All Activities" && activity,
    rating   !== "Any Rating"     && rating,
  ].filter(Boolean);

  const clearAll = () => {
    setQuery("");
    setCountry("All Countries");
    setBudget("Any Budget");
    setActivity("All Activities");
    setRating("Any Rating");
    setSearched(false);
    setResults([]);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
        .search-wrap, .results-wrap { font-family: 'DM Sans', sans-serif; }
        @keyframes slideDown { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        .animate-in { animation: slideDown 0.18s ease-out forwards; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease-out forwards; }
        @keyframes cardEnter { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .card-enter { animation: cardEnter 0.4s ease-out both; }
        .search-input::placeholder { color: #9ca3af; }
        .search-input:focus { outline: none; }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        .skeleton { background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%); background-size: 400px 100%; animation: shimmer 1.4s infinite; }
      `}</style>

    
      <section className=" py-10 top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">


        <h2 className="text-5xl py-10 font-semibold text-[#1f2022] text-center">Destination</h2>

     
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">

            

            {/* Search Input */}
            <div className="relative flex-1 min-w-60">
              <div className="flex items-center gap-3 bg-white border-2 border-gray-200 rounded-2xl px-4 py-2.5 shadow-sm
                focus-within:border-amber-400 focus-within:shadow-md focus-within:shadow-amber-100/60 transition-all duration-300">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                </svg>
                <input
                  ref={inputRef} type="text" value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  onKeyDown={(e) => e.key === "Enter" && runSearch()}
                  placeholder="Search destinations..."
                  className="search-input flex-1 bg-transparent text-sm text-gray-800 font-medium"
                />
                {query && (
                  <button onClick={() => { setQuery(""); setSearched(false); setResults([]); }}
                    className="text-gray-300 hover:text-gray-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                )}
              </div>

              {/* Rich autocomplete suggestions */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in">

                    
            
                  {suggestions.map((s, i) => (
                    <button key={i}
                      onMouseDown={() => { setQuery(s.title); setShowSuggestions(false); setTimeout(() => runSearch(), 10); }}
                      className="w-full text-left px-4 py-3 hover:bg-amber-50 flex items-center gap-3
                        transition-colors duration-150 border-b border-gray-50 last:border-0">
                      <img src={s.img} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" alt=""/>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-800">{s.title}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                          <span>{s.tag}</span>
                          <span>·</span>
                          <span className="text-amber-500 font-medium">{s.price}</span>
                          <span>·</span>
                          <span>{s.duration}</span>
                        </div>
                      </div>
                      <span className="text-xs bg-amber-50 text-amber-600 font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                        {s.badge}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-200"/>


            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-2 items-center">
              <FilterDropdown label="Country"  options={countries}  value={country}  onChange={setCountry}  icon="🌍"/>
              <FilterDropdown label="Budget"   options={budgets}    value={budget}   onChange={setBudget}   icon="💰"/>
              <FilterDropdown label="Activity" options={activities} value={activity} onChange={setActivity} icon="🏄"/>
              <FilterDropdown label="Rating"   options={ratings}    value={rating}   onChange={setRating}   icon="⭐"/>
            </div>

            {/* Search Button */}
            <button onClick={() => runSearch()}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-amber-500 text-white text-sm font-semibold
              rounded-xl transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap">
              {/* <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
              </svg> */}
              Search
            </button>

            {(activeFilters.length > 0 || searched) && (
              <button onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-400
                  hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Clear
              </button>
            )}
          </div>

          {/* Active Filter Pills */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 fade-up">
              {activeFilters.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700
                  text-xs font-semibold rounded-full border border-amber-200">{f}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Results Area ── */}
      <section ref={resultsRef} className="results-wrap min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30 px-6 py-10">
        <div className="max-w-6xl mx-auto">

          {/* Empty state */}
          {!searched && !loading && (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-9 h-9 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                Find Your Next Adventure
              </h2>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                Type a destination in the search bar above, or try one of these popular picks.
              </p>
              <div className="flex flex-wrap gap-2 mt-8 justify-center">
                {["Bali","Paris","Tokyo","Safari, Kenya","Santorini"].map((q) => (
                  <button key={q}
                    onClick={() => { setQuery(q); setTimeout(() => runSearch(), 50); }}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600
                      hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 shadow-sm">
                    📍 {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Skeleton loader */}
          {loading && (
            <div>
              <div className="skeleton h-5 w-44 rounded-full mb-6"/>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                    <div className="skeleton h-48"/>
                    <div className="p-4 space-y-3">
                      <div className="skeleton h-4 rounded-full w-3/4"/>
                      <div className="skeleton h-3 rounded-full w-1/2"/>
                      <div className="skeleton h-3 rounded-full w-1/3"/>
                      <div className="skeleton h-8 rounded-xl mt-2"/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results grid */}
          {searched && !loading && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
                    {results.length > 0
                      ? `${results.length} destination${results.length !== 1 ? "s" : ""} found`
                      : "No results found"}
                  </h2>
                  {query && <p className="text-xs text-gray-400 mt-0.5">Showing results for &ldquo;{query}&rdquo;</p>}
                </div>
                {results.length > 0 && (
                  <span className="text-xs text-gray-400 bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm">
                    Sorted by relevance
                  </span>
                )}
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {results.map((item, i) => <ResultCard key={item.id} item={item} index={i}/>)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="text-4xl mb-4">🗺️</div>
                  <h3 className="text-lg font-bold text-gray-700 mb-1">No destinations match</h3>
                  <p className="text-sm text-gray-400 max-w-xs">Try adjusting your filters or searching for a different destination.</p>
                  <button onClick={clearAll}
                    className="mt-5 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl transition-colors">
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}