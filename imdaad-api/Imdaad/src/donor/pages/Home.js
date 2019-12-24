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

class Home extends Component {

  constructor(props) {super(props);
    this.state = {
      dname:'',
      //semail:'',
      
      //ddname:'',
      //title:'',
      //name:'',
      //age:'',
      
      array:[],
      note:'',
      user:'admin'
    }}

    componentDidMount(){
      AsyncStorage.getItem('@session:name').then(dname=>{this.setState({dname})})
      //AsyncStorage.getItem('@session:email').then(semail=>{this.setState({semail})})
      this.viewCauses();
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

    viewCauses = () => {
      fetch('http://'+value+'/viewCause')
      .then((response) => response.json())
      .then((responseJson) => {
        //if(responseJson.info == true){
          console.log('hi'+responseJson)
          this.setState({array:responseJson})
          console.log(this.state.array)
          /*this.setState({ddname: responseJson.fname});
          this.setState({title: responseJson.title});
          this.setState({name: responseJson.name});
          this.setState({age: responseJson.age});*/

          this.prop.navigation.navigate('home')
        //}
      }).catch(err=>err)
    }

    render(){
        
        return(
            <View style = {{flex:1}}>
              <View style = {{flex:3}}>
              <ScrollView>
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, marginBottom: 20, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>News Feed</Text>

                <FlatList data = {this.state.array} renderItem = {({item,index})=> {return (
                  <View style = {{flex:1, flexDirection: 'row', marginLeft: 110}}>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate ('viewprofile', {emails: item.email})}>
                      <View style = {{marginRight: 20}}><Image source={{ uri: item.pic }} style={{alignSelf: 'center', width: 50, height: 50, borderRadius: 50}} />
                        <Text style = {{alignSelf: 'center', color: '#84c6ba', alignSelf: 'center'}}>{item.fname}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate ('viewcause1', {emails: item.email, titles: item.title})}>
                      <View style = {{paddingTop: 5, paddingLeft: 10, width: 160, borderColor: '#000000'}}>
                        <Text style = {{color: '#84c6ba', alignSelf: 'center'}}>{item.title}</Text>
                        <Text style = {{color: '#84c6ba', alignSelf: 'center'}}>{item.name}</Text>
                        <Text style = {{color: '#84c6ba', alignSelf: 'center'}}>{item.age}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}}/>
              </ScrollView>
              </View>
              <View style = {{flex:1}}>
              <Text style = {{fontWeight: 'bold', color: '#84c6ba', alignSelf: 'center', marginTop: 10, marginBottom: 15}}>Admin's Note For Users</Text>
              <Text style={styles.inputBox1}>{this.state.note}</Text>
              </View>
            </View>
              )           
            }
}
export default Home;

const styles = StyleSheet.create({
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