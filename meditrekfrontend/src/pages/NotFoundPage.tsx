import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import CapsuleAnimation from '../components/CapsuleAnimation';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Floating Capsule in Space */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-full blur-3xl scale-150"></div>
            <CapsuleAnimation size="large" color="blue" floating />
            <div className="absolute -top-4 -right-4">
              <CapsuleAnimation size="small" color="mint" floating />
            </div>
            <div className="absolute -bottom-2 -left-6">
              <CapsuleAnimation size="small" color="purple" floating />
            </div>
          </div>
        </div>

        <h1 className="text-8xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Looks like this capsule has drifted into uncharted space. 
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Links</h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/login" className="text-blue-600 hover:text-blue-700 transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 transition-colors">
              Sign Up
            </Link>
            <Link to="/about" className="text-blue-600 hover:text-blue-700 transition-colors">
              About Us
            </Link>
          </div>
        </div>

        {/* Branding */}
        <div className="mt-12">
          <div className="flex items-center justify-center space-x-3 text-gray-400">
            <CapsuleAnimation size="small" />
            <span className="text-lg font-semibold">Meditrek</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Advanced Medical Diagnostics Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;