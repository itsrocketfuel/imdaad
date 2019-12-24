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
  AsyncStorage,
  Alert,
  Button
} from "react-native";
import DatePicker from 'react-native-datepicker';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import value from '../../host.js';

class UpdateProfile extends Component {

    constructor(props) {super(props);
    this.state = {
      dname:'',
      semail:'',
      fname:'',
      lname:'',
      bio:'',
      dob:'',
      phoneno:'',
      secQ:'',
      secA:'',
      image: null
    }}

    componentDidMount(){
      AsyncStorage.getItem('@session:name').then(dname=>{this.setState({dname})})
      AsyncStorage.getItem('@session:email').then(semail=>{this.setState({semail})})

      AsyncStorage.getItem('@session:email',(err,result)=>
      {
        fetch('http://'+value+'/updateprofile/'+result)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.info === true){
            this.setState({fname: responseJson.fname});
            this.setState({lname: responseJson.lname});
            this.setState({bio: responseJson.bio});
            this.setState({dob: responseJson.dob});
            this.setState({phoneno: responseJson.phoneno});
            this.setState({secQ: responseJson.secQ});
            this.setState({secA: responseJson.secA});
            this.setState({image:responseJson.image});

            AsyncStorage.setItem('@session:img',this.state.image)

            this.prop.navigation.navigate('updateprofile')
          }
        }).catch(err=>err)
      })

      this.getPermissionAsync();
    }    
      getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }
    
      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
        });
        
        console.log(result);

        var x = '192.168.10.12:19001/src/'+result.width+'.jpg';
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };

        updateUser = () =>{

          fetch('http://'+value+'/updateprofile1', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            semail:this.state.semail,
            fname:this.state.fname,
            lname:this.state.lname,
            bio:this.state.bio,
            dob:this.state.dob,
            phoneno:this.state.phoneno,
            secQ:this.state.secQ,
            secA:this.state.secA,
            image:this.state.image
          })
    
          }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.success === true){
              this.props.navigation.navigate('updateprofile');
              
              this.setState({message: 'Profile Successfully Updated'})
            }
          })
        }

    render(){
      let { image } = this.state;
        return(
            <View>
                <ScrollView>
                <Text style = {{textDecorationLine: 'underline', color: '#84c6ba', marginTop: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>Update Profile</Text>
                <Text style = {{color: '#84c6ba', marginTop: 7, paddingBottom: 7, alignSelf: 'center'}}>{this.state.message}</Text>

                {image &&
                <Image source={{ uri: this.state.image }} style={{alignSelf: 'center', width: 150, height: 150, borderRadius: 20}} />}
                
                <TouchableOpacity style = {{marginTop: 10, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this._pickImage}>
                    <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Select Image </Text></TouchableOpacity>
                <Text style = {{paddingBottom: 30, textDecorationLine: 'underline', color: '#84c6ba', alignSelf: 'center'}} onPress = {() => this.props.navigation.navigate ('updatepassword')}>Update Password</Text>
                <TextInput onChangeText={ TextInputValue => this.setState({ fname : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="First Name" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.fname}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ lname : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Last Name" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.lname}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ bio : TextInputValue }) } style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Biography" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" multiline = {true} numberOfLines ={4} value = {this.state.bio}/>
                <DatePicker onDateChange={(date)=>{this.setState({dob:date})}} style = {{marginTop: 10, marginBottom: 10, marginLeft: 60, width: 300}} mode = 'date' placeholder = 'Date Of Birth' minDate = '1930-05-05' maxDate = '2030-05-05' format = 'YYYY-MM-DD' date = {this.state.dob}/>
                <TextInput onChangeText={ TextInputValue => this.setState({ phoneno : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="PhoneNumber" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="number-pad" value = {this.state.phoneno}/>
                <View style={{height: 50, width: 300, marginLeft: 55, borderRadius: 20, marginVertical: 10, backgroundColor: 'rgb(248,248,248)'}}>
                <Picker onChangeText={ TextInputValue => this.setState({ secQ : TextInputValue }) } style={{marginLeft: 8, color: '#84c6ba', borderRadius: 20, height: 50, width: 300}} selectedValue = {this.state.secQ} onValueChange={(itemValue, itemIndex) =>this.setState({secQ: itemValue})}>
                    <Picker.Item color = '#84c6ba' label="Please Update Security Question" value="nothing" />                  
                    <Picker.Item color = '#84c6ba' label="What is your Pet's Name?" value="pet" />
                    <Picker.Item color = '#84c6ba' label="What is your Mother's Maiden Name?" value="motherMaiden" />
                </Picker>
                </View>
                <TextInput onChangeText={ TextInputValue => this.setState({ secA : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Security Question's Answer" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address" value = {this.state.secA}/>
                <TouchableOpacity style = {{marginTop: 10, marginBottom: 30, borderRadius: 20, width: 300, height: 50, backgroundColor: '#84c6ba', alignSelf: "center"}} onPress = {this.updateUser}>
                    <Text style = {{color: 'white', paddingTop: 13, alignSelf: "center"}}> Update </Text></TouchableOpacity>
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

export default UpdateProfile;