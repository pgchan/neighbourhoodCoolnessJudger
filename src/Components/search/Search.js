import React, { Component } from 'react';

// Calls
import {getLatLong, getLibraries} from '../axios/axios'

class Search extends Component {
	constructor(props) {
			super(props);
			this.state = {
					location: '',
					latLong: '',
					libraries: [],
			}  
	}
	returnLatLong = (address) => {
		//Pass the address to the axios call which is broken up into its own component.
		getLatLong(address).then(({data}) => {
			const geoData = data.results[0].geometry.location;
			this.setState({
				latLong: `${geoData.lat}, ${geoData.lng}`,
			})
			this.returnLibraries(this.state.latLong);
		});
	}
	returnLibraries = (latLong) => {
		console.log('return libraries is called');
		getLibraries(latLong).then(({data}) => {
			this.setState({
				libraries: data.results,
			})
			this.props.setLibraries(this.state.libraries);
		});
	}
	handleChange = (input) => {
			this.setState({
					[input.target.id]: input.target.value
			})
	}
	handleSubmit = (e) => {
			e.preventDefault();
			//Pass the state to the getLatLong function in App.js
			this.returnLatLong(this.state.location);
	}
	render() {
			return (
				<form className="search" onSubmit={this.handleSubmit}> 
					<label htmlFor="search">Search</label>    
					<input type="text" id="location" onChange={this.handleChange} placeholder="search for you address" className="search__bar" />
					<input type="submit" className="" value="submit"/> 
				</form>
			);
	}
}

export default Search;
