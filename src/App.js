import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import './App.css';
import './setup.css';

// COMPONENTS
import Home from './Components/home/Home';
import Results from './Components/results/Results';
import { getLibraryEvents } from './Components/axios/axios';
import logoYellow from './styles/assets/logoYellow.png';

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
							<div className="logoContainer wrapper">
								<img className="logo" src={logoYellow} />
							</div>
								{/* <Redirect to="/location" /> */}
									<Route path="/" render={() => 
										<Results
											location={location}
											concerts={this.state.concerts}
											libraries={this.state.libraries}
											concerts={this.state.concerts}
											libraryEvents={this.state.libraryEvents}
										/>}
									/> 
							</main> :
							<div className="homeBackground">
							<header className="clearfix">
								<div className="logoContainer wrapper">
									<img className="logo" src={logoYellow} />
								</div>
								<div className="infoContainer wrapper">
									<button>i</button>
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

