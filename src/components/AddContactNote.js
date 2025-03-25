import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Styles from "../style/ContactsNotesStyle";
import { connect } from "react-redux";
import { getCategories, getProduct } from "../actions/HomeScreenAction";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {AddStoreComments} from '../actions/StoreCommentsAction';
import { useNetInfo } from '@react-native-community/netinfo';
import DataAdapter from "../offline/localData/DataAdapter";
import {addStoreComments} from '../url/API';
import * as colors from '../style/Common/ColorsStyle';


const { ids, styles } = Styles;

async function addContactNote(arr,internet){

  if(internet){
    //API
    var res = await addStoreComments(arr);

    let obj ={
      ...res.storeComment,
      readyToSync: 0
    }

    if(res.error == ''){
      //Local
      const payload = {
        section: 'LOCAL STORE COMMENTS',
        opration: 'ADD',
        data: obj
      }

      const newpro = await DataAdapter(payload);
      if(newpro != 1){
        return 'Error Occured! Please try again';
      }

      return newpro;

    }else{
      return res.error;
    }



  }else{
    //Local
    let newobj = {
      itemCreatedBy:'',
      itemCreatedWhen:arr.Date,
      itemModifiedBy:'',
      itemModifiedWhen:arr.Date,
      itemOrder:'',
      itemGUID:'',
      itemTitle:arr.NoteTitle,
      itemComment:arr.Note,
      tradeAccID:arr.itemCode,
      readyToSync: 1
    }
    const payload = {
      section: 'LOCAL STORE COMMENTS',
      opration: 'ADD',
      data: newobj
    }

    const newpro = await DataAdapter(payload);
    if(newpro!= 1){
      return 'Error Occured! Please try again';
    }else{
      return newpro;
    }

  }


}

// async function addContactNoteAPI(arr){
//   console.log('====================================');
//   console.log(arr);
//   console.log('====================================');
//   const payload = {
//     section: 'LOCAL CONTACT NOTES',
//     opration: 'SAVE API',
//     data: arr
//   }

//   const newpro = await DataAdapter(payload);
//   return newpro;
// }


const SetNetInfo = ({ setNetInfo }) => {
  const netInfo = useNetInfo()

  React.useEffect(() => {
      setNetInfo(netInfo)
  },[netInfo])

  return null
}

class AddContactNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      title:'',
      message:'',
      netInfo: undefined
    };
  }
  setTitle(txt){
    this.setState({
      title:txt
    })
  }
  setMessage(txt){
    this.setState({
      message:txt
    })
  }

  setNetInfo = netInfo => {
    this.setState({netInfo})
  }

  async addNewNote() {
    let id_ = this.props.itemCode;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var strDate_ = date.toString().length;

    var date_=date;
    if(strDate_==1){
      date_ = "0"+date;
    }
    if(month<9){
      month = '0'+month;
    }

    let cur_date = year +'-' + month + '-' + date_ +'T00.00.00';//format: dd-mm-yyyyT00.00.00;


    let arr = {
      NoteTitle:this.state.title,
      Note:this.state.message,
      Date:cur_date,
      Cusid:id_,
      itemCode: this.props.itemCode,
      isDeleted: false
    }

    // addContactNoteAPI(arr).then(res => {
    //   console.log(res);
    //   showMessage({
    //     message: 'KINGS SEEDS',
    //     description: 'New note added successfully',
    //     type: 'success',
    //     autoHide: true,
    //   });
    //   // Actions.reset("storeNew", { tab: 0 });
    //   // this.props.navigation.navigate('storeNew', { tab: 0 ,subTabVal:""});
    // });

    // return;


   // addContactNote(arr).then(res => {

     // showMessage({
     //   message: 'KINGS SEEDS',
   //     description: 'New note added successfully',
 //       type: 'success',
      //  autoHide: true,
    //  });
  //    // Actions.reset("storeNew", { tab: 0 });
//      this.props.navigation.navigate('storeNew', { tab: 0 ,subTabVal:""});

    let isConnected = this.state.netInfo.isConnected;

    addContactNote(arr, isConnected).then(res => {
      console.log(res);

      if(res == 1){
        showMessage({
          message: 'KINGS SEEDS',
          description: 'New note added successfully',
          type: 'success',
          autoHide: true,
        });
        // Actions.reset("storeNew", { tab: 0 });
        this.props.navigation.navigate('storeNew', { tab: 0 ,subTabVal:""});
      }else{
        showMessage({
          message: 'KINGS SEEDS',
          description: res,
          type: 'warning',
          autoHide: true,
        });
      }


    });

  }

  render() {
    return (
      <KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
        <SetNetInfo setNetInfo={this.setNetInfo} />
        <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
          {/* <View style={sty.titleView}>
            <View style={styles.contactTitle}>
              <Text style={styles.titleTxt} allowFontScaling={false}>
                Add New Note
              </Text>
            </View>
          </View> */}
          <View style={{ width: "100%", height: hp(81) }}>
          {/* <KeyboardAccessoryNavigation
              avoidKeyboard
              androidAdjustResize
            /> */}
            <View style={sty.cardView}>
              <View style={sty.textView}>
                <Text style={sty.itemTxt} allowFontScaling={false}>
                  Title:
                </Text>
              </View>
              <View style={sty.txtInputView}>
                <TextInput
                  allowFontScaling={false}
                  style={sty.TxtInput}
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  onChangeText={(text) => this.setTitle(text)}
                ></TextInput>
              </View>
              <View style={sty.textView}>
                <Text style={sty.itemTxt} allowFontScaling={false}>
                  Message:
                </Text>
              </View>
              <View style={sty.postaltxtInputView}>
                <TextInput
                  allowFontScaling={false}
                  style={sty.postalTxtInput}
                  placeholderTextColor="gray"
                  keyboardType="default"
                  returnKeyType="none"
                  multiline={true}
                  blurOnSubmit={true}
                  onChangeText={(text) => this.setMessage(text)}
                ></TextInput>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: hp("4"),
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity activeOpacity={0.9} style={sty.backtoBtn}
              onPress={() =>{
                this.props.navigation.navigate('storeNew', { tab: 0 ,subTabVal:""});
              } }
              >
                <Text style={sty.bakctobtnTxt} allowFontScaling={false} >
                  BACK TO NOTES
                </Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} style={sty.saveBtn}
               onPress={() =>{
                if(this.state.title == ''){
                  showMessage({
                    message: 'KINGS SEEDS',
                    description:'Please enter a title',
                    type: 'warning',
                    autoHide: true,
                  });
                  return;
                }
                if(this.state.message == ''){
                  showMessage({
                    message: 'KINGS SEEDS',
                    description:'Please enter a message',
                    type: 'warning',
                    autoHide: true,
                  });
                  return;
                }
                this.addNewNote();
              } }
              >
                <Text style={sty.savebtnTxt} allowFontScaling={false}>
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    );
  }
}

