import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteContact } from '../../redux/contacts/contacts-operations';
import { getFiltredContact } from '../../redux/contacts/contacts-selectors';

import styles from './ContactList.module.css';

const ContactList = () => {
  const filtredContacts = useSelector(getFiltredContact);
  const dispatch = useDispatch();

  return (
    <ul className={styles.list}>
      {filtredContacts.map(({ id, name, number }) => (
        <li key={id} className={styles.item}>
          <p className={styles.text}>{name}:</p>
          <p className={styles.text}>{number}</p>
          <button
            onClick={() => dispatch(deleteContact(id))}
            className={styles.button}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
