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

class FoodEditR extends Component {

  constructor(props) {super(props);
    this.state = {
      semail:'',
      name:'',
      quantity:'',
      date:'',
      condition:'',
      comments:'',
      message:''
    }
  }

    componentDidMount(){
      AsyncStorage.getItem('@session:email').then(semail=>{this.setState({semail})})
      
      var a = this.props.navigation.getParam('uemail');
      var b = this.props.navigation.getParam('pname');

      this.updateFoodList(a,b);
    }


      updateFoodList = async (ab,cd) => {
        fetch('http://'+value+'/updateFoodList/'+ab+'.'+cd)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.info === true){
            this.setState({name: responseJson.name});
            this.setState({quantity: responseJson.quantity});
            this.setState({date: responseJson.date});
            this.setState({condition: responseJson.condition});
            this.setState({address: responseJson.address});
            this.setState({lat: responseJson.lat});
            this.setState({long:responseJson.long});
            this.setState({comments: responseJson.comments});

            this.prop.navigation.navigate('foodeditr')
          }
        }).catch(err=>err)
      }

    updateFood = async () =>{
      fetch('http://'+value+'/updateFood', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        semail:this.state.semail,
        name:this.state.name,
        quantity:this.state.quantity,
        date:this.state.date,
        condition:this.state.condition,
        address:this.props.navigation.getParam('address'),
        lat:this.props.navigation.getParam('lat'),
        long:this.props.navigation.getParam('long'),
        comments:this.state.comments,
      })

      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success === true){
          this.props.navigation.navigate('foodeditr');
          
          this.setState({message: 'Food Updated Successfully'})
        }
        else if(responseJson.success === false){
          this.setState({message: responseJson.message})
        }
      })
}
    render(){
        return(
            <View>
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>Update Food</Text>
                <Text style = {{color: '#84c6ba', paddingBottom: 10, alignSelf: 'center'}}>{this.state.message}</Text>

                <TextInput onChangeText={ TextInputValue => this.setState({ name : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Name" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.name}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ quantity : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Serving Quantity" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="number-pad" value = {this.state.quantity}/>

                <DatePicker onDateChange={(date)=>{this.setState({date:date})}} style = {{marginTop: 10, marginBottom: 10, marginLeft: 60, width: 300}} mode = 'date' placeholder = 'When Was Food Cooked' minDate = '1930-05-05' maxDate = '2030-05-05' format = 'YYYY-MM-DD' date = {this.state.date}/>
                
                <TextInput onChangeText={ TextInputValue => this.setState({ condition : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Condition (Freshly Cooked, etc)" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.condition}/>
                
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {() => this.props.navigation.navigate ('viewlocationer', ({lats : this.state.lat, longs: this.state.long}))}>
                <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Location </Text></TouchableOpacity>


                <TextInput onChangeText={ TextInputValue => this.setState({ comments : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Comments" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.comments}/>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.updateFood}>
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

export default FoodEditR;