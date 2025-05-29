
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPin, Edit, Plus, User } from 'lucide-react';
import Header from '../components/Header';

interface UserDashboardProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const UserDashboard = ({ isAuthenticated, onLogin, onLogout }: UserDashboardProps) => {
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
            <h1 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h1>
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
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Your Dashboard</h1>
            <p className="text-gray-400">Manage your reviews and discover new places</p>
          </div>

          {/* Navigation Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* My Reviews */}
            <Link to="/my-reviews">
              <Card className="p-6 bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer group shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors shadow-md">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">My Reviews</h3>
                  <p className="text-gray-400 text-sm">View all your reviews on an interactive map</p>
                </div>
              </Card>
            </Link>

            {/* Update Places I've Been */}
            <Link to="/update-places">
              <Card className="p-6 bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer group shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors shadow-md">
                    <Edit className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Update Places I've Been</h3>
                  <p className="text-gray-400 text-sm">Manage your visited locations</p>
                </div>
              </Card>
            </Link>

            {/* Add New Review */}
            <Link to="/add-review">
              <Card className="p-6 bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer group shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500 transition-colors shadow-md">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Add New Review</h3>
                  <p className="text-gray-400 text-sm">Share your experience at a new location</p>
                </div>
              </Card>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card className="p-4 bg-gray-800 border-gray-700 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">12</div>
                <div className="text-sm text-gray-400">Total Reviews</div>
              </div>
            </Card>
            <Card className="p-4 bg-gray-800 border-gray-700 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">8</div>
                <div className="text-sm text-gray-400">Places Visited</div>
              </div>
            </Card>
            <Card className="p-4 bg-gray-800 border-gray-700 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">4.2</div>
                <div className="text-sm text-gray-400">Avg Rating</div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
