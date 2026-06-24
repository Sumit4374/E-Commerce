const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="bg-error-container/20 border border-error/20 rounded-lg p-6 text-center max-w-lg mx-auto my-6 shadow-sm">
      <div className="flex items-center justify-center mb-4">
        <div className="h-12 w-12 rounded bg-error-container text-error flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px]">sync_problem</span>
        </div>
      </div>
      <h3 className="font-headline-md text-headline-md font-bold text-error mb-2">Unable to load products</h3>
      <p className="font-body-sm text-body-sm text-on-error-container mb-4">
        {error || 'An unexpected connection issue occurred while fetching the snapshot data.'}
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 border border-error bg-error text-on-error hover:opacity-90 transition-opacity font-label-md text-label-md rounded shadow-sm cursor-pointer"
      >
        <span className="material-symbols-outlined text-[16px]">sync</span>
        Retry Fetch
      </button>
    </div>
  );
};

export default ErrorState;
