import React, { Component } from 'react';
import Auth from '../modules/Auth';
import PropTypes from 'prop-types';
import { Input, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import Fetch from '../modules/Fetchers';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isSubmitted: false,
      auth: Auth.isUserAuthenticated()
    }
  }
  
  validate = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.email) {
      formIsValid = false;
      errors['email'] = 'Email cannot be empty';
    }

    if (!this.state.password) {
      formIsValid = false;
      errors['password'] = 'Password cannot be empty';
    }

    if (this.state.password.length < 6) {
      formIsValid = false;
      errors['password_length'] = 'Password is too short (minimum is 6 symbols)';
    }

    this.setState({ errors });
    return formIsValid;
  } 

  handleChange = (e) => {
    if (this.state.isSubmitted) {
      this.validate();
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true});
    if (this.validate()){
      Fetch.login(this.state.email, this.state.password);
    }
  }

  render() {
    return (
      <div className="form">
        <h2>Sign in</h2>
        <Form>
        <Input 
            id='email' 
            name='email' 
            onChange={this.handleChange} 
            placeholder="Email" 
            type='email' 
            value={this.state.email} 
        />
        <div className='text-danger'>
          {this.state.errors['email']}
        </div>
        <br />
        <Input 
            id='password' 
            name='password' 
            onChange={this.handleChange} 
            placeholder="Password" 
            type='password' 
            value={this.state.password}
        />
        <div className='text-danger'>
          {this.state.errors['password']}
        </div>
        <div className='text-danger'>
          {this.state.errors['password_length']}
        </div>
        <br />
          <Input 
              className='signinButton' 
              onClick={this.handleSubmit} 
              type='submit' 
              value='Sign in'
          />
        </Form>
        <hr />
        <p>Or <Link to='/signup'>Sign up</Link></p>
      </div>
    );
  }
}
SignIn.propTypes = {
  history: PropTypes.object
}

SignIn.defaultProps = {
  history: {}
}

export default SignIn;
