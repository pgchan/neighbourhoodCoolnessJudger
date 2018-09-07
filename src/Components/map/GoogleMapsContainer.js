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

//         const coolIcon = { 
//             url: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjI1IDAgMCAtMS4yNSAwIDQ1KSI+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGQ0M0RDsiIGQ9Ik00MDkuNi0xNjguOGMwLTExMy4xMDYtOTEuNjk0LTIwNC44LTIwNC44LTIwNC44UzAtMjgxLjkwNiwwLTE2OC44UzkxLjY5NCwzNiwyMDQuOCwzNiAgICAgUzQwOS42LTU1LjY5NCw0MDkuNi0xNjguOCIvPgoJCQk8cGF0aCBzdHlsZT0iZmlsbDojMjkyRjMzOyIgZD0iTTE0LjEwOC04OS4zNmMyLjczMS0yLjcxOSwxNi4zNS0xMC45LDE5LjA4MS0xOS4wNThzOC4xOTItNTQuNDMxLDI0LjU1My02OC4wNSAgICAgYzE2Ljg4NS0xNC4wMjksODAuNTIxLTguODA2LDkyLjcxOC0yLjczMWMyNy4yNzMsMTMuNTk2LDMwLjYxOCw1MS41NTMsMzUuNDQyLDcwLjc4MWMyLjcxOSwxMC44ODksMTkuMDgxLDEwLjg4OSwxOS4wODEsMTAuODg5ICAgICBzMTYuMzczLDAsMTkuMDkyLTEwLjg3N2M0LjgyNC0xOS4yNCw4LjE5Mi01Ny4xOTYsMzUuNDQyLTcwLjc4MWMxMi4yMDgtNi4wODcsNzUuODQ0LTExLjMxLDkyLjc1MiwyLjcxOSAgICAgYzE2LjMyNywxMy42MTksMjEuNzg4LDU5Ljg5MywyNC41MTksNjguMDYyYzIuNzA4LDguMTU4LDE2LjM1LDE2LjMyNywxOS4wODEsMTkuMDQ2YzIuNzQyLDIuNzE5LDIuNzQyLDEzLjYwOCwwLDE2LjMzOCAgICAgYy01LjQ1LDUuNDM5LTY5Ljc5MSwxMC4yODYtMTM5LjA3MSwyLjcxOWMtMTMuODI0LTEuNTEzLTE5LjA4MS01LjQ1LTUxLjgxNC01LjQ1Yy0zMi43MTEsMC0zNy45OSwzLjkzNy01MS44MDMsNS40MzkgICAgIGMtNjkuMjU3LDcuNTc4LTEzMy42MjEsMi43MzEtMTM5LjA3MS0yLjcwOEMxMS4zODktNzUuNzUzLDExLjM4OS04Ni42NDEsMTQuMTA4LTg5LjM2Ii8+CgkJCTxwYXRoIHN0eWxlPSJmaWxsOiM2NjQ1MDA7IiBkPSJNMzExLjAxMi0yMzIuODQ2Yy0yLjAyNSwxLjgzMi01LjA1MiwxLjk0Ni03LjIyNSwwLjMzYy0wLjQ0NC0wLjMzLTQ0LjYyNC0zMi45OTYtOTguOTg3LTMyLjk5NiAgICAgYy01NC4yMjYsMC05OC41NTQsMzIuNjY2LTk4Ljk4NywzMi45OTZjLTIuMTczLDEuNjE2LTUuMiwxLjQ3OS03LjIyNS0wLjMzYy0yLjAxNC0xLjgyLTIuNDY5LTQuODI0LTEuMDctNy4xNDUgICAgIGMxLjQ2OC0yLjQ0NiwzNi42MDItNTkuNjU0LDEwNy4yODEtNTkuNjU0czEwNS44MjUsNTcuMjA3LDEwNy4yODEsNTkuNjU0QzMxMy40ODEtMjM3LjY1OCwzMTMuMDM3LTIzNC42NjYsMzExLjAxMi0yMzIuODQ2Ii8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=',
//         };
//         const coolIcon = { url: './styles/assets/cool.png', scaledSize: { width: 25, height: 25} };

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
                
                    // icon={coolIcon}

             />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                >
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
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAfczrbXkzBLOm5op0o4R96gdqjJaKHrm8')
})(GoogleMapsContainer)