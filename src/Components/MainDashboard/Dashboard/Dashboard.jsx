'use client'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ChevronLeft, Menu, Search, Bell, LogOut } from 'lucide-react'
import { DashboardLink } from '../DashboardPath'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import DarkMode from '@/Components/DarkMode/DarkMode'

const Dashboard = ({ children }) => {
  const { theme } = useTheme()
  const { data: session } = useSession()
  const [open, setOpen] = useState(true)
  const pathname = usePathname()
   const [mounted, setMounted] = useState(false)
  const { data: role } = useQuery({
    queryKey: ['role'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/users/role/${session.user?.email}`
      )
      return data.role
    },
  })

  const bgStyle =
    theme === 'dark'
      ? {
          backgroundColor: mounted ? '#0F172A' : '#FFFFFF',
          backgroundImage: mounted ?`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23334155' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H2V1z'%3E%3C/path%3E%3C/svg%3E")`:"none",
        }
      : {
          backgroundColor: '#FFFFFF',
        }


  useEffect(() => {
    setMounted(true)
  }, [])
  const filteredLinks = DashboardLink.filter((item) => item.role.includes(role))

  return (
    <div className="flex h-screen  text-slate-900 font-sans">
      <aside
        style={bgStyle}
        className={`fixed inset-y-0 left-0 border-r border-slate-200 z-50 transition-all duration-300 ease-in-out shadow-sm
        ${open ? 'w-[200px]' : 'w-[70px]'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center h-12 px-4 border-b border-slate-100 justify-between">
          {open && (
            <div className="p-3">
              <Link
                href="/"
                className={`flex items-center rounded-xl hover:bg-slate-100 transition-all group ${!open && 'justify-center'}`}
              >
                <Home
                  className="text-slate-400  group-hover:text-blue-600"
                  size={12}
                />
                {open && (
                  <span className=" ml-1 text-xs text-slate-600">
                    Back to Site
                  </span>
                )}
              </Link>
            </div>
          )}
          <button
            onClick={() => setOpen(!open)}
            className={`p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-all ${!open && 'mx-auto'}`}
          >
            {open ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-1 ">
          {filteredLinks.map((item, index) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={index}
                href={item.path}
                className={`flex items-center p-0.5 text-xs rounded-sm transition-all group relative
                  ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}
                  ${!open && 'justify-center'}`}
              >
                <div
                  className={`${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}
                >
                  {item.icon}
                </div>

                {open && (
                  <span className="ml-3 font-semibold text-[15px]">
                    {item.name}
                  </span>
                )}

                {/* Tooltip for Collapsed View */}
                {!open && (
                  <div className="absolute left-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out
        ${open ? 'ml-[200px]' : 'ml-[70px]'}`}
      >
        {/* Top Navbar */}
        <header
          style={bgStyle}
          className="h-12 p-4 border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40"
        >
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-100">
              Dashboard Overview
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search data..."
                className="bg-transparent border-none outline-none ml-2 text-sm w-48"
              />
            </div>
            <DarkMode />
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-9 w-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold border border-indigo-200 overflow-hidden">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="profile image"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                /* Fallback: Material Icon or Initial */
                <span className="text-sm uppercase">
                  {session?.user?.name?.charAt(0) || 'U'}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="">
          <div style={bgStyle} className="">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
