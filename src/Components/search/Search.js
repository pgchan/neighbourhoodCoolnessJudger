import React, { Component } from 'react';
import '../home/Home.css';


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

			showMe: false,
			loading: false
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

					{this.state.showMe ?
					<div className="addressValidator">
						<p>* Please enter a valid address.</p>
					</div>
					: null
					}

					{this.state.loading ?
					<div className="loadingBars">
						<img src={require("./loading.gif")} />
					</div>
					: null
					} 
				</div>
			);
	}
}

export default Search;
