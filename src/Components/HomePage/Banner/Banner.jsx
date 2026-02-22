'use client';

import React, { useState } from 'react';

const Banner = () => {
    const [formData, setFormData] = useState({
        destination: '',
        dates: '',
        guests: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search:', formData);
    };

    return (
        <section
            className="relative w-full h-[85vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('https://i.ibb.co.com/TMkbGZ00/exploring-global-travel-destinations-world-map-visual-representation-business-environment-aerial-vie.webp')`
            }}
        >
            {/* Layered overlays */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.03),_transparent_25%)] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col items-center text-center gap-8">
                
                {/* Headline */}
                <div className="max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-xl">
                        Discover Your Next Adventure
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-slate-200/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                        Plan effortlessly with curated recommendations, smart itineraries, and seamless booking — everything for premium travelers.
                    </p>
                </div>

                {/* Search Form */}
                <form
                    onSubmit={handleSearch}
                    className="w-full mt-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center gap-4"
                >
                    <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">

                        {/* Destination */}
                        <div className="flex flex-col">
                            <label className="text-xs text-slate-200/80 mb-1 font-semibold tracking-wide uppercase">Destination</label>
                            <input
                                type="text"
                                name="destination"
                                placeholder="Where are you going?"
                                value={formData.destination}
                                onChange={handleChange}
                                className="w-full px-5 py-3 rounded-xl bg-white/95 text-slate-900 placeholder-slate-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition-all"
                            />
                        </div>

                        {/* Dates */}
                        <div className="flex flex-col">
                            <label className="text-xs text-slate-200/80 mb-1 font-semibold tracking-wide uppercase">Dates</label>
                            <input
                                type="date"
                                name="dates"
                                value={formData.dates}
                                onChange={handleChange}
                                className="w-full px-5 py-3 rounded-xl bg-white/95 text-slate-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition-all"
                            />
                        </div>

                        {/* Guests */}
                        <div className="flex flex-col">
                            <label className="text-xs text-slate-200/80 mb-1 font-semibold tracking-wide uppercase">Guests</label>
                            <input
                                type="number"
                                name="guests"
                                placeholder="Guests"
                                value={formData.guests}
                                onChange={handleChange}
                                className="w-full px-5 py-3 rounded-xl bg-white/95 text-slate-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition-all"
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="sm:ml-4 w-full sm:w-auto">
                        <button
                            type="submit"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Banner;