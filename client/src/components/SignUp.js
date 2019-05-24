import React, { Component } from 'react';
import {
  Form,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SignUp extends Component {
 constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleSignupSubmit = (e, data) => {
    e.preventDefault();
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: data
      }),
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="form">
        <h2>Sign up</h2>
        <Form onSubmit={(e) =>
          this.handleSignupSubmit(e, this.state)}>
          <Input 
              id="username" 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={this.state.username} 
              onChange={this.handleChange} 
          />
          <br/>
          <Input 
              id="email" 
              type="text" 
              name="email" 
              placeholder="Email" 
              value={this.state.email} 
              onChange={this.handleChange} 
          />
          <br/>
          <Input 
              id="password" 
              type="text" 
              name="password" 
              placeholder="Password" 
              value={this.state.password} 
              onChange={this.handleChange}
          />
          <br/>
          <Input 
              id="password_confirmation" 
              type="text" 
              name="password_confirmation" 
              placeholder="Password confirmation" 
              value={this.state.password_confirmation} 
              onChange={this.handleChange} 
          />
          <br/>
          <Input 
              className="signup_button" 
              type="submit" 
              value="Sign Up"
          />
        </Form>
        <hr />
        <p>Or <Link to='/signin'>Sign in</Link></p>
      </div>
    )
  }
}
export default SignUp;
