import { createElement, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './LocationPage.css';
import { getLocations, removeLocation } from '../../store/locationsReducer'
import { addBooking, loadBookings, removeBooking, updateBooking } from '../../store/bookingsReducer';
import { addReview, destroyReview, editReview, loadReviews } from '../../store/reviewsReducer';
import { getUsers } from '../../store/session';
import { useState } from 'react';
import BookingForm from '../BookingForm';
function LocationPage() {

  // const sessionUserId = useSelector(state => state.session.user.id)
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();

  const locations = useSelector(state => state.locations.entries);
  const reviews = useSelector(state => state.reviews.entries);
  const users = useSelector(state => state.session.users);
  const bookings = useSelector(state => state.bookings.entries);

  const params = useParams();

  const [booking, setBooking] = useState(false);
  const [editBooking, setEditBooking] = useState(false);
  const [revModal, setRevModal] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const [showUpdateReview, setShowUpdateReview] = useState(-2)
  const [showError, setShowError] = useState(false);  // not related with *errors*
  const [errors, setErrors] = useState([]);
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [bookModal, setBookModal] = useState(-2);
  const [bookingId, setBookingId] = useState(-1);
  const [hasBookings, setHasBookings] = useState(false);

  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      await dispatch(getLocations());
      await dispatch(loadReviews());
      await dispatch(getUsers());
    }
    fetchData();
  }, [dispatch])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadBookings());
    }
    fetchData();
  }, [dispatch, flicker])

  let location = locations?.find(loc => loc?.id === +params.id)

  const triggerBookModal = () => {
    setBooking(!booking);
  }

  const showRevModal = () => {
    setRevModal(!revModal);
  }

  const handleDeleteBooking = async id => {
    await dispatch(removeBooking(id));
  }

  const showAnimation = () => {
    let divAnim = document.createElement('div');
    divAnim.className = 'location-page-div-animation';

    divAnim.innerText = 'Booked';
    divAnim.style.animation = `booked-confirmation 5s ease-in-out forwards`;
    document.body.appendChild(divAnim);
  }

  const todayFn = () => {
    const date = new Date()
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    if (day.length === 1) day = '0' + day;
    if (month.length === 1) month = '0' + month;
    return `${year}-${month}-${day}`;
  }

  const validDate = (da1, da2) => {
    let today = todayFn();
    let errArr = [];

    // check booking date1 is made in the future
    if (parseInt(da1.slice(0, 4)) < parseInt(today.slice(0, 4))) errArr.push('The booking should be today or later.');
    else if (da1.slice(0, 4) === today.slice(0, 4) && parseInt(da1.slice(5, 7)) < parseInt(today.slice(5, 7))) errArr.push('The booking should be today or later.');
    else if (da1.slice(0, 4) === today.slice(0, 4) && da1.slice(5, 7) === today.slice(5, 7) && da1.slice(8, 10) < today.slice(8, 10)) errArr.push('The booking should be today or later.');


    // check booking date2 is made in the future
    if (parseInt(da2.slice(0, 4)) < parseInt(today.slice(0, 4))) errArr.push('The booking should be today or later!');
    else if (da2.slice(0, 4) === today.slice(0, 4) && parseInt(da2.slice(5, 7)) < parseInt(today.slice(5, 7))) errArr.push('The booking should be today or later!');
    else if (da2.slice(0, 4) === today.slice(0, 4) && da2.slice(5, 7) === today.slice(5, 7) && da2.slice(8, 10) < today.slice(8, 10)) errArr.push('The booking should be today or later!');

    // check date2 >= date1
    if (parseInt(da1.slice(0, 4)) > parseInt(da2.slice(0, 4)) ||
      (parseInt(da1.slice(0, 4)) === parseInt(da2.slice(0, 4)) && parseInt(da1.slice(5, 7)) > parseInt(da2.slice(5, 7))) ||
      (parseInt(da1.slice(0, 4)) === parseInt(da2.slice(0, 4)) && parseInt(da1.slice(5, 7)) === parseInt(da2.slice(5, 7)) && parseInt(da1.slice(8, 10)) > parseInt(da2.slice(8, 10)))) errArr.push('Please make sure the second date is not before the first date.');

    setErrors(errArr);
  }

  const totalDays = () => {
    // assumes you cannot rent for more than 1 year. **** errors here.

    let d1 = date1 || todayFn();
    let d2 = date2 || todayFn()

    let month1 = parseInt(d1.slice(5, 7));
    let month2 = parseInt(d2.slice(5, 7));

    const feb = () => {
      let year = d1.slice(0, 4);
      if (month1 > month2) {
        year = d2.slice(5, 7);
      }
      if (year % 400 === 0) return 29
      else if (year % 100 === 0) return 28
      else if (year % 4 === 0) return 29
      else return 28;
    }

    let monthDays = [31, feb(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let count = 0;

    let day1 = parseInt(d1.slice(8, 10));
    let day2 = parseInt(d2.slice(8, 10));

    if (month1 === month2) {
      if (day1 > day2) {
        for (let i = 0; i < 12; i++) {
          if (i + 1 !== month1) count += monthDays[i];
        }
        count += day2;
        count += monthDays[month1 - 1] - day1 + 1
      }
      else count += day2 - day1 + 1;
    } else if (month1 < month2) {
      for (let i = month1; i < month2 - 1; i++) {
        count += monthDays[i];
      }
      count += day2;
      count += monthDays[month1 - 1] - day1 + 1;
    } else {
      for (let i = month1; i < 12; i++) {
        count += monthDays[i];
      }
      for (let i = 0; i < month2 - 1; i++) {
        count += monthDays[i];
      }
      count += day2;
      count += monthDays[month1 - 1] - day1 + 1
    }

    return count;
  }

  // const submitDates = async e => {
  //   e.preventDefault();
  //   let booking = `${date1 || todayFn()}X${date2 || todayFn()}X${totalDays()}`;
  //   let data = {
  //     userId: sessionUser.id,
  //     locationId: params.id,
  //     timespan: booking,
  //   }
  //   await dispatch(addBooking(data));
  //   setBooking(false);
  // }

  const submitOrEditDates = async e => {
    e.preventDefault();
    let booking = `${date1 || todayFn()}X${date2 || todayFn()}X${totalDays()}`;
    let data = {
      userId: sessionUser.id,
      locationId: params.id,
      timespan: booking,
    }
    if (editBooking) {
      await dispatch(updateBooking(bookingId, data));
    }
    else await dispatch(addBooking(data));
    setBooking(false);
    setFlicker(!flicker);
  }

  async function editPage(e) {
    e.preventDefault();
    history.push(`/locations/${params.id}/edit`);
  }

  async function deletePage(e) {
    e.preventDefault();
    history.push('/');
    await dispatch(removeLocation(params.id));
  }

  async function submitReview(e) {
    e.preventDefault();
    let data = {
      userId: sessionUser.id,
      locationId: +params.id,
      reviewContent,
    }
    await dispatch(addReview(data));
    setRevModal(false);
  }

  async function changeReview(e, revId) {
    e.preventDefault();
    let data = {
      userId: sessionUser.id,
      locationId: +params.id,
      reviewContent,
    }
    await dispatch(editReview(data, revId));
    setShowUpdateReview(-5);
  }


  const handleDeleteReview = async (revId) => {
    await dispatch(destroyReview(revId));
    setShowUpdateReview(-7);
  }

  return (
    <>
      <div className='location-page-top'>
        {booking || (
          <>
            <div id='location-page-top-container' className='location-page-info-container'>
              <h1 className='location-page-h1'>{location?.locationName}</h1>
              <div>
                <div className='location-page-div'>
                  <p className='location-page-desc'>{location?.location}</p>
                  <p>description: {location?.description}</p>
                  <p>host: {users?.filter(user => user.id === location?.userId)[0]?.username}</p>
                </div>
                {sessionUser?.id === location?.userId && (
                  <div className='location-page-location-buttons-div'>
                    <form onSubmit={editPage}>
                      <button className='global-button-style location-page-location-edit' type='edit'>Edit</button>
                    </form>
                    <form onSubmit={deletePage}>
                      <button className='global-button-style' type='submit'>Delete</button>
                    </form>
                  </div>
                )}
              </div>
              <div className='location-page-image-div'>
                <img className='location-page-image' src={location?.image} />
              </div>
            </div>
          </>
        )}
        {booking && (
          <div className='location-page-booking-modal'>
            <form onSubmit={e => submitOrEditDates(e)} className='location-page-booking-form'>
              <div className='location-page-form-div'>
                <label className='location-page-start'>
                  start date
                </label>
                <input
                  type='date'
                  value={date1 || todayFn()}
                  onChange={e => {
                    setDate1(e.target.value)
                    return validDate(e.target.value, date2 || todayFn());
                  }}
                />
              </div>
              <br />
              <div className='location-page-form-div'>
                <label className='location-page-end'>
                  end date
                </label>
                <input
                  type='date'
                  value={date2 || todayFn()}
                  onChange={e => {
                    setDate2(e.target.value);
                    return validDate(date1 || todayFn(), e.target.value);
                  }}
                />
              </div>
              <div>
                <ul>
                  {errors.length > 0 && errors.map(error => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
              <div>
                <button
                  id='location-page-b1'
                  className='location-page-book global-button-style'
                  onClick={() => showAnimation()}
                  disabled={errors.length > 0}
                >{editBooking === true ? (
                  'Edit'
                ) : (
                  'Book'
                )}
                </button>
                <button
                  className='location-page-cancel global-button-style'
                  onClick={e => {
                    e.preventDefault();
                    setBooking(false);
                  }}
                >Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        {booking || (

          <div id='location-page-bottom-container' className='location-page-info-container'>
            {sessionUser ? (
              <button
                id='locatoin-page-b0'
                className={'global-button-style'}
                onClick={() => {
                  triggerBookModal()
                  setEditBooking(false);
                }}
              >Book
              </button>
            ) : (
              <>
                <button
                  className={'global-button-style location-page-disabled'}
                  onClick={() => {
                    let login = document.getElementById('login');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    login.click();
                  }}

                >book
                </button>
                <p>You must be logged in to book places!</p>
              </>
            )}
            <div className='location-page-bookings-div'>
              {bookings?.filter(booking => booking.userId === sessionUser?.id && booking?.locationId === location?.id).length ? (

                <p>Your bookings at {location?.locationName}:</p>
              ) : (
                <></>
              )}
              <ul className='location-page-bookings-list'>
                {bookings?.map(booking => booking.userId === sessionUser?.id && booking?.locationId === location?.id && (
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
                        `from ${booking.timespan.slice(5, 7)}/${booking.timespan.slice(8, 10)}/${booking.timespan.slice(0, 4)}
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
                      id={`location-page-booking-${booking.id}`}
                      className='global-button-style location-page-edit-booking-button'
                      onClick={e => {
                        setEditBooking(true);
                        setDate1(`${booking.timespan.slice(0, 4)}-${booking.timespan.slice(5, 7)}-${booking.timespan.slice(8, 10)}`)
                        setDate2(`${booking.timespan.slice(11, 15)}-${booking.timespan.slice(16, 18)}-${booking.timespan.slice(19, 21)}`)
                        setBookingId(+e.currentTarget.id.slice(22))
                        setBooking(true);
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
              </ul>
            </div>
            <h1>Reviews:</h1>
            <ul>
              {reviews?.filter(review => review.locationId === +params.id).map(review => (
                <div key={review.id}>
                  <li>{review.reviewContent}, by {users?.filter(user => user.id === review.userId)[0].username}</li>
                  {review.userId === sessionUser?.id && (
                    <div>
                      <button onClick={() => setShowUpdateReview(review.id)}>Edit</button>
                      <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                    </div>
                  )}
                  {showUpdateReview === review.id && (
                    <>
                      <form onSubmit={e => changeReview(e, review.id)}>
                        <textarea
                          name='reviewContent'
                          value={reviewContent}
                          onChange={e => setReviewContent(e.target.value)}
                        />
                        <button>Submit Review</button>
                      </form>
                    </>
                  )}
                </div>
              ))}
            </ul>
            {reviews?.filter(review => review.userId === sessionUser?.id && review.locationId === +params.id).length === 0 && sessionUser && (
              <button
                className='global-button-style'
                onClick={() => showRevModal()}
              >
                {revModal === true ? (
                  <>Cancel</>
                ) : (
                  <>Add Review</>
                )}
              </button>
            )}
            {revModal && (
              <div>
                <form onSubmit={submitReview}>
                  <textarea
                    name='reviewContent'
                    value={reviewContent}
                    onChange={e => {
                      if (e.target.value.length >= 500) setShowError(true);
                      else {
                        setShowError(false);
                        setReviewContent(e.target.value);
                      }
                    }}
                  />
                  {showError ? (
                    <p>Review Must Be Under 500 Characters.</p>
                  ) : (
                    <button>Submit Review</button>
                  )}
                </form>
              </div>
            )}
          </div>
        )}
        <div className='global-margin-bottom' />
      </div>
    </>
  )
}

export default LocationPage;