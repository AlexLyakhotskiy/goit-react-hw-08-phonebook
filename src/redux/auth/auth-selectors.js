// import { createSelector } from 'reselect';

export const getUser = state => state.auth.user;
export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getIsResetingUser = state => state.auth.isResetingUser;
