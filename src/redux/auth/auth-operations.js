import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const apiToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/signup', user);
      apiToken.set(data.token);
      return data;
    } catch (error) {
      if (error.response.status === 400) {
        return rejectWithValue('Current user is exist');
      }
      return rejectWithValue(error.message);
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', user);
      apiToken.set(data.token);
      return data;
    } catch (error) {
      if (error.response.status === 400) {
        return rejectWithValue('Wrong password or email');
      }
      return rejectWithValue(error.message);
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      apiToken.unset();
      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const resetUser = createAsyncThunk('auth/reset', async (_, thunk) => {
  const state = thunk.getState();
  const stateToken = state.auth.token;

  if (!stateToken) {
    return thunk.rejectWithValue(null);
  }

  try {
    apiToken.set(stateToken);
    const { data } = await axios.get('/users/current');
    return data;
  } catch (error) {
    return thunk.rejectWithValue(error.message);
  }
});
