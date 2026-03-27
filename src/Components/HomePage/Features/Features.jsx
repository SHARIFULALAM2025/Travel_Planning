"use client"
import React from 'react'
import Image from 'next/image'
import { Briefcase, MapPin, ShieldCheck, Star, Users } from 'lucide-react'

const Features = () => {
  const features = [
    {
      title: 'Curated Tours',
      description:
        'Only the best destinations and experiences, selected just for you.',
      icon: <Briefcase className="w-6 h-6 text-[#0f2a47]" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Guides Near You',
      description:
        'Get the best value with fair, transparent pricing and no hidden costs.',
      icon: <MapPin className="w-6 h-6 text-[#0f2a47]" />,
      bgColor: 'bg-green-50',
    },
    {
      title: 'Safety Knowledge',
      description:
        'Safe and simple payments for a stress-free booking experience.',
      icon: <ShieldCheck className="w-6 h-6 text-[#0f2a47]" />,
      bgColor: 'bg-yellow-50',
    },
  ]

  return (
    <section className="relative bg-white py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content Side */}
        <div className="z-10">
          <header className="mb-10">
            <div className="flex items-center gap-2 text-[#72a334] font-bold text-sm uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rotate-45 bg-[#72a334]"></span>
              Why Aventour
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f2a47] leading-tight mb-4">
              Your Trusted Travel Partner
            </h2>
            <p className="text-gray-500 text-lg">
              Guiding you to unforgettable experiences across the world's
              wonders.
            </p>
          </header>

          {/* Top 3 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`${item.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#0f2a47] text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom 2 Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="bg-slate-100 p-3 rounded-full">
                <Users className="w-8 h-8 text-[#0f2a47]" />
              </div>
              <div>
                <div className="text-3xl font-black text-[#0f2a47]">15+</div>
                <p className="font-bold text-[#0f2a47] text-sm">
                  Years Experience
                </p>
                <p className="text-xs text-gray-400">
                  Trusted travel expertise since 2010.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="bg-slate-100 p-3 rounded-full">
                <Star className="w-8 h-8 text-[#0f2a47]" />
              </div>
              <div>
                <div className="text-3xl font-black text-[#0f2a47]">97%</div>
                <p className="font-bold text-[#0f2a47] text-sm">
                  Satisfied Travelers
                </p>
                <p className="text-xs text-gray-400">
                  Backed by real traveler reviews.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Side */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[600px] aspect-square lg:aspect-auto">
            <Image
              src="https://i.ibb.co.com/vxDXZW5F/Travel-essentials-flat-lay-arrangement-removebg-preview.png"
              alt="Travel Essentials"
              width={800}
              height={800}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
