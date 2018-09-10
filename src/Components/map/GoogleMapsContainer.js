import React, {Component} from "react";
import GoogleMaps from "./GoogleMaps";

class GoogleMapsContainer extends Component {

	render() {
		return (
			<GoogleMaps
        libraries={this.props.libraries}
        concerts={this.props.concerts}
		location={this.props.location}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAfczrbXkzBLOm5op0o4R96gdqjJaKHrm8&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `550px`, width: `700px` }}  />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}

export default GoogleMapsContainer;

