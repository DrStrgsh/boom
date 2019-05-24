import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons'
import '../styles/NavBar.css';
import Auth from '../modules/Auth';
import Fetch from '../modules/Fetchers';

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signedIn: !!Auth.getToken(),
    }
  }

  signOutUser = () => {
    Auth.deauthenticateUser();
    Fetch.signOut();
  }
  
  render() {
    return (
      <div>
        <Navbar className="navbar" color="dark" dark expand="md">
          <NavbarBrand href="/"><FontAwesomeIcon icon={faBomb} /> Boom</NavbarBrand>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link to="/posts">Posts</Link></NavLink>
              </NavItem>
              {this.state.signedIn &&
                <Nav>
                  <NavItem>
                    <NavLink><Link to="/feeds">Feeds</Link></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink><Link to="/users">Peoples</Link></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink><Link to="/signin" onClick={this.signOutUser}>Sign Out</Link></NavLink>
                  </NavItem>
                </Nav>
              }
              {!this.state.signedIn &&
                <Nav>
                  <NavItem>
                    <NavLink><Link to="/signin">Sign In</Link></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink><Link to="/signup">Sign Up</Link></NavLink>
                  </NavItem>
                </Nav>
              }
            </Nav>
          </Collapse>
        </Navbar>
        <br />
      </div>
    );
  }
}

export default NavBar;
