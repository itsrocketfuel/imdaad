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
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native";

import RadioForm from 'react-native-simple-radio-button';

var radio_props = [{label: 'Donor/Volunteer   ', value: 'donorV'},{label: 'Restaurant Donor', value: 'donorR'}]

import value from '../host.js';

import {firebase} from '../../App.js';

class SignUp extends Component {

    constructor(props) {super(props);
      this.state = {
        fname:'',
        lname:'',
        email: '',
        password: '',
        cpassword:'',
        securityQ: '',
        securityA: '',
        type: '', //type radio button is missing currently

        user: undefined,
        phone: '',
        confirmationResult: undefined,
        code: ''
      }
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ user })
    })
    }
   /*   signUpUser = () => {
        try{
          if(this.state.password.length<6)
          {
            alert("Please enter at least 6 characters!");
            return;
          }
          firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password);
        }
        catch(error)
        {
          console.log(error.toString());
        }
      } */

      InsertUser = () =>{

        try{
          if(this.state.password.length<6)
          {
            alert("Please enter at least 6 characters!");
            return;
          }
          firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password);
        }
        catch(error)
        {
          console.log(error.toString());
        }

        fetch('http://'+value+'/signUp', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: this.state.fname,
          lname: this.state.lname,
          email:this.state.email,
          password:this.state.password,
          securityQ: this.state.securityQ,
          securityA: this.state.securityA,
          type:this.state.type, //radio button
        })

        }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.success === 'firstn'){
            this.setState({message: responseJson.message})
          }
          else if(responseJson.success === 'lastn'){
            this.setState({message: responseJson.message})
          }
          else if(responseJson.success === 'emai'){
            this.setState({message: responseJson.message})
          }
          else if(responseJson.success === 'email'){
            this.setState({message: responseJson.message})
          }
          else if(responseJson.success === 'ABCD'){
            this.setState({message: responseJson.message})
          }
          else if(responseJson.success === 'pass'){
            this.setState({message: responseJson.message})
          }
          else if (this.state.password !== this.state.cpassword){
            this.setState({message: 'Password Does Not Match'})
          }
          else if(responseJson.success === 'secQ'){
            this.setState({message: responseJson.message})
          }
          else if(responseJson.success === 'secA'){
            this.setState({message: responseJson.message})
          }
          else if(responseJson.success === 'typ'){
            this.setState({message: responseJson.message})
          }
          else{
            AsyncStorage.setItem('@session:name',this.state.fname)
            AsyncStorage.setItem('@session:email',this.state.email)
          if(this.state.type == 'donorV')
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

  render(){
    return(
      <KeyboardAvoidingView behavior = 'height'>
      <ScrollView>
            <Image style = {{width: 200, height: 200, marginTop: 100, marginBottom: 8, alignSelf: 'center'}} source={require('../img/logo1.png')}/>
            <Text style = {{color: '#84c6ba', paddingBottom: 8, alignSelf: 'center'}}>{this.state.message}</Text>
            <TextInput onChangeText={ TextInputValue => this.setState({ fname : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="First Name" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
            <TextInput onChangeText={ TextInputValue => this.setState({ lname : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Last Name" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
            <TextInput onChangeText={ TextInputValue => this.setState({ email : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
            <TextInput onChangeText={ TextInputValue => this.setState({ password : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Password" placeholderTextColor = "#84c6ba" selectionColor="#fff" secureTextEntry = {true}/>
            <TextInput onChangeText={ TextInputValue => this.setState({ cpassword : TextInputValue }) }style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Confirm Password" placeholderTextColor = "#84c6ba" selectionColor="#fff" secureTextEntry = {true}/>
            <View style={{height: 50, width: 300, marginLeft: 55, borderRadius: 20, marginVertical: 10, backgroundColor: 'rgb(248,248,248)'}}>
            <Picker onChangeText={ TextInputValue => this.setState({ securityQ : TextInputValue }) } style={{marginLeft: 8, color: '#84c6ba', borderRadius: 20, height: 50, width: 300}} selectedValue = {this.state.securityQ} onValueChange={(itemValue, itemIndex) =>this.setState({securityQ: itemValue})}>
                <Picker.Item color = '#84c6ba' label="Please Select Security Question" value="nothing" />                  
                <Picker.Item color = '#84c6ba' label="What is your Pet's Name?" value="pet" />
                <Picker.Item color = '#84c6ba' label="What is your Mother's Maiden Name?" value="motherMaiden" />
            </Picker>
            </View>
            <TextInput onChangeText={ TextInputValue => this.setState({ securityA : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Security Question's Answer" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
            <View style = {{alignSelf: 'center', marginTop: 10, marginBottom: 10}}><RadioForm buttonColor = '#84c6ba' labelColor = '#84c6ba' buttonSize = {10} buttonOuterSize = {22} labelStyle = {{fontSize: 14, fontWeight: 'bold', color: '#84c6ba'}}
            radio_props = {radio_props} formHorizontal = {true} initial = {0} onPress = {(value) => {this.setState({type: value})}}/></View>
            <TouchableOpacity style = {{marginTop: 10, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}}  onPress={this.InsertUser}>
                <Text style = {{fontWeight: 'bold', color: 'white', paddingTop: 13, alignSelf: "center"}}> Sign Up </Text></TouchableOpacity>
                <Text style = {{fontWeight: 'bold', paddingBottom: 30, textDecorationLine: 'underline', color: '#84c6ba', alignSelf: 'center'}} onPress = {() => this.props.navigation.navigate ('login')}>Already A User? Login</Text>
      </ScrollView>
      </KeyboardAvoidingView>
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


export default SignUp;