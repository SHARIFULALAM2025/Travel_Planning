'use client'
import { Mail } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const Newsletter = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <section
      className={`py-20 ${theme == 'dark' ? 'bg-slate-900' : 'bg-white'}`}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Join Our Newsletter
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Subscribe to receive our best travel deals, last-minute offers, and
          exclusive recommendations directly in your inbox.
        </p>

        {/* Input & Button */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto flex-1 px-5 py-3 rounded-xl border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700
              text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Mail size={18} />
            Subscribe
          </button>
        </div>

        {/* Optional Note */}
        <p className="mt-4 text-gray-400 text-sm">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}

export default Newsletter
