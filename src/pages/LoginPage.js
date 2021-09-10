import React from 'react';
import { useSelector } from 'react-redux';

import Container from '../components/Container';
import AuthForm from '../components/AuthForm/AuthForm';

import { getAuthLoading } from '../redux/auth/auth-selectors';
import LoaderSpinner from '../components/LoaderSpinner/LoaderSpinner';

export default function LoginPage() {
  const authLoading = useSelector(getAuthLoading);
  return (
    <Container className="contactContainer">
      {authLoading && <LoaderSpinner />}
      <AuthForm />
    </Container>
  );
}
