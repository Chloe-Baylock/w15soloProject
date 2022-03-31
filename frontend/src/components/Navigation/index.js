import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from '@heroicons/react/solid';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { postSearch } from '../../store/searchReducer';
import LoginFormPage from '../LoginFormPage';
import SignUpFormPage from '../SignupFormPage';

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const searchResults = useSelector(state => state.search.entries);
  const dispatch = useDispatch();

  // const [searchModal, setSearchModal] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [hideResults, setHideResults] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  // const submitSearch = async e => {
  //   e.preventDefault();
  //   await dispatch(postSearch(searchVal));
  //   setHideResults(false);
  // }

  const submitSearchFormA = async e => {
    e.preventDefault();
    let searchInput = document.getElementById('nav-search-input');
    history.push(`/search/${searchInput.value}`)
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
                // onClick={() => {
                //   setSearchModal(!searchModal);
                //   setHideResults(true);
                // }}
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
      {/* {searchModal && (
        <div className='nav-search-modal-div'>
          <form onSubmit={e => submitSearch(e)}>
            <label>Search</label>
            <input
              name='search'
              type='text'
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            >
            </input>
            <button> <SearchIcon className='nav-search-icon' /> </button>
            <ul>
              {hideResults || searchResults?.map(location => (
                <li
                  key={location.id}
                  className='nav-search-results-li'
                  onClick={() => {
                    setSearchModal(false);
                    return history.push(`/locations/${location.id}`)
                  }}
                >
                  {location.locationName}
                </li>
              ))}
            </ul>
          </form>
        </div>
      )} */}
      {loginModal && (<LoginFormPage setLoginModal={setLoginModal} />)}
      {signupModal && (<SignUpFormPage setSignupModal={setSignupModal} />)}
    </div>
  );
}

export default Navigation;