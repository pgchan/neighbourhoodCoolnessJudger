import React, {Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import LibraryMarkers from "./LibraryMarkers";
import ConcertVenueMarkers from './ConcertVenueMarkers';

const GoogleMaps = withScriptjs(withGoogleMap((props) => {
  
  let concertVenueLocations;
  let libraryLocations;

  if (Array.isArray(props.libraries)) {
    libraryLocations = props.libraries.map((place) => {
      return <LibraryMarkers location={place.geometry.location} library={place}/>
    });
  }

  if (Array.isArray(props.concerts)) {
    concertVenueLocations = props.concerts.map((venue) => {
      const location = venue._embedded.venues[0].location;
      return <ConcertVenueMarkers location={{lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)}} concertVenue={venue}/>
    });
  }
  return (
    <GoogleMap defaultZoom={12} center={props.location}>
      <Marker position={props.location} />
      {libraryLocations}
      {concertVenueLocations}
    </GoogleMap>
    );
  }
  ))
  
  export default GoogleMaps;