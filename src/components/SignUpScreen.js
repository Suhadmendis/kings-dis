import React, {Component} from 'react';
import {View, Image, Text, SafeAreaView} from 'react-native';
import Styles from '../style/SignInScreenStyle';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

const Logo = require('../assets/logo.png');

class SignUpScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={Styles.container}>
          <View style={Styles.headView}>
            <Image source={Logo} style={Styles.bodyLogo} />
            <Text style={Styles.fontSecond} allowFontScaling={false}>
              WHITE HOUSE PRODUCTS LTD
            </Text>
            <Text style={Styles.fontFirst} allowFontScaling={false}>
              If it's Hydraulic we do it
            </Text>
          </View>
          <View style={Styles.bodyView}>
            <Text style={Styles.welcomeTxt} allowFontScaling={false}>
              Create Account,
            </Text>
            <Text style={Styles.signInTxt} allowFontScaling={false}>
              Sign up to get started!
            </Text>
          </View>
          <View style={Styles.cardView}>
            <View style={Styles.textView}>
              <Text style={Styles.emailTxt} allowFontScaling={false}>
                Email
              </Text>
            </View>
            <View style={Styles.txtInputView} />
            <View style={Styles.textView}>
              <Text style={Styles.emailTxt} allowFontScaling={false}>
                Password
              </Text>
            </View>
            <View style={Styles.txtInputView} />
            <View style={Styles.textView}>
              <Text style={Styles.emailTxt} allowFontScaling={false}>
                Confirm Password
              </Text>
            </View>
            <View style={Styles.txtInputView} />
            {/*<View style={Styles.forgetView}>*/}
            {/*  <Text style={Styles.fontFirst} allowFontScaling={false}>*/}
            {/*    Forgot Password?*/}
            {/*  </Text>*/}
            {/*</View>*/}
            <View style={Styles.btnView}>
              <Text style={Styles.BtnTxt} allowFontScaling={false}>
                SIGN IN
              </Text>
            </View>
            {/*<View style={Styles.forgetView}>*/}
            {/*  <Text style={Styles.fontFirst} allowFontScaling={false}>*/}
            {/*    {<Text style={{color: 'silver'}}>Don't have an account?</Text>}{' '}*/}
            {/*    Sign Up*/}
            {/*  </Text>*/}
            {/*</View>*/}
          </View>
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
  {},
)(SignUpScreen);
