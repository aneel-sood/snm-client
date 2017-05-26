import React, { Component } from 'react';
import ClientNeeds from './components/ClientNeeds.js';
import './stylesheets/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>SNM Impact</h2>
        </div>
        <ClientNeeds />
      </div>
    );
  }
}

export default App;
