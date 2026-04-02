'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'
import { CiClock2 } from 'react-icons/ci'
import { FaUserInjured } from 'react-icons/fa'
import { FaPlaneDeparture } from 'react-icons/fa'
import { useTheme } from 'next-themes'
import { GoIssueClosed } from 'react-icons/go'
import { RxCross2 } from 'react-icons/rx'
import { Calendar1Icon, ChevronDown } from 'lucide-react'
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
   const [mounted, setMounted] = useState(false)
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
  if (!mounted) return null
  return (
    <main className="">
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
      <section
        style={bgStyle}
        className="grid grid-cols-12 gap-0 relative items-stretch"
      >
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
          <div className="">
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

            <div className=" min-h-[200px] leading-relaxed">
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

        <aside  className="col-span-12 lg:col-span-3 flex flex-col relative">
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
              <div className="lg:col-span-4">
                <div className="sticky top-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800  shadow-2xl p-6">
                  <h1 className="text-xl font-black mb-6 flex items-center gap-2 dark:text-white uppercase tracking-tighter">
                    <Calendar1Icon className="text-blue-600" /> Book This Tour
                  </h1>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                        Select Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xs font-bold text-slate-400 uppercase">
                        Select Time
                      </h2>
                      <div className="grid grid-cols-2 gap-3">
                        {['12:00', '19:00'].map((time) => (
                          <label
                            key={time}
                            className="flex items-center justify-center gap-2 p-3 border dark:border-slate-800 rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all dark:text-white"
                          >
                            <input
                              type="radio"
                              name="tourTime"
                              className="w-4 h-4 accent-blue-600"
                            />
                            <span className="font-medium">{time}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <hr className="dark:border-slate-800" />

                    <div className="space-y-4">
                      <h1 className="text-xs font-bold text-slate-400 uppercase">
                        Tickets
                      </h1>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                          <h1 className="text-sm font-medium dark:text-slate-200">
                            Adult (14+ years) $20
                          </h1>
                          <input
                            min={0}
                            type="number"
                            defaultValue={0}
                            className="w-16 p-1 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white text-center"
                          />
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                          <h1 className="text-sm font-medium dark:text-slate-200">
                            Youth (13-17 years) $20
                          </h1>
                          <input
                            min={0}
                            type="number"
                            defaultValue={0}
                            className="w-16 p-1 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white text-center"
                          />
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                          <h1 className="text-sm font-medium dark:text-slate-200">
                            Children (13-17 years) $15
                          </h1>
                          <input
                            min={0}
                            type="number"
                            defaultValue={0}
                            className="w-16 p-1 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white text-center"
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="dark:border-slate-800" />

                    <div className="space-y-3">
                      <h1 className="text-xs font-bold text-slate-400 uppercase">
                        Add Extra:
                      </h1>
                      <div className="flex justify-between items-center text-sm dark:text-slate-300">
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-blue-600"
                          />
                          <h1>Service per booking</h1>
                        </div>
                        <span className="font-bold">$30.00</span>
                      </div>
                      <div className="flex justify-between items-center text-sm dark:text-slate-300">
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-blue-600"
                          />
                          <h1>Service per person</h1>
                        </div>
                        <span className="font-bold">$20.00</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <div className="flex justify-between text-sm dark:text-slate-400">
                        <h1>Adult Total:</h1>
                        <h1 className="font-bold">$15.00</h1>
                      </div>
                      <div className="flex justify-between text-sm dark:text-slate-400">
                        <h1>Youth Total:</h1>
                        <h1 className="font-bold">$20.00</h1>
                      </div>
                    </div>

                    <hr className="dark:border-slate-800" />

                    <div className="flex justify-between items-center">
                      <h1 className="text-lg font-bold dark:text-white">
                        Total Cost:
                      </h1>
                      <h1 className="text-2xl font-black text-blue-600">
                        $300.00
                      </h1>
                    </div>

                    <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 dark:shadow-none transition-all transform hover:-translate-y-1 active:scale-95">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default SingleDestination
