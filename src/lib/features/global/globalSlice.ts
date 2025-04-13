import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setIsSideBarCollpased: (state, action: PayloadAction<boolean>) => {
      state.isSideBarCollapsed = action.payload;
    }
  },
});

export const { setIsDarkMode, setIsSideBarCollpased } = globalSlice.actions;

export default globalSlice.reducer;