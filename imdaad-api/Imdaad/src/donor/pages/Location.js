import React from 'react';
import LocationView from "react-native-location-view";
import {View} from "react-native";


export default class SelectLocationScreen extends React.Component {
  state = {
      latitude:null,
      longitude:null
  };

  render() {
    return(
      <View style={{flex: 1}}>
        <LocationView
          apiKey={'AIzaSyAuReuHR0qpdEm9gYZaKSa9cKXkWgiNZIY'}
          initialLocation={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          markerColor= {'#84c6ba'}
          actionButtonStyle = {{color: '#84c6ba'}}
          onLocationSelect = { e => {
            console.log(e.address);
            this.setState ({latitude: e.latitude, longitude: e.longitude});
            this.props.navigation.navigate ('food', {lat: this.state.latitude, long: this.state.longitude, address: e.address})
          }}
        />
      </View>
    );
  }
}