import React, { Component } from 'react';
import Auth from '../modules/Auth';
import {
        feedsFetchingData,
        feedsFetchingFailure,
        feedsFetchingDataSuccess
      } from '../actions/feeds';
import {
        repostsFetchingData,
        repostsFetchingFailure,
        repostsFetchingDataSuccess
      } from '../actions/reposts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedsList from '../components/FeedsList';

class Feeds extends Component {
  componentDidMount(){
    fetch('/feeds', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Auth.getToken()
      }
    })
    .then(res => {
      if (!res.ok){
        throw Error(res.statusText)
      }
      return res;
    })
    .then(res => res.json())
    .then(feeds => this.props.fetchFeeds(feeds))
    .catch(err => this.props.feedsErrors(err))

    fetch('/feed_reposts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Auth.getToken()
      }
      })
    .then(res => {
      if (!res.ok){
        throw Error(res.statusText)
      }
      return res;
    })
    .then(res => res.json())
    .then(feedReposts => this.props.fetchFeedReposts(feedReposts))
    .catch(err => this.props.feedRepostsErrors(err))
  }

  render(){
    return(
      <div>
        <FeedsList
          reposts={this.props.reposts}
          repostsFetching={this.props.fetchingReposts}
          repostsError={this.props.errorReposts}
          feeds={this.props.feeds}
          error={this.props.error}
          fetching={this.props.fetching}
        />
      </div>
    )
  }
}

Feeds.propTypes = {
  fetchFeeds: PropTypes.func,
  feedsErrors: PropTypes.func,
  fetchFeedReposts: PropTypes.func,
  feedRepostsErrors: PropTypes.func,
  reposts: PropTypes.array,
  feeds: PropTypes.array,
  fetchingReposts: PropTypes.bool,
  fetching: PropTypes.bool,
  errorReposts: PropTypes.string,
  error: PropTypes.string
}

const mapStateToProps = (state) => ({
  feeds: state.feeds.feeds,
  error: state.feeds.error,
  fetching: state.feeds.fetching,
  fetchingReposts: state.reposts.fetching,
  errorReposts: state.reposts.error,
  reposts: state.reposts.reposts
})

const mapDispatchToProps = (dispatch) => {
  dispatch(feedsFetchingData());
  dispatch(repostsFetchingData());
  return {
    fetchFeeds: (feeds) => {
      dispatch(feedsFetchingDataSuccess(feeds))
    },
    feedsErrors: (err) => {
      dispatch(feedsFetchingFailure(err.message))
    },
    fetchFeedReposts: (feedReposts) => {
      dispatch(repostsFetchingDataSuccess(feedReposts))
    },
    feedRepostsErrors: (err) => {
      dispatch(repostsFetchingFailure(err.message))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feeds);
