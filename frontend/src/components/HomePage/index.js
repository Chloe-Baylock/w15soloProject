import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import * as locationActions from '../../store/locationsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Home.css';

import { getLocations } from '../../store/locationsReducer';

function HomePage() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const locations = useSelector(state => state.locations.entries);
    console.log('dasdf', locations)

    useEffect(() => {
        (dispatch(getLocations()));
    }, [dispatch])

    return (
        <div className='locationsDiv'>
            <ul>
                {locations?.map(location => (
                    <li key={location.id}>{location.locationName}</li>
                ))}
            </ul>
        </div>
    )
}

export default HomePage;