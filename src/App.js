import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Appbar from './components/AppBar/AppBar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
import LoaderSpinner from './components/LoaderSpinner/LoaderSpinner';

import { resetUser } from './redux/auth/auth-operations';
import { getAuthError, getIsResetingUser } from './redux/auth/auth-selectors';
import { getContactsError } from './redux/contacts/contacts-selectors';

import 'react-toastify/dist/ReactToastify.css';

const ContactsPage = lazy(() =>
  import('./pages/ContactsPage' /* webpackChunkName: "contacts-page" */),
);
const LoginPage = lazy(() =>
  import('./pages/LoginPage' /* webpackChunkName: "login-page" */),
);
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "register-page" */),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage' /* webpackChunkName: "not-found-page" */),
);

function App() {
  const isResetingUser = useSelector(getIsResetingUser);
  const authError = useSelector(getAuthError);
  const contactError = useSelector(getContactsError);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    history.replace('/login');
    dispatch(resetUser());
  }, [dispatch, history]);

  useEffect(() => {
    authError && toast.error(authError);
    contactError && toast.error(contactError);
  }, [contactError, authError]);

  return (
    !isResetingUser && (
      <>
        <Appbar />

        <Suspense fallback={<LoaderSpinner />}>
          <Switch>
            <PublicRoute path="/register" restricted redirectedTo="/contacts">
              <RegisterPage />
            </PublicRoute>

            <PublicRoute path="/login" restricted redirectedTo="/contacts">
              <LoginPage />
            </PublicRoute>

            <PrivateRoute path="/contacts" redirectedTo="/login">
              <ContactsPage />
            </PrivateRoute>

            <PublicRoute>
              <NotFoundPage />
            </PublicRoute>
          </Switch>
        </Suspense>
        <ToastContainer autoClose={3000} />
      </>
    )
  );
}

export default App;
