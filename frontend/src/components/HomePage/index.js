import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Home.css';

import { getLocations } from '../../store/locationsReducer';
import { loadBookings, updateBooking, removeBooking } from '../../store/bookingsReducer';
import BookingForm from '../BookingForm';

function HomePage() {

  const history = useHistory();
  const sessionUserId = useSelector(state => state.session.user.id);
  const locations = useSelector(state => state.locations.entries);
  const bookings = useSelector(state => state.bookings.entries);
  
  const dispatch = useDispatch();

  const [bookModal, setBookModal] = useState(-2);

  useEffect(() => {
    dispatch(getLocations());
    dispatch(loadBookings())
  }, [dispatch])

  const handleDeleteBooking = async id => {
    await dispatch(removeBooking(id));

  }


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
        <div className='home-map-bookings'>
          {bookings?.map(booking => (
            <div
              key={booking.id}
              className='home-bookings-div'
            >
              <li className='home-bookings-list'>{booking.id}</li>
              {bookModal === booking.id && (
                <BookingForm
                  bookingLocation = {booking.locationId}
                  bookingStart = {booking.timespan.split('X')[0]}
                  bookingEnd = {booking.timespan.split('X')[1]}
                  bookingId = {booking.id}
                />
              )}
              <button
                className='global-button-style home-edit-booking-button'
                onClick={() => {
                  if (bookModal === booking.id) setBookModal(-3); 
                  else setBookModal(booking.id)
                }}
              >
                {bookModal === booking.id ? (
                  <>Cancel Edit</>
                  ) : (
                    <>Edit Booking</>
                  )
                }
              </button>
              <button
                className='global-button-style home-delete-booking-button'
                onClick={() => handleDeleteBooking(booking.id)}
              >
                Delete Booking
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomePage;