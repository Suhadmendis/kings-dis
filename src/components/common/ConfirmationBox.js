import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { ConfirmDialog } from "react-native-simple-dialogs";
import StyleSheet from "react-native-media-query";
import * as colors from '../../style/Common/ColorsStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ConfirmationBox = ({showHide, yes,no, contentText}) => {
 // const { items } = useSelector((s) => s.cart);
 // const navigation = useNavigation();
  // dialogVisible
  const [dialogVisible, setDialogVisible] = useState();

  useEffect(() => {
    setDialogVisible(showHide)
    console.log(showHide);
  }, [showHide]);
 
  return (
    <ConfirmDialog
  
      title="Confirm"
      titleStyle={{
        color: "green",
        textAlign: "left",
        fontSize: hp("2"),
        marginTop:hp('1')
      }}
      animationType="fade"
      dialogStyle={styles.dialogbox}
      buttonsStyle={{
        // backgroundColor:'red',
        color: "red",
      }}
      buttons={{
        title: "YES",
      }}
      visible={dialogVisible}
      onTouchOutside={() => no()}
    >
      <View>
        <View style={{justifyContent:'center',marginTop:-10}}>
          <Text style={{textAlign: "left", fontSize: hp("1.6"), color:'black'}}>
           {contentText}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: hp("1") }}>
          <TouchableOpacity
            style={{
              height: hp("4.5"),
              width: "49%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFD8D8",
              marginRight: "1%",
              borderRadius: 5,
            }}
            onPress={() => no()}
          >
            <Text style={{ fontSize: hp("1.5"), color: "#E61538" }}>NO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: hp("4.5"),
              width: "49%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DEF9F6",
              marginLeft: "1%",
              borderRadius: 5,
            }}
            onPress={() => yes()}
          >
            <Text style={{ fontSize: hp("1.5"), color: colors.primaryColor }}>YES</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ConfirmDialog>
  );
}


const mapStateToProps = (state) => {
  return {
    spinner: state.loading.spinner,
  };
};

export default connect(mapStateToProps, {})(ConfirmationBox);

const {ids,styles} = StyleSheet.create({
  dialogbox:{
    width: wp("70"),
    height: hp("20"),
    maxHeight: hp("22"),
    borderRadius: 10,
    alignSelf: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("18.5"),
    },
    "@media (max-width: 450px)": {
      height: hp("18.5"),
      width: wp("75"),
    },
  }

});
