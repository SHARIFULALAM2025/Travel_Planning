'use client'
import React, { useState } from 'react'
import Container from '../Container/Container'
import { useSession } from 'next-auth/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'

import Link from 'next/link'

import toast from 'react-hot-toast'
import CardItem from './CardItem'
import { ArrowLeft } from 'lucide-react'

const ShoppingCart = () => {
  const locale = useLocale()
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const [AllTotalPrice, SetAllTotalPrice] = useState(0)
  // Fetching Card Data
  const { data: card = [], isLoading } = useQuery({
    queryKey: ['AllCard', locale, session?.user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/allCard/${session?.user?.email}`
      )
      return res.data
    },
    enabled: !!session?.user?.email,
  })

  // Delete Mutation
  const { mutate: deleteItem } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/removeCard/${id}`
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['AllCard'])
      toast.success('Item removed')
    },
  })
  const handelDelete = (id) => {
    deleteItem(id)
  }

  // Total Calculation
  const updateGlobalTotal = (amount) => {
    SetAllTotalPrice((prev) => prev + amount)
  }

  let totalPrice = 0

  for (const item of card) {
    const element = parseFloat(item?.price?.[locale])
    totalPrice += element
  }
  const TotalAmount = totalPrice + AllTotalPrice
  //
  // const handlePayment = async () => {
  //   const paymentData = {
  //     price: TotalAmount,
  //     customerName: session?.user?.name || 'Anonymous',
  //     email: session?.user?.email,
  //     phone: '01700000000',
  //     address: 'Dhaka, Bangladesh',
  //     productName: card.map((item) => item.title?.[locale]).join(' ').substring(0, 150),

  //   }
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/init`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(paymentData),
  //       }
  //     )

  //     const data = await response.json()

  //     if (data?.url) {
  //       window.location.replace(data.url)
  //     } else {
  //       toast.error('Failed to initialize payment.')
  //     }
  //   } catch (error) {
  //     console.error('Payment Error:', error)
  //     toast.error('Something went wrong!')
  //   }
  // }
  const [updateQuantity, setUpdateQuantity] = useState({})
  const handleIncomingQuantity = (id,qty) => {
  setUpdateQuantity(prev => ({
    ...prev,
    [id]: qty
  }));
};
  const handlePayment = async () => {


  const cartItems = card.map((item) => ({
    name: item.title?.[locale],
    price: parseFloat(item.price?.[locale]),

     quantity:updateQuantity[item._id] || 1
  }));

  const paymentData = {
    total_amount: TotalAmount,
    customerName: session?.user?.name || 'Anonymous',
    email: session?.user?.email,
    phone: '01700000000',
    address: 'Dhaka, Bangladesh',
    items: cartItems,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/init`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      }
    );

    const data = await response.json();

    if (response.ok && data?.url) {
      window.location.replace(data.url);
    } else {
      // ব্যাকএন্ড থেকে আসা এরর মেসেজ দেখালে সুবিধা হবে
      toast.error(data.message || 'Failed to initialize payment.');
      console.error("Backend Error:", data);
    }
  } catch (error) {
    console.error('Payment Error:', error);
    toast.error('Something went wrong!');
  }
};

  //
  if (isLoading)
    return <div className="py-20 text-center font-bold">Loading Cart...</div>

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen ">
      <Container>
        <div className="">
          {/* 1. Left Side: Cart Items List */}
          <div className=" bg-white dark:bg-slate-900  shadow-sm overflow-hidden border dark:border-slate-800">
            <div className="p-6 border-b dark:border-slate-800 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
              <span className="text-gray-500 font-medium">
                {card.length} Items
              </span>
            </div>

            <div className="p-6 overflow-x-auto">
              {card.length > 0 ? (
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="text-gray-400 text-sm uppercase tracking-wider border-b dark:border-slate-800">
                      <th className="pb-4 font-medium">Item</th>
                      <th className="pb-4 font-medium text-center">Quantity</th>
                      <th className="pb-4 font-medium text-right">Price</th>
                      <th className="pb-4 font-medium text-right">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-slate-800">
                    {card.map((item) => (
                      <CardItem
                        key={item._id}
                        item={item}
                        onSendQuantity={handleIncomingQuantity}
                        handelDelete={handelDelete}
                        locale={locale}
                        updateGlobalTotal={updateGlobalTotal}
                      ></CardItem>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 mb-6">Your cart is empty</p>
                  <Link
                    href={`/${locale}/products`}
                    className="text-blue-600 font-bold flex items-center justify-center gap-2 hover:underline"
                  >
                    <ArrowLeft size={18} /> Continue Shopping
                  </Link>
                </div>
              )}
              <div className="flex justify-between border-t dark:border-slate-800">
                {/* Coupon Section */}
                <div className=" space-x-5">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 bg-gray-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button className="bg-slate-900 dark:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
                    Apply
                  </button>
                </div>
                {/* 2. Right Side: Order Summary */}
                <div className="lg:w-1/3 space-y-6">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 border dark:border-slate-800">
                    <h2 className="text-xl font-bold mb-6 border-b dark:border-slate-800 pb-4">
                      Order Summary
                    </h2>

                    <div className="space-y-4">
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Subtotal</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ${TotalAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                      </div>
                      <div className="pt-4 border-t dark:border-slate-800 flex justify-between items-center">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl font-black text-blue-600">
                          ${TotalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handlePayment}
                      className={`block w-full mt-8 py-4 text-center rounded-2xl font-bold text-white transition-all shadow-lg shadow-blue-500/20 ${
                        card.length > 0
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ShoppingCart
