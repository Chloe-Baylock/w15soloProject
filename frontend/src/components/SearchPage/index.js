import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { postSearch } from '../../store/searchReducer';
import './SearchPage.css';

function SearchPage() {

  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const searchResults = useSelector(state => state.search.entries);

  useEffect(() => {
    let loadAsync = async () => {
      await dispatch(postSearch(params.searchVal));
    }
    loadAsync();
  }, [])

  return (
    <>
      <div className='search-page-results-container'>
        <h1 className='search-page-header'>Results for: {params.searchVal}</h1>
        <ul className='search-page-ul'>
          {searchResults?.map(location => (
            <li
              key={location.id}
              className='nav-search-results-li search-page-li'
              onClick={() => {
                return history.push(`/locations/${location.id}`)
              }}
            >
              {location.locationName}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default SearchPage;