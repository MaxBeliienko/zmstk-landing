export const selectUser = (state) => state.auth.user;
export const selectIsAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsLoggedIn = (state) => Boolean(state.auth.user);
