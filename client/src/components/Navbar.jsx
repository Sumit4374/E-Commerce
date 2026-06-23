import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-800">Product Catalog</h1>
            <p className="text-sm text-gray-500">Browsing 200,000+ products</p>
          </div>
          <div className="hidden md:block">
            {/* Placeholder for user actions */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
