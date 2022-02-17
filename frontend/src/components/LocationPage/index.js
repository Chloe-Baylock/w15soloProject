import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LocationPage.css'
import { getLocations, removeLocation } from '../../store/locationsReducer'

function LocationPage() {

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (dispatch(getLocations()));
  }, [dispatch])

  const locations = useSelector(state => state.locations.entries);

  const parameter = useParams();

  let location = locations?.find(loc => loc.id === +parameter.id)

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
    <div className='location-page-container'>
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
  )
}

export default LocationPage;