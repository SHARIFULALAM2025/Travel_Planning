'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React from 'react'

const MyOrder = () => {
  const { data: session } = useSession()

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['order', session?.user?.email],
    enabled: !!session?.user?.email,
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/my-order/${session.user?.email}`
      )
      return data
    },
  })

  if (isLoading)
    return (
      <div className="p-10 text-center text-gray-500">Loading orders...</div>
    )
  if (orders.length === 0)
    return (
      <div className="p-10 text-center text-gray-500">No orders found.</div>
    )

  return (
    <div className="">
      {orders.map((order) => (
        <div
          key={order._id}
          className=""
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 border-b border-gray-200">
            <div>
              <h2 className="text-sm font-bold text-gray-500 uppercase mb-2">
                Order Information
              </h2>
              <p className="text-sm text-gray-700">
                <strong>Transaction ID:</strong> {order.transactionId}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Date:</strong>{' '}
                {order.date}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-500 uppercase mb-2">
                Customer Details
              </h2>
              <p className="text-sm text-gray-700">
                <strong>Name:</strong> {order.customerInfo?.customerName}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Email:</strong> {order.customerInfo?.email}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Address:</strong> {order.customerInfo?.address}
              </p>
            </div>
          </div>

          {/* 2. Table: Product Breakdown */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    SL
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Product ID
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y ">
                {order.items?.map((item, idx) => (
                  <tr key={idx} className="bg-white ">
                    <td className="px-6 py-4 text-sm  font-mono ">
                      {idx+1}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono ">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium ">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm  text-center">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm  font-semibold text-right">
                      ${item.price?.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. Footer: Summary & Payment */}
          <div className="p-6 border-t border-gray-200 flex justify-end bg-white">
            <div className="w-full md:w-64 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">
                  Payment Status:
                </span>
                <span className="font-bold text-green-700 uppercase tracking-tight">
                  {order.paidStatus}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 pt-2">
                <span className="text-gray-800 font-bold">Total Price:</span>
                <span className="text-xl font-bold text-blue-600">
                  ${order.totalAmount?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}

export default MyOrder
