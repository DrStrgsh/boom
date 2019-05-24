import * as types from '../actions/actionTypes';

const initialState = {
  comments: [],
  error: null,
  fetching: false
}

export function comments(state = initialState, action) {
  switch (action.type) {
    case types.COMMENTS_FETCHING_DATA:
      return { ...state, fetching: true }
    case types.COMMENTS_FETCH_DATA_SUCCESS:
      return { ...state, comments: action.comments, fetching: false }
    case types.COMMENTS_FETCHING_FAILURE:
      return { ...state, error: action.err, fetching: false, comments: [] }
    case types.CREATE_COMMENT_TO_POST:
      return { ...state, comments: [...state.comments, action.comment] }
    default:
      return state;
  }
}
