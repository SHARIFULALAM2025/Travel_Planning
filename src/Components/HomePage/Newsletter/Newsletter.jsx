'use client'
import { Send } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react' 

const SpecialPromotions = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)


  useEffect(() => {
    setMounted(true)
  }, [])


  if (!mounted) {
    return null
  }

  return (
    <section
      className={`py-12 px-4 md:px-8 lg:px-12 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Discover Special Deals Card */}
        <div className="relative h-[350px] md:h-[400px] rounded-xl overflow-hidden group">
          <Image
            src="https://i.ibb.co.com/C34MfmKh/felix-rostig-Um-V2wr-Vbq8-unsplash.jpg"
            alt="Special Deals"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 md:px-12">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
              Discover Special Deals!
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-sm leading-relaxed">
              Make sure to check out these special promotions
            </p>
            <button className="w-fit px-8 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg active:scale-95">
              See Tours
            </button>
          </div>
        </div>

        {/* Right Side: Newsletter Subscription Card */}
        <div
          className={`flex flex-col justify-center px-8 md:px-16 py-12 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100 shadow-sm'}`}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
          >
            Don’t miss a thing
          </h2>

          <div
            className={`space-y-1 mb-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-50'}`}
          >
            <p className="text-lg">
              Get update to special deals and exclusive offers.
            </p>
            <p className="text-lg">Sign up to our newsletter!</p>
          </div>

          <form className="relative flex items-center w-full max-w-lg">
            <div
              className={`flex items-center w-full rounded-full overflow-hidden border p-1.5 transition-all ${theme === 'dark' ? 'bg-slate-900 border-slate-600 focus-within:border-blue-500' : 'bg-white border-gray-200 focus-within:border-blue-400 shadow-sm'}`}
            >
              <div className="pl-4 text-gray-400">
                <Send size={20} />
              </div>
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full bg-transparent px-4 py-2 outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase transition-all hidden md:block"
              >
                Subscribe
              </button>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-bold text-sm tracking-wider uppercase transition-all md:hidden"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SpecialPromotions
