import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../auth/auth-operations';

import { changeFilter } from './contacts-actions';

import {
  getContacts,
  addContact,
  deleteContact,
  editContact,
} from './contacts-operations';

const initialState = {
  items: [],
  filter: '',
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [changeFilter](state, { payload }) {
      state.filter = payload;
    },

    [logout.fulfilled](state) {
      state.items = [];
      state.filter = '';
    },

    [getContacts.fulfilled](state, { payload }) {
      state.error = null;
      state.items = payload;
      state.loading = false;
    },
    [addContact.fulfilled](state, { payload }) {
      state.error = null;
      state.items.push(payload);
      state.loading = false;
    },
    [deleteContact.fulfilled](state, { payload }) {
      state.error = null;
      const removeIndex = state.items.findIndex(({ id }) => id === payload);
      state.items.splice(removeIndex, 1);
      state.loading = false;
    },
    [editContact.fulfilled](state, { payload }) {
      state.error = null;
      const editIndex = state.items.findIndex(({ id }) => id === payload.id);
      state.items[editIndex] = { ...state.items[editIndex], ...payload };
      state.loading = false;
    },

    [getContacts.pending](state) {
      state.loading = true;
    },
    [addContact.pending](state) {
      state.loading = true;
    },
    [deleteContact.pending](state) {
      state.loading = true;
    },
    [editContact.pending](state) {
      state.loading = true;
    },

    [getContacts.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
    [addContact.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
    [deleteContact.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
    [editContact.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default contactsSlice.reducer;
