import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { MdCreate, MdDeleteForever } from 'react-icons/md';

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
          onToggleForm={handleToggleForm}
          id={id}
          name={name}
          number={number}
        />
      ) : (
        <li key={id} className={styles.item}>
          <div className={styles.infoWrapper}>
            <p className={styles.text}>{name}</p>
            <p className={styles.text}>{number}</p>
          </div>
          <div className={styles.controllWrapper}>
            <button
              onClick={handleToggleForm}
              type="button"
              aria-label="edit-button"
              className={styles.btnEdit}
            >
              <MdCreate />
            </button>
            <button
              onClick={() => dispatch(deleteContact(id))}
              className={styles.btnRemove}
              aria-label="remove-button"
              type="button"
            >
              <MdDeleteForever />
            </button>
          </div>
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
