import React from "react";
import Link from "next/link";
import Image from "next/image"; // ✅ Added Image

import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactItems = [
    { icon: Mail, href: "mailto:support@travelmate.com", text: "support@travelmate.com", isLink: true },
    { icon: Phone, href: "tel:+1234567890", text: "+1 (234) 567-890", isLink: true },
    { icon: MapPin, text: "123 Travel Street, Adventure City", isLink: false },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  return (
    <footer className="w-full bg-[#f8fafc] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-5 py-16">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">

          {/* BRAND */}
          <div className="space-y-6">

            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <Image
                src="/planet.png"   // ✅ your local image path
                alt="TravelMate Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />

              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                TravelMate
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed max-w-sm">
              Discover destinations, plan smarter journeys, and explore the
              world with confidence. Your trusted companion for meaningful travel.
            </p>
          </div>

          {/* CONTACT */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Contact
            </h3>

            <div className="space-y-4">
              {contactItems.map((c, i) => {
                const Icon = c.icon;
                const item = (
                  <div className="flex items-start gap-3 text-gray-600 hover:text-blue-600 transition">
                    <Icon size={18} className="mt-0.5" />
                    <span className="text-sm">{c.text}</span>
                  </div>
                );

                return c.isLink ? (
                  <a key={i} href={c.href}>{item}</a>
                ) : (
                  <div key={i}>{item}</div>
                );
              })}
            </div>
          </div>

          {/* SOCIAL */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Follow Us
            </h3>

            <p className="text-gray-600 text-sm max-w-xs">
              Travel inspiration, deals, and stories — straight to your feed.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    className="w-11 h-11 flex items-center justify-center rounded-xl
                    bg-white border border-gray-200 text-gray-600
                    hover:bg-blue-600 hover:text-white hover:border-blue-600
                    shadow-sm hover:shadow-lg
                    transition-all duration-300 hover:-translate-y-1"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gray-200 my-10"></div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-sm text-gray-500">
          <p>© {currentYear} TravelMate. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-blue-600 transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-blue-600 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;