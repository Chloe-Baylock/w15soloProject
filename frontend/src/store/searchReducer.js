import { csrfFetch } from "./csrf";

const LOAD_SEARCH = 'search/POST_SEARCH';

export const load = search => ({
  type: LOAD_SEARCH,
  search,
})


export const loadSearch = (data) => async dispatch => {
  console.log('data is', data, 'a')
  console.log('data is', 'a', 'a')
  console.log('datalen is', data.length);
  const response = await csrfFetch(`/api/search/${data}`, {
    method: "GET",
  });
  if (response.ok) {
    const results = await response.json();
    await dispatch(load(results.results));
    return results.results;
  }
}

export const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SEARCH:
      return { "entries": action.search };
    default:
      return state;
  }
}

export default searchReducer;