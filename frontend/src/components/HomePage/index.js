import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Home.css';

// import { load } from '../../store/locationReducer';
import { getLocations } from '../../store/locationsReducer';

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getLocations());
    }, [dispatch])

    return (
        <div className='navBar'>

        </div>
    )
}

export default HomePage;