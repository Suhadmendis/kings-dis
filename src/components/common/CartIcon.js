import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ViewBase } from "react-native";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import StyleSheet from "react-native-media-query";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";

const cart = require("../../assets/shopping-cart.png");

export default function CartIcon() {
  const { items } = useSelector((s) => s.cart);
  const navigation = useNavigation();

  // console.log("cart items.....", items);

  return (
    <TouchableOpacity
      style={{ width: wp("13"), marginTop: hp("-0.5") }}
      onPress={() => {
        navigation.navigate("carts");
      }}
    >
      <Image
        style={{ alignSelf: "center", marginTop: hp("0.5") }}
        source={cart}
      />
        {items.length !== 0 ? (
            <View style={styles.reddot}></View>
          ) : (
            null
          )}
     
    </TouchableOpacity>
  );
}

const { ids, styles } = StyleSheet.create({
  reddot: {
    height: 12,
    width: 12,
    backgroundColor: "red",
    position: "absolute",
    borderRadius: 8,
    right: 30,
    top: -0.1,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: 12,
      width: 12,
      right: 30,
      top: -0.1,
    },
    "@media (max-width: 500px)": {
      height: 10,
      width: 10,
      right: 10,
      top: 0,
    },
  },
});
