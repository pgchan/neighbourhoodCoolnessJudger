import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: ''
        }  
    }
    handleChange = (input) => {
        // console.log(input.target.value);
        this.setState({
            [input.target.id]: input.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        //Pass the state to the getLatLong function in App.js
        this.props.returnLatLong(this.state.location);
    }
    render() {
        return (
            <form className="search" onSubmit={this.handleSubmit}> 
                <label htmlFor="location-search"></label>    
                <input type="text" id="location" onChange={this.handleChange} placeholder="search for you address" className="search__bar" />
                <input type="submit" className="" value="submit"/> 
            </form>
        );
    }
}

export default Search;
