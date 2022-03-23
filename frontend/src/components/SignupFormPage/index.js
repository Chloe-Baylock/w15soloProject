import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage(props) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

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
    <div className='signup-container' onClick={() => props.setSignupModal(false)}>
      <div className="signup-container-form" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className='signup-eleBelow'>
            <label className="signup-label">
              Email:
              <input
                className="signup-input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className='signup-eleBelow'>
            <label className="signup-label">
              Username:
              <input
                className="signup-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div className='signup-eleBelow'>
            <label className="signup-label">
              Password:
              <input
                className="signup-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className='signup-eleBelow'>
            <label className="signup-label">
              Confirm Password:
              <input
                className="signup-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className='signup-eleBelow'>
            <button className="signup-submit" type="submit">Sign Up</button>
            <button onClick={e => demoLogin(e)}>Demo Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;