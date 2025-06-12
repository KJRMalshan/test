import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, User, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button className="lg:hidden p-2 text-gray-500 hover:text-gray-600">
              <Menu size={24} />
            </button>
            <Link to="/" className="text-xl font-bold text-blue-600 ml-2 lg:ml-0">
              JobFinder
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 font-medium">
              Find Jobs
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </Link>
          </nav>

          <div className="hidden lg:flex flex-1 items-center justify-center px-6 max-w-lg">
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for jobs..."
                  className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button className="p-2 text-gray-500 hover:text-gray-600">
                  <Bell size={24} />
                </button>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    <User size={20} className="mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            <Link to="/post-job">
            <Button variant="primary" size="sm" className="hidden sm:inline-flex">
              Post a Job
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;