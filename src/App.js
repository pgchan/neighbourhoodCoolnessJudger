import React, { Component } from 'react';
import './App.css';
import Search from './Components/Search';


import GoogleMapsContainer from './Components/GoogleMapsContainer';


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

	
	getSearchTerm = (e) => {
		e.preventDefault();
		console.log(e);
	}

	render() {
		return (
		<div className="App">
			<Search/>
			< GoogleMapsContainer />
		</div>
		);
	}
}

export default App; 

