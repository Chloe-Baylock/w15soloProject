import { csrfFetch } from './csrf';

const GET_USERS = 'session/getUsers'
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const load = users => ({
  type: GET_USERS,
  users,
})

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

export const getUsers = () => async dispatch => {
  const response = await fetch('/api/users');
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data.allUsers));
    return data.allUsers;
  }
}

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_USERS:
      return {...state, 'users': action.users}
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  await dispatch(removeUser());
};

export default sessionReducer;