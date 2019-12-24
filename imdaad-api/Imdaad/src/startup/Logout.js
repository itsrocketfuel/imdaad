import { Component } from "react";
import {
  AsyncStorage,
  Alert,
} from "react-native";

export default class Logout extends Component {

    componentDidMount(){
        Alert.alert('Do you want to logout?','Press Yes to continue, press No to cancel',
                [{text: 'Yes', onPress: () => {
                        AsyncStorage.removeItem('@session:name');
                        AsyncStorage.removeItem('@session:email');
                        this.props.navigation.navigate('Login');
                        }
                }]
        )
    }
}