import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Picker
} from "react-native";

class Donation extends Component {

    constructor(props) {super(props)};

    render(){
        return(
            <View>
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 50, alignSelf: 'center', fontWeight: 'bold', fontSize: 24}}>Donation Menu</Text>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 60, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {() => this.props.navigation.navigate ('funds')}>
                    <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Funds </Text></TouchableOpacity>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 60, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {() => this.props.navigation.navigate ('medicine')}>
                    <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Medicine </Text></TouchableOpacity>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 60, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {() => this.props.navigation.navigate ('clothes')}>
                    <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Clothes </Text></TouchableOpacity>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 60, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {() => this.props.navigation.navigate ('food')}>
                    <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Food </Text></TouchableOpacity>
            </View>
              )           
            }
}

const styles = StyleSheet.create({
  inputBox: {
      width: 300,
      height: 50,
      backgroundColor: 'rgb(248,248,248)', 
      borderRadius: 20,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#002f6c',
      marginVertical: 10,
      alignSelf: "center"
  }})

export default Donation;