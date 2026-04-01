"use client"
import { useTheme } from 'next-themes'
import React from 'react'

const MainDashboardPage = () => {
    const {theme}=useTheme()
     const bgStyle =
       theme === 'dark'
         ? {
             backgroundColor: '#0F172A',
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23334155' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H2V1z'%3E%3C/path%3E%3C/svg%3E")`,
           }
         : {
             backgroundColor: '#FFFFFF',
           }
    return <div style={bgStyle} className='min-h-screen '>
      <h1 className="text-white">shariful</h1>
  </div>
}

export default MainDashboardPage
