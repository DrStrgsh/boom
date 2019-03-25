
import React from 'react';
import FeedsList from '../components/FeedsList';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Feeds list', () => {
  const props = {
    feeds: [],
    reposts: [],
    fetching: false,
    reposts_fetching: false,
    reposts_error: null,
    error: null
  }

  describe('Feeds fetching', () => {
    describe('Fetching for feeds', () => {
      const nextProps = {
        ...props,
        fetching: true,
        reposts_fetching: false
      }
      const feeds = shallow(<FeedsList {...nextProps} />);
      
      it('fetching', () => {
        expect(feeds.find('p').text()).toEqual('Loading...')
      })
    })
    describe('Fetching for reposts', () => {
      const nextProps = {
        ...props,
        fetching: false,
        reposts_fetching: true
      }
      const feeds = shallow(<FeedsList {...nextProps} />);
      
      it('fetching', () => {
        expect(feeds.find('p').text()).toEqual('Loading...')
      })
    })
  })

  describe('Feeds errored', () => {
    describe('Errored by feeds', () => {
      const nextProps = {
        ...props,
        error: 'Lol',
        reposts_error: null
      }
      const feeds = shallow(<FeedsList {...nextProps} />);
      
      it('Error', () => {
        expect(feeds.find('p').text()).toEqual('Errored, ' + nextProps.error)
      })
    })
    describe('Errored by reposts', () => {
      const nextProps = {
        ...props,
        error: null,
        reposts_error: 'Dod'
      }
      const feeds = shallow(<FeedsList {...nextProps} />);
      
      it('Error', () => {
        expect(feeds.find('p').text()).toEqual('Errored, ' + nextProps.reposts_error)
      })
    })
  })

  describe('Feeds data', () => {
    const nextProps = {
      ...props,
      feeds: [
        { id: 1, title: 'One', body: 'Two', username: 'Dodik' },
        { id: 2, title: 'Three', body: 'Fore', username: 'Lolik' }
      ],
      reposts: [
        { id: 3, name: 'Wow', title: 'OG', body: 'Go', reposted: 'Gogy' }
      ]
    }
    const feeds = shallow(<FeedsList {...nextProps} />);

    it('Repost name', () => {
      expect(feeds.find('h4').at(0).text()).toEqual('Wow')
    })
    it('Repost title', () => {
      expect(feeds.find('h5').at(2).text()).toEqual('OG')
    })
    it('Feed title', () => {
      expect(feeds.find('h5').at(0).text()).toEqual('One')
    })
    it('Reposted by', () => {
      expect(feeds.find('small').at(5).text()).toMatch('Gogy')
    })
    it('Created by', () => {
      expect(feeds.find('small').at(2).text()).toMatch('Lolik')
    })
  })
})