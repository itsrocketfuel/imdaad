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
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 60, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>Funds Donation Detail</Text>

                    <Text style = {{marginLeft: 20, marginRight: 20, color: "#84c6ba", paddingTop: 13, alignSelf: "center"}}> 
                    {"Bank Name: NBP\n\nAccount Title: Imdaad\n\nAccount Number: 1234567890\n\nHelpline No: 090078601\n(Call This Number For Help)\n\nThis money will be used for helping the less fortunate and also in the improvement of the app.\n\n\n'For saving the future of our country.'"}
                    </Text>
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