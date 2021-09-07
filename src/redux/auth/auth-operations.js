import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const signUp = createAsyncThunk('auth/signUp', async user => {
  const { data } = await axios.post('/users/signup', user);
  apiToken.set(data.token);
  return data;
});

export const signIn = createAsyncThunk('auth/signIn', async user => {
  const { data } = await axios.post('/users/login', user);
  apiToken.set(data.token);
  return data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post('/users/logout');
  apiToken.unset();
  return;
});

export const resetUser = createAsyncThunk('auth/reset', async (_, thunk) => {
  const state = thunk.getState();
  const stateToken = state.auth.token;

  if (!stateToken) {
    return thunk.rejectWithValue();
  }

  apiToken.set(stateToken);
  const { data } = await axios.get('/users/current');
  return data;
});
