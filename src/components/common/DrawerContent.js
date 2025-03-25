import React, { Component } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SlideInView from "./SlideInView";
import { Actions } from "react-native-router-flux";
import Styles from "../../style/DrawerContentStyle";
import { connect, useSelector } from "react-redux";
import { ExpandableListView } from "react-native-expandable-listview";
import Resource from "../../utils/resources";
import {
  getsubCategories,
  getSelectedTileTxt,
  // getFilters,
  // getFilterData,
  getsubCategoriesDrawer,
  userLogOut,
} from "../../actions/HomeScreenAction";
import { getData } from "../../actions/LoginScreenAction";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { UpdateProfileDetails } from "../../actions/MyProfileAction";
import CatalogeView from "./CatalogeView";
import TokenDiff from '../helperComponents/TokenDiff';


let that;
const users = require("../../assets/user.jpg");
const home = require("../../assets/home.png");
const user = require("../../assets/account.png");
const quick = require("../../assets/quick.png");
const cart = require("../../assets/cart.png");
const dot = require("../../assets/plant.png");
const arrow = require("../../assets/plus2x.png");
const scissor = require("../../assets/scissors.png");

const logOut = require("../../assets/log-out-outline2x.png");
const profile = require("../../assets/user2x.png");

const { ids, styles } = Styles;

// const data = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'Artichoke Green Globe',
//   },
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'Artichoke Green Globe1',
//   },
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'Artichoke Green Globe2',
//   },
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'Artichoke Green Globe3',
//   },
// ];
class DrawerContent extends Component {

  handleItemClick({ index }) {
    console.log(index);
  }

  loadProductItem(type) {
    this.props.getProduct(this.props.loginToken, type);
  }

  handleInnerItemClick({ innerIndex, item, itemIndex }) {
    console.log(innerIndex);
  }

  loadUserDeatails({ fnameinfo, lnameinfo }) {
    this.props.UpdateProfileDetails(
      this.props.loginToken,
      fnameinfo,
      lnameinfo
    );
    console.log(fnameinfo);
  }

  constructor(props) {
    super(props);

    this.state = {
      options: "Morning",
      content: true,
      showSowView: false,
      expiresIn: ''
    };
  }

  renderRow = ({ item }) => {
    return <CatalogeView item={item} />;
  };
  // renderRow2 = ({item}) => {
  //   return (
  //     <TouchableOpacity activeOpacity={0.9}
  //       onPress={() => {
  //         this.props.getSelectedTileTxt(item.name);
  //         // this.getItemData(item.nodeAliasPath);
  //         this.props.getFilterData(this.props.loginToken, item.nodeAliasPath);
  //       }}
  //       style={styles.subBoxBody}>
  //       <Text style={styles.txtBody} allowFontScaling={false}>
  //         {item.name}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };

  async componentDidMount() {
    this.setState({ expiresIn: TokenDiff(this.props.expireDate) });
  }

