import React, { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
// import * as locationActions from '../../store/locationsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Home.css';

import { getLocations } from '../../store/locationsReducer';

function HomePage() {

  const locations = useSelector(state => state.locations.entries);

  const dispatch = useDispatch();

  useEffect(() => {
    (dispatch(getLocations()));
  }, [dispatch])



  return (
    <div className='home-main-bg'>
      <div className='locationsDiv'>
        <ul>
          {locations?.map(location => (
            <li key={location.id}>
              <NavLink to={`/locations/${location.id}`}>{location.locationName}</NavLink>
            </li>
          ))}
        </ul>
        <NavLink to='/locations/new'>Create New Location</NavLink>
      </div>
    </div>
  )
}

export default HomePage;