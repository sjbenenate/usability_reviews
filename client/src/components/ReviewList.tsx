'use client';

import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Star, MapPin, Clock } from 'lucide-react';

interface ReviewListProps {
  searchTerm: string;
  selectedCategories: string[];
  selectedLocation: { lat: number; lng: number } | null;
}

const ReviewList = ({
  searchTerm,
  selectedCategories,
  selectedLocation,
}: ReviewListProps) => {
  // Mock review data
  // TODO backend fetch
  const reviews = [
    {
      id: 1,
      locationName: 'Central Park Pool',
      category: 'pools',
      rating: 4.5,
      reviewText:
        'Amazing pool facility with clean water and great amenities. Perfect for family visits!',
      author: 'Sarah M.',
      date: '2 days ago',
      image: '🏊‍♀️',
    },
    {
      id: 2,
      locationName: 'Plaza Hotel',
      category: 'hotels',
      rating: 5.0,
      reviewText:
        'Luxurious stay with exceptional service. The rooms are beautifully decorated and the staff is incredibly helpful.',
      author: 'John D.',
      date: '1 week ago',
      image: '🏨',
    },
    {
      id: 3,
      locationName: 'Times Square Cafe',
      category: 'restaurants',
      rating: 4.2,
      reviewText:
        'Great food and atmosphere right in the heart of the city. The coffee is excellent and the pastries are fresh.',
      author: 'Emily R.',
      date: '3 days ago',
      image: '☕',
    },
    {
      id: 4,
      locationName: 'Riverside Park',
      category: 'parks',
      rating: 4.7,
      reviewText:
        'Beautiful park with stunning river views. Perfect for jogging, walking, or just relaxing with family.',
      author: 'Mike C.',
      date: '5 days ago',
      image: '🌳',
    },
    {
      id: 5,
      locationName: 'Chelsea Recreation Center',
      category: 'recreation',
      rating: 4.0,
      reviewText:
        'Well-maintained facilities with modern equipment. Great classes and friendly staff.',
      author: 'Lisa K.',
      date: '1 week ago',
      image: '🎯',
    },
  ];

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(review.category);
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      pools: 'bg-blue-100 text-blue-800',
      hotels: 'bg-purple-100 text-purple-800',
      restaurants: 'bg-orange-100 text-orange-800',
      parks: 'bg-green-100 text-green-800',
      recreation: 'bg-pink-100 text-pink-800',
    };
    return (
      colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          Reviews ({filteredReviews.length})
        </h2>
        {selectedLocation && (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            <MapPin className="h-3 w-3 mr-1" />
            Location Selected
          </Badge>
        )}
      </div>

      <div className="grid gap-4">
        {filteredReviews.map((review) => (
          <Card
            key={review.id}
            className="p-6 hover:shadow-lg transition-shadow duration-200 bg-white/80 backdrop-blur-sm"
          >
            <div className="flex items-start space-x-4">
              {/* Review Image/Icon */}
              <div className="text-3xl">{review.image}</div>

              {/* Review Content */}
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-800">
                      {review.locationName}
                    </h3>
                    <Badge className={getCategoryColor(review.category)}>
                      {review.category}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-600 leading-relaxed">
                  {review.reviewText}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-medium">{review.author}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <Card className="p-12 text-center bg-white/80 backdrop-blur-sm">
          <div className="text-gray-500">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium mb-2">No reviews found</h3>
            <p className="text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReviewList;
