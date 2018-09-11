import React, { Component } from 'react';
import './Info.css';

class Info extends Component {
    render() {
        return (
            <div className="infoContent">
                <h2>Who are we?</h2>
                <p>Hot Block measures neighbourhood coolness based on how many badass, loud, awesome music concert events are hosted in your area. Of course, the more book-reading, learn-y Toronto Public Libraries there are in your block, the less cool it is.

                So how hot is your block? We find this out by calculating the total number of music concerts and Toronto Public Library events, within 4km of your given address for the current calendar year. 

                *Disclaimer: We grabbed data straight from the Ticketmaster API and the Toronto Public Library JSON live events feed – we suggest users verify individual details and dates directly through event links. Don't say we didn't warn you. 
                </p>
            </div>
        )
    }
}


export default Info;
