import React, { Component } from "react";
import {View, Text} from "react-native";
import StarRating from 'react-native-star-rating';
 
class GeneralStarExample extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
    };
  }
 
 
  render() {
    return (
      <View style = {{width: 100, alignSelf: 'center'}}>
        <Text>This Part Of Module Is For 100% Implementation</Text>
      </View>
    );
  }
}
 
export default GeneralStarExample