'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ChevronLeft, Menu, Search, Bell, X } from 'lucide-react' // X আইকন যোগ করা হয়েছে মোবাইল ক্লোজ করার জন্য
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

  // মোবাইল স্ক্রিন ডিটেকশন এবং অটো সাইডবার ক্লোজ
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setOpen(false)
      } else {
        setOpen(true)
      }
    }
    handleResize() // ইনিশিয়াল চেক
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
          backgroundImage: mounted ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23334155' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H2V1z'%3E%3C/path%3E%3C/svg%3E")` : "none",
        }
      : {
          backgroundColor: '#FFFFFF',
        }

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredLinks = DashboardLink.filter((item) => item.role.includes(role))

  return (
    <div className="flex h-screen text-slate-900 font-sans overflow-hidden">
      {/* মোবাইল ওভারলে: সাইডবার ওপেন থাকলে স্ক্রিন হালকা কালো হবে */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* --- Aside (Sidebar) --- */}
      <aside
        style={bgStyle}
        className={`fixed inset-y-0 left-0 border-r border-slate-200 z-50 transition-all duration-300 ease-in-out shadow-sm
        ${open ? 'w-[200px] translate-x-0' : 'w-[70px] lg:translate-x-0 -translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center h-12 px-4 border-b border-slate-100 justify-between">
          {open && (
            <div className="p-3">
              <Link
                href="/"
                className={`flex items-center rounded-xl hover:bg-slate-100 transition-all group ${!open && 'justify-center'}`}
              >
                <Home className="text-slate-400 group-hover:text-blue-600" size={12} />
                <span className="ml-1 text-xs text-slate-600">Back to Site</span>
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
        <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto">
          {filteredLinks.map((item, index) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={index}
                href={item.path}
                onClick={() => window.innerWidth < 1024 && setOpen(false)} // মোবাইলে লিংকে ক্লিক করলে মেনু বন্ধ হবে
                className={`flex items-center p-2 text-xs rounded-lg transition-all group relative
                  ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}
                  ${!open && 'justify-center'}`}
              >
                <div className={`${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}>
                  {item.icon}
                </div>

                {open && <span className="ml-3 font-semibold text-[14px]">{item.name}</span>}

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
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out
        ${open ? 'lg:ml-[200px]' : 'lg:ml-[70px] ml-0'}`}
      >
        {/* Top Navbar */}
        <header
          style={bgStyle}
          className="h-12 p-4 border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-40"
        >
          <div className="flex items-center gap-2">
            {/* মোবাইল মেনু বাটন: সাইডবার ক্লোজ থাকলে এখানে দেখাবে */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-sm lg:text-lg font-bold text-slate-500 truncate">
              Dashboard Overview
            </h2>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none ml-2 text-sm w-32 lg:w-48"
              />
            </div>
            <DarkMode />
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-8 lg:h-9 lg:w-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold border border-indigo-200 overflow-hidden flex-shrink-0">
              {session?.user?.image ? (
                <Image src={session.user.image} alt="profile" width={36} height={36} className="object-cover" />
              ) : (
                <span className="text-xs uppercase">{session?.user?.name?.charAt(0) || 'U'}</span>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div style={bgStyle} className="min-h-full p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard