// import { lazy, Suspense } from 'react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Appbar from './components/AppBar/AppBar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';

// import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ContactsPage from './pages/ContactsPage';
import NotFoundPage from './pages/NotFoundPage';

import { resetUser } from './redux/auth/auth-operations';
import { getIsResetingUser } from './redux/auth/auth-selectors';

function App() {
  const isResetingUser = useSelector(getIsResetingUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useMemo(() => history.push('/login'), [history]);

  useEffect(() => {
    dispatch(resetUser());
  }, [dispatch]);

  return (
    !isResetingUser && (
      <>
        <Appbar />

        {/* <Suspense fallback={<LoaderSpinner />}> */}
        <Switch>
          <PublicRoute path="/register" restricted redirectedTo="/contacts">
            <AuthPage />
          </PublicRoute>

          <PublicRoute path="/login" restricted redirectedTo="/contacts">
            <AuthPage />
          </PublicRoute>

          <PrivateRoute path="/contacts" redirectedTo="/login">
            <ContactsPage />
          </PrivateRoute>

          <PublicRoute>
            <NotFoundPage />
          </PublicRoute>
        </Switch>
        {/* </Suspense> */}
        <ToastContainer autoClose={3000} />
      </>
    )
  );
}

export default App;
