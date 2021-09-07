import Container from '../Container';
import Navigation from '../Navigation/Navigation';
import styles from './Appbar.module.scss';

export default function Appbar() {
  return (
    <header className={styles.header}>
      <Container>
        <Navigation />
      </Container>
    </header>
  );
}
