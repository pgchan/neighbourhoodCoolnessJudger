import React, { Component } from 'react';

class ConcertList extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    return (
        <div className="wrapper">
          <h1>Concert List</h1>
          <div className="concertResults">
            {Array.isArray(this.props.concerts) ? 
              this.props.concerts.map((concert) => {
                return(
                  <ul>
                    <li><a href={concert.url} target="_blank">{concert.name}</a></li>
                    <li>{concert.dates.start.localDate}, {concert.dates.start.localTime}</li>
                  </ul>
                )
              }
              ) : 
              <h2>{this.props.concerts}</h2>
            }
          </div>
        </div>
    )
  }
}

export default ConcertList;