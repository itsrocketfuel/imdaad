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


class CauseReport extends Component {

    constructor(props) {super(props);
        this.state = {
          array:[],
          message:''
        }}
    
        componentDidMount(){
            this.viewCauseReports();
        }

        viewCauseReports = async () => {
            fetch('http://'+value+'/viewCauseReports/')
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

          deleteCauses = (titl,nam) =>{
            console.log(titl + nam);
            fetch('http://'+value+'/deleteCauses', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title:titl,
              name:nam
            })
      
            }).then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.success === true){
                this.setState({message: responseJson.message})
                this.viewCauseReports();
              }
              else if(responseJson.info === false){
                this.setState({message: responseJson.message})
              }
            })
          }
        
        render(){
        
            return(
                <View>
                    <Text style = {{textDecorationLine: 'underline' ,fontSize: 18, fontWeight: 'bold', color: "#84c6ba", alignSelf: 'center', marginTop: 10, marginBottom: 15}}>Cause Reports</Text>
                    <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 15}}>{this.state.message}</Text>
                    <FlatList data = {this.state.array} renderItem = {({item,index})=> {return (
                  <View style = {{flex:1, flexDirection: 'row', marginLeft: 20}}>
                    <View style = {{flex:3}}>
                    <Text style = {{paddingTop: 10, color: '#84c6ba'}}>{item.title}</Text>
                    </View>
                    <View style = {{flex:1}}>
                          <TouchableOpacity style = {{marginTop: 13, borderRadius: 20, width: 80, height: 30, backgroundColor: '#84c6ba'}} 
                          onPress = {() => this.deleteCauses(item.title, item.name)}>
                          <Text style = {{paddingLeft: 15, color: 'white', paddingTop: 4}}> Delete </Text></TouchableOpacity>
                    </View>
                  </View>
                )}}/>
                </View>
            )}
}

export default CauseReport;