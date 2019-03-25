import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import '../styles/Footer.css';

class Footer extends Component {
  render() {
    return (
      <Container className='footer-container'> 
        <Row>
          <Col className="col-footer-left" xs="6" sm="4">
            <h5 className="h5-footer">© Boom</h5>
          </Col>
          <Col className="col-footer-center" xs="6" sm="4">
            <p className="p-footer"><FontAwesomeIcon icon={faGithub} />
              <a className="a-footer" href='https://github.com/DrStrgsh'> GitHub</a>
            </p>
          </Col>
          <Col className="col-footer-right" xs="6" sm="4">
            <p className="p-footer">Footer content 2</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
