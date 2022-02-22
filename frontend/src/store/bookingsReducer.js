import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = "bookings/LOAD_BOOKINGS";
const ADD_BOOKING = "bookings/ADD_BOOKING";
const UPDATE_BOOKING = "bookings/UPDATE_BOOKING"
const REMOVE_BOOKING = "bookines/REMOVE_BOOKING";

export const load = (bookings) => ({
  type: LOAD_BOOKINGS,
  bookings,
})

export const add = booking => ({
  type: ADD_BOOKING,
  booking,
})

export const update = booking => ({
  type: UPDATE_BOOKING,
  booking,
})

export const remove = booking => ({
  type: REMOVE_BOOKING,
  booking,
})


export const loadBookings = () => async dispatch => {
  const response = await fetch('/api/bookings');
  const bookings = await response.json();
  await dispatch(load(bookings.bookings));
  return bookings.bookings;
}

export const addBooking = data => async dispatch => {
  const response = await csrfFetch('/api/bookings/new', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const booking = await response.json();
  if (response.ok) {
    await dispatch(add(booking.booking));
    return booking.booking;
  }
  else return "error written by chloe";
}

export const updateBooking = (id, data) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${id}/edit`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (response.ok) {
    const booking = await response.json();
    await dispatch(update(booking.booking));
    return booking.booking;
  }
}

export const removeBooking = id => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${id}/delete`, {
    method: "DELETE",
  })
  const booking = await response.json();
  if (response.ok) {
    await dispatch(remove(booking));
    return booking;
  } else return "error written by chloe";
}

const bookingsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_BOOKINGS:
      return { "entries": action.bookings };
    case ADD_BOOKING:
      return { "entries": action.booking, ...state }
    case UPDATE_BOOKING:
      for (let i = 0; i < state.entries.length; i++) {
        if (state.entries[i].id === action.booking.id) state.entries[i] = action.booking;
      }
      console.log('state is', state);
      return state
    case REMOVE_BOOKING:
      const deleting = { ...state };
      let entries = deleting.entries.filter(booking => +booking.id !== +action.booking.id);
      return { entries }
    default:
      return state;
  }
}

export default bookingsReducer;