import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logout } from '../../redux/auth/auth-operations';
import { getIsLoggedIn } from '../../redux/auth/auth-selectors';

import styles from './Navigation.module.scss';

export default function Navigation() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logout());

  return (
    <nav>
      <NavLink
        exact
        to="/"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Home
      </NavLink>
      {!isLoggedIn ? (
        <>
          <NavLink
            exact
            to="/register"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Register
          </NavLink>

          <NavLink
            exact
            to="/login"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Login
          </NavLink>
        </>
      ) : (
        <button type="button" onClick={handleLogOut}>
          LogOut
        </button>
      )}
      <NavLink
        to="/contacts"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Contacts
      </NavLink>
    </nav>
  );
}
