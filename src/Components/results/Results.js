import React, { Component } from 'react';
import GoogleMapsContainer from '../map/GoogleMapsContainer';

class Results extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main className="results">
        <h1>Results Page</h1>
        <GoogleMapsContainer location={this.props.location}/>
      </main>
    )
  }
}

export default Results;