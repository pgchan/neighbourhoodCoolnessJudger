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
                  <ul key={concert.id}>
                    <a href={concert.url} target="_blank" className="eventContainer">
                      <li className="eventContainer__header">{concert.name}</li>
                      <li>{concert.dates.start.localDate}, {concert.dates.start.localTime}</li>
                      <li>Venu - {concert._embedded.venues[0].name}</li>
                    </a>
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