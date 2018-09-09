import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import GoogleMapsContainer from '../map/GoogleMapsContainer';
import LibraryList from '../LibraryList/LibraryList';
import ConcertList from '../ConcertList/ConcertList';
// import LibraryList from '../../LibraryList/LibraryList';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryEvents: [],
    }
  }
  componentDidMount() {
    this.getLibraryNames();  
  }
  getLibraryNames = () => {
    // I create an array called listOfLibraries which is empty.
    const listOfLibraryEvents = [];
    //Map Through the list of libraries that is passed from App.js (attained from Search.js initially)
    this.props.libraries.map((library) => {
      //Filter through the library events list, look for the name of the library in each event and see if it matches the list of libraries that we have provided. Return only the library events that match the list of libraries that we provided.
      const filteredEvents = this.props.libraryEvents.filter((libraryEvent) => {
          return library.name.includes(libraryEvent.library);
      })
      //Push each list of events for each library into the the listOfLibrary Arrays. This will create an array with multiple arrays for each location. 
      listOfLibraryEvents.push(filteredEvents);
    })
    //Use Reduce to create a new array that combines all of the arrays into one large array so that we can map through it. 
    const flatListOfLibraryEvents = listOfLibraryEvents.reduce((total, amount) => {
      return total.concat(amount);
    })
    //Set the state of the large combined array so that the library list can use it to display.
    this.setState({
      libraryEvents: flatListOfLibraryEvents,
    })
  }
  render() {
    return (
      <Router>
        <div className="wrapper">
          <h1>Results Page</h1>
          <div className="resultsContainer">
            
            <div className="concertListLink">
              <Link to="/concerts">Concert Listing</Link>
            </div>
            
            <div className="libraryListLink">
              <Link to="/libraries">Library Events</Link>
            </div>
            
            <Route exact path="/concerts" render={() => 
              <ConcertList
                concerts={this.props.concerts} 
              />}
            />

            <Route exact path="/libraries" render={() => 
              <LibraryList
                libraryEvents={this.state.libraryEvents}
              />}
            />

            <Route exact path="/" render={() => 
              <GoogleMapsContainer 
                location={this.props.location}
                libraries={this.props.libraries}
                concerts={this.props.concerts}  
              />}
            />
          </div>
        </div>
      </Router >
    );
  }
}

export default Results;