import React, { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
// import * as locationActions from '../../store/locationsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './Home.css';

import { getLocations } from '../../store/locationsReducer';

function HomePage() {

  const history = useHistory();
  const locations = useSelector(state => state.locations.entries);

  const dispatch = useDispatch();

  useEffect(() => {
    (dispatch(getLocations()));
  }, [dispatch])



  return (
    <>
      <div className='home-main-bg'>
        <h1>Scroll To Find Places To Stay</h1>
      </div>

      <div className='home-below-main'>
        <div className='home-card-area'>
          <ul className='home-card-container'>
            {locations?.map(location => (
              <div
                className='home-card' key={location.id}
                onClick={() => history.push(`/locations/${location.id}`)}
                >
                <div className='home-card-title-area'>
                  <li
                    className='home-card-title-text'
                  >
                    {location.locationName}
                  </li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default HomePage;