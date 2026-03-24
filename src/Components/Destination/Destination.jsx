'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { SiGooglemaps } from 'react-icons/si'
import { IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'

const Destination = () => {
  const locale = useLocale()
  const { theme } = useTheme()
 const [mounted, setMounted] = useState(false)
  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ['All-des', locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/all-destination`
      )
      return res.data
    },
  })
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null
  return (
    <div className={`${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      {/* ১. হিরো সেকশন (ব্যানার) */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <Image
          src="https://i.ibb.co.com/TDCpdNnB/datingscout-Rl-Q29vvb-U2-Q-unsplash.jpg"
          alt="destination image"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/40">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold uppercase tracking-tighter">
            Destinations
          </h1>
          <p className="text-xl md:text-3xl font-semibold lg:text-5xl mt-4">
            Explore Tours By Destinations
          </p>
        </div>
      </div>

      {/* ২. ডেস্টিনেশন কার্ড গ্রিড সেকশন */}
      <div className="max-w-7xl mx-auto px-4 mt-5 md:mt-5">
        {isLoading ? (
          <div className="text-center py-20 text-2xl font-bold">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((item, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl shadow-xl aspect-[3/4] cursor-pointer"
              >
                {/* ইমেজ এবং জুম ইফেক্ট */}
                <Image
                  src={item.image}
                  alt={item.location?.[locale]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* ডার্ক গ্রাডিয়েন্ট ওভারলে */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>

                {/* হবার ব্লার ইফেক্ট */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

                {/* কার্ড কন্টেন্ট */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col z-30 transition-all duration-500 group-hover:-translate-y-4">
                  {/* লোকেশন এবং ট্যুর কাউন্ট */}
                  <div className="flex items-center justify-between text-white mb-6">
                    <div className="flex items-center gap-3">
                      <SiGooglemaps className="w-6 h-6 shrink-0 text-blue-400" />
                      <h3 className="text-2xl font-bold tracking-tight">
                        {item.location?.[locale]}
                      </h3>
                    </div>
                    <span className="text-xl text-blue-400 font-bold">
                      {item.tours?.[locale]}
                    </span>
                  </div>

                  {/* হবার বাটন */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <Link href={`/destination/${item._id}`} className="text-xl font-semibold flex items-center text-blue-400">
                      View all tours
                      <IoIosArrowForward />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Destination
