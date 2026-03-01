'use client'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const LastMinuteOffers = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

   if (!mounted) return null
  return (
    <section className={` py-20  ${theme == 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
          {/* Background Image */}
          <div className="relative h-[450px] w-full">
            <Image
              src="https://i.ibb.co.com/39j802bV/Hidden-Lake-Lookout27-min-scaled.webp"
              alt="Last Minute Offer"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl px-8 text-white">
              {/* Discount Badge */}
              <span
                className="inline-block mb-6 px-4 py-1.5 text-sm font-semibold
              bg-yellow-400 text-black rounded-full shadow-lg"
              >
                🔥 30% OFF Limited Time
              </span>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Last Minute Offers
              </h2>

              {/* Description */}
              <p className="mt-6 text-lg text-gray-200 leading-relaxed">
                Book a memorable tour at a great price! Grab our last-minute
                offers and pack your bags for the journey you’ve always dreamed
                of. Explore our top recommendations before they’re gone.
              </p>

              {/* CTA Button */}
              <div className="mt-8">
                <button
                  className="inline-flex items-center gap-2 px-6 py-3
                  bg-indigo-600 hover:bg-indigo-700
                  text-white font-semibold rounded-xl
                  shadow-lg hover:shadow-2xl
                  transition-all duration-300 hover:-translate-y-1"
                >
                  See Recommendations
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LastMinuteOffers
