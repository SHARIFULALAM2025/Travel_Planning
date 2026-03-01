"use client";
import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Stories = () => {
  const stories = [
    {
      id: 1,
      image:
        "https://i.ibb.co.com/39j802bV/Hidden-Lake-Lookout27-min-scaled.webp",
      author: "Emily Carter",
      readTime: "6 min read",
      title: "A Weekend in the Mountains",
      tags: ["mountains", "weekend"],
    },
    {
      id: 2,
      image:
        "https://i.ibb.co.com/39j802bV/Hidden-Lake-Lookout27-min-scaled.webp",
      author: "Liam Nguyen",
      readTime: "4 min read",
      title: "Hidden Alpine Trails",
      tags: ["hiking", "alpine"],
    },
    {
      id: 3,
      image:
        "https://i.ibb.co.com/39j802bV/Hidden-Lake-Lookout27-min-scaled.webp",
      author: "Sophia Lee",
      readTime: "5 min read",
      title: "Coastal Escape Guide",
      tags: ["beach", "travel"],
    },
    {
      id: 4,
      image:
        "https://i.ibb.co.com/39j802bV/Hidden-Lake-Lookout27-min-scaled.webp",
      author: "Daniel Kim",
      readTime: "7 min read",
      title: "City Adventure Tips",
      tags: ["city", "guide"],
    },
  ];
const { theme } = useTheme()
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) return null
  return (
    <section className={`py-20 ${theme == 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-14 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Traveler Stories
            </h2>
            <p className="mt-3 text-gray-500">
              Real experiences shared by our travel community.
            </p>
          </div>

          <button
            className="inline-flex items-center gap-2 px-5 py-2.5
            rounded-xl text-sm font-semibold
            bg-indigo-600 text-white
            shadow-md hover:shadow-xl
            hover:bg-indigo-700
            transition-all duration-300 hover:-translate-y-1"
          >
            <Plus size={16} />
            Share Your Story
          </button>
        </div>

        {/* Overlay Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((s) => (
            <div
              key={s.id}
              className="relative group overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-[320px] w-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition duration-500"></div>

              {/* Content */}
              <div className="absolute bottom-5 left-5 right-5 text-white flex flex-col gap-2">
                {/* Author + Read Time */}
                <div className="text-xs flex items-center gap-2 opacity-90">
                  <span className="font-semibold">{s.author}</span>
                  <span>• {s.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold leading-snug">
                  {s.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/20 backdrop-blur-md
                      px-3 py-1 rounded-full border border-white/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read Button */}
                <div className="mt-3">
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    Read Story
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default Stories;