import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addLocation } from '../../store/locationsReducer';
import './LocationFormPage.css'

function LocationFormPage() {

  const sessionUser = useSelector(state => state.session.user);

  const history = useHistory();
  const dispatch = useDispatch();

  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    const vErr = [];

    locationName || vErr.push('Your place must have a name.')
    location || vErr.push('There must be a location.')
    location.length > 20 || vErr.push('The location must be over 20 characters.')
    description || vErr.push('There must be a description.')

    setErrors(vErr);
  }, [location, description, locationName])


  async function submitForm(e) {
    e.preventDefault();
    const data = {
      locationName,
      description,
      location,
      userId: sessionUser.id
    }
    let createdLocation = await dispatch(addLocation(data));
    if (createdLocation) {
      history.push(`/locations/${createdLocation.newLocation.id}`);
      // history.push(`/locations/24`);
    }
  }

  return (
    <div className='new-location-form-container'>
      <h1>Location Form Page</h1>
      <div>

        <div className='new-location-errors-div'>
          <ul>
            {errors.map(error => {
              return <li key={error}>{error}</li>
            })}
          </ul>
        </div>

        <form className='locationForm' onSubmit={submitForm}>
          <div className='new-location-form-div'>
            <label className='new-location-form-label' htmlFor='locationName'>What's your place called? </label>
            <input
              className='new-location-input-type'
              id='locationName'
              type='text'
              value={locationName}
              onChange={e => setLocationName(e.target.value)}
            ></input>
          </div>
          <div className='new-location-form-div'>
            <label className='new-location-form-label' htmlFor='location'>Where's it located? </label>
            <input
              className='new-location-input-type'
              id='location'
              type='text'
              value={location}
              onChange={e => setLocation(e.target.value)}
            >
            </input>
          </div>
          <div className='new-location-form-div'>
            <label className='new-location-form-label' htmlFor='description'>Describe your home. </label>
            <textarea
              className='new-location-input-type'
              id='description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              className='global-button-style'
              type='submit'
              disabled={errors.length > 0}
            >Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LocationFormPage;