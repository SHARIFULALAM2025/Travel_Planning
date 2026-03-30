'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import React, { use, useEffect, useState } from 'react'
import {
  FaPlane,
  FaRegCheckCircle,
  FaRegHeart,
  FaShareAlt,
  FaStar,
  FaMapMarkerAlt,
} from 'react-icons/fa'
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Maximize2,
  MessageSquare,
  Star,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react'
import Image from 'next/image'
import { GiCommercialAirplane } from 'react-icons/gi'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosArrowUp } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'
import Accordion from '../Accordion'

const ViewFlight = ({ params }) => {
  const locale = useLocale()
  const resolvedParams = use(params)
  const id = resolvedParams.id
  const { theme } = useTheme()

  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  const { data: singleFlight = {}, isLoading } = useQuery({
    queryKey: ['single flight', id, locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/uniqueData/${id}`
      )
      return res.data
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const nextSlide = () => {
    if (singleFlight?.image) {
      setActiveImgIndex((prev) =>
        prev === singleFlight.image.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevSlide = () => {
    if (singleFlight?.image) {
      setActiveImgIndex((prev) =>
        prev === 0 ? singleFlight.image.length - 1 : prev - 1
      )
    }
  }

  const renderLetters = (text, startDelay = 0) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: startDelay + index * 0.1, duration: 0.5 }}
        className="inline-block"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))
  }

  const bgStyle =
    theme === 'dark'
      ? {
          backgroundColor: '#0F172A',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23334155' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H2V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }
      : {
          backgroundColor: '#FFFFFF',
        }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[70vh] min-h-[400px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'linear' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co.com/vCmrRVSz/Travelers-boarding-at-sunset.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10" />
        <div className="relative z-20 flex flex-col justify-center h-full px-4 md:px-12 container mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              className="h-[2px] bg-indigo-500"
            />
            <p className="text-indigo-400 font-bold uppercase tracking-widest text-sm md:text-base">
              Ready To
            </p>
          </div>
          <h1 className="font-black text-white leading-none text-[clamp(2.5rem,8vw,7rem)]">
            {renderLetters('SOAR', 0.5)}
          </h1>
          <div className="text-right mt-2 md:mt-4">
            <h1 className="font-black text-white leading-none text-[clamp(2.5rem,8vw,7rem)]">
              {renderLetters('BEYOND', 1.2)}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="">
        <div style={bgStyle} className="grid grid-cols-12  gap-4">
          {/* Main Details */}
          <section className="col-span-12 lg:col-span-9 md:mt-3 space-y-5">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="space-y-4 w-full">
                <div className="flex flex-wrap items-center gap-3">
                  <h1
                    className={`text-3xl md:text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} italic`}
                  >
                    {singleFlight?.flightTitle?.[locale] || 'Loading...'}
                  </h1>
                  <div className="flex gap-2">
                    <span className="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase">
                      <FaRegCheckCircle size={10} /> Verified
                    </span>
                    <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      Cheapest
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-500 font-semibold">
                  <span
                    className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                  >
                    <FaPlane className="text-rose-500 rotate-45" size={18} />
                    {singleFlight?.company?.[locale]}
                  </span>
                  <span className={`hidden md:inline text-slate-300 `}>|</span>
                  <span
                    className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                  >
                    {singleFlight?.destination?.[locale]}
                  </span>
                  <span className="hidden md:inline text-slate-300">|</span>
                  <span
                    className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                  >
                    <FaMapMarkerAlt className="text-rose-500" size={16} />
                    {singleFlight?.location?.[locale]}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button className="text-rose-600 hover:text-rose-700 underline text-xs font-black uppercase tracking-widest transition-colors">
                    View Location
                  </button>
                  <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-lg text-orange-600 font-black">
                    <FaStar size={14} /> {singleFlight?.rating?.[locale]}
                    <span className="text-slate-400 font-medium ml-1">
                      ({singleFlight?.review?.[locale]} Reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-start md:justify-end">
                <button
                  className={`p-4 border border-slate-200 rounded-full hover:bg-slate-50 transition-all  ${theme === 'dark' ? 'text-white' : 'text-slate-900'} shadow-sm`}
                >
                  <FaShareAlt size={18} />
                </button>
                <button
                  className={`flex-1  ${theme === 'dark' ? 'text-white' : 'text-slate-900'} md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 border border-slate-400 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all font-black text-sm uppercase tracking-widest`}
                >
                  <FaRegHeart size={18} /> Save
                </button>
              </div>
            </div>

            {/* Integrated Image Slider */}
            <div className="space-y-4">
              <div className="relative group overflow-hidden rounded-2xl h-[350px] md:h-[550px] shadow-xl bg-slate-100">
                <AnimatePresence mode="wait">
                  {singleFlight?.image && (
                    <motion.div
                      key={activeImgIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={singleFlight.image[activeImgIndex]}
                        alt="Flight Gallery"
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Overlay Controls */}
                <div className="absolute inset-0 flex items-center justify-between px-4  transition-opacity duration-300">
                  <button
                    onClick={prevSlide}
                    className="p-3 bg-white/90 hover:bg-indigo-600 hover:text-white rounded-full shadow-lg text-slate-900 transition-all hover:scale-110"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-3 bg-white/90 hover:bg-indigo-600 hover:text-white rounded-full shadow-lg text-slate-900 transition-all hover:scale-110"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                <button className="absolute bottom-6 right-6 bg-white/90 hover:bg-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider shadow-lg transition-all active:scale-95 text-slate-900">
                  <Maximize2 size={16} /> See All
                </button>
              </div>

              {/* Thumbnails Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
                {singleFlight?.image?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                      activeImgIndex === idx
                        ? 'border-indigo-500 scale-95 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt="Thumbnail"
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Flight Specs Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 bg-slate-50 border border-slate-200 rounded-2xl"
            >
              <div className="flex gap-3 items-center mb-6">
                <GiCommercialAirplane className="text-indigo-600 text-2xl" />
                <h2 className="text-xl font-bold text-slate-900">
                  {singleFlight?.flightInfo?.[locale]}
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Launch
                  </p>
                  <h3 className="text-slate-900 font-bold">
                    {singleFlight?.launchDate?.[locale]}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {singleFlight?.Launched?.[locale]}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Physical
                  </p>
                  <h3 className="text-slate-900 font-bold">
                    {singleFlight?.Weight?.[locale]}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {singleFlight?.weightNumber?.[locale]}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Capacity
                  </p>
                  <h3 className="text-slate-900 font-bold">
                    {singleFlight?.Staffs?.[locale]}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {singleFlight?.stfLimit?.[locale]}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Speed & Dim
                  </p>
                  <h3 className="text-slate-900 font-bold">
                    {singleFlight?.Speed?.[locale]}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {singleFlight?.km?.[locale]}
                  </p>
                </div>
              </div>
            </motion.div>
            <Accordion
              title={singleFlight?.description?.[locale]}
              content={singleFlight?.des?.[locale]}
            />
            <Accordion
              title={singleFlight?.Amenities?.[locale]}
              content={
                <div className="grid grid-cols-3">
                  <div className="">
                    <h1 className="underline">{singleFlight?.Din?.[locale]}</h1>

                    <ol className="list-decimal pl-5">
                      {singleFlight.denyingService?.[locale]?.map(
                        (item, index) => (
                          <li key={index} className="mb-1">
                            {item}
                          </li>
                        )
                      )}
                    </ol>
                    <h1 className="underline">
                      {singleFlight?.Wellness?.[locale]}
                    </h1>

                    <ol className="list-decimal pl-5">
                      {singleFlight.wellnessServices?.[locale]?.map(
                        (item, index) => (
                          <li key={index} className="mb-1">
                            {item}
                          </li>
                        )
                      )}
                    </ol>
                  </div>
                  <div className="">
                    <h1 className="underline">
                      {singleFlight?.Entertainment?.[locale]}
                    </h1>

                    <ol className="list-decimal pl-5">
                      {singleFlight.entertainmentServices?.[locale]?.map(
                        (item, index) => (
                          <li key={index} className="mb-1">
                            {item}
                          </li>
                        )
                      )}
                    </ol>
                    <h1 className="underline">
                      {singleFlight?.Family?.[locale]}
                    </h1>

                    <ol className="list-decimal pl-5">
                      {singleFlight.familyServices?.[locale]?.map(
                        (item, index) => (
                          <li key={index} className="mb-1">
                            {item}
                          </li>
                        )
                      )}
                    </ol>
                  </div>
                  <div className="">
                    <h1 className="underline">
                      {singleFlight?.Sports?.[locale]}
                    </h1>
                    <ol className="list-decimal pl-5">
                      {singleFlight.activityServices?.[locale]?.map(
                        (item, index) => (
                          <li key={index} className="mb-1">
                            {item}
                          </li>
                        )
                      )}
                    </ol>
                    <h1 className="underline">
                      {singleFlight?.Accommodations?.[locale]}
                    </h1>
                    <ol className="list-decimal pl-5">
                      {singleFlight.accommodationServices?.[locale]?.map(
                        (item, index) => (
                          <li key={index} className="mb-1">
                            {item}
                          </li>
                        )
                      )}
                    </ol>
                  </div>
                </div>
              }
            />
            <Accordion
              title={singleFlight?.Frequently?.[locale]}
              content={
                <div>
                  <Accordion
                    title={singleFlight?.question1?.[locale]}
                    content={singleFlight?.answer1?.[locale]}
                  />
                  <Accordion
                    title={singleFlight?.question2?.[locale]}
                    content={singleFlight?.answer2?.[locale]}
                  />
                  <Accordion
                    title={singleFlight?.question3?.[locale]}
                    content={singleFlight?.answer3?.[locale]}
                  />
                  <Accordion
                    title={singleFlight?.question4?.[locale]}
                    content={singleFlight?.answer4?.[locale]}
                  />
                  <Accordion
                    title={singleFlight?.question5?.[locale]}
                    content={singleFlight?.answer5?.[locale]}
                  />
                </div>
              }
            />
            <Accordion
              title={singleFlight?.Reviews?.[locale]}
              content={
                <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white space-y-8">
                  {/* Header with Stats */}
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                    <h2 className="text-xl font-bold text-slate-800 self-start">
                      Reviews ({singleFlight?.reviewSummary?.totalReviews})
                    </h2>
                    <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all font-bold text-sm">
                      <MessageSquare size={16} /> Write a Review
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    {/* Average Rating Card */}
                    <div className="text-center space-y-2 border-r border-slate-200 hidden md:block">
                      <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">
                        Customer Reviews & Ratings
                      </p>
                      <h1 className="text-6xl font-black text-slate-900">
                        {singleFlight?.reviewSummary?.averageRating}
                        <span className="text-2xl text-slate-400">/ 5.0</span>
                      </h1>
                      <div className="flex justify-center text-rose-500 gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-slate-400 text-sm italic">
                        Based On{' '}
                        {singleFlight?.reviewSummary?.totalReviews.toLocaleString()}{' '}
                        Reviews
                      </p>
                    </div>

                    {/* Rating Breakdown Bars */}
                    <div className="space-y-3 w-full">
                      {singleFlight?.reviewSummary?.ratingBreakdown?.map(
                        (item) => {
                          const percentage =
                            (item.count /
                              singleFlight?.reviewSummary?.totalReviews) *
                            100
                          return (
                            <div
                              key={item.stars}
                              className="flex items-center gap-4 text-sm font-bold text-slate-600"
                            >
                              <span className="w-24 shrink-0">
                                {item.stars} Star Ratings
                              </span>
                              <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-rose-500 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="w-10 text-right text-slate-400">
                                {item.count}
                              </span>
                            </div>
                          )
                        }
                      )}
                    </div>
                  </div>

                  {/* Individual User Reviews */}
                  <div className="space-y-6">
                    {singleFlight?.userReviews?.map((review, index) => (
                      <div
                        key={index}
                        className="border border-slate-200 rounded-2xl p-6 space-y-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden relative border-2 border-white shadow-sm">
                              <Image
                                src={`https://randomuser.me/api/portraits/men/${(index % 50) + 1}.jpg`}
                                alt={review.userName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900">
                                {review.userName}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                <span>{review.date[locale]}</span>
                                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                                  <Star size={10} fill="currentColor" />{' '}
                                  {review.rating.toFixed(1)}
                                </span>
                                <span className="text-slate-900 font-bold">
                                  {review.title[locale]}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="text-slate-400 hover:text-slate-600 border border-slate-200 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all">
                            Reply
                          </button>
                        </div>

                        <p className="text-slate-600 leading-relaxed text-sm">
                          {review.comment[locale]}
                        </p>

                        {/* Reactions */}
                        <div className="flex items-center gap-6 pt-2 border-t border-slate-50">
                          <button className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 transition-colors text-xs font-bold">
                            <ThumbsUp size={16} /> {review.userId.slice(0, 2)}
                          </button>
                          <button className="flex items-center gap-1.5 text-slate-400 hover:text-rose-600 transition-colors text-xs font-bold">
                            <ThumbsDown size={16} /> {review.userId.slice(2, 4)}
                          </button>
                          <button className="flex items-center gap-1.5 text-slate-400 hover:text-rose-500 transition-colors text-xs font-bold">
                            <Heart
                              size={16}
                              fill={index === 0 ? 'currentColor' : 'none'}
                              className={index === 0 ? 'text-rose-500' : ''}
                            />{' '}
                            {review.userId.slice(4, 6)}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Button */}
                  <div className="flex justify-center pt-6">
                    <button className="bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white px-10 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all">
                      See all{' '}
                      {singleFlight?.reviewSummary?.totalReviews.toLocaleString()}{' '}
                      reviews
                    </button>
                  </div>
                </div>
              }
            />
          </section>

          <aside className="col-span-12 lg:col-span-3 md:mt-3 space-y-4">
            {/* 1. Check Availability Card */}
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
        </div>
      </main>
    </div>
  )
}

export default ViewFlight
