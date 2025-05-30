
import React, { useState } from 'react';
import Map from '../components/Map';
import ReviewList from '../components/ReviewList';
import SearchFilter from '../components/SearchFilter';
import AuthModal from '../components/AuthModal';
import AddReviewModal from '../components/AddReviewModal';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);

  const handleAddReview = () => {
    if (isAuthenticated) {
      setShowAddReviewModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header 
        isAuthenticated={isAuthenticated}
        onLogin={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Map Section */}
        <div className="relative">
          <Map 
            searchTerm={searchTerm}
            selectedCategories={selectedCategories}
            onLocationSelect={setSelectedLocation}
          />
          
          {/* Floating Add Review Button */}
          <Button
            onClick={handleAddReview}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 z-10 shadow-lg"
            size="icon"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
        />

        {/* Reviews List */}
        <ReviewList
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          selectedLocation={selectedLocation}
        />
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />

      <AddReviewModal
        isOpen={showAddReviewModal}
        onClose={() => setShowAddReviewModal(false)}
        selectedLocation={selectedLocation}
      />
    </div>
  );
};

export default Index;
