import React,{ Component } from 'react';
import { Form, Input } from 'reactstrap';

class NewRepostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  handleSubmit = (e, data) => {
    e.preventDefault();
    this.props.handleCreateRepost(e, data)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <Form>
          <Input 
              id="name" 
              name="name"
              value={this.state.name} 
              placeholder="Comment to repost" 
              type="name" 
              onChange={this.handleChange} 
          />
          <br />
          <Input 
              onClick={(e) => this.handleSubmit(e, this.state )} 
              type='submit' 
              value='Create repost'
          />
        </Form>
      </div>
    )
  }
}

export default NewRepostForm;
