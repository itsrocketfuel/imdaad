import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  ScrollView,
  RefreshControl,
  TextInput,
  StyleSheet,
  Alert
} from "react-native";


class ProfileReport extends Component {

    constructor(props) {super(props);
        this.state = {
          array:[],
          message:''
        }}
    
        componentDidMount(){
            this.viewProfileReports();
        }

        viewProfileReports = async () => {
            fetch('http://'+value+'/viewProfileReports/')
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

          deleteProfiles = (email) =>{
            console.log(email)
            fetch('http://'+value+'/deleteProfiles', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              emaila:email
            })
      
            }).then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.success === true){
                this.setState({message: responseJson.message})
                this.viewProfileReports();
              }
              else if(responseJson.info === false){
                this.setState({message: responseJson.message})
              }
            })
          }
        
        render(){
        
            return(
                <View>
                    <Text style = {{textDecorationLine: 'underline' ,fontSize: 18, fontWeight: 'bold', color: "#84c6ba", alignSelf: 'center', marginTop: 10, marginBottom: 15}}>Profile Reports</Text>
                    <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 15}}>{this.state.message}</Text>
                    <FlatList data = {this.state.array} renderItem = {({item,index})=> {return (
                  <View style = {{flex:1, flexDirection: 'row', marginLeft: 20}}>
                    <View style = {{flex:3}}>
                    <Text style = {{paddingTop: 10, color: '#84c6ba'}}>{item.fname}</Text>
                    </View>
                    <View style = {{flex:1}}>
                          <TouchableOpacity style = {{marginTop: 13, borderRadius: 20, width: 80, height: 30, backgroundColor: '#84c6ba'}} 
                          onPress = {() => this.deleteProfiles(item.email)}>
                          <Text style = {{paddingLeft: 15, color: 'white', paddingTop: 4}}> Delete </Text></TouchableOpacity>
                    </View>
                  </View>
                )}}/>
                </View>
            )}
}

export default ProfileReport;