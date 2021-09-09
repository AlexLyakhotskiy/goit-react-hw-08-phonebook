import { useSelector } from 'react-redux';

import AuthNav from '../AuthNav/AuthNav';
import Container from '../Container';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';

import { getIsLoggedIn } from '../../redux/auth/auth-selectors';

import styles from './Appbar.module.scss';

export default function Appbar() {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <header className={styles.header}>
      <Container className={styles.appBarContainer}>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </Container>
    </header>
  );
}
