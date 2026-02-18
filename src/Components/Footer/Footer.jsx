<<<<<<< sumit
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const contactItems = [
        {
            icon: Mail,
            href: 'mailto:hello@wanderlust.com',
            label: 'Email',
            text: 'hello@wanderlust.com',
            isLink: true,
        },
        {
            icon: Phone,
            href: 'tel:+1234567890',
            label: 'Phone',
            text: '+1 (234) 567-890',
            isLink: true,
        },
        {
            icon: MapPin,
            label: 'Location',
            text: '123 Travel Street, Adventure City, AC 12345',
            isLink: false,
        },
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook', name: 'Facebook' },
        { icon: Instagram, href: '#', label: 'Instagram', name: 'Instagram' },
        { icon: Twitter, href: '#', label: 'Twitter', name: 'Twitter' },
        { icon: Youtube, href: '#', label: 'YouTube', name: 'YouTube' },
    ];

    const legalLinks = [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
    ];

    return (
        <footer className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50 relative overflow-hidden">
            {/* Decorative gradient elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full filter blur-3xl -ml-48 -mb-48"></div>

            <div className="max-w-6xl mx-auto px-4  py-16  relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 lg:gap-20 mb-8 ">
                    {/* Column 1: About */}
                    <div className="space-y-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            TravelPlanning
                        </h3>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light line-clamp-4">
                            Your ultimate travel companion. Discover hidden gems, plan perfect trips, track budgets, and read authentic reviews from verified travelers around the world.
                        </p>
                        <p className="text-slate-400 text-xs sm:text-sm font-light italic">
                            Making travel dreams come true, one destination at a time.
                        </p>
                    </div>

                    {/* Column 2: Contact */}
                    <div className="space-y-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            Contact Us
                        </h3>
                        <div className="space-y-4">
                            {contactItems.map((contact, index) => {
                                const Icon = contact.icon;
                                const content = (
                                    <div className="flex items-start gap-3 text-slate-300 hover:text-blue-400 transition-all duration-300 group">
                                        <Icon size={20} className="text-slate-400 group-hover:text-blue-400 transition-all duration-300 flex-shrink-0 mt-0.5 group-hover:scale-110" />
                                        <span className="text-sm sm:text-base font-light group-hover:translate-x-1 transition-transform duration-300">{contact.text}</span>
                                    </div>
                                );
                                return contact.isLink ? (
                                    <a key={index} href={contact.href}>
                                        {content}
                                    </a>
                                ) : (
                                    <div key={index}>{content}</div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column 3: Social Links */}
                    <div className="space-y-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            Follow Us
                        </h3>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                            Connect with us for travel tips, inspiration, and exclusive deals.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-700/50 text-slate-300 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all duration-500 transform hover:scale-125 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/40 border border-slate-600/30 hover:border-blue-500/50"
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent my-4"></div>

                {/* Bottom Section: Copyright & Legal */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
                    {/* Copyright */}
                    <p className="text-slate-400 text-sm sm:text-base font-light text-center sm:text-left">
                        © {currentYear} Wanderlust. All rights reserved.
                    </p>

                    {/* Legal Links */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6 sm:gap-8">
                        {legalLinks.map((link, index) => (
                            <div key={index} className="flex items-center gap-6 sm:gap-8">
                                {index > 0 && <div className="hidden sm:block w-px h-5 bg-slate-600/50"></div>}
                                <Link
                                    href={link.href}
                                    className="text-slate-400 hover:text-blue-400 text-sm sm:text-base font-light transition-all duration-300 hover:translate-y-(-1)"
                                >
                                    {link.label}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
=======
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
>>>>>>> main

export default Footer
