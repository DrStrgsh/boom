import React from 'react';
import SinglePostContent from '../../components/Posts/SinglePostContent';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter });

describe('Single post content', () => {
  const props = {
    post: {},
    comments: [],
    fetching: false,
    error: null,
    isLike: false
  }

  describe('Single post fetching', () => {
    const nextProps = {
      ...props,
      fetching: true
    }
    const singlePost = shallow(<SinglePostContent {...nextProps} />)

    it('fetching', () => {
      expect(singlePost.find('p').text()).toEqual('Loading...')
    })
  })

  describe('Single post errored', () => {
    const nextProps = {
      ...props,
      error: 'Lol'
    }
    const singlePost = shallow(<SinglePostContent {...nextProps} />)

    it('errored', () => {
      expect(singlePost.find('p').text()).toEqual('Errored, ' + nextProps.error)
    })
  })

  describe('Post data', () => {
    const nextProps = {
      ...props,
      post: {
        id: 1,
        title: 'One',
        body: 'Hello'
      },
      comments: [
        {
          id: 1,
          body: 'Ola',
          user: [
            {
              id: 1,
              username: 'Dodik'
            }
          ]
        },
        {
          id: 2,
          body: 'Go',
          user: [
            {
              id: 2,
              username: 'Lolik'
            }
          ]
        }
      ]
    }
    const singlePost = shallow(<SinglePostContent {...nextProps} />)

    it('Post', () => {
      expect(singlePost.find('h1').at(0).text()).toEqual('One')
    })
    it('Comments presence', () => {
      expect(singlePost.find('h6').text()).toEqual('Comments: ')
    })
    it('Comment body', () => {
      expect(singlePost.find('p').at(1).text()).toEqual('<Link /> say: Go')
    })
    it('User can like post', () => {
      expect(singlePost.find('Input').at(1).props().value).toEqual('Like')
    })

    describe('User can dislike liked by current user post', () => {
      const newProps = {
        ...nextProps,
        isLike: true
      }
      const newSinglePost = shallow(<SinglePostContent {...newProps } />)
      
      it('User can dislike post', () => {
        expect(newSinglePost.find('Input').at(1).props().value).toEqual('Dislike')
      })
    })
  })
})