'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaRegClock, FaUser, FaCalendarAlt } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa6'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Container from '../Container/Container'

const BlogPage = () => {
  const t = useTranslations('blogsData')
  const blogs=t.raw("items") || []

  return (
    <Container>
      <section className="grid grid-cols-12">
        <div className="min-h-screen col-span-9 bg-slate-50 dark:bg-slate-950 py-5  px-4 sm:px-6 lg:px-8">
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

                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Footer Action */}
                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                      <Link href={`/blog/${blog.id}`}>
                        <motion.button
                          initial="rest"
                          whileHover="hover"
                          animate="rest"
                          className="group flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400"
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
                              READ MORE
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
                </motion.article>
              ))}
            </div>
          </div>
        </div>
        {/* Sidebar: col-span-3 */}
        <aside className="col-span-12 lg:col-span-3 bg-white shadow-md  dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-8 min-h-screen">
          <div className="sticky top-24 space-y-10">
            {/* Search Widget */}
            <div className="relative">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Search
              </h4>
              <div className="relative group">
                <input
                  type="search"
                  placeholder="Search blogs..."
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 pl-4 pr-12 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Categories
              </h4>
              <ul className="space-y-3">
                {['Adventure', 'Travel Tips', 'Hidden Gems', 'Local Food'].map(
                  (cat) => (
                    <li key={cat}>
                      <button className="flex items-center justify-between w-full text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                        <span className="text-sm font-medium">{cat}</span>
                        <span className="bg-slate-100 dark:bg-slate-800 text-[10px] px-2 py-1 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
                          12
                        </span>
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* recent post use before data */}
            {/* Recent Posts */}
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Recent Posts
              </h4>
              <div className="space-y-6">
                {blogs.map((post) => (
                  <div
                    key={post.id}
                    className="group flex gap-4 items-start cursor-pointer"
                  >
                    {/* Small Thumbnail */}
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* Post Info */}
                    <div className="flex flex-col gap-1">
                      <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                        {post.title}
                      </h5>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <FaCalendarAlt className="text-blue-500" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </section>
    </Container>
  )
}

export default BlogPage
