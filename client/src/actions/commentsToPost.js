import * as types from './actionTypes';

export const commentsFetchingData = () => ({
  type: types.COMMENTS_FETCHING_DATA
})

export const commentsFetchDataSuccess = (comments) => ({
  type: types.COMMENTS_FETCH_DATA_SUCCESS,
  comments
})

export const commentsFetchingFailure = (err) => ({
  type: types.COMMENTS_FETCHING_FAILURE,
  err
})

export const singlePostCommentCreate = (comment) => ({
  type: types.CREATE_COMMENT_TO_POST,
  comment
})
