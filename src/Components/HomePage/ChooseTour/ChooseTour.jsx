'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'

import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'
import { FaCartPlus, FaHeart, FaStar } from 'react-icons/fa'
import { IoEye } from 'react-icons/io5'

const ChooseTour = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
const {data:session}=useSession()
  const itemsPerPage = 4
  const locale = useLocale()
const router=useRouter()
  const { data: product = [] } = useQuery({
    queryKey: ['All Product', locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/productAll`
      )
      return res.data
    },
  })

  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const currentProducts = product.slice(firstIndex, lastIndex)


  const handelWishlist = (id) => console.log('Added to wishlist', id)
  const handelCart = (id) => console.log('Added to cart', id)
const handleProtectedAction = (actionType, id) => {
  if (!session) {

    router.push('/signup')
    return
  }


  if (actionType === 'wishlist') console.log('Added to wishlist', id)
  if (actionType === 'cart') console.log('Added to cart', id)
}
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section
      className={`py-3 ${theme == 'dark' ? 'bg-slate-900' : 'bg-white'}`}
    >
      <div className="text-center mb-12 px-4">
        <h2
          className={`text-3xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
        >
          Gear Up for Your <span className="text-blue-600">Next Adventure</span>
        </h2>
        <p
          className={`max-w-2xl mx-auto text-sm md:text-base opacity-80 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}
        >
          Don’t just travel, travel right. Explore our curated collection of
          premium travel essentials designed for the modern explorer.
        </p>
      </div>
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Responsive Grid:
            Mobile: 1, Tablet: 2, Laptop: 3, Desktop(XL): 4
        */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentProducts?.map((item, index) => (
            <div
              key={index}
              className={`p-5 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'} rounded-xl relative group overflow-hidden shadow-sm transition-all duration-300`}
            >
              <div className="h-40 w-full relative">
                <Image
                  src={item?.image?.[0]}
                  fill
                  alt="product"
                  className="rounded-xl object-contain mx-auto"
                />
              </div>

              <h1
                className={`mt-3 font-semibold line-clamp-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
              >
                {item?.title?.[locale]}
              </h1>

              <div className="flex items-center gap-2 my-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={14} />
                  ))}
                </div>
                <span
                  className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'} text-xs opacity-70`}
                >
                  {item?.review?.[locale]}
                </span>
              </div>

              <h2 className="font-bold text-blue-600">
                ${item?.price?.[locale]}
              </h2>

              {/* Action Buttons */}
              <div className="absolute flex flex-col gap-2 top-3 right-3 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-x-5 lg:group-hover:translate-x-0 transition-all duration-300">
                <button
                  onClick={() => handleProtectedAction('wishlist', item._id)}
                  className="p-3 bg-white/80 dark:bg-slate-700 text-black dark:text-white shadow-md rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <FaHeart size={14} />
                </button>
                <button
                  onClick={() => handleProtectedAction('cart', item._id)}
                  className="p-3 bg-white/80 dark:bg-slate-700 text-black dark:text-white shadow-md rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <FaCartPlus size={14} />
                </button>
                <Link
                  href={session ? `/shop/${item._id}` : '/signup'}
                  className="p-3 bg-white/80 dark:bg-slate-700 text-black dark:text-white shadow-md rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <IoEye size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ChooseTour
