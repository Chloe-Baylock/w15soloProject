import Cookies from 'js-cookie';

const ADD_LOCATION = "locations/ADD_LOCATION";
const LOAD_LOCATIONS = "locations/LOAD_LOCATION";
// const UPDATE_LOCATION = "locations/UPDATE_LOCATION";
// const REMOVE_LOCATION = "locations/REMOVE_LOCATION";

export const load = (locations) => {
    return {type: LOAD_LOCATIONS, locations};
}

export const add = (newLocation) => ({
    type: ADD_LOCATION,
    newLocation
})


// export const update = (location) => ({
//     type: UPDATE_LOCATION,
//     location
// })

// export const remove = (location) => ({
//     type: REMOVE_LOCATION,
//     location
// })

export const getLocations = () => async (dispatch) => {
    const response = await fetch('/api/locations');
    const locations = await response.json();
    dispatch(load(locations.locations));
    return locations;
}

export const addLocation = (data) => async (dispatch) => {
    const XX = Cookies.get('XSRF-TOKEN');
    const response = await fetch('/api/locations/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'XSRF-TOKEN': XX
        },
        body: JSON.stringify(data)
    });
    const location = await response.json
    if (response.ok) {
        const location = await response.json();
        dispatch(addLocation(data));

        return location;
    }
}

const initialState = {};
    
const locationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LOCATIONS:
            const newLocations = {};
            console.log('action.locations', action.locations)
            action.locations.forEach(location => {
                newLocations[location.id] = location;
            })
            return {
                ...state,
                entries: [...action.locations]
            }
        case ADD_LOCATION:
            return { ...state, entries: [...state.entries, action.newLocation] } 
        default:
            return state;
    }
}

export default locationsReducer;