import Auth from './Auth';

class Fetch {
  static signOut() {
    fetch('http://localhost:3001/api/signout', {
      method: 'DELETE'
    })
    .then(() => this.setState({
      signedIn: false
    }))
    .catch(err => console.log(err))
  }

  static login(email, password) {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
    .then(res => res.json())
    .then(res => {Auth.authenticateToken(res.auth_token);
      this.setState({
        auth:Auth.isUserAuthenticated(),
      });})
      .then(() => this.props.history.push('/posts'))
      .catch(err => console.log(err))
  }
}

export default Fetch;