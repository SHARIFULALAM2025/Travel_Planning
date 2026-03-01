'use client'
import { MapPlus, Globe2, Wallet, Users } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const Features = () => {
  const features = [
    {
      id: 1,
      icon: MapPlus,
      title: 'Create Trips',
      description: 'Create and manage your travel plans easily.',
    },
    {
      id: 2,
      icon: Globe2,
      title: 'Explore Places',
      description: 'Discover and add new destinations.',
    },
    {
      id: 3,
      icon: Wallet,
      title: 'Track Budget',
      description: 'Monitor expenses and control spending.',
    },
    {
      id: 4,
      icon: Users,
      title: 'Group Planning',
      description: 'Plan trips together with friends.',
    },
  ]
const { theme } = useTheme()
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) return null
  return (
    <section className={`py-20 ${theme == 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our Features
          </h2>
          <p className="mt-4 text-gray-600">
            Everything you need to plan, organize, and manage your trips
            efficiently in one powerful platform.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative bg-white/70 backdrop-blur-lg
              border border-white/40 rounded-3xl p-8 text-center
              shadow-md hover:shadow-2xl
              transition-all duration-500
              hover:-translate-y-3"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div
                  className="w-16 h-16 flex items-center justify-center
                  rounded-2xl bg-indigo-100
                  group-hover:bg-indigo-600
                  transition-all duration-500 shadow-md"
                >
                  <feature.icon
                    size={28}
                    className="text-indigo-600 group-hover:text-white transition-all duration-500"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-200/20 to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
