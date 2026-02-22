'use client'
import React from 'react'
import { navItems } from './NavData'
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: session, status } = useSession()
  const handelSignOut = () => {
    signOut({callbackUrl:"/signup"})

  }


  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <figure className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500">
            <Image
              src="/profile.png"
              width={40}
              height={40}
              alt="profile"
              className="object-cover"
            />
          </figure>
          <span className="font-bold text-blue-600 text-lg hidden sm:block">
            TravelMate
          </span>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="relative flex items-center gap-2 text-gray-600 font-medium text-base
                         hover:text-blue-600 transition-colors duration-300
                         after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px]
                         after:bg-blue-600 after:transition-all hover:after:w-full"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden md:block">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Sign Up Button */}
        {session?.user ? (
          <button
            onClick={handelSignOut}
            className="hidden lg:inline-block px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-300"
          >
            LogOut
          </button>
        ) : (
          <Link
            href="/signup"
            className="hidden lg:inline-block px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-300"
          >
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
