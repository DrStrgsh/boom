import React, { Component } from 'react';
import User from './User';

class UsersList extends Component {
  render() {
    return (
      <div>
        <h1>People</h1>
        <br />
        <User users={this.props.users} />
      </div>
    )
  }
}

export default UsersList;
