'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CiClock2 } from 'react-icons/ci'
import { FaCalendarAlt, FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import { FaPlane } from 'react-icons/fa6'

const AllDestination = ({ id }) => {
  const locale = useLocale()
const {theme}=useTheme()
  const { data: tour = [], isLoading } = useQuery({
    queryKey: ['single-tour', id, locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/single-destination/${id}`
      )
      return res.data
    },
  })
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
  if (!mounted) return null

  if (isLoading) return <div className="p-10 text-center">Loading...</div>

  return (
    <main
      style={bgStyle}
      className="max-w-7xl mx-auto p-4 grid grid-cols-12 gap-6"
    >
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

     <aside className="col-span-12 lg:col-span-3 md:mt-3 space-y-4">
                 <div
                   style={bgStyle}
                   className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5"
                 >
                   <div className="flex justify-between items-center bg-slate-50 p-2 rounded-2xl border border-slate-100">
                     <span className="text-xs font-bold text-slate-900 px-3">
                       Newyork
                     </span>
                     <div className="bg-rose-500 p-2 rounded-full text-white rotate-90 md:rotate-0">
                       <FaPlane size={12} />
                     </div>
                     <span className="text-xs font-bold text-slate-900 px-3">
                       Sydney
                     </span>
                   </div>

                   <div className="flex justify-between items-end border-b border-dashed border-slate-200 pb-4">
                     <p
                       className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                     >
                       Starts From
                     </p>
                     <p className="text-2xl font-black text-rose-500">
                       $500{' '}
                       <span
                         className={`text-[10px] ${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-normal`}
                       >
                         / Person
                       </span>
                     </p>
                   </div>

                   <div className="space-y-4">
                     <h3
                       className={`font-bold  ${theme === 'dark' ? 'text-white' : 'text-slate-900'} `}
                     >
                       Check Availability
                     </h3>

                     {/* From/To inputs */}
                     <div className="space-y-3">
                       <div className="p-3 border border-slate-200 rounded-xl">
                         <p className="text-[10px] uppercase font-bold text-slate-400">
                           From
                         </p>
                         <h4
                           className={`font-bold  ${theme === 'dark' ? 'text-white' : 'text-slate-900'} `}
                         >
                           Newyork
                         </h4>
                         <p className="text-[10px] text-slate-400">
                           Ken International Airport
                         </p>
                       </div>
                       <div className="p-3 border border-slate-200 rounded-xl">
                         <p className="text-[10px] uppercase font-bold text-slate-400">
                           To
                         </p>
                         <h4
                           className={`font-bold  ${theme === 'dark' ? 'text-white' : 'text-slate-900'} `}
                         >
                           Las Vegas
                         </h4>
                         <p className="text-[10px] text-slate-400">
                           Martial International Airport
                         </p>
                       </div>
                     </div>

                     {/* Date & Class */}
                     <div className="p-3 border border-slate-200 rounded-xl">
                       <p className="text-[10px] uppercase font-bold text-slate-400">
                         Departure
                       </p>
                       <h4
                         className={`font-bold  ${theme === 'dark' ? 'text-white' : 'text-slate-900'} `}
                       >
                         30-03-2026
                       </h4>
                       <p className="text-[10px] text-slate-400">Monday</p>
                     </div>

                     <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none">
                       <option>Economy</option>
                       <option>Business</option>
                     </select>

                     {/* Passengers count */}
                     <div className="border border-slate-200 rounded-xl p-3 space-y-3">
                       <p
                         className={`text-[10px] font-bold  ${theme === 'dark' ? 'text-white' : 'text-slate-900'} `}
                       >
                         Details
                       </p>
                       {['Adults', 'Infants (0-12 Yrs)', 'Children (2-12 Yrs)'].map(
                         (label) => (
                           <div
                             key={label}
                             className="flex justify-between items-center text-xs"
                           >
                             <span
                               className={` ${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-bold`}
                             >
                               {label}
                             </span>
                             <div className="flex items-center gap-3">
                               <button className="w-6 h-6 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center">
                                 -
                               </button>
                               <span className="font-bold">01</span>
                               <button className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                                 +
                               </button>
                             </div>
                           </div>
                         )
                       )}
                     </div>

                     <button className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200">
                       Book Now
                     </button>
                     <p className="text-center text-[10px] text-emerald-500 font-bold italic">
                       40 Seats Available on your Search
                     </p>
                   </div>
                 </div>

                 {/* 2. Map Section */}
                 <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                   <div className="h-[200px] relative bg-slate-100">
                     <Image
                       src="https://i.ibb.co.com/d44yDrGM/Captusfttddfre.png"
                       alt="Map"
                       fill
                       className="object-cover"
                     />
                     <button className="absolute top-3 left-3 text-black px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-md">
                       <FaMapMarkerAlt className="text-rose-500" /> Maps
                     </button>
                   </div>
                   <div className="p-4 flex items-start gap-2">
                     <FaMapMarkerAlt
                       className="text-rose-500 mt-1 shrink-0"
                       size={14}
                     />
                     <p className="text-[11px] font-medium text-slate-600">
                       15, Adri Street, Ciutat Vella, Barcelona
                     </p>
                   </div>
                 </div>

                 {/* 3. Enquire Us Form */}
                 <div
                   style={bgStyle}
                   className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4"
                 >
                   <h3
                     className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} text-lg`}
                   >
                     Enquire Us
                   </h3>
                   <div className="space-y-3">
                     {['Name', 'Email', 'Phone'].map((field) => (
                       <div key={field} className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                           {field}
                         </label>
                         <input
                           type="text"
                           placeholder={`${field}.......`}
                           className={`w-full border border-slate-200 p-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900 border border-slate-200  '} rounded-xl  transition-colors`}
                         />
                       </div>
                     ))}
                     <div className="space-y-1">
                       <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                         Message
                       </label>
                       <textarea
                         placeholder="Message........"
                         className={`w-full border border-slate-200 p-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900 border border-slate-200  '} rounded-xl  h-24 focus:border-indigo-400`}
                       />
                     </div>
                     <button className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-rose-600">
                       Submit Enquiry
                     </button>
                   </div>
                 </div>
               </aside>
    </main>
  )
}

export default AllDestination
