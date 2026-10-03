import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Package,
  ArrowLeftRight,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

interface MenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Users",
      path: "/users",
      icon: Users,
    },
    {
      label: "Products",
      path: "/products",
      icon: Package,
    },
    {
      label: "Transactions",
      path: "/transactions",
      icon: ArrowLeftRight,
    },
    {
      label: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Overlay */}

      {isOpen && (
        <div
          className="
        fixed
        inset-0
        z-40
        bg-black/50
        lg:hidden
      "
          onClick={onClose}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
      fixed
      left-0
      top-0
      z-50
      h-screen
      w-64
      border-r
      border-slate-200
      bg-white
      text-slate-700
      transition-transform
      duration-300
      dark:border-slate-800
      dark:bg-slate-900
      dark:text-slate-200

      ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

      lg:translate-x-0
    `}
      >
        {/* Logo */}

        <div
          className="
        flex
        items-center
        justify-between
        p-6
      "
        >
          <h1
            className="
          text-xl
          font-bold
          text-slate-900
          dark:text-white
        "
          >
            SaaS Dashboard
          </h1>

          {/* Close button */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="
          rounded-lg
          p-2
          text-slate-600
          hover:bg-slate-100
          dark:text-slate-300
          dark:hover:bg-slate-800
          lg:hidden
        "
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="space-y-1 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  isActive
                    ? `
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  bg-slate-900
                  px-4
                  py-3
                  text-white
                  dark:bg-slate-700
                `
                    : `
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  px-4
                  py-3
                  text-slate-600
                  hover:bg-slate-100
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                `
                }
              >
                <Icon size={20} />

                <span>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>


  );
}

export default Sidebar;
