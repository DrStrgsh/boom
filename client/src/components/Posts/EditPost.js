import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';
import Comments from './Comments';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      errors: {},
      isSubmited: false,
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

    this.setState({ errors });
    return formIsValid;
  }

  handleSubmit = (e, data) => {
    e.preventDefault();
    this.setState({ isSubmitted: true}, () => {
      if (this.validate()){
        this.props.handleUpdatePost(e, data)
      }
    });
  }

  handleChange = (e) => {
    if (this.state.isSubmited) {
      this.props.validate();
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  render(){
    const p = this.props.post
    return (
      <Form className="post-field" key={p.id}>
        <Input 
            className="post-title"
            id='title'
            name='title'
            onChange={this.handleChange}
            placeholder={p.title}
            type='title'
            value={this.state.title}
        />
        <div className='text-danger'>
          {this.state.errors['title']}
        </div>
        <hr />
        <Input 
            id='body'
            name='body'
            onChange={this.handleChange}
            placeholder={p.body}
            type='body'
            value={this.state.body}
        />
        <div className='text-danger'>
          {this.state.errors['body']}
        </div>
        <br />
        <Input 
            onClick={(e) => { this.handleSubmit(e, this.state )}}
            type='submit'
            value='Update post'
        />
        <br />
        <small>{p.created_at_format}</small>
        <br />
        <small>Created by: {p.username}</small>
        <br />
        <small>Likes: {p.likes_count}</small>
        <hr />
        <Input
            onClick={this.handlePostForDelete()}
            value="Delete"
            type="button"
        />
        <br />
        {p.comments && p.comments.length &&
          <Comments comments={p.comments} />
        }
      </Form>
    );
  }
}

export default EditPost;
