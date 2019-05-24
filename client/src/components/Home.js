import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';

const HomePage = () => {
  const isToken = (Auth.getToken() && Auth.getToken() !== null)
  return (
    <div>
      { isToken &&
        <h1>Hello</h1>
      }
      {!isToken &&
        <h1>Welcome to Boom, please <Link to='/signin'> Sign In</Link> or <Link to='/signup'>Sign up</Link></h1>
      }
    </div>
  );
}

export default HomePage;
