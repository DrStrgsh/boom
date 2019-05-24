import * as types from './actionTypes';

export const usersFetchDataSuccess = (users) => ({
  type: types.USERS_FETCH_DATA_SUCCESS,
  users
})

export const usersFetchingData = () => ({
  type: types.USERS_FETCHING_DATA
})

export const usersFetchingFailure = (err) => ({
  type: types.USERS_FETCHING_FAILURE,
  err
})
