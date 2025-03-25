// import React, { Component, } from 'react';
// import { View, Image,Modal, TouchableOpacity, Text,stylesheet,Pressable,Alert} from 'react-native';
// import styles from '../../style/HeaderStyle';
// import { Actions } from 'react-native-router-flux';
// import { connect } from 'react-redux';
// import {
//   getDrawerCategories
// } from '../../actions/HomeScreenAction';

// const menu = require('../../assets/menu.png');
// const cart = require('../../assets/shopping-cart.png');
// const logo = require('../../assets/logo.png');
// const down = require('../../assets/arrowDown.png');
// const leftIcon1 = require('../../assets/store_cartplus.png');
// const leftIcon2 = require('../../assets/store_contact.png');
// const leftIcon3 = require('../../assets/store_graph.png');
// const leftIcon4 = require('../../assets/store_map.png');
// const leftIcon5 = require('../../assets/store_cartcheck.png');
// const rightIcon1 = require('../../assets/store_cart.png');
// const rightIcon2 = require('../../assets/store_notebook.png');
// const rightIcon3 = require('../../assets/store_creditcard.png');
// const rightIcon4 = require('../../assets/store_image.png');
// const rightIcon5 = require('../../assets/store_noteline.png');

// class Header extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       status: false,
//       modalVisible: false
//     };
//   }
//   // state = {
//   //   modalVisible: false
//   // };

//   setModalVisible = (visible) => {
//     this.setState({ modalVisible: visible });
//   }

//   render() {
//     const { modalVisible } = this.state;
//     return (
//       <View style={styles.headerView}>
//         <TouchableOpacity activeOpacity={0.9}
//           onPress={() => {
//            //  alert("DD");
//             this.props.navigation.dispatch(DrawerActions.openDrawer());
//             this.props.getDrawerCategories(this.props.loginToken);
//           }}
//         >
//           <Image source={menu} style={styles.drawerIcon} />

//         </TouchableOpacity >
//         <View>
//           <Image source={logo} style={styles.logoIcon} />
//         </View>

//         <TouchableOpacity activeOpacity={0.9}
//           onPress={() => {
//            //alert("DD");
//              this.setModalVisible(true);
//            }}
//          style={styles.store}>
//         <Text style={styles.storeText}>The Seeds Store</Text>
//         <Image source={down} style={styles.storeIcon} />
//         </TouchableOpacity>
//         <Modal
//         //  animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             Alert.alert("Modal has been closed.");
//             this.setModalVisible(!modalVisible);
//           }}
//           >
//           <TouchableOpacity activeOpacity={0.9}
//             activeOpacity={1}
//             onPressOut={() => this.setModalVisible(!modalVisible)}
//           >
//             <View style={styles.modelBox} >
//             <View style={styles.modalView}>
//               <View style={styles.detailView} >
//                 <Text style={styles.text1} > Monks Farm, Coggeshall Road
//                   Kelvedon, Colchester, Essex CO5 9PG </Text>
//                 <Text style={styles.text2} > info@kingsseeds.com</Text>
//                 <Text style={styles.text1} > 01376 570 000 </Text>
//                 </View>
//                 <View style={styles.buttonView} >
//                   <View style={styles.row1} >
//                   <TouchableOpacity activeOpacity={0.9} style={styles.btn1} >
//                  {/* <View style={styles.leftBtnView}> */}
//                  <Image source={leftIcon1} style={styles.leftBtnIcon} />
//                   <Text style={styles.btnText1}>New Order</Text>
//                  {/* </View> */}
//                   </TouchableOpacity>
//                   <TouchableOpacity activeOpacity={0.9} style={styles.btn2} >
//                   <Image source={leftIcon2} style={styles.leftBtnIcon} />
//                   <Text style={styles.btnText}>Contacts</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity activeOpacity={0.9} style={styles.btn2} >
//                   <Image source={leftIcon3} style={styles.leftBtnIcon} />
//                   <Text style={styles.btnText}>Report</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity activeOpacity={0.9} style={styles.btn2} >
//                   <Image source={leftIcon4} style={styles.leftBtnIcon} />
//                   <Text style={styles.btnText}>Map</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity activeOpacity={0.9} style={styles.btn2} >
//                   <Image source={leftIcon5} style={styles.leftBtnIcon} />
//                   <Text style={styles.btnText}>Saved</Text>
//                   </TouchableOpacity>
//                     </View>
//                     <View style={styles.row2} >
//                     <TouchableOpacity activeOpacity={0.9} style={styles.btn2} >
//                  <Image source={rightIcon1} style={styles.leftBtnIcon} />
//                   <Text style={styles.btnText}>Order</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity activeOpacity={0.9} style={styles.btn2} >
//                   <Image source={rightIcon2} style={styles.leftBtnIcon} />
//                   <Text style={styles.btnText}>Quotes</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity activeOpacity={0.9} style={styles.btn2} >
//                   <Image source={rightIcon3} style={styles.leftBtnIcon} />
//                   <Text style={styles.btnText}>Pay</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity activeOpacity={0.9} style={styles.btn2} >
//                   <Image source={rightIcon4} style={styles.leftBtnIcon} />
//                   <Text style={styles.btnText}>Photos</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity activeOpacity={0.9} style={styles.btn2} >
//                   <Image source={rightIcon5} style={styles.leftBtnIcon} />
//                   <Text style={styles.btnText}>Notes</Text>
//                   </TouchableOpacity>
//                     </View>
//                 </View>
//               </View>
//           </View>
//           </TouchableOpacity>
//         </Modal>

