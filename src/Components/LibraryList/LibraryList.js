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
          {Array.isArray(this.props.libraryEvents) ?
            this.props.libraryEvents.map((library) => {
            return (
              <ul key={library.link}>
                {/* <li><h2>{library.library}</h2></li> */}
                <li><a href={library.link} target="_blank">{library.title}</a></li>
                <li>{library.date1}, {library.time}</li>
                <li>{library.library}</li>
              </ul>
            )
          })
          : <h2>{this.props.libraries}</h2>
          }
        </div>
      </div>
    )
  }
}

export default LibraryList;