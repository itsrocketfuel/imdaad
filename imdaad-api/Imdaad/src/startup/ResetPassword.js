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
  AsyncStorage
} from "react-native";

import value from '../host.js';

class ResetPassword extends Component {

  constructor(props) {super(props);
    this.state = {
      id: this.props.navigation.getParam('userid'),
      password: '',
      email: '',
      cpassword: ''
    }}

    resetPass = () =>{
      if (this.state.password !== this.state.cpassword){
        this.setState({message: "Password Does Not Match"})
      }
      else {
      fetch('http://'+value+'/resetpass', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:this.state.id,
        password:this.state.password
      })

      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success === false){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'password'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === true){
          AsyncStorage.setItem('@session:name', responseJson.message)
          AsyncStorage.setItem('@session:email',responseJson.messages)

          if(responseJson.type == 'donorV')
          {
            this.props.navigation.navigate('newsfeed');
          }
          else if(responseJson.type == 'donorR')
          {
            this.props.navigation.navigate('newsfeed1');
          }

          this.setState({message: ''})
        }  
      })
    }
    }

    render(){
        return(
            <View>
                <Image style = {{width: 200, height: 200, marginTop: 100, marginBottom: 30, alignSelf: 'center'}} source={require('../img/logo1.png')}/>
                <Text style = {{color: '#84c6ba', paddingBottom: 8, alignSelf: 'center'}}>{this.state.message}</Text>
                <TextInput onChangeText={ TextInputValue => this.setState({ password : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="New Password" placeholderTextColor = "#84c6ba" selectionColor="#fff" secureTextEntry = {true}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ cpassword : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Confirm Password" placeholderTextColor = "#84c6ba" selectionColor="#fff" secureTextEntry = {true}/>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.resetPass}>
                    <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Reset </Text></TouchableOpacity>
                    <Text style = {{fontWeight: 'bold', paddingBottom: 30, textDecorationLine: 'underline', color: '#84c6ba', alignSelf: 'center'}} onPress = {() => this.props.navigation.navigate ('forgotpassword')}>Go Back</Text>
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

export default ResetPassword;