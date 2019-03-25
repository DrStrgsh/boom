import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';

class NewPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      errors: {},
      isSubmited: false,
      open: false
    }
  }

  validate = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.title) {
      formIsValid = false;
      errors['title'] = 'Title can not be blank'
    }

    if (!this.state.body) {
      formIsValid = false;
      errors['body'] = 'Body can not be blank'
    }

    this.setState({errors});
    return formIsValid;
  }

  handleSubmit = (e, data) => {
    e.preventDefault();
    this.setState({ isSubmited: true});
    if (this.validate()){
      this.props.handleCreatePost(e, data)
    }
  }

  handleChange = (e) => {
    if (this.state.isSubmited) {
      this.props.validate();
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  handlePostToggleForm = () => {
    this.setState( prevState => ({
      open: !prevState.open
    }))
  }

  render() {
    return (
      <div>
        {!this.state.open &&
          <Input 
              type="button" 
              value="New post" 
              onClick={this.handlePostToggleForm}
          />
        }
        {this.state.open &&
          <div>
            <Input 
                type="button" 
                value="Close form" 
                onClick={this.handlePostToggleForm}
            />
            <h4>New post:</h4>
            <Form>
              <Input 
                  id='title' 
                  name='title' 
                  onChange={this.handleChange} 
                  placeholder='Title' 
                  type='title' 
                  value={this.state.title} 
              />
              <div className='text-danger'>
                {this.state.errors['title']}
              </div>
              <br />
              <Input 
                  id='body' 
                  name='body' 
                  onChange={this.handleChange} 
                  placeholder='Body' 
                  type='body' 
                  value={this.state.body} 
              />
              <div className='text-danger'>
                {this.state.errors['body']}
              </div>
              <br />
              <Input 
                  onClick={(e) => this.handleSubmit(e, this.state )} 
                  type='submit' 
                  value='Create post' 
              />
            </Form>
          </div>
        }
      </div>
    )
  }
}

export default NewPostForm;
