import React from 'react';

const Navbar = ({ onMenuToggle, searchQuery, setSearchQuery, totalLoaded = 0 }) => {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant fixed top-0 w-full z-30 flex items-center justify-between px-6 md:px-8 h-16 md:w-[calc(100%-16rem)]">
      
      {/* Left section: Hamburger menu for mobile, page title & metadata badges */}
      <div className="flex items-center gap-4">
        {/* Menu button for mobile */}
        <button
          onClick={onMenuToggle}
          aria-label="Toggle menu"
          className="p-2 -ml-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full active:scale-95 flex items-center justify-center md:hidden cursor-pointer"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="font-headline-md text-headline-md font-semibold text-primary">
          Product Catalog
        </div>

        {/* Technical metadata badges (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-4 ml-4">
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md bg-surface-container px-2 py-1 rounded">
            <span className="material-symbols-outlined text-[14px]">database</span>
            <span>Size: 200k+</span>
          </div>
          <div className="flex items-center gap-1.5 text-secondary font-label-md text-label-md bg-secondary-fixed/20 px-2 py-1 rounded">
            <span className="material-symbols-outlined text-[14px]">history</span>
            <span>Snapshot: Active</span>
          </div>
        </div>
      </div>

      {/* Right section: Search bar and action buttons */}
      <div className="flex items-center gap-4 flex-1 justify-end">
        {/* Search input field (hidden on extra small screens) */}
        <div className="relative hidden sm:block max-w-xs w-full ml-4">
          <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded pl-8 pr-3 py-1 font-body-sm text-body-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
            placeholder="Search catalog ID, name..."
          />
        </div>

        {/* Navigation action icons */}
        <div className="flex items-center gap-1">
          <button
            aria-label="notifications"
            className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-1.5 rounded active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button
            aria-label="settings"
            className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-1.5 rounded active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button
            aria-label="help"
            className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-1.5 rounded active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>

        {/* Divider and user details */}
        <div className="h-6 w-px bg-outline-variant mx-1"></div>
        
        <button className="text-secondary font-label-md text-label-md hover:bg-surface-container-low px-2 py-1 rounded transition-colors hidden sm:block cursor-pointer">
          Docs
        </button>

        <img
          alt="User Profile"
          className="w-8 h-8 rounded-full border border-outline-variant object-cover ml-1"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMLCMotPPu0gCBEfriVX5e9EmJtRp1mvEQjcrxfSOsIAFdUjnsyxlWshOGIJ4SO2Mv3jaT9xM41kgbW69IOsyaDN7ranA4NsJQJX7bK-r0mGZT9WGxwiS189pAVGfszvdhWshJxY7ftxESVX7ZAkGvF4KBYAsJUZDN0VggwjGTq60AE8TLX8gz6v6Q7JwFDoM2sOj0YH7TVByBIttoq97ouerVwsdsME2RzkGpR2qdSaEjgsMXG96-RTcOCBN-jkD1BB85xCyRJIkF"
        />
      </div>
    </header>
  );
};

export default Navbar;
