'use client'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { useTheme } from 'next-themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { SiGooglemaps } from 'react-icons/si'
import { useLocale } from 'next-intl'
import Link from 'next/link'

const LastMinuteOffers = () => {
  const locale = useLocale()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsVisible, setItemsVisible] = useState(4)

  // API Fetching
  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ['All room', locale],
    queryFn: async () => {
      const baseUrl =
        process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend ||
        'http://localhost:5000'
      const res = await axios.get(`${baseUrl}/all-new-hotel`)
      return res.data
    },
  })

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsVisible(1)
      else if (window.innerWidth < 1024) setItemsVisible(2)
      else setItemsVisible(4)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = useMemo(
    () => Math.max(0, rooms.length - itemsVisible),
    [rooms.length, itemsVisible]
  )

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Auto-play
  useEffect(() => {
    if (rooms.length === 0) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide, rooms.length])

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <section
      className={`py-12 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50/50'} transition-colors duration-300`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl md:text-5xl font-bold dark:text-white">
            Hotel <span className="text-blue-600">Rooms</span>
          </h2>
          <div className="hidden md:flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-gray-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-gray-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative group/main">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
              }}
            >
              {rooms.map((item, index) => (
                <div
                  key={item._id || index}
                  className="px-2"
                  style={{ minWidth: `${100 / itemsVisible}%` }}
                >
                  <div className="group relative h-[400px] md:h-[450px] w-full overflow-hidden rounded-xl shadow-lg bg-slate-800">
                    {/* Image */}
                    <Image
                      src={
                        item.image?.[0] ||
                        'https://i.ibb.co/v4HbRHBK/frames-for-your-heart-Fqqi-Av-Jejto-unsplash.jpg'
                      }
                      alt={item.title?.[locale] || 'Hotel Room'}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent z-10" />

                    {/* Price Tag */}
                    <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                      <span className="text-white font-bold text-sm">
                        ${item.price?.[locale] || item.price || '0'}
                        <span className="text-xs font-normal opacity-80">
                          {' '}
                          / night
                        </span>
                      </span>
                    </div>

                    {/* Offer Badge */}
                    <div className="absolute top-4 right-4 bg-orange-500 px-3 py-1 rounded-lg z-20 shadow-lg">
                      <span className="text-[10px] font-black text-white uppercase italic">
                        Limited Deal
                      </span>
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 z-20">
                      <div className="space-y-3 transform transition-transform duration-500 group-hover:-translate-y-3">
                        <div className="flex items-center gap-2 text-blue-400">
                          <SiGooglemaps className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">
                            {item.city?.[locale] || 'Luxury Stay'}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight line-clamp-2 group-hover:text-blue-200 transition-colors">
                          {item.title?.[locale]}
                        </h3>

                        {/* Short Features */}
                        <div className="flex gap-3 text-[11px] text-gray-300">
                          <span>{item.guest?.[locale] || '2 Guests'}</span>
                          <span className="w-1 h-1 bg-gray-500 rounded-full my-auto"></span>
                          <span>{item.bed?.[locale] || '1 Bed'}</span>
                        </div>
                      </div>

                      <div className="mt-5 h-0 opacity-0 group-hover:h-12 group-hover:opacity-100 transition-all duration-500">
                        <Link
                          href={`/hotel/${item._id}`}
                          className="w-full h-11 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold shadow-lg active:scale-95 transition-all"
                        >
                          Book Now
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/all-rooms"
            className="group flex items-center gap-3 text-gray-500 dark:text-gray-400 font-bold hover:text-blue-600 transition-all duration-300"
          >
            <span className="uppercase text-xs tracking-[0.2em] border-b-2 border-transparent group-hover:border-blue-600 pb-1">
              Explore All Offers
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

export default LastMinuteOffers
