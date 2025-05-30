
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Star, MapPin } from 'lucide-react';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: {lat: number, lng: number} | null;
}

const AddReviewModal = ({ isOpen, onClose, selectedLocation }: AddReviewModalProps) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the review to your backend
    console.log('Review submitted:', {
      locationName,
      category,
      rating,
      reviewText,
      location: selectedLocation
    });
    
    // Reset form
    setLocationName('');
    setCategory('');
    setRating(0);
    setReviewText('');
    onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-400">
            Add New Review
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Location Info */}
          {selectedLocation && (
            <div className="bg-blue-900/30 border border-blue-700 p-3 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 text-sm text-blue-300">
                <MapPin className="h-4 w-4" />
                <span>
                  Selected location: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                </span>
              </div>
            </div>
          )}

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
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 shadow-sm"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-gray-200">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100 shadow-sm">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 shadow-lg">
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
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-200 hover:bg-gray-700 shadow-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-md"
              disabled={!locationName || !category || rating === 0 || !reviewText}
            >
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewModal;
