import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const Stories = () => {
  const stories = [
    {
      id: 1,
      image: 'https://i.ibb.co.com/W4yVKCmt/finding-peace-nature-sunrise-mountain-peak-practicing-self-transcendence-person-sits-peacefully-rock.webp',
      author: 'Emily Carter',
      readTime: '6 min read',
      title: 'A Weekend in the Mountains: Finding Calm and Adventure',
      description: 'We packed light and chased sunrise views—here’s a compact guide to a rejuvenating mountain weekend.',
      tags: ['mountains', 'weekend', 'adventure']
    },
    {
      id: 2,
      image: 'https://i.ibb.co.com/39j802bV/Hidden-Lake-Lookout27-min-scaled.webp',
      author: 'Liam Nguyen',
      readTime: '4 min read',
      title: 'Hidden Trails: A Local Guide to Alpine Hikes',
      description: 'Local tips for less-traveled alpine trails, what to pack, and where to stop for the best views.',
      tags: ['hiking', 'local tips', 'alpine']
    }
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Traveler Stories</h2>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition">
            Share yours +
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="space-y-6">
          {stories.map((s) => (
            <article key={s.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-1/3 h-52 sm:h-auto">
                <Image src={s.image} alt={s.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div>
                    <div className="font-medium text-gray-800">{s.author}</div>
                    <div className="mt-1 text-sm text-gray-400">{s.readTime}</div>
                  </div>
                  <div className="text-sm text-gray-400">&nbsp;</div>
                </div>

                <h3 className="mt-4 text-lg sm:text-2xl font-semibold text-gray-900 leading-tight">{s.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{s.description}</p>

                <div className="mt-5 flex items-center gap-3 flex-wrap">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full border border-gray-100">#{tag}</span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-end">
                  <a className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline" href="#">
                    Read story
                    <ArrowRight size={14} />
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
