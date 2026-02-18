import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const DestinationCard = ({ id, image, location, description, href = `/destinations/${id}` }) => {
    return (
        <div className="group flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-3 bg-white border border-gray-100/50 hover:border-blue-300/30 backdrop-blur-sm hover:backdrop-blur-md">
            {/* Image Container with Premium Overlay */}
            <div className="relative w-full h-56 sm:h-64 lg:h-72 overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-300 to-gray-400">
                <Image
                    src={image}
                    alt={location}
                    width={500}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={false}
                    loading="lazy"
                />
                
                {/* Premium Gradient Overlay - Always Visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-all duration-500"></div>
                
                {/* Additional Hover Gradient Accent */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-transparent to-indigo-600/0 group-hover:from-blue-600/20 group-hover:to-indigo-600/20 transition-all duration-500"></div>

                {/* Location Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-5 sm:p-6 lg:p-7 z-10">
                    <h3 className="text-2xl font-bold text-white leading-tight line-clamp-2 drop-shadow-lg">
                        {location}
                    </h3>
                </div>
            </div>

            {/* Card Content with Improved Hierarchy */}
            <div className="flex flex-col flex-1 p-7 sm:p-8 space-y-5">
                {/* Description - Refined */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light flex-1 line-clamp-3 opacity-85">
                    {description}
                </p>

                {/* View Details Button - Enhanced Animation */}
                <Link
                    href={href}
                    className="inline-flex items-center justify-center w-full px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-400 transform hover:scale-105 hover:-translate-y-1 text-center text-sm sm:text-base shadow-md hover:shadow-xl hover:shadow-blue-600/30 relative overflow-hidden group/btn"
                >
                    {/* Animated Button Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover/btn:opacity-50 blur transition-all duration-400"></div>
                    
                    {/* Button Content */}
                    <span className="relative flex items-center justify-center gap-2">
                        View Details
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default DestinationCard;