const sty = StyleSheet.create({
  titleView: {
    width: "94%",
    height: hp("4"),
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  mainBox: {
    width: wp("86"),
    height: hp("50"),
    // backgroundColor: '#F6F6F6',
    // borderRadius: 15,
    // flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "center",
    marginTop: hp("6%"),
  },
  saveBtn: {
    width: wp("92") / 2,
    height: hp("4.5"),
    backgroundColor: colors.primaryColor,
    borderRadius: wp("1.3"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backtoBtn: {
    width: wp("92") / 2,
    height: hp("4.5"),
    borderRadius: wp("1.3"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("1"),
    backgroundColor: "#fffcfc",
    borderWidth: hp("0.14"),
    borderColor: colors.primaryColor,
  },
  bakctobtnTxt: {
    fontSize: hp("1.8"),
    color: colors.primaryColor,
    // justifyContent: 'center',
  },
  savebtnTxt: {
    fontSize: hp("1.8"),
    color: "white",
    // justifyContent: 'center',
  },
  cardView: {
    width: wp("100"),
    height: hp("58"),
    paddingBottom: hp("2"),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textView: {
    width: "92%",
    height: hp("3"),
    //backgroundColor: 'red',
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: hp("1"),
  },
  txtInputView: {
    width: "92%",
    height: hp("4.5"),
    backgroundColor: "white",
    borderColor: "#e6e6e6",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: wp("1.3"),
    marginTop: hp("1%"),
    borderWidth: hp("0.1"),
  },
  TxtInput: {
    width: "88%",
    height: hp("4.5"),
    fontSize: hp(1.8),
    marginLeft: wp("3"),
    color: "gray",
  },
  itemTxt: {
    height: hp("3"),
    fontSize: hp("1.8"),
    color: "black",
  },
  postalTxtInput: {
    width: "90%",
    height: hp("30"),
    fontSize: hp(1.8),
    marginLeft: wp("3"),
    color: "gray",
    justifyContent: "flex-start",
    textAlignVertical: "top",
  },
  postaltxtInputView: {
    width: "92%",
    height: hp("30"),
    backgroundColor: 'white',
    borderColor: "#e6e6e6",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: wp("1.3"),
    marginTop: hp("1%"),
    borderWidth: hp("0.1"),
  },
});

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    cartArray: state.home.cartArray,
    adminCustomerID: state.findStore.adminCustomerID,
    itemCode: state.findStore.itemCode
  };
};

export default connect(mapStateToProps, {
  getCategories,
  getProduct,
})(AddContactNote);
