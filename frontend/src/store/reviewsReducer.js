import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DESTROY_REVIEW = 'reviews/DESTROY_REVIEW';

export const load = reviews => ({
  type: LOAD_REVIEWS,
  reviews,
})

export const add = review => ({
  type: ADD_REVIEW,
  review,
})

export const edit = review => ({
  type: EDIT_REVIEW,
  review,
})

export const destroy = review => ({
  type: DESTROY_REVIEW,
  review,
})


export const loadReviews = () => async dispatch => {
  const response = await fetch('/api/reviews');
  const reviews = await response.json();
  await dispatch(load(reviews.reviews));
  return reviews.reviews;
}

export const addReview = data => async dispatch => {
  const response = await csrfFetch('/api/reviews/new', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    const review = await response.json();
    await dispatch(add(review.review));
    return review.review;
  }
}

export const editReview = (data, revId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${revId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    const review = await response.json();
    await dispatch(edit(review.review));
    return review.review;
  }
}

export const destroyReview = (revId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${revId}/delete`, {
    method: "DELETE"
  })

  if (response.ok) {
    const review = await response.json();
    await dispatch(destroy(review));
    return review;
  }
}



const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      return { "entries": action.reviews };
    case ADD_REVIEW:
      return { "entries": [...state.entries, action.review] };
    case EDIT_REVIEW:
      for (let i = 0; i < state.entries.length; i++) {
        if (state.entries[i].id === action.review.id) state.entries[i] = action.review;
      }
      return state;
    case DESTROY_REVIEW:
      const deleting = { ...state };
      let entries = deleting.entries.filter(review => review.id !== action.review.id)
      return { entries };
    default:
      return state;
  }
}

export default reviewsReducer;