//         <TouchableOpacity activeOpacity={0.9}
//           onPress={() => {
//             this.props.navigation.navigate('carts');
//           }}>
//           <Image source={cart} style={styles.cartIcon} />
//         </TouchableOpacity>

//       </View>

//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     loginToken: state.login.loginToken,
//   };
// };

// export default connect(
//   mapStateToProps,
//   {
//     getDrawerCategories
//   },
// )(Header);
import React, { Component } from "react";
import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  Text,
  stylesheet,
  Pressable,
  Alert,
} from "react-native";
import Styles from "../../style/HeaderStyle";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { getDrawerCategories } from "../../actions/HomeScreenAction";
import { DrawerActions } from '@react-navigation/native';

const menu = require("../../assets/menu.png");
const cart = require("../../assets/shopping-cart.png");
const logo = require("../../assets/logo.png");
const down = require("../../assets/arrowDown.png");
const leftIcon1 = require("../../assets/store_cartplus.png");
const leftIcon2 = require("../../assets/store_contact.png");
const leftIcon3 = require("../../assets/store_graph.png");
const leftIcon4 = require("../../assets/store_map.png");
const leftIcon5 = require("../../assets/store_cartcheck.png");
const rightIcon1 = require("../../assets/store_cart.png");
const rightIcon2 = require("../../assets/store_notebook.png");
const rightIcon3 = require("../../assets/store_creditcard.png");
const rightIcon4 = require("../../assets/store_image.png");
const rightIcon5 = require("../../assets/store_noteline.png");
const store = require("../../assets/store.png");

