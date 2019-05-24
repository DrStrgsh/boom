import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { Link } from 'react-router-dom';

class SinglePostContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: '',
      reposting: false
    }
  }

  handlePostForDelete = () => {
    let singlePostId = this.props.post.id;
    this.props.handleDeletePost(singlePostId);
  }

  handleLikePost = () => {
    let singlePostId = this.props.post.id;
    this.props.handleLikePost(singlePostId);
  }

  handleDislikePost = () => {
    let singlePostId = this.props.post.id;
    this.props.handleDislikePost(singlePostId);
  }

  render(){
    if (this.props.fetching) {
      return (<p>Loading...</p>)
    }

    if (this.props.error) {
      return (<p>Errored, {this.props.error}</p>)
    }

    const p = this.props.post;
    const c = this.props.comments;

    return (
      <div className="post-field" key={p.id}>
        <h1 className="post-title">{p.title}</h1>
        <hr />
        <p>{p.body}</p>
        <small>{p.created_at_format}</small>
        <br />
        <small>Created by: <Link to={`/users/${p.user_id}`}> {p.username}</Link></small>
        <br />
        <small>Likes: {this.props.likesCount}</small>
        <hr />
        <Input onClick={() => { if (window.confirm('Are you shure?')) this.handlePostForDelete()}} value="Delete" type="button"/>
        <br />
        {!this.props.isLike &&
          <Input onClick={() => this.handleLikePost()} value="Like" type="button"/>
        }
        {this.props.isLike &&
          <Input onClick={() => this.handleDislikePost()} value="Dislike" type="button"/>
        }
        <br />
        {c && c.length &&
        <div>
        <h6>Comments: </h6>
        <small>{c && c.sort((a, b) => (b.id - a.id)).map(comment => (
          <div key={comment.id}>
            <p><Link to={`/users/${comment.user.id}`} >{comment.user.username}</Link> say: {comment.body}</p>
            <small><p>{comment.created_at_format}</p></small>
            <hr />
          </div>
        ))}
        </small>
        </div>
      }
      </div>
    );
  }
}

export default SinglePostContent;
