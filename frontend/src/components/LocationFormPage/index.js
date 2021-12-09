import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addLocation } from '../../store/locationsReducer';

function LocationFormPage() {
    const [locationName, setLocationName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const vErr = [];

        locationName || vErr.push('Your place must have a name.')
        description || vErr.push('There must be a description.')
        location || vErr.push('There must be a location.')
        location.length > 20 || vErr.push('The location must be over 20 characters.')

        setErrors(vErr);
    }, [location, description, locationName])


    const submitForm = (e) => {
        e.preventDefault();
        const data = {
            locationName,
            description,
            location,
            userId: '2'
        }
        let createdLocation = dispatch(addLocation(data));
        if (createdLocation) {
            //history.push(`/locations/${createdLocation.id}`);
        }
    }

    return (
        <div>
            <p>Location Form Page</p>
            <div>
                <ul>
                    {errors.map(error => {
                        return <li key={error}>{error}</li>
                    })}
                </ul>
                <form className='locationForm' onSubmit={submitForm}>
                    <div>
                        <label htmlFor='locationName'>What's your place called? </label>
                        <input
                            id='locationName'
                            type='text'
                            value={locationName}
                            onChange={e => setLocationName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor='description'>Describe your home. </label>
                        <textarea
                            id='description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor='location'>Where's it located? </label>
                        <input
                            id='location'
                            type='text'
                            placeholder='address'
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <button
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