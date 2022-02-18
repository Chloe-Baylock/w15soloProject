import React, { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
// import * as locationActions from '../../store/locationsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Home.css';

import { getLocations } from '../../store/locationsReducer';
import { loadBookings } from '../../store/bookingsReducer';

function HomePage() {

  const history = useHistory();
  const locations = useSelector(state => state.locations.entries);
  const bookings = useSelector(state => state.bookings.entries);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
    dispatch(loadBookings())
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
        {bookings?.map(booking => (
          <li
            key={booking.id}
            className='home-bookings-list'
          >{booking.id}
          </li>
        ))}
      </div>
    </>
  )
}

export default HomePage;