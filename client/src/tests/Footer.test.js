import React from 'react';
import Footer from '../components/Footer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Footer tests', () => {
  const footer = shallow(<Footer />);

  it('Have title of site', () => {
    expect(footer.find('h5').text()).toMatch('Boom')
  })
  it('Have link to GitHub', () => {
    expect(footer.find('a').text()).toEqual(' GitHub')
  })
  it('Have footer content 2', () => {
    expect(footer.find('p').at(1).text()).toEqual('Footer content 2')
  })
})