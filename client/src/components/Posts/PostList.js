import React, { Component } from 'react';
import '../../styles/Posts.css';
import PostForPostList from './PostForPostList';

class PostList extends Component {
  render() {
      if (this.props.fetching) {
        return <p>Loading...</p>
      }
      if (this.props.error) {
        return <p>Errored, {this.props.error}</p>
      }
      
      return (
        <div className="posts-field">
          <h1 className="posts-head">Posts</h1>
          <PostForPostList posts={this.props.posts} />
        </div>
    )
  }
}

export default PostList;
