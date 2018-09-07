import React, { Component } from 'react';
import GoogleMapsContainer from '../map/GoogleMapsContainer';
import LibraryList from '../../LibraryList/LibraryList';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ConcertList from '../ConcertList/ConcertList';

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
            <Link to="/ConcertList">Concert Listing</Link>
            <Route exact path="/ConcertList" component={ConcertList} />
          </div>
          
          <LibraryList libraryEvents={this.state.libraryEvents}/>
          <GoogleMapsContainer location={this.props.location} />
        </div>
      </Router >
    );
  }
}

export default Results;