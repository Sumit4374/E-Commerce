const SkeletonCard = () => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-5 flex flex-col gap-4 shadow-sm animate-pulse">
      {/* Header tags skeleton */}
      <div className="flex items-start justify-between">
        <div className="h-5 bg-surface-container-high rounded w-24"></div>
        <div className="h-4 bg-surface-container-high rounded w-16"></div>
      </div>

      {/* Main body skeleton */}
      <div className="mt-1 flex-1 flex flex-col gap-2">
        <div className="h-6 bg-surface-container-highest rounded w-3/4"></div>
        <div className="h-4 bg-surface-container-high rounded w-full mt-2"></div>
        <div className="h-4 bg-surface-container-high rounded w-5/6"></div>
      </div>

      {/* Footer metadata skeleton */}
      <div className="mt-auto pt-4 border-t border-outline-variant/50 flex items-end justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="h-3 bg-surface-container-high rounded w-12"></div>
          <div className="h-4 bg-surface-container-highest rounded w-16"></div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="h-3 bg-surface-container-high rounded w-12"></div>
          <div className="h-4 bg-surface-container-highest rounded w-14"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
