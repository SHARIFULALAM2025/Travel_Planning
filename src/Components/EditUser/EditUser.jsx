'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { integrationItems, notificationItems, securityItems } from './EditData'

const EditUser = () => {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState(0)

  const tabs = ['Profile Setting', 'Security', 'Notification', 'Integrations']

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* TAB NAVIGATION */}
      <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar gap-6 sm:gap-8 mb-6 sm:mb-8 px-2 sm:px-0">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-4 text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all relative whitespace-nowrap outline-none ${
              activeTab === index
                ? 'text-slate-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT AREA */}
      <div className="min-h-[300px] leading-relaxed transition-all duration-500">
        {/* TAB 0: PROFILE SETTINGS */}
        {activeTab === 0 && (
          <div className="w-full bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-sm border border-gray-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="mb-8 sm:mb-10">
              <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-6">
                Basic Information
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                <div className="h-20 w-20 rounded-lg overflow-hidden bg-slate-100 border border-gray-200 shrink-0">
                  {session?.user?.image && (
                    <Image
                      src={session?.user?.image}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="w-full sm:w-auto">
                  <p className="text-xs sm:text-sm text-gray-500 mb-4 font-medium max-w-xs">
                    Recommended dimensions are typically 400 x 400 pixels.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex-1 sm:flex-none px-6 py-2.5 bg-[#e6533c] text-white rounded-lg text-sm font-semibold hover:bg-[#d4432d] transition-colors active:scale-95">
                      Upload
                    </button>
                    <button className="flex-1 sm:flex-none px-6 py-2.5 bg-[#e9f1f6] text-[#4b6584] rounded-lg text-sm font-semibold hover:bg-[#dfeaf0] transition-colors active:scale-95">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {[
                  { label: 'First Name', type: 'text', placeholder: 'Jeffrey' },
                  { label: 'Last Name', type: 'text', placeholder: 'Wilson' },
                  {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@mail.com',
                  },
                  {
                    label: 'Phone',
                    type: 'text',
                    placeholder: '+1 234 567 890',
                  },
                ].map((field, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-700">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all text-gray-600 text-sm"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-6">
                Address Information
              </h2>
              <div className="space-y-1.5 mb-6">
                <label className="text-xs sm:text-sm font-bold text-slate-700">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Street address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all text-gray-600 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">
                    Country
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-100 focus:border-blue-400 outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">
                    State
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-100 focus:border-blue-400 outline-none transition-all text-gray-500 bg-white cursor-pointer appearance-none text-sm">
                      <option>Select</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 border-l pl-2">
                      ▼
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">
                    City
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-100 focus:border-blue-400 outline-none transition-all text-gray-500 bg-white cursor-pointer appearance-none text-sm">
                      <option>Select</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 border-l pl-2">
                      ▼
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-100 focus:border-blue-400 outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-10">
              <button className="w-full sm:w-auto px-10 py-3 bg-[#e9f1f6] text-[#4b6584] rounded-full text-sm font-bold hover:bg-[#dfeaf0] transition-all">
                Cancel
              </button>
              <button className="w-full sm:w-auto px-10 py-3 bg-[#e6533c] text-white rounded-full text-sm font-bold hover:bg-[#d4432d] shadow-lg shadow-orange-100 transition-all active:scale-95">
                Save
              </button>
            </div>
          </div>
        )}

        {/* TAB 1: SECURITY */}
        {activeTab === 1 && (
          <div className="w-full bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-sm border border-gray-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
              {securityItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-50 last:border-0 lg:[&:nth-last-child(-n+2)]:border-0"
                >
                  <div className="mb-4 sm:mb-0 pr-4">
                    <h3 className="text-[15px] font-bold text-slate-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-medium leading-tight">
                      {item.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {item.type === 'toggle' && (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={item.enabled}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e6533c]"></div>
                      </label>
                    )}
                    {item.type === 'multi-button' && (
                      <button className="px-4 py-1.5 bg-[#e9f1f6] text-[#4b6584] rounded-md text-[13px] font-bold hover:bg-[#dfeaf0] transition-all">
                        {item.secondaryBtn}
                      </button>
                    )}
                    {item.type !== 'toggle' && (
                      <button className="px-5 py-1.5 text-white rounded-md text-[13px] font-bold bg-[#e6533c] hover:bg-[#d4432d] transition-all active:scale-95">
                        {item.btnText}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* TAB 2: NOTIFICATIONS */}
        {activeTab === 2 && (
          <div className="w-full bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-sm border border-gray-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
              {notificationItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col pb-6 border-b border-gray-50 last:border-0 lg:[&:nth-last-child(-n+2)]:border-0"
                >
                  {/* Header Row: Title and Toggles */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[15px] font-bold text-slate-800">
                      {item.title}
                    </h3>

                    <div className="flex gap-4 sm:gap-6">
                      {['Push', 'SMS', 'Email'].map((type) => (
                        <div
                          key={type}
                          className="flex flex-col items-center gap-2"
                        >
                          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">
                            {type}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked={item[type.toLowerCase()]}
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#e6533c]"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description Row */}
                  <div className="pr-20 sm:pr-32">
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* TAB 3: INTEGRATIONS */}
        {activeTab === 3 && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrationItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    {/* Service Icon Container */}
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-50">
                      {item.icon}
                    </div>

                    {/* Status Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={item.enabled}
                      />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#e6533c]"></div>
                    </label>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      
      </div>
    </div>
  )
}

export default EditUser
