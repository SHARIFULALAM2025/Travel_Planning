import React from 'react';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';

const Personalized = () => {
  const cards = [
    {
      id: 1,
      image: 'https://i.ibb.co.com/zT1s8ykw/cb217bfd.avif',
      category: 'Luxury Cabin',
      rating: 4.9,
      title: 'Secluded Lakeview Cabin',
      description: 'Cozy cabin with private deck, hot tub, and panoramic mountain views.',
      price: '$420/night'
    },
    {
      id: 2,
      image: 'https://i.ibb.co.com/GfKPbfJQ/033097-450547.jpg',
      category: 'Hiking Trip',
      rating: 4.8,
      title: 'Guided Alpine Trek',
      description: 'Three-day guided trek through alpine trails with expert local guides.',
      price: '$220/person'
    },
    {
      id: 3,
      image: 'https://i.ibb.co.com/TMGjwhP8/serene-underground-cave-tranquil-water-channels-reflecting-warm-light-natural-wonder-stunning-featur.webp',
      category: 'Unique Stay',
      rating: 4.7,
      title: 'Cliffside Cave Retreat',
      description: 'A one-of-a-kind cave conversion with modern comforts and dramatic views.',
      price: '$310/night'
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Personalized for you</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Based on your recent interest in <span className="font-medium">Mountain Getaways</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <article
              key={card.id}
              className="relative bg-white/60 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-white/40"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Category pill */}
                <div className="absolute left-4 bottom-4 bg-white/90 text-sm text-gray-800 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                  {card.category}
                </div>

                {/* Rating badge */}
                <div className="absolute top-4 right-4 bg-white/95 text-gray-900 px-3 py-1 rounded-full shadow-md flex items-center gap-2">
                  <Star size={14} className="text-yellow-400" />
                  <span className="text-sm font-medium">{card.rating}</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col gap-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">{card.title}</h3>
                <p className="text-sm text-gray-600 flex-1">{card.description}</p>

                <div className="flex items-center justify-between mt-2">
                  <div className="text-lg font-bold text-gray-900">{card.price}</div>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-sm border border-white/30 hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all duration-300">
                    <span>Quick View</span>
                    <ArrowRight size={16} />
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
