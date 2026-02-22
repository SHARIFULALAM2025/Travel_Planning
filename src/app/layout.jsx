import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/Components/Header/Navbar'
import Footer from '@/Components/Footer/Footer'
import AuthProvider from '@/Provider/AuthProvider'
import { Toaster } from 'react-hot-toast'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'TravelMate',
  description: 'Your Ultimate Travel Companion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen`}
      >
        <AuthProvider>
          
          {/* Navbar Full Width */}
          <Navbar />

          {/* Main Content Full Width */}
          <main className="w-full min-h-screen">
            {children}
          </main>

          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 5000,
            }}
          />

          {/* Footer Full Width */}
          <Footer />

        </AuthProvider>
      </body>
    </html>
  )
}