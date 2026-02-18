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
            className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('https://i.ibb.co.com/TMkbGZ00/exploring-global-travel-destinations-world-map-visual-representation-business-environment-aerial-vie.webp')`
            }}
        >
            {/* Layered Overlays: vignette + gradient */}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 mix-blend-multiply" />

            {/* Subtle decorative pattern (faint) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.02),_transparent_20%)] pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col items-center justify-center text-center gap-6">
                {/* Intro */}
                <div className="max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
                        Discover your next adventure
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-slate-200/90 max-w-2xl mx-auto font-light leading-relaxed">
                        Plan effortlessly with curated recommendations, smart itineraries, and seamless booking — everything for premium travelers.
                    </p>
                </div>

                {/* Search Bar - glass panel */}
                <form
                    onSubmit={handleSearch}
                    className="w-full mt-6 bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl max-w-4xl"
                >
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                            <div className="flex flex-col">
                                <label className="text-xs text-slate-200/80 mb-1 font-medium">Destination</label>
                                <input
                                    type="text"
                                    name="destination"
                                    placeholder="Where are you going?"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white/90 text-slate-900 placeholder-slate-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs text-slate-200/80 mb-1 font-medium">Dates</label>
                                <input
                                    type="date"
                                    name="dates"
                                    value={formData.dates}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white/90 text-slate-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs text-slate-200/80 mb-1 font-medium">Guests</label>
                                <input
                                    type="number"
                                    name="guests"
                                    placeholder="Guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white/90 text-slate-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                            </div>
                        </div>

                        <div className="sm:ml-3 w-full sm:w-auto">
                            <button
                                type="submit"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Banner;