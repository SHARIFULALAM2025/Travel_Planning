'use client'

import { IoSearch, IoChevronDownOutline } from 'react-icons/io5'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa'
import { popularDestinations } from './Data'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Container from '@/Components/Container/Container'

const images = [
  'https://i.ibb.co.com/fYNV14H1/cruise-large-04.jpg',
  'https://i.ibb.co.com/7JhfkXhF/cruise-large-01.jpg',
  '/assets/bannerimage2.jpg',
  '/assets/bannerimage3.jpg',
  'https://i.ibb.co.com/hJqSB9y8/cruise-large-03.jpg',
  'https://i.ibb.co.com/Nnb2d5yH/cruise-large-02.jpg',
  '/assets/image121.jpg',
  '/assets/bannerimage4.jpg',
  '/assets/bannerimage6.jpg',
]

const Banner = ({allData}) => {
  const t = useTranslations('banner')
  const [currentImage, setCurrentImage] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [showGuestDropdown, setShowGuestDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const today = new Date().toISOString().split('T')[0]
  // 1. React Hook Form Initialization
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      location: '',
      checkIn: '',
      checkOut: '',
      guests: { rooms: 1, adults: 2, children: 0 },
    },
  })

  // 2. Watch guest state for UI display
  const watchedGuests = watch('guests')

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowGuestDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 3. Updated Guest Input Handler for RHF
  const handleInputChange = (type, value) => {
    const val = parseInt(value) || 0
    const finalVal = val < 0 ? 0 : val
    setValue(`guests.${type}`, finalVal)
  }
  const router = useRouter()
  // 4. Final Search Handler
  const handleSearch = (data) => {
    const totalGuests =
      Number(data.guests.adults) + Number(data.guests.children)

    const queryString = `location=${data.location}&checkIn=${data.checkIn}&checkOut=${data.checkOut}&guests=${totalGuests}&rooms=${data.guests.rooms}`

    router.push(`/search?${queryString}`)
  }

  const avatars = [
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  ]

  if (!mounted) return null

  return (
    <Container>
      <section className="relative w-full min-h-[90vh] lg:h-[85vh] flex items-center justify-center overflow-visible py-3">
        {/* Background slider code */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          {/* Heading Section code... */}
          <div className="mb-8 lg:mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              {t('title')}
            </h1>
            <p className="mt-4 text-base sm:text-xl text-gray-300 max-w-2xl mx-auto font-light tracking-wide">
              {t('des')}
            </p>
          </div>

          {/* Social Proof */}
          <div className="relative mb-12 grid justify-center md:gap-3 gap-1 md:grid-cols-2 grid-cols-1">
            <div className="flex -space-x-3 mr-4">
              {avatars.map((url, i) => (
                <div
                  key={i}
                  className="relative w-10 h-10 ring-2 ring-white rounded-full overflow-hidden"
                >
                  <Image src={url} alt="user" fill className="object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold z-10">
                5k+
              </div>
            </div>
            <div className="text-white text-left">
              <h3 className="underline decoration-2 underline-offset-4 font-bold text-lg leading-tight">
                35k People Booked <br /> Dream Place
              </h3>
            </div>
          </div>

          {/* --- Updated Form Section --- */}
          <form
            onSubmit={handleSubmit(handleSearch)}
            className="w-full md:max-w-7xl"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl  p-2 shadow-2xl flex flex-col lg:flex-row items-center w-full relative transition-colors duration-300">
              {/* Location */}
              <div className="flex flex-[1.5] flex-col border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-700 w-full py-3 lg:py-0 md:px-3 px-1">
                <label className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold text-left uppercase">
                  Location
                </label>
                <div className="flex items-center text-gray-800 dark:text-gray-200">
                  <FaMapMarkerAlt className="mr-2 text-gray-400 shrink-0" />
                  <select
                    {...register('location', { required: true })}
                    className="bg-transparent outline-none text-sm font-semibold w-full cursor-pointer dark:text-white"
                  >
                    <option value="" className="dark:bg-slate-800">
                      Select Destination
                    </option>
                    {popularDestinations.map((dest, index) => (
                      <option
                        key={index}
                        value={dest}
                        className="dark:bg-slate-800"
                      >
                        {dest}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="flex flex-1 flex-row w-full lg:contents">
                <div className="flex-1 flex flex-col border-r border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-700 py-3 lg:py-0 px:1 md:px-6">
                  <label className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold text-left uppercase">
                    Check In
                  </label>
                  <input
                    type="date"
                    min={today}
                    {...register('checkIn', { required: true })}
                    className="bg-transparent text-sm text-gray-800 dark:text-white font-semibold outline-none w-full dark:[color-scheme:dark]"
                  />
                </div>
                <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-700 py-3 lg:py-0 px:1 md:px-6">
                  <label className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold text-left uppercase">
                    Check Out
                  </label>
                  <input
                    min={allData?.checkIn || today}
                    type="date"
                    {...register('checkOut', { required: true })}
                    className="bg-transparent text-sm text-gray-800 dark:text-white font-semibold outline-none w-full dark:[color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Guest Selector */}
              <div
                className="flex flex-1 flex-col w-full py-3 lg:py-0 md:px-6 px:1 cursor-pointer relative lg:border-r lg:border-gray-100 lg:dark:border-gray-700"
                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                ref={dropdownRef}
              >
                <label className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold text-left uppercase">
                  Guest
                </label>
                <div className="flex items-center text-gray-800 dark:text-gray-200">
                  <FaUserFriends className="mr-2 text-gray-400 shrink-0" />
                  <span className="font-semibold text-xs truncate">
                    {watchedGuests.adults + watchedGuests.children} Guests
                  </span>
                  <IoChevronDownOutline className="ml-auto" />
                </div>

                {showGuestDropdown && (
                  <div
                    className="absolute top-full left-0 mt-4 w-full sm:w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 z-[999] border border-gray-100 dark:border-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col gap-4">
                      {['rooms', 'adults', 'children'].map((type) => (
                        <div
                          key={type}
                          className="flex justify-between items-center"
                        >
                          <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">
                            {type}
                          </label>
                          <input
                            type="number"
                            min={type === 'children' ? '0' : '1'}
                            value={watchedGuests[type]}
                            onChange={(e) =>
                              handleInputChange(type, e.target.value)
                            }
                            className="w-16 border rounded p-1 text-center dark:bg-slate-900 dark:text-white dark:border-gray-600"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowGuestDropdown(false)}
                      className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-xl font-bold"
                    >
                      Ok
                    </button>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-3 rounded-xl  flex items-center justify-center gap-2 transition-all font-bold shadow-lg m-1 w-[95%] lg:w-auto"
              >
                Search <IoSearch size={20} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </Container>
  )
}

export default Banner
