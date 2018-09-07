import React, { Component } from 'react';
import GoogleMapsContainer from '../map/GoogleMapsContainer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ConcertList from '../ConcertList/ConcertList';

class Results extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  
    return (
      <Router>
        <div className="wrapper">
          <h1>Results Page</h1>
          <div className="resultsContainer">
            <Link to="/ConcertList">Concert Listing</Link>
            <Route exact path="/ConcertList" component={ConcertList} />
          </div>
          
          <GoogleMapsContainer location={this.props.location} />
        </div>
      </Router >
    );
  }
}

export default Results;