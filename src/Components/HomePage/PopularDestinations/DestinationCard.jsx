// DestinationCard.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

const DestinationCard = ({ id, image, location, country, travelType, rating, price, description, href = `/destinations/${id}` }) => {
    return (
        <div className="group flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl
            transition-all duration-500 transform hover:-translate-y-3 bg-white border border-gray-100/50
            backdrop-blur-sm hover:backdrop-blur-md">
            
            {/* Image */}
            <div className="relative w-full h-56 sm:h-64 lg:h-64 overflow-hidden rounded-t-2xl">
                <Image
                    src={image}
                    alt={location}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={false}
                    loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-90"></div>

                {/* Location text */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                    <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-lg line-clamp-2">{location}</h3>
                    <p className="text-sm text-white/80 mt-1">{country} • {travelType}</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col p-5 sm:p-6 space-y-3 flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400" />
                        <span className="text-gray-700 font-medium">{rating}</span>
                    </div>
                    <span className="text-indigo-600 font-semibold">{price}</span>
                </div>

                <p className="text-gray-600 text-sm sm:text-base line-clamp-3">{description}</p>

                <Link
                    href={href}
                    className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl
                        shadow-md hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                    View Details
                    <ArrowRight size={16} className="ml-2" />
                </Link>
            </div>
        </div>
    );
};

export default DestinationCard;