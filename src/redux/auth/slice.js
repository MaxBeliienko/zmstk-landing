import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, loginUser, logoutUser } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Перевірка /me
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      // Логін
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Логаут
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
