import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import { HashRouter as Switch, Route } from "react-router-dom";
import Auth from './modules/Auth';
import Users from './containers/Users';
import CurrentUser from './containers/CurrentUser';
import Posts from './containers/Posts';
import Feeds from './containers/Feeds';
import SinglePost from './containers/SinglePost';
import HomePage from './components/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: Auth.isUserAuthenticated()
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({
        auth: Auth.isUserAuthenticated()
      })
    }
  }

  render() {
    return (
      <Container className="App">
      <Switch>
        <Row>
          <Col>
            <header className="App-header">
              <NavBar />
            </header>
          </Col>
        </Row>
        <Row>
          <Col xs="6" sm="4">
            <div>
            </div>
          </Col>
          <Col xs="6" sm="4">
            <main className="App-body">
              <Route exact path='/' component={HomePage} />
                <Switch>
                  <Route exact path='/posts' component={Posts} />
                  <Route path='/posts/:id' component={SinglePost} />
                </Switch>
                <Switch>
                  <Route exact path='/users' component={Users} />
                  <Route path='/users/:id' component={CurrentUser} />
                </Switch>
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/feeds' component={Feeds} />
            </main>
          </Col>
          <Col xs="6" sm="4">
          </Col>
        </Row>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Switch>
      </Container>
    );
  }
}

export default App;
