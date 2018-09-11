import React, { Component } from 'react';

class LibraryList extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div className="wrapper">
        <h1>Library List</h1>
        <div className="libraryResults">
          {this.props.libraryEvents.map((library) => {
            return (
              <ul key={library.link}>
                <a href={library.link} target="_blank" className="eventContainer">
                  <li className="eventContainer__header">{library.title}</li>
                  <li>{library.date1}, {library.time}</li>
                  <li>{library.library}</li>
                </a>
              </ul>
            )
          })}
        </div>
      </div>
    )
  }
}

export default LibraryList;