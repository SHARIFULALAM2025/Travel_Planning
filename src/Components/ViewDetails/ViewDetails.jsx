'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import React, { use, useState, useEffect } from 'react'
import { FaStar, FaCartPlus, FaHeart, FaFacebook } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoLogoYoutube } from 'react-icons/io5'

const ViewDetails = ({ params }) => {
  const resolvedParams = use(params)
  const id = resolvedParams.id
  const locale = useLocale()

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['products', locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/productAll`
      )
      return res.data
    },
  })

  // Find the specific product from the array
  const currentProduct = allProducts.find((item) => item._id === id)

  const [mainImage, setMainImage] = useState('')

  // Update main image when currentProduct is found
  useEffect(() => {
    if (currentProduct?.image?.length > 0) {
      setMainImage(currentProduct.image[0])
    }
  }, [currentProduct])

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )

  if (!currentProduct)
    return (
      <div className="p-20 text-center text-gray-500 font-medium">
        Product not found.
      </div>
    )

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 antialiased">
      {/* LEFT: Image Gallery */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center">
          {mainImage && (
            <Image
              src={mainImage}
              fill
              alt="Main product view"
              className="object-contain p-4 hover:scale-105 transition-transform duration-500"
              priority
            />
          )}
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {currentProduct.image?.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                mainImage === img
                  ? 'border-blue-600 shadow-md'
                  : 'border-transparent hover:border-gray-200 bg-gray-50'
              }`}
            >
              <Image
                src={img}
                fill
                alt={`Thumbnail ${idx}`}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Product Info */}
      <div className="flex flex-col space-y-6 py-2">
        <header className="space-y-2">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            {currentProduct.title?.[locale]}
          </h1>

          <div className="flex items-center gap-4">
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={16} />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-400">
              ({currentProduct.review?.[locale] || 0} Reviews)
            </span>
          </div>
        </header>

        <div className="text-3xl font-bold text-blue-600">
          ${currentProduct.price?.[locale]}
        </div>

        <div className="prose prose-sm text-gray-600 border-l-4 border-blue-50 pl-4 py-1">
          <p>{currentProduct.des?.[locale]}</p>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Quantity
          </label>
          <input
            type="number"
            defaultValue={1}
            min={1}
            className="w-20 px-3 py-2  border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500  outline-none transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button className="flex-[2] flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-100">
            <FaCartPlus size={18} />
            ADD TO CART
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 p-4 border border-gray-200 text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all">
            <FaHeart size={18} />
            <span className="sm:hidden lg:inline">WISHLIST</span>
          </button>
        </div>

        <hr className="border-gray-100 !my-8" />

        <div className="flex items-center gap-6">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Share with friends:
          </span>
          <div className="flex gap-5 text-gray-400">
            <FaFacebook
              className="cursor-pointer hover:text-[#1877F2] transition-colors"
              size={22}
            />
            <FaXTwitter
              className="cursor-pointer hover:text-black transition-colors"
              size={22}
            />
            <IoLogoYoutube
              className="cursor-pointer hover:text-[#FF0000] transition-colors"
              size={22}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDetails
