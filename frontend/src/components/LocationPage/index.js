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

  const submitForm = (e) => {
    e.preventDefault();
    console.log('that is a submission')
    console.log(date1);
    return false;
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
          <form onSubmit={submitForm} className='location-page-booking-form'>
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