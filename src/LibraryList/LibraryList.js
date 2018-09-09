import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class LibraryList extends Component {
    constructor(props) {
        super (props)
        this.state={
            libraryEvents: []
        }
    }
    render() {
        return (
            <Router>
                <div className="wrapper">
                    <h1>Library List</h1>

                    <div className="libraryResults"> 
                        {this.props.libraryEvents.map((library) => {
                            console.log(library);
                            
                            return (
                                <ul key={library.link}>
                                    <li><a href={library.link} target="_blank">{library.title}</a></li>
                                    <li>{library.date1}, {library.time}</li>
                                </ul>
                            )
                        })}
                    </div>
                </div>
            </Router>       
        )
    }
}

export default LibraryList;