import React, { Component } from 'react';
import { Input } from 'reactstrap';
import Auth from '../modules/Auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UsersList from '../components/Users/UsersList';
import {
        usersFetchingData,
        usersFetchingFailure,
        usersFetchDataSuccess
        } from '../actions/users';

class Users extends Component {
  componentDidMount(){
    fetch('/users', {
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
    .then(users => this.props.usersFetch(users))
    .catch(err => this.props.usersErrored(err))
  }
  render(){
    return(
      <div>
        <Input type="button" value="< Back" onClick={() => this.props.history.goBack()}/>
        <br />
        <UsersList users={this.props.users} fetching={this.props.fetching} error={this.props.error} />
      </div>
    )
  }
}

Users.propTypes = {
  users: PropTypes.array,
  fetching: PropTypes.bool,
  error: PropTypes.string
};

const mapStateToProps = (state) => ({
  users: state.users.users,
  fetching: state.users.fetching,
  error: state.users.error
})

const mapDispatchToProps = (dispatch) => {
  dispatch(usersFetchingData());
  return {
    usersFetch: (users) => {
      dispatch(usersFetchDataSuccess(users))
    },
    usersErrored: (err) => {
      dispatch(usersFetchingFailure(err.message))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