  render() {
    that = this;
    console.log(this.props.expireDate);

    let showtime = this.props.expireDate.substring(0, 10);

    return (
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <ScrollView
            style={StyleSheet.absoluteFill}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container1}>
              {/* <View style={styles.profileImage}>
                <Image
                  source={users}
                  style={{ width: wp('8'), height: hp('8'), borderRadius: 40 }}
                />
              </View> */}
              <View style={styles.nameView}>
                <Text style={styles.Title} allowFontScaling={false}>
                  {this.props.fullName}
                </Text>
                <Text style={styles.Title2} allowFontScaling={false}>
                  {this.props.userRole}
                </Text>
                {/*<View style={styles.line} />*/}
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => {
                this.props.navigation.navigate('home');
              }}
              style={styles.buttonHome}
            >
              <Image source={home} style={styles.homeIcon} />
              <Text style={styles.HomeTxt} allowFontScaling={false}>
                Home
              </Text>
            </TouchableOpacity>
            <View style={styles.subTopicBox}>
              <ScrollView style={{height:hp('66'),}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={styles.flatlist}
                  data={this.props.drawerCategoryItem}
                  //data={data}
                  renderItem={this.renderRow}
                  keyExtractor={(item, index) => index.toString()}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={0}
                />
              </ScrollView>

            </View>

            {/* <TouchableOpacity activeOpacity={0.9}
            style={styles.TxtView}
            onPress={() => {
              userLogOut();
            }}>
            <Image
              source={logOut}
              style={{width: 18, height: 18, marginLeft: '5%'}}
            />
            <Text style={styles.TitleTxt} allowFontScaling={false}>
              Log Out
            </Text>
          </TouchableOpacity> */}
            {/* <View style={styles.button}>
              <Text style={styles.btnTxt} allowFontScaling={false}>
                SYNC
              </Text>
            </View> */}
            {/* <View style={styles.tokenBox}>
              <View style={styles.tokenBoxName}>
                <Text style={styles.tokenTxt} allowFontScaling={false}>
                  Token expires on
                </Text>
              </View>
              <View>
                <View style={styles.tokenBoxDate}>
                  <Text style={styles.tokenTxt2} allowFontScaling={false}> */}
                    {/* {this.props.expireDate} */}
                    {/* {showtime} */}
                    {/* 2021-12-21 */}
                    {/* {datetimeArr[0] + "-" + datetimeArr[1] + "-"  + date} */}
                    {/* {this.props.expireDate.replace('T', ' ').split(/[\s:]/)} */}
                    {/* {this.props.expireDate.toISOString().slice(0, 10)} */}
                  {/* </Text>
                </View>
              </View>
            </View> */}
          </ScrollView>

          <View style={styles.endBox}>
          <View
              style={{
                backgroundColor: "white",
                height: hp("5.5"),
                flexDirection: "row",
                alignItems: "center",
                borderTopWidth:1,
                borderTopColor:'#BEFFF5',
              }}
            >
            <Text style={styles.tokenTxt} allowFontScaling={false}>
                  Token expires on:
                </Text>
                <Text style={styles.tokenTxt2} allowFontScaling={false}>
                    {/* {this.props.expireDate} */}
                    {`${showtime} (${this.state.expiresIn} h)`}

                    {/* {datetimeArr[0] + "-" + datetimeArr[1] + "-"  + date} */}
                    {/* {this.props.expireDate.replace('T', ' ').split(/[\s:]/)} */}
                    {/* {this.props.expireDate.toISOString().slice(0, 10)} */}
                  </Text>
            </View>
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => {
                this.props.navigation.navigate('myProfile');
                // this.userLogOut();
              }}
              style={styles.endBox1}
            >
              <View style={styles.rowEndBox}>
                <View style={styles.iconBox2}>
                  <Image source={profile} style={styles.iconImg3} />
                </View>
                <View style={styles.iconBox3}>
                  <Text style={styles.profileTxt} allowFontScaling={false}>
                    My Profile
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.lineMarg}></View>
            <View style={styles.endBox2}>
              <TouchableOpacity activeOpacity={0.9}
                onPress={() => {
                  userLogOut();
                }}
                style={styles.rowEndBox}
              >
                <View style={styles.iconBox2}>
                  <Image source={logOut} style={styles.iconImg4} />
                </View>
                <View style={styles.iconBox3}>
                  <Text style={styles.logOutTxt} allowFontScaling={false}>
                    Log Out
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.endBox3}>
              <View style={styles.rowEndBoxend}>
                <View style={styles.versionBox1}>
                  <Text style={styles.versionTxt} allowFontScaling={false}>
                    Version: <Text style={styles.versionTxt1}>1.0</Text>
                  </Text>
                </View>
                <TouchableOpacity activeOpacity={0.9}
                  style={styles.versionBox2}
                  onPress={() => {

                  }}
                >
                  <Text style={styles.privecyTxt} allowFontScaling={false}>
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    expireDate: state.login.expiryDate,
    fullName: state.login.fullName,
    userRole: state.login.userRole,
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    drawerCategoryItem: state.home.drawerCategoryItem,
    subcategoryItem: state.home.subcategoryItem,
    drawerSubcategoryItem: state.home.drawerSubcategoryItem,
    titleName: state.home.titleName,
  };
};
export default connect(mapStateToProps, {
  getsubCategories,
  getSelectedTileTxt,
  // getFilters,
  // getFilterData,
  getsubCategoriesDrawer,
  UpdateProfileDetails,
  getData,
})(DrawerContent);

const SelectedBar = () => <View style={styles.selectedBar} />;
