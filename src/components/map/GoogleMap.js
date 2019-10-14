import React from "react";
import { Cacher } from "services/cacher";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
  InfoWindow
} from "react-google-maps";

const MapComponent = ({ coordinates, isError, isLocationLoaded }) => (
  //debugger
  <GoogleMap defaultZoom={13} defaultCenter={coordinates} 
  cnter={coordinates}
  options={{disableDefaultUI:isError ? true :false}}
  >
    {isLocationLoaded && !isError && (
      <Circle center={coordinates} radius={500} />
    )}
    {isLocationLoaded && isError && (
      <InfoWindow position={coordinates} option={{maxWidth:300}}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
          illo doloremque! Quo laudantium possimus doloremque maxime vero nam.
          Dolorum eos placeat nihil praesentium recusandae! Odio cupiditate
          maxime inventore corporis culpa!
        </div>
      </InfoWindow>
    )}
  </GoogleMap>
); //if not error  after &&

function withGeocode(WrappedComponent) {
  return class extends React.Component {
    constructor() {
      super();

      //instanciate can use cacher value from cacher.js
      this.cacher = new Cacher();

      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        },
        isError: false,
        isLocationLoaded: false
      };
    }

    componentWillMount() {
      this.getGeocodeLocation();
    }

    updateCordinates(coordinates){
      this.setState({
        coordinates,
        isLocationLoaded:true
      })
    }

    //nwe Promise
    geocodeLocation(location) {
      const geocoder = new window.google.maps.Geocoder();
      //promise return result and reject ..err handling
      return new Promise((result, reject) => {
        geocoder.geocode({ address: location }, (result, status) => {
          if (status === "Ok") {
            const geometry = result[0].geometry.location;
            const coordinates = { lat: geometry.lat(), lng: geometry.lng() };

            this.cacher.cacheValue(location, coordinates); //use method

            result(coordinates);
          } else {
            reject("Error!!!");
          }
        });
      });
    }

    getGeocodeLocation() {
      const location = this.props.location;

    
      //if location is cached , return cached value
      if (this.cacher.isValueCached(location)) {
        this.updateCoordinates(this.cacher.getCachedValue(location));
    
      } else {
        this.geocodeLocation(location).then(
          coordinates => {
          this.updateCoordinates(coordinates)
          },
          error => {
            this.setState({
              isLocationLoaded: true,
              isError: true
            });
          }
        );
      }
    }
    //else geocode location

    render() {
      return <WrappedComponent {...this.state} />;
    } //pass state
  };
}

//high orceder function withScripts wrap withGooglemap then component
export const MapWithGeocode = withScriptjs(
  withGoogleMap(withGeocode(MapComponent))
);
