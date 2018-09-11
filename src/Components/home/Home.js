import React from 'react';
import Search from '../search/Search';
import './Home.css';

const Home = (props) => {
  return(
    <div className="homeBackground">
      <div className="overlay">
        <Search 
          setLibraries={props.setLibraries}
          setConcerts={props.setConcerts}
          setLatLng={props.setLatLng}
        />
      </div>
    </div>
  )
}

export default Home;