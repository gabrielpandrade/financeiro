import { createSlice } from "@reduxjs/toolkit";

export interface InitialStateTypes {
    isDarkMode: boolean;
    isSideBarCollapsed: boolean;
}

const initialState: InitialStateTypes = {
  isDarkMode: true,
  isSideBarCollapsed: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleSideBarCollpased: state => {
      state.isSideBarCollapsed = !state.isSideBarCollapsed;
    }
  },
});

export const { toggleDarkMode, toggleSideBarCollpased } = globalSlice.actions;

export default globalSlice.reducer;