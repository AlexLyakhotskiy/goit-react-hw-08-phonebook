import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/contacts');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/contacts', contact);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (contact, { rejectWithValue }) => {
    const { name, number, id } = contact;
    const editContact = {};

    Object.entries({ name, number }).forEach(([key, value]) => {
      if (value.trim()) {
        editContact[key] = value;
      }
    });

    try {
      await axios.patch(`/contacts/${id}`, editContact);
      return { id, ...editContact };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
