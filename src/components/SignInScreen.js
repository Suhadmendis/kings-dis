import React, {Component} from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from "../style/SignInScreenStyle";
import {connect} from "react-redux";
import {getPassword, getUserName, LoginUser,} from "../actions/LoginScreenAction";
import LoginValidation from "./LoginOperation/LoginValidation";
import CustomSpinner from "./common/CustomSpinner";
import {store} from "../../configureStore";
import NetInfo from "@react-native-community/netinfo";

import Main from '../offline/Main';
import { KeyboardAvoidingView } from "react-native";
import LogoutModal from "./common/LogoutModal";
import { showMessage } from "react-native-flash-message";

const Logo = require("../assets/logo.png");
const image = require("../assets/login_bg.png");

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      loginText: '',
      loginPassword: '',
      login_error_message: '',
    };
    this.disableLoginBtn = false; // to prevent multiple clicks
    this.active = false; // to prevent multiple clicks
  }

  ShowHideTextComponentView = () => {
    if (this.state.status == true) {
      this.setState({ status: false });
    } else {
      this.setState({ status: true });
    }
  };

  async componentDidMount(){
    let Logout = await AsyncStorage.getItem('Logout');

    // this.ifTokenExpires();



    if (Logout != null) {
      this.setState({ login_error_message: Logout });
    }
  }


  async componentDidUpdate(prevProps, prevState) {


      if (prevProps.isFocused !== this.props.isFocused) {

      }

      // this.ifTokenExpires();

    }



  ifTokenExpires() {
    setTimeout(() => {
      let state = store.getState();
      let logout = state.loading.logout;

      if (logout) {
        showMessage({
          message: "KINGS SEEDS",
          description:
            "Your authentication token has expired. Please login again to refresh the token",
          type: "warning",
          autoHide: true,
        });
        store.dispatch({ type: "logout:false" });
      }
      console.log('Logged out');

    }, 3000);



  }



  async login_ () {
   // store.dispatch({type: "CustomSpinner:SHOW"});

    let loginRes = await this.props.LoginUser(
        this.state.loginText,
        this.state.loginPassword,
        this.props.navigation,
    );
    console.log('=========login===========333333 ',loginRes);
    if (loginRes.code == '01') {
      this.setState({login_error_message: loginRes.message});
    }

    this.disableLoginBtn = false;

   // store.dispatch({type: "CustomSpinner:HIDE"});
  }

