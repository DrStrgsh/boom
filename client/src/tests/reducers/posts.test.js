import { posts, initialState } from '../../reducers/posts';
import * as types from '../../actions/actionTypes';

describe('Posts reducer', () => {
  it('POSTS_FETCHING_DATA', () => {
    const action = {
      type: types.POSTS_FETCHING_DATA
    }

    expect(posts(initialState, action)).toEqual({
      ...initialState,
      posts: [],
      fetching: true
    })
  })

  it('POSTS_FETCHING_DATA_SUCCESS', () => {
    const stateBefore = {
      posts: [],
      fetching: true,
      error: null
    }
    const action = {
      type: types.POSTS_FETCH_DATA_SUCCESS,
      posts: [1]
    }

    expect(posts(stateBefore, action)).toEqual({
      ...stateBefore,
      posts: [1],
      fetching: false
    })
  })

  it('POSTS_FETCHING_FAILURE', () => {
    const action = {
      type: types.POSTS_FETCHING_FAILURE,
      err: 'Lol'
    }

    expect(posts(initialState, action)).toEqual({
      ...initialState,
      error: action.err
    })
  })

  it('CREATE_POST', () => {
    const action = {
      type: types.CREATE_POST,
      post: { id: 2 }
    }

    const stateBefore = {
      posts: [
        { id: 1 }
      ],
      fetching: false,
      error: null
    }

    expect(posts(stateBefore, action)).toEqual({
      posts: [
        { id: 1 },
        { id: 2 }
      ],
      fetching: false,
      error: null
    })
  })

  it('Default state', () => {
    const initialState = {
      posts: [],
      fetching: false,
      error: null
    }

    const action = {
      type: 'LOL'
    }

    expect(posts(initialState, action)).toEqual({
      posts: [],
      fetching: false,
      error: null
    })
  })
})
