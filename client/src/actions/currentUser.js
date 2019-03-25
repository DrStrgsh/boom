
import * as types from './actionTypes';

export const currentUserFetchDataSuccess = (user) => ({
  type: types.CURRENT_USER_FETCH_DATA_SUCCESS,
  user
})

export const currentUserFetchingData = () => ({
  type: types.CURRENT_USER_FETCHING_DATA
})

export const currentUserFetchingFailure = (err) => ({
  type: types.CURRENT_USER_FETCHING_FAILURE,
  err
})
