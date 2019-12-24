import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  ScrollView,
  Alert
} from "react-native";
//import { ScrollView } from "react-native-gesture-handler";

class viewProfile extends Component {

    constructor(props) {super(props);
        this.state = {
          //dname:'',
          email:null,
          fname:'',
          lname:'',
          bio:'',
          dob:'',
          phoneno:'',
          //secQ:'',
          //secA:'',
          image: '',
          messagesa:''
        }}
    
        componentDidMount(){
            this.setState({email:this.props.navigation.getParam('emails')});
            //console.log(this.state.email + 'hello')
            
            this.viewProfile()
        }

        viewProfile = async () => {
            await this.state.email;
            fetch('http://'+value+'/viewprofile/'+this.state.email)
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.info === true){
                this.setState({fname: responseJson.fname});
                this.setState({lname: responseJson.lname});
                this.setState({bio: responseJson.bio});
                this.setState({dob: responseJson.dob});
                this.setState({phoneno: responseJson.phoneno});
                this.setState({image:responseJson.image});

                this.setState({email: ''});
              }
            }).catch(err=>err)
        }

        ReportP = async (email,fname,lname) => {

        Alert.alert('Are you sure you want to report?', 'Press no to cancel', [{text: 'Yes', onPress:()=>{
          fetch('http://'+value+'/reportP', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email:email,
            fname:fname,
            lname:lname
          })
    
          }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.info === true){
              this.setState({messagesa: responseJson.message})
              this.viewProfile();
            }
            else if(responseJson.info === false){
              this.setState({messagesa: responseJson.message})
            }
          })
        }},{text:'No', onPress: () => {this.props.navigation.navigate('viewprofile')}}],{cancelable: false});
      }

    render(){
        
        return(
            <View>
              <ScrollView>
              <Text style = {{textDecorationLine: 'underline' ,fontSize: 18, fontWeight: 'bold', color: "#84c6ba", alignSelf: 'center', marginTop: 10, marginBottom: 15}}>User Profile</Text>
                <Image source={{ uri: this.state.image }} style={{alignSelf: 'center', width: 100, height: 100, borderRadius: 40, paddingBottom: 30, marginBottom: 15}} />
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 20}}>{this.state.fname}</Text>
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 20}}>{this.state.lname}</Text>
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 20}}>{this.state.bio}</Text>
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 20}}>{this.state.dob}</Text>
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 40}}>{this.state.phoneno}</Text>            
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 15}}>{this.state.messagesa}</Text>    
                <TouchableOpacity style = {{marginTop: 13, borderRadius: 20, width: 150, height: 40, backgroundColor: '#84c6ba', alignSelf:'center'}} onPress = {() => this.ReportP(this.props.navigation.getParam('emails'),this.state.fname,this.state.lname)}>
                          <Text style = {{paddingLeft: 45, color: 'white', paddingTop: 6}}> Report </Text></TouchableOpacity>
            </ScrollView>
            </View>
              )           
            }
}
export default viewProfile;