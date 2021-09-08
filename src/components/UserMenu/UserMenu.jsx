import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../redux/auth/auth-operations';
import { getUser } from '../../redux/auth/auth-selectors';

import styles from './UserMenu.module.scss';

export default function UserMenu() {
  const { email } = useSelector(getUser);
  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logout());

  return (
    <div className={styles.userContainer}>
      <p className={styles.text}>Hello {email}</p>
      <button type="button" onClick={handleLogOut}>
        LogOut
      </button>
    </div>
  );
}
