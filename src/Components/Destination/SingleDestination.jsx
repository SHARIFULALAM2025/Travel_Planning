'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'
import { CiClock2 } from 'react-icons/ci'
import { FaUserInjured } from 'react-icons/fa'
import { FaPlaneDeparture } from 'react-icons/fa'
import { useTheme } from 'next-themes'
import { GoIssueClosed } from 'react-icons/go'
import { RxCross2 } from 'react-icons/rx'
import { ChevronDown } from 'lucide-react'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

const SingleDestination = ({ destId, tourId }) => {
  const locale = useLocale()
  const [activeTab, setActiveTab] = useState(0)
  const { theme } = useTheme()
  const { data: tourDetails, isLoading } = useQuery({
    queryKey: ['single-tour-details', destId, tourId],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/single-tour-details/${destId}/${tourId}`
      )
      return res.data
    },
  })
  const [open, setOpen] = useState(0)

  const toggle = (index) => {
    setOpen(open === index ? null : index)
  }


  const [currentSlide, setCurrentSlide] = useState(0)

  if (isLoading)
    return (
      <div className="p-10 text-center font-bold">Loading Tour Details...</div>
    )

  if (!tourDetails)
    return <div className="p-10 text-center">Tour Not Found!</div>

  return (
    <main className="max-w-7xl mx-auto">
      {/* Image Section */}
      <div className="relative w-full h-[450px] overflow-hidden rounded-sm shadow-lg">
        <Image
          src={tourDetails.image}
          alt="Main Tour"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="absolute bottom-16 left-6 z-10">
          <h1 className="text-4xl text-white font-bold">
            {tourDetails.title?.[locale]}
          </h1>
          <div className="flex gap-2 items-center text-white">
            <div className="flex gap-1 text-orange-400 my-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar className="text-gray-300" />
            </div>
            <span>(4 Review)</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="grid grid-cols-12 gap-0 relative items-stretch">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-9 p-8">
          <div className="flex justify-between">
            <div className="space-y-2">
              <h1 className="flex gap-1 items-center">
                {' '}
                <CiClock2 />
                {tourDetails.day?.[locale]}
              </h1>
              <h1 className="flex gap-1 items-center">
                <FaPlaneDeparture /> {tourDetails.country?.[locale]}
              </h1>
              <h1 className="flex gap-1 items-center">
                <FaUserInjured /> {tourDetails.ageMin?.[locale]}
              </h1>
            </div>
            <div className="space-y-2">
              <h1 className="flex gap-1 items-center">
                {' '}
                <FaCalendarAlt />
                {tourDetails.date?.[locale]}
              </h1>
              <h1 className="flex gap-1 items-center">
                <FaPlaneDeparture />
                {tourDetails.country?.[locale]}
              </h1>
              <h1 className="flex gap-1 items-center">
                <FaUserInjured /> {tourDetails.ageMax?.[locale]}
              </h1>
            </div>
          </div>
          {/* --- Tab Section --- */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 mb-20">
            <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar gap-4 sm:gap-8">
              {['Details', 'Itinerary', 'Map', 'Photos', 'Review'].map(
                (tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`pb-4 text-[10px] sm:text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                      activeTab === index
                        ? 'text-blue-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {/* Simplified Logic: Render the tab name directly */}
                    {tab}

                    {activeTab === index && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-all duration-300" />
                    )}
                  </button>
                )
              )}
            </div>

            <div className="py-6 md:py-8 min-h-[200px] leading-relaxed">
              {activeTab === 0 && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h2
                    className={`text-lg md:text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                  >
                    {tourDetails.details?.[locale]}
                  </h2>
                  <p
                    className={`mb-6 text-sm md:text-base ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}
                  >
                    {tourDetails?.toureDetails?.[locale]}
                  </p>
                  <hr className="mt-2" />
                  <div className="flex justify-between">
                    <h2
                      className={`text-lg md:text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    >
                      {tourDetails.Departure?.[locale]}
                    </h2>
                    <h2
                      className={`text-lg md:text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    >
                      {tourDetails.Location?.[locale]}
                    </h2>
                  </div>
                  <hr className="mt-2" />
                  {/* Price Includes Section */}
                  <div className="flex justify-between">
                    <h3
                      className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    >
                      {tourDetails.price?.[locale]}
                    </h3>

                    <ul className="grid grid-cols-1 gap-3">
                      {Array.isArray(tourDetails?.Airfares?.[locale]) ? (
                        tourDetails.Airfares[locale].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 group">
                            <GoIssueClosed />
                            {item}
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-400 italic text-sm">
                          No data available
                        </p>
                      )}
                    </ul>
                  </div>
                  <hr className="mt-2" />
                  {/* Price Excludes Section (Using the same logic) */}
                  <div className="flex justify-between">
                    <h3
                      className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    >
                      {tourDetails.Excludes?.[locale]}
                    </h3>
                    <ul className="grid grid-cols-1 gap-3">
                      {Array.isArray(tourDetails?.PriceExcludes?.[locale]) &&
                        tourDetails.PriceExcludes[locale].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 group">
                            <RxCross2 />
                            {item}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <hr className="mt-2" />
                  {/* Price Excludes Section (Using the same logic) */}
                  <div className="flex justify-between">
                    <h3
                      className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    >
                      {tourDetails.Complementaries?.[locale]}
                    </h3>
                    <ul className="grid grid-cols-1 gap-3">
                      {Array.isArray(tourDetails?.Complement?.[locale]) &&
                        tourDetails.Complement[locale].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 group">
                            <GoIssueClosed />
                            {item}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <hr className="mt-2" />
                  <h1 className="">
                    {tourDetails.what_to_expect_title?.[locale]}
                  </h1>
                  <p className="">{tourDetails.description_1?.[locale]}</p>
                  <ul className="grid grid-cols-1 gap-3">
                    {Array.isArray(tourDetails?.expect?.[locale]) &&
                      tourDetails.expect[locale].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 group">
                          <GoIssueClosed />
                          {item}
                        </li>
                      ))}
                  </ul>
                  <div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div
                          key={num}
                          className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all"
                        >
                          <button
                            onClick={() => toggle(num)}
                            className="flex items-center justify-between w-full p-5 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <div className="flex gap-4 items-center">
                              <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">
                                Day-{num}
                              </span>
                              <span className="font-bold text-slate-700 dark:text-slate-200">
                                {/* Dynamic key access for Title */}
                                {tourDetails?.[`day_${num}_title`]?.[locale]}
                              </span>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-slate-400 transition-transform ${open === num ? 'rotate-180' : ''}`}
                            />
                          </button>
                          {open === num && (
                            <div className="p-5 bg-slate-50 dark:bg-slate-800/30 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 leading-relaxed italic">
                              {/* Dynamic key access for Description */}
                              {tourDetails?.[`day_${num}_desc`]?.[locale]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <figure className="relative w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                      <Image
                        src={tourDetails?.map}
                        alt="Tour Route Map"
                        width={1200} // Add your preferred width
                        height={800} // Add your preferred height
                        className="w-full h-auto object-cover"
                        priority // Ensures the map loads quickly when the tab is clicked
                      />
                    </figure>
                  </div>
                  <div className="animate-in fade-in duration-500">
                    <div className="relative aspect-video rounded-2xl overflow-hidden group">
                      {tourDetails?.slide?.map((img, idx) => (
                        <div
                          key={idx}
                          className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                          <Image
                            src={img}
                            alt={`Slide ${idx}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}

                      <button
                        onClick={() =>
                          setCurrentSlide((prev) =>
                            prev === 0 ? tourDetails.slide.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/50"
                      >
                        <ChevronLeft />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentSlide((prev) =>
                            prev === tourDetails.slide.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/50"
                      >
                        <ChevronRight />
                      </button>
                    </div>
                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {tourDetails?.slide?.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`relative w-20 h-20 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${currentSlide === idx ? 'border-blue-600 scale-95' : 'border-transparent'}`}
                        >
                          <Image
                            src={img}
                            alt="thumb"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 overflow-x-auto">
                  <div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div
                          key={num}
                          className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all"
                        >
                          <button
                            onClick={() => toggle(num)}
                            className="flex items-center justify-between w-full p-5 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <div className="flex gap-4 items-center">
                              <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">
                                Day-{num}
                              </span>
                              <span className="font-bold text-slate-700 dark:text-slate-200">
                                {/* Dynamic key access for Title */}
                                {tourDetails?.[`day_${num}_title`]?.[locale]}
                              </span>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-slate-400 transition-transform ${open === num ? 'rotate-180' : ''}`}
                            />
                          </button>
                          {open === num && (
                            <div className="p-5 bg-slate-50 dark:bg-slate-800/30 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 leading-relaxed italic">
                              {/* Dynamic key access for Description */}
                              {tourDetails?.[`day_${num}_desc`]?.[locale]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <figure className="relative w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                    <Image
                      src={tourDetails?.map}
                      alt="Tour Route Map"
                      width={1200} // Add your preferred width
                      height={800} // Add your preferred height
                      className="w-full h-auto object-cover"
                      priority // Ensures the map loads quickly when the tab is clicked
                    />
                  </figure>
                </div>
              )}

              {activeTab === 3 && (
                <div className="animate-in fade-in duration-500">
                  <div className="relative aspect-video rounded-2xl overflow-hidden group">
                    {tourDetails?.slide?.map((img, idx) => (
                      <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                      >
                        <Image
                          src={img}
                          alt={`Slide ${idx}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}

                    <button
                      onClick={() =>
                        setCurrentSlide((prev) =>
                          prev === 0 ? tourDetails.slide.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/50"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentSlide((prev) =>
                          prev === tourDetails.slide.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/50"
                    >
                      <ChevronRight />
                    </button>
                  </div>
                  {/* Thumbnails */}
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {tourDetails?.slide?.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`relative w-20 h-20 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${currentSlide === idx ? 'border-blue-600 scale-95' : 'border-transparent'}`}
                      >
                        <Image
                          src={img}
                          alt="thumb"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-3 flex flex-col relative">
          <div
            className="
              lg:-mt-24
              lg:mb-0
              relative
              flex-grow
              z-20

              shadow-2xl
              border border-gray-200
            "
          >
            <div className="text-center  sticky top-0">
              <p className="text-white p-2 bg-indigo-500 text-sm uppercase tracking-wider">
                Price
              </p>
              <h2 className="text-2xl p-3.5 font-bold text-white bg-blue-500 ">
                $1,250
              </h2>
              {/* <hr className=" border-red-400/50 w-full mt-7" /> */}
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default SingleDestination
