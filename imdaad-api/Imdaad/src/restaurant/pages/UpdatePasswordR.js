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

import value from '../../host.js';

class UpdatePasswordR extends Component {

  constructor(props) {super(props);
    this.state = {
      email: '',
      password: '',
      cpassword: '',
      ccpassword: ''
    }}

    componentDidMount(){
      AsyncStorage.getItem('@session:email').then(email=>{this.setState({email})})
    }

    updatePass = () =>{
      if (this.state.password === '' || this.state.ccpassword == '' || this.state.cpassword == '')
      {
        this.setState({message: "Please Fill All Fields"})
      }
      else if (this.state.password === this.state.cpassword){
        this.setState({message: "Old and New Password Can Not Be Same"})
      }
      else if (this.state.cpassword !== this.state.ccpassword)
      {
        this.setState({message: "Password Does Not Match"})
      }
      else {
        console.log('Hualal')
      fetch('http://'+value+'/updatepass', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:this.state.email,
        password:this.state.password,
        ccpassword:this.state.ccpassword
      })

      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success === false){
          this.setState({message: responseJson.message})
        }  
        else if(responseJson.success === true){
          this.setState({message: responseJson.message})

          this.prop.navigation.navigate('updatepasswordr')
        }  
      })
    }
    }

    render(){
        return(
            <View>
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 15, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>Update Password</Text>
                <Text style = {{color: '#84c6ba', marginTop: 7, paddingBottom: 5, alignSelf: 'center'}}>{this.state.message}</Text>
                <TextInput onChangeText={ TextInputValue => this.setState({ password : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Old Password" placeholderTextColor = "#84c6ba" selectionColor="#fff" secureTextEntry = {true}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ cpassword : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="New Password" placeholderTextColor = "#84c6ba" selectionColor="#fff" secureTextEntry = {true}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ ccpassword : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Confirm Password" placeholderTextColor = "#84c6ba" selectionColor="#fff" secureTextEntry = {true}/>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.updatePass}>
                    <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Update </Text></TouchableOpacity>
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

export default UpdatePasswordR;