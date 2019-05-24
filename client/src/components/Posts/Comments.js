import React, { Component } from 'react';

class Comments extends Component {
  render() {
    return (
      <div>
        <h6>Comments: </h6>
        <small>{this.props.comments && this.props.comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.username} say: {comment.body}</p>
            <small><p>{comment.created_at_format}</p></small>
            <hr />
          </div>
        )
        )}</small>
      </div>
    )
  }
}

export default Comments;