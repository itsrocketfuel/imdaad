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

class FoodR extends Component {

  constructor(props) {super(props);
    this.state = {
      dname:'',
      semail:'',
      name:'',
      quantity:'',
      dates:'',
      condition:'',
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

    addFood = async () =>{
      await this.state.lat;
      await this.state.long;
      fetch('http://'+value+'/addFood', {
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
        condition:this.state.condition,
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
        else if(responseJson.success === 'condition'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'location'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'comments'){
          this.setState({message: responseJson.message})
        }
        else{
          this.props.navigation.navigate('foodr');
          
          this.setState({message: 'Food Added Successfully'})
        }
      })
}
    render(){
        return(
            <View>
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>Add Food</Text>
                <Text style = {{color: '#84c6ba', paddingBottom: 10, alignSelf: 'center'}}>{this.state.message}</Text>

                <TextInput onChangeText={ TextInputValue => this.setState({ name : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Name" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <TextInput onChangeText={ TextInputValue => this.setState({ quantity : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Serving Quantity" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="number-pad"/>

                <DatePicker onDateChange={(date)=>{this.setState({dates:date})}} style = {{marginTop: 10, marginBottom: 10, marginLeft: 60, width: 300}} mode = 'date' placeholder = 'When Was Food Cooked' minDate = '1930-05-05' maxDate = '2030-05-05' format = 'YYYY-MM-DD' date = {this.state.dates}/>
                
                <TextInput onChangeText={ TextInputValue => this.setState({ condition : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Condition (Freshly Cooked, etc)" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {() => this.props.navigation.navigate ('viewlocationr')}>
                <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Location </Text></TouchableOpacity>


                <TextInput onChangeText={ TextInputValue => this.setState({ comments : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Comments" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.addFood}>
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

export default FoodR;