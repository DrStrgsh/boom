import * as types from './actionTypes';

export const createRepostToPost = (repost) => ({
  type: types.CREATE_REPOST_TO_POST,
  repost
})

export const repostsFetchingData = () => ({
  type: types.REPOSTS_FETCHING_DATA
})

export const repostsFetchingDataSuccess = (reposts) => ({
  type: types.REPOSTS_FETCH_DATA_SUCCESS,
  reposts
})

export const repostsFetchingFailure = (err) => ({
  type: types.REPSOTS_FETCH_FAILURE,
  err
})