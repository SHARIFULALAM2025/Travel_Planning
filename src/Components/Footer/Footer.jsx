'use client'
import React from 'react'
import Link from 'next/link'
import { FaGlobe, FaShareAlt, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            TravelMate
          </h2>
          <p className="text-sm leading-relaxed mb-6">
            Connecting travelers with authentic experiences and unique stays 
            around the world. Begin your journey with us.
          </p>

          <div className="flex gap-5 text-xl">
            <a href="#" className="hover:text-blue-600 transition-colors"><FaGlobe /></a>
            <a href="#" className="hover:text-blue-600 transition-colors"><FaShareAlt /></a>
            <a href="#" className="hover:text-blue-600 transition-colors"><FaEnvelope /></a>
          </div>
        </div>

        {/* Explore Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-blue-600 transition">Destinations</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Experience Map</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Travel Guides</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Sustainability</Link></li>
          </ul>
        </div>

        {/* Community Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">Community</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-blue-600 transition">Ambassadors</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Forum</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Travel Stories</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Host a Stay</Link></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">
            Stay Updated
          </h3>
          <p className="text-sm mb-4">
            Subscribe for the latest travel inspiration and exclusive deals.
          </p>

          <div className="flex shadow-sm rounded-lg overflow-hidden border border-gray-200">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-5 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 mt-12 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 Wanderlust Travel Platform. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-gray-900 transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-900 transition">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-900 transition">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
