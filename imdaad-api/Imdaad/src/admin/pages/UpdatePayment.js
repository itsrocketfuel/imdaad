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
  Alert,
  Button,
  FlatList
} from "react-native";

import value from '../../host.js';

class UpdatePayment extends Component {

    constructor(props) {super(props);
    this.state = {
      email:'',
      name:'',
      amount:'',
      array:[]
    }}

    componentDidMount(){
      
        this.viewList();
      }

        viewList = () => {
        fetch('http://'+value+'/viewpayment')
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.info === true){
            this.setState({array:responseJson.message});
          }
        }).catch(err=>err)
        }
       

        updateList = () =>{

          fetch('http://'+value+'/payment', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email:this.state.email,
            name:this.state.name,
            amount:this.state.amount,
          })
          }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.info === true){
              this.props.navigation.navigate('updatepayment');
              
              this.setState({message: 'Payment Added Successfully'})
              this.viewList();
            }
          })
        }

    render(){

        return(
            <View style = {{flex:1}}>
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>Add Payment</Text>
                <Text style = {{color: '#84c6ba', marginTop: 7, paddingBottom: 7, alignSelf: 'center'}}>{this.state.message}</Text>
                <View style = {{marginLeft: 80, flex:2, marginTop: 10, marginBottom:10}}>
                    <ScrollView>
                <FlatList data = {this.state.array} renderItem = {({item,index})=> {return (
                  <View style = {{flex:1, flexDirection: 'row', marginLeft: 10}}>
                    <View style = {{flex:1}}>
                    <Text style = {{paddingTop: 10, color: '#84c6ba'}}>{item.email}</Text>
                    </View>
                    <View style = {{flex:1}}>
                    <Text style = {{paddingTop: 10, color: '#84c6ba'}}>{item.name}</Text>
                    </View>
                    <View style = {{flex:1}}>
                    <Text style = {{paddingTop: 10, color: '#84c6ba'}}>{item.amount}</Text>
                    </View>
                  </View>
                )}}/>
                                </ScrollView>
                </View>
                <TextInput onChangeText={ TextInputValue => this.setState({ email : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.email}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ name : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Name" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.name}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ amount : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Amount" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.amount}/>

                <TouchableOpacity style = {{marginTop: 10, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.updateList}>
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

export default UpdatePayment;