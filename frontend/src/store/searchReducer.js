import { csrfFetch } from "./csrf";

// const LOAD_SEARCH = 'search/LOAD_SEARCH';
const POST_SEARCH = 'search/POST_SEARCH';

// export const load = results => ({
//   type: LOAD_SEARCH,
//   results,
// })

export const post = search => ({
  type: POST_SEARCH,
  search,
})




// export const loadSearch = () => async dispatch => {
//   const response = await fetch('/api/search');
//   const results = await response.json();
//   await dispatch(load(results.results));
//   return results.results;
// }

    
export const postSearch = (data) => async dispatch => {
  const response = await csrfFetch('/api/search', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data}),
  });
  const results = await response.json();
  await dispatch(post(results.results));
  return results.results;
}

export const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_SEARCH:
      return { "entries": action.search };
    default:
      return state;
  }
}

export default searchReducer;