test () {
  if (this.disableLoginBtn === true) {
    this.setState({ active: true });
  } else {
    this.setState({ active: false });
  }
}
  render() {
    return (
      <>

{ this.ifTokenExpires()}

      <SafeAreaView style={{ flex: 1 }}>

        {/* <CustomSpinner /> */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <View style={Styles.container}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={Styles.image}
          >
            <View style={Styles.headView}>
              <Image source={Logo} style={Styles.bodyLogo} />
            </View>
            <ScrollView  keyboardShouldPersistTaps='always'>

              <View style={Styles.cardView}>
                <View style={Styles.textView}>
                  <Text style={Styles.emailTxt} allowFontScaling={false}>
                    Username or Email Address
                  </Text>
                </View>
                <View style={Styles.txtInputView}>
                  <TextInput
                  //  autoCapitalize={false}
                    autoCorrect={false}
                  //  value={this.state.loginText}
                    allowFontScaling={false}
                    style={Styles.TxtInput}
                    placeholder={"Enter your email address"}
                    placeholderTextColor="#B5BFBC"
                    onChangeText={(text) => {
                      this.setState({ login_error_message: "" });
                      this.setState({ loginText: text });
                    }}
                    required
                  />
                </View>
                <View style={Styles.textView}>
                  <Text style={Styles.emailTxt} allowFontScaling={false}>
                    Password
                  </Text>
                </View>
                <View style={Styles.txtInputView}>
                  <TextInput
                  //  value={this.state.loginPassword}
                    allowFontScaling={false}
                    style={Styles.TxtInput}
                   placeholder={"Enter your password"}
                    placeholderTextColor="#B5BFBC"
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      this.setState({ login_error_message: "" });
                      this.setState({ loginPassword: text });
                    }}
                    required
                  />
                </View>
                {this.state.login_error_message !== "" ? (
                  <View style={Styles.textViewLog}>
                    <Text style={Styles.logoutText} allowFontScaling={false}>
                      {this.state.login_error_message}
                    </Text>
                  </View>
                ) : null}

                <View
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  {/* <DropShadow style={shadowStyle.shadowPropLogin}> */}

                  {this.state.active &&
                  <View style={{width:'100%',height:40,alignItems:'center',marginTop:10}}>
                  <ActivityIndicator size="small" color="#1ED18C" />
                  <Text>Please Wait</Text>
                  </View>}


                  <TouchableOpacity
                    activeOpacity={0.9}
                    disabled={this.state.disableLoginBtn}
                    onPress={() => {
                      NetInfo.fetch().then(connection => {
                        if (!connection.isConnected) {
                          this.setState({login_error_message: "Please check your network connection"});
                          this.disableLoginBtn = false;
                        }else{
                          if (!this.disableLoginBtn) {
                            this.disableLoginBtn = true;



                            const error = LoginValidation(
                                this.state.loginText,
                                this.state.loginPassword
                            );

                            console.log('====================================');
                            console.log(error);
                            console.log('====================================');

                            if (error.code == "08") {
                              this.login_();
                              this.test()
                            } else {
                              this.setState({login_error_message: error.message});
                              this.disableLoginBtn = false;
                            }
                          }
                        }

                      });

                    }}
                    style={Styles.btnView}
                  >
                    <Text style={Styles.BtnTxt} allowFontScaling={false}>
                      LOGIN
                    </Text>
                  </TouchableOpacity>
                  {/* </DropShadow> */}


                  <TouchableOpacity
                    onPress={this.ShowHideTextComponentView}
                    style={Styles.forgetView}
                  >
                    <Text style={Styles.fontFirst} allowFontScaling={false}>
                      Forgotten your password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={Styles.BtnForgetView}>
                {/* <Button title="Hide Text Component" onPress={this.ShowHideTextComponentView} /> */}
                {this.state.status ? (
                  <View style={Styles.cartView2}>
                    <View style={Styles.textView1}>
                      <Text style={Styles.emailTxt} allowFontScaling={false}>
                        Email Address
                      </Text>
                    </View>
                    <View style={Styles.txtInputView}>
                      <TextInput
                        allowFontScaling={false}
                        style={Styles.TxtInput}
                        placeholder={"Enter your email address"}
                        placeholderTextColor="#B5BFBC"
                        onChangeText={(text) => {
                          this.props.getUserName(text);
                        }}
                        // require
                      />
                    </View>
                    {/* <DropShadow style={shadowStyle.shadowPropLogin}> */}
                    <TouchableOpacity
                      // onPress={() => {
                      //   this.cheackLoginData(
                      //     this.props.userName,
                      //     this.props.password
                      //   );
                      // }}
                      style={Styles.btnView2}
                    >
                      <Text style={Styles.BtnTxt} allowFontScaling={false}>
                        RESET PASSWORD
                      </Text>
                    </TouchableOpacity>
                    {/* </DropShadow>  */}
                  </View>
                ) : null}
              </View>
            </ScrollView>
            {/* <TouchableOpacity
             onPress={() => setShouldShow(!shouldShow)}
            style={Styles.forgetView}>
              <Text style={Styles.fontFirst} allowFontScaling={false}>
              Forgotten your password?
              </Text>
            </TouchableOpacity> */}
            {/*<View style={Styles.forgetView}>*/}
            {/*  <Text style={Styles.fontFirst} allowFontScaling={false}>*/}
            {/*    {<Text style={{color: 'silver'}}>Don't have an account?</Text>}{' '}*/}
            {/*    Sign Up*/}
            {/*  </Text>*/}
            {/*</View>*/}
          </ImageBackground>
        </View>
        </KeyboardAvoidingView>

      </SafeAreaView>
      </>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.login.userName,
    password: state.login.password,
  };
};

export default connect(mapStateToProps, {
  LoginUser,
  getPassword,
  getUserName,
})(SignInScreen);
