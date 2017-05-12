import React, { Component } from 'react';
import ResourceSearch from './components/ResourceSearch.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>SNM Impact</h2>
        </div>
        <ResourceSearch />
      </div>
    );
  }
}

export default App;
