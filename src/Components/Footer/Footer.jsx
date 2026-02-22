import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const contactItems = [
        { icon: Mail, href: 'mailto:support@travelmate.com', label: 'Email', text: 'support@travelmate.com', isLink: true },
        { icon: Phone, href: 'tel:+1234567890', label: 'Phone', text: '+1 (234) 567-890', isLink: true },
        { icon: MapPin, label: 'Location', text: '123 Travel Street, Adventure City, AC 12345', isLink: false },
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
        <footer className="relative w-full bg-gradient-to-b from-gray-100 to-gray-200 border-t border-gray-300 overflow-hidden shadow-inner">
            <div className="relative max-w-6xl mx-auto px-2 py-11 z-10">
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 lg:gap-20 mb-8">

                    {/* Column 1: About */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">TravelMate</h3>
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light line-clamp-4">
                            Your ultimate travel companion. Discover hidden gems, plan perfect trips, track budgets, and read authentic reviews from verified travelers around the world.
                        </p>

                    </div>

                    {/* Column 2: Contact */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Contact Us</h3>
                        <div className="space-y-4">
                            {contactItems.map((contact, index) => {
                                const Icon = contact.icon;
                                const content = (
                                    <div className="flex items-start gap-3 text-gray-700 hover:text-blue-600 transition-all duration-300 group">
                                        <Icon size={20} className="text-gray-500 group-hover:text-blue-600 transition-all duration-300 flex-shrink-0 mt-0.5 group-hover:scale-110" />
                                        <span className="text-sm sm:text-base font-light group-hover:translate-x-1 transition-transform duration-300">{contact.text}</span>
                                    </div>
                                );
                                return contact.isLink ? <a key={index} href={contact.href}>{content}</a> : <div key={index}>{content}</div>;
                            })}
                        </div>
                    </div>

                    {/* Column 3: Social Links */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Follow Us</h3>
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light">
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
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-700 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all duration-500 transform hover:scale-125 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30 border border-gray-300 hover:border-blue-500/50"
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-300 my-4"></div>

                {/* Bottom: Copyright & Legal */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
                    <p className="text-gray-600 text-sm sm:text-base font-light text-center sm:text-left">
                        © {currentYear} TravelMate. All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6 sm:gap-8">
                        {legalLinks.map((link, index) => (
                            <div key={index} className="flex items-center gap-6 sm:gap-8">
                                {index > 0 && <div className="hidden sm:block w-px h-5 bg-gray-400"></div>}
                                <Link
                                    href={link.href}
                                    className="text-gray-600 hover:text-blue-600 text-sm sm:text-base font-light transition-all duration-300 hover:-translate-y-1"
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

export default Footer;