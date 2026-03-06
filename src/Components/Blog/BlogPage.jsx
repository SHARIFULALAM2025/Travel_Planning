'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaRegClock, FaUser, FaCalendarAlt } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa6'

const BlogPage = () => {
  const blogs = [
    {
      id: 1,
      category: 'Adventure',
      title: 'Top 10 Hidden Gem Beaches in Bangladesh',
      excerpt:
        'Beyond Cox’s Bazar, there are several pristine beaches waiting to be explored with crystal clear waters...',
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
        'Traveling to Europe doesn’t have to break the bank. Here is our secret guide to finding affordable stays...',
      author: 'Nabila Joy',
      date: 'Sep 28, 2025',
      readTime: '8 min read',
      image:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    },
  ]

  return (
    <section className='grid grid-cols-12'>
      <div className="min-h-screen col-span-9 bg-slate-50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Blog Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {blogs.map((blog) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta Info */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <FaUser className="text-blue-500" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-blue-500" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaRegClock className="text-blue-500" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Footer Action */}
                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                    <motion.button
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      className="group flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400"
                    >
                      {/* কন্টেইনার যা হোভার করলে রিভার্স হয়ে যাবে */}
                      <motion.div
                        className="flex items-center gap-3"
                        variants={{
                          rest: { flexDirection: 'row' },
                          hover: { flexDirection: 'row-reverse' },
                        }}
                        // transition: layout প্রপার্টি পজিশন চেঞ্জটাকে স্মুথ করবে
                      >
                        {/* টেক্সট অংশ */}
                        <motion.span
                          layout
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 30,
                          }}
                        >
                          READ MORE
                        </motion.span>

                        {/* আইকন অংশ - এখানে layout থাকায় এটি বামে সরে আসবে কিন্তু রোটেশন হবে না */}
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
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-3 bg-red-300">

      </div>
    </section>
  )
}

export default BlogPage
