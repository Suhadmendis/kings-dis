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
} from "react-native";
import { UpdateProfileDetails } from "../actions/MyProfileAction";
import Styles from "../style/ProfileStyle";
import { Actions } from "react-native-router-flux";
import Back from "./common/Back";
import { connect, useDispatch, useSelector } from "react-redux";
import Header from "./common/Header";
import Footer from "./common/Footer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import getBaseUrl from "../url/getBaseUrl";
import { UserInfoFunc } from "../components/UserInfo";
import { ResetPasswordFunc } from "../components/ResetPassword";
import NumericInput from "react-native-numeric-input";
import { withNavigation } from "react-navigation";
const search = require("../assets/BlueLeft.png");

import { useIsFocused } from "@react-navigation/native";

const listTab_ = [
  {
    status: "User Info",
    val: 0,
  },
  {
    status: "Reset Password",
    val: 1,
  },
];

const userDetails_ = {
  username: "",
  fname: "",
  lname: "",
  email: "",
  phone: "",
};

const resetDetails_ = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const MyProfile = ({ navigation }) => {
  const [filteredDataSet, setFilteredDataSet] = useState([]);
  const [token, setToken] = useState("blank");
  const [tabVal, setTabVal] = useState(0);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const setStatusFilter = (tabVal) => {
    if(tabVal==undefined){
      setTabVal(0);
    }else{
      setTabVal(tabVal);
    }
  };

  const initialInfo = {
    username: userDetails_.email,
    fname: userDetails_.fname,
    lname: userDetails_.lname,
    email: userDetails_.email,
    phone: userDetails_.phone,
  };
  
  const tokn = useSelector((state) => state.login.loginToken);

  //  this.getTokenFromApi();
  useEffect(() => {
    setToken(tokn);
   // getProfileDetailsFromApi();

    setTabVal(0);
  }, []);
  // useEffect(() => {
  //   console.log(tabVal);
  //   setTabVal(0);
  //   // const navFocusListener = navigation.addListener("didFocus", () => {
  //   //   setTabVal(0);
  //   // });
  //   // return () => {
  //   //   navFocusListener.remove();
  //   // };
  // }, [tabVal]);

  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Styles.container}>
        
        <Back />
        <View style={Styles.titleView}>
          <Text style={Styles.titleTxt} allowFontScaling={false}>
            My Profile
          </Text>
        </View>
        <ScrollView style={{ height: "100%" }}>
          <View style={sty.container}>
            <View style={sty.listTab}>
              {listTab_.map((e) => (
                <TouchableOpacity
                  style={[sty.btnTab, tabVal === e.val && sty.btnTabActive]}
                  onPress={() => setStatusFilter(e.val)}
                >
                  <Text
                    style={[sty.textTab, tabVal === e.val && sty.textTabActive]}
                  >
                    {e.status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {tabVal === 0 ? (
            <UserInfoFunc
              l_Token={token}
              userDetails_={userDetails_}
              tab={tabVal}
              navigation={navigation}
              time={Date.now}
            />
          ) : (
            <ResetPasswordFunc
              token={token}
              resetDetails={resetDetails_}
              tab={tabVal}
              navigation={navigation}
            />
          )}
        </ScrollView>
      </View>

      <View>
        
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
  };
};
export default connect(mapStateToProps, {})(MyProfile);

let widthper = wp("100%");
let crd_wdth = 0;
let tab_h = 0;
if (widthper <= 500.0) {
  crd_wdth = wp("94");
  tab_h = hp("4");
} else {
  crd_wdth = wp("65");
  tab_h = hp("4.4");
}

const sty = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 1,
    width: crd_wdth,
    height:tab_h,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: wp(1.8),
    borderTopRightRadius: wp(1.8),
  },
  btnTab: {
    width: crd_wdth / 2,
    borderWidth: 0.5,
    borderTopLeftRadius: wp(1.8),
    borderTopRightRadius: wp(1.8),
    borderColor: "#EFF8FB",
    alignItems: "center",
    justifyContent: "center",
  },
  textTab: {
    fontSize: hp(1.7),
    color: "#20d48c",
  },
  textTabActive: {
    fontSize: hp(1.7),
    color: "#fff",
    alignItems: "center",
  },
  btnTabActive: {
    backgroundColor: "#20d48c",
  },
});

// const UserInfoFunc = (l_Token) => {

//     const update_user=()=>{
//           // console.log("user Info:-- " + initialInfo.fname)
//         //  console.log(initialInfo.fname);
//         UpdateProfileDetails(l_Token, 'username', 'John', 'Doe','salesrep@kingsseeds.com','078 8055 2774');
//     }

//     return (
//         <View style={Styles.cardView}>
//             <View style={Styles.textView}>
//               <Text style={Styles.emailTxt} allowFontScaling={false}>
//                 Username:
//               </Text>
//             </View>
//             <View style={Styles.txtInputView}>
//               <TextInput
//                 allowFontScaling={false}
//                 style={Styles.TxtInput}
//                 placeholderTextColor="gray"
//                // onChangeText={(text) =>setUsernameinfo(text)}
//               >{userDetails_.email}</TextInput>
//             </View>

//             <View style={Styles.textView}>
//               <Text style={Styles.emailTxt} allowFontScaling={false}>
//                 First Name:
//               </Text>
//             </View>
//             <View style={Styles.txtInputView}>
//               <TextInput
//                 allowFontScaling={false}
//                 style={Styles.TxtInput}
//                 placeholderTextColor="gray"
//              //   onChangeText = {(text) => setFnameinfo(text)}
//               >{userDetails_.fname}</TextInput>
//             </View>
//             <View style={Styles.textView}>
//               <Text style={Styles.emailTxt} allowFontScaling={false}>
//                 Last Name:
//               </Text>
//             </View>
//             <View style={Styles.txtInputView}>
//               <TextInput
//                 allowFontScaling={false}
//                 style={Styles.TxtInput}
//                 placeholderTextColor="gray"
//              //   onChangeText = {(text) => setLnameinfo(text)}
//               >{userDetails_.lname}</TextInput>
//             </View>
//             <View style={Styles.textView}>
//               <Text style={Styles.emailTxt} allowFontScaling={false}>
//                 Email:
//               </Text>
//             </View>
//             <View style={Styles.txtInputView}>
//               <TextInput
//                 allowFontScaling={false}
//                 style={Styles.TxtInput}
//                 placeholderTextColor="gray"
//                // onChangeText = {(text) => setEmailinfo(text)}
//               >{userDetails_.email}</TextInput>
//             </View>
//             <View style={Styles.textView}>
//               <Text style={Styles.emailTxt} allowFontScaling={false}>
//                 Phone:
//               </Text>
//             </View>
//             <View style={Styles.txtInputView}>
//               <TextInput
//                 allowFontScaling={false}
//                 style={Styles.TxtInput}
//                 placeholderTextColor="gray"
//               //  onChangeText = {(text) => setPhoneinfo(text)}
//               >{userDetails_.phone}</TextInput>
//             </View>

//             <TouchableOpacity
//               style={Styles.btnView}
//               onPress={()=> update_user()}
//               >
//               <Text style={Styles.BtnTxt} allowFontScaling={false}>
//                 UPDATE
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={Styles.cancelBtn}>
//               <Text style={Styles.cancelTxt} allowFontScaling={false}>
//                 CANCEL
//               </Text>
//             </TouchableOpacity>
//            </View>
//     );
//   };
