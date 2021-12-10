import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLocations, removeLocation } from '../../store/locationsReducer'

function LocationPage() {
    
    const dispatch = useDispatch();
    const history = useHistory();

    
    const locations = useSelector(state => state.locations.entries);

    const parameter = useParams();

    let location = locations?.find(loc => loc.id === +parameter.id)
    
    
    useEffect(() => {
        (dispatch(getLocations()));
    }, [dispatch, location])
    
    async function editPage (e) {
        e.preventDefault();
        history.push(`/locations/${parameter.id}/edit`);
    }

    async function deletePage (e) {
        e.preventDefault();
        await dispatch(removeLocation(parameter.id));
        history.push('/');
    }

    return (
        <div>
            <p>location: {location && location.location}</p>
            <p>named: {location && location.locationName}</p>
            <p>description: {location && location.description}</p>
            <p>host id: {location && location.userId}</p>
            <p>id: {location && location.id}</p>
            <form onSubmit={editPage}>
                <button type='edit'>Edit</button>
            </form>
            <form onSubmit={deletePage}>
                <button type='submit'>Delete</button>
            </form>
        </div>
    )
}

export default LocationPage;