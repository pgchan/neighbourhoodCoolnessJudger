import React from 'react';
import Search from '../search/Search';
import './Home.css';
import logoYellow from '../../styles/assets/logoYellow.png';

const Home = (props) => {
  return(
    <div className="homeBackground">
      <header className="clearfix">
        <div className="logoContainer wrapper">
          <img className="logo" src={logoYellow} alt="Hot Block Logo"/>
        </div>
      {/* <div className="infoContainer wrapper">
        <button>i</button>
      </div> */}
      </header>
      <Search 
        setLibraries={props.setLibraries}
        setConcerts={props.setConcerts}
        setLatLng={props.setLatLng}
      />
    </div>
  )
}

export default Home;