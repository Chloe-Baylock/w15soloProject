import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Home.css';

import { getLocations } from '../../store/locationsReducer';
import { loadBookings, removeBooking } from '../../store/bookingsReducer';
import BookingForm from '../BookingForm';

function HomePage() {

  const history = useHistory();
  const sessionUserId = useSelector(state => state.session.user?.id);
  const locations = useSelector(state => state.locations.entries);
  const bookings = useSelector(state => state.bookings.entries);

  const dispatch = useDispatch();

  const [bookModal, setBookModal] = useState(-2);

  useEffect(() => {
    dispatch(getLocations());
    dispatch(loadBookings());
  }, [dispatch])

  const handleDeleteBooking = async id => {
    await dispatch(removeBooking(id));

  }


  return (
    <>
      <div className='home-main-black-bg'>
        <div className='home-main-bg'>
          <h1 className='home-h1'>Scroll To Find Places To Stay</h1>
        </div>
      </div>

      <div className='home-below-main'>
        <div className='home-card-area'>
          <ul
            className='home-card-container'
            onMouseEnter={(e) => {
              document.body.style.overflowY = "hidden"
              e.currentTarget.style.overflowY = "scroll"
            }}
            onMouseLeave={() => document.body.style.overflowY = "scroll"}
          >
            {locations?.map(location => (
              <div
                className='home-card' key={location.id}
                onClick={() => {
                  history.push(`/locations/${location.id}`)
                  document.body.style.overflowY = "scroll"
                }}
              >
                <div className='home-card-title-area'>
                  <li
                    className='home-card-title-text'
                  >
                    {location.locationName}
                  </li>
                </div>
                <div className='home-card-image-div'>
                  {location.image.length > 3 && (
                    <img className='home-card-image' src={location.image} />
                  )}
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className='home-map-bookings' id='home-bookings-scroll'>
          {bookings?.filter(book => book.userId === sessionUserId).length > 0 ? (
            <h1 className='home-your-bookings'>Your Bookings:</h1>
          ) : (
            <h1 className='home-your-bookings'>You have no bookings to display yet!</h1>
          )}
          {bookings?.map(booking => booking.userId === sessionUserId && (
            <div
              key={booking.id}
              className='home-bookings-div'
            >
              <li
                className='home-bookings-list'
                onClick={() => history.push(`/locations/${booking.locationId}`)}
              >{locations?.filter(location => location.id === booking?.locationId)[0].locationName}
              </li>
              <li className='home-booking-info'>
                {
                  `from ${booking.timespan.slice(5, 7)}/${booking.timespan.slice(8, 9)}/${booking.timespan.slice(0, 4)}
                  to
                  ${booking.timespan.slice(16, 18)}/${booking.timespan.slice(19, 21)}/${booking.timespan.slice(11, 15)}`
                }
              </li>
              {bookModal === booking.id && (
                <BookingForm
                  bookingLocation={booking.locationId}
                  bookingStart={booking.timespan.split('X')[0]}
                  bookingEnd={booking.timespan.split('X')[1]}
                  bookingId={booking.id}
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
      </div >
    </>
  )
}

export default HomePage;