import React, {Component, useState} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Picker,
} from 'react-native';
import Styles from '../style/ProductDetailsStyles';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Header from './common/Header';
import Footer from './common/Footer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {tsDeclareFunction} from '@babel/types';
import {getProductDetails} from '../actions/HomeScreenAction'
// import { Image } from "react-bootstrap";
import SearchBar from './helperComponents/SearchBar';
import * as colors from '../style/Common/ColorsStyle';




const search = require('../assets/search-green.png');
const filter = require('../assets/barcode.png');
const arrow = require('../assets/left-arrow.png');
const mainImg = require('../assets/sample-product2.jpg');
const rectangle1 = require('../assets/pinkRec.png');
const rectangle2 = require('../assets/blueRec.png');
const rectangle3 = require('../assets/orangeRec.png');

const EmptyListMessage = ({item}) => {
  return (
    // Flat List Item
    <Text
      style={Styles.emptyListStyle}
      >
      No Items
    </Text>
  );
};

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myNumber: 0,
      myNumber2: 0,
      myNumber3: 0,
      myNumber4: 0,
      myNumber5: 0,
      myNumber6: 0,
      myNumber7: 0,
      myNumber8: 0,
      myNumber9: 0,
      myNumber10: 0,
      showRelatedProduct: true,
      black: true,
      logtime:0,
      
      filteredDataSet: [],
      ltoken: "blank",
      loading: true,
      resData: [],
      searchResData: [],
      offset: 0,
      pagesize: 36,
      selectedstore: 1,
      scrollBegin: false,
    };
  }

  handleLoadMore = () => {
    console.log("handle more=====" + this.state.offset);
    this.setState({
      offset: this.state.offset + this.state.pagesize,
    });

    // console.log("new offset " + this.state.offset);
    // this.props.getProductDetails(this.props.loginToken);
  };

  _onScroll = () => {
    console.log("handle more=====" + this.state.offset);
    this.setState({
      offset: this.state.offset + this.state.pagesize,
    });

    // console.log("new offset " + this.state.offset);
    // this.props.getProductDetails(this.props.loginToken);
  };

  
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = contentSize.height - 84;
    console.log('higher '+layoutMeasurement.height + contentOffset.y)
    console.log('contect '+paddingToBottom)
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  ChangeStates(){
    console.log('compon===================');
    console.log('Value 2: ', this.state.logtime);
    this.setState({
      myNumber: 0,
      myNumber2: 0,
      myNumber3: 0,
      myNumber4: 0,
      myNumber5: 0,
      myNumber6: 0,
      myNumber7: 0,
      myNumber8: 0,
      myNumber9: 0,
      myNumber10: 0,
      logtime:1
    })
    console.log('Value : ', this.state.myNumber);
  }

  goToRelatedProduct(itm){

    console.log('item number '+this.props.productItem.relatedProducts);
    this.props.getProductDetails(this.props.loginToken, itm);
    
  }

  componentDidMount()
  {
    console.log(this.props.productItem.relatedProducts)
    //this.ChangeStates();
  }
  // componentDidUpdate () {
  //   if(this.state.logtime==0){
  //     this.ChangeStates();
  //   }
  //   console.log('Value 1: ', this.state.logtime);
  // }
  checkShowingTime = (type, month) => {
    //console.log(this.props.productItem.priceOptions['1']);
    
    if (type === 'sow') {
      var data = this.props.productItem.propagationData.sow
        ? this.props.productItem.propagationData.sow.split(',')
        : null;

      if (data !== null) {
        return data.includes(month);
      } else {
        return false;
      }
    } else if (type === 'plant') {
      var data = this.props.productItem.propagationData.plant
        ? this.props.productItem.propagationData.plant.split(',')
        : null;

      if (data !== null) {
        return data.includes(month);
      } else {
        return false;
      }
    } else if (type === 'harvest') {
      var data = this.props.productItem.propagationData.harvest
        ? this.props.productItem.propagationData.harvest.split(',')
        : null;

      if (data !== null) {
        return data.includes(month);
      } else {
        return false;
      }
    } else if (type === 'notes') {
      var data = this.props.productItem.propagationData.notes
        ? this.props.productItem.propagationData.notes.split(',')
        : null;

      if (data !== null) {
        return data.includes(month);
      } else {
        return false;
      }
    }
  };

  getSubTotal() {
    return (
      this.state.myNumber +
      this.state.myNumber2 +
      this.state.myNumber3 +
      this.state.myNumber4 +
      this.state.myNumber5 +
      this.state.myNumber6 +
      this.state.myNumber7 +
      this.state.myNumber8 +
      this.state.myNumber9 +
      this.state.myNumber10
    );
  }
  // onChanged(text) {
  //   let newText = '';
  //   let numbers = '0123456789';

  //   for (var i = 0; i < text.length; i++) {
  //     if (numbers.indexOf(text[i]) > -1) {
  //       newText = newText + text[i];
  //     }
  //     else {
  //       // your call back function
  //       alert("please enter numbers only");
  //     }
  //   }
  //   this.setState({ myNumber: newText });
  //   this.setState({ myNumber2: newText });
  //   this.setState({ myNumber3: newText });
  // }

  renderRow2 = ({item}) => {
    return (
      <TouchableOpacity activeOpacity={0.9}
      onPress={() => {
        this.goToRelatedProduct(item.skuId);
      }}>
      <View style={Styles.item2}>
        <View
          style={{
            width: '100%',
            height: '55%',
            // marginTop: '%',
            //backgroundColor: 'green',
            alignItems: 'center',
          }}>
          {/* <Image source={no} style={Styles.itemImage} /> */}
          <Image source={{uri: item.imageURL}} style={Styles.itemImage} />
        </View>
        <View style={Styles.cardMainTxtView1}>
          <View style={{marginTop: hp('-1%')}}>
            <View style={Styles.cardSubTxtView}>
              <Text
                // numberOfLines={1}
                style={Styles.cardSubMainTxt}
                allowFontScaling={false}>
                {item.name}
              </Text>
            </View>
            <View style={Styles.cardSubTxtView2}>
              <Text style={Styles.cardSubTxt} allowFontScaling={false}>
                Code : {item.code}
              </Text>
            </View>
            <View style={Styles.cardSubTxtView4}>
              <Text style={Styles.packtxt} allowFontScaling={false}>
                {item.packSize}
              </Text>
              {/* <Text style={Styles.cardSubTxt1} allowFontScaling={false}>
              {item.packSize}
              </Text> */}
            </View>
            <View style={Styles.cardSubTxtView5}>
              <Text style={Styles.stocktxt} allowFontScaling={false}>
                Stock :
              </Text>
              <Text style={Styles.cardSubTxt2} allowFontScaling={false}>
                In Stock
              </Text>
            </View>
            <View style={Styles.cardSubTxtView3}>
              <Text style={Styles.priceTxt} allowFontScaling={false}>
                {item.price}
              </Text>
              <TouchableOpacity activeOpacity={0.9}
                style={Styles.cart}
                onPress={() => {
                  this.goToRelatedProduct(item.skuId);
                }}>
                <Text style={Styles.cartText}>View</Text>
                {/* <TextInput
                  allowFontScaling={false}
                  style={Styles.cartText}
                  placeholder={'Add'}
                  placeholderTextColor="#1ED18C"
                /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  };

  renderRow3 = ({item}) => {
    
    return (
      <View style={Styles.item2}>
        <View
          style={{
            width: '100%',
            height: '55%',
            // marginTop: '%',
            //backgroundColor: 'green',
            alignItems: 'center',
          }}>
          {/* <Image source={no} style={Styles.itemImage} /> */}
          <Image source={{uri: item.imageURL}} style={Styles.itemImage} />
        </View>
        <View style={Styles.cardMainTxtView1}>
          <View style={{marginTop: hp('-1%')}}>
            <View style={Styles.cardSubTxtView}>
              <Text
                numberOfLines={2}
                style={Styles.cardSubMainTxt}
                allowFontScaling={false}>
                {item.name}
              </Text>
            </View>
            <View style={Styles.cardSubTxtView2}>
              <Text style={Styles.cardSubTxt} allowFontScaling={false}>
                Code : {item.code}
              </Text>
            </View>
            <View style={Styles.cardSubTxtView4}>
              <Text style={Styles.packtxt} allowFontScaling={false}>
                {item.packSize}
              </Text>
              {/* <Text style={Styles.cardSubTxt1} allowFontScaling={false}>
                {this.props.productItem.alsoBoughtProducts}
              </Text> */}
            </View>
            <View style={Styles.cardSubTxtView5}>
              <Text style={Styles.stocktxt} allowFontScaling={false}>
                Stock :
              </Text>
              <Text style={Styles.cardSubTxt2} allowFontScaling={false}>
                In Stock
              </Text>
            </View>
            <View style={Styles.cardSubTxtView3}>
              <Text style={Styles.priceTxt} allowFontScaling={false}>
                {item.price}
              </Text>
              <TouchableOpacity activeOpacity={0.9}
                style={Styles.cart}
                // onPress={() => {
                //   this.props.navigation.navigate(filter();
                // }}
              >
                <Text style={Styles.cartText}>View</Text>
                {/* <TextInput
                  allowFontScaling={false}
                  style={Styles.cartText}
                  placeholder={'Add'}
                  placeholderTextColor="#1ED18C"
                /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  

  render() {
    return (
      <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
        <View style={Styles.container}>
          
          <View style={Styles.backView}>
            <TouchableOpacity activeOpacity={0.9}
              style={Styles.backBtn}
              onPress={() => {
                this.setState({
                  myNumber: 0,
                  myNumber2: 0,
                  myNumber3: 0,
                  myNumber4: 0,
                  myNumber5: 0,
                  myNumber6: 0,
                  myNumber7: 0,
                  myNumber8: 0,
                  myNumber9: 0,
                  myNumber10: 0,
                  subTotal: 0.0,
                });
                this.props.navigation.navigate(productGrid());
              }}>
              <Image source={arrow} style={Styles.backIcon} />
              <Text style={Styles.backText}>Back</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ height: '100%' }}
                        onMomentumScrollEnd={({nativeEvent}) => {
                          if (this.isCloseToBottom(nativeEvent)) {
                            this._onScroll();
                          }
                        }}
                        scrollEventThrottle={400}
          >
            <View style={Styles.searchView}>
              {/* <View style={Styles.searchInput}>
                <Image source={search} style={Styles.searchIcon} />
                <TextInput
                  allowFontScaling={false}
                  style={Styles.TxtInput}
                  placeholderTextColor="#93999c"
                />
              </View> */}
              

              {/* <TouchableOpacity activeOpacity={0.9}
                style={Styles.filterBtn}
                // onPress={() => {
                //   this.props.navigation.navigate(filter();
                // }}
              >
                <Image source={filter} style={Styles.filterIcon} />
              </TouchableOpacity> */}

<View style={{ width: '84%' }}>
                  <SearchBar/>
                </View>
                <View >
                  <TouchableOpacity activeOpacity={0.9}
                    style={Styles.filterBtn}
                  // onPress={() => {
                  //   this.props.navigation.navigate(filter();
                  // }}
                  >
                    <Image source={filter} style={Styles.filterIcon} />
                  </TouchableOpacity>
                </View>
            </View>

            <View style={Styles.row}>
              <View style={[Styles.box, Styles.box1]}>
                <View style={Styles.mainImage}>
                  <View style={Styles.imageView}>
                    <Image
                      source={{
                        uri: this.props.productItem.imagesMain[0].imagePath,
                      }}
                      style={Styles.itemImage}
                    />
                  </View>
                  <View style={Styles.detailBox}>
                    <View style={Styles.insideBox}>
                      <View style={{marginTop: hp('-1%')}}>
                        <View style={Styles.titleView}>
                          <Text
                            // numberOfLines={1}
                            style={Styles.titleTxt}
                            allowFontScaling={false}>
                            {this.props.productItem.imagesMain[0].skuName}
                          </Text>
                        </View>
                      </View>
                      <View style={{marginTop: hp('1')}}>
                        <View style={Styles.subView}>
                          <Text
                            style={Styles.productNum}
                            allowFontScaling={false}>
                            Product Part Number :
                          </Text>
                          <Text style={Styles.subTxt} allowFontScaling={false}>
                            {this.props.productItem.imagesMain[0].imageNumber}
                          </Text>
                        </View>
                        <View style={Styles.sizeView}>
                          <Text
                            style={Styles.packtxt2}
                            allowFontScaling={false}>
                            Pack Size:
                          </Text>
                          <Text style={Styles.sizeTxt} allowFontScaling={false}>
                            {this.props.productItem.skuPackSize} seeds
                          </Text>
                        </View>
                        <View style={Styles.stockView}>
                          <Text
                            style={Styles.stocktxt2}
                            allowFontScaling={false}>
                            Stock :
                          </Text>
                          <Text
                            style={Styles.storeTxt}
                            allowFontScaling={false}>
                            {this.props.productItem.isSKUAvailableForSale}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Styles.showBox}>
                  <View style={Styles.showBox2}>
                    <View style={Styles.showBoxView1}>
                      <Text
                        // numberOfLines={1}
                        style={Styles.topicTxt}
                        allowFontScaling={false}>
                        Sowing & Harvest Times
                      </Text>
                    </View>
                    <View style={Styles.showBoxView2}>
                      <Image source={rectangle1} style={Styles.recImg} />
                      <Text
                        // numberOfLines={1}
                        style={Styles.text1}
                        allowFontScaling={false}>
                        Sow
                      </Text>
                      <Image source={rectangle2} style={Styles.recImg} />
                      <Text
                        // numberOfLines={1}
                        style={Styles.text1}
                        allowFontScaling={false}>
                        Plant
                      </Text>
                      <Image source={rectangle3} style={Styles.recImg} />
                      <Text
                        // numberOfLines={1}
                        style={Styles.text1}
                        allowFontScaling={false}>
                        Harves
                      </Text>
                      <Image source={rectangle1} style={Styles.recImg} />
                      <Text
                        // numberOfLines={1}
                        style={Styles.text1}
                        allowFontScaling={false}>
                        notes
                      </Text>
                    </View>
                  </View>

                  <View style={Styles.showBox3}>
                    {/* <Image source={calander} style={Styles.calImg} /> */}
                    <View style={Styles.calBox1}>
                      <View style={Styles.rowCal}>
                        <View style={Styles.boxCal}>
                          <Text style={Styles.month1} allowFontScaling={false}>
                            Ja
                          </Text>
                        </View>
                        <View style={Styles.boxCal1}>
                          <Text style={Styles.month2} allowFontScaling={false}>
                            Fb
                          </Text>
                        </View>
                        <View style={Styles.boxCal}>
                          <Text style={Styles.month1} allowFontScaling={false}>
                            Ma
                          </Text>
                        </View>
                        <View style={Styles.boxCal1}>
                          <Text style={Styles.month2} allowFontScaling={false}>
                            Ap
                          </Text>
                        </View>
                        <View style={Styles.boxCal}>
                          <Text style={Styles.month1} allowFontScaling={false}>
                            Ma
                          </Text>
                        </View>
                        <View style={Styles.boxCal1}>
                          <Text style={Styles.month2} allowFontScaling={false}>
                            Ju
                          </Text>
                        </View>
                        <View style={Styles.boxCal}>
                          <Text style={Styles.month1} allowFontScaling={false}>
                            Ju
                          </Text>
                        </View>
                        <View style={Styles.boxCal1}>
                          <Text style={Styles.month2} allowFontScaling={false}>
                            Au
                          </Text>
                        </View>
                        <View style={Styles.boxCal}>
                          <Text style={Styles.month1} allowFontScaling={false}>
                            Se
                          </Text>
                        </View>
                        <View style={Styles.boxCal1}>
                          <Text style={Styles.month2} allowFontScaling={false}>
                            Oc
                          </Text>
                        </View>
                        <View style={Styles.boxCal}>
                          <Text style={Styles.month1} allowFontScaling={false}>
                            No
                          </Text>
                        </View>
                        <View style={Styles.boxCal1}>
                          <Text style={Styles.month2} allowFontScaling={false}>
                            De
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={Styles.calBox2}>
                      <View style={Styles.rowSow}>
                        <View style={Styles.sowBox}>
                          {this.checkShowingTime('sow', '1') ? (
                            <View style={Styles.sow}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.sowBox}>
                          {this.checkShowingTime('sow', '2') ? (
                            <View style={Styles.sow}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.sowBox}>
                          {this.checkShowingTime('sow', '3') ? (
                            <View style={Styles.sow}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.sowBox}>
                          {this.checkShowingTime('sow', '4') ? (
                            <View style={Styles.sow}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.sowBox}>
                          {this.checkShowingTime('sow', '5') ? (
                            <View style={Styles.sow}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.sowBox}>
                          {this.checkShowingTime('sow', '6') ? (
                            <View style={Styles.sow}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.sowBox}>
                          {this.checkShowingTime('sow', '7') ? (
                            <View style={Styles.sow}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.sowBox}>
                          {this.checkShowingTime('sow', '8') ? (
                            <View style={Styles.sow}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.sowBox}>
                          {this.checkShowingTime('sow', '9') ? (
                            <View style={Styles.sow}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.sowBox}>
                          {this.checkShowingTime('sow', '10') ? (
                            <View style={Styles.sow}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.sowBox}>
                          {this.checkShowingTime('sow', '11') ? (
                            <View style={Styles.sow}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.sowBox}>
                          {this.checkShowingTime('sow', '12') ? (
                            <View style={Styles.sow}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={Styles.calBox3}>
                      <View style={Styles.rowPlant}>
                        <View style={Styles.plantBox}>
                          {this.checkShowingTime('plant', '1') ? (
                            <View style={Styles.plant}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.plantBox}>
                          {this.checkShowingTime('plant', '2') ? (
                            <View style={Styles.plant}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.plantBox}>
                          {this.checkShowingTime('plant', '3') ? (
                            <View style={Styles.plant}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.plantBox}>
                          {this.checkShowingTime('plant', '4') ? (
                            <View style={Styles.plant}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.plantBox}>
                          {this.checkShowingTime('plant', '5') ? (
                            <View style={Styles.plant}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.plantBox}>
                          {this.checkShowingTime('plant', '6') ? (
                            <View style={Styles.plant}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.plantBox}>
                          {this.checkShowingTime('plant', '7') ? (
                            <View style={Styles.plant}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.plantBox}>
                          {this.checkShowingTime('plant', '8') ? (
                            <View style={Styles.plant}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.plantBox}>
                          {this.checkShowingTime('plant', '9') ? (
                            <View style={Styles.plant}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.plantBox}>
                          {this.checkShowingTime('plant', '10') ? (
                            <View style={Styles.plant}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.plantBox}>
                          {this.checkShowingTime('plant', '11') ? (
                            <View style={Styles.plant}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.plantBox}>
                          {this.checkShowingTime('plant', '12') ? (
                            <View style={Styles.plant}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={Styles.calBox4}>
                      <View style={Styles.rowHarves}>
                        <View style={Styles.harvesBox}>
                          {this.checkShowingTime('harvest', '1') ? (
                            <View style={Styles.harves}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.harvesBox}>
                          {this.checkShowingTime('harvest', '2') ? (
                            <View style={Styles.harves}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.harvesBox}>
                          {this.checkShowingTime('harvest', '3') ? (
                            <View style={Styles.harves}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.harvesBox}>
                          {this.checkShowingTime('harvest', '4') ? (
                            <View style={Styles.harves}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.harvesBox}>
                          {this.checkShowingTime('harvest', '5') ? (
                            <View style={Styles.harves}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.harvesBox}>
                          {this.checkShowingTime('harvest', '6') ? (
                            <View style={Styles.harves}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.harvesBox}>
                          {this.checkShowingTime('harvest', '7') ? (
                            <View style={Styles.harves}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.harvesBox}>
                          {this.checkShowingTime('harvest', '8') ? (
                            <View style={Styles.harves}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.harvesBox}>
                          {this.checkShowingTime('harvest', '9') ? (
                            <View style={Styles.harves}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.harvesBox}>
                          {this.checkShowingTime('harvest', '10') ? (
                            <View style={Styles.harves}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.harvesBox}>
                          {this.checkShowingTime('harvest', '11') ? (
                            <View style={Styles.harves}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                        <View style={Styles.harvesBox}>
                          {this.checkShowingTime('harvest', '12') ? (
                            <View style={Styles.harves}></View>
                          ) : (
                            <View />
                          )}
                        </View>
                      </View>

                      <View style={Styles.calBox5}>
                        <View style={Styles.rowHarves}>
                          <View style={Styles.harvesBox}>
                            {this.checkShowingTime('notes', '1') ? (
                              <View style={Styles.sow}></View>
                            ) : (
                              <View />
                            )}
                          </View>
                          <View style={Styles.harvesBox}>
                            {this.checkShowingTime('notes', '2') ? (
                              <View style={Styles.sow}></View>
                            ) : (
                              <View />
                            )}
                          </View>
                          <View style={Styles.harvesBox}>
                            {this.checkShowingTime('notes', '3') ? (
                              <View style={Styles.sow}></View>
                            ) : (
                              <View />
                            )}
                          </View>
                          <View style={Styles.harvesBox}>
                            {this.checkShowingTime('notes', '4') ? (
                              <View style={Styles.sow}></View>
                            ) : (
                              <View />
                            )}
                          </View>
                          <View style={Styles.harvesBox}>
                            {this.checkShowingTime('notes', '5') ? (
                              <View style={Styles.sow}></View>
                            ) : (
                              <View />
                            )}
                          </View>
                          <View style={Styles.harvesBox}>
                            {this.checkShowingTime('notes', '6') ? (
                              <View style={Styles.sow}></View>
                            ) : (
                              <View />
                            )}
                          </View>
                          <View style={Styles.harvesBox}>
                            {this.checkShowingTime('notes', '7') ? (
                              <View style={Styles.sow}></View>
                            ) : (
                              <View />
                            )}
                          </View>
                          <View style={Styles.harvesBox}>
                            {this.checkShowingTime('notes', '8') ? (
                              <View style={Styles.sow}></View>
                            ) : (
                              <View />
                            )}
                          </View>
                          <View style={Styles.harvesBox}>
                            {this.checkShowingTime('notes', '9') ? (
                              <View style={Styles.sow}></View>
                            ) : (
                              <View />
                            )}
                          </View>
                          <View style={Styles.harvesBox}>
                            {this.checkShowingTime('notes', '10') ? (
                              <View style={Styles.sow}></View>
                            ) : (
                              <View />
                            )}
                          </View>
                          <View style={Styles.harvesBox}>
                            {this.checkShowingTime('notes', '11') ? (
                              <View style={Styles.sow}></View>
                            ) : (
                              <View />
                            )}
                          </View>
                          <View style={Styles.harvesBox}>
                            {this.checkShowingTime('notes', '12') ? (
                              <View style={Styles.sow}></View>
                            ) : (
                              <View />
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[Styles.box, Styles.box2]}>
                <View style={Styles.listView}>
                  <View style={Styles.mainListView}>
                    <View style={Styles.topicBox}>
                      <Text style={Styles.topicTxt} allowFontScaling={false}>
                        Price Options
                      </Text>
                    </View>
                    {/* {this.props.productItem.priceOptions['1'] !== null ? 'view': ''}  */}
                    <View style={Styles.rowView1}>
                      <Text style={Styles.rowTxt1} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['1'] !== null
                          ? this.props.productItem.priceOptions['1'].label
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt2} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['1'] !== null
                          ? this.props.productItem.priceOptions['1']
                              .priceDisplay
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt3} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['1'] !== null ? 'Qty' : ''}
                      </Text>
                      {this.props.productItem.priceOptions['1'] !== null && 
                      <TextInput
                        style={Styles.qtyInput}
                        allowFontScaling={false}
                        placeholder="0"
                        placeholderTextColor="black"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          if (/^[-+]?[0-9]+$/.test(text)) {
                            this.setState({
                              myNumber:
                                this.props.productItem.priceOptions['1'].price *
                                parseFloat(text).toFixed(2),
                                
                            });
                          } else if (text === '') {
                            this.setState({myNumber: text});
                          } else {
                            alert('please enter numbers only');
                          }
                        }}
                        value={this.state.myNumber}
                        maxLength={2} //setting limit of input
                      />}

                      <Text style={Styles.rowTxt4} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['1'] !== null
                          ?  '£ '
                          : ''}
                      {this.props.productItem.priceOptions['1'] !== null
                          ?  this.state.myNumber.toFixed(2)
                          : ''}
                      </Text>
                    </View>
                    <View style={Styles.rowView1}>
                      <Text style={Styles.rowTxt1} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['2'] !== null
                          ? this.props.productItem.priceOptions['2'].label
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt2} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['2'] !== null
                          ? this.props.productItem.priceOptions['2']
                              .priceDisplay
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt3} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['2'] !== null ? 'Qty' : ''}
                      </Text>
                      
                      {this.props.productItem.priceOptions['2'] !== null && 
                         <TextInput
                        style={Styles.qtyInput}
                        allowFontScaling={false}
                        placeholder="0"
                        placeholderTextColor="black"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          if (/^[-+]?[0-9]+$/.test(text)) {
                            this.setState({
                              myNumber2:
                                this.props.productItem.priceOptions['2'].price *
                                parseFloat(text).toFixed(2),
                            });
                          } else if (text === '') {
                            this.setState({myNumber2: text});
                          } else {
                            alert('please enter numbers only');
                          }
                        }}
                        value={this.state.myNumber2}
                        maxLength={10} //setting limit of input
                      /> }
                    

                    
                      <Text style={Styles.rowTxt4} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['2'] !== null
                          ?  '£ '
                          : ''}
                        {this.props.productItem.priceOptions['2'] !== null
                          ?  this.state.myNumber2.toFixed(2)
                          : ''}
                        {/* £{this.state.myNumber2} */}
                        {/* {(this.props.productItem.priceOptions["2"].price)} */}
                      </Text>
                    </View>
                    <View style={Styles.rowView1}>
                      <Text style={Styles.rowTxt1} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['3'] !== null
                          ? this.props.productItem.priceOptions['3'].label
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt2} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['3'] !== null
                          ? this.props.productItem.priceOptions['3']
                              .priceDisplay
                          : ''}
                      </Text>

                    
                      <Text style={Styles.rowTxt3} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['3'] !== null ? 'Qty' : ''}
                        
                      </Text>
                      {this.props.productItem.priceOptions['3'] !== null && 
                      <TextInput
                        style={Styles.qtyInput}
                        allowFontScaling={false}
                        placeholder="0"
                        placeholderTextColor="black"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          if (/^[-+]?[0-9]+$/.test(text)) {
                            this.setState({
                              myNumber3:
                                this.props.productItem.priceOptions['3'].price *
                                parseFloat(text).toFixed(2),
                            });
                          } else if (text === '') {
                            this.setState({myNumber3: text});
                          } else {
                            alert('please enter numbers only');
                          }
                        }}
                        value={this.state.myNumber3}
                        maxLength={10} //setting limit of input
                      />}
                      <Text style={Styles.rowTxt4} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['3'] !== null
                          ?  '£ '
                          : ''}
                      {this.props.productItem.priceOptions['3'] !== null
                          ?  this.state.myNumber3.toFixed(2)
                          : ''}
                        {/* £{this.state.myNumber3} */}
                        {/* £{(this.props.productItem.priceOptions["3"].price) * this.state.myNumber3} */}
                        {/* £{(this.props.productItem.priceOptions["3"].price)} */}
                      </Text>
                    </View>
                    <View style={Styles.rowView1}>
                      <Text style={Styles.rowTxt1} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['4'] !== null
                          ? this.props.productItem.priceOptions['4'].label
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt2} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['4'] !== null
                          ? this.props.productItem.priceOptions['4']
                              .priceDisplay
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt3} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['4'] !== null ? 'Qty' : ''}
                      </Text>
                      {this.props.productItem.priceOptions['4'] !== null && 
                      <TextInput
                        style={Styles.qtyInput}
                        allowFontScaling={false}
                        placeholder="0"
                        placeholderTextColor="black"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          if (/^[-+]?[0-9]+$/.test(text)) {
                            this.setState({
                              myNumber4:
                                this.props.productItem.priceOptions['4'].price *
                                parseFloat(text).toFixed(2),
                            });
                          } else if (text === '') {
                            this.setState({myNumber4: text});
                          } else {
                            alert('please enter numbers only');
                          }
                        }}
                        value={this.state.myNumber4}
                        maxLength={10} //setting limit of input
                      />}
                      <Text style={Styles.rowTxt4} allowFontScaling={false}>
                        {/* £{this.state.myNumber4} */}
                        {this.props.productItem.priceOptions['4'] !== null
                          ?  '£ '
                          : ''}
                        {this.props.productItem.priceOptions['4'] !== null
                          ?  this.state.myNumber4.toFixed(2)
                          : ''}
                        {/* £{(this.props.productItem.priceOptions["4"].price) * this.state.myNumber4} */}
                        {/* £ {(this.props.productItem.priceOptions["4"].price)} */}
                      </Text>
                    </View>
                    <View style={Styles.rowView1}>
                      <Text style={Styles.rowTxt1} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['5'] !== null
                          ? this.props.productItem.priceOptions['5'].label
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt2} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['5'] !== null
                          ? this.props.productItem.priceOptions['5']
                              .priceDisplay
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt3} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['5'] !== null ? 'Qty' : ''}
                      </Text>
                      {this.props.productItem.priceOptions['5'] !== null && 
                      <TextInput
                        style={Styles.qtyInput}
                        allowFontScaling={false}
                        placeholder="0"
                        placeholderTextColor="black"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          if (/^[-+]?[0-9]+$/.test(text)) {
                            this.setState({
                              myNumber5:
                                this.props.productItem.priceOptions['5'].price *
                                parseFloat(text).toFixed(2),
                            });
                          } else if (text === '') {
                            this.setState({myNumber5: text});
                          } else {
                            alert('please enter numbers only');
                          }
                        }}
                        value= {this.state.myNumbe5}
                        maxLength={10} //setting limit of input
                      />}
                      <Text style={Styles.rowTxt4} allowFontScaling={false}> 
                      {this.props.productItem.priceOptions['5'] !== null
                          ?  '£ '
                          : ''}
                      {this.props.productItem.priceOptions['5'] !== null
                          ?  this.state.myNumber5.toFixed(2)
                          : ''}
                        {/* £{this.state.myNumber5} */}
                        {/* £{(this.props.productItem.priceOptions["5"].price) * this.state.myNumber5} */}
                        {/* £ {(this.props.productItem.priceOptions["5"].price)} */}
                      </Text>
                    </View>
                    <View style={Styles.rowView1}>
                      <Text style={Styles.rowTxt1} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['6'] !== null
                          ? this.props.productItem.priceOptions['6'].label
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt2} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['6'] !== null
                          ? this.props.productItem.priceOptions['6']
                              .priceDisplay
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt3} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['6'] !== null ? 'Qty' : ''}
                      </Text>
                      {this.props.productItem.priceOptions['6'] !== null && 
                      <TextInput
                        style={Styles.qtyInput}
                        allowFontScaling={false}
                        placeholder="0"
                        placeholderTextColor="black"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          if (/^[-+]?[0-9]+$/.test(text)) {
                            this.setState({
                              myNumber6:
                                this.props.productItem.priceOptions['6'].price *
                                parseFloat(text).toFixed(2),
                            });
                          } else if (text === '') {
                            this.setState({myNumber6: text});
                          } else {
                            alert('please enter numbers only');
                          }
                        }}
                        value={this.state.myNumber6}
                        maxLength={10} //setting limit of input
                      />}
                      <Text style={Styles.rowTxt4} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['6'] !== null
                          ?  '£ '
                          : ''}
                      {this.props.productItem.priceOptions['6'] !== null
                          ?  this.state.myNumber6.toFixed(2)
                          : ''}
                        {/* £{this.state.myNumber6} */}
                        {/* £{(this.props.productItem.priceOptions["6"].price) * this.state.myNumber6} */}
                        {/* £{(this.props.productItem.priceOptions["6"].price)} */}
                      </Text>
                    </View>
                    <View style={Styles.rowView1}>
                      <Text style={Styles.rowTxt1} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['7'] !== null
                          ? this.props.productItem.priceOptions['7'].label
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt2} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['7'] !== null
                          ? this.props.productItem.priceOptions['7']
                              .priceDisplay
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt3} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['7'] !== null ? 'Qty' : ''}
                      </Text>
                      {this.props.productItem.priceOptions['7'] !== null && 
                      <TextInput
                        style={Styles.qtyInput}
                        allowFontScaling={false}
                        placeholder="0"
                        placeholderTextColor="black"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          if (/^[-+]?[0-9]+$/.test(text)) {
                            this.setState({
                              myNumber7:
                                this.props.productItem.priceOptions['7'].price *
                                parseFloat(text).toFixed(2),
                            });
                          } else if (text === '') {
                            this.setState({myNumber7: text});
                          } else {
                            alert('please enter numbers only');
                          }
                        }}
                        value={this.state.myNumber7}
                        maxLength={10} //setting limit of input
                      />}
                      <Text style={Styles.rowTxt4} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['7'] !== null
                          ?  '£ '
                          : ''}
                      {this.props.productItem.priceOptions['7'] !== null
                          ?  this.state.myNumber7.toFixed(2)
                          : ''}
                        {/* £{this.state.myNumber7} */}
                        {/* £{(this.props.productItem.priceOptions["7"].price) * this.state.myNumber7} */}
                        {/* £{(this.props.productItem.priceOptions["7"].price)} */}
                      </Text>
                    </View>
                    <View style={Styles.rowView1}>
                      <Text style={Styles.rowTxt1} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['8'] !== null
                          ? this.props.productItem.priceOptions['8'].label
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt2} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['8'] !== null
                          ? this.props.productItem.priceOptions['8']
                              .priceDisplay
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt3} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['8'] !== null ? 'Qty' : ''}
                      </Text>
                      {this.props.productItem.priceOptions['8'] !== null && 
                      <TextInput
                        style={Styles.qtyInput}
                        allowFontScaling={false}
                        placeholder="0"
                        placeholderTextColor="black"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          if (/^[-+]?[0-9]+$/.test(text)) {
                            this.setState({
                              myNumber8:
                                this.props.productItem.priceOptions['8'].price *
                                parseFloat(text).toFixed(2),
                            });
                          } else if (text === '') {
                            this.setState({myNumber8: text});
                          } else {
                            alert('please enter numbers only');
                          }
                        }}
                        value={this.state.myNumber8}
                        maxLength={10} //setting limit of input
                      />}
                      <Text style={Styles.rowTxt4} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['8'] !== null
                          ?  '£ '
                          : ''}
                      {this.props.productItem.priceOptions['8'] !== null
                          ?  this.state.myNumber8.toFixed(2)
                          : ''}
                        {/* £{this.state.myNumber8} */}
                        {/* £{(this.props.productItem.priceOptions["8"].price) * this.state.myNumber8} */}
                        {/* £{(this.props.productItem.priceOptions["8"].price)} */}
                      </Text>
                    </View>
                    <View style={Styles.rowView1}>
                      <Text style={Styles.rowTxt1} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['9'] !== null
                          ? this.props.productItem.priceOptions['9'].label
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt2} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['9'] !== null
                          ? this.props.productItem.priceOptions['9']
                              .priceDisplay
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt3} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['9'] !== null ? 'Qty' : ''}
                      </Text>
                      {this.props.productItem.priceOptions['9'] !== null && 
                      <TextInput
                        style={Styles.qtyInput}
                        allowFontScaling={false}
                        placeholder="0"
                        placeholderTextColor="black"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          if (/^[-+]?[0-9]+$/.test(text)) {
                            this.setState({
                              myNumber9:
                                this.props.productItem.priceOptions['9'].price *
                                parseFloat(text).toFixed(2),
                            });
                          } else if (text === '') {
                            this.setState({myNumber9: text});
                          } else {
                            alert('please enter numbers only');
                          }
                        }}
                        value={this.state.myNumber9}
                        maxLength={10} //setting limit of input
                      />}
                      <Text style={Styles.rowTxt4} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['9'] !== null
                          ?  '£ '
                          : ''}
                        {this.props.productItem.priceOptions['9'] !== null
                          ?  this.state.myNumber9.toFixed(2)
                          : ''}
                        {/* £{this.state.myNumber9} */}
                        {/* £{(this.props.productItem.priceOptions["9"].price) * this.state.myNumber9} */}
                        {/* £{(this.props.productItem.priceOptions["9"].price)} */}
                      </Text>
                    </View>
                    <View style={Styles.rowView1}>
                      <Text style={Styles.rowTxt1} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['10'] !== null
                          ? this.props.productItem.priceOptions['10'].label
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt2} allowFontScaling={false}>
                        {this.props.productItem.priceOptions['10'] !== null
                          ? this.props.productItem.priceOptions['10']
                              .priceDisplay
                          : ''}
                      </Text>
                      <Text style={Styles.rowTxt3} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['10'] !== null ? 'Qty' : ''}
                      </Text>
                      {this.props.productItem.priceOptions['10'] !== null && 
                      <TextInput
                        style={Styles.qtyInput}
                        allowFontScaling={false}
                        placeholder="0"
                        placeholderTextColor="black"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          if (/^[-+]?[0-9]+$/.test(text)) {
                            this.setState({
                              myNumber10:
                                this.props.productItem.priceOptions['10']
                                  .price * parseFloat(text).toFixed(2),
                            });
                          } else if (text === '') {
                            this.setState({myNumber10: text});
                          } else {
                            alert('please enter numbers only');
                          }
                        }}
                        value={this.state.myNumber10}
                        maxLength={10} //setting limit of input
                      />}
                      <Text style={Styles.rowTxt4} allowFontScaling={false}>
                      {this.props.productItem.priceOptions['10'] !== null
                          ?  '£ '
                          : ''}
                      {this.props.productItem.priceOptions['10'] !== null
                          ?  this.state.myNumber10.toFixed(2)
                          : ''}
                        {/* £{this.state.myNumber10} */}
                        {/* £{(this.props.productItem.priceOptions["10"].price) * this.state.myNumber10} */}
                        {/* £ {(this.props.productItem.priceOptions["10"].price)} */}
                      </Text>
                    </View>
                    <View style={Styles.rowView2}>
                      <TouchableOpacity activeOpacity={0.9}
                        style={Styles.AddBtn}
                        // onPress={() => {
                        //   this.props.navigation.navigate(filter();
                        // }}
                        // onPress={() => this.checkShowingTime('plant', '1')}
                      >
                        <Text style={Styles.addBtn1}>ADD TO BASKET</Text>
                      </TouchableOpacity>
                      <View style={Styles.total}>
                        <View style={Styles.totalColum1}>
                          <Text style={Styles.addTxt1}>Sub total</Text>
                        </View>
                        <View style={Styles.totalColum2}>
                          <Text style={Styles.addTotal}>
                            £ {this.getSubTotal().toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.bodyView}>
              <View style={Styles.CardDetail}>
                <TouchableOpacity activeOpacity={0.9}
                  style={
                    this.state.showRelatedProduct
                      ? Styles.CardDetail1
                      : Styles.CardDetail2
                  }
                  onPress={() => {
                    this.setState({
                      showRelatedProduct: !this.state.showRelatedProduct,
                    });
                  }}>
                  <View style={Styles.detailContent}>
                    <Text
                      style={
                        this.state.showRelatedProduct
                          ? Styles.title
                          : Styles.title1
                      }>
                      Related Products
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9}
                  style={
                    !this.state.showRelatedProduct
                      ? Styles.CardDetail1
                      : Styles.CardDetail2
                  }
                  onPress={() => {
                    this.setState({
                      showRelatedProduct: !this.state.showRelatedProduct,
                    });
                  }}>
                  <View style={Styles.detailContent}>
                    <Text
                      style={
                        !this.state.showRelatedProduct
                          ? Styles.title
                          : Styles.title1
                      }>
                      People also Bought
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {this.state.showRelatedProduct === false ? undefined : (
               <ScrollView style={{ height: '100%', marginBottom:hp('9') }}>
              <View style={Styles.relatedView}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={Styles.flatlist}
                  data={this.props.productItem.relatedProducts}
                  renderItem={(item) => this.renderRow2(item)}
                  keyExtractor={(item) => item.id}
                  onEndReached={this.handleLoadMore}
                    //Message to show for the Empty list
                    ListEmptyComponent={EmptyListMessage}
                  onEndReachedThreshold={0}
                  numColumns={3}
                />
              </View>
              </ScrollView>
            )}
            {this.state.showRelatedProduct === true ? undefined : (
               <ScrollView style={{ height: '100%', marginBottom:hp('9') }}>
              <View style={Styles.relatedView2}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={Styles.flatlist}
                  data={this.props.productItem.alsoBoughtProducts}
                    //Message to show for the Empty list
                  ListEmptyComponent={EmptyListMessage}
                  renderItem={(item) => this.renderRow3(item)}
                  keyExtractor={(item) => item.id}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={0}
                  numColumns={3}
                />
              </View>
              </ScrollView>
            )}
            {/* <View style={Styles.relatedView}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={Styles.flatlist}
              data={data}
              renderItem={this.renderRow2}
              keyExtractor={(item) => item.id}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
              numColumns={3}
            />
            </View> */}
            {/* <FlatList
              showsVerticalScrollIndicator={false}
              style={Styles.flatlist}
              data={data}
              renderItem={this.renderRow2}
              keyExtractor={(item) => item.id}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
              numColumns={3}
            /> */}
          </ScrollView>
          
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    productItem: state.home.productItem,
    itemImg: state.home.itemImg,
    itemStore: state.home.itemStore,
    itemPrice: state.home.itemPrice,
    itemNumber: state.home.itemNumber,
    filterData: state.home.filterData,
  };
};

export default connect(mapStateToProps, {
  getProductDetails
})(ProductDetails);

