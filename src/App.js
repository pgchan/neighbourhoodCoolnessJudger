import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

// COMPONENTS
import GoogleMapsContainer from './Components/map/GoogleMapsContainer';
import Home from './Components/home/Home';
import Results from './Components/results/Results';


class App extends Component {
	constructor() {
		super();
		this.state = {
			libraries: '',
			lat: '',
			lng: '',
			concerts: '',

		}
	}
	setLatLng = (lat, lng) => {
		this.setState({
			lat,
			lng
		})
	}
	setLibraries = (libraries) => {
		// Function to set the state of libraries. it is called in search.js returnLibraries function
		this.setState({
			libraries
		})
	}
	setConcerts = (concerts) => {
		this.setState({
			concerts
		})
	}
	render() {
		const location = {
			lat: this.state.lat,
			lng: this.state.lng
		};
		return (
			<Router>
				<div className="App">
				{this.state.lat && this.state.lng && this.state.concerts && this.state.libraries ? 
					<Route exact path="/" render={() => 
						<Results
							location={location}
						/>}
					/> :
					<Route exact path="/"  render={() => 
						<Home 
							setLibraries={this.setLibraries} 
							setConcerts={this.setConcerts} 
							setLatLng={this.setLatLng}
						/>}
					/> 
				} 
					

					{/* {this.state.lat ? 
					<GoogleMapsContainer location={location}/>
					:null }  */}
				</div>
			</Router>
		);
	}
}

export default App; 

