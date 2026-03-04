"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { FaStar, FaCheckCircle, FaThumbsUp, FaRegFlag } from 'react-icons/fa'
import { motion } from 'framer-motion'

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // ডামি ডাটা যদি প্রপস না থাকে
  const data = review || {
    userName: 'Arifur Rahman',
    userLevel: 'Level 4 Contributor',
    userReviews: 12,
    rating: 5,
    date: 'March 2024',
    title: 'An unforgettable experience in the mountains!',
    comment:
      'The view from the balcony was absolutely breathtaking. We stayed there for 3 nights and the service was top-notch. The only minor issue was the WiFi speed in the evening, but everything else was perfect. Highly recommended for families who love nature and peace.',
    isVerified: true,
    images: ['/room1.jpg', '/view2.jpg', '/food1.jpg'], // আপনার পাবলিক ফোল্ডারের ইমেজের পাথ
  }

  const toggleReadMore = () => setIsExpanded(!isExpanded)

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
      {/* ১. ইউজার প্রোফাইল এবং ভেরিফাইড ব্যাজ (Header) */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 dark:border-blue-900">
            <Image
              src="https://i.ibb.co.com/RG28Hb6L/Trip-amico.png"
              fill
              alt={data.userName}
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white leading-tight">
              {data.userName}
            </h4>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              {data.userLevel} • {data.userReviews} reviews
            </p>
          </div>
        </div>

        {data.isVerified && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-800 shadow-sm">
            <FaCheckCircle className="text-xs" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Verified Stay
            </span>
          </div>
        )}
      </div>

      {/* ২. রেটিং এবং তারিখ */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex text-yellow-400 text-sm">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={
                i < data.rating
                  ? 'text-yellow-400'
                  : 'text-gray-200 dark:text-gray-700'
              }
            />
          ))}
        </div>
        <span className="text-xs text-gray-400 italic">
          Stayed in {data.date}
        </span>
      </div>

      {/* ৩. রিভিউ টাইটেল এবং কমেন্ট (Read More ফিচারসহ) */}
      <div className="mb-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">
          {data.title}
        </h3>
        <p
          className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed ${!isExpanded && 'line-clamp-3'}`}
        >
          {data.comment}
        </p>
        {data.comment.length > 150 && (
          <button
            onClick={toggleReadMore}
            className="text-blue-600 dark:text-blue-400 text-xs font-bold mt-2 hover:underline focus:outline-none"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

      {/* ৪. ফটো গ্যালারি (Horizontal Scroll) */}
      {data.images && data.images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-4">
          {data.images.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="relative min-w-[140px] h-24 rounded-xl overflow-hidden cursor-pointer border dark:border-slate-700"
            >
              <div className="bg-gray-200 dark:bg-slate-800 w-full h-full animate-pulse absolute" />{' '}
              {/* লোডিং স্টেট */}
              <Image
                src={img}
                fill
                alt={`Review ${idx}`}
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* ৫. ইন্টারেকশন বাটনস (Helpful/Report) */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors">
            <FaThumbsUp />
            Helpful
          </button>
          <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors">
            <FaRegFlag />
            Report
          </button>
        </div>
        <p className="text-[11px] text-gray-400 uppercase font-medium">
          Was this review helpful?
        </p>
      </div>
    </div>
  )
}

export default ReviewCard
