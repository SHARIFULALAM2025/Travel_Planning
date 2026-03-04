'use client';

import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';

const images = [
  "/assets/image121.jpg",
  "/assets/bannerimage2.jpg",
  "/assets/bannerimage3.jpg",
  "/assets/bannerimage4.jpg",
  "/assets/bannerimage6.jpg",

];

const Banner = () => {
  const t = useTranslations('banner')
    const [formData, setFormData] = useState({
        destination: '',
        dates: '',
        guests: ''
    });

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % images.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

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
        className={` relative w-full h-[85vh] flex items-center justify-center overflow-hidden `}
      >
        {/* Background slider */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-10">
          {/* Heading */}
          <div className="max-w-6xl">
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {t('title')}
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-8 font-light tracking-wide">
             {t("des")}
            </p>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="w-full mt-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                name="destination"
                placeholder="Where are you going?"
                value={formData.destination}
                onChange={handleChange}
                className="px-5 py-3 rounded-xl bg-white/95 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 outline-none shadow-md"
              />

              <input
                type="date"
                name="dates"
                value={formData.dates}
                onChange={handleChange}
                className="px-5 py-3 rounded-xl bg-white/95 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none shadow-md"
              />

              <input
                type="number"
                name="guests"
                placeholder="Guests"
                value={formData.guests}
                onChange={handleChange}
                className="px-5 py-3 rounded-xl bg-white/95 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none shadow-md"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-blue-600 text- font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Search
            </button>
          </form>
        </div>
      </section>
    )
};

export default Banner;