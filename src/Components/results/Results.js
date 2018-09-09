import React, { Component } from 'react';
import GoogleMapsContainer from '../map/GoogleMapsContainer';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ConcertList from '../ConcertList/ConcertList';
import LibraryList from '../../LibraryList/LibraryList';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libraries: '',
      concerts: '',
      libraryEvents: []
    }
  }
  componentDidMount() {
    this.getLibraryNames();
  }
  getLibraryNames = () => {
    this.props.libraries.map((library) => {
      console.log(library.name);
      const filteredEvents = this.props.libraryEvents.filter((libraryEvent) => {
        return  library.name.includes(libraryEvent.library);
      })
      this.setState({
        libraryEvents: filteredEvents,
      })
    })
  }
  render() {
  
    return (
      <Router>
        <div className="wrapper">
          <h1>Results Page</h1>
          <div className="resultsContainer">
            <div className="concertListLink">
              <Link to="/ConcertList">Concert Listing</Link>
              <Route exact path="/ConcertList" component={ConcertList} />
            </div>
            <div className="libraryListLink">
              <Link to="/LibraryList">Library Listing</Link>
              <Route exact path="/LibraryList" component={LibraryList} />
            </div>

          </div>
          
          {/* <LibraryList libraryEvents={this.state.libraryEvents}/> */}
          <GoogleMapsContainer location={this.props.location} />
        </div>
      </Router >
    );
  }
}

export default Results;