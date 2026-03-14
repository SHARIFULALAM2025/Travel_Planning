'use client'
import React, { useEffect, useState } from 'react'
import { navItems } from './NavData'
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import DarkMode from '../DarkMode/DarkMode'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useLocale, useTranslations } from 'next-intl'
import { BsCart3, BsGlobe } from 'react-icons/bs'
import { BsX } from 'react-icons/bs'
import { MyLanguages } from './Language'
import { useRouter } from 'next/navigation'
import { GiCommercialAirplane } from 'react-icons/gi'
import Container from '../Container/Container'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Navbar = () => {
  const locale = useLocale()
  const t = useTranslations('Navbar')
  console.log('Current Locale:', locale)
  console.log('Logo Text:', t('logo_text'))
  console.log('Title:', t('title'))
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const pathname = usePathname()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  //card
    const { data: card = [] } = useQuery({
      queryKey: ['AllCard', locale],
      queryFn: async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/allCard`
        )
        return res.data
      },
     
    })

  //

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    console.log('Locale changed to:', locale)
  }, [locale])

  const handleSignOut = () => {
    signOut({ callbackUrl: `/${locale}/signup` })
  }

  if (!mounted) return null

  const settings = ['Profile', 'Account', 'Dashboard']

  const changeLanguage = (newLocale) => {
    const segments = pathname.split('/').filter(Boolean)

    const currentLocales = ['bn', 'en']

    if (currentLocales.includes(segments[0])) {
      segments[0] = newLocale
    } else {
      segments.unshift(newLocale)
    }

    const newPath = `/${segments.join('/')}`

    // Force a full page reload to ensure translations update
    window.location.href = newPath
    setIsOpen(false)
  }
  return (
    <Container>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-slate-900 text-white'
            : 'bg-white text-gray-900'
        } shadow-md backdrop-blur-xl`}
      >
        <div className=" px-4 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* 1. Mobile Menu Button (Unchanged) */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                {isNavOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>

            {/* 2. Logo Section */}
            {/* Desktop-এ এটিকে বামে রাখার জন্য 'md:flex-1' যোগ করা হয়েছে */}
            <div className="md:flex-1 flex justify-center md:justify-start">
              <Link
                href={`/${locale}`}
                className="flex items-center gap-3 group"
              >
                <figure className="relative w-9 h-9 rounded-full overflow-hidden transition duration-300 group-hover:scale-110">
                  <Image
                    src="/planet.png"
                    fill
                    alt="logo"
                    className="object-cover"
                  />
                </figure>
                <span className="font-bold text-xl tracking-tight uppercase">
                  <span className="text-emerald-600">{t('logo_text')}</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {t('title')}
                  </span>
                </span>
              </Link>
            </div>

            {/* 3. Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-8 md:flex-[2]">
              {navItems
                .filter((item) => {
                  if (item.access === 'private') {
                    return !!session?.user
                  }
                  return true
                })
                .map((item, index) => {
                  const fullPath = `/${locale}${item.path}`
                  const isActive = pathname === fullPath

                  return (
                    <Link
                      key={index}
                      href={fullPath}
                      // 'group' ক্লাসটি এখানে খুব জরুরি আইকন কন্ট্রোল করার জন্য
                      className={`group relative text-[15px] font-medium py-2 transition duration-300 ${
                        isActive ? 'text-blue-600' : 'hover:text-blue-600'
                      }`}
                    >
                      {/* হোভার আইকন: বিমান */}
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 -rotate-25 opacity-0 group-hover:opacity-100 group-hover:-top-2 transition-all duration-300 text-blue-500">
                        <GiCommercialAirplane size={18} />
                      </span>

                      {/* টেক্সট */}
                      {t(item.name)}

                      {/* এক্টিভ বর্ডার লাইন */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-600"
                        />
                      )}
                    </Link>
                  )
                })}
            </div>

            {/* 4. Right Side Actions */}
            {/* Desktop-এ ডানপাশে ফিক্সড রাখার জন্য 'md:flex-1' যোগ করা হয়েছে */}
            <div className="flex items-center justify-end gap-4 md:flex-1">
              <div className="hidden sm:block">
                <DarkMode />
              </div>
              {session?.user && (
                <Link
                  href={`/${locale}/cart`}
                  className="relative p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors group"
                >
                  <BsCart3
                    size={22}
                    className="text-gray-700 dark:text-gray-200 group-hover:text-blue-600"
                  />

                  <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                    {card.length}
                  </span>
                </Link>
              )}
              <div className="">
                <button
                  onClick={() => setIsOpen(true)}
                  className="group hidden md:flex items-center  gap-2 px-3 py-2.5 rounded-xl border border-gray-200 backdrop-blur-md hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 shadow-sm active:scale-95"
                >
                  {/* আইকন কন্টেইনার */}
                  <div className="relative">
                    <BsGlobe
                      className={`${theme == 'dark' ? 'text-white' : 'text-black'} group-hover:text-blue-600 transition-colors duration-300`}
                      size={20}
                    />

                    {/* ইন্ডিকেটর আইকনটি এখন গ্লোবাল আইকনের উপরে */}
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 border border-white"></span>
                    </span>
                  </div>

                  {/* ল্যাঙ্গুয়েজ টেক্সট */}
                  <span
                    className={`text-xs ${theme == 'dark' ? 'text-white' : 'text-black'} font-semibold text-black group-hover:text-blue-700 uppercase tracking-wide`}
                  >
                    {MyLanguages.find((lang) => lang.code === locale)?.label}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <>
                      {/* ব্যাকড্রপ (ঝাপসা কালো পর্দা) */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
                      />

                      {/* ড্রয়ার কন্টেন্ট (উপর থেকে নামবে) */}
                      <motion.div
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{
                          type: 'spring',
                          damping: 25,
                          stiffness: 200,
                        }}
                        className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 z-[1000] shadow-2xl rounded-b-[1rem] border-b border-blue-100"
                      >
                        <div className="relative">
                          <div className="p-2">
                            <h2 className="text-5xl text-center font-semibold text-gray-800 dark:text-white">
                              Select Language
                            </h2>
                            <p className="text-gray-100 text-xl text-center ">
                              Choose your preferred language for TravelMate
                            </p>
                            <hr></hr>
                            <div className="grid md:grid-cols-5 grid-cols-2 gap-2 pt-5">
                              {MyLanguages.map((item) => (
                                <div
                                  key={item.code}
                                  onClick={() => changeLanguage(item.code)}
                                  className={`p-2 rounded-lg transition hover:bg-blue-100 dark:hover:bg-gray-800 hover:cursor-pointer ${
                                    locale === item.code
                                      ? 'text-blue-600 font-semibold'
                                      : ''
                                  }`}
                                >
                                  {item.label}
                                </div>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-gray-100 border border-red-700 absolute top-0 right-0 dark:hover:bg-gray-800 rounded-full transition-colors"
                          >
                            <BsX size={32} className="text-gray-100" />
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {session?.user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center focus:outline-none"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden hover:scale-105 transition-transform relative">
                      <Image
                        src={
                          session.user.image ||
                          'https://mui.com/static/images/avatar/2.jpg'
                        }
                        width={40}
                        height={40}
                        alt="User"
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-xl py-2 z-50 text-gray-800 dark:text-gray-200 border dark:border-slate-700"
                      >
                        {settings.map((setting) => (
                          <Link
                            key={setting}
                            href={`/${locale}/${setting.toLowerCase()}`}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            {setting}
                          </Link>
                        ))}
                        <hr className="my-1 border-gray-100 dark:border-slate-700" />
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          {t('Log-Out')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={`/${locale}/signup`}
                  className="px-3 py-1.5 text-xs rounded-md sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-2.5 md:text-base md:rounded-lg bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition duration-300 inline-block text-center whitespace-nowrap"
                >
                  {t('signup-button')}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* 5. Mobile Sidebar Drawer (Unchanged) */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden overflow-hidden border-t ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className="flex flex-col p-4 space-y-4">
                {navItems.map((item, index) => {
                  const fullPath = `/${locale}${item.path}`
                  return (
                    <Link
                      key={index}
                      href={fullPath}
                      onClick={() => setIsNavOpen(false)}
                      className={`text-lg font-medium ${pathname === fullPath ? 'text-blue-600' : ''}`}
                    >
                      {t(item.name)}
                    </Link>
                  )
                })}
                <div className="pt-4 border-t flex justify-between items-center">
                  <DarkMode />
                  <button
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 backdrop-blur-md hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 shadow-sm active:scale-95"
                  >
                    {/* আইকন কন্টেইনার */}
                    <div className="relative">
                      <BsGlobe
                        className={`${theme == 'dark' ? 'text-white' : 'text-black'} group-hover:text-blue-600 transition-colors duration-300`}
                        size={20}
                      />

                      {/* ইন্ডিকেটর আইকনটি এখন গ্লোবাল আইকনের উপরে */}
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 border border-white"></span>
                      </span>
                    </div>

                    {/* ল্যাঙ্গুয়েজ টেক্সট */}
                    <span
                      className={`text-xs ${theme == 'dark' ? 'text-white' : 'text-black'} font-semibold text-black group-hover:text-blue-700 uppercase tracking-wide`}
                    >
                      {MyLanguages.find((lang) => lang.code === locale)?.label}
                    </span>
                  </button>
                  {session?.user && (
                    <button
                      onClick={handleSignOut}
                      className="text-red-500 font-bold"
                    >
                      {t('Log-Out')}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </Container>
  )
}

export default Navbar
