import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import GoogleMapsContainer from '../map/GoogleMapsContainer';
import LibraryList from '../LibraryList/LibraryList';
import ConcertList from '../ConcertList/ConcertList';
import logoYellow from '../../styles/assets/logoYellow.png';


import './Results.css';
import brush from './brush.png';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryEvents: [],
      neighbourhoodResult: '',
      hotOrNot: '',
    }
  }
  componentDidMount() {
    this.getLibraryNames();
    // this.coolnessCalculator(); 
  }
  getLibraryNames = () => {
    if (Array.isArray(this.props.libraries)) {
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
        return null;
      })
      //Use Reduce to create a new array that combines all of the arrays into one large array so that we can map through it. 
      const flatListOfLibraryEvents = listOfLibraryEvents.reduce((total, amount) => {
        return total.concat(amount);
      })    
      
      let coolOrUncool = "";
      let hotOrNot;
      let nerdy = "nerdy";
      let hot = "hot";
      let numberOfLocalLibraryEvents = flatListOfLibraryEvents.length;
      let numberOfLocalConcerts = this.props.concerts.length;
      let concertLibraryEventsRatio = numberOfLocalConcerts / (`${numberOfLocalLibraryEvents}` / 5);
  
      if (concertLibraryEventsRatio < 0.5) {
        coolOrUncool = "This place is really boring. There are way too many library events going on here.";
        hotOrNot = nerdy;
      } else if (concertLibraryEventsRatio >= 0.5 && concertLibraryEventsRatio < 0.75) {
        coolOrUncool = "This place is quite boring. There are quite a lot of library events going on here.";
        hotOrNot = nerdy;
      } else if (concertLibraryEventsRatio >= 0.75 && concertLibraryEventsRatio < 1) {
        coolOrUncool = "This place is boring. There are many library events going on here."
        hotOrNot = nerdy;
      } else if (concertLibraryEventsRatio >= 1 && concertLibraryEventsRatio < 1.25) {
        coolOrUncool = "This place is cool! Quite lot of concerts!"
        hotOrNot = hot;
      } else if (concertLibraryEventsRatio >= 1.25 && concertLibraryEventsRatio < 1.5) {
        coolOrUncool = "This place is quite cool! A lot of concerts!"
        hotOrNot = hot;
      } else if (concertLibraryEventsRatio >= 1.5) {
        coolOrUncool = "This place is really cool! A LOT of concerts!"
        hotOrNot = hot;
      }
  
      //Set the state of the large combined array so that the library list can use it to display.
      this.setState({
        libraryEvents: flatListOfLibraryEvents,
        neighbourhoodResult: coolOrUncool,
        hotOrNot
      }) 
    } else {
      let coolOrUncool = ""
      let hotOrNot;
      let nerdy = "nerdy";
      let hot = "hot";
      let numberOfLocalLibraryEvents = 0;
      // this.coolnessCalculator(numberOfLocalLibraryEvents)

      let numberOfLocalConcerts = this.props.concerts.length;
      // let concertLibraryEventsRatio = (`${numberOfLocalConcerts}` / 2) / numberOfLocalLibraryEvents;
      let concertLibraryEventsRatio = numberOfLocalConcerts / (`${numberOfLocalLibraryEvents}` / 5);

      if (concertLibraryEventsRatio < 0.5) {
        coolOrUncool = "This place is really boring. There are way too many library events going on here.";
        hotOrNot = nerdy;
      } else if (concertLibraryEventsRatio >= 0.5 && concertLibraryEventsRatio < 0.75) {
        coolOrUncool = "This place is quite boring. There are quite a lot of library events going on here."
        hotOrNot = nerdy;
      } else if (concertLibraryEventsRatio >= 0.75 && concertLibraryEventsRatio < 1) {
        coolOrUncool = "This place is boring. There are many library events going on here."
        hotOrNot = nerdy;
      } else if (concertLibraryEventsRatio >= 1 && concertLibraryEventsRatio < 1.25) {
        coolOrUncool = "This place is cool! Quite lot of concerts!"
        hotOrNot = hot;        
      } else if (concertLibraryEventsRatio >= 1.25 && concertLibraryEventsRatio < 1.5) {
        coolOrUncool = "This place is quite cool! A lot of concerts!"
        hotOrNot = hot;
      } else if (concertLibraryEventsRatio >= 1.5) {
        coolOrUncool = "This place is really cool! A LOT of concerts!"
        hotOrNot = hot;
      }

      //Set the state of the large combined array so that the library list can use it to display.
      this.setState({
        libraryEvents: 0,
        neighbourhoodResult: coolOrUncool,
        hotOrNot,
      })
    }
  }

  render() {
    return (
      <Router>
        <main className="results">
          <Link to="/" onClick={this.props.destroyStates} className="logoContainer wrapper">
            <img className="logo" src={logoYellow} alt="Hot Block Logo"/>
          </Link>
          <div className="resultsPage">
            <div className="headingContainer">
              <div className="headingContainer__contents wrapper">
                <h2>
                  This block is...
                  <span className="hotOrNot">{this.state.hotOrNot}</span>
                </h2>
                <h4>{this.state.neighbourhoodResult}</h4>
              </div>
            </div>
              <div className="resultsContainer">
                <div className="whiteOverlay">
                  <img className="brush" src={brush} alt=""/>
                </div>
                <h2>Your Neighbourhood</h2>
                <div className="resultLinks clearfix">
                  <div className="concertListLink">
                    <Link className="linkText" to="/concerts">Concert Listing</Link>
                  </div>
                  

                  <div className="libraryListLink">
                    <Link className="linkText"  to="/libraries">Library Events</Link>
                  </div>
                 
                </div>
                <Route exact path="/concerts" render={() => 
                  <ConcertList
                    concerts={this.props.concerts} 
                  />}
                />

            <Route exact path="/libraries" render={() => 
              <LibraryList
                libraryEvents={this.state.libraryEvents}
                libraries={this.props.libraries}
              />}
            />

            <div className="mapContainer wrapper">
              <Route exact path="/results" render={() => 
                <GoogleMapsContainer 
                  location={this.props.location}
                  libraries={this.props.libraries}
                  concerts={this.props.concerts}  
                />}
              />
            </div>
          </div>
        </div>
        </main>
      </Router>
    );
  }
}

export default Results;