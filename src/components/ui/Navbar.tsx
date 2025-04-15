"use client";

import { toggleDarkMode, toggleSidebar } from "@/lib/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Menu, Moon,  Settings, Sun } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
    const dispatch = useAppDispatch();

    const isDarkMode = useAppSelector((state) => state.ui.isDarkMode);

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode());
    }

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    }

    return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={handleToggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button> 
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={handleToggleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <div>Profile</div>
            <span className="font-semibold">Teste da Silva</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
