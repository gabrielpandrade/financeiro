"use client";

import { toggleSidebar } from "@/lib/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  ArrowUpDown,
  CreditCard,
  Folder,
  Layout,
  LucideIcon,
  Menu,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link prefetch={true} href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }
      }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />

        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.ui.isSidebarCollapsed
  );

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>Logo</div>
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          APF
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={handleToggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/transactions"
          icon={ArrowUpDown}
          label="Transações"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/categories"
          icon={Folder}
          label="Categorias"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/tags"
          icon={Tag}
          label="Etiquetas"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/methods"
          icon={CreditCard}
          label="Métodos de Pagamento"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">&copy; 2025 APF</p>
      </div>
    </div>
  );
};

export default Sidebar;
