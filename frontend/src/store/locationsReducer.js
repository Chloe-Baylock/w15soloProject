import { csrfFetch } from './csrf';

const LOAD_LOCATIONS = "locations/LOAD_LOCATION";
const ADD_LOCATION = "locations/ADD_LOCATION";
// const UPDATE_LOCATION = "locations/UPDATE_LOCATION";
const REMOVE_LOCATION = "locations/REMOVE_LOCATION";

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

export const remove = (locationId) => ({
    type: REMOVE_LOCATION,
    locationId
})

export const getLocations = () => async (dispatch) => {
    const response = await fetch('/api/locations');
    const locations = await response.json();
    dispatch(load(locations.locations));
    return locations;
}

export const addLocation = (data) => async (dispatch) => {
    const response = await csrfFetch('/api/locations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    const location = await response.json();
    if (response.ok) {
        dispatch(add(data));
        return location;
    }
}

export const removeLocation = (id) => async (dispatch) => {
    console.log('id is', id);
    console.log('id type is', typeof id);

    await csrfFetch(`/api/locations/${id}`, {
        method: 'DELETE'
    })

    console.log('response is ok');
    dispatch(remove(id));
    console.log('dispatched remove id');
    return id;

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
        case REMOVE_LOCATION:
            console.log('state is', state);
            console.log('action.locations is', action.locations);
            const x = state.find(one => one.id === action.locations.id);
            const newState = state.filter(ele => {
                return ele !== x;
            })
            console.log('newState is', newState);
            return { ...newState,}
        default:
            return state;
    }
}

export default locationsReducer;