const ADD_LOCATION = "locations/ADD_LOCATION";
const LOAD_LOCATIONS = "locations/LOAD_LOCATION";
const UPDATE_LOCATION = "locations/UPDATE_LOCATION";
const REMOVE_LOCATION = "locations/REMOVE_LOCATION";

// export const add = (location) => ({
//     type: ADD_LOCATION,
//     location
// })

export const load = (locations) => {
    return {type: LOAD_LOCATIONS, locations};
}

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
    dispatch(load(locations));
    return locations;
}

const initialState = {};
    
const locationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LOCATIONS:
            const newLocations = {};
            // console.log('array of 3 values', ['1','2','4']);
            console.log('action.locations', [action.locations.locations]);
            action.locations.locations.forEach(location => {
                newLocations[location.id] = location;
            })
            return {
                ...state,
                ...newLocations
            }
        default:
            return state;
    }
}

export default locationsReducer