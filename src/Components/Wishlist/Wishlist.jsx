"use client"
import React from 'react'
import Container from '../Container/Container'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { Trash2, ShoppingCart, HeartOff } from 'lucide-react'
import toast from 'react-hot-toast'

const Wishlist = () => {
    const locale = useLocale()
    const queryClient = useQueryClient()
    const { data: session } = useSession();

    // Fetch Wishlist Data
    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ['AllWishlist', locale, session?.user?.email],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/allWishlist/${session?.user?.email}`
            )
            return res.data
        },
        enabled: !!session?.user?.email,
    })

    // Delete from Wishlist
    const { mutate: deleteWishlist } = useMutation({
        mutationFn: async (id) => {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/deleteWishlist/${id}`)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['AllWishlist'])
            toast.success('Removed from wishlist')
        }
    })

    // Add to Cart from Wishlist
    const { mutate: addToCart } = useMutation({
        mutationFn: async (product) => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/cart-data`, product)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['AllCard'])
            toast.success('Added to cart')
        }
    })

    if (isLoading) return <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>

    return (
        <Container>
            <div className="">


                {wishlist.length > 0 ? (
                    <div className="overflow-x-auto border border-gray-100 dark:border-slate-800 shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-gray-300 uppercase text-xs font-bold tracking-widest">
                                    <th className="px-6 py-5">Item</th>
                                    <th className="px-6 py-5">Price</th>
                                    <th className="px-6 py-5 text-center">Action</th>
                                    <th className="px-6 py-5 text-right">Remove</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                {wishlist.map((item) => (
                                    <tr key={item._id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        {/* Product Details */}
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 flex-shrink-0 border dark:border-slate-700">
                                                    <Image
                                                        src={item.image || '/placeholder.jpg'}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        alt="product"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 dark:text-gray-100 leading-tight mb-1">
                                                        {item.title?.[locale] || item.title}
                                                    </h3>
                                                    <span className="text-[10px] bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                                                        In Stock
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Price */}
                                        <td className="px-6 py-6 font-bold text-blue-600 dark:text-blue-400 text-lg">
                                            ${parseFloat(item.price?.[locale] || item.price).toFixed(2)}
                                        </td>

                                        {/* Add to Cart Button */}
                                        <td className="px-6 py-6 text-center">
                                            <button
                                                onClick={() => addToCart({
                                                    productId: item.productId,
                                                    title: item.title,
                                                    price: item.price,
                                                    image: item.image,
                                                    email: session?.user?.email,
                                                    quantity: 1
                                                })}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 mx-auto transition-all active:scale-95 shadow-md shadow-blue-500/20"
                                            >
                                                <ShoppingCart size={16} />
                                                ADD TO CART
                                            </button>
                                        </td>

                                        {/* Remove Button */}
                                        <td className="px-6 py-6 text-right">
                                            <button
                                                onClick={() => deleteWishlist(item._id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800">
                        <HeartOff size={60} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium">Your wishlist is empty.</p>
                    </div>
                )}
            </div>
        </Container>
    )
}

export default Wishlist