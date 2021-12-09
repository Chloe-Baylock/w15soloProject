import React, { useEffect } from 'react';
// import * as sessionActions from '../../store/session';
// import * as locationActions from '../../store/locationsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Home.css';

import { getLocations } from '../../store/locationsReducer';

function HomePage() {
    
    const dispatch = useDispatch();

    useEffect(() => {
        (dispatch(getLocations()));
    }, [dispatch])
    
    // const sessionUser = useSelector(state => state.session.user);
    const locations = useSelector(state => state.locations.entries);


    return (
        <div className='locationsDiv'>
            <ul>
                {locations?.map(location => (
                    <li key={location.id}>
                        <NavLink to={`/locations/${location.id}`}>{location.locationName}</NavLink>
                    </li>
                ))}
            </ul>
            <NavLink to='/locations/new'>Create New Location</NavLink>
        </div>
    )
}

export default HomePage;