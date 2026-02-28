'use client'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { MdWbSunny, MdNightsStay } from 'react-icons/md'

const DarkMode = () => {
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null
  const isDark = theme === 'dark'
  const handleDarkMode = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <div className="flex items-center justify-center ">
      <div
        onClick={handleDarkMode}
        className={`relative flex items-center w-20 h-10 p-1 rounded-full cursor-pointer shadow-inner transition-colors duration-300 ${
          isDark ? 'bg-slate-700' : 'bg-gray-200'
        }`}
      >
        <div className="z-10 flex items-center justify-center w-1/2 h-full">
          <MdWbSunny
            className={`text-xl transition-all ${isDark ? 'text-gray-400' : 'text-amber-500'}`}
          />
        </div>

        <div className="z-10 flex items-center justify-center w-1/2 h-full">
          <MdNightsStay
            className={`text-xl transition-all ${isDark ? 'text-sky-400' : 'text-gray-400'}`}
          />
        </div>

        <div
          className={`absolute w-8 h-8 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out transform ${
            isDark ? 'translate-x-10' : 'translate-x-0'
          }`}
        ></div>
      </div>
    </div>
  )
}

export default DarkMode
