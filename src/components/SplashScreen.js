import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../style/SplashScreenStyle';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getLoginToken } from '../actions/LoginScreenAction';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import { withNavigation } from 'react-navigation';

const Logo = require('../assets/logo.png');
// const Background = require('../assets/splash_bg.png');
const Background = require('../assets/splash_bg.png');

class SplashScreen extends Component {
  async componentDidMount() {
    let Token = await AsyncStorage.getItem('Token');
    let data = JSON.parse(Token);
    console.log('splash screen props', this.props)
    if (data !== null) {
      this.props.getLoginToken(data);
      console.log('INFO: navigation',this.props)
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'drawer', screen: 'home', },
          ]
        })
      );
    } else {
      // setTimeout(() => {
      //   this.props.navigation.navigate('signIn');
      // }, 2000);
      this.props.navigation.navigate('signIn');
    }
    console.log(data);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={Styles.container}>
          <ImageBackground source={Background} style={Styles.backgroundImg}>
            <Image source={Logo} style={Styles.bodyLogo} />
            <Text style={Styles.fontSecond}>Version 1.0</Text>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {
    getLoginToken,
  },
)(SplashScreen);
