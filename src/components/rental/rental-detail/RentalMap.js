import React from 'react';
import {MapWithGeocode} from 'components/map/GoogleMap';


export class RentalMap extends React.Component{
  
  render(){
const location = this.props.location;

    return(
           <MapWithGeocode
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAm-XQhXnaC5kh3SVx6k5FLB1y3I0AHxHI&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: "100%" }} />}
                  containerElement={<div style={{ height: "330px" }} />}
                  mapElement={<div style={{ height: "100%" }} />}
                  location={location}
                
                />
    )
  }

}