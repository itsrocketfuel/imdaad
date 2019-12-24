import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";

class Main extends Component {

    constructor(props) {super(props)};

    render(){
        
        return(
            <View>
                <Image style = {{width: 200, height: 200, marginTop: 100, marginBottom: 30, alignSelf: 'center'}} source={require('../img/logo1.png')}/>
                <Text style = {{fontWeight: 'bold', fontSize: 15, color: '#84c6ba', alignSelf: 'center', marginBottom: 50}}>Please Select The Following: </Text>
                <TouchableOpacity style = {{borderRadius: 20, width: 300, height: 60, marginBottom: 30, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {() => this.props.navigation.navigate ('login')}>
                    <Text style = {{fontWeight: 'bold', color: 'white', paddingTop: 16, alignSelf: "center"}}> Login </Text></TouchableOpacity>
                <TouchableOpacity style = {{borderRadius: 20, width: 300, height: 60, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {() => this.props.navigation.navigate ('signup')}>
                    <Text style = {{fontWeight: 'bold', color: 'white', paddingTop: 16, alignSelf: "center"}}> Sign Up </Text></TouchableOpacity>
            </View>
              )           
            }
}
export default Main;