const { ids, styles } = Styles;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      modalVisible: false,
    };
  }
  // state = {
  //   modalVisible: false
  // };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.headerView}>
        {/* <TouchableOpacity activeOpacity={0.9}
          style={{
            width:'10%',
            height:'90%',
            justifyContent:'center',
            backgroundColor:'red'
          }}
          onPress={() => {
            //  alert("DD");
            this.props.navigation.dispatch(DrawerActions.openDrawer());
            this.props.getDrawerCategories(this.props.loginToken);
          }}
        >
          <Image source={menu} style={styles.drawerIcon} /> 
        </TouchableOpacity>
        <View
        style={{
          width:'50%',
          height:'90%',
          justifyContent:'center',
          backgroundColor:'yellow'
        }}
        >
          <Image source={logo} style={styles.logoIcon} />
        </View> */}

        <View
          style={{
            flex: 1.2,
            height: "90%",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity activeOpacity={0.9}
            style={{
              width: "20%",
              height: "90%",
              justifyContent: "center",
            }}
            onPress={() => {
              this.props.navigation.dispatch(DrawerActions.openDrawer());
              this.props.getDrawerCategories(this.props.loginToken);
            }}
          >
            <Image source={menu} style={styles.drawerIcon} />
          </TouchableOpacity>
          <View
            style={{
              width: "60%",
              height: "90%",
              marginLeft: "1%",
              justifyContent: "center",
            }}
          >
            <Image source={logo} style={styles.logoIcon} />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            height: "90%",
            justifyContent: "space-between",
            flexDirection:'row',
            alignItems:'center',
          }}
        >
          {this.props.selItemName.length > 0 ? (
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => {
                this.setModalVisible(true);
              }}
              style={styles.store}
            >
              <Text style={styles.storeText}>
                {this.props.selItemName.length < 13
                  ? `${this.props.selItemName}`
                  : `${this.props.selItemName.substring(0, 13)}...`}
              </Text>
              
              <Image source={down} style={styles.storeIcon} />
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
          <TouchableOpacity activeOpacity={0.9}
            style={{
              width: "10%",
              height: "90%",
              justifyContent: "center",
              alignItems: "center",
              marginRight:'8%'
            }}
            onPress={() => {
              this.props.navigation.navigate('carts');
            }}
          >
            <Image source={cart} style={styles.cartIcon} />
          </TouchableOpacity>
        </View>
        <Modal
          //  animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <TouchableOpacity activeOpacity={0.9}
            activeOpacity={1}
            onPressOut={() => this.setModalVisible(!modalVisible)}
          >
            <View style={styles.modelBox}>
              <View style={styles.modalView}>
                <View style={styles.detailView}>
                  <Text style={styles.text1}> {this.props.adminAddress} </Text>
                  <Text style={styles.text2}> {this.props.cusPhone} </Text>
                  <Text style={styles.text1}> {this.props.cusEmail} </Text>
                </View>
                <View style={styles.buttonView}>
                  <View style={styles.row1}>
                    <TouchableOpacity activeOpacity={0.9}
                      style={styles.btn1}
                      onPress={() => {
                        this.props.navigation.navigate('orderPad');
                      }}
                    >
                      {/* <View style={styles.leftBtnView}> */}
                      <Image source={leftIcon1} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText1}>New Order</Text>
                      {/* </View> */}
                    </TouchableOpacity>
                    {/* <TouchableOpacity activeOpacity={0.9} style={styles.btn2} >
                      <Image source={leftIcon2} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Contacts</Text>
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity activeOpacity={0.9}
                      style={styles.btn2}
                      onPress={() => {
                        this.props.navigation.navigate('storeNew',{ tab: 1});
                      }}
                    ></TouchableOpacity> */}
                    <TouchableOpacity activeOpacity={0.9} style={styles.btn3}
                     onPress={() => {
                      this.props.navigation.navigate('storeNew',{ tab: 1});
                    }}
                    >
                      <Image source={leftIcon4} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Address</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9}
                      style={styles.btn2}
                      onPress={() => {
                        this.props.navigation.navigate('storeNew',{ tab: 3});
                      }}
                    >
                      <Image source={rightIcon2} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Quotes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9}
                      style={styles.btn2}
                      onPress={() => {
                        this.props.navigation.navigate('storeNew',{ tab: 5});
                      }}
                    >
                      <Image source={rightIcon3} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Pay</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9}
                      style={styles.btn2}
                      onPress={() => {
                        this.props.navigation.navigate('storeNew',{ tab: 7});
                      }}
                    >
                      <Image source={leftIcon3} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Report</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity activeOpacity={0.9} style={styles.btn2}
                      onPress={() => {
                        // this.props.navigation.navigate('storeAdresses');
                        this.props.navigation.navigate('store');
                      }}
                    >
                      <Image source={leftIcon4} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Map</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} style={styles.btn2} >
                      <Image source={leftIcon5} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Saved</Text>
                    </TouchableOpacity> */}
                  </View>
                  <View style={styles.row2}>
                    <TouchableOpacity activeOpacity={0.9}
                      style={styles.btn3}
                      onPress={() => {
                        this.props.navigation.navigate('storeNew',{ tab: 0});
                      }}
                    >
                      <Image source={store} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Store</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9}
                      style={styles.btn2}
                      onPress={() => {
                        this.props.navigation.navigate('storeNew',{ tab: 2});
                      }}
                    >
                      <Image source={rightIcon2} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9}
                      style={styles.btn2}
                      onPress={() => {
                        this.props.navigation.navigate('storeNew',{ tab: 4});
                      }}
                    >
                      <Image source={rightIcon1} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Carts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9}
                      style={styles.btn2}
                      onPress={() => {
                        this.props.navigation.navigate('storeNew',{ tab: 6});
                      }}
                    >
                      <Image source={leftIcon2} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Contacts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9}
                      style={styles.btn2}
                      onPress={() => {
                        this.props.navigation.navigate('storeNew',{ tab: 8});
                      }}
                    >
                      <Image source={rightIcon4} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Photos</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity activeOpacity={0.9} style={styles.btn2}
                      onPress={() => {
                        this.props.navigation.navigate('contactNotes');
                      }}
                    >
                      <Image source={rightIcon5} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Stors</Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>      
        {/* {this.props.selItemName.length > 0 ? (
          <TouchableOpacity activeOpacity={0.9}
          
            onPress={() => {
            
              this.setModalVisible(true);
            }}
            style={styles.store}
          >
           
            <Text style={styles.storeText}>
              {this.props.selItemName.length < 13
                ? `${this.props.selItemName}`
                : `${this.props.selItemName.substring(0, 13)}...`}
            </Text>
            <Image source={down} style={styles.storeIcon} />
          </TouchableOpacity>
        ) : (
          <View></View>
        )} */}

        {/* modal view */}

        {/* <TouchableOpacity activeOpacity={0.9}
        style={{
          width:'10%',
          height:'90%',
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'yellow'
        }}
          onPress={() => {
            this.props.navigation.navigate('carts');
          }}
        >
          <Image source={cart} style={styles.cartIcon} />
        </TouchableOpacity> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    adminCustomerID: state.findStore.adminCustomerID,
    selItemName: state.findStore.selItemName,
    cusPhone: state.findStore.cusPhone,
    adminAddress: state.findStore.adminAddress,
    cusEmail: state.findStore.cusEmail,
  };
};

export default connect(mapStateToProps, {
  getDrawerCategories,
})(Header);
