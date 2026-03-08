'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'

const SingleBlog = ({ currentBlog }) => {
  // Safety check to prevent errors if data hasn't loaded yet
  if (!currentBlog) return <div className="p-10 text-center">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center   rounded-3xl overflow-hidden shadow-xl ">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 h-[300px] md:h-[450px] relative">
          <Image
            src={currentBlog.image}
            alt={currentBlog.title}
            fill
            className="object-cover rounded-lg"
            priority // Fast loading for the main blog image
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 p-6 md:p-10 lg:pr-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase   rounded-full">
            Explore the world with us
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
            {currentBlog.title}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
            {currentBlog.excerpt}
          </p>

          <div className="flex items-center gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <Link href={`/blog/${currentBlog.id}/book`}>
              <motion.button
                button
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group flex items-center gap-2  text-white px-3 py-2 rounded-lg text-base font-bold bg-blue-600 "
              >
                <motion.div
                  className="flex items-center gap-3"
                  variants={{
                    rest: { flexDirection: 'row' },
                    hover: { flexDirection: 'row-reverse' },
                  }}
                >
                  <motion.span
                    layout
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  >
                    BOOK YOUR ROOM
                  </motion.span>
                  <motion.span
                    layout
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                    className="flex items-center"
                  >
                    <FaArrowRight />
                  </motion.span>
                </motion.div>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleBlog
