'use client'
import React from 'react'
import Container from '../Container/Container'
import { FaArrowRight } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'

const Shop = () => {
  const locale = useLocale()
  const { data: product = [] } = useQuery({
    queryKey: ['All Product', locale],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/productAll')
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
        <div className="col-span-9">{product?.map((item, index) => <div key={index} className='p-5'>
          <Image src={item.image[0]} width={200} height={200} alt="product" className="" />
        </div>)}</div>
      </section>
    </Container>
  )
}

export default Shop
