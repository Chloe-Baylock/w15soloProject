import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <>
      <div className='navContainer'>
        <div className='navBar'>
          <div className='home'>
            <NavLink exact to="/">Home</NavLink>
          </div>
          <div className='book'>
            <p>book</p>
          </div>
          <div className='userOp'>
            <p>{isLoaded && sessionLinks}</p>
          </div>
        </div>
      </div>
      {/* <div className='content'>
        <ul className='pageC'>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
          <li>text</li>
        </ul>
      </div> */}
    </>
  );
}

export default Navigation;