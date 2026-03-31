'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'use-intl'
import { color, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

const Contact = () => {
  const { theme } = useTheme()
  const t = useTranslations('contactInfo')
  const [mounted, setMounted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const handelForm = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/message`,
        data
      )

      if (res.data?.insertedId || res.status === 200 || res.status === 201) {
        toast.success(t('message'))
        reset()
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error(error.response?.data?.message || 'Something went wrong!')
    }
  }
    const bgStyle =
      theme === 'dark'
        ? {
          backgroundColor: '#0F172A',
          color:"#FFFFFF",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23334155' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H2V1z'%3E%3C/path%3E%3C/svg%3E")`,
          }
        : {
          backgroundColor: '#FFFFFF',
          color:"#000000"
          }
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div
      style={bgStyle}
      className={`min-h-screen transition-colors duration-500`}
    >
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-6xl mx-auto px-6 py-12 lg:py-20 font-sans"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={bgStyle}
            className={`lg:col-span-4 p-6 md:p-8 rounded-3xl border ${
              isDark
                ? 'bg-neutral-900 border-neutral-200'
                : 'bg-gray-50 border-gray-900'
            } shadow-sm`}
          >
            <h3 className={`text-2xl font-bold mb-4`}>{t('info')}</h3>
            <p className={` mb-8 leading-relaxed`}>{t('des')}</p>

            <div className={`space-y-5 `}>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-bold mb-1 opacity-60">
                  {t('phoneText')}
                </span>
                <p className="font-medium">{t('phone')}</p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-bold mb-1 opacity-60">
                  {t('website')}
                </span>
                <p className="font-medium text-purple-500">{t('webLink')}</p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-bold mb-1 opacity-60">
                  {t('email_2')}
                </span>
                <p className="font-medium">{t('email_l')}</p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-bold mb-1 opacity-60">
                  {t('address_1')}
                </span>
                <p className="font-medium">{t('address')}</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-10 rounded-2xl overflow-hidden h-52 bg-gray-200 relative group">
              <Image
                src="https://i.ibb.co.com/tPTsrtdH/screencapture-google-maps-23-8698958-90-3868377-14z-2026-03-06-10-27-02.png"
                alt="Map"
                width={400}
                height={200}
                className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
              <button className="absolute bottom-3 left-3 bg-white px-4 py-2 rounded-xl shadow-lg text-xs font-bold text-gray-800 hover:bg-gray-50 transition-colors">
                Open In Maps ↗
              </button>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-8"
          >
            <h2
              className={`text-3xl md:text-5xl font-extrabold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t('title')}
            </h2>
            <p className={`mb-10 max-w-2xl text-lg`}>{t('description')}</p>

            <form className="space-y-5" onSubmit={handleSubmit(handelForm)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-medium">{t('name')}</label>
                  <input
                    style={bgStyle}
                    type="text"
                    {...register('text', { required: true })}
                    placeholder={t('placeholderName')}
                    className={`w-full p-4  rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all `}
                  />
                  {errors.text && (
                    <span className="text-red-700">{t('errorMessage')}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium">{t('email_2')}</label>
                  <input
                    style={bgStyle}
                    type="email"
                    {...register('email', { required: true })}
                    placeholder={t('placeholderEmail')}
                    className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all `}
                  />
                  {errors.email && (
                    <span className="text-red-700">{t('errorMessage')}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">{t('website')}</label>
                <input
                  style={bgStyle}
                  type="url"
                  {...register('url')}
                  placeholder={t('placeholderWeb')}
                  className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">{t('comment')}</label>
                <textarea
                  style={bgStyle}
                  rows="5"
                  {...register('message', { required: true })}
                  placeholder={t('placeholderComment')}
                  className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all `}
                ></textarea>
                {errors.message && (
                  <span className="text-red-700">{t('errorMessage')}</span>
                )}
              </div>

              <div className="flex items-start gap-3 py-2">
                <input
                  type="checkbox"
                  id="save-info"
                  className="mt-1 w-5 h-5 accent-purple-600 rounded"
                />
                <label
                  htmlFor="save-info"
                  className={`text-sm leading-snug cursor-pointer select-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  {t('remained')}
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto bg-[#6322ef] hover:bg-[#5219d3] text-white font-bold py-4 px-10 rounded-xl uppercase tracking-wide transition-all shadow-lg active:scale-95"
              >
                {t('button')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Contact
