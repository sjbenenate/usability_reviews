
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { LogIn, LogOut, User, Home } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Header = ({ isAuthenticated, onLogin, onLogout }: HeaderProps) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <h1 className="text-xl font-bold text-blue-400">
            ReviewMap
          </h1>
        </Link>

        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1 border-gray-600 text-gray-200 hover:bg-gray-700 shadow-sm"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-700 rounded-lg shadow-sm">
                <User className="h-4 w-4 text-gray-300" />
                <span className="text-sm text-gray-200 hidden sm:inline">User</span>
              </div>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 border-gray-600 text-gray-200 hover:bg-gray-700 shadow-sm"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={onLogin}
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 shadow-md"
              size="sm"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
