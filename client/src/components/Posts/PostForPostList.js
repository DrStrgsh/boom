import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostForPostList extends Component {
  render() {
    return(
      <div>
        {this.props.posts.sort((a, b) => (b.id - a.id)).map(post => {
          return (
              <div className="single-post" key={post.id} >
                <p className="posts-body">{post.body}</p>
                <Link to={`/posts/${post.id}`}><h5 className="posts-title">{post.title}</h5></Link>
                <small>Created by: {post.username}</small>
                <br />
                <small>Created at: {post.created_at_format}</small>
                <br />
                <small>Likes: {post.likes_count}</small>
                <br />
              </div>
          )
        })}
      </div>
    )
  }
}

export default PostForPostList;