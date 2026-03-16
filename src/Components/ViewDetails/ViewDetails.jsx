'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React, { use, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaStar, FaCartPlus, FaHeart, FaFacebook } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoLogoYoutube } from 'react-icons/io5'

const ViewDetails = ({ params }) => {
  const { theme } = useTheme()
  const queryClient = useQueryClient()
  const resolvedParams = use(params)
  const id = resolvedParams.id
  const locale = useLocale()
  const [star, setStar] = useState(0)
  const { data: session } = useSession()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      image: '',
    },
  })

  useEffect(() => {
    if (session?.user) {
      reset({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        image: session?.user?.image || '',
      })
    }
  }, [session, reset])

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (newReview) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/review`,
        newReview
      )
      return res.data
    },
    onSuccess: () => {
      toast.success('Your review has been submitted.', 'success')
      queryClient.invalidateQueries({ queryKey: ['reviews', id] })
      reset()
      setStar(0)
    },
    onError: (error) => {
      toast.error('Error!', error.message || 'Something went wrong', 'error')
    },
  })

  const handelReview = async (data) => {
    if (star === 0) {
      toast.error('Please select a star rating!')
      return
    }

    const finalData = {
      ...data,
      rating: star,
      productId: currentProduct._id,
      timestamp: new Date().toISOString(),
    }

    try {
      await mutateAsync(finalData)
    } catch (err) {
      console.error('Submission Error:', err)
    }
  }

  const [activeTab, setActiveTab] = useState(0)

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['products', locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/productAll`
      )
      return res.data
    },
  })

  const { data: review = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/allReview/${id}`
      )
      return res.data
    },
    enabled: !!id,
  })

  const currentProduct = allProducts.find((item) => item._id === id)
  const [mainImage, setMainImage] = useState('')

  // cart
  const { mutate } = useMutation({
    mutationFn: async (cartInfo) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/cart-data`,
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

  const handelCart = () => {
    const cartData = {
      productId: currentProduct._id,
      title: currentProduct.title,
      price: currentProduct.price,
      image: currentProduct.image[0],
      email: session?.user?.email,
    }

    mutate(cartData)
  }

  //
  //wishlist
  const { mutate: addToWishlist } = useMutation({
    mutationFn: async (cartInfo) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/wishlist`,
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
  const handelWishlist = () => {
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
      <div className="p-10 md:p-20 text-center text-gray-500 font-medium">
        Product not found.
      </div>
    )

  return (
    <section
      className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'text-slate-900 bg-white'}`}
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 antialiased">
        {/* LEFT: Image Gallery */}
        <div className="flex flex-col gap-4">
          <div
            className={`relative aspect-square rounded-2xl overflow-hidden border ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'} shadow-sm flex items-center justify-center`}
          >
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
                    : `border-transparent hover:border-gray-200 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`
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
        <div className="flex flex-col space-y-4 md:space-y-6 py-2">
          <header className="space-y-2">
            <h1
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl ${theme === 'dark' ? 'text-white' : 'text-black'} font-extrabold tracking-tight leading-tight`}
            >
              {currentProduct.title?.[locale]}
            </h1>

            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} className="sm:size-[16px]" />
                ))}
              </div>
              <span
                className={`text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              >
                ({currentProduct.review?.[locale] || 0} Reviews)
              </span>
            </div>
          </header>

          <div className="text-2xl md:text-3xl font-bold text-blue-600">
            ${currentProduct.price?.[locale]}
          </div>

          <div
            className={`prose prose-sm max-w-none ${theme === 'dark' ? 'text-white' : 'text-black'} border-l-4 border-blue-500 pl-4 py-1`}
          >
            <p className="line-clamp-4 md:line-clamp-none">
              {currentProduct.des?.[locale]}
            </p>
          </div>

          <div className="space-y-3">
            <label
              className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              Quantity:
            </label>
            <input
              type="number"
              defaultValue={1}
              min={1}
              className={`w-full sm:w-24 px-3 py-2 border rounded-lg outline-none transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handelCart}
              className="flex-[2] flex items-center justify-center gap-3 px-8 py-3 sm:py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg"
            >
              <FaCartPlus size={18} />
              ADD TO CART
            </button>
            <button
              onClick={handelWishlist}
              className={`flex-1 flex items-center justify-center gap-2 p-3 sm:p-4 border border-gray-200 ${theme === 'dark' ? 'text-white hover:bg-slate-800' : 'text-black hover:bg-red-50 hover:text-red-500'} rounded-xl transition-all`}
            >
              <FaHeart size={18} />
              <span className="inline sm:hidden lg:inline">WISHLIST</span>
            </button>
          </div>

          <hr
            className={`!my-6 md:!my-8 ${theme === 'dark' ? 'border-slate-800' : 'border-gray-100'}`}
          />

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              Share:
            </span>
            <div
              className={`flex gap-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              <FaFacebook
                className="cursor-pointer hover:text-[#1877F2] transition-colors"
                size={20}
              />
              <FaXTwitter
                className="cursor-pointer hover:text-black transition-colors"
                size={20}
              />
              <IoLogoYoutube
                className="cursor-pointer hover:text-[#FF0000] transition-colors"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Tab Section --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 mb-20">
        <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar gap-4 sm:gap-8">
          {['Details', 'Specs', 'Reviews'].map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`pb-4 text-[10px] sm:text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                activeTab === index
                  ? 'text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab === 'Details'
                ? 'Product Details'
                : tab === 'Specs'
                  ? 'Specification'
                  : 'Reviews'}
              {activeTab === index && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-all duration-300" />
              )}
            </button>
          ))}
        </div>

        <div className="py-6 md:py-8 min-h-[200px] leading-relaxed">
          {activeTab === 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2
                className={`text-lg md:text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              >
                Product Description
              </h2>
              <p
                className={`mb-6 text-sm md:text-base ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}
              >
                {currentProduct?.des1?.[locale]}
              </p>

              <h2
                className={`text-lg md:text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              >
                Key Features
              </h2>
              <ul className="grid grid-cols-1 gap-3 mt-4">
                {[
                  currentProduct?.type1,
                  currentProduct?.type2,
                  currentProduct?.type3,
                ].map(
                  (type, i) =>
                    type?.[locale] && (
                      <li key={i} className="flex items-center gap-3 group">
                        <span className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-600 group-hover:scale-125 transition-transform" />
                        <span
                          className={`text-sm md:text-base font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-black'}`}
                        >
                          {type?.[locale]}
                        </span>
                      </li>
                    )
                )}
              </ul>
            </div>
          )}

          {activeTab === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 overflow-x-auto">
              <table
                className={`w-full text-left border ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}
              >
                <tbody className="text-sm md:text-base">
                  {[
                    {
                      label: 'Brand',
                      value:
                        currentProduct?.brand?.[locale] || 'Travel Luggage',
                    },
                    {
                      label: 'Color',
                      value: currentProduct?.color?.[locale] || 'Sky',
                    },
                    {
                      label: 'Material',
                      value: currentProduct?.material?.[locale] || 'Plastic',
                    },
                    {
                      label: 'Capacity',
                      value: currentProduct?.capacity?.[locale] || '20 Ounces',
                    },
                    {
                      label: 'Recommended Uses',
                      value: currentProduct?.uses?.[locale] || 'Water',
                    },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-b ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}
                    >
                      <td
                        className={`py-3 px-4 md:py-4 md:px-6 font-bold w-1/2 sm:w-1/3 ${theme === 'dark' ? 'text-white bg-slate-800/50' : 'text-black bg-gray-50'}`}
                      >
                        {row.label}:
                      </td>
                      <td
                        className={`py-3 px-4 md:py-4 md:px-6 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}
                      >
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8 md:space-y-12">
              <div className="max-w-4xl">
                <h3
                  className={`text-lg md:text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-2`}
                >
                  Customer Reviews
                </h3>

                <div className="space-y-6 md:space-y-8 mt-6">
                  {review.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-4 md:gap-6 pb-6 border-b last:border-none dark:border-slate-800"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-slate-100">
                          <Image
                            src={item.image}
                            alt="User"
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-sm md:text-base">
                              {item.name}
                            </h4>
                            <span className="text-[10px] md:text-xs text-blue-500">
                              {item.timestamp}
                            </span>
                          </div>
                          <div className="flex text-amber-500 gap-0.5">
                            {[...Array(item.rating || 0)].map((_, i) => (
                              <FaStar key={i} size={12} />
                            ))}
                          </div>
                        </div>
                        <p
                          className={`text-sm md:text-base leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}
                        >
                          {item.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 bg-gray-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl">
                  <h3 className="text-lg font-bold mb-6">Write a Review</h3>
                  <form
                    onSubmit={handleSubmit(handelReview)}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold">Your Rating:</span>
                      <div className="flex text-amber-500 gap-1">
                        {[1, 2, 3, 4, 5].map((val) => (
                          <FaStar
                            key={val}
                            onClick={() => setStar(val)}
                            className={`cursor-pointer size-5 md:size-6 ${val <= star ? 'text-amber-400' : 'text-slate-300'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        {...register('name')}
                        readOnly
                        className={`w-full p-3 md:p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}
                      />
                      <input
                        {...register('email')}
                        readOnly
                        className={`w-full p-3 md:p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}
                      />
                    </div>

                    <textarea
                      rows={4}
                      {...register('message', { required: true })}
                      placeholder="Write Your Detailed Experience *"
                      className={`w-full p-3 md:p-4 rounded-xl border resize-none ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}
                    />

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all"
                    >
                      SUBMIT REVIEW
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ViewDetails
