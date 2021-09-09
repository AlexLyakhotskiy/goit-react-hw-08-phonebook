import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { signIn, signUp } from '../../redux/auth/auth-operations';

import { useStyles } from './AuthFormStyled';

const validationSchemaReg = yup.object({
  name: yup.string('Enter your name').required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(7, 'Password should be of minimum 7 characters length')
    .max(20, 'Password should be of maximun 20 characters length')
    .required('Password is required'),
});

const validationSchemaLog = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(7, 'Password should be of minimum 7 characters length')
    .max(20, 'Password should be of maximun 20 characters length')
    .required('Password is required'),
});

const AuthForm = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const styles = useStyles();

  const formik = useFormik({
    initialValues: isRegisterForm()
      ? {
          name: '',
          email: '',
          password: '',
        }
      : { email: '', password: '' },
    validationSchema: isRegisterForm()
      ? validationSchemaReg
      : validationSchemaLog,
    onSubmit: values => {
      isRegisterForm() ? dispatch(signUp(values)) : dispatch(signIn(values));
    },
  });

  function isRegisterForm() {
    return pathname === '/register';
  }

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.title}>Phonebook</h1>
      <form onSubmit={formik.handleSubmit}>
        {isRegisterForm() && (
          <TextField
            fullWidth
            className={styles.input}
            variant="outlined"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        )}
        <TextField
          fullWidth
          className={styles.input}
          variant="outlined"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          className={styles.input}
          variant="outlined"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          className={styles.btn}
          color="primary"
          variant="contained"
          type="submit"
        >
          {isRegisterForm() ? 'register' : 'login'}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
