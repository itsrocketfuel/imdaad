import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput
} from "react-native";

class HomeA extends Component {

  constructor(props) {super(props);
    this.state = {
      note:'',
      messages:'',
      user:'admin'
    }}

    componentDidMount(){
      this.viewMessage();
    }

    viewMessage = () => {
        fetch('http://'+value+'/viewMessage/'+this.state.user)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.info === true){
            this.setState({note: responseJson.message});
    }
        })}

    message = () => {
      fetch('http://'+value+'/message', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user:this.state.user,
        message:this.state.note,
      })

      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success === true){
          this.setState({messages: responseJson.message})
          this.viewMessage();
        }
        else if(responseJson.success === false){
          this.setState({messages: responseJson.message})
          this.viewMessage();
        }
      })
    }

    render(){
        
        return(
            <View style = {{flex:1}}>
              <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 20, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>News Feed</Text>
              <View style = {{flex:1}}>
              <Text style = {{fontWeight: 'bold', color: '#84c6ba', alignSelf: 'center', marginTop: 10, marginBottom: 15}}>Note For Users</Text>
              <Text style = {{color: '#84c6ba', paddingBottom: 10, alignSelf: 'center'}}>{this.state.messages}</Text>
              <TextInput onChangeText={ TextInputValue => this.setState({ note : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Message For All Users" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.note}/>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.message}>
                <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Submit </Text></TouchableOpacity>
              </View>
            </View>
              )           
            }
}
export default HomeA;

const styles = StyleSheet.create({
  inputBox1: {
    width: 300,
    height: 150,
    backgroundColor: 'rgb(248,248,248)', 
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
    alignSelf: "center"
}})