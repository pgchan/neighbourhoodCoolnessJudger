import React, {Component} from "react";
import { Marker, InfoWindow } from "react-google-maps";
import nerdIcon from '../../styles/assets/nerd.png';
import './map.css';

class LibraryMarkers extends Component {
  constructor(props) {
    super(props)
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
        icon={nerdIcon}
        onClick={this.clickMarker}
      >
        {this.state.markerClick ?
          <InfoWindow onCloseClick={this.closeMarker}>
              <div>
                <p className="info-window-blurb">{this.props.library.name}</p>
                <p className="info-window-blurb">Address: {this.props.library.vicinity}</p>
              </div>
          </InfoWindow>
          : null
        }
      </Marker>
    );
  }
}

export default LibraryMarkers;