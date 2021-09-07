import { useSelector } from 'react-redux';

import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import Container from '../components/Container';
import Filter from '../components/Filter';
import LoaderSpinner from '../components/LoaderSpinner/LoaderSpinner';

import { getLoading } from '../redux/contacts/contacts-selectors';

export default function HomePage() {
  const loading = useSelector(getLoading);

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
      {loading && <LoaderSpinner />}
    </Container>
  );
}
