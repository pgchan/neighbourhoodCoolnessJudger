import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

// COMPONENTS
import GoogleMapsContainer from './Components/GoogleMapsContainer';
import Home from './Components/home/Home';
import Results from './Components/results/Results';
import Search from './Components/search/Search';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <h1 className="App-title">WE'RE GOING TO AFRICA</h1>
//           </header>
//           < GoogleMapsContainer/>
//       </div>
//     );
//   }
	// returnLatLong = (address) => {
	// 	//Pass the address to the axios call which is broken up into its own component.
	// 	getLatLong(address).then(({data}) => {
	// 		const geoData = data.results[0].geometry.location;
	// 		this.setState({
	// 			latLong: `${geoData.lat}, ${geoData.lng}`,
	// 		})
	// 	});
	// }

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
		//Function to set the state of libraries. it is called in search.js returnLibraries function
		this.setState({
			libraries
		})
	}
	render() {
		return (
			<Router>
				<div className="App">
					<Route exact path="/"  render={() => <Search setLibraries={this.setLibraries} setLatLng={this.setLatLng}/>} />
					<Route exact path="/:latlong" component={Results}/>
				</div>
			</Router>
		);
	}
}

export default App; 

