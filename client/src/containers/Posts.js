import React, { Component } from 'react';
import Auth from '../modules/Auth';
import { connect } from 'react-redux';
import {
        postsCreatePost,
        postsFetchDataSuccess,
        postsFetchingData,
        postsFetchingFailure
        } from '../actions/posts';
import PropTypes from 'prop-types';
import PostList from '../components/Posts/PostList';
import NewPostForm from '../components/Posts/NewPostForm';
import { Input } from 'reactstrap';

class Posts extends Component{
  componentDidMount() {
      fetch('/posts', {
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
        .then(posts => this.props.postsFetch(posts))
        .catch(err => this.props.postsErrored(err))
    }

  handleCreatePost = (e, data) => {
    e.preventDefault();
      fetch('/posts', {
        method: 'POST',
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
      .then(post => this.props.postCreate(post))
      .catch(err => console.log(err.message))
  }

  render() {
    return (
      <div className="posts">
        <Input type="button" value="< Back" onClick={() => this.props.history.goBack()}/>
        <br />
        {Auth.isUserAuthenticated() &&
          <NewPostForm handleCreatePost={this.handleCreatePost} />
        }
        <PostList fetching={this.props.fetching} error={this.props.error}  posts={this.props.posts} />
      </div>
    )
  }
}

Posts.propTypes = {
  postCreate: PropTypes.func,
  fetchData: PropTypes.func,
  posts: PropTypes.array,
  fetching: PropTypes.bool,
  error: PropTypes.string
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  fetching: state.posts.fetching,
  error: state.posts.error
})

const mapDispatchToProps = (dispatch) => {
  dispatch(postsFetchingData());
  return {
    postsFetch: (posts) => {
      dispatch(postsFetchDataSuccess(posts))
    },
    postsErrored: (err) => {
      dispatch(postsFetchingFailure(err.message))
    },
    postCreate: (post) => {
      dispatch(postsCreatePost(post))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
