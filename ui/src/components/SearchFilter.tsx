
import React from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Search, MapPin, Star } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

const SearchFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedCategories, 
  onCategoriesChange 
}: SearchFilterProps) => {
  const categories = [
    { id: 'pools', label: 'Pools', icon: '🏊' },
    { id: 'hotels', label: 'Hotels', icon: '🏨' },
    { id: 'recreation', label: 'Recreation', icon: '🎯' },
    { id: 'parks', label: 'Parks', icon: '🌳' },
    { id: 'restaurants', label: 'Restaurants', icon: '🍽️' }
  ];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      onCategoriesChange([...selectedCategories, categoryId]);
    } else {
      onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const handleVisitedChange = (checked: boolean) => {
    if (checked) {
      onCategoriesChange([...selectedCategories, 'visited']);
    } else {
      onCategoriesChange(selectedCategories.filter(id => id !== 'visited'));
    }
  };

  const handleNewPlacesChange = (checked: boolean) => {
    if (checked) {
      onCategoriesChange([...selectedCategories, 'new']);
    } else {
      onCategoriesChange(selectedCategories.filter(id => id !== 'new'));
    }
  };

  return (
    <Card className="p-4 bg-gray-800 border-gray-700 shadow-lg">
      {/* Search Box */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* Personal Filters */}
      <div className="mb-4 pb-4 border-b border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="visited"
              checked={selectedCategories.includes('visited')}
              onCheckedChange={(checked) => handleVisitedChange(checked as boolean)}
              className="data-[state=checked]:bg-blue-600 border-gray-600"
            />
            <label
              htmlFor="visited"
              className="text-sm font-medium text-gray-200 cursor-pointer flex items-center space-x-2"
            >
              <MapPin className="h-4 w-4 text-blue-400" />
              <span>Places I have been</span>
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new"
              checked={selectedCategories.includes('new')}
              onCheckedChange={(checked) => handleNewPlacesChange(checked as boolean)}
              className="data-[state=checked]:bg-blue-600 border-gray-600"
            />
            <label
              htmlFor="new"
              className="text-sm font-medium text-gray-200 cursor-pointer flex items-center space-x-2"
            >
              <Star className="h-4 w-4 text-green-400" />
              <span>New places</span>
            </label>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-200 mb-3">Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                className="data-[state=checked]:bg-blue-600 border-gray-600"
              />
              <label
                htmlFor={category.id}
                className="text-sm font-medium text-gray-200 cursor-pointer flex items-center space-x-1"
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SearchFilter;
