import React from 'react';
import PostList from '../../components/Posts/PostList';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('Post list', () => {
  const props = {
    posts: [],
    fetching: false,
    error: null
  }

  describe('Post list fetching', () => {
    const nextProps = {
      ...props,
        fetching: true
    }
    const postList = shallow(<PostList {...nextProps} />)
    
    it('fetching', () => {
      expect(postList.find('p').text()).toEqual('Loading...')
    })

    it('fetching snapshot', () => {
      expect(postList).toMatchSnapshot()
    })
  })

  describe('Post list error', () => {
    const nextProps = {
      ...props,
        error: 'Lol'
    }
    
    it('errors', () => {
      const postList = shallow(<PostList {...nextProps } />)
      expect(postList.find('p').text()).toEqual('Errored, ' + nextProps.error)
    })

    it('error snapshot', () => {
      const postList = shallow(<PostList {...nextProps } />)
      expect(postList).toMatchSnapshot()
    })
  })

  describe('Post list data', () => {
    const nextProps = {
      ...props,
        posts: [
          {
            id: 1,
            title: 'Hello',
            body: 'Ola'
          }
        ]
    }
    const postList = shallow(<PostList {...nextProps}/>)
    
    it('posts data', () => {
      expect(postList.find('h5').text()).toEqual('Hello')
    })

    it('data snapshot', () => {
      expect(postList).toMatchSnapshot()
    })
  })
})