
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { ArrowLeft, MapPin, Check } from 'lucide-react';
import Header from '../components/Header';

interface UpdatePlacesProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const UpdatePlaces = ({ isAuthenticated, onLogin, onLogout }: UpdatePlacesProps) => {
  const [visitedPlaces, setVisitedPlaces] = useState<string[]>(['central-park-pool', 'plaza-hotel']);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock places data
  const places = [
    { id: 'central-park-pool', name: 'Central Park Pool', category: 'pools' },
    { id: 'plaza-hotel', name: 'Plaza Hotel', category: 'hotels' },
    { id: 'times-square-cafe', name: 'Times Square Cafe', category: 'restaurants' },
    { id: 'riverside-park', name: 'Riverside Park', category: 'parks' },
    { id: 'chelsea-recreation', name: 'Chelsea Recreation Center', category: 'recreation' }
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
            <h1 className="text-2xl font-bold mb-4">Please log in to update your places</h1>
            <Button onClick={onLogin} className="bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handlePlaceToggle = (placeId: string, checked: boolean) => {
    if (checked) {
      setVisitedPlaces([...visitedPlaces, placeId]);
    } else {
      setVisitedPlaces(visitedPlaces.filter(id => id !== placeId));
    }
  };

  const handleSave = () => {
    // Here you would save to your backend
    console.log('Saving visited places:', visitedPlaces);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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
          <h1 className="text-2xl font-bold text-white">Update Places I've Been</h1>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <Card className="p-4 mb-6 bg-green-900 border-green-700 shadow-lg">
            <div className="flex items-center space-x-2 text-green-200">
              <Check className="h-5 w-5" />
              <span>Your places have been updated successfully!</span>
            </div>
          </Card>
        )}

        {/* Places List */}
        <Card className="p-6 bg-gray-800 border-gray-700 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Select places you have visited:</h2>
          
          <div className="space-y-4 mb-6">
            {places.map((place) => (
              <div key={place.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <Checkbox
                  id={place.id}
                  checked={visitedPlaces.includes(place.id)}
                  onCheckedChange={(checked) => handlePlaceToggle(place.id, checked as boolean)}
                  className="data-[state=checked]:bg-blue-600 border-gray-600"
                />
                <div className="flex items-center space-x-2 flex-1">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <label
                    htmlFor={place.id}
                    className="text-gray-200 cursor-pointer font-medium"
                  >
                    {place.name}
                  </label>
                  <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                    {place.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <Link to="/dashboard">
              <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-gray-700">
                Cancel
              </Button>
            </Link>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default UpdatePlaces;
