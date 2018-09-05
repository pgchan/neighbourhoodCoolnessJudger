import React, { Component } from 'react';
import './App.css';

import GoogleMapsContainer from './GoogleMapsContainer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">WE'RE GOING TO AFRICA</h1>
          </header>
          < GoogleMapsContainer/>
      </div>
    );
  }
}

export default App; 

