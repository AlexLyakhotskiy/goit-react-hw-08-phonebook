import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { addContact } from '../../redux/contacts/contacts-operations';
import { getContacts } from '../../redux/contacts/contacts-selectors';

import styles from './ContactForm.module.scss';
import { toast } from 'react-toastify';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  name: yup
    .string('Enter name')
    .max(15, 'Name should be of maximun 15 characters length')
    .required('Name is required'),
  number: yup
    .string('Enter phone')
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is required'),
});

export default function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { name: '', number: '' },
    validationSchema,
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = contact => {
    if (findDuplicateContact(contact)) {
      toast.error(`${contact.name} is already in contacts`);
      return;
    }

    dispatch(addContact(contact));
    formik.resetForm();
  };

  function findDuplicateContact(contact) {
    const contactToAdd = contact.name.toLowerCase();
    return contacts.find(el => el.name.toLowerCase() === contactToAdd);
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.labelWrapper}>
          <TextField
            fullWidth
            className={styles.input}
            variant="outlined"
            name="name"
            type="text"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            className={styles.input}
            variant="outlined"
            name="number"
            type="tel"
            label="Phone"
            value={formik.values.number}
            onChange={formik.handleChange}
            error={formik.touched.number && Boolean(formik.errors.number)}
            helperText={formik.touched.number && formik.errors.number}
          />
        </div>
        <Button
          className={styles.btn}
          color="primary"
          variant="contained"
          type="submit"
        >
          Add contact
        </Button>
      </form>
    </div>
  );
}
