import React, { Component } from 'react';
import Auth from '../modules/Auth';
import { connect } from 'react-redux';
import CurrentUserList from '../components/Users/CurrentUserList';
import PropTypes from 'prop-types';
import {
  currentUserFetchingData,
  currentUserFetchingFailure,
  currentUserFetchDataSuccess
} from '../actions/currentUser';

class CurrentUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      followed: false
    }
  }

  componentDidMount(){
    fetch(`/users/${this.props.match.params.id}`, {
      method: 'GET',
      headers: {
        'Authorization': Auth.getToken()
      }
    })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText)
      }
      return res;
    })
    .then(res => res.json())
    .then(user => this.props.fetchUser(user))
    .catch(err => this.props.errorUser(err))

    fetch(`/relationships/${this.props.user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Auth.getToken()
      }
    })
    .then(res => res.json())
    .then(res => this.setState({
      followed: res
    }))
    .catch(err => console.log(err))
  }

  handleFollow = () => {
    fetch(`/relationships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Auth.getToken()
      },
      body: JSON.stringify({
        'followed_id': this.props.user.id
      })
    })
    .then(res => res.json())
    .then(() => this.setState({
      followed: true
    }))
    .catch(err => console.log(err))
  }

  handleUnfollow = () => {
    fetch(`/relationships/${this.props.user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Auth.getToken()
      }
    })
    .then(res => res.json())
    .then(() => this.setState({
      followed: false
    }))
    .catch(err => console.log(err))
  }

  render () {
    return (
      <CurrentUserList 
        followed={this.state.followed}
        user={this.props.user}
        fetching={this.props.fetching}
        error={this.props.error}
        handleFollow={this.handleFollow}
        handleUnfollow={this.handleUnfollow}
      />
    )
  }
}

CurrentUser.propTypes = {
  fetchUser: PropTypes.func,
  errorUser: PropTypes.func,
  user: PropTypes.object,
  fetching: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  error: state.user.error,
  fetching: state.user.fetching
})

const mapDispatchToProps = (dispatch) => {
  dispatch(currentUserFetchingData());
  return {
    fetchUser: (user) => {
      dispatch(currentUserFetchDataSuccess(user))
    },
    errorUser: (err) => {
      dispatch(currentUserFetchingFailure(err.message))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
