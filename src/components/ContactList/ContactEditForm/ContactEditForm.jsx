import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MdCheck, MdClose } from 'react-icons/md';
import TextField from '@material-ui/core/TextField';

import {
  deleteContact,
  editContact,
} from '../../../redux/contacts/contacts-operations';
import { getContacts } from '../../../redux/contacts/contacts-selectors';

import styles from './ContactEditForm.module.scss';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .max(15, 'Name should be of maximun 15 characters length'),
  number: yup
    .string('Enter your number')
    .max(9, 'Number should be of maximun 9 characters length'),
});

export default function ContactEditForm({ id, name, number, onToggleForm }) {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { name, number },
    validationSchema,
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  function handleSubmit(value) {
    const preparingContactToEdit = { ...value, id };

    if (isEmptyData(preparingContactToEdit)) {
      dispatch(deleteContact(id));
      onToggleForm();
      return;
    }

    if (findDuplicateExceptCurrentContact(preparingContactToEdit)) {
      toast.error(`${preparingContactToEdit.name} is already in contacts`);
      return;
    }

    dispatch(editContact(preparingContactToEdit));
    onToggleForm();
  }

  function findDuplicateExceptCurrentContact(contact) {
    const contactToEdit = contact.name.toLowerCase();
    return contacts.find(
      el => el.name.toLowerCase() === contactToEdit && el.id !== contact.id,
    );
  }

  function isEmptyData({ name, number }) {
    return Object.values({ name, number }).every(item => !item.trim());
  }

  return (
    <li className={styles.item}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.labelWrapper}>
          <TextField
            fullWidth
            className={styles.input}
            size="small"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            className={styles.input}
            size="small"
            name="number"
            type="tel"
            value={formik.values.number}
            onChange={formik.handleChange}
            error={formik.touched.number && Boolean(formik.errors.number)}
            helperText={formik.touched.number && formik.errors.number}
          />
        </div>
        <div className={styles.btnWrapper}>
          <button
            className={styles.btnAccept}
            type="submit"
            aria-label="save-button"
          >
            <MdCheck />
          </button>
          <button
            className={styles.btnCancel}
            onClick={onToggleForm}
            type="button"
            aria-label="cancel-button"
          >
            <MdClose />
          </button>
        </div>
      </form>
    </li>
  );
}
