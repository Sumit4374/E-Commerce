import React from 'react';

const CategoryFilter = ({ category, onChange }) => {
  const categories = [
    'All Categories',
    'Electronics',
    'Books',
    'Fashion',
    'Sports',
    'Home',
  ];

  return (
    <div className="mb-6">
      <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Category
      </label>
      <div className="relative">
        <select
          id="category-select"
          value={category}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat.toLowerCase().replace(' ', '-')}>
              {cat}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
