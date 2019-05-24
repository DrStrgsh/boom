import React, { Component } from 'react';
import { Input } from 'reactstrap';

 const CurrentUserList = () => {
  if (this.props.fetching) {
    return (<p>Loading...</p>)
  }

  if (this.props.error) {
    return (<p>Errored, {this.props.error}</p>)
  }
  
  return (
    <div key={this.props.user.id}>
      {!this.props.followed &&
        <Input type="button" value="Follow" onClick={this.props.handleFollow} />
      }
      {this.props.followed &&
        <Input type="button" value="Unfollow" onClick={this.props.handleUnfollow} />
      }
      <h1>{this.props.user.username}</h1>
      <h3>{this.props.user.email}</h3>
      <p>Registred at: {this.props.user.created_at_format}</p>
      <small>Have {this.props.user.posts && this.props.user.posts.length} posts</small>
      <br />
      <small>Have {this.props.user.comments && this.props.user.comments.length} comments</small>
    </div>
  )
}

export default CurrentUserList;
