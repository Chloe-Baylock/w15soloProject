import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './LocationPage.css';
import { getLocations, removeLocation } from '../../store/locationsReducer'
import { addBooking } from '../../store/bookingsReducer';
import { addReview, destroyReview, editReview, loadReviews } from '../../store/reviewsReducer';
import { getUsers } from '../../store/session';
import { useState } from 'react';
function LocationPage() {

  // const sessionUserId = useSelector(state => state.session.user.id)
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();

  const locations = useSelector(state => state.locations.entries);
  const reviews = useSelector(state => state.reviews.entries);
  const users = useSelector(state => state.session.users);

  const params = useParams();

  const [booking, setBooking] = useState(false);
  const [revModal, setRevModal] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const [showUpdateReview, setShowUpdateReview] = useState(-2)
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  useEffect(() => {
    dispatch(getLocations());
    dispatch((loadReviews()));
    dispatch(getUsers());
  }, [dispatch])

  let location = locations?.find(loc => loc.id === +params.id)

  const triggerBookModal = () => {
    setBooking(!booking);
  }

  const showRevModal = () => {
    setRevModal(!revModal);
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

  const totalDays = () => {
    // assumes you cannot rent for more than 1 year.
    // assumes you cannot rent in the past.
    // assuems if both same day, it is 1 day long.

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

  const submitDates = async e => {
    e.preventDefault();
    let booking = `${date1 || todayFn()}X${date2 || todayFn()}X${totalDays()}`;
    let data = {
      userId: sessionUser.id,
      locationId: params.id,
      timespan: booking,
    }
    await dispatch(addBooking(data));
    setBooking(false);
    history.push('/')
  }

  async function editPage(e) {
    e.preventDefault();
    history.push(`/locations/${params.id}/edit`);
  }

  async function deletePage(e) {
    e.preventDefault();
    await dispatch(removeLocation(params.id));
    history.push('/');
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
        <div className='location-page-info-container'>
          <button
            className='global-button-style'
            onClick={() => triggerBookModal()}
          >book</button>
          <h1>{location && location.locationName}</h1>
          <div>
            <div className='location-page-div'>
              <p>location: {location && location.location}</p>
              <p>description: {location && location.description}</p>
              <p>host: {location && location.userId}</p>
              <p>id: {location && location.id}</p>
            </div>
            <form onSubmit={editPage}>
              <button type='edit'>Edit</button>
            </form>
            <form onSubmit={deletePage}>
              <button type='submit'>Delete</button>
            </form>
          </div>
        </div>
        {booking && (
          <div className='location-page-booking-modal'>
            <form onSubmit={submitDates} className='location-page-booking-form'>
              <div className='location-page-form-div'>
                <label>
                  start date
                </label>
                <input
                  type='date'
                  value={date1 || todayFn()}
                  onChange={e => setDate1(e.target.value)}
                />
              </div>
              <br />
              <div className='location-page-form-div'>
                <label>
                  end date
                </label>
                <input
                  type='date'
                  value={date2 || todayFn()}
                  onChange={e => setDate2(e.target.value)}
                />
              </div>
              <div>
                <button className='global-button-style'>
                  Book
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className='location-page-reviews-container'>
        <ul>
          {reviews?.filter(review => review.locationId === +params.id).map(review => (
            <div key={review.id}>
              <li>{review.reviewContent}, by {users?.filter(user => user.id === review.userId)[0].username}</li>
              {review.userId === sessionUser.id && (
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
        {reviews?.filter(review => review.userId === sessionUser.id).length === 0 && (
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
                onChange={e => setReviewContent(e.target.value)}
              />
              <button>Submit Review</button>
            </form>
          </div>
        )}
      </div>
      <div className='global-margin-bottom' />
    </>
  )
}

export default LocationPage;