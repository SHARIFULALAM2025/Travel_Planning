import React from "react";
import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";

const Stories = () => {
  const stories = [
    {
      id: 1,
      image:
        "https://i.ibb.co.com/39j802bV/Hidden-Lake-Lookout27-min-scaled.webp",
      author: "Emily Carter",
      readTime: "6 min read",
      title: "A Weekend in the Mountains",
      description:
        "A compact guide to a rejuvenating mountain weekend getaway.",
      tags: ["mountains", "weekend"],
    },
    {
      id: 2,
      image:
        "https://i.ibb.co.com/39j802bV/Hidden-Lake-Lookout27-min-scaled.webp",
      author: "Liam Nguyen",
      readTime: "4 min read",
      title: "Hidden Alpine Trails",
      description:
        "Local tips for less-traveled alpine hikes and scenic viewpoints.",
      tags: ["hiking", "alpine"],
    },
    {
      id: 3,
      image:
        "https://i.ibb.co.com/39j802bV/Hidden-Lake-Lookout27-min-scaled.webp",
      author: "Sophia Lee",
      readTime: "5 min read",
      title: "Coastal Escape Guide",
      description:
        "Exploring peaceful beaches and hidden coastal gems.",
      tags: ["beach", "travel"],
    },
    {
      id: 4,
      image:
        "https://i.ibb.co.com/39j802bV/Hidden-Lake-Lookout27-min-scaled.webp",
      author: "Daniel Kim",
      readTime: "7 min read",
      title: "City Adventure Tips",
      description:
        "How to explore vibrant cities like a local traveler.",
      tags: ["city", "guide"],
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-6">

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Traveler Stories
            </h2>
            <p className="mt-3 text-gray-500">
              Real experiences shared by our travel community.
            </p>
          </div>

          {/* Share Button */}
          <button
            className="inline-flex items-center justify-center gap-2
            px-5 py-2.5 rounded-xl text-sm font-semibold
            bg-indigo-600 text-white
            shadow-md hover:shadow-lg
            hover:bg-indigo-700
            transition-all duration-300
            hover:-translate-y-1"
          >
            <Plus size={16} />
            Share Your Story
          </button>

        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {stories.map((s) => (
            <article
              key={s.id}
              className="group bg-gray-50 rounded-3xl overflow-hidden 
              transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col justify-between">

                <div>
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-800">
                      {s.author}
                    </span>
                    <span className="ml-2 text-gray-400">
                      • {s.readTime}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600">
                    {s.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-indigo-600 bg-indigo-50 
                        px-3 py-1 rounded-full font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-semibold 
                    text-indigo-600 hover:text-indigo-800 transition"
                  >
                    Read Story
                    <ArrowRight size={16} />
                  </a>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Stories;