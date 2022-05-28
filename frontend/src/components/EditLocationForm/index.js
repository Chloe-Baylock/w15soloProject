import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getLocations, updateLocation } from '../../store/locationsReducer';
import '../LocationFormPage/LocationFormPage.css'

function EditLocationForm() {

  const params = useParams();
  const sessionUser = useSelector(state => state.session.user)


  const history = useHistory();
  const dispatch = useDispatch();

  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    let fetchLocations = async function () {
      let locations = await dispatch(getLocations());
      let thisLocation = locations.filter(locat => locat.id === +params.id)[0];
      setLocationName(thisLocation.locationName);
      setDescription(thisLocation.description);
      setLocation(thisLocation.location);
      setImage(thisLocation.image);
    }
    fetchLocations();
  }, [dispatch, params])

  useEffect(() => {
    const vErr = [];

    locationName || vErr.push('Your place must have a name.')
    location || vErr.push('There must be a location.')
    location.length > 20 || vErr.push('The location must be over 20 characters.')
    description || vErr.push('There must be a description.')

    setErrors(vErr);
  }, [location, description, locationName])


  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      locationName,
      description,
      location,
      image,
      userId: sessionUser.id,
    }
    let editedLocation = await dispatch(updateLocation({ data, 'id': params.id }));
    if (editedLocation) {
      history.push(`/locations/${params.id}`);
    }
  }

  return (
    <div className='new-location-form-container'>
      <h1>Edit Location</h1>
      <div className='new-location-errors-div'>
        <ul>
          {errors.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
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
          <div className='new-location-form-div'>
            <label className='new-location-form-label' htmlFor='image'>Image upload (optional). </label>
            <input
              className='new-location-input-image'
              id='image'
              type='file'
              onChange={e => updateFile(e)}
            ></input>
          </div>
          <div>
            <button
              className='global-button-style new-location-submit-button'
              type='submit'
              disabled={errors.length > 0}
            >Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditLocationForm;