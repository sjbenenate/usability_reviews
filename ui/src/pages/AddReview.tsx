
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Star, MapPin } from 'lucide-react';
import Header from '../components/Header';

interface AddReviewProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const AddReview = ({ isAuthenticated, onLogin, onLogout }: AddReviewProps) => {
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const categories = [
    { value: 'pools', label: 'Pools' },
    { value: 'hotels', label: 'Hotels' },
    { value: 'recreation', label: 'Recreation' },
    { value: 'parks', label: 'Parks' },
    { value: 'restaurants', label: 'Restaurants' }
  ];

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
            <h1 className="text-2xl font-bold mb-4">Please log in to add a review</h1>
            <Button onClick={onLogin} className="bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the review to your backend
    console.log('Review submitted:', {
      locationName,
      category,
      rating,
      reviewText
    });
    
    // Reset form and navigate back
    setLocationName('');
    setCategory('');
    setRating(0);
    setReviewText('');
    navigate('/dashboard');
  };

  const renderStarRating = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <Star
          key={index}
          className={`h-6 w-6 cursor-pointer transition-colors ${
            starValue <= (hoverRating || rating)
              ? 'text-yellow-400 fill-current'
              : 'text-gray-500 hover:text-yellow-300'
          }`}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header 
        isAuthenticated={isAuthenticated}
        onLogin={onLogin}
        onLogout={onLogout}
      />
      
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Navigation */}
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-200 hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Add New Review</h1>
        </div>

        {/* Review Form */}
        <Card className="p-6 bg-gray-800 border-gray-700 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Name */}
            <div className="space-y-2">
              <Label htmlFor="location-name" className="text-gray-200">Location Name</Label>
              <Input
                id="location-name"
                type="text"
                placeholder="Enter the location name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-200">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value} className="text-gray-100 focus:bg-gray-600">
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label className="text-gray-200">Rating</Label>
              <div className="flex items-center space-x-1">
                {renderStarRating()}
                <span className="ml-2 text-sm text-gray-300">
                  {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select rating'}
                </span>
              </div>
            </div>

            {/* Review Text */}
            <div className="space-y-2">
              <Label htmlFor="review-text" className="text-gray-200">Review</Label>
              <Textarea
                id="review-text"
                placeholder="Share your experience at this location..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                required
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3 pt-4">
              <Link to="/dashboard" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-600 text-gray-200 hover:bg-gray-700"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={!locationName || !category || rating === 0 || !reviewText}
              >
                Submit Review
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default AddReview;
