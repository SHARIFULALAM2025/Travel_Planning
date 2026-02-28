"use client";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { useState } from "react";

export default function HeroSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full bg-[#f8f8f8] py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        
        {/* LEFT SIDE */}
        <div className="relative group">
          <Image
            src="/assets/image123.jpg"
            alt="Buddhism"
            width={700}
            height={500}
            className="rounded-2xl object-cover w-full h-[420px]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 rounded-2xl flex flex-col justify-center px-10">
            
            <span className="text-blue-600 italic text-lg mb-2">
              New
            </span>

            <h2 className="text-white text-4xl font-bold mb-3 leading-tight">
              Watch Our Video
            </h2>

            <p className="text-gray-200 mb-8 text-lg">
              The Beauty of Buddhism
            </p>

            <button
              onClick={() => setOpen(true)}
              className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition duration-300 shadow-lg"
            >
              <Play className="text-white ml-1" size={30} />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <span className="text-blue-600 font-semibold tracking-widest uppercase">
            Discover Yourself
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            A Simply Perfect <br />
            <span className="text-blue-600">
              Place To Get Lost
            </span>
          </h1>

          <div className="w-20 h-1 bg-blue-600 rounded"></div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Treat yourself with a journey to your inner self. Visit a mystique
            Tibet and start your spiritual adventure. We promise you’ll enjoy
            every peaceful step along the way.
          </p>

          <button className="bg-blue-600 text-white px-10 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-xl">
            SEE MORE
          </button>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="relative w-full max-w-4xl">
            
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-blue-400"
            >
              <X size={32} />
            </button>

            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/T6dCntaqHZ0?autoplay=1"
                title="YouTube video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}