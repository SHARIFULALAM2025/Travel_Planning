"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const ReviewSummary = () => {
  // ডামি ডাটা (পরবর্তীতে প্রপস হিসেবে পাস করতে পারবেন)
  const ratings = [
    { star: 5, count: 120, color: 'bg-emerald-500' },
    { star: 4, count: 45, color: 'bg-blue-500' },
    { star: 3, count: 12, color: 'bg-yellow-400' },
    { star: 2, count: 5, color: 'bg-orange-400' },
    { star: 1, count: 2, color: 'bg-red-500' },
  ];

  const categories = [
    { name: 'Location', score: 4.9 },
    { name: 'Cleanliness', score: 4.7 },
    { name: 'Service', score: 4.5 },
    { name: 'Value for Money', score: 4.2 },
  ];

  const totalReviews = ratings.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6  shadow-lg border border-gray-100 dark:border-slate-800 ">
      <h2 className="text-2xl font-bold mb-6   text-center">
        Guest Reviews{' '}
        <span className="text-gray-400 text-2xl font-normal">({totalReviews})</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* 1. Overall Rating Score */}
        <div className="flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <div className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">
            4.8
          </div>
          <div className="flex text-yellow-400 my-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Exceptional
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Based on {totalReviews} reviews
          </p>
        </div>

        {/* 2. Rating Breakdown Bars */}
        <div className="space-y-3">
          {ratings.map((rate) => (
            <div key={rate.star} className="flex items-center gap-3">
              <span className="text-sm font-medium w-3">{rate.star}</span>
              <div className="flex-grow h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(rate.count / totalReviews) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full ${rate.color}`}
                />
              </div>
              <span className="text-xs text-gray-400 w-8">{rate.count}</span>
            </div>
          ))}
        </div>

        {/* 3. Category Breakdown */}
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  {cat.name}
                </span>
                <span className="font-bold text-gray-800 dark:text-white">
                  {cat.score}
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${(cat.score / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Summary Highlight (Pro Feature) */}
      <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/10 border-l-4 border-emerald-500 rounded-r-lg">
        <p className="text-sm text-emerald-800 dark:text-emerald-300 italic">
          TravelMate AI Summary: Most travelers loved the exceptional location
          and clean rooms, though some mentioned the breakfast wait time during
          weekends.
        </p>
      </div>
    </div>
  )
};

export default ReviewSummary;