import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  singlePostFetchingData,
  singlePostFetchingFailure,
  singlePostFetchDataSuccess,
  singlePostUpdate
} from '../actions/singlePost';
import {
  singlePostCommentCreate,
  commentsFetchingData,
  commentsFetchingFailure,
  commentsFetchDataSuccess
} from '../actions/commentsToPost';
import { createRepostToPost } from '../actions/reposts';
import PropTypes from 'prop-types';
import Auth from '../modules/Auth';
import SinglePostContent from '../components/Posts/SinglePostContent';
import EditPost from '../components/Posts/EditPost';
import { Input } from 'reactstrap';
import SinglePostCommentForm from '../components/Posts/SinglePostCommentForm';
import NewRepostForm from '../components/Posts/NewRepostForm';

class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: false,
      editing: false,
      likesCount: 0,
      reposting: false
    }
  }

  componentDidMount() {
    fetch(`/posts/${this.props.match.params.id}`, {
      headers: {
        'Authorization': Auth.getToken()
      }
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(post => this.props.fetchPost(post))
      .then(post => this.setState({
        likesCount: this.props.post.likes_count
      }))
      .then(() =>
      fetch(`/posts/${this.props.match.params.id}/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Auth.getToken()
        }
      })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(comment => this.props.fetchComment(comment))
      .catch(err => this.props.commentErrored(err)))
    .catch(err => this.props.postErrored(err))

    fetch(`posts/${this.props.match.params.id}/islike`, {
      method: 'GET',
      headers: {
        'Authorization': Auth.getToken()
      }
    })
    .then(res => res.json())
    .then(res => this.setState({
      isLike: res
    }))
    .catch(err => console.log(err))
  }

  handleCreateRepost = (data) => {
    console.log('Repost')
  }

  handleLikePost = (data) => {
    fetch(`/posts/${data}/like`, {
      method: 'PUT',
      headers: {
        'Authorization': Auth.getToken()
      }
    })
    .then(res => res.json())
    .then(() => this.setState({
      isLike: true
    }))
    .then(() => this.setState( prevState => ({
      likesCount: prevState.likesCount + 1
    })))
    .catch(err => console.log(err))
  }

  handleDislikePost = (data) => {
    fetch(`/posts/${data}/unlike`, {
      method: 'PUT',
      headers: {
        'Authorization': Auth.getToken()
      }
    })
    .then(res => res.json())
    .then(() => this.setState({
      isLike: false
    }))
    .then(() => this.setState( prevState => ({
      likesCount: prevState.likesCount - 1
    })))
    .catch(err => console.log(err))
  }

  handleDeletePost = (data) => {
    fetch(`/posts/${data}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Auth.getToken(),
      }
    })
    .then(res => res.json())
    .then(this.props.history.push('/posts'))
    .catch(err => console.log(err.message))
  }

  handleUpdatePost = (e, data) => {
    e.preventDefault();
      fetch(`/posts/${this.props.match.params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Auth.getToken()
        },
        body: JSON.stringify({
          title: data.title,
          body: data.body
        })
      })
      .then(res => res.json())
      .then(post => this.props.postUpdate(post))
      .then(this.setState({
        editing: false
      }))
      .catch(err => console.log(err.message))
  }

  handleEditFormOpen = () => {
    if (!this.state.editing){
      this.setState( prevState => ({
        editing: !prevState.editing
      }))
    }
  }

  handleRepostFormOpen = () => {
    this.setState( prevState => ({
      reposting: !prevState.reposting
    }))
  }

  handleCreateRepost = (e, data) => {
    e.preventDefault();
      fetch(`/posts/${this.props.match.params.id}/repost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Auth.getToken()
        },
        body: JSON.stringify({
          name: data.name
        })
      })
      .then(res => res.json())
      .then(repost => this.props.createRepost(repost))
      .then(() => this.handleRepostFormClose())
      .catch(err => console.log(err.message))
    
  }

  handleCreateComment = (e, data) => {
    e.preventDefault();
      fetch(`/posts/${this.props.match.params.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Auth.getToken()
        },
        body: JSON.stringify({
          body: data.body
        })
      })
      .then(res => res.json())
      .then(comment => this.props.createComment(comment))
      .catch(err => console.log(err.message))
  }

  render() {
    return (
      <div>
        <Input type="button" value="< Back" onClick={() => this.props.history.goBack()}/>
        <br />
        {this.state.editing &&
          <div>
            <Input onClick={this.handleEditFormOpen} value='Cancel editing' type='button' />
            <br />
            <EditPost handleUpdatePost={this.handleUpdatePost}  post={this.props.post}/>
          </div>
        }
        {!this.state.editing &&
          <div>
            <Input onClick={this.handleEditFormOpen} value="Edit post" type="button" />
            <br />
            {!this.state.reposting &&
              <div>
                <Input onClick={this.handleRepostFormOpen} value="New repost" type="button" />
                <br />
              </div>
            }
            {this.state.reposting &&
              <div>
                <Input onClick={this.handleRepostFormOpen} value="Close form" type="button" />
                <br />
                <NewRepostForm 
                  post={this.props.post}
                  handleCreateRepost={this.handleCreateRepost}
                />
                <hr />
              </div>
            }
            <SinglePostContent 
                handleCreateRepost={this.handleCreateRepost}
                likesCount={this.state.likesCount}
                handleDislikePost={this.handleDislikePost}
                isLike={this.state.isLike}
                handleLikePost={this.handleLikePost} 
                fetching={this.props.fetching} 
                error={this.props.error} 
                post={this.props.post} 
                handleDeletePost={this.handleDeletePost} 
                comments={this.props.comments}
            />
            {Auth.isUserAuthenticated() &&
              <SinglePostCommentForm handleCreateComment={this.handleCreateComment} />
            }
          </div>
        }
      </div>
    )
  }
}

SinglePost.propTypes ={
  createRepost: PropTypes.func,
  fetchComment: PropTypes.func,
  postUpdate: PropTypes.func,
  fetchPost: PropTypes.func,
  comments: PropTypes.object,
  fetchingComments: PropTypes.bool,
  errorComments: PropTypes.string,
  post: PropTypes.object,
  fetching: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    post: state.post.post,
    comments: state.comments.comments,
    fetchingComments: state.comments.fetching,
    errorComments: state.comments.error,
    fetching: state.post.fetching,
    error: state.post.error
  }
}

const mapDispatchToProps = (dispatch) => {
  dispatch(singlePostFetchingData());
  dispatch(commentsFetchingData());
  return {
    fetchPost: (post) => {
      dispatch(singlePostFetchDataSuccess(post))
    },
    postErrored: (err) => {
      dispatch(singlePostFetchingFailure(err.message))
    },
    postUpdate: (post) => {
      dispatch(singlePostUpdate(post))
    },
    fetchComment: (comment) => {
      dispatch(commentsFetchDataSuccess(comment))
    },
    commentErrored: (err) => {
      dispatch(commentsFetchingFailure(err.message))
    },
    createComment: (comment) => {
      dispatch(singlePostCommentCreate(comment))
    },
    createRepost: (repost) => {
      dispatch(createRepostToPost(repost))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
