import React from 'react';

const LibraryList = (props) => {
    return (
      <div className="wrapper">
        <h1>Library List</h1>
        <div className="libraryResults">
          {Array.isArray(props.libraryEvents) ? 
            props.libraryEvents.map((library) => {
              return (
                <ul key={library.id}>
                  <a href={library.link} target="_blank" className="eventContainer">
                    <li className="eventContainer__header">{library.title}</li>
                    <li>{library.date1}, {library.time}</li>
                    <li>{library.library}</li>
                  </a>
                </ul>
              )})
            : <h2>{props.libraries}</h2>
          }
        </div>
      </div>
  )
}

export default LibraryList;