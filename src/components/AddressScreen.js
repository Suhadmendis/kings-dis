import React, {Component} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Styles from '../style/AddressStyle';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Header from './common/Header';
import Back from './common/Back';
import Footer from './common/Footer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import CheckboxList from 'rn-checkbox-list';
import CheckBox from '@react-native-community/checkbox';
import * as colors from '../style/Common/ColorsStyle';
const search = require('../assets/search-green.png');

const filter = require('../assets/barcode.png');
const grid = require('../assets/gridView.png');
const list = require('../assets/listView.png');
const arrow = require('../assets/left-arrow.png');
const add = require('../assets/add-alt.png');

const data = [{id: 1, name: 'Same as Shipping Address'}];
const data2 = [
  {id: 1, name: '1'},
  {id: 2, name: '2'},
];
const data3 = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'David Blackburn',
    subtitle:'136 Merthyr Road, BUN ABHAINN EADARRA, HS3 2DH, United Kingdom',
    mobile:'+971-123 456 789',
  },
  {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'David Blackburn',
      subtitle:'136 Methyr Road, BUN ABHAINN EADARRA, HS3 2DH, United Kingdom.',
      mobile:'+971-123 456 789',
    },
]
class AddressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCheckBox: false,
      item: null,
      isSelected: false,
      radioprops: [
        {label: 'Card Payment', value: 0},
        {label: 'On Account', value: 1},
      ],
    };
  }

  renderRow = ({item}) => {

    return (
      <View style={{width: wp('95'), marginLeft: wp('-2'),marginTop:hp('3')}}>
        <View style={Styles.cart}>
        <View style={Styles.cartView}>
              <View style={Styles.addressBtnView}>
                <Text style={Styles.addreesName}> {item.title}</Text>
                <View style={Styles.selectBtn}>
                  <CheckboxList
                    // headerName="Movies"
                    theme={colors.primaryColor}
                    listItems={data2}
                    // onChange={({ids, items}) =>
                    //   console.log('My updated list :: ', ids)
                    // }
                    listItemStyle={{
                      borderBottomColor: '#707070',
                      borderBottomWidth: 1,
                    }}
                    // listItemsStyles={Styles.labelTxt}
                    checkboxProp={{boxType: 'circle'}} // iOS (supported from v0.3.0)
                    onLoading={() => <LoaderComponent />}
                  />
                </View>
              </View>
              <Text style={Styles.addreestxt}>
              {item.subtitle}
              </Text>
              <Text style={Styles.addreesNumber}>
              {item.mobile}</Text>
            </View>
        </View>

    </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={Styles.container}>

          <Back />
          <View style={Styles.titleView}>
            <Text style={Styles.titleTxt} allowFontScaling={false}>
              Address
            </Text>
            <TouchableOpacity activeOpacity={0.9}
              style={Styles.AddressBtn}
              // onPress={() => {
              //   this.props.navigation.navigate(();
              // }}
            >
              <Image source={add} style={Styles.addIcon} />
              <Text style={Styles.addText}>Add New Address</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.topicView}>
            <Text style={Styles.topicTxt}>Shipping Address</Text>
          </View>
          <View style={Styles.addressCardScreen}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={Styles.flatlist}
            data={data3}
            renderItem={this.renderRow}
            keyExtractor={item => item.id}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
          />
          </View>
          {/* <View style={Styles.cart}>
            <View style={Styles.cartView}>
              <View style={Styles.addressBtnView}>
                <Text style={Styles.addreesName}>David Blackburn</Text>
                <View style={Styles.selectBtn}>
                  <CheckboxList
                    // headerName="Movies"
                    theme={colors.primaryColor}
                    listItems={data2}
                    onChange={({ids, items}) =>
                      console.log('My updated list :: ', ids)
                    }
                    listItemStyle={{
                      borderBottomColor: '#707070',
                      borderBottomWidth: 1,
                    }}
                    // listItemsStyles={Styles.labelTxt}
                    checkboxProp={{boxType: 'circle'}} // iOS (supported from v0.3.0)
                    onLoading={() => <LoaderComponent />}
                  />
                </View>
              </View>
              <Text style={Styles.addreestxt}>
                136 Merthyr Road, BUN ABHAINN EADARRA, HS3 2DH, United Kingdom
              </Text>
              <Text style={Styles.addreesNumber}>+971 - 123 456 789</Text>
            </View>
          </View> */}
          <View style={Styles.topicView}>
            <Text style={Styles.topicTxt}>Billing Address</Text>
          </View>
          <View style={Styles.checkboxView}>
            {/* <CheckBox
               value={this.state.isSelected}
               onValueChange={setSelection}
              style={Styles.checkbox}
            /> */}
            {/* <CheckBox
                disabled={false}
                value={this.state.toggleCheckBox}
                 onValueChange={(newValue) => setToggleCheckBox(newValue)}
                checkboxProp={{boxType: 'square'}}
             /> */}
            <CheckboxList
              // headerName="Movies"
              theme={colors.primaryColor}
              listItems={data}
              // onChange={({ids, items}) =>
              //   console.log('My updated list :: ', ids)
              // }
              listItemStyle={{
                borderBottomColor: '#707070',
                borderBottomWidth: 1,
              }}
              checkboxProp={{boxType: 'square'}} // iOS (supported from v0.3.0)
              onLoading={() => <LoaderComponent />}
            />

            {/* <Text style={Styles.labelTxt}>Same as Shipping Address</Text> */}
          </View>

          <View style={Styles.topicView}>
            <Text style={Styles.topicTxt}>Delivery & Payment Options</Text>
          </View>
          <View style={Styles.topicView}>
            <Text style={Styles.topicTxt}>Delivery Options</Text>
          </View>
          <View style={Styles.cart2}>
            <DropDownPicker
              items={[
                {label: 'Item 1', value: 'item1'},
                {label: 'Item 2', value: 'item2'},
              ]}
              defaultIndex={0}
              containerStyle={{height: 40}}
              placeholder="FEDEX - Next day delivery (UK) (£0.00)"
              // onChangeItem={(item) => console.log(item.label, item.value)}
            />
          </View>
          <View style={Styles.radioView}>
            <RadioForm
              radio_props={this.state.radioprops}
              buttonColor={'#1ED18C'}
              selectedButtonColor={'#1ED18C'}
              initial={0}
              formHorizontal={true}
              labelHorizontal={true}
              labelStyle={Styles.radioText}
              onPress={(value) => {
                this.setState({value: value});
              }}
            />
          </View>

          <View style={Styles.cart3}>
            <Text style={Styles.noticeTxt}>
              Account On Stop (Please save the cart and contact customer
              services)
            </Text>
          </View>
          <View style={Styles.buttonView}>
            <TouchableOpacity activeOpacity={0.9}
              style={Styles.Btn1}
              // onPress={() => {
              //   this.props.navigation.navigate(();
              // }}
            >
              <Text style={Styles.BtnTxt}>BACK TO CART</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9}
              style={Styles.Btn2}
              // onPress={() => {
              //   this.props.navigation.navigate(();
              // }}
            >
              <Text style={Styles.BtnTxt2}>PROCEED</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(AddressScreen);

