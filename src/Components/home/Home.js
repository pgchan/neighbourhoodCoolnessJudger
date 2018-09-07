import React, {Component} from 'react';
import Search from '../search/Search';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <h1>Home</h1>
        <Search 
          setLibraries={this.props.setLibraries}
          setConcerts={this.props.setConcerts}
          setLatLng={this.props.setLatLng}
        />
      </div>
    )
  }
}

export default Home;