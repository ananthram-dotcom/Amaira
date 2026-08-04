import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-8xl font-extrabold text-red-900 tracking-widest">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">Page Not Found</h2>
      <p className="text-gray-500 text-sm mb-8">
        The page you are looking for doesn't exist or has been moved to a new address.
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-red-800 text-white rounded-full font-medium hover:bg-red-700 transition-colors inline-block shadow-md"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
