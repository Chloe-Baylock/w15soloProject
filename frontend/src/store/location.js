const ADD_LOCATION = "locations/ADD_LOCATION";
const LOAD_LOCATION = "locations/LOAD_ILOCATION";
const UPDATE_LOCATION = "locations/UPDATE_LOCATION";
const REMOVE_LOCATION = "locations/REMOVE_LOCATION";

const add = (location) => ({
    type: ADD_LOCATION,
    location
})

const load = (location) => ({
    type: LOAD_LOCATION,
    location
})

const update = (location) => ({
    type: UPDATE_LOCATION,
    location
})

const remove = (location) => ({
    type: REMOVE_LOCATION,
    location
})

const initialState = {};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LOCATION:
            const newLocation = {};
            newLocation[location.id] = location;
    }
}