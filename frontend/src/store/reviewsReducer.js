import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = '/reviews/LOAD_REVIEWS';
const ADD_REVIEW = '/reviews/ADD_REVIEW';



export const load = reviews => ({
  type: LOAD_REVIEWS,
  reviews,
})

export const add = review => ({
  type: ADD_REVIEW,
  review,
})



export const loadReview = () => async dispatch => {
  const response = await fetch('/api/reviews');
  const reviews = await response.json();
  await dispatch(load(reviews));
  return reviews;
}

export const addReview = data => async dispatch => {
  const response = await csrfFetch('/api/reviews/new', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    const review = await response.json();
    await dispatch(add(review));
    return review;
  }
}


const reviewsReducer = (state = {}, action) => {
  switch (action.types) {
    case LOAD_REVIEWS:
      return { "entries": action.reviews };
    case ADD_REVIEW:
      return { "entries": action.review, ...state };
    default:
      return state;
  }
}

export default reviewsReducer;