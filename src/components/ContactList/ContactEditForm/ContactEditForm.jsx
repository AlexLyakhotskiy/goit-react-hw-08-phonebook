import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editContact } from '../../../redux/contacts/contacts-operations';
import { getContacts } from '../../../redux/contacts/contacts-selectors';

export default function ContactEditForm({ id, name, number, onToggle }) {
  const [contact, setContact] = useState({ name, number });

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const preparingContactToEdit = { ...contact, id };

    if (findDuplicateContact(preparingContactToEdit)) {
      alert('wrong');
      return;
    }

    dispatch(editContact(preparingContactToEdit));
    onToggle();
  };

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  function findDuplicateContact(contact) {
    const contactToEdit = contact.name.toLowerCase();
    return contacts.find(
      el => el.name.toLowerCase() === contactToEdit && el.id !== contact.id,
    );
  }

  return (
    <li>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            onChange={handleChangeInput}
            type="text"
            name="name"
            value={contact.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          />
        </label>
        <label>
          <input
            onChange={handleChangeInput}
            type="tel"
            name="number"
            value={contact.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          />
        </label>
        <button type="submit" aria-label="save-button">
          save
        </button>
      </form>
      <button onClick={onToggle} type="button" aria-label="exit-button">
        exit
      </button>
    </li>
  );
}
