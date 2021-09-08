import { createSlice } from '@reduxjs/toolkit';

import { signUp, signIn, logout, resetUser } from './auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isResetingUser: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [signUp.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.error = null;
      state.isLoggedIn = true;
    },
    [signUp.rejected](state, { payload }) {
      state.error = payload;
    },

    [signIn.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.error = null;
      state.isLoggedIn = true;
    },
    [signIn.rejected](state, { payload }) {
      state.error = payload;
    },

    [logout.fulfilled](state) {
      state.user = initialState.user;
      state.token = null;
      state.error = null;
      state.isLoggedIn = false;
    },
    [logout.rejected](state, { payload }) {
      state.error = payload;
    },

    [resetUser.pending](state) {
      state.isResetingUser = true;
    },
    [resetUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.error = null;
      state.isLoggedIn = true;
      state.isResetingUser = false;
    },
    [resetUser.rejected](state, { payload }) {
      state.isResetingUser = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
