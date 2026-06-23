import React from 'react';

const CategoryFilter = ({ category, onChange, searchQuery, setSearchQuery, onReset }) => {
  const categories = [
    'All Categories',
    'Electronics',
    'Books',
    'Fashion',
    'Sports',
    'Home',
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 flex flex-wrap items-center gap-2.5 shadow-sm">
      {/* Category selector dropdown container */}
      <div className="relative flex-1 min-w-[200px]">
        <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
          filter_list
        </span>
        <select
          id="category-select"
          value={category}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border border-outline-variant rounded pl-8 pr-8 py-1.5 font-body-sm text-body-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none appearance-none cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
          expand_more
        </span>
      </div>

      {/* Local search input filter field */}
      <div className="relative flex-[2] min-w-[250px]">
        <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border border-outline-variant rounded pl-8 pr-3 py-1.5 font-body-sm text-body-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
          placeholder="Filter by ID, name, or category attribute..."
        />
      </div>

      {/* Reset dashboard filter state button */}
      <button
        onClick={onReset}
        className="font-label-md text-label-md text-on-surface-variant bg-surface-container hover:bg-surface-container-high px-4 py-1.5 rounded border border-outline-variant transition-colors flex items-center gap-1 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[16px]">restart_alt</span>
        Reset
      </button>
    </div>
  );
};

export default CategoryFilter;
