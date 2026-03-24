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
                    {tab === 'Details'
                      ? 'Product Details'
                      : tab === 'Specs'
                        ? 'Specification'
                        : 'Reviews'}
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
                </div>
              )}

              {/* {activeTab === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 overflow-x-auto">
                  <table
                    className={`w-full text-left border ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}
                  >
                    <tbody className="text-sm md:text-base">
                      {[
                        {
                          label: 'Brand',
                          value:
                            currentProduct?.brand?.[locale] || 'Travel Luggage',
                        },
                        {
                          label: 'Color',
                          value: currentProduct?.color?.[locale] || 'Sky',
                        },
                        {
                          label: 'Material',
                          value:
                            currentProduct?.material?.[locale] || 'Plastic',
                        },
                        {
                          label: 'Capacity',
                          value:
                            currentProduct?.capacity?.[locale] || '20 Ounces',
                        },
                        {
                          label: 'Recommended Uses',
                          value: currentProduct?.uses?.[locale] || 'Water',
                        },
                      ].map((row, idx) => (
                        <tr
                          key={idx}
                          className={`border-b ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}
                        >
                          <td
                            className={`py-3 px-4 md:py-4 md:px-6 font-bold w-1/2 sm:w-1/3 ${theme === 'dark' ? 'text-white bg-slate-800/50' : 'text-black bg-gray-50'}`}
                          >
                            {row.label}:
                          </td>
                          <td
                            className={`py-3 px-4 md:py-4 md:px-6 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}
                          >
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )} */}

              {/* {activeTab === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8 md:space-y-12">
                  <div className="max-w-4xl">
                    <h3
                      className={`text-lg md:text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-2`}
                    >
                      Customer Reviews
                    </h3>

                    <div className="space-y-6 md:space-y-8 mt-6">
                      {review.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row gap-4 md:gap-6 pb-6 border-b last:border-none dark:border-slate-800"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-slate-100">
                              <Image
                                src={item.image}
                                alt="User"
                                width={64}
                                height={64}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                              <div className="flex items-center gap-3">
                                <h4 className="font-bold text-sm md:text-base">
                                  {item.name}
                                </h4>
                                <span className="text-[10px] md:text-xs text-blue-500">
                                  {item.timestamp}
                                </span>
                              </div>
                              <div className="flex text-amber-500 gap-0.5">
                                {[...Array(item.rating || 0)].map((_, i) => (
                                  <FaStar key={i} size={12} />
                                ))}
                              </div>
                            </div>
                            <p
                              className={`text-sm md:text-base leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}
                            >
                              {item.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 bg-gray-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl">
                      <h3 className="text-lg font-bold mb-6">Write a Review</h3>
                      <form
                        onSubmit={handleSubmit(handelReview)}
                        className="space-y-4 md:space-y-6"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold">
                            Your Rating:
                          </span>
                          <div className="flex text-amber-500 gap-1">
                            {[1, 2, 3, 4, 5].map((val) => (
                              <FaStar
                                key={val}
                                onClick={() => setStar(val)}
                                className={`cursor-pointer size-5 md:size-6 ${val <= star ? 'text-amber-400' : 'text-slate-300'}`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            {...register('name')}
                            readOnly
                            className={`w-full p-3 md:p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}
                          />
                          <input
                            {...register('email')}
                            readOnly
                            className={`w-full p-3 md:p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}
                          />
                        </div>

                        <textarea
                          rows={4}
                          {...register('message', { required: true })}
                          placeholder="Write Your Detailed Experience *"
                          className={`w-full p-3 md:p-4 rounded-xl border resize-none ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}
                        />

                        <button
                          type="submit"
                          className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all"
                        >
                          SUBMIT REVIEW
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )} */}
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
