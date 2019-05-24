import * as types from '../actions/actionTypes';

const initialState = {
  user: {},
  error: null,
  fetching: false
}

export function user(state = initialState, action) {
  switch (action.type) {
    case types.CURRENT_USER_FETCHING_DATA:
      return { ...state, fetching: true }
    case types.CURRENT_USER_FETCH_DATA_SUCCESS:
      return { ...state, user: action.user, fetching: false }
    case types.CURRENT_USER_FETCHING_FAILURE:
      return { ...state, error: action.err, fetching: false, user: {} }
    default:
      return state;
  }
}
