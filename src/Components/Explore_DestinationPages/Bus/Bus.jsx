'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaBus, FaStar, FaRegHeart, FaCheckCircle } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { TbSteeringWheel } from 'react-icons/tb'
import { useTheme } from 'next-themes'
import Link from 'next/link'

const Bus = () => {
  const locale = useLocale()
const { theme } = useTheme()
  const { data: explore = [], isLoading } = useQuery({
    queryKey: ['All explore', locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/categoryExplore`
      )
      return res.data
    },
  })
 const bgStyle =
   theme === 'dark'
     ? {
         backgroundColor: '#0F172A',
         backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23334155' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H2V1z'%3E%3C/path%3E%3C/svg%3E")`,
       }
     : {
         backgroundColor: '#FFFFFF',
       }
  
  const BusData = explore.filter((item) => item.category?.en === 'Bus')

  if (isLoading)
    return (
      <div className="text-center py-20 font-medium">
        Loading amazing journeys...
      </div>
    )

  return (
    <section style={bgStyle} className="py-16 px-4 max-w-7xl mx-auto">
      {/* আকর্ষণীয় হেডিং */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-red-100 font-bold tracking-widest uppercase text-sm block mb-2"
        >
          {locale === 'bn' ? 'আরামদায়ক ভ্রমণ' : 'Premium Travel Experience'}
        </motion.span>
        <h2
          className={`text-3xl md:text-5xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} leading-tight`}
        >
          {locale === 'bn'
            ? 'শীর্ষ রেটযুক্ত বাস সার্ভিসসমূহ'
            : 'Top Rated Bus Services for You'}
        </h2>
        <p
          className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} mt-4 max-w-2xl mx-auto text-lg`}
        >
          {locale === 'bn'
            ? 'সবচেয়ে সাশ্রয়ী এবং ভেরিফাইড বাসে উপভোগ করুন আপনার পরবর্তী যাত্রা।'
            : 'Find the best-rated, verified bus services with premium amenities for a relaxed journey.'}
        </p>
      </div>

      {/* কার্ড গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BusData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 group flex flex-col h-full"
          >
            {/* ইমেজ সেকশন */}
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={item.image?.[0]}
                alt={item.busName?.[locale] || 'Bus Image'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* স্ট্যাটাস ব্যাজ (Verified/Cheapest) */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {item.verifiedStatus && (
                  <span className="bg-green-500/90 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-bold flex items-center gap-1 w-fit">
                    <FaCheckCircle size={10} /> {item.verifiedStatus?.[locale]}
                  </span>
                )}
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-bold w-fit">
                  {item.busInformation?.seats}{' '}
                  {locale === 'bn' ? 'আসন' : 'Seats'}
                </span>
              </div>

              <button className="absolute top-4 right-4 p-2.5 bg-white/90 rounded-full text-gray-400 hover:text-red-500 shadow-sm transition-all">
                <FaRegHeart size={16} />
              </button>
            </div>


            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-3">
                <Link href={`/bus/${item._id}`} className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-red-500 transition-colors">
                  {item.busName?.[locale]}
                </Link>
              </div>


              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <HiOutlineLocationMarker className="text-red-500 shrink-0" />
                <span className="truncate">
                  {item.from?.[locale] || 'Dhaka'} to{' '}
                  {item.to?.[locale] || 'Chittagong'}
                </span>
              </div>

              {/* ছোট স্পেসিফিকেশন */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-gray-100 text-gray-600 text-[11px] px-3 py-1 rounded-lg font-medium flex items-center gap-1">
                  <TbSteeringWheel className="text-gray-400" /> {item.brand}
                </span>
                <span className="bg-red-50 text-red-600 text-[11px] px-3 py-1 rounded-lg font-bold">
                  {item.busType?.[locale]}
                </span>
              </div>

              {/* ফুটারে প্রাইস এবং রেটিং */}
              <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-md">
                    <FaStar className="text-yellow-500" size={12} />
                    <span className="text-gray-900 font-bold text-sm">
                      {item.rating}
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      ({item.totalReviews || item.reviewSummary?.totalReviews})
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
                    Starting from
                  </p>
                  <p className="text-2xl font-black text-red-500 leading-none">
                    ৳{item.price?.[locale] || '850'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Bus
