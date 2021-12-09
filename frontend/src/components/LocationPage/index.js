import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLocations } from '../../store/locationsReducer'

function LocationPage() {
    
    const dispatch = useDispatch();

    useEffect(() => {
        (dispatch(getLocations()));
    }, [dispatch])

    const locations = useSelector(state => state.locations.entries);

    const parameter = useParams();

    let location = locations?.find(loc => loc.id === +parameter.id)
    return (
        <div>
            <p>location: {location && location.location}</p>
            <p>named: {location && location.locationName}</p>
            <p>description: {location && location.description}</p>
            <p>host: {location && location.userId}</p>
            <p>id: {location && location.id}</p>
        </div>
    )
}

export default LocationPage;