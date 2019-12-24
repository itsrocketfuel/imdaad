import React from 'react';
import LocationView from "react-native-location-view";
import {View} from "react-native";


export default class SelectLocationScreen extends React.Component {
  state = {
      latitude:this.props.navigation.getParam('lats'),
      longitude:this.props.navigation.getParam('longs')
  };



  render() {
    console.log(this.state.longitude + "huba buba");
    return(
      <View style={{flex: 1}}>
        <LocationView
          apiKey={'AIzaSyAuReuHR0qpdEm9gYZaKSa9cKXkWgiNZIY'}
          initialLocation={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}
          markerColor= {'#84c6ba'}
          actionButtonStyle = {{color: '#84c6ba'}}
          onLocationSelect = { e => {
            console.log(e.address);
            this.setState ({latitude: e.latitude, longitude: e.longitude});
            this.props.navigation.navigate ('clothesedit', {lat: this.state.latitude, long: this.state.longitude, address: e.address})
          }}
        />
      </View>
    );
  }
}