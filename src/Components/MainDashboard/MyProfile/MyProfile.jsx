'use client'
import React from 'react'

import BusinessIcon from '@mui/icons-material/Business'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import MapIcon from '@mui/icons-material/Map'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import PublicIcon from '@mui/icons-material/Public'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const MyProfile = () => {
  const { data: session } = useSession()
  return (
    <div className="min-h-screen bg-[#f4f7f6] p-6 lg:p-12 font-sans text-[#444]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: EDIT FORM */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="px-8 py-6 bg-white border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
          </div>

          <div className="p-8 space-y-8">
            {/* Header Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Company (Disabled)
                </label>
                <div className="relative">
                  <BusinessIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 !text-[18px]" />
                  <input
                    disabled
                    value="Creative Code Inc."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-gray-400 cursor-not-allowed outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="michael23"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-[#1dc7ea] outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Email Address
                </label>
                <div className="relative">
                  <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 !text-[18px]" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:border-[#1dc7ea] outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Names Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Mike"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-[#1dc7ea] outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Andrew"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-[#1dc7ea] outline-none"
                />
              </div>
            </div>

            {/* Address Row */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Address
              </label>
              <div className="relative">
                <MapIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 !text-[18px]" />
                <input
                  type="text"
                  placeholder="Home Address"
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:border-[#1dc7ea] outline-none"
                />
              </div>
            </div>

            {/* Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-[#1dc7ea] outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-[#1dc7ea] outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="ZIP Code"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-[#1dc7ea] outline-none"
                />
              </div>
            </div>

            {/* Bio Row */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                About Me
              </label>
              <textarea
                rows={5}
                placeholder="Here can be your description"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-[#1dc7ea] outline-none resize-none"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button className="bg-[#1dc7ea] hover:bg-[#18b1d1] text-white font-bold py-2.5 px-10 rounded-lg shadow-md transition-all active:scale-95">
                UPDATE PROFILE
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW CARD */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden text-center sticky top-10">
            {/* Cover and Avatar */}
            <div className="h-28 bg-gradient-to-br from-slate-800 to-slate-900 relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
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
                   
                    <span>{session?.user?.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-16 pb-10 px-6">
              <h3 className="text-lg font-bold text-gray-800">Mike Andrew</h3>
              <p className="text-sm text-gray-400 mb-6 font-medium tracking-tight">
                michael24
              </p>

              <div className="px-4 text-sm text-gray-500 leading-relaxed mb-8 italic">
                Lamborghini Mercy, Your chick she so thirsty, I m in that two
                seat Lambo.
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-6 pt-6 border-t border-gray-50 text-gray-300">
                <FacebookIcon className="cursor-pointer hover:text-[#1dc7ea] transition-colors !text-[20px]" />
                <TwitterIcon className="cursor-pointer hover:text-[#1dc7ea] transition-colors !text-[20px]" />
                <PublicIcon className="cursor-pointer hover:text-[#1dc7ea] transition-colors !text-[20px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
