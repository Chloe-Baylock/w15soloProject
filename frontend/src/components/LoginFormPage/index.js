import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage(props) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return (
  //   <Redirect to="/" />
  // );

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const demoLogin = e => {
    e.preventDefault();
    return dispatch(sessionActions.login({
      credential: 'Demo',
      password: 'nwag2tfd52j!gu4hba+%sdf3k.',
    }
    ))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) return dispatch(sessionActions.signup({
          'email': "demo@aa.io",
          'username': 'Demo',
          'password': 'nwag2tfd52j!gu4hba+%sdf3k.',
        }));
      });
  }

  return (
    <div
      className='login-container'
      onClick={() => props.setLoginModal(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className='login-form-container'>
        <form className='login-form' onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
          <div className='login-eleBelow'>
            <label className='login-label'>
              Username or Email:
              <input
                className='login-input'
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
          </div>
          <div className='login-eleBelow'>
            <label className='login-label'>
              Password:
              <input
                className='login-input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className='login-eleBelow' id='but'>
            <button className='login-submit' type="submit">Log In</button>
            <button onClick={e => demoLogin(e)}>Demo Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;