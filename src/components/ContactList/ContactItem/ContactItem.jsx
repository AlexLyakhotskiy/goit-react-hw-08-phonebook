import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { deleteContact } from '../../../redux/contacts/contacts-operations';

import styles from './ContactItem.module.scss';
import ContactEditForm from '../ContactEditForm/ContactEditForm';

export default function ContactItem({ id, name, number }) {
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleToggleForm = () => setEditFormIsOpen(prev => !prev);

  return (
    <>
      {editFormIsOpen ? (
        <ContactEditForm
          onToggle={handleToggleForm}
          id={id}
          name={name}
          number={number}
        />
      ) : (
        <li key={id} className={styles.item}>
          <p className={styles.text}>{name}:</p>
          <p className={styles.text}>{number}</p>
          <button
            onClick={handleToggleForm}
            type="button"
            className={styles.button}
          >
            edit
          </button>
          <button
            onClick={() => dispatch(deleteContact(id))}
            className={styles.button}
            type="button"
          >
            Delete
          </button>
        </li>
      )}
    </>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};
