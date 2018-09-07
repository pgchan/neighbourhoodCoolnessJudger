import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import './App.css';

// COMPONENTS
import Home from './Components/home/Home';
import Results from './Components/results/Results';
import { getLibraryEvents } from './Components/axios/axios';


class App extends Component {
	constructor() {
		super();
		this.state = {
			libraries: '',
			lat: '',
			lng: '',
			concerts: '',
			libraryEvents: [],

		}
	}

	componentDidMount() {
		getLibraryEvents().then(({data}) => {
			this.setState({
				libraryEvents: data
			})
		})
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
					<main className="results">
						<Redirect to="/location" />
							<Route path="/location" render={() => 
								<Results
									location={location}
								/>}
							/> 
					</main> :
					<Route exact path="/"  render={() => 
						<Home 
							setLibraries={this.setLibraries} 
							setConcerts={this.setConcerts} 
							setLatLng={this.setLatLng}
						/>}
					/> 
				} 
				</div>
			</Router>
		);
	}
}

export default App; 

