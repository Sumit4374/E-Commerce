const LoadMoreButton = ({ onClick, loading, hasMore, loadedCount = 0 }) => {
  if (!hasMore) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-6 border-t border-outline-variant mt-6">
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          All products loaded. Total: <span className="font-medium text-on-surface">{loadedCount}</span>
        </p>
      </div>
    );
  }

  // A mockup techy cursor matching the Stitch design
  const mockupCursor = 'eyJpZCI6MT' + (loadedCount > 0 ? (loadedCount * 3).toString(16) : 'z') + 'fQ';

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 border-t border-outline-variant mt-6">
      <button
        onClick={onClick}
        disabled={loading}
        className="bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md px-6 py-2 rounded hover:border-secondary hover:text-secondary transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>
          sync
        </span>
        {loading ? 'Loading...' : 'Load More'}
      </button>

      <div className="flex flex-wrap items-center justify-center gap-4 text-on-surface-variant">
        <div className="font-label-sm text-label-sm flex items-center gap-1.5 bg-surface-container px-2 py-0.5 rounded">
          <span className="uppercase tracking-wider">Cursor:</span>
          <span className="font-mono bg-surface-container-lowest px-1 rounded-sm border border-outline-variant/50">
            {mockupCursor}
          </span>
        </div>
        <div className="font-label-sm text-label-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          Loaded: <span className="font-medium text-on-surface">{loadedCount}</span>
        </div>
        <div className="font-label-sm text-label-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
          Available: <span className="font-medium text-on-surface">204,512</span>
        </div>
      </div>
    </div>
  );
};

export default LoadMoreButton;
