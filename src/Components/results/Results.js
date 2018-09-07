import React, { Component } from 'react';
import GoogleMapsContainer from '../map/GoogleMapsContainer';

class Results extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="wrapper">
        <h1>Results Page</h1>
        <GoogleMapsContainer location={this.props.location}/>
      </div>
    )
  }
}

export default Results;