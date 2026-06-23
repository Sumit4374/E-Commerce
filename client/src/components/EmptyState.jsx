import React from 'react';

const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center h-12 w-12 rounded-full bg-gray-200 text-gray-500 mb-4">
        <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L10 8.586z" clipRule="evenodd" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-500">
        Try changing your filter criteria or check back later.
      </p>
    </div>
  );
};

export default EmptyState;
