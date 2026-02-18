import React from 'react';
import { Brain, Wallet, Star, Sparkles } from 'lucide-react';

const Features = () => {
    const features = [
        {
            id: 1,
            icon: Brain,
            title: 'Smart Trip Planner',
            description: 'Plan your entire trip with AI-powered recommendations tailored to your preferences.'
        },
        {
            id: 2,
            icon: Wallet,
            title: 'Budget Tracker',
            description: 'Track expenses and stay within your travel budget with detailed expense management.'
        },
        {
            id: 3,
            icon: Star,
            title: 'User Reviews',
            description: 'Read authentic reviews from verified travelers to make informed decisions.'
        },
        {
            id: 4,
            icon: Sparkles,
            title: 'Hidden Places Recommendation',
            description: 'Discover secret destinations off the beaten path and create unforgettable memories.'
        }
    ];

    return (
        <section className="py-20  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
            {/* Decorative gradient blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -ml-48 -mb-48"></div>
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 sm:mb-20 lg:mb-24">
                    <h2 className="text-5xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6">
                        Why Choose Us
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                        Everything you need to plan, book, and enjoy your perfect travel experience
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-7 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 border border-white/50 hover:border-blue-200/50"
                        >
                            {/* Hover glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 rounded-2xl transition-all duration-500"></div>

                            {/* Icon */}
                            <div className="mb-5 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 relative z-20 inline-block">
                                <feature.icon size={56} className="text-blue-600 group-hover:text-indigo-600 transition-colors duration-500" strokeWidth={1.5} />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg sm:text-xl font-semibold tracking-wide text-gray-900 mb-3 relative z-20">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light relative z-20">
                                {feature.description}
                            </p>

                            {/* Animated accent line */}
                            <div className="mt-6 flex items-center gap-3 relative z-20">
                                <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 group-hover:w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
