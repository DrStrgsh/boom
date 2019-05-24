import React from 'react';
import UserList from '../../components/Users/UsersList';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('User list', () => {
  const props = {
    users: []
  }

  describe('Users data', ()=> {
    const nextProps = {
      ...props,
      users: [
        {
          id: 1,
          username: 'admin',
          email: 'admin@admin.io'
        }
      ]
    }
    const userList = shallow(<UserList {...nextProps} />)

    it('Users', () => {
      expect(userList.find('h3').text()).toEqual('admin')
    })
  })
})