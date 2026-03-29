'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaStar, FaRegHeart, FaGlobeAmericas, FaPassport } from 'react-icons/fa'
import { HiOutlineClock, HiOutlineShieldCheck } from 'react-icons/hi'
import { MdOutlineModeEditOutline } from 'react-icons/md'

const Visa = () => {
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

  // 'visa' ক্যাটাগরি ফিল্টার করা
  const VisaData = explore.filter(
    (item) =>
      item.category?.en === 'visa' ||
      item.cat?.en?.toLowerCase().includes('visa')
  )

  if (isLoading)
    return (
      <div className="text-center py-20 font-medium text-emerald-600">
        Checking visa updates...
      </div>
    )

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* ক্যাচি হেডিং */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
        >
          <FaPassport />{' '}
          {locale === 'bn' ? 'ভিসা সহায়তা' : 'Global Visa Solutions'}
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100">
          {locale === 'bn'
            ? 'সহজ এবং দ্রুত ভিসা প্রসেসিং'
            : 'Fast & Reliable Visa Services'}
        </h2>
        <p className="text-slate-100 mt-4 max-w-2xl mx-auto text-lg">
          {locale === 'bn'
            ? 'আপনার বিদেশের স্বপ্ন পূরণ করতে আমরা দিচ্ছি সঠিক গাইডলাইন এবং প্রসেসিং সাপোর্ট।'
            : 'Expert guidance for your academic and travel visas with high success rates.'}
        </p>
      </div>

      {/* ভিসা কার্ড গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VisaData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 group flex flex-col h-full"
          >
            {/* ইমেজ সেকশন */}
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={item.image?.[0]}
                alt="visa image"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />

              <div className="absolute top-5 left-5">
                <span className="bg-white/95 backdrop-blur-md text-emerald-700 text-[11px] px-4 py-1.5 rounded-full font-black shadow-lg flex items-center gap-2">
                  <FaGlobeAmericas className="animate-spin-slow" />{' '}
                  {item.country?.[locale]}
                </span>
              </div>

              <button className="absolute top-5 right-5 p-3 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-rose-500 hover:bg-white shadow-md transition-all">
                <FaRegHeart size={18} />
              </button>
            </div>

            {/* কন্টেন্ট সেকশন */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="mb-4">
                <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-md">
                  {item.cat?.[locale]}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors leading-snug">
                {item.visaName?.[locale]}
              </h3>

              {/* ভিসা ডিটেইলস গ্রিড */}
              <div className="grid grid-cols-2 gap-4 ">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <HiOutlineClock className="text-emerald-500" size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      Processing
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {item.processingTime?.[locale]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <MdOutlineModeEditOutline
                      className="text-emerald-500"
                      size={20}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      Visa Mode
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {item.visaMode?.[locale]}
                    </span>
                  </div>
                </div>
              </div>

              {/* ফুটার: ভ্যালিডিটি এবং রেটিং */}
              <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" size={14} />
                  <span className="text-slate-900 font-black text-sm">
                    {item.reviewSummary?.averageRating || 4.9}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    ({item.reviewSummary?.totalReviews})
                  </span>
                </div>

                <div className="text-right flex items-center gap-1.5 text-emerald-600 font-bold">
                  <HiOutlineShieldCheck size={18} />
                  <span className="text-sm">
                    {item.validity?.[locale]}{' '}
                    {locale === 'bn' ? 'মেয়াদ' : 'Validity'}
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

export default Visa
