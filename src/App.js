import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.js';
import ClientNeeds from './components/ClientNeeds.js';
import './stylesheets/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>SNM Impact</h2>
        </div>
        <Route exact path='/' component={Dashboard}/>
        <Route exact path='/client/:id' component={ClientNeeds}/>
      </div>
    );
  }
}

export default App;
