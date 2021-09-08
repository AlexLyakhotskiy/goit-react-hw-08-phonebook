import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { signIn, signUp } from '../../redux/auth/auth-operations';

const initialState = {
  name: '',
  email: '',
  password: '',
};

export default function AuthForm() {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    setUser(initialState);
  }, [pathname]);

  const isRegisterForm = () => pathname === '/register';

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = user;
    isRegisterForm()
      ? dispatch(signUp(user))
      : dispatch(signIn({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {isRegisterForm() && (
        <label>
          Name
          <input
            name="name"
            value={user.name}
            type="text"
            onChange={handleChangeInput}
          />
        </label>
      )}
      <label>
        Email
        <input
          name="email"
          value={user.email}
          type="email"
          onChange={handleChangeInput}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          value={user.password}
          type="password"
          onChange={handleChangeInput}
        />
      </label>
      <button type="submit">{isRegisterForm() ? 'SignUp' : 'SignIn'}</button>
    </form>
  );
}
