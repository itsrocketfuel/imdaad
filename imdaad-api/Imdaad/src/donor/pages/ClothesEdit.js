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


class ClothesEdit extends Component {

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
      
      var a = this.props.navigation.getParam('uemail');
      var b = this.props.navigation.getParam('ptype');

      this.updateClothesList(a,b);
    }

    updateClothesList = async (ab,cd) => {
      fetch('http://'+value+'/updateClothesList/'+ab+'.'+cd)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.info === true){
          this.setState({gender: responseJson.gender});
          this.setState({type: responseJson.type});
          this.setState({material: responseJson.material});
          this.setState({quantity: responseJson.quantity});
          this.setState({size: responseJson.size});
          this.setState({address: responseJson.address});
          this.setState({lat: responseJson.lat});
          this.setState({long:responseJson.long});
          this.setState({comments: responseJson.comments});

          this.prop.navigation.navigate('clothesedit')
        }
      }).catch(err=>err)
    }

    updateClothes = async () =>{
      fetch('http://'+value+'/updateClothes', {
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
        if(responseJson.success === true){
          this.props.navigation.navigate('clothesedit');
          
          this.setState({message: 'Clothes Updated Successfully'})
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
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>Update Clothes</Text>
                <Text style = {{color: '#84c6ba', paddingBottom: 10, alignSelf: 'center'}}>{this.state.message}</Text>
                <View style={{height: 50, width: 300, marginLeft: 55, borderRadius: 20, marginVertical: 10, backgroundColor: 'rgb(248,248,248)'}}>
                <Picker onChangeText={ TextInputValue => this.setState({ gender : TextInputValue }) } style={{marginLeft: 8, color: '#84c6ba', borderRadius: 20, height: 50, width: 300}} selectedValue = {this.state.gender} onValueChange={(itemValue, itemIndex) =>this.setState({gender: itemValue})}>
                    <Picker.Item color = '#84c6ba' label="Gender" value="g" />                  
                    <Picker.Item color = '#84c6ba' label="Male" value="m" />
                    <Picker.Item color = '#84c6ba' label="Female" value="f" />
                </Picker></View>
                <TextInput onChangeText={ TextInputValue => this.setState({ type : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Type Of Clothes" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.type}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ material : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Material Of Clothes" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.material}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ quantity : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Quantity Of Clothes" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="number-pad" value = {this.state.quantity}/>
                <View style={{height: 50, width: 300, marginLeft: 55, borderRadius: 20, marginVertical: 10, backgroundColor: 'rgb(248,248,248)'}}>
                <Picker onChangeText={ TextInputValue => this.setState({ size : TextInputValue }) } style={{marginLeft: 8, color: '#84c6ba', borderRadius: 20, height: 50, width: 300}} selectedValue = {this.state.size} onValueChange={(itemValue, itemIndex) =>this.setState({size: itemValue})}>
                    <Picker.Item color = '#84c6ba' label="Size" value="si" />                  
                    <Picker.Item color = '#84c6ba' label="S" value="s" />
                    <Picker.Item color = '#84c6ba' label="M" value="m" />
                    <Picker.Item color = '#84c6ba' label="L" value="l" />
                    <Picker.Item color = '#84c6ba' label="XL" value="xl" />
                </Picker></View>
                <TextInput onChangeText={ TextInputValue => this.setState({ condition : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Condition Of Clothes (Out Of 10)" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="number-pad" value = {this.state.condition}/>
                
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {() => this.props.navigation.navigate ('viewlocationec', ({lats : this.state.lat, longs: this.state.long}))}>
                <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Location </Text></TouchableOpacity>
                
                <TextInput onChangeText={ TextInputValue => this.setState({ comments : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Comments" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.comments}/>
                <TouchableOpacity style = {{marginTop: 30, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.updateClothes}>
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

export default ClothesEdit;