import * as types from './actionTypes';

export const singlePostFetchDataSuccess = (post) => ({
  type: types.SINGLE_POST_FETCH_DATA_SUCCESS,
  post
})

export const singlePostFetchingData = () => ({
  type: types.SINGLE_POST_FETCHING_DATA
})

export const singlePostFetchingFailure = (err) => ({
  type: types.SINGLE_POST_FETCHING_FAILURE,
  err
})

export const singlePostUpdate = (post) => ({
  type: types.UPDATE_POST,
  post
})
