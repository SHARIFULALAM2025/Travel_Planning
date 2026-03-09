import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import Container from '../Container/Container'

const Booking = () => {
  const t = useTranslations('travelBook')
  // .raw() is great for arrays, but always provide a fallback
  const items = t.raw('item') || []

  return (
    <Container>
      <section className=" px-4 py-12 text-white">
        {items.map((item, index) => (
          <div key={item.id || index} className="mb-20">
            {/* Section Header */}
            <div className="mb-8">
              <p className="text-blue-500 font-semibold uppercase tracking-wider text-sm mb-2">
                Discovery
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {item.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                <span>📍 {item.location}</span>
                <span>⭐ {item.review}</span>
              </div>
            </div>

            {/* Professional Photo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[500px] mb-12 overflow-hidden rounded-2xl">
              {/* Main Large Image */}
              <div className="md:col-span-2 md:row-span-2 relative">
                <Image
                  src={item.image[0]}
                  alt="Main"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Smaller Images */}
              {item.image.slice(0, 5).map((img, i) => (
                <div key={i} className="relative hidden md:block">
                  <Image
                    src={img}
                    alt={`Tour photo ${i + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Container>
  )
}

export default Booking
