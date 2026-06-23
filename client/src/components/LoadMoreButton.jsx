import React from 'react';

const LoadMoreButton = ({ onClick, loading, hasMore }) => {
  if (!hasMore) return null;

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full py-3 px-6 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {loading ? 'Loading...' : 'Load More'}
    </button>
  );
};

export default LoadMoreButton;
