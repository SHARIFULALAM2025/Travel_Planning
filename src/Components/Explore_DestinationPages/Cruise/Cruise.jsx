'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaStar, FaRegHeart, FaCheckCircle, FaAnchor } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { MdOutlineTimer, MdOutlinePeopleAlt } from 'react-icons/md'
import { useTheme } from 'next-themes'
import Link from 'next/link'

const Cruise = () => {
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
  const CruiseData = explore.filter(
    (item) => item.cat?.en === 'Cruise' || item.category?.en === 'Cruise'
  )
  console.log(CruiseData)


  if (isLoading)
    return (
      <div className="text-center py-3 font-medium text-blue-600">
        Sailing to get data...
      </div>
    )

  return (
    <section style={bgStyle} className="py-3 px-4 max-w-7xl mx-auto">
      {/* ক্যাচি হেডিং */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
        >
          <FaAnchor /> {locale === 'bn' ? 'সমুদ্র যাত্রা' : 'Ocean Expeditions'}
        </motion.div>
        <h2
          className={`text-3xl md:text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
        >
          {locale === 'bn'
            ? 'সেরা বিলাসবহুল ক্রুজ জাহাজসমূহ'
            : 'Explore World-Class Luxury Cruises'}
        </h2>
        <p
          className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} mt-4 max-w-2xl mx-auto text-lg`}
        >
          {locale === 'bn'
            ? 'নীল জলরাশিতে হারান এক চমৎকার অভিজ্ঞতার সাথে। বেছে নিন আপনার পছন্দের ক্রুজ।'
            : 'Sail away into the deep blue with our handpicked selection of premium cruises.'}
        </p>
      </div>

      {/* ক্রুজ কার্ড গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CruiseData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -12 }}
            className="bg-white rounded-xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-blue-50 group flex flex-col h-full"
          >
            {/* ইমেজ এবং ব্যাজ */}
            <div className="relative h-60 w-full overflow-hidden">
              <Image
                src={item.image?.[0]}
                alt={item.cruiseName?.[locale]}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />

              <div className="absolute top-5 left-5 flex flex-col gap-2">
                {item.verifiedStatus && (
                  <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full font-bold flex items-center gap-1 shadow-lg">
                    <FaCheckCircle size={10} /> {item.verifiedStatus?.[locale]}
                  </span>
                )}
                <span className="bg-white/90 backdrop-blur-md text-blue-700 text-[10px] px-3 py-1.5 rounded-full font-black shadow-lg uppercase">
                  {item.Luxury?.[locale] || 'Premium'}
                </span>
              </div>

              <button className="absolute top-5 right-5 p-3 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 hover:bg-white shadow-md transition-all">
                <FaRegHeart size={18} />
              </button>
            </div>

            {/* কার্ড বডি */}
            <div className="p-7 flex flex-col flex-grow">
              <Link href={`/cruise/${item._id}`} className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                {item.cruiseName?.[locale]}
              </Link>

              <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">
                <HiOutlineLocationMarker
                  className="text-blue-500 shrink-0"
                  size={18}
                />
                <span className="line-clamp-1">{item.location?.[locale]}</span>
              </div>

              {/* ক্রুজ স্পেসিফিক ডিটেইলস */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                  <MdOutlineTimer className="text-blue-500" size={20} />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">
                      Duration
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {item.details?.duration?.[locale]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                  <MdOutlinePeopleAlt className="text-blue-500" size={20} />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">
                      Guests
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {item.details?.noOfGuests}
                    </span>
                  </div>
                </div>
              </div>

              {/* ফুটার: রেটিং এবং প্রাইস */}
              <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-1">
                    <FaStar className="text-orange-400" size={14} />
                    <span className="text-slate-900 font-black text-sm">
                      {item.rating}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    ({item.totalReviews} {locale === 'bn' ? 'রিভিউ' : 'Reviews'}
                    )
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter leading-none mb-1">
                    Total Price
                  </p>
                  <p className="text-2xl font-black text-blue-600">
                    ${item.availableCabins?.[0]?.totalPrice || '750'}
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

export default Cruise
