import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async () => {
    const { data } = await axios.get('/contacts');
    return data;
  },
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    const { data } = await axios.post('/contacts', contact);
    return data;
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await axios.delete(`/contacts/${contactId}`);
    return contactId;
  },
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async contact => {
    const { name, number, id } = contact;
    const editContact = {};

    Object.entries({ name, number }).forEach(([key, value]) => {
      if (value.trim()) {
        editContact[key] = value;
      }
    });

    await axios.patch(`/contacts/${id}`, editContact);
    return { id, ...editContact };
  },
);
