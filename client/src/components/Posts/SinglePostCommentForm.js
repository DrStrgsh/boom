import React, { Component } from 'react';
import { Input } from 'reactstrap';

class SinglePostCommentForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      body: '',
      open: false,
      isSubmited: false,
      errors: {}
    }
  }
  validate = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.body) {
      formIsValid = false;
      errors['body'] = 'Can not be blank';
    }
    this.setState({errors});
    return formIsValid;
  }
  handleSubmit = (e, data) => {
    e.preventDefault();
    this.setState({isSubmited:true});
    if (this.validate()) {
      this.props.handleCreateComment(e, data);
    }
  }
  handleChange = (e) => {
    if (this.state.isSubmited){
      this.props.validate();
    }
    this.setState({ [e.target.name]: e.target.value })
  }
  handleCommentToggleForm = () => {
    this.setState( prevState => ({
      open: !prevState.open
    }))
  }

  render () {
    return (
      <div>
        {!this.state.open &&
          <div>
            <Input type="button" value="New Comment" onClick={this.handleCommentToggleForm} />
            <br />
          </div>
        }
        {this.state.open &&
          <div>
            <Input type="button" value="Close form" onClick={this.handleCommentToggleForm}/>
            <br />
            <Input id="body" name="body" type="text" onChange={this.handleChange} value={this.state.body} placeholder="New comment"  />
            {this.state.error &&
              <div className="text-danger">
                {this.state.errors['body']}
                <br />
              </div>
            }
            <Input type="submit" value="Create comment" onClick={(e) => this.handleSubmit(e, this.state)} />
            <br />
          </div>
        }
      </div>
    )
  }
}

export default SinglePostCommentForm;
