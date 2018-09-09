import React, { Component } from 'react';
// import GoogleMapsContainer from '../map/GoogleMapsContainer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class ConcertList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Route exact path="/ConcertList" component={ConcertList} />
                <div className="wrapper">
                    <h1>Concert List</h1>

                    <div className="concertResults" concerts={this.props.concerts} >
                        {this.props.concerts.map((concert) => {
                            <ul>
                                <li><a href={concert.url} target="_blank">{concert.name}</a></li>
                                <li>{concert.dates.start.localDate}, {concert.dates.start.localTime}</li>
                            </ul>
                        }
                        )}
                    </div>
                </div>
            </Router >
        )
    }
}

export default ConcertList;