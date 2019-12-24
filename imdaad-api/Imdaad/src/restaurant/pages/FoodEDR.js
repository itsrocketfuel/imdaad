import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  AsyncStorage
} from "react-native";

class FoodEDR extends Component {

    constructor(props) {super(props);
    this.state = {
      semail:null,
      array:[]
    }}

    componentDidMount(){
      AsyncStorage.getItem('@session:email').then(semail=>{this.setState({semail})})

      AsyncStorage.getItem('@session:email',(err,result)=>
      {
        this.viewFoodDonate(result);
      })
  }
    
    viewFoodDonate = async (d) => {
      fetch('http://'+value+'/viewFoodDonate/'+d)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.info == true)
        {
          this.setState({array:responseJson.message})
        }
        else if(responseJson.info == false)
        {
          this.setState({messages:responseJson.message})
        }
      }).catch(err=>err)
      }

      deleteFoodDonate = async (semail,dname,name) => {
        console.log(semail+dname+name)
        Alert.alert('Are you sure you want to delete?', 'Press no to cancel', [{text: 'Yes', onPress:()=>{
          fetch('http://'+value+'/deleteFoodDonate', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email:semail,
            fname:dname,
            name:name
          })
    
          }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.success === true){
              this.setState({message: responseJson.message})
              this.viewFoodDonate();
            }
            else if(responseJson.info === false){
              this.setState({message: responseJson.message})
            }
          })
        }},{text:'No', onPress: () => {this.props.navigation.navigate(foodedr)}}],{cancelable: false});
      }

    render(){
        return(
            <View>
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 25, alignSelf: 'center', fontWeight: 'bold', fontSize: 20}}>Update Donations:</Text>
                <Text style = {{color: '#84c6ba', marginTop: 7, paddingBottom: 7, alignSelf: 'center'}}>{this.state.message}</Text>
                <FlatList data = {this.state.array} renderItem = {({item,index})=> {return (
                  <View style = {{flex:1, flexDirection: 'row', marginLeft: 20}}>
                    <View style = {{flex:2}}>
                    <Text style = {{paddingTop: 10, color: '#84c6ba'}}>{item.name}</Text>
                    </View>
                    <View style = {{flex:1}}>
                          <TouchableOpacity style = {{marginTop: 13, borderRadius: 20, width: 80, height: 30, backgroundColor: '#84c6ba'}} 
                          onPress = {() => this.props.navigation.navigate('foodeditr',({'uemail':item.email,'pname':item.name}))}>
                          <Text style = {{paddingLeft: 15, color: 'white', paddingTop: 4}}> Edit </Text></TouchableOpacity>
                    </View>
                    <View style = {{flex:1}}>
                          <TouchableOpacity style = {{marginTop: 13, borderRadius: 20, width: 80, height: 30, backgroundColor: '#84c6ba'}} 
                          onPress = {() => this.deleteFoodDonate(item.email,item.fname,item.name)}>
                          <Text style = {{paddingLeft: 15, color: 'white', paddingTop: 4}}> Delete </Text></TouchableOpacity>
                    </View>
                  </View>
                )}}/>
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

export default FoodEDR;