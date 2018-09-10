import React, {Component} from "react";
import { Marker, InfoWindow } from "react-google-maps";
import coolIcon from '../../styles/assets/cool.png';

class ConcertVenueMarkers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerClick: false,
    }
  }
  clickMarker = () => {
    this.setState({
      markerClick: true,
    })
  }
  closeMarker = () => {
    this.setState({
      markerClick: false,
    })
  }
  render() {
    return(
      <Marker
        position={this.props.location}
        icon={coolIcon}
        onClick={this.clickMarker}
      >

        {this.state.markerClick ? 
          <InfoWindow>
            <div>
              <p>{this.props.concertVenue._embedded.venues[0].name}</p>
              <p>Address: {this.props.concertVenue._embedded.venues[0].address.line1}</p>
            </div>
          </InfoWindow>
         : null
        }
      </Marker>
    );
  }
}

export default ConcertVenueMarkers;