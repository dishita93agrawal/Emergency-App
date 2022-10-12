import * as React from 'react';
import { View } from 'react-native';
import AppHeader from './components/AppHeader';
import WelcomeScreen from './screens/welcomeScreen';
import signUpScreen from './screens/signUpScreen';
import HomeScreen from './screens/HomeScreen';
import TheftScreen from './screens/TheftScreen';
import MajorAccident from './screens/MajorAccident';
import Abuse from './screens/AbuseScreen';
import FireScreen from './screens/FireScreen';
import Sos from './screens/SosScreen';
import db from './config';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const navigator = createSwitchNavigator({
  WelcomeScreen: WelcomeScreen,
  signUpScreen: signUpScreen,
  HomeScreen: HomeScreen,
  TheftScreen: TheftScreen,
  MajorAccident: MajorAccident,
  Abuse: Abuse,
  FireScreen: FireScreen,
  Sos: Sos,
});

const AppContainer = createAppContainer(navigator);
