
import React from 'react';
import Home from '../components/Home';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Auth from '../modules/Auth';

configure({ adapter: new Adapter() });

describe('Home page', () => {
  describe('Login user welcome', () => {
    Auth.authenticateToken('123qwe321ewq');
  
    const homePage = shallow(<Home />);
  
    it('home welcome', () => {
      expect(homePage.find('h1').text()).toEqual('Hello')
    })
  })

  describe('User sign up or in', () => {
    Auth.deauthenticateUser();
    const homePage = shallow(<Home />);

    it('home', () => {
      expect(homePage.find('h1').text()).toMatch('Welcome to Boom, please')
    })
  })
})