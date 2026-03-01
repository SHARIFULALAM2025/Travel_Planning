'use client'

import { Plane, Ship, Mountain, PawPrint, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const tours = [
  { name: 'Self-Guided', icon: Plane, link: '/tours/self-guided' },
  { name: 'Cruises', icon: Ship, link: '/tours/cruises' },
  { name: 'Adventure', icon: Mountain, link: '/tours/adventure' },
  { name: 'Wildlife', icon: PawPrint, link: '/tours/wildlife' },
  { name: 'Seaside', icon: Sun, link: '/tours/seaside' },
]

const ChooseTour = () => {
  const router = useRouter()
const { theme } = useTheme()
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) return null
  return (
    <section className={`py-20 ${theme == 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* HEADER same as Stories */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-14 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Choose Your Tour
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl">
              Find your next travel adventure and explore journeys crafted for
              every traveler — from wildlife expeditions to seaside escapes.
            </p>
          </div>
        </div>

        {/* Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-12 text-center">
          {tours.map((tour, i) => {
            const Icon = tour.icon

            return (
              <button
                key={i}
                onClick={() => router.push(tour.link)}
                className="group flex flex-col items-center text-center
  px-6 py-7 rounded-2xl bg-white  border-gray-200
  shadow-sm hover:shadow-xl
  transition-all duration-300 hover:-translate-y-2"
              >
                {/* Icon container */}
                <div
                  className="w-16 h-16 flex items-center justify-center
    rounded-full bg-gray-50  border-gray-200
    group-hover:bg-blue-600 group-hover:border-blue-600
    transition duration-300"
                >
                  <Icon
                    size={30}
                    strokeWidth={1.8}
                    className="text-gray-700 group-hover:text-white transition"
                  />
                </div>

                {/* Label */}
                <span
                  className="mt-4 font-semibold text-gray-800 text-lg
    group-hover:text-blue-700 transition"
                >
                  {tour.name}
                </span>

                {/* subtle underline animation */}
                <div
                  className="mt-2 h-[2px] w-0 bg-blue-600
  group-hover:w-8 transition-all duration-300 rounded-full"
                ></div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default ChooseTour
