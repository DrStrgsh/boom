import * as types from './actionTypes';

export const feedsFetchingData = () => ({
  type: types.FEEDS_FETCHING_DATA
})

export const feedsFetchingDataSuccess = (feeds) => ({
  type: types.FEEDS_FETCH_DATA_SUCCESS,
  feeds
})

export const feedsFetchingFailure = (err) => ({
  type: types.FEEDS_FETCHING_FAILURE,
  err
})
