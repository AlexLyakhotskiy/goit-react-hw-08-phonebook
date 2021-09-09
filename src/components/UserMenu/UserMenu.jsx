import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { MdInput } from 'react-icons/md';

import { logout } from '../../redux/auth/auth-operations';
import { getUser } from '../../redux/auth/auth-selectors';

import styles from './UserMenu.module.scss';

export default function UserMenu() {
  const { email } = useSelector(getUser);
  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logout());

  return (
    <div className={styles.userContainer}>
      <p className={styles.text}>Welcome, {email}</p>
      <Button
        className={styles.btn}
        type="button"
        color="primary"
        variant="contained"
        onClick={handleLogOut}
      >
        <span className={styles.btnText}>Logout</span>
        <span className={styles.btnIcon}>
          <MdInput />
        </span>
      </Button>
    </div>
  );
}
