import * as types from '../actions/actionTypes';

const initialState = {
  post: {},
  error: null,
  fetching: false
}

export function post(state = initialState, action) {
  switch (action.type) {
    case types.SINGLE_POST_FETCHING_DATA:
      return { ...state, fetching: true }
    case types.SINGLE_POST_FETCH_DATA_SUCCESS:
      return { ...state, post: action.post, fetching: false }
    case types.SINGLE_POST_FETCHING_FAILURE:
      return { ...state, error: action.err, fetching: false, post: {} }
    case types.UPDATE_POST:
      return { ...state, post: action.post }
    default:
      return state;
  }
}
