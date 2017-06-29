import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';

// components
import Dashboard from './components/Dashboard.js';
import Clients from './components/Clients.js';
import ClientNeeds from './components/ClientNeeds.js';

// style 
import './stylesheets/App.css';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLinkContainer to={`/`}>
                <Glyphicon glyph="link" />
              </IndexLinkContainer>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <IndexLinkContainer to={`/`}>
                <NavItem eventKey={1} href="#">Dashboard</NavItem>
              </IndexLinkContainer>
              <IndexLinkContainer to={`/clients/`}>
                <NavItem eventKey={2} href="#">Clients</NavItem>
              </IndexLinkContainer>
              <NavItem eventKey={3} href="#">Resources</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Reports</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route exact path='/' component={Dashboard}/>
        <Route exact path='/clients/' component={Clients}/>
        <Route exact path='/client/:id' component={ClientNeeds}/>
      </div>
    );
  }
}

export default App;
