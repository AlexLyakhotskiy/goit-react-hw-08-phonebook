import { createSlice } from '@reduxjs/toolkit';

import { changeFilter } from './contacts-actions';

import { getContacts, addContact, deleteContact } from './contacts-operations';

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

    [getContacts.fulfilled](state, { payload }) {
      state.items = payload;
      state.loading = false;
    },
    [addContact.fulfilled](state, { payload }) {
      state.items.push(payload);
      state.loading = false;
    },
    [deleteContact.fulfilled](state, { payload }) {
      const removeItemIndex = state.items.findIndex(({ id }) => id === payload);
      state.items.splice(removeItemIndex, 1);
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
  },
});

export default contactsSlice.reducer;
