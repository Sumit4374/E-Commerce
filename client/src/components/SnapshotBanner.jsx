import React from 'react';

const SnapshotBanner = ({ snapshotTime }) => {
  if (!snapshotTime) return null;

  const date = new Date(snapshotTime);
  const formatted = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 flex items-center">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L10 8.586z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">Browsing Snapshot</p>
        <p className="text-sm text-gray-500">{formatted} UTC</p>
      </div>
    </div>
  );
};

export default SnapshotBanner;
