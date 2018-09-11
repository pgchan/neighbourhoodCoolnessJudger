import React, { Component } from 'react';
import {BrowserRouter as Router, Redirect, Route, Link} from 'react-router-dom';
import './App.css';
import './setup.css';

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

			showMe: false,
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
	destroyStates = () => {
		this.setState({
			libraries: '',
			lat: '',
			lng: '',
			concerts: '',
			libraryEvents: [],
		}, () => {

		})
	}
	checkNeededPage = () => {
		if (this.state.concerts.length > 0 && this.state.libraries.length > 0) {
			return <Redirect to="/results" />
		}
		else {
			return <Home exact path="/"
				setLibraries={this.setLibraries}
				setConcerts={this.setConcerts}
				setLatLng={this.setLatLng}
			/>
		}
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
		console.log(this.state.concerts.length > 0 && this.state.libraries.length > 0);
		return (
			<Router>
				<div className="App">
					<Route exact path="/results" render={() => {
						if (this.state.concerts === "" && this.state.libraries === "") {
							return <Redirect to="/"/>
						} else {
						return <Results
							location={location}
							concerts={this.state.concerts}
							libraries={this.state.libraries}
							libraryEvents={this.state.libraryEvents}
							destroyStates={this.destroyStates}
						/>
						}
					}}
					/> 
					<Route exact path="/" render={() => {
						// this.checkNeededPage();
						if (this.state.concerts.length > 0 && this.state.libraries.length > 0) {
							return <Redirect to="/results" />
						}
						else {
							return <Home exact path="/"
								setLibraries={this.setLibraries}
								setConcerts={this.setConcerts}
								setLatLng={this.setLatLng}
							/>
						}
					}}
				/>
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

