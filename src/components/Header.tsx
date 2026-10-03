import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { Bell, User, Sun, Moon, Menu, } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

function Header({ onMenuClick, }: HeaderProps) {
  const { isDarkMode, toggleTheme, } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/users": "Users",
    "/products": "Products",
    "/transactions": "Transactions",
    "/analytics": "Analytics",
    "/settings": "Settings",
  };

  const currentTitle = pageTitles[location.pathname] ?? "SaaS Admin Dashboard";

  function handleLogout() {
    logout();
    setIsProfileOpen(false);
    navigate("/login");
  }

  return (
    <header className=" flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 dark:border-slate-800 dark:bg-slate-900">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button type="button" onClick={onMenuClick} aria-label="Open menu" className=" rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden">
          <Menu size={22} />
        </button>

        {/* Page title */}
        <h2 className=" text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
          {currentTitle}
        </h2>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 sm:gap-4">

        {/* Theme Toggle */}
        <button  type="button" onClick={toggleTheme} aria-label="Toggle theme" className=" rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
          {isDarkMode ? (<Sun size={20} />) : (<Moon size={20} />)}
        </button>

        {/* Notifications */}
        <button type="button" aria-label="Notifications" className=" relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
          <Bell size={20} />
          <span  className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"/>
        </button>

        {/* Profile */}
        <div className="relative">
          <button type="button" onClick={() =>setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-slate-100 sm:px-2 dark:hover:bg-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
              <User size={18} />
            </div>
            <span className="hidden text-sm font-medium text-slate-700 sm:block dark:text-slate-200">
              Sam
            </span>
          </button>

          {/* Profile dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-12 z-10 w-48 rounded-lg border border-slate-200 bg-white py-2 shadow-lg dark:border-slate-700 dark:bg-slate-800">
              <button type="button" onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/profile");
                }}
                className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">
                Profile
              </button>

              <button type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/settings");
                }}
                className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">
                Settings
              </button>

              <button type="button" onClick={handleLogout}className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
