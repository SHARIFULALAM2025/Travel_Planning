'use client'
import React, { useState, useEffect } from 'react'
import { navItems } from './NavData'
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handelSignOut = () => {
    signOut({ callbackUrl: "/signup" })
  }

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 m-5 transition-all duration-300 rounded-2xl
      ${scrolled 
        ? 'bg-black/30 backdrop-blur-sm shadow-2xl ' 
        : 'bg-black/20 backdrop-blur-sm shadow-lg '
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <figure className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 shadow-md backdrop-blur-sm">
            <Image
              src="/profile.png"
              width={40}
              height={40}
              alt="TravelMate"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </figure>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
            TravelMate
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={index}
                href={item.path}
                className={`
                  relative font-semibold transition-all duration-300 px-2 py-1
                  ${isActive 
                    ? 'text-blue-600 ' 
                    : 'text-gray-300 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg'
                  }
                `}
              >
                {item.name}
                {/* Enhanced underline */}
                <span
                  className={`
                    absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 
                    transition-all duration-300 rounded-full
                    ${isActive ? 'w-4 scale-100' : 'w-0 hover:w-4 scale-0 hover:scale-100'}
                  `}
                />
              </Link>
            )
          })}
        </div>

        {/* Auth Button */}
        <div className="hidden lg:flex">
          {session?.user ? (
            <button
              onClick={handelSignOut}
              className="px-6 py-2.5 text-sm font-semibold text-gray-800 bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl rounded-xl transition-all duration-300"
            >
              Log Out
            </button>
          ) : (
            <Link
              href="/signup"
              className="relative px-6 py-2.5 text-sm font-bold text-white rounded-xl 
              bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 
              hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 
              shadow-2xl hover:shadow-3xl backdrop-blur-sm border border-white/30
              transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
