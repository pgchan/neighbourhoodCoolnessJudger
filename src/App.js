import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// STYLES
import './App.css';
import './setup.css';
import logoYellow from './styles/assets/logoYellow.png';

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
		this.setState({
			libraries
		})
	}

	setConcerts = (concerts) => {
		this.setState({
			concerts
		})
	}

	handleInfo = (e) => {
		e.preventDefault();

		this.setState({ showMe: true });
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
					
					// Results Page (only once API calls are successful)
					<main className="results">
						<div className="logoContainer wrapper">
							<img className="logo" src={logoYellow} alt="Hot Block Logo"/>
						</div>		
						<Route exact path="/" render={() => 
							<Results
								location={location}
								concerts={this.state.concerts}
								libraries={this.state.libraries}
								libraryEvents={this.state.libraryEvents}
							/>}
						/> 
					</main> :
						
					// Home Page
					<div className="homeBackground">
						<header className="clearfix">
							<div className="logoContainer wrapper">
								<img className="logo" src={logoYellow} alt="Hot Block Logo"/>
							</div>			
						</header>
						
						<Route exact path="/" render={() =>
							<Home
								setLibraries={this.setLibraries}
								setConcerts={this.setConcerts}
								setLatLng={this.setLatLng}
							/>}
						/>
					</div>
					}

					<footer>
						<div className="clearfix footerWrapper">
							<p>&copy; 2018</p>
							<p>Made by David Tran, Pratik Gauchan & Victoria Chan</p>
						</div>
					</footer> 
				</div>
			</Router>
		);
	}
}

export default App; 

