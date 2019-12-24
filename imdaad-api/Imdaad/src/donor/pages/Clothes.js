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


class Clothes extends Component {

  constructor(props) {super(props);
    this.state = {
      dname:'',
      semail:'',
      gender:'',
      type:'',
      material:'',
      quantity:'',
      size:'',
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

    addClothes = async () =>{
      fetch('http://'+value+'/addClothes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        semail:this.state.semail,
        dname:this.state.dname,
        gender:this.state.gender,
        type:this.state.type,
        material:this.state.material,
        quantity:this.state.quantity,
        size:this.state.size,
        condition:this.state.condition,
        address:this.props.navigation.getParam('address'),
        lat:this.props.navigation.getParam('lat'),
        long:this.props.navigation.getParam('long'),
        comments:this.state.comments,
      })

      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success === 'gender'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'type'){
            this.setState({message: responseJson.message})
          }
        else if(responseJson.success === 'material'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'quantity'){
          this.setState({message: responseJson.message})
        }
        else if(responseJson.success === 'size'){
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
          this.props.navigation.navigate('clothes');
          
          this.setState({message: 'Clothes Added Successfully'})
        }
      })
}

    render(){
        return(
            <View>
                <ScrollView>
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>Add Clothes</Text>
                <Text style = {{color: '#84c6ba', paddingBottom: 10, alignSelf: 'center'}}>{this.state.message}</Text>
                <View style={{height: 50, width: 300, marginLeft: 55, borderRadius: 20, marginVertical: 10, backgroundColor: 'rgb(248,248,248)'}}>
                <Picker onChangeText={ TextInputValue => this.setState({ gender : TextInputValue }) } style={{marginLeft: 8, color: '#84c6ba', borderRadius: 20, height: 50, width: 300}} selectedValue = {this.state.gender} onValueChange={(itemValue, itemIndex) =>this.setState({gender: itemValue})}>
                    <Picker.Item color = '#84c6ba' label="Gender" value="g" />                  
                    <Picker.Item color = '#84c6ba' label="Male" value="m" />
                    <Picker.Item color = '#84c6ba' label="Female" value="f" />
                </Picker></View>
                <TextInput onChangeText={ TextInputValue => this.setState({ type : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Type Of Clothes" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <TextInput onChangeText={ TextInputValue => this.setState({ material : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Material Of Clothes" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <TextInput onChangeText={ TextInputValue => this.setState({ quantity : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Quantity Of Clothes" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="number-pad"/>
                <View style={{height: 50, width: 300, marginLeft: 55, borderRadius: 20, marginVertical: 10, backgroundColor: 'rgb(248,248,248)'}}>
                <Picker onChangeText={ TextInputValue => this.setState({ size : TextInputValue }) } style={{marginLeft: 8, color: '#84c6ba', borderRadius: 20, height: 50, width: 300}} selectedValue = {this.state.size} onValueChange={(itemValue, itemIndex) =>this.setState({size: itemValue})}>
                    <Picker.Item color = '#84c6ba' label="Size" value="si" />                  
                    <Picker.Item color = '#84c6ba' label="S" value="s" />
                    <Picker.Item color = '#84c6ba' label="M" value="m" />
                    <Picker.Item color = '#84c6ba' label="L" value="l" />
                    <Picker.Item color = '#84c6ba' label="XL" value="xl" />
                </Picker></View>
                <TextInput onChangeText={ TextInputValue => this.setState({ condition : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Condition Of Clothes (Out Of 10)" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="number-pad"/>
                
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {() => this.props.navigation.navigate ('viewlocationc')}>
                <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Location </Text></TouchableOpacity>
                
                <TextInput onChangeText={ TextInputValue => this.setState({ comments : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Comments" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.addClothes}>
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

export default Clothes;