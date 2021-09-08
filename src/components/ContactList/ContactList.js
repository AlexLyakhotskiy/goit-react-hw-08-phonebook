import React from 'react';
import { useSelector } from 'react-redux';

import ContactItem from './ContactItem/ContactItem';

import { getFiltredContact } from '../../redux/contacts/contacts-selectors';

import styles from './ContactList.module.css';

const ContactList = () => {
  const filtredContacts = useSelector(getFiltredContact);

  return (
    <ul className={styles.list}>
      {filtredContacts.map(({ id, name, number }) => (
        <ContactItem key={id} id={id} name={name} number={number} />
      ))}
    </ul>
  );
};

export default ContactList;
