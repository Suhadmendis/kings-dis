import React, {Component, useState, useEffect} from 'react';
import Spinner from "react-native-loading-spinner-overlay";
import {BallIndicator} from "react-native-indicators";
import {connect, useSelector} from "react-redux";
import {
  Image,
  StyleSheet,
  View
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { flush } from 'react-native-media-query';

const checkIcn = require("../../assets/Loaders/loader.gif");
class CustomSpinner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <View>
        {
          this.props.spinner == true ?(
                  <Spinner
                //visible={true}
                visible={false}
                size={"large"}
                animation={"fade"}
                overlayColor={"rgba(225,249,166,0.1)"}
                customIndicator={<Image source={checkIcn} style={sty.cardImgCheck} />}
                // customIndicator={<BallIndicator color="white"/>}
            />
          ): null
        }
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    spinner: state.loading.spinner
  };
};

export default connect(
    mapStateToProps, {},
)(CustomSpinner);

const sty = StyleSheet.create({
 
  cardImgCheck: {
   // aspectRatio: 1,
    borderRadius:100,
    padding:5,
    height:150, width:150
   // resizeMode: "contain",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  
});