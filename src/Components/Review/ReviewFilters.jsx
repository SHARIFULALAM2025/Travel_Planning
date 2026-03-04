"use client"
import React, { useState } from 'react'
import { FaSearch, FaFilter, FaChevronDown } from 'react-icons/fa'

const ReviewFilters = () => {
  const [selectedSort, setSelectedSort] = useState('Newest')

  const travelerTypes = ['Solo', 'Couple', 'Family', 'Business', 'Friends']
  const popularMentions = [
    'Breakfast',
    'Swimming Pool',
    'Staff',
    'Wifi',
    'Location',
  ]

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 space-y-6 max-w-4xl mx-auto my-6">
      {/* ১. সার্চ বার এবং শর্টিং (Search & Sort) */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search reviews (e.g. 'cleanliness', 'food')..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
          />
        </div>

        <div className="relative min-w-[160px] w-full md:w-auto">
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
          >
            <option>Newest First</option>
            <option>Highest Rated</option>
            <option>Lowest Rated</option>
            <option>Most Helpful</option>
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
        </div>
      </div>

      {/* ২. ট্রাভেলার টাইপ ফিল্টার (Traveler Types) */}
      <div>
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <FaFilter className="text-xs" /> Filter by Traveler Type
        </h4>
        <div className="flex flex-wrap gap-2">
          {travelerTypes.map((type) => (
            <button
              key={type}
              className="px-4 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 text-xs font-medium hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all active:scale-95"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* ৩. জনপ্রিয় কিওয়ার্ড (Popular Mentions - 'Smart' Feature) */}
      <div className="pt-2">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-semibold">
          Popular in reviews:
        </p>
        <div className="flex flex-wrap gap-3">
          {popularMentions.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1 cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full group-hover:bg-blue-500" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewFilters
