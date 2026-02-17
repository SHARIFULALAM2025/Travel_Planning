'use client'
import React from 'react'
import { navItems } from './NavData'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className=" flex justify-between items-center px-6 py-2">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <figure className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500">
              <Image
                src="/profile.png"
                width={40}
                height={40}
                alt="profile"
                className="object-cover"
              />
            </figure>
            <span className="font-semibold text-gray-800 hidden sm:block">
              TravelPlanning
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center gap-2 text-gray-600 font-medium
                         hover:text-blue-600 transition-all duration-300
                         relative after:absolute after:-bottom-1 after:left-0
                         after:w-0 after:h-[2px] after:bg-blue-600
                         hover:after:w-full after:transition-all"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden md:block">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Right Side  */}
        <div className="hidden lg:block">
          <Link
            href="/signup"
            className="px-5 py-3  bg-blue-600 text-white  font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
