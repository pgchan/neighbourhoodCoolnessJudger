import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// COMPONENTS
import GoogleMapsContainer from '../map/GoogleMapsContainer';
import LibraryList from '../LibraryList/LibraryList';
import ConcertList from '../ConcertList/ConcertList';

// STYLES
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
    
  }

  getLibraryNames = () => {
    if (Array.isArray(this.props.libraries)) {
      // Create an array called listOfLibraries, which is empty.
      const listOfLibraryEvents = [];

      // Map Through the list of libraries that is passed from App.js (attained from Search.js initially)
      this.props.libraries.map((library) => {

        // Filter through the library events list, look for the name of the library in each event and see if it matches the list of libraries that we have provided. Return only the library events that match the list of libraries that we provided.
        const filteredEvents = this.props.libraryEvents.filter((libraryEvent) => {
            return library.name.includes(libraryEvent.library);
        })

        //Push each list of events for each library into the the listOfLibrary Arrays. This will create an array with multiple arrays for each location. 
        listOfLibraryEvents.push(filteredEvents);
        return null;
      })

      // Use Reduce to create a new array that combines all of the arrays into one large array so that we can map through it. 
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
        coolOrUncool = "Welcome to Nerdville – otherwise known as your home. This neighbourhood is completely infested with Toronto Public Libraries, and the nerds are everywhere. It’s time to surrender yourself to essential uncoolness.";
        hotOrNot = nerdy;
      } else if (concertLibraryEventsRatio >= 0.5 && concertLibraryEventsRatio < 0.75) {
        coolOrUncool = "Nerd Alert! You can run, you can hide, but you will never escape the sheer number of mouthbreathers that roam this nerd-bourhood.";
        hotOrNot = nerdy;
      } else if (concertLibraryEventsRatio >= 0.75 && concertLibraryEventsRatio < 1) {
        coolOrUncool = "There are ALMOST enough nightly gigs to cancel out the number of nerdy library events in this neighbourhood… but your block still sucks."
        hotOrNot = nerdy;
      } else if (concertLibraryEventsRatio >= 1 && concertLibraryEventsRatio < 1.25) {
        coolOrUncool = "Let's be honest - you've got some nerds on this block, but we're willing to overlook this flaw if you vow to never attend any of your local library events. Cool? Okay, you're allowed to sit with us at lunch."
        hotOrNot = hot;
      } else if (concertLibraryEventsRatio >= 1.25 && concertLibraryEventsRatio < 1.5) {
        coolOrUncool = "Even the geekiest of geeks is no match for this neighbourhood - in fact, the ones brave enough to venture out to a library event live in constant fear that cool people such as yourself will yell at them enroute to one of the many concerts that take place on your block."
        hotOrNot = hot;
      } else if (concertLibraryEventsRatio >= 1.5) {
        coolOrUncool = "We at Hot Block are always interested in making sure people know when they made life choices that suck. Congratulations, you didn't. You my friend, live in a COOL neighbourhood,bustling with loud, badass and awesome gigs."
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
      let numberOfLocalLibraryEvents = 0;
      // this.coolnessCalculator(numberOfLocalLibraryEvents)

      let numberOfLocalConcerts = this.props.concerts.length;

      // Let concertLibraryEventsRatio = (`${numberOfLocalConcerts}` / 2) / numberOfLocalLibraryEvents;
      let concertLibraryEventsRatio = numberOfLocalConcerts / (`${numberOfLocalLibraryEvents}` / 5);

      if (concertLibraryEventsRatio < 0.5) {
        coolOrUncool = "Welcome to Nerdville – otherwise known as your home. This neighbourhood is completely infested with Toronto Public Libraries, and the nerds are everywhere. It’s time to surrender yourself to essential uncoolness.";
      } else if (concertLibraryEventsRatio >= 0.5 && concertLibraryEventsRatio < 0.75) {
        coolOrUncool = "Nerd Alert! You can run, you can hide, but you will never escape the sheer number of mouthbreathers that roam this nerd-bourhood."
      } else if (concertLibraryEventsRatio >= 0.75 && concertLibraryEventsRatio < 1) {
        coolOrUncool = "There are ALMOST enough nightly gigs to cancel out the number of nerdy library events in this neighbourhood… but your block still sucks."
      } else if (concertLibraryEventsRatio >= 1 && concertLibraryEventsRatio < 1.25) {
        coolOrUncool = "Let's be honest - you've got some nerds on this block, but we're willing to overlook this flaw if you vow to never attend any of your local library events. Cool? Okay, you're allowed to sit with us at lunch."
      } else if (concertLibraryEventsRatio >= 1.25 && concertLibraryEventsRatio < 1.5) {
        coolOrUncool = "Even the geekiest of geeks is no match for this neighbourhood - in fact, the ones brave enough to venture out to a library event live in constant fear that cool people such as yourself will yell at them enroute to one of the many concerts that take place on your block."
      } else if (concertLibraryEventsRatio >= 1.5) {
        coolOrUncool = "We at Hot Block are always interested in making sure people know when they made life choices that suck. Congratulations, you didn't. You my friend, live in a COOL neighbourhood,bustling with loud, badass and awesome gigs."
      }

      //Set the state of the large combined array so that the library list can use it to display.
      this.setState({
        libraryEvents: 0,
        neighbourhoodResult: coolOrUncool,
      })
    }
  }

  render() {
    return (
      <Router>
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

              {/* RESULTS SECTION */}
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
                      <Route exact path="/" render={() => 
                          <GoogleMapsContainer 
                            location={this.props.location}
                            libraries={this.props.libraries}
                            concerts={this.props.concerts}  
                          />}
                      />
                  </div>
                </div>
            </div>
      </Router>
    );
  }
}

export default Results;