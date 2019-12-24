import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  ScrollView,
  StyleSheet
} from "react-native";
//import { ScrollView } from "react-native-gesture-handler";

class HomeR extends Component {

  constructor(props) {super(props);
    this.state = {
      note:'',
      user:'admin'
    }}

    componentDidMount(){
      this.viewMessage();
    }

    viewMessage = () => {
        fetch('http://'+value+'/viewMessage/'+this.state.user)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.info === true){
            this.setState({note: responseJson.message});
    }
        })}

    render(){
        
        return(
            <View style = {{flex:1}}>
              <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 20, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>News Feed</Text>
              <View style = {{flex:1}}>
              <Text style = {{fontWeight: 'bold', color: '#84c6ba', alignSelf: 'center', marginTop: 10, marginBottom: 15}}>Admin's Note For Users</Text>
              <Text style={styles.inputBox1}>{this.state.note}</Text>
              </View>
            </View>
              )           
            }
}
export default HomeR;

const styles = StyleSheet.create({
  inputBox1: {
    width: 300,
    height: 150,
    backgroundColor: 'rgb(248,248,248)', 
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
    alignSelf: "center"
}})