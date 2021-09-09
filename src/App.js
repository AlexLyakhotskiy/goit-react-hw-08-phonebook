// import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Appbar from './components/AppBar/AppBar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';

// import HomePage from './pages/HomePage';
// import AuthPage from './pages/AuthPage';
import ContactsPage from './pages/ContactsPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';

import { resetUser } from './redux/auth/auth-operations';
import { getIsResetingUser } from './redux/auth/auth-selectors';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isResetingUser = useSelector(getIsResetingUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    history.replace('/login');
    dispatch(resetUser());
  }, [dispatch, history]);

  return (
    !isResetingUser && (
      <>
        <Appbar />

        {/* <Suspense fallback={<LoaderSpinner />}> */}
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
        {/* </Suspense> */}
        <ToastContainer autoClose={3000} />
      </>
    )
  );
}

export default App;
