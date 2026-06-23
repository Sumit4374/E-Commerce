import React from 'react';

const SnapshotBanner = ({ snapshotTime }) => {
  if (!snapshotTime) return null;

  const date = new Date(snapshotTime);
  const formatted = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden shadow-sm">
      {/* Subtle indicator bar on the left side */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>

      <div className="flex items-center gap-4 z-10">
        {/* Banner Dataset Icon container */}
        <div className="bg-secondary-fixed text-on-secondary-fixed p-2 rounded flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">dataset</span>
        </div>

        <div>
          {/* Header & Status badges */}
          <h2 className="font-headline-md text-headline-md font-medium text-on-surface flex items-center gap-2">
            Browsing Snapshot
            <span className="font-label-sm text-label-sm bg-surface-container text-on-surface-variant px-1.5 py-0.5 rounded border border-outline-variant">
              Read Only
            </span>
          </h2>

          {/* Snapshot metadata */}
          <div className="flex items-center gap-4 mt-1">
            <p className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {formatted} UTC
            </p>
            <p className="font-label-md text-label-md text-secondary flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Consistent
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnapshotBanner;
