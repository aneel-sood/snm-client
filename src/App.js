import React, { Component } from 'react';
import Dashboard from './components/Dashboard.js';
import './stylesheets/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>SNM Impact</h2>
        </div>
        <Dashboard />
      </div>
    );
  }
}

export default App;
