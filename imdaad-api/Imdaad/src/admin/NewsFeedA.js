import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import HomeA from './pages/HomeA';
import ProfileReport from './pages/ProfileReport.js';
import CauseReport from './pages/CauseReport.js';
import UpdatePayment from './pages/UpdatePayment.js';

import Login from '../startup/Login';

class NavigationDrawerStructure extends Component {

  toggleDrawer = () => {this.props.navigationProps.toggleDrawer();};
  
  render() {
    return (
      <View style={{flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image source={require('./image/drawer.png')} style={{ width: 30, height: 30, marginLeft: 15 }}/>
        </TouchableOpacity>
      </View>
    );
  }
}

class NavigationDrawerStructure1 extends Component {

  render() {
    return (
      <View style={{flexDirection: 'row' }}>
          <Image source={require('../img/icons.png')} style={{ width: 40, height: 40, marginRight: 15 }}/>
      </View>
    );
  }
}

const HomeAB = createStackNavigator({
  homea: {
    screen: HomeA,
    navigationOptions: ({ navigation }) => ({
      title: 'Imdaad',
      headerTitleStyle: {marginLeft: 114, color: 'white', fontSize: 22},
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NavigationDrawerStructure1 navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#84c6ba',
      },
      headerTintColor: '#fff',
    }),
  },
});

const ProfileReportA = createStackNavigator({
  profilereport: {
    screen: ProfileReport,
    navigationOptions: ({ navigation }) => ({
      title: 'Imdaad',
      headerTitleStyle: {marginLeft: 114, color: 'white', fontSize: 22},
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NavigationDrawerStructure1 navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#84c6ba',
      },
      headerTintColor: '#fff',
    }),
  },
});

const CauseReportA = createStackNavigator({
  causereport: {
    screen: CauseReport,
    navigationOptions: ({ navigation }) => ({
      title: 'Imdaad',
      headerTitleStyle: {marginLeft: 114, color: 'white', fontSize: 22},
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NavigationDrawerStructure1 navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#84c6ba',
      },
      headerTintColor: '#fff',
    }),
  },
});

const UpdatePaymentA = createStackNavigator({
  updatepayment: {
    screen: UpdatePayment,
    navigationOptions: ({ navigation }) => ({
      title: 'Imdaad',
      headerTitleStyle: {marginLeft: 114, color: 'white', fontSize: 22},
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NavigationDrawerStructure1 navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#84c6ba',
      },
      headerTintColor: '#fff',
    }),
  },
});

const DrawerNavigator = createDrawerNavigator({
  Screen1: {
    screen: HomeAB,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  Screen2: {
    screen: ProfileReportA,
    navigationOptions: {
      drawerLabel: 'Profile Reports',
    },
  },
  Screen3: {
    screen: CauseReportA,
    navigationOptions: {
      drawerLabel: 'Cause Reports',
    },
  },
  Screen4: {
    screen: UpdatePaymentA,
    navigationOptions: {
      drawerLabel: 'Update Payment',
    },
  },
  Screen5: {
    screen: Login,
    navigationOptions: {
      drawerLabel: 'Logout',
      drawerLockMode: 'locked-closed'
    },
  }
  /*Screen11: {
    screen: viewLocationEAB,
    navigationOptions: {
      drawerLabel: ()=> null
    },
  },*/
},
{
  drawerWidth: 200
});

export default createAppContainer(DrawerNavigator);