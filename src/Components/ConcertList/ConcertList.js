import React from 'react';

const ConcertList = (props) => {
  return (
    <div className="wrapper">
      <h1>Concert List</h1>
      <div className="concertResults">
        {Array.isArray(props.concerts) ? 
          props.concerts.map((concert) => {
            return(
              <ul key={concert.id}>
                <li><a href={concert.url} target="_blank">{concert.name}</a></li>
                <li>{concert.dates.start.localDate}, {concert.dates.start.localTime}</li>
                <li>Venu - {concert._embedded.venues[0].name}</li>
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