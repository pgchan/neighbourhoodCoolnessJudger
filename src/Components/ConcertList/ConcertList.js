import React from 'react';
import './ConcertList.css';


const ConcertList = (props) => {
  return (
    <div className="concertResults">
        <h1>Concert List</h1>
        <div className="wrapper">
          {Array.isArray(props.concerts) ? 
            props.concerts.map((concert) => {
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
            <h2>{props.concerts}</h2>
          }
        </div>
      </div>
  )
}

export default ConcertList;