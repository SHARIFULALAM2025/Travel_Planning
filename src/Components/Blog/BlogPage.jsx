'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa'

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Adventure', 'Travel Tips', 'Food', 'Solo Trip']

  const blogs = [
    {
      id: 1,
      category: 'Adventure',
      title: 'Top 10 Hidden Gem Beaches in Bangladesh',
      excerpt:
        'Beyond Cox’s Bazar, there are several pristine beaches waiting to be explored...',
      author: 'Sajid Khan',
      date: 'Oct 12, 2025',
      readTime: '5 min read',
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      category: 'Travel Tips',
      title: 'How to Travel Europe on a Budget',
      excerpt:
        'Traveling to Europe doesn’t have to break the bank. Here is our secret guide...',
      author: 'Nabila Joy',
      date: 'Sep 28, 2025',
      readTime: '8 min read',
      image:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    },
    // আরও ডাটা যোগ করতে পারেন...
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* হেডার সেকশন */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Travel <span className="text-blue-600">Stories & Tips</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our latest travel guides, tips, and hidden stories from
            around the globe.
          </p>
        </div>

        {/* ক্যাটাগরি ফিল্টার */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ব্লগ কার্ড গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.article
              layout
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 dark:border-slate-800 flex flex-col"
            >
              {/* ইমেজ */}
              <div className="relative h-56 w-full">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>

              {/* কন্টেন্ট */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-blue-500" /> {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-blue-500" /> {blog.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                  {blog.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">
                      {blog.author[0]}
                    </div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {blog.author}
                    </span>
                  </div>

                  <button className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center gap-1 group">
                    Read More
                    <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
