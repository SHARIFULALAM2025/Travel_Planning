'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import React, { use, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/Components/Container/Container'
import Image from 'next/image'
import {
  FaMapMarkerAlt,
  FaPlane,
  FaRegCheckCircle,
  FaRegHeart,
  FaShareAlt,
  FaStarHalf,
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
import { GiCommercialAirplane, GiCruiser } from 'react-icons/gi'
import { SiGooglemaps } from 'react-icons/si'
import Accordion from '../Accordion'
const VisaDetails = ({ params }) => {
  const locale = useLocale()
  const resolvedParams = use(params)
  const id = resolvedParams.id
  const { theme } = useTheme()
  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  const { data: singleVisa = {}, isLoading } = useQuery({
    queryKey: ['single visa', id, locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/uniqueData/${id}`
      )
      return res.data
    },
  })
  console.log(singleVisa)

  useEffect(() => {
    setMounted(true)
  }, [])

  const nextSlide = () => {
    if (singleVisa?.image) {
      setActiveImgIndex((prev) =>
        prev === singleVisa.image.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevSlide = () => {
    if (singleVisa?.image) {
      setActiveImgIndex((prev) =>
        prev === 0 ? singleVisa.image.length - 1 : prev - 1
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
    <Container>
      <div>
        <section className="relative w-full h-[50vh] md:h-[70vh] min-h-[400px] overflow-hidden">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'linear' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://i.ibb.co.com/JR0Mp8YF/geojango-maps-CWbb-JW-7-Fsw-unsplash.jpg')`,
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
                      {singleVisa?.visaName?.[locale] || 'Loading...'}
                    </h1>
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
                    {singleVisa?.image && (
                      <motion.div
                        key={activeImgIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={singleVisa.image[activeImgIndex]}
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
                  {singleVisa?.image?.map((img, idx) => (
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 border border-slate-200 rounded-2xl"
              >
                <div className="flex gap-3 items-center mb-6">
                  <GiCommercialAirplane className="text-indigo-600 text-2xl" />
                  <h2
                    className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                  >
                    visa Information
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4">
                  <div className="space-y-1">
                    <p
                      className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} uppercase`}
                    >
                      country
                    </p>
                    <h3
                      className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-bold`}
                    >
                      {singleVisa?.country?.[locale]}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <p
                      className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} uppercase`}
                    >
                      Category
                    </p>
                    <h3
                      className={` ${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-bold`}
                    >
                      {singleVisa?.cat?.[locale]}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <p
                      className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} uppercase`}
                    >
                      validity
                    </p>
                    <h3
                      className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-bold`}
                    >
                      {singleVisa?.validity?.[locale]}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <p
                      className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} uppercase`}
                    >
                      processing & time
                    </p>
                    <h3
                      className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-bold`}
                    >
                      {singleVisa?.processingTime?.[locale]}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <p
                      className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} uppercase`}
                    >
                      visa Mode
                    </p>
                    <h3
                      className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-bold`}
                    >
                      {singleVisa?.visaMode?.[locale]}
                    </h3>
                  </div>
                </div>
              </motion.div>
              <Accordion
                title={singleVisa?.documentsRequirement?.title?.[locale]}
                content={
                  <div>
                    {singleVisa?.documentsRequirement?.items?.[locale].map(
                      (item) => (
                        <div key={item}>
                          <h1 className="">{item}</h1>
                        </div>
                      )
                    )}
                  </div>
                }
              />
              <Accordion
                title={'Description'}
                content={singleVisa?.description?.[locale]}
              />
              <Accordion
                title={singleVisa?.additionalRequirement?.title?.[locale]}
                content={
                  <div>
                    {singleVisa?.additionalRequirement?.items?.[locale].map(
                      (item) => (
                        <div key={item}>
                          <h1 className="">{item}</h1>
                        </div>
                      )
                    )}
                  </div>
                }
              />
              <Accordion
                title={'Frequently asked question'}
                content={
                  <div>
                    {singleVisa?.faq?.map((item) => (
                      <div key={item?.question?.[locale]}>
                        <Accordion
                          title={item?.question?.[locale]}
                          content={item?.answer?.[locale]}
                        />
                      </div>
                    ))}
                  </div>
                }
              />
              <Accordion
                title={singleVisa?.conditionalRequirement?.title?.[locale]}
                content={
                  <div>
                    {singleVisa?.conditionalRequirement?.items?.[locale].map(
                      (item) => (
                        <div key={item}>
                          <h1 className="">{item}</h1>
                        </div>
                      )
                    )}
                  </div>
                }
              />
              <Accordion
                title={'Reviews'}
                content={
                  <div className="max-w-5xl mx-auto md:p-4   space-y-8">
                    {/* Header with Stats */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                      <h2
                        className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} self-start`}
                      >
                        Reviews ({singleVisa?.reviewSummary?.totalReviews})
                      </h2>
                      <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all font-bold text-sm">
                        <MessageSquare size={16} /> Write a Review
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center  p-6 rounded-2xl border border-slate-100">
                      {/* Average Rating Card */}
                      <div className="text-center space-y-2 border-r border-slate-200 hidden md:block">
                        <p
                          className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-bold uppercase tracking-wider text-xs`}
                        >
                          Customer Reviews & Ratings
                        </p>
                        <h1
                          className={`text-6xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                        >
                          {singleVisa?.reviewSummary?.averageRating}
                          <span
                            className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                          >
                            / 5.0
                          </span>
                        </h1>
                        <div
                          className={`flex justify-center ${theme === 'dark' ? 'text-white' : 'text-rose-500'} gap-1`}
                        >
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} fill="currentColor" />
                          ))}
                        </div>
                        <p
                          className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} text-sm italic`}
                        >
                          Based On{' '}
                          {singleVisa?.reviewSummary?.totalReviews.toLocaleString()}{' '}
                          Reviews
                        </p>
                      </div>

                      {/* Rating Breakdown Bars */}
                      <div className="space-y-3 w-full">
                        {singleVisa?.reviewSummary?.ratingBreakdown?.map(
                          (item) => {
                            const percentage =
                              (item.count /
                                singleVisa?.reviewSummary?.totalReviews) *
                              100
                            return (
                              <div
                                key={item.stars}
                                className={`flex items-center gap-4 text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                              >
                                <span className="w-24 shrink-0">
                                  {item.stars} Star Ratings
                                </span>
                                <div className="flex-1 h-2.5 bg-black rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-rose-500 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span
                                  className={`w-10 text-right ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                                >
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
                      {singleVisa?.userReviews?.map((review, index) => (
                        <div
                          key={index}
                          className="border border-slate-200 rounded-2xl p-1 md:p-6 space-y-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex md:gap-4 gap-2">
                              <div className="md:w-12 w-9 md:h-12 h-8 rounded-full bg-slate-200 overflow-hidden relative border-2 border-white shadow-sm">
                                <Image
                                  src={`https://randomuser.me/api/portraits/men/${(index % 50) + 1}.jpg`}
                                  alt={review.userName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4
                                  className={`font-bold  ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                                >
                                  {review.userName}
                                </h4>
                                <div
                                  className={`flex items-center gap-2 text-xs ${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-medium`}
                                >
                                  <span>one day ago</span>
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
                            <button
                              className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} border border-slate-200 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all`}
                            >
                              Reply
                            </button>
                          </div>

                          <p
                            className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} leading-relaxed text-sm`}
                          >
                            {review.comment[locale]}
                          </p>

                          {/* Reactions */}
                          <div className="flex items-center gap-6 pt-2 border-t border-slate-50">
                            <button
                              className={`flex items-center gap-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'} hover:text-indigo-600 transition-colors text-xs font-bold`}
                            >
                              <ThumbsUp size={16} /> {review.userId.slice(0, 2)}
                            </button>
                            <button
                              className={`flex items-center gap-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'} hover:text-rose-600 transition-colors text-xs font-bold`}
                            >
                              <ThumbsDown size={16} />{' '}
                              {review.userId.slice(2, 4)}
                            </button>
                            <button
                              className={`flex items-center gap-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'} hover:text-rose-500 transition-colors text-xs font-bold`}
                            >
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
                        {singleVisa?.reviewSummary?.totalReviews.toLocaleString()}{' '}
                        reviews
                      </button>
                    </div>
                  </div>
                }
              />
            </section>

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
                    {[
                      'Adults',
                      'Infants (0-12 Yrs)',
                      'Children (2-12 Yrs)',
                    ].map((label) => (
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
                    ))}
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
    </Container>
  )
}

export default VisaDetails
