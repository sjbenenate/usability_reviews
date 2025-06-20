import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
//import { Button } from '@/ui/button';
//import { LogIn, LogOut, User, Home } from 'lucide-react';
import AuthButtons from '@/components/AuthButtons';
//import { currentUser } from '@clerk/nextjs/server';
import ThemeToggle from '@/components/theme/ThemeToggle';

const HomeLink = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div>
        <Image
          className="w-8 h-8 icon-brand-color"
          alt="wheelchair logo"
          src="/wheelchair-logo.svg"
          width={25}
          height={25}
          priority
        />
      </div>
      <h1 className="text-xl font-bold text-brand-primary">ParaAccess</h1>
    </Link>
  );
};

const Header = async () => {
  /*const lovableLogIn = () => {
    if (isAuthenticated) {
      return (
        <div className="flex items-center space-x-2">
          <Link href="/dashboard">
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
      );
    } else {
      return (
        <Button
          onClick={onLogin}
          className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 shadow-md"
          size="sm"
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Login</span>
        </Button>
      );
    }
  };*/

  //const user = await currentUser();
  //console.log(user);

  return (
    <header className="border-b sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <HomeLink />
        <ThemeToggle />
        <AuthButtons />
      </div>
    </header>
  );
};

export default Header;
