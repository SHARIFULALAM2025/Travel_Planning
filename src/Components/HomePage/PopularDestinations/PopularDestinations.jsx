"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const destinations = [
  { id: 1, title: "Discover India", price: "$2650", image: "/assets/image124.jpg" },
  { id: 2, title: "Forest Adventure", price: "$1350", image: "/assets/image124.jpg" },
  { id: 3, title: "China Tour", price: "$1500", image: "/assets/image124.jpg" },
  { id: 4, title: "Mountain Escape", price: "$2100", image: "/assets/image124.jpg" },
  { id: 5, title: "Beach Paradise", price: "$1800", image: "/assets/image124.jpg" },
  { id: 6, title: "Desert Safari", price: "$1400", image: "/assets/image124.jpg" },
  { id: 7, title: "Tokyo Lights", price: "$3000", image: "/assets/image124.jpg" },
  { id: 8, title: "Swiss Alps", price: "$3500", image: "/assets/image124.jpg" },
  { id: 9, title: "Beach Paradise", price: "$1800", image: "/assets/image124.jpg" },
  { id: 10, title: "Desert Safari", price: "$1400", image: "/assets/image124.jpg" },
  { id: 11, title: "Tokyo Lights", price: "$3000", image: "/assets/image124.jpg" },
  { id: 12, title: "Swiss Alps", price: "$3500", image: "/assets/image124.jpg" },
];

 const  PopularDestination=()=> {
  const [active, setActive] = useState(0);

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(destinations.length / itemsPerSlide);

  const startIndex = active * itemsPerSlide;
  const currentItems = destinations.slice(
    startIndex,
    startIndex + itemsPerSlide
   );
    const { theme } = useTheme()
      const [mounted, setMounted] = useState(false)
useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <section className={` py-20 ${theme == 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Popular Destinations
          </h2>
          <p className="mt-3 text-gray-500">
            Discover top destinations with all the essential travel info at a
            glance.
          </p>
        </div>
        {/* Cards */}
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
            >
              {/* Image */}
              <div className="relative h-[300px] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition duration-500"></div>

              {/* Content */}
              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-2">
                {/* Price Badge */}
                <span className="self-start px-4 py-1 text-sm bg-white/20 backdrop-blur-md text-white rounded-full border border-white/30 shadow">
                  {item.price}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white tracking-wide">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-10 gap-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <span
              key={index}
              onClick={() => setActive(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300
                ${active === index ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  )
}
export default PopularDestination;