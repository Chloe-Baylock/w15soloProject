import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SearchIcon } from '@heroicons/react/solid';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormPage from '../LoginFormPage';
import SignUpFormPage from '../SignupFormPage';

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const submitSearchFormA = async e => {
    e.preventDefault();
    let searchInput = document.getElementById('nav-search-input');
    history.push(`/search/${searchInput.value}`)
    window.location.reload();
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <button className='global-button-style nav-login-button' onClick={(e) => {
          if (loginModal) document.body.style.overflowY = "scroll";
          else document.body.style.overflowY = "hidden";
          setLoginModal(!loginModal);
          setSignupModal(false);
          e.stopPropagation();
        }}>Log In
        </button>
        <button className='global-button-style' onClick={(e) => {
          if (signupModal) document.body.style.overflowY = "scroll";
          else document.body.style.overflowY = "hidden";
          setSignupModal(!signupModal);
          setLoginModal(false);
          e.stopPropagation();
        }}>Sign Up
        </button>
      </>
    );
  }

  return (
    <div className='nav-outside'>
      <div
        className='nav-container'
        onClick={() => {
          setLoginModal(false);
          setSignupModal(false);
          document.body.style.overflowY = 'scroll';
        }}>
        <div className='nav-bar'>
          <div className='nav-home'>
            <NavLink className='nav-navlink' exact to="/"><i className="fas fa-bread-slice" />BreadnB</NavLink>
          </div>
          <form onSubmit={e => submitSearchFormA(e)}>
            <div className='nav-search'>
              <input
                className='nav-search-input'
                id='nav-search-input'
                placeholder='Search'
              ></input>
              <div className='nav-search-buttonAAA'>
                <SearchIcon
                  className='nav-search-icon'
                  onClick={e => submitSearchFormA(e)}
                />
              </div>
            </div>
          </form>
          {sessionUser && (
            <>
              <div className='nav-bookings'>
                <button
                  className='global-button-style'
                  onClick={async () => {
                    await history.push('/')
                    let eleToScrollTo = document.getElementById('home-bookings-scroll');
                    if (eleToScrollTo) eleToScrollTo.scrollIntoView({ behavior: "smooth" });
                  }}
                >View Your Bookings
                </button>
              </div>
              <div className='nav-new-location'>
                <button
                  className='global-button-style'
                  onClick={() => history.push('/locations/new')}
                >Create New Location</button>
              </div>
            </>
          )}
          <div className='nav-user-op'>
            <div>{isLoaded && sessionLinks}</div>
          </div>
        </div>
      </div>
      {loginModal && (<LoginFormPage setLoginModal={setLoginModal} />)}
      {signupModal && (<SignUpFormPage setSignupModal={setSignupModal} />)}
    </div>
  );
}

export default Navigation;