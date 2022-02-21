import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from '@heroicons/react/solid';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { postSearch } from '../../store/searchReducer';

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const searchResults = useSelector(state => state.search.entries);
  const dispatch = useDispatch();

  const [searchModal, setSearchModal] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [hideResults, setHideResults] = useState(false);
  const submitSearch = async e => {
    e.preventDefault();
    await dispatch(postSearch(searchVal));
    setHideResults(false);
  }

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
    <div className='nav-outside'>
      <div className='nav-container'>
        <div className='nav-bar'>
          <div className='nav-home'>
            <NavLink className='nav-navlink' exact to="/"><i className="fas fa-bread-slice" />BreadnB</NavLink>
          </div>
          <div className='nav-search'>
            <button
              className='global-button-style'
              onClick={() => {
                setSearchModal(!searchModal);
                setHideResults(true);
              }}
            >search
            </button>
          </div>
          <div className='nav-new-location'>
            <button
              className='global-button-style'
              onClick={() => history.push('/locations/new')}
            >Create New Location</button>
          </div>
          <div className='nav-user-op'>
            <div>{isLoaded && sessionLinks}</div>
          </div>
        </div>
      </div>
      {searchModal && (
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
      )}
    </div>
  );
}

export default Navigation;