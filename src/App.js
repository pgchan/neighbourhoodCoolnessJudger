import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

// COMPONENTS
import GoogleMapsContainer from './Components/GoogleMapsContainer';
import Home from './Components/home/Home';
import Results from './Components/results/Results';
import Search from './Components/search/Search';


class App extends Component {
	constructor() {
		super();
		this.state = {
			libraries: '',
			lat: '',
			lng: ''
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
	render(){
	
		const location = {
			lat: this.state.lat, 
			lng: this.state.lng
		};

		return (
			<Router>
				<div className="App">
					<Route exact path="/"  render={() => <Search setLibraries={this.setLibraries} setLatLng={this.setLatLng}/>}/>
					<Route exact path="/:latlong" component={Results}/>
					{this.state.lat ? 
					<GoogleMapsContainer lat={this.state.lat} location={location}/>
					:null } 
				</div>
			</Router>
		);
	}
}

export default App; 

