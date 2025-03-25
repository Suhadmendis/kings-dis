import React from "react";
import { Image } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { connect, useDispatch, useSelector } from "react-redux";

import Styles from "../../style/HeaderStyle";
import HeaderDropdown from "./HeaderDropdown";
import { style } from "dom-helpers";
import CartIcon from "./CartIcon";

const { ids, styles } = Styles;

const menu = require("../../assets/menu.png");
const cart = require("../../assets/shopping-cart.png");
const logo = require("../../assets/logo.png");

function NewHeader() {
  const admnCsID = useSelector((state) =>  state.findStore.adminCustomerID);
  return (
    <View
      style={{
        width: wp("79"),
        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: wp("38"),
          alignContent: "flex-end",
          justifyContent: "center",
        }}
      >
        <Image source={logo} style={styles.logoIcon} />
      </View>
      <View
        style={{
          marginTop: hp("0."),
        }}
      >
        {
          admnCsID != '' ?  <HeaderDropdown /> : null
        }

      </View>
    </View>
  );
}

//header configuration is in the following object
export const screenOptions = ({ navigation }) => ({
  headerShown: true,
  headerStyle: styles.newheaderView,
  headerTitle: (props) => <NewHeader {...props} />,
  headerLeft: () => (
    <TouchableOpacity
      style={styles.menudrawerView}
      onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer());
      }}
    >
      <Image style={{ alignSelf: "center" }} source={menu} />
    </TouchableOpacity>
  ),
  headerRight: () => <CartIcon />,
});