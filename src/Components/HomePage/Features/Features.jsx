import React from "react";
import {
  MapPlus,
  Globe2,
  Wallet,
  MessageSquare,
  Users,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: MapPlus,
      title: "Create Trips",
      description: "Create and manage your travel plans easily.",
    },
    {
      id: 2,
      icon: Globe2,
      title: "Explore Places",
      description: "Discover and add new destinations.",
    },
    {
      id: 3,
      icon: Wallet,
      title: "Track Budget",
      description: "Monitor expenses and control spending.",
    },
    {
      id: 4,
      icon: MessageSquare,
      title: "Reviews",
      description: "Write and read traveler reviews.",
    },
    {
      id: 5,
      icon: Users,
      title: "Group Planning",
      description: "Plan trips together with friends.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Travel Management Features
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Everything you need to plan and manage your trips efficiently.
          </p>
        </div>

        {/* 5 Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">

          {features.map((feature) => (
            <div
              key={feature.id}
              className="group bg-white border border-gray-200 rounded-2xl p-5 
              text-center transition-all duration-300 
              hover:shadow-lg hover:-translate-y-1 hover:border-indigo-400"
            >
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 flex items-center justify-center 
                rounded-xl bg-indigo-50 group-hover:bg-indigo-600 
                transition-all duration-300">
                  <feature.icon
                    size={22}
                    className="text-indigo-600 group-hover:text-white transition-all duration-300"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;