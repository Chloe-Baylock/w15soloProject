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
    <div className='nav-container'>
      <div className='nav-bar'>
        <div className='nav-home'>
          <NavLink className='nav-navlink' exact to="/"><i className="fas fa-bread-slice" />BreadnB</NavLink>
        </div>
        <div className='nav-book'>
          <p>book</p>
        </div>
        <div className='nav-user-op'>
          <p>{isLoaded && sessionLinks}</p>
        </div>
      </div>
    </div>
  );
}

export default Navigation;