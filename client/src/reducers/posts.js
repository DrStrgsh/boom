import * as types from '../actions/actionTypes';

export const initialState = {
  posts: [],
  error: null,
  fetching: false
}

export function posts(state = initialState, action) {
  switch (action.type) {
    case types.POSTS_FETCHING_DATA:
      return { ...state, fetching: true }
    case types.POSTS_FETCH_DATA_SUCCESS:
      return { ...state, posts: action.posts, fetching: false }
    case types.POSTS_FETCHING_FAILURE:
      return { ...state, error: action.err, fetching: false, posts: [] }
    case types.CREATE_POST:
      return { ...state, posts: [...state.posts, action.post] }
    default:
      return state;
  }
}
