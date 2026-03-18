'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ChevronLeft, Menu, Search, Bell, LogOut } from 'lucide-react'
import { DashboardLink } from '../DashboardPath'


const Dashboard = ({ children }) => {
  const [open, setOpen] = useState(true)
  const pathname = usePathname()


  const role = 'admin'


  const filteredLinks = DashboardLink.filter((item) => item.role.includes(role))

  return (
    <div className="flex h-screen bg-[#F3F4F6] text-slate-900 font-sans">
      <aside
        className={`fixed inset-y-0 left-0 bg-white border-r border-slate-200 z-50 transition-all duration-300 ease-in-out shadow-sm
        ${open ? 'w-[260px]' : 'w-[80px]'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center h-16 px-4 border-b border-slate-100 justify-between">
          {open && (
            <div className="p-3">
              <Link
                href="/"
                className={`flex items-center p-3 rounded-xl hover:bg-slate-100 transition-all group ${!open && 'justify-center'}`}
              >
                <Home
                  className="text-slate-400 group-hover:text-blue-600"
                  size={22}
                />
                {open && (
                  <span className="ml-3 font-medium text-slate-600">
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
                className={`flex items-center p-3 rounded-xl transition-all group relative
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
        ${open ? 'ml-[260px]' : 'ml-[80px]'}`}
      >
        {/* Top Navbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-700">
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
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-9 w-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold border border-indigo-200">
              S
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-6 md:p-10">
          <div className="animate-in fade-in duration-500">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
