import React from 'react';
import { Link } from 'react-router-dom';

const User = () => {
  {this.props.users.map(user => (
    <div key={user.id}>
      <Link to={`/users/${user.id}`}><h3>{user.username}</h3></Link>
      <p>{user.email}</p>
      <hr />
    </div>
  ))}
}

export default User;