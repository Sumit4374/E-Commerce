const Sidebar = ({ isOpen, onClose, activeTab = 'catalog', setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'catalog', label: 'Catalog', icon: 'inventory_2' },
    { id: 'inventory', label: 'Inventory', icon: 'warehouse' },
    { id: 'analytics', label: 'Analytics', icon: 'monitoring' },
    { id: 'logs', label: 'Logs', icon: 'terminal' },
  ];

  const bottomItems = [
    { id: 'profile', label: 'Profile', icon: 'account_circle' },
    { id: 'logout', label: 'Logout', icon: 'logout' },
  ];

  const renderNavLinks = (items) => (
    items.map((item) => {
      const isActive = activeTab === item.id;
      return (
        <li key={item.id}>
          <button
            onClick={() => {
              if (setActiveTab) setActiveTab(item.id);
              if (onClose) onClose();
            }}
            className={`w-full text-left flex items-center gap-4 px-6 py-2 border-l-2 hover:bg-surface-container-highest transition-all duration-200 ease-in-out rounded-r-lg ${
              isActive
                ? 'bg-secondary-container text-secondary border-secondary font-medium'
                : 'text-on-surface-variant border-transparent font-normal'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
            <span className="font-body-md text-body-md">{item.label}</span>
          </button>
        </li>
      );
    })
  );

  const sidebarContent = (
    <div className="h-full flex flex-col py-6 bg-surface-container-low border-r border-outline-variant">
      {/* Brand Logo & Info */}
      <div className="px-6 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-white shrink-0">
          <span className="material-symbols-outlined text-[20px] font-bold">hex</span>
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Engineering</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant">v2.4.0-stable</p>
        </div>
      </div>

      {/* New Product CTA */}
      <div className="px-6 mb-4">
        <button className="w-full bg-secondary text-on-secondary font-label-md text-label-md py-2 px-4 rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer">
          <span className="material-symbols-outlined text-[16px]">add</span>
          New Product
        </button>
      </div>

      {/* Main Navigation */}
      <ul className="flex-1 flex flex-col gap-1 pr-2">
        {renderNavLinks(menuItems)}
      </ul>

      {/* Bottom Footer Links */}
      <ul className="flex flex-col gap-1 pr-2 mt-auto border-t border-outline-variant pt-4">
        {renderNavLinks(bottomItems)}
      </ul>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="fixed left-0 top-0 h-full w-64 z-40 hidden md:block">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar (Slide-over Drawer) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/40 transition-opacity"
            onClick={onClose}
          />
          {/* Drawer Element */}
          <aside className="relative flex flex-col w-64 max-w-xs h-full bg-surface-container-low shadow-xl z-50 animate-slide-in">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
