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

class Medicine extends Component {

  constructor(props) {super(props);
    this.state = {
      dname:'',
      semail:'',
      name:'',
      quantity:'',
      dates:'',
      description:'',
      comments:'',
      message:''
    }
  }

    componentDidMount(){
      AsyncStorage.getItem('@session:name').then(dname=>{this.setState({dname})})
      AsyncStorage.getItem('@session:email').then(semail=>{this.setState({semail})})
      
      /*var doo = new Date()
      var datea = doo.getFullYear() + '/' + doo.getMonth() + '/' + doo.getDate(); 
      this.setState({dates: datea})*/
    }

    addMedicine = async () =>{
      fetch('http://'+value+'/addMedicine', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        semail:this.state.semail,
        dname:this.state.dname,
        name:this.state.name,
        quantity:this.state.quantity,
        date:this.state.dates,
        description:this.state.description,
        address:this.props.navigation.getParam('address'),
        lat:this.props.navigation.getParam('lat'),
        long:this.props.navigation.getParam('long'),
        comments:this.state.comments,
      })

      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success === 'name'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'quantity'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'date'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'description'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'location'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'comments'){
          this.setState({message: responseJson.message})
        }
        else{
          this.props.navigation.navigate('medicine');
          
          this.setState({message: 'Medicine Added Successfully'})
        }
      })
}

    render(){
        return(
            <View>
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>Add Medicine</Text>
                <Text style = {{color: '#84c6ba', paddingBottom: 10, alignSelf: 'center'}}>{this.state.message}</Text>
                <TextInput onChangeText={ TextInputValue => this.setState({ name : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Name" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <TextInput onChangeText={ TextInputValue => this.setState({ quantity : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Quantity" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="number-pad"/>
                <DatePicker onDateChange={(date)=>{this.setState({dates:date})}} style = {{marginTop: 10, marginBottom: 10, marginLeft: 60, width: 300}} mode = 'date' placeholder = 'Date Of Expiry' format = 'DD-MM-YYYY' date = {this.state.dates}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ description : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Description" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {() => this.props.navigation.navigate ('viewlocationm')}>
                <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Location </Text></TouchableOpacity>
                
                <TextInput onChangeText={ TextInputValue => this.setState({ comments : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Comments" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.addMedicine}>
                <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Submit </Text></TouchableOpacity>
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

export default Medicine;