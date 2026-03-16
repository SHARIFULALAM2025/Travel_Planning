'use client'
import React from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl text-center border dark:border-slate-800">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-green-500 animate-bounce" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all"
          >
            Go to Home
          </Link>
          <Link
            href="/orders"
            className="block w-full py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
