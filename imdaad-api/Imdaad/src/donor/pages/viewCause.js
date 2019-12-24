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
import StarRating from 'react-native-star-rating';

class viewCause extends Component {

    constructor(props) {super(props);
        this.state = {
          semail:'',
          email:null,
          title:null,
          name:'',
          age:'',
          phoneno:'',
          problem:'',
          req:'',

          comment:'',
          array:[],

          starCount: 0,
          starRateCounter: 0,

          message:'',
          messages:'',

          lol:'',
          messagesa:''
        }}
    
        componentDidMount(){
            AsyncStorage.getItem('@session:email').then(semail=>{this.setState({semail})})
            this.setState({email:this.props.navigation.getParam('emails')});
            this.setState({title:this.props.navigation.getParam('titles')});
            
            this.viewCause1()
            this.viewCommentStar()
            this.viewComments()
        }

        viewCause1 = async () => {
            await this.state.email;
            await this.state.title;
            fetch('http://'+value+'/viewCause1/'+this.state.email+'.'+this.state.title)
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.info === true){
                this.setState({title: responseJson.title});
                this.setState({name: responseJson.name});
                this.setState({age: responseJson.age});
                this.setState({phoneno: responseJson.phoneno});
                this.setState({problem: responseJson.problem});
                this.setState({req:responseJson.req});
              }
            }).catch(err=>err)
        }

        onStarRatingPress(rating) {
            this.setState({
              starCount: rating
            });
            this.commentStar(rating);
          }

        commentStar = (w) => {
          fetch('http://'+value+'/commentstar', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email:this.state.semail,
            name:this.state.name,
            title:this.state.title,
            rating:w,
          })
    
          }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.info === true){
              this.setState({message: responseJson.message})
            }
            this.viewCommentStar();
          })
        }

        viewCommentStar = async () => {
            await this.state.title;
            fetch('http://'+value+'/viewcommentstar/'+this.state.title)
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.info === true){
                console.log(responseJson.rating)
                this.setState({starCount: responseJson.rating});
                this.setState({starRateCounter: responseJson.counter});
            }}).catch(err=>err)
        }
        
        addComment = () =>{
  
          fetch('http://'+value+'/addComment', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email:this.state.semail,
            name:this.state.name,
            title:this.state.title,
            comment:this.state.comment,
          })
    
          }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.info === false){
              this.setState({message: responseJson.message})
            }
            else if(responseJson.info === true){
              this.setState({message: responseJson.message})
              this.viewComments();
            }
          })
        }

        deleteComment = (emails,titles,names,comments) =>{
          console.log(emails + 'a')
          fetch('http://'+value+'/deleteComment', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email:emails,
            name:names,
            title:titles,
            comment:comments,
          })
    
          }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.success === true){
              this.setState({message: responseJson.message})
            }
            else if(responseJson.info === false){
              this.setState({message: responseJson.message})
            }
            this.viewComments();
          })
        }

        viewComments = async () => {
          await this.state.title;
          fetch('http://'+value+'/viewComments/'+this.state.title)
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

        ReportC = async (semail,title,name) => {
          console.log(semail+title+name)
        Alert.alert('Are you sure you want to report?', 'Press no to cancel', [{text: 'Yes', onPress:()=>{
          fetch('http://'+value+'/reportC', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            semail:semail,
            title:title,
            name:name
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
        }},{text:'No', onPress: () => {this.props.navigation.navigate('viewcause1')}}],{cancelable: false});
      }

    render(){
        
        return(
            <View style = {{flex: 1}}>
              <View style = {{flex:1, flexDirection: 'column'}}>
                <Text style = {{textDecorationLine: 'underline' ,fontSize: 18, fontWeight: 'bold', color: "#84c6ba", alignSelf: 'center', marginTop: 10, marginBottom: 7}}>Cause Details</Text>
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 7}}>{this.state.message}</Text>
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 20}}>{this.state.title}</Text>
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 20}}>{this.state.name}</Text>
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 20}}>{this.state.age}</Text>
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 20}}>{this.state.phoneno}</Text>
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 20}}>{this.state.problem}</Text>
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 20}}>{this.state.req}</Text>
                <View style = {{marginLeft: 70, flex:1, flexDirection: 'row'}}>
                <View style = {{flex:0.7}}><StarRating  starStyle = {{paddingTop: 2, color: '#84c6ba', fontSize: 20}} disabled={false} maxStars={5} rating={this.state.starCount} selectedStar={(rating) => this.onStarRatingPress(rating)}/></View>
                <View style = {{flex:1}}><Text style = {{color: "#84c6ba", marginLeft:80, fontWeight: 'bold'}}>{this.state.starRateCounter}</Text></View>            
                </View>
                </View>
                <View style = {{flex:1, flexDirection: 'column'}}>
                <View style = {{marginLeft: 15, flex:1, flexDirection: 'row', marginBottom: 60}}>
                <View style = {{flex:1}}><TextInput onChangeText={ TextInputValue => this.setState({ comment : TextInputValue }) } style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Comment" placeholderTextColor = "#84c6ba" selectionColor="#fff" keyboardType="email-address"/></View>
                <View style = {{flex:0.5, marginLeft: 15}}><TouchableOpacity style = {{marginTop: 13, borderRadius: 20, width: 100, height: 34, backgroundColor: '#84c6ba'}} onPress = {this.addComment}>
                <Text style = {{paddingLeft: 22, color: 'white', paddingTop: 6}}> Submit </Text></TouchableOpacity></View>
                </View>
                <ScrollView>
                <View>
                <FlatList data = {this.state.array} renderItem = {({item,index})=> {return (
                  <View style = {{flex:1, flexDirection: 'row', marginLeft: 20}}>
                    <View style = {{flex:3}}>
                    <Text style = {{paddingTop: 10, color: '#84c6ba'}}>{item.comment}</Text>
                    </View>
                    <View style = {{flex:1}}>
                          <TouchableOpacity style = {{marginTop: 13, borderRadius: 20, width: 80, height: 30, backgroundColor: '#84c6ba'}} 
                          onPress = {() => this.deleteComment(this.state.semail,item.title,item.name,item.comment)}>
                          <Text style = {{paddingLeft: 15, color: 'white', paddingTop: 4}}> Delete </Text></TouchableOpacity>
                    </View>
                  </View>
                )}}/>
                </View>
                </ScrollView>
                </View>
                <View style = {{flex:0.2, flexDirection: 'column'}}>
                <Text style = {{color: "#84c6ba", alignSelf: 'center', marginBottom: 7}}>{this.state.messagesa}</Text>
                <TouchableOpacity style = {{marginTop: 4, borderRadius: 20, width: 150, height: 40, backgroundColor: '#84c6ba', alignSelf:'center'}} onPress = {() => this.ReportC(this.state.semail,this.state.title,this.state.name)}>
                          <Text style = {{paddingLeft: 45, color: 'white', paddingTop: 6}}> Report </Text></TouchableOpacity>
                </View>
            </View>
              )           
            }
}

const styles = StyleSheet.create({
  inputBox: {
      width: 250,
      height: 40,
      backgroundColor: 'rgb(248,248,248)', 
      borderRadius: 20,
      paddingHorizontal: 8,
      fontSize: 16,
      color: '#002f6c',
      marginVertical: 10,
      //alignSelf: "center"
  }})
export default viewCause;

/*<View style = {{flex:1}}>
<TouchableOpacity style = {{marginTop: 13, borderRadius: 20, width: 50, height: 30, backgroundColor: '#84c6ba'}} onPress = {this.updateComment}>
<Text style = {{paddingLeft: 20, color: 'white', paddingTop: 6}}> Edit </Text></TouchableOpacity>
</View> This is for updating Comment*/