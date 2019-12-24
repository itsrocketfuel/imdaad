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
import DatePicker from 'react-native-datepicker';

class Cause extends Component {

  constructor(props) {super(props);
    this.state = {
      pic:'',
      dname:'',
      semail:'',
      title:'',
      name:'',
      age:'',
      phoneno:'',
      problem:'',
      req:'',
      //documents(photos):''
    }
  }

    componentDidMount(){
      AsyncStorage.getItem('@session:name').then(dname=>{this.setState({dname})})
      AsyncStorage.getItem('@session:email').then(semail=>{this.setState({semail})})
      AsyncStorage.getItem('@session:img').then(pic=>{this.setState({pic})})
    }

    addCause = () =>{
  
      fetch('http://'+value+'/addCause', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pic:this.state.pic,
        semail:this.state.semail,
        dname:this.state.dname,
        title:this.state.title,
        name:this.state.name,
        age:this.state.age,
        phoneno:this.state.phoneno,
        problem:this.state.problem,
        req:this.state.req,
        //documents:this.state.documents,
      })

      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success === 'title'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'name'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'age'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'phoneno'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'problem'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'req'){
          this.setState({message: responseJson.message})
        }
        /*else if(responseJson.success === 'documents'){
          this.setState({message: responseJson.message})
        }*/
        else{
          this.props.navigation.navigate('cause');
          
          this.setState({message: 'Cause Added Successfully'})
          AsyncStorage.removeItem('@session:img');
        }
      })
}
    render(){
        return(
            <View>
                <ScrollView>
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>Add Cause</Text>
                <Text style = {{color: '#84c6ba', paddingBottom: 10, alignSelf: 'center'}}>{this.state.message}</Text>
                <TextInput onChangeText={ TextInputValue => this.setState({ title : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Title" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <TextInput onChangeText={ TextInputValue => this.setState({ name : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Name" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <TextInput onChangeText={ TextInputValue => this.setState({ age : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Age" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="number-pad"/>
                <TextInput onChangeText={ TextInputValue => this.setState({ phoneno : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Phone Number" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="number-pad"/>
                <TextInput onChangeText={ TextInputValue => this.setState({ problem : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Problem" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <TextInput onChangeText={ TextInputValue => this.setState({ req : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Requirement" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <Text style = {{paddingTop: 10, color: "#84c6ba", alignSelf: 'center', marginBottom: 10}}>Documents</Text>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.addCause}>
                <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Submit </Text></TouchableOpacity>
             </ScrollView>
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
  },
  inputBox1: {
    width: 300,
    height: 100,
    backgroundColor: 'rgb(248,248,248)', 
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
    alignSelf: "center"
}})

export default Cause;