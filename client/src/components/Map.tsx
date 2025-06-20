'use client';

import React, { useState } from 'react';
import { Card } from './ui/card';

interface MapProps {
  searchTerm: string;
  selectedCategories: string[];
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

const Map = ({
  searchTerm,
  selectedCategories,
  onLocationSelect,
}: MapProps) => {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  // Mock locations with reviews
  // TODO backend fetch
  const locations = [
    {
      id: 1,
      lat: 40.7128,
      lng: -74.006,
      name: 'Central Park Pool',
      category: 'pools',
      reviews: 23,
    },
    {
      id: 2,
      lat: 40.7589,
      lng: -73.9851,
      name: 'Plaza Hotel',
      category: 'hotels',
      reviews: 156,
    },
    {
      id: 3,
      lat: 40.7505,
      lng: -73.9934,
      name: 'Times Square Cafe',
      category: 'restaurants',
      reviews: 89,
    },
    {
      id: 4,
      lat: 40.7829,
      lng: -73.9654,
      name: 'Riverside Park',
      category: 'parks',
      reviews: 45,
    },
    {
      id: 5,
      lat: 40.741,
      lng: -73.9897,
      name: 'Chelsea Recreation Center',
      category: 'recreation',
      reviews: 34,
    },
  ];

  const filteredLocations = locations.filter((location) => {
    const matchesSearch = location.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(location.category);
    return matchesSearch && matchesCategory;
  });

  const handleMarkerClick = (location: any) => {
    setSelectedMarker(location.id);
    onLocationSelect({ lat: location.lat, lng: location.lng });
  };

  return (
    <Card className="relative h-80 bg-gray-800 overflow-hidden border-gray-700 shadow-lg">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gray-700 opacity-60"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      {/* Map Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-100 mb-1">
            Location Reviews
          </h2>
          <p className="text-sm text-gray-300">Tap markers to view reviews</p>
        </div>

        {/* Markers Container */}
        <div className="flex-1 relative">
          {filteredLocations.map((location, index) => (
            <div
              key={location.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                selectedMarker === location.id
                  ? 'scale-125 z-20'
                  : 'hover:scale-110 z-10'
              }`}
              style={{
                left: `${20 + ((index * 15) % 60)}%`,
                top: `${30 + ((index * 20) % 40)}%`,
              }}
              onClick={() => handleMarkerClick(location)}
            >
              {/* Marker */}
              <div
                className={`w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-xs font-bold text-white ${
                  selectedMarker === location.id
                    ? 'bg-red-500 shadow-lg'
                    : 'bg-blue-500 shadow-md'
                }`}
              >
                {location.reviews}
              </div>

              {/* Location Name Tooltip */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <div className="bg-gray-800 border border-gray-600 px-2 py-1 rounded shadow-lg text-xs font-medium text-gray-100">
                  {location.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 mt-4 shadow-md">
          <div className="flex items-center justify-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
              <span className="text-gray-200">Locations</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
              <span className="text-gray-200">Selected</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Map;
