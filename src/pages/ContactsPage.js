import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import Container from '../components/Container';
import Filter from '../components/Filter';
import LoaderSpinner from '../components/LoaderSpinner/LoaderSpinner';
import { getContacts } from '../redux/contacts/contacts-operations';

import { getLoading } from '../redux/contacts/contacts-selectors';

export default function ContactsPage() {
  const loading = useSelector(getLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

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
