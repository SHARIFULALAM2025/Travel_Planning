'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { FaStar } from 'react-icons/fa'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Stories = () => {
  const { theme } = useTheme()
  const locale = useLocale()
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsVisible, setItemsVisible] = useState(3)


  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['All comment', locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/all-comments`
      )
      return res.data
    },
  })


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsVisible(1)
      else if (window.innerWidth < 1280) setItemsVisible(2)
      else setItemsVisible(3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  const maxIndex = useMemo(() => {
    return Math.max(0, comments.length - itemsVisible)
  }, [comments.length, itemsVisible])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }


  useEffect(() => {
    if (comments.length === 0) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide, comments.length])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const bgStyle =
    theme === 'dark'
      ? {
          backgroundColor: '#0F172A',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23334155' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H2V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }
      : {
          backgroundColor: '#FFFFFF',
        }

  return (
    <section
      style={bgStyle}
      className="py-5 px-4 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto relative group">

        <div className="text-center mb-5">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
          >
            What our customers are{' '}
            <span className="font-light">saying about us</span>
          </h2>
        </div>


        {comments.length > itemsVisible && (
          <>
            <button
              onClick={prevSlide}
              className="absolute -left-2 md:-left-6 top-[60%] -translate-y-1/2 z-30 p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl hover:bg-blue-600 hover:text-white transition-all active:scale-90"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-2 md:-right-6 top-[60%] -translate-y-1/2 z-30 p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl hover:bg-blue-600 hover:text-white transition-all active:scale-90"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}


        {isLoading ? (
          <div className="flex justify-center py-20">Loading stories...</div>
        ) : (
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
              }}
            >
              {comments.map((item, idx) => (
                <div
                  key={idx}
                  className="px-3"
                  style={{ minWidth: `${100 / itemsVisible}%` }}
                >
                  <div
                    className={`p-8 h-[350px] bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 relative flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-100">
                            <Image
                              src={item?.image || '/default-avatar.png'}
                              alt="user"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold dark:text-white">
                              {item?.name?.[locale]}
                            </h4>
                            <p className="text-xs text-white line-clamp-1">
                              {item?.email?.[locale]}
                            </p>
                          </div>
                        </div>
                        <div className="flex text-yellow-400 gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              size={14}
                              className={
                                i < parseInt(item?.rating?.[locale] || 5)
                                  ? 'fill-current'
                                  : 'text-gray-200'
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-white leading-relaxed italic line-clamp-6">
                        “{item?.comment?.[locale]}”
                      </p>
                    </div>


                    <div className="flex justify-center gap-1.5 mt-4">
                      {[...Array(maxIndex + 1)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${currentIndex === i ? 'w-6 bg-blue-600' : 'w-1.5 bg-gray-300 dark:bg-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Stories
