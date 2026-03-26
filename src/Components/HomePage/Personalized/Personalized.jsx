'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { SiGooglemaps } from 'react-icons/si'
import { IoIosArrowForward } from 'react-icons/io'
import { useTheme } from 'next-themes'
import { useEffect, useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'

const Personalized = () => {
  const locale = useLocale()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsVisible, setItemsVisible] = useState(4) // Default to desktop

  // API Fetching
  const { data: popular = [] } = useQuery({
    queryKey: ['All popular', locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/all-popular`
      )
      return res.data
    },
  })

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsVisible(1) // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsVisible(2) // Tablet
      } else {
        setItemsVisible(4) // Desktop
      }
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, popular.length - itemsVisible)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Auto-play timer
  useEffect(() => {
    if (popular.length === 0) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide, popular.length])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section
      className={`py-12 px-4 sm:px-8 md:px-12 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}
    >
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-3xl md:text-5xl text-center font-bold mb-10">
          Popular <span className="text-blue-600">Tours</span>
        </h2>

        <div className="relative group/main">
          {/* Navigation Buttons - Hidden on small mobile for cleaner look, visible on hover or tablet+ */}
          <button
            onClick={prevSlide}
            className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full shadow-xl hover:bg-blue-600 hover:text-white transition-all duration-300 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
              }}
            >
              {popular.map((item, index) => (
                <div
                  key={index}
                  className="px-2 transition-all duration-300"
                  style={{ minWidth: `${100 / itemsVisible}%` }}
                >
                  {/* Card Container */}
                  <div className="group relative h-[380px] md:h-[420px] w-full overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-slate-800">
                    {/* Image */}
                    <Image
                      src={item.image[0]}
                      alt={item.title?.[locale] || 'tour'}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-yellow-400 px-3 py-1 rounded-lg z-20 shadow-md">
                      <span className="text-xs font-bold text-black uppercase tracking-tighter">
                        20% offer
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-5 z-20">
                      <div className="space-y-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                        <div className="flex items-center gap-2 text-blue-400">
                          <SiGooglemaps className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                            Explore
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight line-clamp-2">
                          {item.title?.[locale]}
                        </h3>
                      </div>

                      {/* Animated Button: Mobile-এ সবসময় দৃশ্যমান, Desktop-এ হোভারে আসবে */}
                      <div className="mt-4 overflow-hidden transition-all duration-500 opacity-100 lg:h-0 lg:opacity-0 lg:group-hover:h-12 lg:group-hover:opacity-100">
                        <Link
                          href={`/destination/${item._id}`}
                          className="w-full h-10 md:h-11 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all active:scale-95"
                        >
                          View All TOUR
                          <IoIosArrowForward />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full shadow-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* See More */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/all-tours"
            className="group flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold hover:text-blue-600 transition-all duration-300"
          >
            <span className="border-b-2 border-transparent group-hover:border-blue-600 pb-1 uppercase text-sm tracking-widest">
              See More Tours
            </span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Personalized
