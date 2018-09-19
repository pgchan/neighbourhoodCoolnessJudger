import React, { Component } from 'react';

// STYLES
import '../home/Home.css';
import logoYellow from './logoYellow.png';

// CALLS
import { getLatLong, getLibraries, getConcerts, getConcertsAgain } from '../axios/axios'

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location: '',
			lat: '',
			lng: '',
			libraries: [],
			concerts: '',
			showMe: false,
			loading: false
		}  
	}

	returnLatLong = (address) => {
		//Pass the address to the axios call which is broken up into its own component.
		getLatLong(address).then(({data}) => {
			//If the status call returns an OK, then get the lat and long. Else show the error message.
			if (data.status === "OK") {
				const geoData = data.results[0].geometry.location;
				this.setState({
					lat: geoData.lat,
					lng: geoData.lng
				})
				this.returnLibraries(this.state.lat, this.state.lng);
				this.returnConcerts(this.state.lat, this.state.lng);
				this.props.setLatLng(this.state.lat, this.state.lng);
			} else {
				this.setState({
					showMe: true,
					loading: false,
				})
			}
		});
	}

	returnLibraries = (lat,lng) => {
		//Get the latlong from returnLatLong. Pass it to another axios call called getLibraries. Set the state of libraries and then pass this state back to app.js so the Results page can access it next.
		getLibraries(lat,lng).then(({data}) => {
			//If status call is ok then get the libraries if there are results. Else Set libraries to a string.
			if (data.status === "OK") {
				if (data.results) {
					this.setState({
						libraries: data.results,
					})
					this.props.setLibraries(this.state.libraries);
				} else {
					this.setState({
						libraries: 'There are no libraries in this area',
					})
					this.props.setLibraries(this.state.libraries);
				}
			} else {
				this.setState({
					libraries: 'There are no libraries in this area',
				})
				this.props.setLibraries(this.state.libraries);
			}
		});
	}

	returnConcerts = (lat,lng) => {
		getConcerts(lat,lng).then(({data}) => {
			//If the data exists then check how many total pages the call has in total. Push the amount of calls required into an array called pages. Map through the total number of pages and call getConcerts again that many times to get the entire return. 
			if (data._embedded) {
				const pages = [];
				for (let i = 0; i < data.page.totalPages; i++) {
					pages.push(i);
				}
				const requests = pages.map((pageNum) => {
					return getConcertsAgain(lat,lng,pageNum)
				})
			
				Promise.all(requests)
					.then((res) => {
						const concerts = res
							.map(res => res.data._embedded.events)
							.reduce((acc,curr) => [...acc,...curr]);

							this.setState({ 
								concerts 
							})
							this.props.setConcerts(this.state.concerts);
					});
			} else {
				this.setState({
					concerts: 'There are no concerts in this area.'
				})
				this.props.setConcerts(this.state.concerts)
			}
		})
	}

	handleChange = (input) => {
		this.setState({
			[input.target.id]: input.target.value,
		})
	}

	handleSubmit = (e) => {
			e.preventDefault();
			//Pass the address/location to the return lat long function. This function will call the request in the axios folder, passing the address.

		if (this.state.location === '') {
				this.setState({showMe: true});
			} else {
				this.setState({ showMe: false, loading: true })
				this.returnLatLong(this.state.location);
			}
	}

	render() {
			return (
				<div className="searchContainer wrapper">
					<h1>Welcome to</h1>
					<div className="searchInfo">
						<img className="logo" src={logoYellow} alt="Hot Block Logo" />
						<p>Enter your address below to find out whether your neighbourhood is a hot block – or a nerdy dungeon.</p>
					</div>

					<form className="search" onSubmit={this.handleSubmit}> 
						<label htmlFor="searchbar" className="visuallyHidden">Search</label>  
						<div className="searchBoxContainer">
							<input type="text" id="location" onChange={this.handleChange} className="searchbar" name="searchbar" required />
							<label htmlFor="location" className="floatingLabel">Type in your address here</label>
						</div>
						<div className="searchBoxLabel">
							<label htmlFor="submit" className="visuallyHidden">Submit</label>
							<input type="submit" id="submit" className="submit" value="Submit"/> 
						</div>
					</form>

					{this.state.showMe ?
					<div className="addressValidator">
						<p>Please enter a valid address.</p>
					</div>
					: null
					}

				{this.state.loading ?
				<div className="loadingBars">
					<img src={require("./loading.gif")} alt=""/>
				</div>
				: null
				} 
			</div>
		);
	}
}

export default Search;