import React from 'react';
import CurrentUserList from '../../components/Users/CurrentUserList';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Current user list', () => {
  const props = {
    user: {},
    fetching: false,
    error: null,
    followed: false
  }

  describe('User list fetching', () => {
    const nextProps = {
      ...props,
      fetching: true
    }
    const userList = shallow(<CurrentUserList {...nextProps} />)

    it('fetching', () => {
      expect(userList.find('p').text()).toEqual('Loading...')
    })
  })

  describe('User list error', () => {
    const nextProps = {
      ...props,
      error: 'Lol'
    }
    const userList = shallow(<CurrentUserList {...nextProps} />)

    it('error', () => {
      expect(userList.find('p').text()).toEqual('Errored, ' + nextProps.error)
    })
  })

  describe('User list data', () => {
    const nextProps = {
      ...props,
      user: {
        id: 1,
        username: 'admin',
        email: 'admin@admin.com'
      }
    }
    const userList = shallow(<CurrentUserList {...nextProps} />)

    it('Data', () => {
      expect(userList.find('h1').text()).toEqual(nextProps.user.username)
    })
  })

  describe('User posts length', () => {
    const nextProps = {
      ...props,
      user: {
        id: 1,
        username: 'admin',
        email: 'admin@admin.com',
        posts: [
          { id: 1 },
          { id: 2 }
        ] 
      }
    }
    const userList = shallow(<CurrentUserList {...nextProps} />)

    it('Length posts', () => {
      expect(userList.find('small').at(0).text()).toEqual('Have 2 posts')
    })
  })
  
  describe('User comments length', () => {
    const nextProps = {
      ...props,
      user: {
        id: 1,
        username: 'admin',
        email: 'admin@admin.com',
        comments: [
          { id: 1 },
          { id: 2 }
        ] 
      }
    }
    const userList = shallow(<CurrentUserList {...nextProps} />)

    it('Length posts', () => {
      expect(userList.find('small').at(1).text()).toEqual('Have 2 comments')
    })
  })

  describe('User can unfollow', () => {
    const nextProps = {
      ...props,
      followed: true 
    }
    const userList = shallow(<CurrentUserList {...nextProps} />)

    it('Unfollowed', () => {
      expect(userList.find('Input').at(0).props().value).toEqual('Unfollow')
    })
  })


  describe('User can follow', () => {
    const userList = shallow(<CurrentUserList {...props} />)

    it('Unfollowed', () => {
      expect(userList.find('Input').at(0).props().value).toEqual('Follow')
    })
  })
})