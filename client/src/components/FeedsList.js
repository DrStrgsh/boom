import React, { Component } from 'react';
import SingleFeed from './SingleFeed';

class FeedsList extends Component {
  render() {
    if (this.props.fetching || this.props.repostsFetching) {
      return <p>Loading...</p>
    }
    if (this.props.error || this.props.reposts_error) {
      return <p>Errored, {this.props.error || this.props.repostsError}</p>
    }

    return (
      <div className="feeds-field">
        <SingleFeed feeds={this.props.feed} reposts={this.props.reposts} />
      </div>
    )
  }
}

export default FeedsList;
