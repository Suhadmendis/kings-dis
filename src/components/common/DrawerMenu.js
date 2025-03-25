import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useIsDrawerOpen,
} from "@react-navigation/drawer";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  Animated,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect, useDispatch, useSelector } from "react-redux";
import { logOut } from "../../actions/AuthActions";
import Styles from "../../style/DrawerContentStyle";
import { getSubcategories } from "../../actions/ProductCategoryAction";
import deviceInfoModule from "react-native-device-info";
// import {
//   getsubCategories,
//   getSelectedTileTxt,
//   getFilters,
//   getFilterData,
//   getsubCategoriesDrawer,
//   getDrawerCategories,
// } from "../../actions/HomeScreenAction";
import { UpdateProfileDetails } from "../../actions/MyProfileAction";
import { getData } from "../../actions/LoginScreenAction";
import ConfirmationBox from "./ConfirmationBox";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  getHomeScreen,
  isOffline,
  offlineToOnline,
  onlineToOffline,
  onlineTooffline,
} from "./OfflineToggle";

import CatalogeView from "./CatalogeView";
import { useNavigation } from "@react-navigation/core";
import { useIsFocused } from "@react-navigation/native";
import envMode from "../../config/basic.json";
import { Switch } from "react-native";
import { showMessage } from "react-native-flash-message";

const users = require("../../assets/user.jpg");
const home = require("../../assets/home.png");
const user = require("../../assets/account.png");
const quick = require("../../assets/quick.png");
const cart = require("../../assets/cart.png");
const dot = require("../../assets/plant2x.png");

const che = require("../../assets/chevronright2x.png");
const cheBack = require("../../assets/chevronback2x.png");

const logOutimage = require("../../assets/logout2.png");
const profile = require("../../assets/user2.png");

const homeInactiveIcon = require("../../assets/home-black.png");
const fetherActiveIcon = require("../../assets/plant-green.png");
const fetherInactiveIcon = require("../../assets/plant.png");

const plus = require("../../assets/plus.png");
const minus = require("../../assets/minus.png");

const { ids, styles } = Styles;

const homeImageStyle = { marginLeft: 15, width: 15 };
const fetherImageStyle = { marginLeft: 16, width: 11 };

// const DrawerMenuItem = () => {
//     return (
//                 <View style={{ flexDirection: 'row', padding: 10, paddingLeft: 20, paddingRight: 20 }}>
//                     <View style={{ flex: 1}}>
//                         <Image source={homeActiveIcon} resizeMode={'contain'} style={homeImageStyle} />
//                     </View>

//                     <Text style={{ flex: 3, fontSize: 13, marginTop: -2 }}>Sample</Text>
//                     <View style={{ flex: 1, padding: 2, flexDirection: 'row'}}>
//                         <TouchableOpacity activeOpacity={0.9} onPress={() => {
//                             alert('Sample');
//                         }}>
//                             <Image style={{ marginLeft: 30 }} source={plus} resizeMode={'contain'} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//     )
// }

const renderRow = ({ item }) => {
  return <CatalogeView item={item} />;
};

