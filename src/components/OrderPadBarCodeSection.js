import React, { Component } from 'react';
import { Linking, View, Text, TouchableOpacity, Alert, AppRegistry, Image } from "react-native";
import QRCodeScanner  from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import StyleSheet from "react-native-media-query";

const closeIcon = require("../assets/close-home-page-search.png");

export default class BarCodeSection extends Component {
//   ifScaned = e =>{
//     Alert.alert('incalid QR', e.data)
//   }



  render() {
    console.log(this.props);
    return (
      <View>
          <QRCodeScanner
            onRead={this.props.getQrCode}
            reactivate={true}
            permissionDialogMessage="Need Permission"
            reactivateTimeout={10}
            showMarker={true}
            markerStyle={{ borderColor: 'black', borderRadius: 10, width: wp('70'), height: hp('25') }}
            containerStyle={styles.barcodeContainer}
            cameraStyle={{ width: "100%" }}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            // topContent={
            //   <Text style={styles.centerText}>
            //     Go to{' '}
            //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            //     your computer and scan the QR code.
            //   </Text>
            // }
            
            topContent={
            <View activeOpacity={0.9} style={styles.buttonTouchable}>
              <TouchableOpacity style={styles.btnView1}
              onPress={() => this.props.closeQrCode()}
              >
              {/* <Text style={styles.buttonText}>CLOSE</Text> */}
              <Image source={closeIcon} style={styles.closeIcon} />
              </TouchableOpacity>
              
                {/* <Text style={styles.buttonText}>Find Product</Text> */}
            </View>
            }
        />
      </View>
    );
  }
}

const {ids, styles} = StyleSheet.create({
  btnView1:{
    width:wp('10'),
    height: hp('5'),
    justifyContent:'center',
    alignItems:'center'
  },
  closeIcon:{
    resizeMode:'contain',
    aspectRatio:0.3
  },
  barcodeContainer:{ 
    marginLeft: '1%', 
    width: '98%', 
    height: 200 , 
    marginTop:hp('10')
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: hp('1.7'),
    color: 'red'
  },
  buttonTouchable: {
    width: wp('94'),
    justifyContent:'center',
    alignItems:'flex-end',
    height: hp('5'),
    zIndex:9999,
    marginTop:hp('-20')
  }
});

AppRegistry.registerComponent('default', () => BarCodeSection);