import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  AsyncStorage,
  Alert,
  BackHandler
} from "react-native";

import value from '../host.js';

import {firebase} from '../../App.js';



class Login extends Component {

  constructor(props) {super(props);
    this.state = {
      email: '',
      password: ''
    }}

    componentDidMount(){
      //AsyncStorage.removeItem('@session:name');
      //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('signup');
    }

    loginUser = (email, password) => {

    }

    checkUser = () =>{
      if (this.state.email === 'admin' && this.state.password === 'admin')
      {
        this.props.navigation.navigate('newsfeed2');
      }
      else{
      fetch('http://'+value+'/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:this.state.email,
        password:this.state.password
      })

      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success === true){
          AsyncStorage.setItem('@session:name',responseJson.message)
          AsyncStorage.setItem('@session:email',this.state.email)
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
        else if(responseJson.success === 'email'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'emails'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'password'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === false){
          this.setState({message: responseJson.message})
        }
      })
    }
    }

    render(){
        return(
            <View>
                <Image style = {{width: 200, height: 200, marginTop: 100, marginBottom: 8, alignSelf: 'center'}} source={require('../img/logo1.png')}/>
                <Text style = {{color: '#84c6ba', paddingBottom: 8, alignSelf: 'center'}}>{this.state.message}</Text>
                <TextInput onChangeText={ TextInputValue => this.setState({ email : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <TextInput onChangeText={ TextInputValue => this.setState({ password : TextInputValue }) } secureTextEntry = {true} style={styles.inputBox}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Password" placeholderTextColor = "#84c6ba" selectionColor="#fff" />
                <Text style = {{fontWeight: 'bold', textDecorationLine: 'underline', color: '#84c6ba', paddingTop: 13, marginLeft: 60}} onPress = {() => this.props.navigation.navigate ('forgotpassword')}>Forgot Password?</Text>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.checkUser} id="signIn">
                    <Text style = {{fontWeight: 'bold', color: 'white', paddingTop: 13, alignSelf: "center"}}> Login </Text></TouchableOpacity>
                    <Text style = {{fontWeight: 'bold', textDecorationLine: 'underline', color: '#84c6ba', alignSelf: 'center'}} onPress = {() => this.props.navigation.navigate ('signup')}>New User? Sign Up</Text>
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

export default Login;