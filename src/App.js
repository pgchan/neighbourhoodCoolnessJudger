import React, { Component } from 'react';
import './App.css';

// COMPONENTS
import Search from './Components/search/Search';
import GoogleMapsContainer from './Components/GoogleMapsContainer';

// CALLS
import {getLatLong} from './Components/axios/axios'


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

class App extends Component {
	constructor() {
		super();
		this.state = {
			latLong: '',
		}
	}
	returnLatLong = (address) => {
		//Pass the address to the axios call which is broken up into its own component.
		getLatLong(address).then(({data}) => {
			const geoData = data.results[0].geometry.location;
			this.setState({
				latLong: `${geoData.lat}, ${geoData.lng}`,
			})
		});
	}
	render() {
		return (
		<div className="App">
			<Search returnLatLong={this.returnLatLong}/>
		</div>
		);
	}
}

export default App; 

