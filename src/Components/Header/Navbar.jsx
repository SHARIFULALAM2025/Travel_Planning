'use client'
import React from 'react'
import { navItems } from './NavData'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <Link href="/">
        <div className="">
          <figure>
            <Image
              src="/profile.png"
              width={40}
              height={40}
              alt="profile"
            ></Image>
          </figure>
        </div>
      </Link>
      <div className="space-x-3">
        {navItems.map((item, index) => (
          <Link key={index} href={item.path} className=" items-center">
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      <div className=""></div>
    </nav>
  )
}

export default Navbar
