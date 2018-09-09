import React, {Component} from 'react';
import Search from '../search/Search';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="homeBackground">
        <div className="overlay">
          {/* <h1>Home</h1> */}
          <Search 
            setLibraries={this.props.setLibraries}
            setConcerts={this.props.setConcerts}
            setLatLng={this.props.setLatLng}
          />
        </div>
      </div>
    )
  }
}

export default Home;