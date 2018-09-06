import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

// import Paper from 'material-ui/Paper';
// import Typography from 'material-ui/Typography';
// import { typography } from 'material-ui/styles';

class GoogleMapsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }
        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    }
    
    onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
        console.log(this.props.location);
    }

    render() {
        const style = {
            width: '50vw',
            height: '75vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        }

        const coolIcon = { url: './styles/assets/cool.png', scaledSize: { width: 25, height: 25} };
        console.log(this.props.location)
        return (
            <Map
                item
                xs={12}
                style={style}
                google={this.props.google}
                onClick={this.onMapClick}
                zoom={14}
    
    
                initialCenter={this.props.location}
               
                
            >
                <Marker
                    onClick={this.onMarkerClick}
                    title={'Changing Colors Garage'}
                    // defaultCenter={{ lat: 43.6532, lng: 79.3832 }}
                    name={'Changing Colors Garage'}
                    styles={coolIcon}
                />
                {/* <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                > */}
                    {/* <Paper>
                        <Typography
                            variant='headline'
                            component='h4'
                        >
                            Changing Colors Garage
            </Typography>
                        <Typography
                            component='p'
                        >
                            98G Albe Dr Newark, DE 19702 <br />
                            302-293-8627
            </Typography>
                    </Paper> */}
                {/* </InfoWindow> */}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAfczrbXkzBLOm5op0o4R96gdqjJaKHrm8')
})(GoogleMapsContainer)