import React from "react";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

const Personalized = () => {
  const cards = [
    {
      id: 1,
      image: "https://i.ibb.co.com/zT1s8ykw/cb217bfd.avif",
      category: "Luxury Cabin",
      rating: 4.9,
      title: "Secluded Lakeview Cabin",
      description:
        "Cozy cabin with private deck, hot tub, and panoramic mountain views.",
      price: "$420/night",
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/zT1s8ykw/cb217bfd.avif",
      category: "Hiking Trip",
      rating: 4.8,
      title: "Guided Alpine Trek",
      description:
        "Three-day guided trek through alpine trails with expert local guides.",
      price: "$220/person",
    },
    {
      id: 3,
      image:
        "https://i.ibb.co.com/zT1s8ykw/cb217bfd.avif",
      category: "Unique Stay",
      rating: 4.7,
      title: "Cliffside Cave Retreat",
      description:
        "A one-of-a-kind cave conversion with modern comforts and dramatic views.",
      price: "$310/night",
    },
    {
      id: 4,
      image:
        "https://i.ibb.co.com/zT1s8ykw/cb217bfd.avif",
      category: "Beach Escape",
      rating: 4.8,
      title: "Private Island Retreat",
      description:
        "Exclusive beachfront stay with crystal-clear waters and sunset views.",
      price: "$520/night",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Personalized For You
          </h2>
          <p className="mt-3 text-gray-500">
            Based on your recent interest in{" "}
            <span className="font-semibold text-indigo-600">
              Mountain Getaways
            </span>
          </p>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card) => (
            <article
              key={card.id}
              className="group bg-white rounded-3xl overflow-hidden
              border border-gray-100
              shadow-md hover:shadow-2xl
              transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute left-4 bottom-4 bg-white/95 text-xs font-medium text-gray-800 px-3 py-1 rounded-full shadow-sm">
                  {card.category}
                </div>

                <div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">
                    {card.rating}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-base font-semibold text-gray-900">
                  {card.title}
                </h3>

                <p className="text-sm text-gray-600 flex-1 leading-relaxed">
                  {card.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-base font-bold text-gray-900">
                    {card.price}
                  </span>

                  <button
                    className="inline-flex items-center gap-2 px-3 py-1.5
                    bg-indigo-600 text-white text-sm font-medium
                    rounded-lg shadow-sm
                    hover:bg-indigo-700 hover:shadow-md
                    transition-all duration-300"
                  >
                    Quick View
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Personalized;