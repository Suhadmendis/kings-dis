import React, { Component } from 'react';
import { Linking, View, Text, TouchableOpacity, Alert, StyleSheet, AppRegistry } from "react-native";
import QRCodeScanner  from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';



export default class BarCodeSection extends Component {
//   ifScaned = e =>{
//     Alert.alert('incalid QR', e.data)
//   }



  render() {
    // console.log(this.props);
    return (
      <View>
        <QRCodeScanner
                onRead={this.props.getQrCode}
                reactivate={true}
                permissionDialogMessage="Need Permission"
                reactivateTimeout={10}
                showMarker={true}
                markerStyle={{ borderColor: 'black', borderRadius: 10, width: wp('70'), height: hp('25') }}
                containerStyle={{ marginTop: 0, marginTop: 60 }}
                cameraStyle={{ width: "100%" }}
                // flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                  <Text style={styles.centerText}>
                    {/* Go to{' '}
                    <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                    your computer and scan the QR code. */}
                  </Text>
                }
                bottomContent={
                <TouchableOpacity activeOpacity={0.9} style={styles.buttonTouchable}>
                    {/* <Text style={styles.buttonText}>OK. Got it!</Text> */}
                </TouchableOpacity>
                }
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

AppRegistry.registerComponent('default', () => BarCodeSection);