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
              <li><a href={library.link} target="_blank">{library.title}</a></li>
              <li>{library.date1}, {library.time}</li>
              <li>{library.library}</li>
            </ul>
          )
        })
        : <h2>{props.libraries}</h2>
        }
      </div>
    </div>
  )
}

export default LibraryList;