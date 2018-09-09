import React, {Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import LibraryMarkers from "./LibraryMarkers";
import ConcertVenueMarkers from './ConcertVenueMarkers';

const GoogleMaps = withScriptjs(withGoogleMap((props) => {
  const libraryLocations = props.libraries.map((place) => {
    return <LibraryMarkers location={place.geometry.location}/>
  });
  
  let concertVenueLocations;

  if (Array.isArray(props.concerts)) {
    concertVenueLocations = props.concerts.map((venue) => {
      const location = venue._embedded.venues[0].location;
      return <ConcertVenueMarkers location={{lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)}}/>
    });
  }
  return (
    console.log(props.concerts),
    <GoogleMap defaultZoom={12} center={props.location}>
      {libraryLocations}
      {concertVenueLocations}
    </GoogleMap>
    );
  }
  ))
  
  export default GoogleMaps;