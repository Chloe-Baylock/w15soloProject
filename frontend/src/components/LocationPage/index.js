import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LocationPage.css'
import { getLocations, removeLocation } from '../../store/locationsReducer'
import { useState } from 'react';

function LocationPage() {

  const dispatch = useDispatch();
  const history = useHistory();

  const [booking, setBooking] = useState(false);
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  useEffect(() => {
    (dispatch(getLocations()));
  }, [dispatch])

  const locations = useSelector(state => state.locations.entries);

  const parameter = useParams();

  let location = locations?.find(loc => loc.id === +parameter.id)

  const triggerBookModal = () => {
    setBooking(!booking);
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

    let sum = count.toString();

    if (sum.length === 1) return `00${sum}`
    else if (sum.length === 2) return `0${sum}`;
    else if (sum.length === 3) return sum;
    else return false;
  }

  const submitDates = async e => {
    e.preventDefault();
    console.log('that is a submission')
    console.log('date1 is', date1 || todayFn());
    console.log('date2 is', date2 || todayFn());
    return `${date1 || todayFn()}X${date2 || todayFn()}X${totalDays()}`
  }

  async function editPage(e) {
    e.preventDefault();
    history.push(`/locations/${parameter.id}/edit`);
  }

  async function deletePage(e) {
    e.preventDefault();
    await dispatch(removeLocation(parameter.id));
    history.push('/');
  }

  return (
    <>
      <div className='location-page-container'>
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
    </>
  )
}

export default LocationPage;