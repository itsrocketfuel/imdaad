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

class UpdateCauseE extends Component {

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
        AsyncStorage.getItem('@session:email').then(semail=>{this.setState({semail})})
      
        var a = this.props.navigation.getParam('cemail');
        var b = this.props.navigation.getParam('ctitle');
        var c = this.props.navigation.getParam('cname');

        this.showCause(a,b,c);
    }

    showCause = async (ab,cd,ef) => {
        fetch('http://'+value+'/showCause/'+ab+'.'+cd+'.'+ef)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.info === true){
            this.setState({title: responseJson.title});
            this.setState({name: responseJson.name});
            this.setState({age: responseJson.age});
            this.setState({phoneno: responseJson.phoneno});
            this.setState({problem: responseJson.problem});
            this.setState({req: responseJson.req});

            this.prop.navigation.navigate('updatecausee')
          }
        }).catch(err=>err)
      }

    editCause = () =>{
  
      fetch('http://'+value+'/editCause', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //pic:this.state.pic,
        email:this.props.navigation.getParam('cemail'),
        name:this.props.navigation.getParam('ctitle'),
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
        if(responseJson.success === true){
            this.props.navigation.navigate('updatecausee');
            
            this.setState({message: 'Cause Updated Successfully'})
          }
          else if(responseJson.success === false){
            this.setState({message: responseJson.message})
          }
      })
}
    render(){
        return(
            <View>
                <ScrollView>
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>Update Cause</Text>
                <Text style = {{color: '#84c6ba', paddingBottom: 10, alignSelf: 'center'}}>{this.state.message}</Text>
                <TextInput onChangeText={ TextInputValue => this.setState({ title : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Title" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.title}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ name : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Name" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.name}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ age : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Age" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="number-pad" value = {this.state.age}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ phoneno : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Phone Number" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="number-pad" value = {this.state.phoneno}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ problem : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Problem" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.problem}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ req : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Requirement" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.req}/>
                <Text style = {{paddingTop: 10, color: "#84c6ba", alignSelf: 'center', marginBottom: 10}}>Documents</Text>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.editCause}>
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

export default UpdateCauseE;