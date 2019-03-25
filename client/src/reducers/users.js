import * as types from '../actions/actionTypes';

const initialState = {
  users: [],
  error: null,
  fetching: false
}

export function users(state = initialState, action) {
  switch(action.type){
    case types.USERS_FETCHING_DATA:
      return { ...state, fetching: true }
    case types.USERS_FETCH_DATA_SUCCESS:
      return { ...state, fetching: false, users: action.users }
    case types.USERS_FETCHING_FAILURE:
      return { ...state, error: action.err, fetching: false, users: [] }
    default:
      return state;
  }
}
