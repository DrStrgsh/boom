import * as types from './actionTypes';

export const postsFetchDataSuccess = (posts) => ({
  type: types.POSTS_FETCH_DATA_SUCCESS,
  posts
})

export const postsFetchingData = () => ({
  type: types.POSTS_FETCHING_DATA
})

export const postsFetchingFailure = (err) => ({
  type: types.POSTS_FETCHING_FAILURE,
  err
})

export const postsCreatePost = (post) => ({
  type: types.CREATE_POST,
  post
})
