import React, { Component } from 'react';

import { getLibraryEvents } from '../axios/axios'

class Events extends Component {
    constructor(props) {
        super(props);
        this.state={
            libraryEvents: [],
        }
    }

    returnLibraryEvents = (events) => {
        getLibraryEvents(events).then(({data}) => {
            console.log(data);
            
            this.setState({
                libraryEvents: data
            })
            this.props.getLibraryEvents(this.state.libraryEvents)
        })
        
    }

}



