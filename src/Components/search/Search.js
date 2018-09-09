import React, { Component } from 'react';

// Calls
import { getLatLong, getLibraries, getConcerts } from '../axios/axios'

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
				location: '',
				lat: '',
				lng: '',
				libraries: [],
				concerts: [],

		}  
	}
	returnLatLong = (address) => {
		//Pass the address to the axios call which is broken up into its own component.
		getLatLong(address).then(({data}) => {
			const geoData = data.results[0].geometry.location;
			this.setState({
				lat: geoData.lat,
				lng: geoData.lng
			})
			this.returnLibraries(this.state.lat, this.state.lng);
			this.returnConcerts(this.state.lat, this.state.lng);
			this.props.setLatLng(this.state.lat, this.state.lng);
		});
	}
	returnLibraries = (lat,lng) => {
		//Get the latlong from returnLatLong. Pass it to another axios call called getLibraries. Set the state of libraries and then pass this state back to app.js so the Results page can access it next.
		getLibraries(lat,lng).then(({data}) => {
			this.setState({
				libraries: data.results,
			})
			this.props.setLibraries(this.state.libraries);
		});
	}
	returnConcerts = (lat,lng) => {
		getConcerts(lat,lng).then(({data}) => {
			if (data._embedded) {
				this.setState({
					concerts: data._embedded.events
				})
			} else {
				this.setState({
					concerts: 'There are no concerts in this area.'
				})
			}
			this.props.setConcerts(this.state.concerts)
		})
	}

	handleChange = (input) => {
		this.setState({
			[input.target.id]: input.target.value
		})
	}
	handleSubmit = (e) => {

			e.preventDefault();
			//Pass the address/location to the return lat long function. This function will call the request in the axios folder, passing the address.
			this.returnLatLong(this.state.location);

	}
	render() {
			return (
				<div>
					<form className="search" onSubmit={this.handleSubmit}> 
						<label htmlFor="search">Search</label>    
						<input type="text" id="location" onChange={this.handleChange} placeholder="search for you address" className="search__bar" />
						<input type="submit" className="" value="submit"/> 
					</form>
				</div>
			);
	}
}

export default Search;
