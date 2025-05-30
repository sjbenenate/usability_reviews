
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Map from '../components/Map';
import ReviewList from '../components/ReviewList';

interface MyReviewsProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const MyReviews = ({ isAuthenticated, onLogin, onLogout }: MyReviewsProps) => {
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header 
          isAuthenticated={isAuthenticated}
          onLogin={onLogin}
          onLogout={onLogout}
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-gray-300">
            <h1 className="text-2xl font-bold mb-4">Please log in to view your reviews</h1>
            <Button onClick={onLogin} className="bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header 
        isAuthenticated={isAuthenticated}
        onLogin={onLogin}
        onLogout={onLogout}
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-200 hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">My Reviews</h1>
        </div>

        {/* Map Section */}
        <Map 
          searchTerm=""
          selectedCategories={['user-reviews']}
          onLocationSelect={setSelectedLocation}
        />

        {/* Reviews List */}
        <ReviewList
          searchTerm=""
          selectedCategories={['user-reviews']}
          selectedLocation={selectedLocation}
        />
      </main>
    </div>
  );
};

export default MyReviews;
