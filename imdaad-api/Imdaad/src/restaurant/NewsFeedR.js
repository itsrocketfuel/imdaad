import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import HomeR from './pages/HomeR';
import UpdateProfileR from './pages/UpdateProfileR';
import UpdatePasswordR from './pages/UpdatePasswordR';

import DonationR from './pages/DonationR';

import FoodR from './pages/FoodR';
import viewLocationR from './pages/LocationR.js';

import FoodEDR from './pages/FoodEDR';
import FoodEditR from './pages/FoodEditR';
import viewLocationER from './pages/LocationER.js';

//import ReportR from './pages/ReportR';
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
  homer: {
    screen: HomeR,
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

const UpdateProfileAB = createStackNavigator({
  updateprofiler: {
    screen: UpdateProfileR,
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

const UpdatePasswordAB = createStackNavigator({
    updatepasswordr: {
      screen: UpdatePasswordR,
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
const DonationAB = createStackNavigator({
    donationr: {
      screen: DonationR,
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
  const AddFoodAB = createStackNavigator({
    foodr: {
      screen: FoodR,
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

  const FoodAB = createStackNavigator({
    foodedr: {
      screen: FoodEDR,
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

  const FoodEditAB = createStackNavigator({
    foodeditr: {
      screen: FoodEditR,
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

  /*const ReportingAB = createStackNavigator({
    reportingr: {
      screen: ReportingR,
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
  });*/

  const viewLocationAB = createStackNavigator({
    viewlocationr: {
      screen: viewLocationR,
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

  const viewLocationEAB = createStackNavigator({
    viewlocationer: {
      screen: viewLocationER,
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
    screen: UpdateProfileAB,
    navigationOptions: {
      drawerLabel: 'Update Profile',
    },
  },
  Screen3: {
    screen: DonationAB,
    navigationOptions: {
    drawerLabel: 'Food',
    },
  },
  /*Screen4: {
    screen: ReportingAB,
    navigationOptions: {
      drawerLabel: 'Reporting',
    },
  },*/
  Screen5: {
    screen: Login,
    navigationOptions: {
      drawerLabel: 'Logout',
    },
  },
  Screen6: {
    screen: UpdatePasswordAB,
    navigationOptions: {
      drawerLabel: ()=> null
    },
  },
  Screen7: {
    screen: AddFoodAB,
    navigationOptions: {
      drawerLabel: ()=> null
    },
  },
  Screen8: {
    screen: FoodAB,
    navigationOptions: {
      drawerLabel: ()=> null
    },
  },
  Screen9: {
    screen: FoodEditAB,
    navigationOptions: {
      drawerLabel: ()=> null
    },
  },
  Screen10: {
    screen: viewLocationAB,
    navigationOptions: {
      drawerLabel: ()=> null
    },
  },
  Screen11: {
    screen: viewLocationEAB,
    navigationOptions: {
      drawerLabel: ()=> null
    },
  },
},
{
  drawerWidth: 200
});

export default createAppContainer(DrawerNavigator);