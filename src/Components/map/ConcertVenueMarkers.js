import React from "react";
import { Marker } from "react-google-maps";
import coolIcon from '../../styles/assets/cool.png';


const ConcertVenueMarkers = (props) => {
  return(
    <Marker
      position={props.location}
      icon={coolIcon}
    >
    </Marker>
  );
}

export default ConcertVenueMarkers;