const DrawerMenu = (props) => {
  let showtime = props.expireDate.substring(0, 10);

  const [viewtype, setViewtype] = useState(1);
  const [catList, setcatList] = useState([]);
  const [aliasName, setaliasName] = useState("");
  const [showdialog, setShowdialog] = useState(false);
  const [disbtn, setDisbtn] = useState(false);

  const [toggleStatus, setToggleStatus] = useState(false);
  const [hideToggle, setHideToggle] = useState(false);
  const [deviceConnection, setDeviceConnection] = useState(true);

  const [toggleOffline, setToggleOffline] = useState(false);

  const [localConnectionStatus, setLocalConnectionStatus] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(new Animated.Value(-100));
  const [toVal, setToValue] = useState(1);

  const { connectionStatus } = useSelector((s) => s.loading);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isOpen = useIsDrawerOpen();

  useEffect(() => {
    console.log("use effect");
    setViewtype(2);
    setToValue(1);
    loaddata(2);
    // loaddata(2, 'commercial');

    // changeCategories('commercial', 'Commercial')
  }, [isFocused]);

  useEffect(() => {
    if (isOpen) {
      getHomeScreen().then((homeScreen) => {
        console.log("Home screen = " + homeScreen);
        setHideToggle(homeScreen);
      });

      NetInfo.fetch().then((state) => {
        setLocalConnectionStatus(state.isConnected);

        if (!state.isConnected) {
          const toOffline = onlineToOffline();
          setToggleOffline(true);
        } else {
          isOffline().then((offline) => {
            setToggleOffline(offline);
          });
        }
      });
    }
  }, [isOpen,connectionStatus]);

  const dataRetrival = (intervalID) => {
    clearInterval(intervalID);
  };

  const loaddata = (v_, alias = "", name = "", back = false) => {
    let catName_ = "";
    console.log("================================");
    console.log(v_);
    console.log(aliasName);
    console.log(alias.substring(0, alias.indexOf("/")));
    if (v_ == 1) {
      catName_ = "";
      alias = "commercial";
      // loaddata(2, 'commercial');
    }
    if (v_ == 2) {
      // alias.split('/')[0]
      if (back == true) {
        alias = aliasName;
        alias = alias.substring(0, alias.indexOf("/"));
      }
      //let el_down = "String = "+s;
      // console.log(alias);
      catName_ = alias.trim();
    }
    if (v_ == 3) {
      catName_ = alias.trim();
    }
    if (v_ == 4) {
      catName_ = alias.trim();
      navigation.navigate("productSubFilterCategory", {
        categoryName: name,
        subcatNodeAliasPath: alias.trim(),
      });
      setViewtype(2);
      loaddata(2);
      setDisbtn(false);
    }

    if (v_ !== 4) {
      // console.log('alias: '+catName_ + " n: " + name );
      getSubcategories(catName_, v_, false)
        .then((data) => {
          setcatList(data);
          setDisbtn(false);
        })
        .catch((error) => {
          setDisbtn(false);
        });
    }
  };

  const changeCategories = (alias, name) => {
    console.log("------------------------------");
    let v_ = viewtype;

    setaliasName(alias);
    setDisbtn(true);
    if (v_ < 4) {
      v_ = v_ + 1;
    }
    setToValue(0);
    setViewtype(v_);

    console.log("==========dd======================");
    console.log({ v_, alias, name });
    loaddata(v_, alias, name);
  };

  const renderRow2 = ({ item }) => {
    return (
      <TouchableOpacity
        disabled={disbtn}
        activeOpacity={0.9}
        onPress={() => {
          changeCategories(item.alias, item.name);
        }}
        style={styles.catItemView}
      >
        <View style={styles.iconBox}>
          <Image source={dot} style={styles.iconImg} />
        </View>
        <Text style={styles.catItemTxt} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <View style={[styles.iconBox, { position: "absolute", right: 0 }]}>
          <Image source={che} style={[styles.iconImg, { height: hp("1.8") }]} />
        </View>
      </TouchableOpacity>
    );
  };

  changeCurrentToggleSwitch = async () => {
    if (!localConnectionStatus) {
      const toOffline = await onlineToOffline();

      return true;
    } else {
      return toggleOffline;
    }
  };

  changeToggleSwitch = async () => {
    const res = await toggleSwitchCurrentStatus();

    if (toggleOffline) {
      const toOnline = await offlineToOnline();
      setToggleOffline(false);
    } else {
      const toOffline = await onlineToOffline();
      setToggleOffline(true);
    }

    dispatch({ type: "UPDATE_CONNECTION_STATUS", payload: toggleOffline });
    dispatch({ type: "UPDATE_CONNECTION_SYNC_TRIGGER", payload: "0" });
  };

  const toggleSwitchCurrentStatus = async () => {
    console.log("Toggle Switch Current Status");
    // const route = useRoute();
    // console.log(route);

    const offline = await isOffline();
    setToggleOffline(offline);

    return offline;
  };

  const logOutConfirmation = () => {
    if (deviceConnection) {
      return "Are you sure you want to log out?";
    } else {
      return "The device is offline, so logging out of the app is not permitted. Please connect to the internet to proceed with logging out";
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {/* <DrawerItemList
                    activeTintColor='#30D495'
                    inactiveTintColor='black'
                    activeBackgroundColor='#E7FFF5'
                    inactiveBackgroundColor='white'
                    style= {{ fontSize: 10 }}
                    {...props} /> */}

      <ConfirmationBox
        showHide={showdialog}
        yes={() => {
         if (deviceConnection) {
          props.logOut(props);
          setShowdialog(false);
         }else{
          showMessage({
            message: "KINGS SEEDS",
            description: "Please check the Network Connection",
            type: "warning",
            autoHide: true,
          });
         }
        }}
        no={() => {
          setShowdialog(false);
        }}
        contentText={logOutConfirmation()}
      />

      <DrawerContentScrollView {...props}>
        <View style={{ marginBottom: 30 }}>
          <View style={styles.nameView}>
            <View>
              <Text style={styles.Title}>{props.fullName}</Text>
              <Text style={styles.Title2} allowFontScaling={false}>
                {props.userRole}
              </Text>
            </View>
            {/*<View style={styles.line} />*/}

            <View style={styles.toggleArea}>
              {hideToggle ? (
                <View style={styles.toggleView}>
                  <Text style={styles.preTxt}>
                     {connectionStatus && localConnectionStatus ? "Online : " : "Offline : "}
                     </Text>
                  <Switch
                    disabled={!localConnectionStatus}
                    trackColor={{ false: "#d4d4d4", true: "#ff3e30" }}
                    ios_backgroundColor="#3e3e3e"
                    style={[
                      Platform.OS === "ios" ? styles.iosDiscountSwitch : null,
                      { marginLeft: "5%" },
                    ]}
                    onValueChange={() => {
                      changeToggleSwitch();
                    }}
                    value={toggleOffline}
                  ></Switch>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            let vt = 0;
            if (viewtype > 2) {
              vt = viewtype;
              vt = vt - 1;
              setViewtype(vt);
              loaddata(vt, "", "", true);
            } else {
              setViewtype(2);
              loaddata(2);
              navigation.navigate("home", { screen: "home", time: Date.now() });
            }
          }}
          style={[
            styles.buttonHome,
            viewtype != 2 ? { backgroundColor: "white" } : null,
          ]}
        >
          {viewtype <= 2 ? (
            <Image source={home} style={styles.homeIcon} />
          ) : (
            <Image
              source={cheBack}
              style={[
                styles.homeIcon,
                { height: hp("2"), marginTop: hp("1.5") },
              ]}
            />
          )}
          <Text style={styles.HomeTxt} allowFontScaling={false}>
            {viewtype <= 2 ? "Home" : "Back"}
          </Text>
        </TouchableOpacity>

        <View
          style={[
            {
              width: "100%",
              height: hp("0"),
              backgroundColor: "white",
              alignSelf: "center",
              borderTopWidth: 1,
              borderTopColor: "#F1F1F1",
            },
            viewtype == 1 ? { display: "none" } : null,
          ]}
        ></View>

        <View style={[styles.subTopicBox]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={styles.flatlist}
              data={catList}
              //data={data}
              renderItem={renderRow2}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
            />
          </ScrollView>
        </View>

        {/* <DrawerMenuItem /> */}

        {/* <DrawerItem
                    activeTintColor='#30D495'
                    inactiveTintColor='black'
                    activeBackgroundColor='#E7FFF5'
                    inactiveBackgroundColor='white'

                    label="Home"
                    onPress={() => {
                        alert('Press');
                    }}
                    icon={() => {
                        return <Image source={homeActiveIcon} resizeMode={'contain'} style={homeImageStyle} />
                    } }

                /> */}

        {/*
                <DrawerItem
                    activeTintColor='#30D495'
                    inactiveTintColor='black'
                    activeBackgroundColor='#E7FFF5'
                    inactiveBackgroundColor='white'

                    label="Sample"
                    onPress={() => {
                        alert('Press');
                    }}
                    labelStyle={{fontSize: 12, color: 'red'}}
                    style={{marginLeft: 70}}
                /> */}

        {/* integrated integrated integrated integrated integrated integrated integrated integrated integrated  */}
      </DrawerContentScrollView>
      <View style={styles.endBox}>
        <View
          style={{
            backgroundColor: "white",
            height: hp("5.5"),
            flexDirection: "row",
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: "#BEFFF5",
          }}
        >
          <Text style={styles.tokenTxt} allowFontScaling={false}>
            Token expires on:
          </Text>
          <Text style={styles.tokenTxt2} allowFontScaling={false}>
            {/* {this.props.expireDate} */}
            {`${moment(showtime).format("DD-MM-YYYY")}`}

            {/* {datetimeArr[0] + "-" + datetimeArr[1] + "-"  + date} */}
            {/* {this.props.expireDate.replace('T', ' ').split(/[\s:]/)} */}
            {/* {this.props.expireDate.toISOString().slice(0, 10)} */}
          </Text>

          <TouchableOpacity
            activeOpacity={envMode.APIMode == "dev" ? 0.9 : 1}
            onPress={() => {
              if (envMode.APIMode == "dev") {
                let count = tapCount + 1;
                setTapCount(count);
                if (tapCount == 4) {
                  setTapCount(0);
                  navigation.navigate("systemViewer");
                }
              }
            }}
            style={styles.envBox}
          >
            <Text style={styles.envText}>{envMode.APIMode}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate("home", { screen: "myProfile" });
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
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {

            if (envMode.APIMode == "dev") {
              if (deviceConnection) {

                navigation.navigate('home', {screen: 'reportScreen'});

              }else{
                showMessage({
                  message: "KINGS SEEDS",
                  description: "Please check the Network Connection",
                  type: "warning",
                  autoHide: true,
                });
              }
            }else{
              showMessage({
                message: "KINGS SEEDS",
                description: "This feature is not available",
                type: "warning",
                autoHide: true,
              });
              return;
            }



          }}
          style={styles.endBox1}
        >
          <View style={styles.rowEndBox}>
            <View style={styles.iconBox2}>
              <Image source={profile} style={styles.iconImg3} />
            </View>
            <View style={styles.iconBox3}>
              <Text style={styles.profileTxt} allowFontScaling={false}>
                Reports
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.lineMarg}></View>
        <View style={styles.endBox2}>
          {/* <DrawerItem
                    label="Log out"
                    onPress={() => {
                        console.log('logging out..')
                        props.logOut(props)
                    }}
                /> */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                  setDeviceConnection(true);
                } else {
                  setDeviceConnection(false);
                }

                setShowdialog(true);
              });

              // console.log('logging out..');
              // props.logOut(props);
            }}
            style={styles.rowEndBox}
          >
            <View style={styles.iconBox2}>
              <Image source={logOutimage} style={styles.iconImg4} />
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
                Version:{" "}
                <Text style={styles.versionTxt1}>
                  {deviceInfoModule.getVersion()}{" "}
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.versionBox2}
              onPress={() => {
                navigation.navigate("home", { screen: "privacyPolicy" });
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
  );
};

const mapStateToProps = (state) => {
  return {
    expireDate: state.login.expiryDate,
    fullName: state.login.fullName,
    userRole: state.login.userRole,
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    drawerCategoryItem: state.home.drawerCategoryItem,
    subcategoryItem: state.home.subcategoryItem,
    drawersubcategoryItem: state.home.drawersubcategoryItem,
    titleName: state.home.titleName,
  };
};
export default connect(mapStateToProps, {
  // getDrawerCategories,
  logOut,
  // getsubCategories,
  //getSelectedTileTxt,
  // getFilters,
  // getFilterData,
  // getsubCategoriesDrawer,
  UpdateProfileDetails,
  getData,
})(DrawerMenu);
