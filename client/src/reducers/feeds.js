import * as types from '../actions/actionTypes';

const initialState = {
  feeds: [],
  error: null,
  fetching: false
}

export function feeds(state = initialState, action) {
  switch(action.type){
    case types.FEEDS_FETCHING_DATA:
      return { ...state, fetching:true }
    case types.FEEDS_FETCH_DATA_SUCCESS:
      return { ...state, feeds: action.feeds, fetching:false }
    case types.FEEDS_FETCHING_FAILURE:
      return { ...state, feeds: [], error: action.err, fetching: false }
    default:
      return state
  }
}
