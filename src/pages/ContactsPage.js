import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import Container from '../components/Container';
import Filter from '../components/Filter';
import LoaderSpinner from '../components/LoaderSpinner/LoaderSpinner';

import { getAuthLoading } from '../redux/auth/auth-selectors';
import { getContacts } from '../redux/contacts/contacts-operations';

import { getLoading } from '../redux/contacts/contacts-selectors';

export default function ContactsPage() {
  const contactLoading = useSelector(getLoading);
  const authLoading = useSelector(getAuthLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <Container className="contactContainer">
      {(contactLoading || authLoading) && <LoaderSpinner />}
      <div>
        <h2>Contacts</h2>
        <ContactForm />
      </div>
      <div>
        <Filter />
        <ContactList />
      </div>
    </Container>
  );
}
