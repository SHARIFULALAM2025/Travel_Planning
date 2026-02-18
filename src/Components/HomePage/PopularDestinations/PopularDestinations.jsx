import React from 'react';
import DestinationCard from './DestinationCard';

const PopularDestinations = () => {
    const destinations = [
        {
            id: 1,
            image: 'https://i.ibb.co.com/4ZQrhVWS/Adobe-Stock-402537784.avif',
            location: 'Swiss Alps, Switzerland',
            description: 'Majestic mountain peaks with pristine snow-covered slopes and charming alpine villages.'
        },
        {
            id: 2,
            image: 'https://i.ibb.co.com/G4SHyy5P/images-15.jpg',
            location: 'Bali, Indonesia',
            description: 'Tropical paradise with stunning beaches, ancient temples, and lush rice terraces.'
        },
        {
            id: 3,
            image: 'https://i.ibb.co.com/KxrZrjKw/images-16.jpg',
            location: 'Paris, France',
            description: 'The city of lights featuring iconic landmarks, world-class museums, and romantic streets.'
        },
        {
            id: 4,
            image: 'https://i.ibb.co.com/kVspdqhd/How-to-Make-the-Best-of-a-One-Day-Trip-to-Tokyo.jpg',
            location: 'Tokyo, Japan',
            description: 'Vibrant metropolis blending traditional culture with ultra-modern technology and cuisine.'
        },
        {
            id: 5,
            image: 'https://i.ibb.co.com/nMrgsQPg/images-17.jpg',
            location: 'New York, USA',
            description: 'The city that never sleeps with towering skyscrapers, Broadway shows, and diverse culinary scene.'
        },
        {
            id: 6,
            image: 'https://i.ibb.co.com/fdgCyYkB/images-18.jpg',
            location: 'Santorini, Greece',
            description: 'Stunning white-washed buildings perched on cliffs overlooking the azure Aegean Sea.'
        },
        {
            id: 7,
            image: 'https://i.ibb.co.com/V0yjm07G/images-19.jpg',
            location: 'Dubai, UAE',
            description: 'Ultra-modern city with luxury shopping, pristine beaches, and architectural marvels.'
        },
        {
            id: 8,
            image: 'https://i.ibb.co.com/5h4WkH5B/images-20.jpg',
            location: 'Maldives',
            description: 'Crystal-clear waters and overwater bungalows perfect for a romantic tropical getaway.'
        }
    ];

    return (
        <section className="py-10 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-20 ">
                    <h2 className="text-5xl font-bold tracking-tight text-gray-900 mb-5 sm:mb-6 leading-tight">
                        Popular Destinations
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                        Explore the most loved travel destinations around the world and find your next adventure
                    </p>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                    {destinations.map((destination) => (
                        <DestinationCard
                            key={destination.id}
                            id={destination.id}
                            image={destination.image}
                            location={destination.location}
                            description={destination.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularDestinations;
