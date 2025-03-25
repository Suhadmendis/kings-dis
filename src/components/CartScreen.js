import React, { Component } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Styles from '../style/CartScreenStyle';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getCategories, getProduct } from '../actions/HomeScreenAction';
import NumericInput from 'react-native-numeric-input';
import { DrawerActions } from '@react-navigation/native';

const menu = require('../assets/menu.png');
const cart = require('../assets/BlueLeft.png');
const gear = require('../assets/gear.png');
const remove = require('../assets/delete.png');

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  // componentDidMount(): void {
  //   //this.props.navigation.navigate(refresh({key: this.props.navigation.navigate(currentScene});
  //   // console.log(this.props.cartArray);
  //   // console.log(this.state.value);
  // }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={Styles.container}>
          <View style={Styles.headerView}>
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => {
                this.props.navigation.dispatch(DrawerActions.openDrawer());
              }}>
              <Image source={menu} style={Styles.drawerIcon} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => {
                this.props.navigation.navigate('home');
              }}>
              <Image source={cart} style={Styles.cartIcon} />
            </TouchableOpacity>
          </View>
          <View style={Styles.searchView}>
            <Text style={Styles.titleTxt} allowFontScaling={false}>
              My Cart
            </Text>
          </View>
          <View style={Styles.selectView}>
            <Text style={Styles.SelectTxt} allowFontScaling={false}>
              Select All
            </Text>
          </View>
          {this.props.cartArray[0] !== undefined ? (
            <ScrollView style={{ width: '100%' }}>
              {this.props.cartArray.map((item, i) => (

                <View style={Styles.footerCardView}>
                  <View style={Styles.removeIconView}>
                    <TouchableOpacity activeOpacity={0.9}
                      onPress={() => {
                        console.log('remove');
                      }}>
                      <Image source={remove} style={Styles.removeIcon} />
                    </TouchableOpacity>
                  </View>
                  <View style={Styles.cardImgView}>
                    <Image source={{ uri: item.image }} style={Styles.cardImg} />
                  </View>
                  <View style={Styles.cardTxtView}>
                    <View style={Styles.cardTxtView1}>
                      <Text style={Styles.cardTxt} allowFontScaling={false}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={Styles.cardTxtView1}>
                      <Text
                        style={Styles.cardSubMainTxt}
                        allowFontScaling={false}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={Styles.cardTxtView2}>
                      <View style={Styles.numericView}>
                        <NumericInput
                          value={this.state.value}
                          onChange={value => {
                            //console.log(value);
                            this.setState({
                              value: value,
                            });
                          }}
                          minValue={1}
                          maxValue={10000}
                          //onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                          totalWidth={100}
                          totalHeight={30}
                          iconSize={25}
                          step={1}
                          editable={false}
                          valueType="real"
                          rounded
                          borderColor="#f2f3f4"
                          textColor="black"
                          iconStyle={{ color: 'black' }}
                          rightButtonBackgroundColor="#f2f3f4"
                          leftButtonBackgroundColor="#f2f3f4"
                        />
                      </View>
                      <View style={Styles.cardTxtView3}>
                        <Text style={Styles.PriceTxt} allowFontScaling={false}>
                          £ {item.price * this.state.value}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
              {this.props.cartArray.map((item, i) => (
                <View style={Styles.footerCardView2}>
                  <View style={Styles.footerTxtView2}>

                    <Text style={Styles.fMainTxt} allowFontScaling={false}>
                      Total Weight (Kg) :
                    </Text>
                    <Text style={Styles.fMainTxt2} allowFontScaling={false}>
                      {item.weight}
                    </Text>
                  </View>
                  <View style={Styles.footerTxtView2}>
                    <Text style={Styles.fMainTxt} allowFontScaling={false}>
                      Sub-Total (Ex. Vat) :
                    </Text>
                    <Text style={Styles.fMainTxt2} allowFontScaling={false}>
                      £ {item.price}
                    </Text>
                  </View>
                  <View style={Styles.footerTxtView2}>
                    <Text style={Styles.fMainTxt} allowFontScaling={false}>
                      Delivery :
                    </Text>
                    <Text style={Styles.fMainTxt2} allowFontScaling={false}>
                      TBA
                    </Text>
                  </View>
                  <View style={Styles.footerTxtView2}>
                    <Text style={Styles.fMainTxt} allowFontScaling={false}>
                      Vat Total
                    </Text>
                    <Text style={Styles.fMainTxt2} allowFontScaling={false}>
                      $ 23.20
                    </Text>
                  </View>
                  <View style={Styles.oderTotalView}>
                    <Text style={Styles.OMainTxt} allowFontScaling={false}>
                      Order Total
                    </Text>
                    <Text style={Styles.OMainTxt2} allowFontScaling={false}>
                      £ {item.price * this.state.value + 23}
                    </Text>
                  </View>
                </View>

              ))}
              <View style={Styles.footerBtn}>
                <Text style={Styles.BtnTxt} allowFontScaling={false}>
                  CHECKOUT
                </Text>
              </View>
              <View style={{ height: 20, width: 100 }} />
            </ScrollView>
          ) : (
            <View style={Styles.noItemView}>
              <Text style={Styles.noItemTxt} allowFontScaling={false}>
                No Item Available
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    cartArray: state.home.cartArray,
  };
};

export default connect(
  mapStateToProps,
  {
    getCategories,
    getProduct,
  },
)(CartScreen);
