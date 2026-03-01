"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Personalized = () => {
  const cards = [
    {
      id: 1,
      image: 'https://i.ibb.co.com/fzjd6SXG/hersection-2.jpg',
      category: 'Luxury Cabin',
      rating: 4.9,
      title: 'Secluded Lakeview Cabin',
      price: '$420/night',
    },
    {
      id: 2,
      image: 'https://i.ibb.co.com/zTRCZQ54/herosection-1.jpg',
      category: 'Hiking Trip',
      rating: 4.8,
      title: 'Guided Alpine Trek',
      price: '$220/person',
    },
    {
      id: 3,
      image: 'https://i.ibb.co.com/Fqjdbng2/heroslider-4.jpg',
      category: 'Unique Stay',
      rating: 4.7,
      title: 'Cliffside Cave Retreat',
      price: '$310/night',
    },
    {
      id: 4,
      image: 'https://i.ibb.co.com/WvGDytnX/herosection-3.jpg',
      category: 'Beach Escape',
      rating: 4.8,
      title: 'Private Island Retreat',
      price: '$520/night',
    },
  ]

   const { theme } = useTheme()
   const [mounted, setMounted] = useState(false)

   useEffect(() => {
     setMounted(true)
   }, [])

   if (!mounted) return null
  return (
    <section
      className={`py-20 ${theme == 'dark' ? 'bg-slate-900' : 'bg-white'} `}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-14">
          <h2
            className={`${theme == 'dark' ? 'text-white' : 'text-black'} text-3xl sm:text-4xl font-bold `}
          >
            Personalized For You
          </h2>
          <p
            className={`mt-3  ${theme == 'dark' ? 'text-white' : 'text-black'}`}
          >
            Based on your recent interest in{' '}
            <span className="font-semibold text-indigo-600">
              Mountain Getaways
            </span>
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative group overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
            >
              {/* Image */}
              <div className="relative h-[320px] w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition duration-500"></div>

              {/* Content */}
              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-2 text-white">
                {/* Category Badge */}
                <span className="self-start px-4 py-1 text-xs bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                  {card.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold tracking-wide">
                  {card.title}
                </h3>

                {/* Price + Rating */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">{card.price}</span>

                  <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                    <Star
                      size={14}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-sm">{card.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default Personalized;