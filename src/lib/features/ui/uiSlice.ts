import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isDarkMode: boolean;
  isSidebarCollapsed: boolean;
}

const initialState: UIState = {
  isDarkMode: false,
  isSidebarCollapsed: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
  },
});

export const { toggleDarkMode, toggleSidebar } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
