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

const Navbar = () => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/signup' })
  }

  if (!mounted) return null

  const settings = ['Profile', 'Account', 'Dashboard']

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'
      } shadow-md backdrop-blur-xl`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-10">
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
            <Link href="/" className="flex items-center gap-3 group">
              <figure className="relative w-9 h-9 rounded-full overflow-hidden transition duration-300 group-hover:scale-110">
                <Image
                  src="/planet.png"
                  fill
                  alt="logo"
                  className="object-cover"
                />
              </figure>
              <span className="font-bold text-xl tracking-tight uppercase">
                <span className="text-emerald-600">Travel</span>
                <span className="text-slate-700 dark:text-slate-300">Mate</span>
              </span>
            </Link>
          </div>

          {/* 3. Desktop Navigation (Centered only on Desktop) */}
          {/* 'md:flex-[2] md:justify-center' ব্যবহার করা হয়েছে আইটেমগুলো মাঝখানে আনতে */}
          <div className="hidden md:flex items-center justify-center gap-8 md:flex-[2]">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={index}
                  href={item.path}
                  className={`relative text-[15px] font-medium transition duration-300 ${
                    isActive ? 'text-blue-600' : 'hover:text-blue-600'
                  }`}
                >
                  {item.name}
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
                          href={`/${setting.toLowerCase()}`}
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
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/signup"
                className="px-3 py-1.5 text-xs rounded-md sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-2.5 md:text-base md:rounded-lg bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition duration-300 inline-block text-center whitespace-nowrap"
              >
                Sign Up
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
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  onClick={() => setIsNavOpen(false)}
                  className={`text-lg font-medium ${pathname === item.path ? 'text-blue-600' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t flex justify-between items-center">
                <DarkMode />
                {session?.user && (
                  <button
                    onClick={handleSignOut}
                    className="text-red-500 font-bold"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
