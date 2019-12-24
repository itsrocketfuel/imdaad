import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Picker,
  Alert
} from "react-native";

import value from '../host.js';

class ForgotPassword extends Component {

  constructor(props) {super(props);
    this.state = {
      email: '',
      securityQ: '',
      securityA: '',
    }}

    forgotPass = () =>{

      fetch('http://'+value+'/forgotpass', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:this.state.email,
        securityQ:this.state.securityQ,
        securityA:this.state.securityA
      })

      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success === 'emai'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'email'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'secQ'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'secA'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === false){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === true){
          this.props.navigation.navigate('resetpassword', {userid: responseJson.message});
          
          this.setState({message: ''})
        }
      })
    }

    render(){
        return(
            <View>
                <Image style = {{width: 200, height: 200, marginTop: 100, marginBottom: 30, alignSelf: 'center'}} source={require('../img/logo1.png')}/>
                <Text style = {{color: '#84c6ba', paddingBottom: 8, alignSelf: 'center'}}>{this.state.message}</Text>
                <TextInput onChangeText={ TextInputValue => this.setState({ email : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <View style={{height: 50, width: 300, marginLeft: 55, borderRadius: 20, marginVertical: 10, backgroundColor: 'rgb(248,248,248)'}}>
                <Picker onChangeText={ TextInputValue => this.setState({ securityQ : TextInputValue }) } style={{fontSize: 12, marginLeft: 8, color: '#84c6ba', borderRadius: 20, height: 50, width: 300}} selectedValue = {this.state.securityQ} onValueChange={(itemValue, itemIndex) =>this.setState({securityQ: itemValue})}>
                    <Picker.Item color = '#84c6ba' label="Please Select Security Question" value="nothing" />                  
                    <Picker.Item color = '#84c6ba' label="What is your Pet's Name?" value="pet" />
                    <Picker.Item color = '#84c6ba' label="What is your Mother's Maiden Name?" value="motherMaiden" />
                </Picker>
                </View>
                <TextInput onChangeText={ TextInputValue => this.setState({ securityA : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Security Question's Answer" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.forgotPass}>
                    <Text style = {{fontWeight: 'bold', color: 'white', paddingTop: 13, alignSelf: "center"}}> Reset </Text></TouchableOpacity>
                    <Text style = {{fontWeight: 'bold', paddingBottom: 30, textDecorationLine: 'underline', color: '#84c6ba', alignSelf: 'center'}} onPress = {() => this.props.navigation.navigate ('login')}>Go Back</Text>
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

export default ForgotPassword;