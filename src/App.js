// import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Appbar from './components/AppBar/AppBar';
import Container from './components/Container';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { resetUser } from './redux/auth/auth-operations';

import { getIsLoggedIn } from './redux/auth/auth-selectors';
import { getContacts } from './redux/contacts/contacts-operations';

function App() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(getContacts());
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <Appbar />

      {/* <Suspense fallback={<LoaderSpinner />}> */}
      <Switch>
        <Route path="/" exact>
          <Container>
            <h1>Home</h1>
          </Container>
        </Route>

        {!isLoggedIn && (
          <>
            <Route path="/register" exact>
              <AuthPage />
            </Route>

            <Route path="/login" exact>
              <AuthPage />
            </Route>
          </>
        )}

        <Route path="/contacts" exact>
          <HomePage />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
      {/* </Suspense> */}
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
