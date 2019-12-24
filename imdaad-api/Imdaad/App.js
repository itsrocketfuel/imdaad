import Main from './src/startup/Main.js';
import Login from './src/startup/Login.js';
import Signup from './src/startup/SignUp.js';
import ForgotPassword from './src/startup/ForgotPassword.js';
import ResetPassword from './src/startup/ResetPassword.js';
import NewsFeed from './src/donor/NewsFeed.js';

import NewsFeedR from './src/restaurant/NewsFeedR.js'

import NewsFeedA from './src/admin/NewsFeedA.js'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import * as firebase from "firebase";
import 'firebase/auth';
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXApWoNf6g0ILXv3MuLFWf3LiK0JJb1nA",
    authDomain: "imdaad-69.firebaseapp.com",
    databaseURL: "https://imdaad-69.firebaseio.com",
    projectId: "imdaad-69",
    storageBucket: "imdaad-69.appspot.com",
    messagingSenderId: "1029955172879",
    appId: "1:1029955172879:web:8f2d982eaf272d126ec17a",
    measurementId: "G-1HG0RPTWJX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth().useDeviceLanguage();

const Navigation = createStackNavigator({
    main:{screen: Main},
    login:{screen: Login},
    signup:{screen: Signup},
    forgotpassword:{screen: ForgotPassword},
    resetpassword:{screen: ResetPassword},
    newsfeed:{screen: NewsFeed},
    newsfeed1:{screen: NewsFeedR},
    newsfeed2:{screen: NewsFeedA}
},
    {defaultNavigationOptions: {header: null}
})

const App = createAppContainer(Navigation);

export default App;
export {firebase};