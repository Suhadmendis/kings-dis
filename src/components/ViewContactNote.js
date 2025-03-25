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
} from "react-native";
import Styles from "../style/ContactsNotesStyle";
import { connect } from "react-redux";
import { getCategories, getProduct } from "../actions/HomeScreenAction";
import Back from "./common/Back";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dimensions, Platform, PixelRatio } from "react-native";
const { width: WIDTH, height: height } = Dimensions.get("window");
import { showMessage } from "react-native-flash-message";

import DataAdapter from "../offline/localData/DataAdapter";
import ConfirmationBox from "./common/ConfirmationBox";

import CustomSpinner from "./common/CustomSpinner";
import { store } from "../../configureStore";

import { useNetInfo } from '@react-native-community/netinfo';
const edticon = require("../assets/editline2xgreen.png");

import {editStoreComments, deleteStoreComments} from '../url/API';
import * as colors from '../style/Common/ColorsStyle';

const telicon = require("../assets/Contacts/telephone2x.png");
const smsicon = require("../assets/Contacts/messagesquare2x.png");
const del = require("../assets/del.png");

const contact_details = {
  contactId: 1,
  name: "David Blackurn",
  address: "136 methl road bunabhann eeadara, hs3",
  phone: "+971 123 456 789",
  email: "davidblackun@kingsseeds.com",
};

const { ids, styles } = Styles;

async function deleteContactNote(id, isConnected) {
  const payload = {
    section: "LOCAL STORE COMMENTS",
    opration: "DELETE",
    data: id,
  };

  if(isConnected){
    let res = await deleteStoreComments(id);

    console.log('response----------------');
    console.log(res);
    console.log('response----------------');

    if(res.error == ''){
      const newpro = await DataAdapter(payload);
      return newpro;

    }else{
      const newpro = await DataAdapter(payload);
      return newpro;

    }
  }else{
    const newpro = await DataAdapter(payload);
    return newpro;

  }


}


async function updateContactNote(data, isConnected){
  console.log(data);
  const payload = {
    section: 'LOCAL STORE COMMENTS',
    opration: 'UPDATE',
    data
  }


  if(isConnected){
    //API and Local
    let res = await editStoreComments(data);
    console.log(res);
    if(res.error == ''){
     // data.date,data.title,data.note,data.id
     let obj ={
      date: res.storeComment.itemModifiedWhen,
      title: res.storeComment.itemTitle,
      note: res.storeComment.itemComment,
      id: res.storeComment.itemID,
     }
     const payload = {
      section: 'LOCAL STORE COMMENTS',
      opration: 'UPDATE',
      data: obj
    }
      const n = await DataAdapter(payload);
      return n;
    }else if(res.error == 'Invalid StoreCommentID'){
      const n = await DataAdapter(payload);
      return n;
    }else{
      return 'Error Occured! Please try again'
    }


  }else{
    //Local
    const n = await DataAdapter(payload);
    return n;
  }


}


const SetNetInfo = ({ setNetInfo }) => {
  const netInfo = useNetInfo()

  React.useEffect(() => {
      setNetInfo(netInfo)
  },[netInfo])

  return null
}


class ViewContactNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      editingMode: false,

      titleEdt:'',
      messageEdt:'',

      //confirmation dialog
      showdialog: false,
      deleteYes: false,
      deleteItemId: "",
      contentText: "",
      btnName: "",
    };
  }

  setNetInfo = netInfo => {
    this.setState({netInfo})
  }

  generateDelete = () => {
    let id = this.props.route?.params?.Id;
    let isConnected = this.state.netInfo.isConnected;
    deleteContactNote(id, isConnected).then((res) => {
      if (res == 1) {
        showMessage({
          message: "KINGS SEEDS",
          description: "Note deleted successfully",
          type: "success",
          autoHide: true,
        });
        this.props.navigation.navigate("storeNew", { tab: 0, subTabVal: "" });
      }
    });
  };

  updateNote=async()=>{
    let t_ = this.state.titleEdt;
    let m_ = this.state.messageEdt;

    let isConnected = this.state.netInfo.isConnected;

    if(t_ == ''){
      showMessage({
        message: "KINGS SEEDS",
        description: "Note title cannot be empty",
        type: "warning",
        autoHide: true,
      });
      return;
    }
    if(m_ == ''){
      showMessage({
        message: "KINGS SEEDS",
        description: "Note cannot be empty",
        type: "warning",
        autoHide: true,
      });
      return;
    }
    else{

      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();

      var strDate_ = date.toString().length;
      var date_=date;
      if(strDate_==1){
        date_ = "0"+date;
      }
      if(month<=9){
        month = '0'+month;
      }

    let cur_date = year +'-' + month + '-' + date_ +'T00.00.00';//format: dd-mm-yyyyT00.00.00;
      const data = {
        id: this.props.route?.params?.Id,
        title: t_,
        note: m_,
        date: cur_date,
        itemCode: this.props.itemCode,
        isDeleted: false
      };
      var res = await updateContactNote(data, isConnected);

      this.props.navigation.navigate('storeNew', { tab: 0 ,subTabVal:""});
      console.log(res);
      showMessage({
        message: "KINGS SEEDS",
        description: "Contact Note Edited Successfully",
        type: "success",
        autoHide: true,
      });

      // updateContactNote(data).then((res) => {

      //   this.setState({
      //     editingMode: false,
      //   })
      //   this.props.navigation.navigate('storeNew', { tab: 0 ,subTabVal:""});
      //   console.log(res);
      //   showMessage({
      //     message: "KINGS SEEDS",
      //     description: "Contact Note Edited Successfully",
      //     type: "success",
      //     autoHide: true,
      //   });
      // });
    }

  }




   //confirmation box functions

   deletecartItem() {
    this.generateDelete();
    this.closeConfirmation();
  }

  confirmShowHide() {
    console.log(
      "----------------------------------------------------------------------------"
    );
    this.setState({
      showdialog: !this.state.showdialog,
      contentText: "Are you sure you want to delete this item?",
    });
  }

  closeConfirmation() {
    this.setState({
      showdialog: !this.state.showdialog,
    });
  }

  async componentDidMount(){
    this.setState({
      titleEdt: this.props.route?.params?.NoteTitle,
      messageEdt : this.props.route?.params?.Note
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        titleEdt: this.props.route?.params?.NoteTitle,
        messageEdt : this.props.route?.params?.Note
      })
    }

  }



  //Id
  render() {
    const NoteTitle = this.props.route?.params?.NoteTitle;
    const Note = this.props.route?.params?.Note;
    const DateAdd = this.props.route?.params?.DateAdd;
    const ntId = this.props.route?.params?.Id;

    console.log(DateAdd);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={sty.container}>
          <Back />
          <SetNetInfo setNetInfo={this.setNetInfo} />
          <ConfirmationBox
            showHide={this.state.showdialog}
            yes={() => this.deletecartItem()}
            no={() => this.closeConfirmation()}
            contentText={this.state.contentText}
          />

          <View style={{ width: "100%", height: hp(70), marginTop: "2%" }}>
            <View style={sty.cardView}>
              <View
                style={{
                  padding: hp("1"),
                  paddingTop: hp("1.5"),
                  paddingBottom: hp("2"),
                  width: "98%",
                }}
              >
                <View style={sty.dateView}>
                  <Text style={sty.dateText}>{DateAdd}</Text>
                  <View style={sty.icnView}>
                    <TouchableOpacity
                    style={sty.edtCartbtn}
                    onPress={() => this.setState({
                      editingMode:true
                    })}>
                    <Image source={edticon} style={sty.icn} />
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={sty.delCartbtn}
                    onPress={() => this.confirmShowHide()}>
                      <Image
                        source={del}
                        style={sty.delicn}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={sty.nameView}>
                  {this.state.editingMode !== true ? (
                    <Text style={sty.nameText}> {this.state.titleEdt}</Text>
                  ) : (
                    <View>
                      <View>
                        <Text style={sty.updateitemTxt} allowFontScaling={false}>
                          Title:
                        </Text>
                      </View>
                    <TextInput
                      onChangeText={(text) => this.setState({
                        titleEdt:text
                      })}

                      style={{
                        borderWidth: wp("0.05"),
                        borderRadius: wp("1"),
                        paddingStart: wp("2"),
                        paddingEnd: wp("2"),
                        fontSize: hp("1.5"),
                        fontWeight:'bold',
                        height: hp("4.5"),
                        fontSize: hp(1.8),
                        color: "gray",
                        borderColor: '#d3d0d0'
                      }}
                    >
                     {this.state.titleEdt}
                    </TextInput>
                    </View>
                  )}
                </View>
                <View style={sty.noteView}>
                  {this.state.editingMode !== true ? (
                    <Text style={sty.noteText}> {this.state.messageEdt}</Text>
                  ) : (
                    <View>
                      <View>
                        <Text style={sty.messageitemTxt} allowFontScaling={false}>
                          Message:
                        </Text>
                      </View>

                    <TextInput
                      allowFontScaling={false}
                      style={{
                        borderWidth: wp("0.05"),
                        borderRadius: wp("1"),
                        paddingStart: wp("2"),
                        paddingEnd: wp("2"),
                        fontSize: hp("1.6"),
                        textAlignVertical: "top",
                        height: hp('25'),
                        color: "gray",
                        borderColor: '#d3d0d0'
                      }}
                      placeholderTextColor="gray"
                      numberOfLines={15}
                      multiline={true}
                      onChangeText={(text) => this.setState({
                        messageEdt:text
                      })}
                    >
                      {this.state.messageEdt}
                    </TextInput>
                    </View>

                  )}
                </View>

                {this.state.editingMode !== true ? null : (
                  <View style={sty.btnView}>
                    <TouchableOpacity activeOpacity={0.9} style={sty.backtoBtn}
                    onPress={()=> this.setState({
                      editingMode:false
                    })}
                    >
                      <Text style={sty.bakctobtnTxt} allowFontScaling={false}>
                       CANCEL
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} style={sty.saveBtn}
                    onPress={()=> this.updateNote()}
                    >
                      <Text style={sty.savebtnTxt} allowFontScaling={false}>
                        UPDATE
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

let widthper = wp("100%");
let txt_date = 0;
let txt_name = 0;
let txt_note = 0;
let btn_h = 0;
if (widthper <= 500.0) {
  txt_date = wp("3");
  txt_name = wp("3.5");
  txt_note = wp("2.8");
  btn_h = hp('3.5');
} else {
  txt_date = wp("2.4");
  txt_name = wp("2.9");
  txt_note = wp("2.2");
  btn_h = hp('4');
}

const sty = StyleSheet.create({
  saveBtn: {
    width: wp("88") / 2,
    height: hp("4"),
    backgroundColor: colors.primaryColor,
    borderRadius: wp("1"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backtoBtn: {
    width: wp("88") / 2,
    height: hp("4"),
    borderRadius: wp("1"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("1"),
    backgroundColor: "#fffcfc",
    borderWidth: hp("0.1"),
    borderColor: colors.primaryColor,
  },
  bakctobtnTxt: {
    fontSize: hp("1.5"),
    color: colors.primaryColor,
    // justifyContent: 'center',
  },
  savebtnTxt: {
    fontSize: hp("1.5"),
    color: "white",
    // justifyContent: 'center',
  },
  btnView: {
    flexDirection:'row',
    height: hp("4"),
    width: "100%",
    marginTop: hp("1"),
  },
  icn: {
    height: hp("2.5"),
    width: wp("2.5"),
    resizeMode: "contain",
  },
  delicn: {
    height: hp("2"),
    width: wp("2"),
    resizeMode: "contain",
  },
  icnView: {
    width: wp("20"),
    height: hp("3"),
    position: "absolute",
    right: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  container: {
    //flex: 1,
    width: WIDTH,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F9F9F9",
  },
  titleView: {
    width: "94%",
    height: hp("4"),
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  dateView: {
    height: hp("3"),
    flexDirection: "row",
  },
  nameView: {
    marginTop: hp("0.2"),
  },
  noteView: {
    marginTop: hp("1"),
  },

  dateText: {
    fontSize: txt_date,
    color: colors.primaryColor,
  },
  nameText: {
    fontSize: txt_name,
    fontWeight: "bold",
    color:'black'
  },
  noteText: {
    fontSize: txt_note,
    color: colors.fourthiaryColor,
  },

  cardView: {
    width: "94%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: wp("2"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  textView: {
    width: "92%",
    height: hp("3"),
    //backgroundColor: 'red',
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: hp("1"),
  },
  edtCartbtn: {
    alignItems: "center",
    justifyContent:"center",
    height:btn_h,
    width: wp('8'),
    backgroundColor: "#DEF9F6",
    borderWidth: wp("0.2"),
    borderColor: "#DEF9F6",
    borderRadius: wp("1"),
  },
  delCartbtn: {
    marginLeft: wp('1'),
    alignItems: "center",
    justifyContent:"center",
    height:btn_h,
    width: wp('8'),
    backgroundColor: "#FFD8D8",
    borderWidth: wp("0.2"),
    borderColor: "#FFD8D8",
    borderRadius: wp("1"),
  },

  updateitemTxt:{
    marginTop: 30,
    height: hp("3"),
    fontSize: hp("1.8"),
    color: "black",
  },
  messageitemTxt:{
    marginTop: 20,
    height: hp("3"),
    fontSize: hp("1.8"),
    color: "black",
  }

});

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    itemCode: state.findStore.itemCode,
    cartArray: state.home.cartArray,
  };
};

export default connect(mapStateToProps, {
  getCategories,
  getProduct,
})(ViewContactNote);
