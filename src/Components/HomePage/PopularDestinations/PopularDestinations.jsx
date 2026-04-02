'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import EastIcon from '@mui/icons-material/East'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import { IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'
import { SiGooglemaps } from 'react-icons/si'

const PopularDestination = () => {
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
   const bgStyle =
     theme === 'dark'
       ? {
           backgroundColor: '#0F172A',

           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23334155' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H2V1z'%3E%3C/path%3E%3C/svg%3E")`,
         }
       : {
           backgroundColor: '#FFFFFF',
         }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section style={bgStyle} className={`  px-4`}>
      {/* Section Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Top <span className="text-blue-600">Destinations</span>
        </h2>
        <p
          className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-lg leading-relaxed`}
        >
          Explore our top destinations voted by more than 100,000+ customers
          around the world.
        </p>
        <Link
          href="/destination"
          className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:underline transition-all group"
        >
          View All Destinations
          <EastIcon className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      {/* Grid Layout - 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? [1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-[400px] bg-gray-800 animate-pulse rounded-2xl"
              />
            ))
          : destinations.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className="group relative h-[400px] w-full overflow-hidden rounded-xl shadow-2xl cursor-pointer bg-slate-800"
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.location?.[locale]}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                {/* Content Container */}

                <div className="absolute inset-x-0 bottom-0 p-6 z-20 transition-all duration-500 transform lg:group-hover:-translate-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-400">
                      <SiGooglemaps className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-widest">
                        Explore
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {item.location?.[locale]}
                    </h3>
                  </div>

                  {/* Animated Button/Link */}

                  <div className="mt-4 overflow-hidden transition-all duration-500 h-10 opacity-100 lg:h-0 lg:opacity-0 lg:group-hover:h-10 lg:group-hover:opacity-100">
                    <Link
                      href={`/destination/${item._id}`}
                      className="w-full py-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                    >
                      View All TOUR
                      <IoIosArrowForward />
                    </Link>
                  </div>
                </div>

                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Tour Count Badge */}
                <div className="absolute top-4 right-4 bg-yellow-300 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20 z-20">
                  <span className="text-sm font-medium text-black italic">
                    {item.tours?.[locale]}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </section>
  )
}

export default PopularDestination
