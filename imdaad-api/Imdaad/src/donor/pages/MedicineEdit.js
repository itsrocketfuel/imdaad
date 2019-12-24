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

class MedicineEdit extends Component {

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
      //AsyncStorage.getItem('@session:name').then(dname=>{this.setState({dname})})
      AsyncStorage.getItem('@session:email').then(semail=>{this.setState({semail})})
      
      var a = this.props.navigation.getParam('uemail');
      var b = this.props.navigation.getParam('pname');

      this.updateMedList(a,b);
    }

    updateMedList = async (ab,cd) => {
      fetch('http://'+value+'/updateMedicineList/'+ab+'.'+cd)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.info === true){
          this.setState({name: responseJson.name});
          this.setState({quantity: responseJson.quantity});
          this.setState({date: responseJson.date});
          this.setState({description: responseJson.description});
          this.setState({address: responseJson.address});
          this.setState({lat: responseJson.lat});
          this.setState({long:responseJson.long});
          this.setState({comments: responseJson.comments});

          this.prop.navigation.navigate('medicineedit')
        }
      }).catch(err=>err)
    }

    updateMed = async () =>{
      fetch('http://'+value+'/updateMed', {
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
        if(responseJson.success === true){
          this.props.navigation.navigate('medicineedit');
          
          this.setState({message: 'Medicine Updated Successfully'})
        }
        else if(responseJson.success === false){
          this.setState({message: responseJson.message})
        }
      })
}

    render(){
        return(
            <View>
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>Update Medicine</Text>
                <Text style = {{color: '#84c6ba', paddingBottom: 10, alignSelf: 'center'}}>{this.state.message}</Text>
                <TextInput onChangeText={ TextInputValue => this.setState({ name : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Name" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.name}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ quantity : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Quantity" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="number-pad" value = {this.state.quantity}/>
                <DatePicker onDateChange={(date)=>{this.setState({dates:date})}} style = {{marginTop: 10, marginBottom: 10, marginLeft: 60, width: 300}} mode = 'date' placeholder = 'Date Of Expiry' format = 'DD-MM-YYYY' date = {this.state.dates}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ description : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Description" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.description}/>
                
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {() => this.props.navigation.navigate ('viewlocationem', ({lats : this.state.lat, longs: this.state.long}))}>
                <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Location </Text></TouchableOpacity>
                
                <TextInput onChangeText={ TextInputValue => this.setState({ comments : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Comments" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.comments}/>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.updateMed}>
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

export default MedicineEdit;