'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
} from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'

const Footer = () => {
  const [mounted, setMounted] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    setMounted(true)
  }, [])

  const contactItems = [
    {
      icon: FaEnvelope,
      href: 'mailto:support@travelmate.com',
      text: 'support@travelmate.com',
      isLink: true,
    },
    {
      icon: FaPhoneAlt,
      href: 'tel:+1234567890',
      text: '+1 (234) 567-890',
      isLink: true,
    },
    {
      icon: IoLocationSharp,
      text: '123 Travel Street, Adventure City',
      isLink: false,
    },
  ]

  const socialLinks = [
    { icon: FaFacebookF, href: '#', color: 'hover:bg-blue-600' },
    { icon: FaInstagram, href: '#', color: 'hover:bg-pink-600' },
    { icon: FaTwitter, href: '#', color: 'hover:bg-sky-500' },
    { icon: FaYoutube, href: '#', color: 'hover:bg-red-600' },
  ]

  if (!mounted) return null

  return (
    <footer className="w-full border-t bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* BRAND SECTION */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-blue-600 p-1">
                <Image
                  src="/planet.png"
                  alt="TravelMate Logo"
                  fill
                  className="object-contain p-1 invert brightness-0"
                />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Travel<span className="text-blue-600">Mate</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Discover destinations, plan smarter journeys, and explore the
              world with confidence. Your trusted companion for meaningful
              travel and unforgettable memories.
            </p>
          </div>

          {/* CONTACT SECTION */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              {contactItems.map((item, i) => {
                const Icon = item.icon
                const content = (
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-400">
                      <Icon size={16} />
                    </div>
                    <span className="text-sm text-slate-600 transition-colors group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400">
                      {item.text}
                    </span>
                  </div>
                )

                return (
                  <li key={i}>
                    {item.isLink ? <a href={item.href}>{content}</a> : content}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* SOCIAL SECTION */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Follow Our Journey
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Join our community for travel tips and exclusive deals.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <a
                    key={i}
                    href={social.href}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:text-white hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 ${social.color}`}
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800"></div>

        {/* BOTTOM BAR */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {currentYear} TravelMate. Designed for the modern explorer.
          </p>
          <div className="flex items-center gap-8 text-xs font-medium text-slate-600 dark:text-slate-400">
            <Link href="#" className="transition hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link href="#" className="transition hover:text-blue-600">
              Terms of Service
            </Link>
            <Link href="#" className="transition hover:text-blue-600">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
