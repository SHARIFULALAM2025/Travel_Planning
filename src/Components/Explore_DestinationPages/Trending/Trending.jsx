'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaRegHeart, FaExchangeAlt, FaStar } from 'react-icons/fa'
import { PiAirplaneTiltLight } from 'react-icons/pi'

const Trending = () => {
  const locale = useLocale()

  const { data: explore = [], isLoading } = useQuery({
    queryKey: ['All explore', locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/categoryExplore`
      )
      return res.data
    },
  })

  const FlightData = explore.filter((item) => item.category?.en === 'Flight')

  if (isLoading) return <div className="text-center py-20">Loading...</div>

  return (
    <section className="py-3 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl text-center md:text-4xl font-bold text-gray-100 mb-10">
        {locale === 'bn'
          ? 'আপনার যাত্রার জন্য শীর্ষ রেটযুক্ত ফ্লাইট'
          : 'Top Rated Flights for Your Journey'}
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FlightData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
          >
            {/* Image Section */}
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={item.image[0]}
                alt={item.flightTitle?.[locale]}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm">
                <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                  {item.seat?.[locale]}{' '}
                  {locale === 'bn' ? 'আসন বাকি' : 'Seats Left'}
                </p>
              </div>
              {/* Heart Icon */}
              <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:bg-red-500 hover:text-white transition-colors">
                <FaRegHeart size={14} />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">
                {item.flightTitle?.[locale]}
              </h3>

              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                  {item.company?.[locale]?.charAt(0)}
                </div>
                <p className="text-sm text-gray-500">
                  {item.company?.[locale]} • {item.destination?.[locale]}
                </p>
              </div>

              {/* Route Info */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 mb-5 border border-gray-100">
                <div className="flex items-center gap-2">
                  <PiAirplaneTiltLight className="text-gray-400 rotate-45" />
                  <span className="text-sm font-medium text-gray-700">
                    {item.from?.[locale]}
                  </span>
                </div>
                <FaExchangeAlt className="text-gray-300 text-xs" />
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {item.to?.[locale]}
                  </span>
                </div>
              </div>

              {/* Footer Section */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                <div className="flex items-center gap-1">
                  <div className="bg-yellow-400 text-black text-[11px] font-bold px-1.5 py-0.5 rounded">
                    {item.rating?.[locale]}
                  </div>
                  <span className="text-xs text-gray-500">
                    {item.review?.[locale]} Reviews
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block leading-none">
                    From
                  </span>
                  <span className="text-xl font-bold text-red-500">
                    ${item.price?.[locale]}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Trending
