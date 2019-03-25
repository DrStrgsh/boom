import * as types from '../actions/actionTypes';

const initilState = {
  reposts: [],
  error: null,
  fetching: false
}

export function reposts(state = initilState, action) {
  switch (action.type) {
    case types.REPOSTS_FETCHING_DATA:
      return { ...state, fetching: true }
    case types.REPOSTS_FETCH_DATA_SUCCESS:
      return { ...state, reposts: action.reposts, fetching: false }
    case types.REPSOTS_FETCH_FAILURE:
      return { ...state, fetching: false, error: action.err }
    case types.CREATE_REPOST_TO_POST:
      return { ...state, reposts: [...state.reposts, action.repost] }
    default:
      return state
  }
}
