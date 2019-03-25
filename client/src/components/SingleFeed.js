import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SingleFeed extends Component {

  render() {
    const allFeeds = [...this.props.feeds, ...this.props.reposts];
    const allSortFeeds = allFeeds.sort((feed, repostFeed) => (new Date(repostFeed.created_at).getTime() - new Date(feed.created_at).getTime()))
    
    return (
      <div className="singleFeed">
        {allSortFeeds.map(feed => (
          <div class-name='single-feed' key={feed.id}>
            {feed.name &&
              <div>
                <small>Repost</small>
                <h4>{feed.name}</h4>
              </div>
            }
            <Link to={`/posts/${feed.post_id}`}>
              <h5 className="feed-title">{feed.title}</h5>
            </Link>
            <p>{feed.body}</p>
            {feed.username &&
              <small>Created by: {feed.username}</small>
            }
            {feed.reposted &&
              <small>Reposted by: {feed.reposted}</small>
            }
            <br />
            <small>Created at: {feed.created_at_format}</small>
            <hr />
          </div>
          )
        )}
      </div>
    )
  }
}

export default SingleFeed;