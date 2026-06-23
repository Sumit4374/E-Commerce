import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-96">
      <div className="p-4">
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-2 bg-gray-200 rounded w-2/3 mb-2 animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="space-y-1">
            <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
