'use client'
import React from 'react'
import { navItems } from './NavData'
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const handelSignOut = () => {
    signOut({ callbackUrl: "/signup" })
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <figure className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <Image
              src="/profile.png"
              width={40}
              height={40}
              alt="profile"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </figure>
          <span className="font-semibold text-xl text-gray-900 tracking-tight">
            TravelMate
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path

            return (
              <Link
                key={index}
                href={item.path}
                className={`relative text-[15px] font-medium transition-colors duration-300
                ${isActive 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'}`}
              >
                {item.name}

                {/* Professional underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-blue-600 transition-all duration-300
                  ${isActive ? 'w-full' : 'w-0 hover:w-full'}`}
                />
              </Link>
            )
          })}
        </div>

        {/* Auth Button */}
        <div className="hidden lg:block">
          {session?.user ? (
            <button
              onClick={handelSignOut}
              className="px-4 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-all duration-300"
            >
              Log Out
            </button>
          ) : (
            <Link
              href="/signup"
              className="relative px-5 py-2 text-sm font-semibold text-white rounded-md 
              bg-gradient-to-r from-blue-600 to-indigo-600 
              hover:from-blue-700 hover:to-indigo-700 
              shadow-md hover:shadow-lg 
              transition-all duration-300"
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