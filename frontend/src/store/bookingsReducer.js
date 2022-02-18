import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = "bookings/LOAD_BOOKINGS";
const ADD_BOOKING = "bookings/ADD_BOOKING";

export const load = (bookings) => ({
  type: LOAD_BOOKINGS,
  bookings,
})

export const add = booking => ({
  type: ADD_BOOKING,
  booking,
})


export const loadBookings = () => async dispatch => {
  const response = await fetch('/api/bookings');
  const bookings = await response.json();
  console.log('getAllBookings bookings is', bookings);
  dispatch(load(bookings));
  return bookings;
}

export const addBooking = booking => async dispatch => {
  console.log('booking is', booking);
  const response = await csrfFetch('/api/bookigns', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  })
  const booking = await response.json();
  if (response.ok) {
    await dispatch(add(booking));
    return booking;
  }
  else return "error written by chloe";
}


const bookingsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_BOOKINGS:
      return {"bookings": action.payload};
    case ADD_BOOKING:
      return {"bookings": [...state.bookings, action.payload]}
    default:
      return state;
  }
}

export default bookingsReducer;