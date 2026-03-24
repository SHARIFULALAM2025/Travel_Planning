'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CiClock2 } from 'react-icons/ci'
import { FaCalendarAlt, FaStar } from 'react-icons/fa'

const AllDestination = ({ id }) => {
  const locale = useLocale()

  const { data: tour = [], isLoading } = useQuery({
    queryKey: ['single-tour', id, locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/single-destination/${id}`
      )
      return res.data
    },
  })

  if (isLoading) return <div className="p-10 text-center">Loading...</div>

  return (
    <main className="max-w-7xl mx-auto p-4 grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-9 space-y-4">
        {tour?.multipleTour?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all h-full md:h-[280px]"
          >
            {/* ১. ইমেজ সেকশন */}
            <div className="w-full md:w-1/3 relative h-64 md:h-auto">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title?.[locale] || 'tour'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>

            {/* ২. মাঝখানের কন্টেন্ট সেকশন */}
            <div className="w-full md:w-5/12 p-6 flex flex-col justify-center border-r border-gray-100">
              <h1 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                {item.title?.[locale]}
              </h1>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-blue-500 font-medium">
                  <CiClock2 className="text-xl" />
                  <span>{item.day?.[locale]}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-500 font-medium">
                  <FaCalendarAlt />
                  <span>{item.date?.[locale]}</span>
                </div>
              </div>

              <p className="text-gray-500 text-sm line-clamp-3">
                {item.des?.[locale]}
              </p>
            </div>

            {/* ৩. ডান পাশের প্রাইসিং সেকশন */}
            <div className="w-full md:w-3/12 p-6 flex flex-col items-center justify-center bg-gray-50/50">
              <span className="text-gray-400 text-sm">From</span>
              <div className="text-3xl font-extrabold text-gray-900 my-1">
                $1,200
              </div>

              {/* স্টার রেটিং (Static for now) */}
              <div className="flex gap-1 text-orange-400 my-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar className="text-gray-300" />
              </div>
              <span className="text-gray-400 text-xs mb-6">(1 Review)</span>

              <Link
                href={`/${locale}/destination/${tour._id}/singleDestination/${item.id}`}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors uppercase text-center text-sm tracking-wider"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* সাইডবার */}
      <aside className="hidden lg:block lg:col-span-3 bg-amber-600 rounded-lg p-4 text-white h-fit sticky top-4">
        <h3 className="font-bold">Sidebar Info</h3>
        <p className="text-sm mt-2">Filter or promotion content here.</p>
      </aside>
    </main>
  )
}

export default AllDestination
