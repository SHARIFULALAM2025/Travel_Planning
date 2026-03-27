'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PersonalInjuryIcon from '@mui/icons-material/PersonalInjury'

import { FaFacebookF, FaYoutube, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import Container from '../Container/Container'
import { useLocale, useTranslations } from 'next-intl'
import { GiCommercialAirplane } from 'react-icons/gi'
import { navItems } from '../Header/NavData'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useTheme } from 'next-themes'

const Footer = () => {
  const { data: session } = useSession()
  const { theme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const currentYear = new Date().getFullYear()
  const locale = useLocale()
  const t = useTranslations('Navbar')
  const foot = useTranslations('footer')
  const { data: paymentImg = [] } = useQuery({
    queryKey: ['All img'],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/all-pay-img`
      )
      return res.data
    },
  })
  const bgStyle =
    theme === 'dark'
      ? {
          backgroundColor: '#0F172A',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23334155' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H2V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }
      : {
          backgroundColor: '#00041a',
        }

  useEffect(() => {
    setMounted(true)
  }, [])

  const contactItems = [
    {
      icon: FaEnvelope,
      href: 'sharifullinkdin2025@gmail.com',
      text: 'sharifullinkdin2025@gmail.com',
      isLink: true,
    },
    {
      icon: FaPhoneAlt,
      href: 'mob:- 01829197321',
      text: 'mob:- 01829197321',
      isLink: true,
    },
    {
      icon: IoLocationSharp,
      text: '1230 Uttara-Dhaka  Bangladesh',
      isLink: false,
    },
  ]

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: 'https://www.facebook.com/profile.php?id=61577170528426',
      color: 'hover:bg-blue-600',
    },
    {
      icon: LinkedInIcon,
      href: 'https://www.linkedin.com/in/sharifulalam-dev',
      color: 'hover:bg-pink-600',
    },
    {
      icon: PersonalInjuryIcon,
      href: 'https://sharifulalam.vercel.app/',
      color: 'hover:bg-sky-500',
    },
    {
      icon: FaYoutube,
      href: 'https://www.youtube.com/@THEBANGLADESHTIMES-x4k',
      color: 'hover:bg-red-600',
    },
  ]

  if (!mounted) return null

  return (
    <Container>
      <footer
        style={bgStyle}
        className="w-full border-t bg-white transition-colors  duration-300 dark:border-slate-800 dark:bg-slate-950"
      >
        <div className="mx-auto max-w-7xl px-4 md:py-16 py-3 lg:px-8">
          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* BRAND SECTION */}
            <div className="flex flex-col space-y-5">
              <Link
                href={`/${locale}`}
                className="flex items-center gap-3 group"
              >
                <figure className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md transition duration-300 group-hover:scale-110">
                  <Image
                    src="/profile.png"
                    fill
                    alt="logo"
                    className="object-cover"
                  />
                </figure>
                <div className="flex flex-col">
                  <span className="font-bold text-xl tracking-tight uppercase italic text-blue-600">
                    {t('logo_text')} {t('title')}
                  </span>
                  <span className="text-[10px] font-medium tracking-[2px] text-blue-600 uppercase">
                    Your Travel Partner
                  </span>
                </div>
              </Link>
              <p className="text-sm leading-relaxed text-white">
                {foot('foot_text')}
              </p>
            </div>

            {/* QUICK LINKS SECTION */}
            <div className="flex flex-col space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-blue-600 w-max pb-1">
                Quick Explore
              </h3>
              <nav className="flex flex-col space-y-3">
                {navItems
                  .filter((item) =>
                    item.access === 'private' ? !!session?.user : true
                  )
                  .map((item, index) => {
                    const fullPath = `/${locale}${item.path}`
                    const isActive = pathname === fullPath
                    return (
                      <Link
                        key={index}
                        href={fullPath}
                        className={`group flex items-center gap-2 text-[15px] font-medium transition duration-300 ${
                          isActive
                            ? 'text-blue-600'
                            : 'hover:text-blue-600 text-white'
                        }`}
                      >
                        <GiCommercialAirplane
                          className={`transition-transform duration-300 ${isActive ? 'rotate-45 scale-110' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:rotate-45'}`}
                          size={14}
                        />
                        {t(item.name)}
                      </Link>
                    )
                  })}
              </nav>
            </div>

            {/* CONTACT SECTION */}
            <div className="flex flex-col space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider  text-white border-b border-blue-600 w-max pb-1">
                Contact Us
              </h3>
              <ul className="space-y-4">
                {contactItems.map((item, i) => {
                  const Icon = item.icon
                  const content = (
                    <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg  text-white transition-colors group-hover:bg-blue-600 group-hover:text-white ">
                        <Icon size={16} />
                      </div>
                      <span className="text-sm  transition-colors group-hover:text-blue-600 text-white dark:group-hover:text-blue-400">
                        {item.text}
                      </span>
                    </div>
                  )
                  return (
                    <li key={i}>
                      {item.isLink ? (
                        <a href={item.href}>{content}</a>
                      ) : (
                        content
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* SOCIAL SECTION */}
            <div className="flex flex-col space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider  text-white border-b border-blue-600 w-max pb-1">
                Newsletter
              </h3>
              <p className="text-sm text-white">
                Subscribe to get latest travel updates and offers.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={i}
                      whileHover={{ y: -5 }}
                      href={social.href}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white  shadow-sm transition-all duration-300 hover:text-white dark:border-slate-800 dark:bg-slate-900 text-white ${social.color}`}
                    >
                      <Icon size={16} />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className=" mb-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent "></div>
          <div
            style={bgStyle}
            className="bg-[#00041a] text-white p-6 flex flex-col md:flex-row items-center gap-4 "
          >
            {/* Left Side: Label */}
            <div className="md:border-r border-slate-100 pr-6 flex items-center justify-center h-full">
              <span className="text-blue-400 font-semibold whitespace-nowrap">
                Pay With
              </span>
            </div>

            {/* Center Side: Payment Logos Grid */}
            <div className="flex-1 grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-11 gap-3">
              {paymentImg[0]?.image?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-1 rounded-md flex items-center justify-center h-10 w-full transition-transform hover:scale-105"
                >
                  <Image
                    src={item}
                    width={40}
                    height={25}
                    alt={`Payment Partner ${index}`}
                    className="object-contain max-h-full"
                  />
                </div>
              ))}
            </div>

            {/* Right Side: SSLCommerz Verified */}
            <div className="md:border-l border-slate-200 pl-6 flex flex-col items-center justify-center gap-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                Verified By
              </span>
              <div className="bg-[#002244] border border-blue-500/30 p-1 px-3 rounded text-[10px] font-bold text-white">
                SSLCOMMERZ
              </div>
            </div>
          </div>
          <div className=" mt-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent "></div>
          {/* BOTTOM BAR */}
          <div className="mt-8 flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-xs text-white">
              © {currentYear} Travel Tour. Crafted by Shariful Alam.
            </p>
            <div className="flex items-center gap-6 text-xs font-medium text-white">
              <Link href="#" className="hover:text-blue-600 transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-blue-600 transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </Container>
  )
}

export default Footer
