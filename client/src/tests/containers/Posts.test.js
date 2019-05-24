import React from 'react';
import Posts from '../../containers/Posts';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Posts container', () => {
  const props = {
    posts: [],
    fetching: false,
    error: null,
  }

  describe('Initial', () => {
    const posts = shallow(<Posts {...props} />)

    it('Container is rendered', () => {
      expect(posts).toHaveLength(1)
    })
  })
})