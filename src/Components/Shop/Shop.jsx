'use client'
import React from 'react'
import Container from '../Container/Container'
import { FaArrowRight, FaStar } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { FaCartPlus } from 'react-icons/fa'
import { IoEye } from 'react-icons/io5'
import { FaHeart } from 'react-icons/fa'
import Link from 'next/link'

const Shop = () => {
  const locale = useLocale()
  const { data: product = [] } = useQuery({
    queryKey: ['All Product', locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/productAll`
      )
      return res.data
    },
  })
  console.log(product)

  return (
    <Container>
      <section className="grid grid-cols-12">
        <aside className="col-span-3">
          <div className="sticky top-24 space-y-10">
            {/* Search Widget */}
            <div className="relative">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Search
              </h4>
              <div className="relative group">
                <input
                  type="search"
                  placeholder="Search blogs..."
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 pl-4 pr-12 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Categories
              </h4>
              <ul className="space-y-3">
                {['Adventure', 'Travel Tips', 'Hidden Gems', 'Local Food'].map(
                  (cat) => (
                    <li key={cat}>
                      <button className="flex items-center justify-between w-full text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                        <span className="text-sm font-medium">{cat}</span>
                        <span className="bg-slate-100 dark:bg-slate-800 text-[10px] px-2 py-1 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
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
        <div className="col-span-9 grid grid-cols-3">
          {product?.map((item, index) => (
            <div
              key={index}
              className="p-5 bg-gray-400 rounded-xl relative group overflow-hidden"
            >
              <Image
                src={item?.image[0]}
                width={200}
                height={200}
                alt="product"
                className="rounded-xl mx-auto"
              />
              <h1 className="">{item?.title?.[locale]}</h1>
              <div className="flex gap-2">
                <div className="flex text-slate-200  gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={16}
                      className="hover:text-amber-400 cursor-pointer"
                    />
                  ))}
                </div>
                <div className=" text-xs">{item?.review?.[locale]}</div>
              </div>
              <h1 className="">price:${item?.price?.[locale]}</h1>
              <div
                className="  absolute flex flex-col gap-2 top-3 right-3
    opacity-0 group-hover:opacity-100
    translate-x-5 group-hover:translate-x-0
    transition-all duration-300"
              >
                <div className="p-3 bg-gray-300 rounded-full">
                  <FaHeart className="text-black" />
                </div>
                <div className="p-3 bg-gray-300 rounded-full">
                  <FaCartPlus className="text-black" />
                </div>
                <Link href={`/shop/${item._id}`}>
                  <div className="p-3 bg-gray-300 rounded-full">
                    <IoEye className="text-black" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  )
}

export default Shop
