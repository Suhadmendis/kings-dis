import React, { Component, useState, useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  AsyncStorage,
} from "react-native";
import { ResetPasswordDetails } from "../actions/MyProfileAction";
import Styles from "../style/ProfileStyle";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Header from "./common/Header";
import Footer from "./common/Footer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import NumericInput from "react-native-numeric-input";

const search = require("../assets/BlueLeft.png");

export const ResetPasswordFunc = ({ token, resetDetails, tab, navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const reset_password = () => {
    console.log(
      "current: " +
        currentPassword +
        " new " +
        newPassword +
        " confirm " +
        confirmPassword
    );
    ResetPasswordDetails(token, currentPassword, newPassword, confirmPassword,navigation);
  };

  const cancel_change = () => {
    setCurrentPassword("");
    setNewPassword("");
    setconfirmPassword("");
  };

  return (
    <ScrollView style={{ height: hp("70%") }}>
      <View style={Styles.cardView}>
        <View style={Styles.textView}>
          <Text style={Styles.emailTxt} allowFontScaling={false}>
            Current Password:<Text style={{ color: "red" }}>*</Text>
          </Text>
        </View>
        <View style={Styles.txtInputView}>
          <TextInput
            secureTextEntry={true}
            allowFontScaling={false}
            style={Styles.TxtInput}
            placeholderTextColor="gray"
            onChangeText={(text) => setCurrentPassword(text)}
          >
            {currentPassword}
          </TextInput>
        </View>

        <View style={Styles.textView}>
          <Text style={Styles.emailTxt} allowFontScaling={false}>
            New Password:<Text style={{ color: "red" }}>*</Text>
          </Text>
        </View>
        <View style={Styles.txtInputView}>
          <TextInput
            secureTextEntry={true}
            allowFontScaling={false}
            style={Styles.TxtInput}
            placeholderTextColor="gray"
            onChangeText={(text) => setNewPassword(text)}
          >
            {newPassword}
          </TextInput>
        </View>
        <View style={Styles.textView}>
          <Text style={Styles.emailTxt} allowFontScaling={false}>
            Confirm Password:<Text style={{ color: "red" }}>*</Text>
          </Text>
        </View>
        <View style={Styles.txtInputView}>
          <TextInput
            secureTextEntry={true}
            allowFontScaling={false}
            style={Styles.TxtInput}
            placeholderTextColor="gray"
            onChangeText={(text) => setconfirmPassword(text)}
          >
            {confirmPassword}
          </TextInput>
        </View>

        <View style={Styles.textViewLog}>
          <Text style={Styles.logoutText} allowFontScaling={false}>
          You will automatically be logged out after the password change
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={Styles.btnView}
          onPress={
            (() =>
            reset_password())
          }
        >
          <Text style={Styles.BtnTxt} allowFontScaling={false}>
            UPDATE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          style={Styles.cancelBtn}
          onPress={() => cancel_change()}
        >
          <Text style={Styles.cancelTxt} allowFontScaling={false}>
            CLEAR
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
