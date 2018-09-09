import React from "react";
import { Marker } from "react-google-maps";
import nerdIcon from '../../styles/assets/nerd.png';


const LibraryMarkers = (props) => {
  return(
    <Marker
      position={props.location}
      icon={nerdIcon}
    >
    </Marker>
  );
}

export default LibraryMarkers;