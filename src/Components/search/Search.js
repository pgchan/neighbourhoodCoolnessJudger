import React, { Component } from 'react';
import '../home/Home.css';


// Calls
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
		let concertArray = [];
		getConcerts(lat,lng).then(({data}) => {
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

							this.setState({ concerts },() => {
								console.log(this.state.concerts);
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
				<div className="searchContainer wrapper">
					<div className="searchInfo">
						<h1>Welcome to <br/><span className="bold">Hot Block.</span></h1>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti exercitationem repellendus beatae quia inventore, accusantium ratione aspernatur quos incidunt magnam iusto explicabo porro. Perspiciatis repellat, aliquid quod hic accusamus maiores?</p>
					</div>

					<form className="search" onSubmit={this.handleSubmit}> 
						<label htmlFor="searchbar" className="visuallyHidden">Search</label>  
			
						<input type="text" id="location" onChange={this.handleChange} placeholder="Type in your address here..." className="searchbar" name="searchbar" />
					
						<label htmlFor="submit" className="visuallyHidden">Submit</label>
						<input type="submit" id="submit" className="submit" value="Submit"/> 
					</form>
				</div>
			);
	}
}

export default Search;
