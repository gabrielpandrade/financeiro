import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  idToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  idToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; idToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.idToken = null;
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
export const authReducer = authSlice.reducer;
