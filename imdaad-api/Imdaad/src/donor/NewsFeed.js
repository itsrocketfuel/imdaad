import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Login from '../startup/Login';
import Home from './pages/Home';
import UpdateProfile from './pages/UpdateProfile';
import SwitchProfile from './pages/SwitchProfile';
import UpdatePassword from './pages/UpdatePassword';
import Donation from './pages/Donation';
import Funds from './pages/Funds';
import Medicine from './pages/Medicine';
import Clothes from './pages/Clothes';
import Food from './pages/Food';
import Cause from './pages/Cause';
import viewProfile from './pages/viewProfile.js';
import viewCause1 from './pages/viewCause.js';

import FoodEditR from './pages/FoodEditR.js'
import viewLocationER from './pages/LocationER';

import MedicineEdit from './pages/MedicineEdit.js';
import viewLocationEM from './pages/LocationEM.js';

import ClothesEdit from './pages/ClothesEdit.js';
import viewLocationEC from './pages/LocationEC.js';

import updateCauseE from './pages/UpdateCauseE.js';

import viewLocation from './pages/Location.js';
import viewLocationM from './pages/LocationM.js';
import viewLocationC from './pages/LocationC.js';

import updateCause from './pages/UpdateCause.js';

import updateDonations from './pages/UpdateDonations.js';

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

const HomeA = createStackNavigator({
  home: {
    screen: Home,
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
const UpdateProfileA = createStackNavigator({
  updateprofile: {
    screen: UpdateProfile,
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
const SwitchProfileA = createStackNavigator({
  switchprofile: {
    screen: SwitchProfile,
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
const UpdatePasswordA = createStackNavigator({
    updatepassword: {
      screen: UpdatePassword,
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
const DonationA = createStackNavigator({
    donation: {
      screen: Donation,
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
  const FundsA = createStackNavigator({
    funds: {
      screen: Funds,
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
  const MedicineA = createStackNavigator({
    medicine: {
      screen: Medicine,
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
  const ClothesA = createStackNavigator({
    clothes: {
      screen: Clothes,
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
  const FoodA = createStackNavigator({
    food: {
      screen: Food,
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
  const CauseA = createStackNavigator({
    cause: {
      screen: Cause,
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

  const viewProfileA = createStackNavigator({
    viewprofile: {
      screen: viewProfile,
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

  const viewCause1A = createStackNavigator({
    viewcause1: {
      screen: viewCause1,
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

  const viewLocationA = createStackNavigator({
    viewlocation: {
      screen: viewLocation,
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

  const viewLocationMA = createStackNavigator({
    viewlocationm: {
      screen: viewLocationM,
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

  const viewLocationCA = createStackNavigator({
    viewlocationc: {
      screen: viewLocationC,
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

  const updateCauseA = createStackNavigator({
    updatecause: {
      screen: updateCause,
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

  const updateCauseEA = createStackNavigator({
    updatecausee: {
      screen: updateCauseE,
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

  const updateDonationsA = createStackNavigator({
    updatedonations: {
      screen: updateDonations,
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

  const MedicineEditAB = createStackNavigator({
    medicineedit: {
      screen: MedicineEdit,
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

  const viewLocationMAB = createStackNavigator({
    viewlocationem: {
      screen: viewLocationEM,
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

  const ClothesEditAB = createStackNavigator({
    clothesedit: {
      screen: ClothesEdit,
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

  const viewLocationCAB = createStackNavigator({
    viewlocationec: {
      screen: viewLocationEC,
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
    screen: HomeA,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  Screen2: {
    screen: UpdateProfileA,
    navigationOptions: {
      drawerLabel: 'Update Profile',
    },
  },
  Screen22: {
    screen: DonationA,
    navigationOptions: {
    drawerLabel: 'Donation',
    },
  },
  Screen3: {
    screen: SwitchProfileA,
    navigationOptions: {
      drawerLabel: 'Switch Profile',
    },
  },
  Screen31: {
    screen: CauseA,
    navigationOptions: {
      drawerLabel: 'Cause Profile',
    },
  },
  Screen313: {
    screen: updateCauseA,
    navigationOptions: {
      drawerLabel: 'Update Cause',
    },
  },
  Screen323: {
    screen: updateDonationsA,
    navigationOptions: {
      drawerLabel: 'Update Donations',
    },
  },
  Screen32: {
    screen: Login,
    navigationOptions: {
      drawerLabel: 'Logout',
      drawerLockMode: 'locked-closed'
    },
  },
  Screen4: {
    screen: UpdatePasswordA,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Screen5: {
    screen: FundsA,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Screen6: {
    screen: MedicineA,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Screen66: {
    screen: ClothesA,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Screen7: {
    screen: FoodA,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Screen8: {
    screen: viewProfileA,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Screen9: {
    screen: viewCause1A,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Screen10: {
    screen: viewLocationA,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Screen11: {
    screen: viewLocationMA,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Screen12: {
    screen: viewLocationCA,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Screen13: {
    screen: updateCauseEA,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Screen14: {
    screen: FoodEditAB,
    navigationOptions: {
      drawerLabel: ()=> null
    },
  },
  Screen15: {
    screen: viewLocationEAB,
    navigationOptions: {
      drawerLabel: ()=> null
    },
  },
  Screen16: {
    screen: MedicineEditAB,
    navigationOptions: {
      drawerLabel: ()=> null
    },
  },
  Screen17: {
    screen: viewLocationMAB,
    navigationOptions: {
      drawerLabel: ()=> null
    },
  },
  Screen18: {
    screen: ClothesEditAB,
    navigationOptions: {
      drawerLabel: ()=> null
    },
  },
  Screen19: {
    screen: viewLocationCAB,
    navigationOptions: {
      drawerLabel: ()=> null
    },
  },
},
{
  drawerWidth: 200
});

export default createAppContainer(DrawerNavigator);