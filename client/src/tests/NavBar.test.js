import React from 'react';
import NavBar from '../components/NavBar';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Auth from '../modules/Auth';

configure({ adapter: new Adapter() });

describe('Nav bar', () => {
  describe('User is signed in', () => {
    Auth.authenticateToken('123qwe321ewq');

    const navBar = shallow(<NavBar />);

    it('Show navs for signed in user', () => {
      expect(navBar.find('Link').at(1).props().to).toEqual('/feeds')
      expect(navBar.find('Link').at(2).props().to).toEqual('/users')
      expect(navBar.find('Link').at(3).props().to).toEqual('/signin')
    })
  })
  describe('User is signed out', () => {
    Auth.deauthenticateUser();

    const navBar = shallow(<NavBar />);

    it('Show navs for signed out user', () => {
      expect(navBar.find('Link').at(1).props().to).toEqual('/signin')
      expect(navBar.find('Link').at(2).props().to).toEqual('/signup')
    })
  })
})