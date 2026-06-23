import React from 'react';

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="text-center py-12">
      <div className="bg-red-50 p-6 rounded-lg">
        <div className="flex items-center justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
            <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L10 8.586z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load products</h3>
        <p className="text-red-600 mb-4">
          {error || 'Something went wrong. Please try again.'}
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
