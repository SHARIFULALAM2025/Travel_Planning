// PopularDestinations.jsx
import React from 'react';
import DestinationCard from './DestinationCard';

const PopularDestinations = () => {
    const destinations = [
        {
            id: 1,
            image: 'https://i.ibb.co.com/4ZQrhVWS/Adobe-Stock-402537784.avif',
            location: 'Swiss Alps',
            country: 'Switzerland',
            travelType: 'Adventure',
            rating: 4.9,
            price: '$400/night',
            description: 'Majestic mountain peaks with pristine snow-covered slopes.'
        },
        {
            id: 2,
            image: 'https://i.ibb.co.com/G4SHyy5P/images-15.jpg',
            location: 'Bali',
            country: 'Indonesia',
            travelType: 'Beach',
            rating: 4.8,
            price: '$250/night',
            description: 'Tropical paradise with stunning beaches and rice terraces.'
        },
        {
            id: 3,
            image: 'https://i.ibb.co.com/KxrZrjKw/images-16.jpg',
            location: 'Paris',
            country: 'France',
            travelType: 'City',
            rating: 4.7,
            price: '$300/night',
            description: 'The city of lights featuring iconic landmarks and romantic streets.'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Popular Destinations
          </h2>
          <p className="mt-3 text-gray-500">
            Discover top destinations with all the essential travel info at a glance.
          </p>
        </div>

                {/* 1-line Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map(dest => (
                        <DestinationCard
                            key={dest.id}
                            {...dest}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularDestinations;