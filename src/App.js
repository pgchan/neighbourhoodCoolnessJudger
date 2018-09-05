import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Components/Search';



class App extends Component {

	
	getSearchTerm = (e) => {
		e.preventDefault();
		console.log(e);
	}

	render() {
		return (
		<div className="App">
			<Search/>
		</div>
		);
	}
}

export default App;
