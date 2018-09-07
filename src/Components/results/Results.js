import React, { Component } from 'react';
import GoogleMapsContainer from '../map/GoogleMapsContainer';

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
      console.log(filteredEvents);
    })
  }
  // locationLibraryEvents = () => {
    
  // }
  render() {
    return (
      <div className="wrapper">
        <h1>Results Page</h1>
        <GoogleMapsContainer location={this.props.location}/>
      </div>
    )
  }
}

export default Results;