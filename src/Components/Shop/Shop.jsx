'use client'
import React, { useEffect, useState } from 'react'
import Container from '../Container/Container'
import { FaArrowRight, FaStar, FaCartPlus, FaHeart } from 'react-icons/fa'
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { IoEye } from 'react-icons/io5'
import Link from 'next/link'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useTheme } from 'next-themes'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

const Shop = () => {
  const { theme } = useTheme()
  const {data:session}=useSession()
  const [currentPage, setCurrentPage] = useState(1)
  const [mounted, setMounted] = useState(false)
  const itemsPerPage = 6
  const locale = useLocale()
   const queryClient = useQueryClient()
  const { data: product = [] } = useQuery({
    queryKey: ['All Product', locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/productAll`
      )
      return res.data
    },
  })
  useEffect(() => {
    setMounted(true)
  }, [])

  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const currentProducts = product.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(product.length / itemsPerPage)
  // cart

  const { mutate } = useMutation({
    mutationFn: async (cartInfo) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/cart-data`,
        cartInfo
      )
      return res.data
    },
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['AllCard', locale] })
      toast.success('Product added to cart')
    },
    onError: () => {
      toast.error('Failed to add product')
    },
  })


  const handelCart = (id) => {
    const selectedProduct = product.find((item) => item._id === id)

    const cartData = {
      productId: selectedProduct._id,
      title: selectedProduct.title,
      price: selectedProduct.price,
      image: selectedProduct.image[0],
      email:session?.user?.email
    }
    


    mutate(cartData)
  }
  // wishlist
   const {mutate: addToWishlist } = useMutation({
      mutationFn: async (cartInfo) => {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/wishlist`,
          cartInfo
        )
        return res.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['AllWishlist', locale] })
        toast.success('Product added to wishlist')
      },
      onError: () => {
        toast.error('Failed to add wishlist')
      },
    })
  const handelWishlist = (id) => {
      const currentProduct=product.find(item=>item._id===id)
      const cartData = {
        productId: currentProduct._id,
        title: currentProduct.title,
        price: currentProduct.price,
        image: currentProduct.image[0],
        email: session?.user?.email,
      }
      addToWishlist(cartData)
    }
  //
  if (!mounted) {
    return null
  }
  return (
    <Container>
      <section
        className={`${theme === 'dark' ? 'bg-slate-900 text-white' : 'text-slate-900 bg-white'} grid gap-6 grid-cols-1 lg:grid-cols-12 py-6`}
      >
        <aside
          className={`${theme === 'dark' ? 'bg-slate-900 text-white' : 'text-slate-900 bg-white'} col-span-1 lg:col-span-3`}
        >
          <div className="lg:sticky lg:top-24 space-y-8">
            <div className="relative">
              <h4
                className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
              >
                Search
              </h4>
              <div className="relative group">
                <input
                  type="search"
                  placeholder="Search product..."
                  className={`w-full ${theme === 'dark' ? 'bg-slate-800 text-white border-slate-700' : 'text-slate-900 bg-white border-gray-300'} border rounded-xl py-3 pl-4 pr-12 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm`}
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4
                className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
              >
                Categories
              </h4>
              <ul className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                {' '}
                {/* Mobile এ ২ কলামে দেখাবে */}
                {['Adventure', 'Travel Tips', 'Hidden Gems', 'Local Food'].map(
                  (cat) => (
                    <li key={cat}>
                      <button className="flex items-center justify-between w-full text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                        <span
                          className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} text-sm font-medium`}
                        >
                          {cat}
                        </span>
                        <span
                          className={`${theme === 'dark' ? 'text-slate-800 bg-slate-100' : 'text-slate-800 bg-gray-200'} text-[10px] px-2 py-1 rounded-full`}
                        >
                          12
                        </span>
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Listing */}
        <div className="col-span-1 lg:col-span-9">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {currentProducts?.map((item, index) => (
              <div
                key={index}
                className={`p-5 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'} rounded-xl relative group overflow-hidden shadow-sm`}
              >
                <div className="h-40 w-full relative">
                  <Image
                    src={item?.image[0]}
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

                <div className="absolute flex flex-col gap-2 top-3 right-3 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-x-5 lg:group-hover:translate-x-0 transition-all duration-300">
                  <button
                    onClick={()=>handelWishlist(item._id)}
                    className="p-3 bg-white/80 dark:bg-slate-700 text-black dark:text-white shadow-md rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <FaHeart size={14} />
                  </button>
                  <button
                    onClick={() => handelCart(item._id)}
                    className="p-3 bg-white/80 dark:bg-slate-700 text-black dark:text-white shadow-md rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <FaCartPlus size={14} />
                  </button>
                  <Link
                    href={`/shop/${item._id}`}
                    className="p-3 bg-white/80 dark:bg-slate-700 text-black dark:text-white shadow-md rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <IoEye size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination - সব ডিভাইসে সেন্টারে থাকবে */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-2 pb-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-md border ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white transition-all border-gray-300 dark:border-gray-700 text-gray-500'}`}
            >
              <HiChevronLeft size={20} />
            </button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md border text-sm transition-all ${
                    currentPage === i + 1
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md border ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white transition-all border-gray-300 dark:border-gray-700 text-gray-500'}`}
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default Shop
