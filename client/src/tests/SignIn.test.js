import React from 'react';
import SignIn from '../components/SignIn';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Sign in form', () => {
  const signIn = shallow(<SignIn />);
  it('should click button with empty fields', () => {
    signIn.find('.signinButton').simulate('click', { preventDefault: () => {} });
    expect(signIn.state('errors')).toEqual({
      'password': 'Password cannot be empty',
      'password_length': 'Password is too short (minimum is 6 symbols)',
      'email': 'Email cannot be empty'
    });
  });
})