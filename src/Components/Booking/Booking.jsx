'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'
import Container from '../Container/Container'
import { FaRegClock, FaUser, FaStar, FaMapMarkerAlt } from 'react-icons/fa'
import { AiOutlineGlobal } from 'react-icons/ai'
import { CiCircleCheck } from 'react-icons/ci'
import { RxCrossCircled } from 'react-icons/rx'
import { ChevronDown, Calendar, Ticket, Info } from 'lucide-react'

const Booking = () => {
  const t = useTranslations('travelBook')
  const items = t.raw('item') || []
  const [open, setOpen] = useState(null)

  const toggle = (index) => {
    setOpen(open === index ? null : index)
  }

  return (
    <Container>
      <section className="py-12 px-4 transition-colors duration-300 bg-white dark:bg-slate-950">
        {items.map((item, index) => (
          <div key={item.id || index} className="mb-24">
            {/* --- শিরোনাম এবং লোকেশন --- */}
            <div className="mb-8">
              <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm mb-2">
                Discovery
              </p>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white">
                {item.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-slate-500 dark:text-slate-400 text-sm font-medium">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-red-500" /> {item.location}
                </span>
                <span className="flex items-center gap-1 text-amber-500">
                  <FaStar /> {item.review}
                </span>
              </div>
            </div>

            {/* --- প্রফেশনাল ইমেজ গ্রিড --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[450px] md:h-[600px] mb-12 overflow-hidden rounded-3xl shadow-lg">
              <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden">
                <Image
                  src={item.image[0]}
                  alt="Main"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {item.image.slice(0, 5).map((img, i) => (
                <div
                  key={i}
                  className="relative hidden md:block group overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`Tour photo ${i + 2}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-xl font-black text-blue-600">
                {item.from}$59.00/{item.person}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-10">
                <div className=" flex-wrap items-center  p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                  <div className="flex flex-wrap gap-8">
                    <div className="flex items-center gap-3">
                      <FaRegClock className="text-blue-500 text-xl" />
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">
                          Duration
                        </p>
                        <p className="font-semibold dark:text-white">
                          {item.day}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <AiOutlineGlobal className="text-blue-500 text-xl" />
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">
                          Type
                        </p>
                        <p className="font-semibold dark:text-white">
                          {item.Type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaUser className="text-blue-500 text-xl" />
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">
                          People
                        </p>
                        <p className="font-semibold dark:text-white">
                          {item.people}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">
                    {item.about}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>

                {/* Trip Highlights */}
                <div className="space-y-4">
                  <h1 className="text-xl font-bold dark:text-white uppercase tracking-tight">
                    {item.trip}
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[item.trip1, item.trip2, item.trip3].map((t, i) => (
                      <div
                        key={i}
                        className="flex gap-2 items-center text-slate-700 dark:text-slate-300"
                      >
                        <CiCircleCheck className="text-green-500 text-xl flex-shrink-0" />
                        <p>{t}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-slate-200 dark:border-slate-800" />

                {/* Inclusion & Exclusion */}
                <div>
                  <h1 className="text-2xl font-bold mb-6 dark:text-white">
                    {item.include}
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-3">
                      {[
                        item.include1,
                        item.include2,
                        item.include3,
                        item.include4,
                      ].map((text, i) => (
                        <div
                          key={i}
                          className="flex gap-3 items-center text-slate-600 dark:text-slate-400"
                        >
                          <CiCircleCheck className="text-green-500 text-xl" />
                          <p>{text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {[
                        item.exclude1,
                        item.exclude2,
                        item.exclude3,
                        item.exclude4,
                      ].map((text, i) => (
                        <div
                          key={i}
                          className="flex gap-3 items-center text-slate-400"
                        >
                          <RxCrossCircled className="text-red-400 text-xl" />
                          <p className="line-through">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <hr className="border-slate-200 dark:border-slate-800" />

                {/* Itinerary Accordion */}
                <div>
                  <h2 className="text-2xl font-bold dark:text-white">
                    {item.tour}
                  </h2>
                  <p className="text-slate-500 mb-6">{item.plan}</p>
                  <div className="space-y-3">
                    {[1, 2, 3].map((num) => (
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
                              {item[`day${num}`]}
                            </span>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform ${open === num ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {open === num && (
                          <div className="p-5 bg-slate-50 dark:bg-slate-800/30 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 leading-relaxed italic">
                            {item[`text${num}`]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Section */}
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold dark:text-white">
                    Location
                  </h1>
                  <p className="text-slate-500">{item.textLocation}</p>
                  <div className="relative h-[450px] rounded-3xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-inner">
                    <Image
                      src={item.map}
                      alt="map image"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <hr className="border-slate-200 dark:border-slate-800" />

                {/* Reviews */}
                <div className="pb-10">
                  <h1 className="text-2xl font-bold dark:text-white">
                    Customer Reviews
                  </h1>
                  <div className="mt-4 p-6 bg-blue-50 dark:bg-slate-900 rounded-2xl border-l-4 border-blue-500 italic text-slate-600 dark:text-slate-400">
                    {item.customer}
                  </div>
                  <div className="mt-12 p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-center gap-10">
                    {/* Left Side: Score Card */}
                    <div className="w-full md:w-1/3 p-10 bg-white dark:bg-slate-800 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0,04)] dark:shadow-none flex flex-col items-center justify-center text-center border border-slate-50 dark:border-slate-700">
                      <h1 className="text-7xl font-black text-[#6322E0] mb-2 leading-none">
                        4.9
                      </h1>
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                        Excellent
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Based On 1582 Reviews
                      </p>
                    </div>

                    {/* Right Side: Rating Progress Bars */}
                    <div className="w-full md:w-2/3 space-y-5">
                      {[
                        { label: 'Location', score: '4/5', width: '80%' },
                        { label: 'Amenities', score: '4/5', width: '80%' },
                        { label: 'Services', score: '4/5', width: '80%' },
                        { label: 'Price', score: '3.5/5', width: '70%' },
                        { label: 'Rooms', score: '5/5', width: '100%' },
                      ].map((rating, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          {/* Label */}
                          <span className="w-24 text-lg font-semibold text-slate-700 dark:text-slate-300">
                            {rating.label}
                          </span>

                          {/* Progress Bar Container */}
                          <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#6322E0] rounded-full transition-all duration-1000"
                              style={{ width: rating.width }}
                            />
                          </div>

                          {/* Score Text */}
                          <span className="w-12 text-right font-bold text-slate-800 dark:text-slate-100 italic">
                            {rating.score}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <hr className="border-slate-200 dark:border-slate-800" />
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold border-b pb-4 dark:border-slate-800">
                    2 Reviews
                  </h2>

                  {[1, 2].map((review, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row gap-6 pb-8 border-b last:border-none dark:border-slate-800"
                    >
                      {/* User Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-slate-100">
                          <Image
                            src="https://i.ibb.co.com/LdWvGwK8/dino-reichmuth-A5r-CN8626-Ck-unsplash.jpg"
                            alt="User Avatar"
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold">
                              Ronald Richards
                            </h3>
                            <p className="text-sm text-blue-500 dark:text-blue-400 font-medium">
                              20 Mar, 2023 . 4:00 Pm
                            </p>
                          </div>
                          <div className="flex text-amber-500 gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} size={14} />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                          Castle In One Day Is Next To Impossible. Designed
                          Specifically For Trave Areli Areafo Time In London,
                          This Tour Allow To Check Off A Range Of Southern Day
                          Is Next Together Impossible. Designed SpeciEngland.
                        </p>
                        <button className="px-4 py-1.5 bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-sm font-bold rounded-lg hover:bg-blue-100 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* --- Leave A Reply Form --- */}
                <div className="space-y-8 pt-8">
                  <h2 className="text-2xl font-bold">Leave A Reply</h2>

                  {/* Rating Stars Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                    {item.range.map((label) => (
                      <div
                        key={label}
                        className="flex items-center justify-between"
                      >
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {label} :
                        </span>
                        <div className="flex text-slate-200 dark:text-slate-700 gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              size={16}
                              className="hover:text-amber-400 cursor-pointer"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Fields */}
                  <form className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                      <input
                        type="email"
                        placeholder="E-mail Address"
                        className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <textarea
                      rows={6}
                      placeholder="Write Message"
                      className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    ></textarea>

                    {/* Checkbox */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="save-info"
                        className="w-5 h-5 rounded accent-blue-600 cursor-pointer"
                      />
                      <label
                        htmlFor="save-info"
                        className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer"
                      >
                        Save My Name, Email, And Website In This Browser For The
                        Next Time I Comment.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="px-10 py-4 bg-[#6322E0] hover:bg-[#521bc0] text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95"
                    >
                      SUBMIT REVIEW
                    </button>
                  </form>
                </div>
              </div>

              {/* ডান পাশ: বুকিং ফরম (Col 4) */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6">
                  <h1 className="text-xl font-black mb-6 flex items-center gap-2 dark:text-white uppercase tracking-tighter">
                    <Calendar className="text-blue-600" /> Book This Tour
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
        ))}
      </section>
    </Container>
  )
}

export default Booking
