'use client'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'

import PublicIcon from '@mui/icons-material/Public'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { CiEdit } from 'react-icons/ci'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FaXTwitter } from 'react-icons/fa6'
import Link from 'next/link'
import { useTheme } from 'next-themes'

const MyProfile = () => {
  const { data: session, status } = useSession()
const {theme}=useTheme()
  const { data: User = {}, isLoading } = useQuery({
    queryKey: ['user', session?.user?.email],
    enabled: !!session?.user?.email, // Only fetch when email is available
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/users/profile/${session.user?.email}`
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
         backgroundColor: '#FFFFFF',
       }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div
      style={bgStyle}
      className="min-h-screen  md:p-3 font-sans text-[#444]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: INFO SECTIONS */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 bg-white border-b border-gray-900 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
            <Link
              href={`/editUser`}
              aria-label="Edit Profile"
              className="p-2.5 bg-slate-900 text-white rounded-full transition-all duration-300 hover:bg-amber-400 hover:text-slate-900 hover:rotate-12 active:scale-95"
            >
              <CiEdit size={22} />
            </Link>
          </div>

          <div className="p-8">
            {/* BASIC INFORMATION */}
            <section className="mb-10">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Basic Information
              </h2>

              <div className="flex items-center gap-6 mb-8">
                <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-gray-200">
                  {User?.image ? (
                    <Image
                      src={User.image}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs text-center p-2">
                      No Image
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-3">
                    Recommended image size is 40px x 40px
                  </p>
                  <div className="flex gap-3">
                    <button className="px-5 py-2 bg-[#e6533c] text-white rounded-md text-sm font-medium hover:bg-[#d4432d] transition-colors">
                      Upload
                    </button>
                    <button className="px-5 py-2 bg-slate-100 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-200 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">
                    First Name
                  </label>
                  <p className="text-gray-500">
                    {User?.firstName || 'Jeffrey'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">
                    Last Name
                  </label>
                  <p className="text-gray-500">{User?.lastName || 'Wilson'}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">
                    Email
                  </label>
                  <p className="text-gray-500">
                    {User?.email || 'chrfo2356@example.com'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">
                    Phone
                  </label>
                  <p className="text-gray-500">
                    {User?.phone || '+1 12656 26654'}
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-gray-100 mb-10" />

            {/* ADDRESS INFORMATION */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Address Information
              </h2>
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  Address
                </label>
                <p className="text-gray-500">
                  {User?.address || '4530 Clousson Road, Houston'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">
                    Country
                  </label>
                  <p className="text-gray-500">
                    {User?.country || 'United States Of America'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">
                    State
                  </label>
                  <p className="text-gray-500">{User?.state || 'California'}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">
                    City
                  </label>
                  <p className="text-gray-500">
                    {User?.city || 'San Francisco'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">
                    Postal Code
                  </label>
                  <p className="text-gray-500">{User?.postalCode || '94105'}</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW CARD */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden text-center sticky top-10">
            <div
              className="h-28 relative bg-cover bg-center bg-no-repeat bg-indigo-500"
              style={{
                backgroundImage: `url('https://i.ibb.co.com/8Dh1KCnP/woliul-hasan-uc-Buijvbyyg-unsplash.jpg')`,
              }}
            >
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="h-24 w-24 bg-white p-1 rounded-full shadow-md">
                  <div className="h-full w-full bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold border border-indigo-200 overflow-hidden relative">
                    {User?.image ? (
                      <Image
                        src={User.image}
                        alt="profile"
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <span className="text-2xl uppercase">
                        {User?.name?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-16 pb-10 px-6">
              <h3 className="text-xl font-bold text-gray-800">
                {User?.name || 'User Name'}
              </h3>
              <p className="text-sm text-gray-900 mb-6 font-medium">
                Role: {User?.role || 'Member'}
              </p>
              <div className="px-4 text-sm text-gray-900 leading-relaxed mb-8 italic">
                Passionate Full-Stack Developer dedicated to building scalable
                web applications and seamless user experiences. Always learning,
                always coding.
              </div>
              <div className="flex justify-center gap-6 pt-6 border-t border-gray-900 text-gray-300">
                <FacebookIcon className="cursor-pointer text-black hover:text-[#1dc7ea] transition-colors !text-[20px]" />
                <FaXTwitter className="cursor-pointer text-black hover:text-[#1dc7ea] transition-colors !text-[20px]" />
                <PublicIcon className="cursor-pointer text-black hover:text-[#1dc7ea] transition-colors !text-[20px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
