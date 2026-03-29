'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { FaStar, FaRegHeart, FaCheckCircle } from 'react-icons/fa'
import { HiOutlineMapPin, HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { MdOutlineLocalDrink, MdOutlineWifi } from 'react-icons/md'
import { useTheme } from 'next-themes'

const Hotel = () => {
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
  // 'Hotel' ক্যাটাগরি ফিল্টার
  const HotelData = explore.filter(
    (item) => item.category?.en?.toLowerCase() === 'hotel'
  )

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center font-medium text-rose-600 animate-pulse">
          Finding best stays...
        </div>
      </div>
    )

  return (
    <section style={bgStyle} className="py-3 px-4 max-w-7xl mx-auto">
      {/* হেডিং সেকশন */}
      <div className="text-center ">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
        >
          <HiOutlineBuildingOffice2 size={16} />{' '}
          {locale === 'bn' ? 'সেরা হোটেল' : 'Luxury Stays'}
        </motion.div>
        <h2
          className={`text-3xl md:text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} italic`}
        >
          {locale === 'bn'
            ? 'পছন্দের গন্তব্যে সেরা হোটেল'
            : 'Find Your Perfect Sanctuary'}
        </h2>
        <p
          className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} mt-2 max-w-2xl mx-auto text-lg`}
        >
          {locale === 'bn'
            ? 'বিলাসিতা এবং আরামের এক অনন্য সংমিশ্রণ নিয়ে আপনার অপেক্ষায় আমাদের সেরা হোটেলগুলো।'
            : 'Handpicked hotels offering premium comfort, antique charm, and modern luxury.'}
        </p>
      </div>

      {/* হোটেল কার্ড গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {HotelData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col h-full hover:shadow-2xl transition-all duration-500"
          >
            {/* ইমেজ এবং স্ট্যাটাস */}
            <div className="relative h-60 w-full overflow-hidden">
              <Image
                src={item.image?.[0] || '/placeholder-hotel.jpg'}
                alt={item.hotelName?.[locale] || 'Hotel'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {item.verifiedStatus && (
                  <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] px-3 py-1.5 rounded-full font-black flex items-center gap-1 shadow-sm">
                    <FaCheckCircle className="text-rose-500" size={10} />{' '}
                    {item.verifiedStatus?.[locale]}
                  </span>
                )}
                <span className="bg-rose-600 text-white text-[10px] px-3 py-1.5 rounded-full font-bold shadow-lg uppercase tracking-tighter">
                  {item.refundPolicy?.[locale]}
                </span>
              </div>

              <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-rose-500 hover:bg-white shadow-md transition-all">
                <FaRegHeart size={18} />
              </button>
            </div>

            {/* কার্ড কন্টেন্ট */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-1 text-rose-500 mb-3">
                <HiOutlineMapPin size={18} />
                <span className="text-sm font-bold tracking-tight text-slate-400 uppercase">
                  {item.location?.[locale]}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-800 mb-2 line-clamp-1 group-hover:text-rose-600 transition-colors">
                {item.hotelName?.[locale]}
              </h3>

              <p className="text-slate-500 text-sm line-clamp-2 mb-2 leading-relaxed">
                {item.description?.[locale]}
              </p>

              {/* শর্ট অ্যামিনিটিস প্রিভিউ */}
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                  <MdOutlineWifi size={18} className="text-slate-800" /> Free
                  WiFi
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                  <MdOutlineLocalDrink size={18} className="text-slate-800" />{' '}
                  Bar
                </div>
                {item.amenities?.[locale]?.length > 2 && (
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">
                    +{item.amenities?.[locale]?.length - 2} More
                  </span>
                )}
              </div>

              {/* ফুটার */}
              <div className="mt-auto pt-2 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-orange-400" size={16} />
                    <span className="text-slate-900 font-black text-lg">
                      {item.reviewSummary?.averageRating}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">
                    {item.reviewSummary?.totalReviews}{' '}
                    {locale === 'bn' ? 'রিভিউ' : 'Total Reviews'}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none mb-1">
                    Capacity
                  </span>
                  <span className="text-slate-900 font-black text-sm italic">
                    {item.total?.en || 'N/A'}
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

export default Hotel
