import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//Screens
import DrawerContent from '../../components/Drawer';
// import EIcon from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
// import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Market from './Market';
import Trading from './Trading';
import Education from './Education';
import News from './News';
import Settings from './Settings';
import theme from '../../../theme';
import Signin from '../AuthFlow/Signin';
import Signup from '../AuthFlow/Signup';
import ForgetPassword from '../AuthFlow/ForgetPassword';
import SetPassword from '../AuthFlow/SetPassword';
import VideoScreen from './VideoScreen';
import NewsScreen from './NewsScreen';
import DeFi from './DeFi';
import TradeForm from './TradeForm';

const Drawer = createDrawerNavigator();

const MaterialBottomTabs = createBottomTabNavigator();



const createBottomTabs = () => {
  return (
    <MaterialBottomTabs.Navigator
      tabBarOptions={{
        activeTintColor: theme.color.primary,
        inactiveTintColor: theme.color.secondary,
        // style: { backgroundColor: theme.color.primary },
        tabStyle: { marginBottom: 5 },
      }}
    >
      <MaterialBottomTabs.Screen
        name="Tab 1"
        style={{ marginBottom: 16 }}
        component={Market}
        options={{
          tabBarLabel: 'Market',
          tabBarIcon: ({ color }) => <IonIcon color={color} name="bar-chart-outline" size={25} />,
        }}

      />
      <MaterialBottomTabs.Screen
        name="Tab 5"
        style={{ marginBottom: 16 }}
        component={DeFi}
        options={{
          tabBarLabel: 'DeFi',
          tabBarIcon: ({ color }) => <IonIcon color={color} name="pie-chart-outline" size={25} />,
        }}
      />
      <MaterialBottomTabs.Screen
        name="Tab 2"
        component={Trading}
        options={{
          tabBarLabel: 'Paper Trading',
          tabBarIcon: ({ color }) => {
            return (
              <IonIcon color={color} size={25} name="cash-outline" />
            )
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="Tab 3"
        component={Education}
        options={{
          tabBarLabel: 'Education',
          tabBarIcon: ({ color }) => (
            <IonIcon color={color}

              size={25}
              name="library-outline"
            />
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name="Tab 4"
        component={News}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color }) => (
            <IonIcon color={color} size={25} name="newspaper-outline" />
          ),
        }}
      />
    </MaterialBottomTabs.Navigator>
  );
};

const MainFlow = (props) => {
  return (
    <Drawer.Navigator
      headerMode="none"
      drawerPosition="right"
      drawerContent={(props) => (
        <DrawerContent
          {...props}
          logout={() => props.navigation.navigate('AuthFlow')}
        />
      )}>
      <Drawer.Screen name="BottomTabs" children={createBottomTabs} />
      <Drawer.Screen name="Signin" component={Signin} />
      <Drawer.Screen name="Signup" component={Signup} />
      <Drawer.Screen name="ForgetPassword" component={ForgetPassword} />
      <Drawer.Screen name="SetPassword" component={SetPassword} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="TradeForm" component={TradeForm} />
      <Drawer.Screen name="Video" component={VideoScreen} />
      <Drawer.Screen name="News" component={NewsScreen} />
    </Drawer.Navigator>
  );
};

export default MainFlow;
