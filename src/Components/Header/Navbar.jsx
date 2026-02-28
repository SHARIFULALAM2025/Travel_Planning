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

  const handleSignOut = () => {
    signOut({ callbackUrl: "/signup" })
  }

  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-xl  shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-10 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <figure className="w-10 h-10 rounded-full overflow-hidden  transition duration-300
                             group-hover:scale-105">
            <Image
              src="/planet.png"
              width={40}
              height={40}
              alt="logo"
              className="object-cover"
            />
          </figure>

          <span className="font-semibold text-xl tracking-tight text-gray-900">
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
                className={`relative text-[15px] font-medium tracking-wide transition duration-300
                ${isActive 
                  ? 'text-blue-700' 
                  : 'text-gray-600 hover:text-blue-700'
                }`}
              >
                {item.name}

                {/* underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300
                  ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            )
          })}
        </div>

        {/* Auth Button */}
        <div className="flex items-center gap-4">
          {session?.user ? (
            <button
              onClick={handleSignOut}
              className="px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium
                         shadow-sm hover:bg-blue-600 hover:shadow-md
                         transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium
                         shadow-sm hover:bg-blue-700 hover:shadow-md
                         transition duration-300"
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