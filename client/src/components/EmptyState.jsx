const EmptyState = () => {
  return (
    <div className="text-center py-12 bg-surface-container-lowest border border-outline-variant rounded-lg p-8 shadow-sm">
      <div className="inline-flex items-center justify-center h-12 w-12 rounded bg-surface-container text-on-surface-variant mb-4">
        <span className="material-symbols-outlined text-[24px]">database_off</span>
      </div>
      <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">No products found</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md mx-auto">
        No records matched your search query or filter criteria. Try resetting the filters or modifying your query keywords.
      </p>
    </div>
  );
};

export default EmptyState;
