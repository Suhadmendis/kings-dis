import React, {Component} from "react";
import {Image, Modal, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Styles from "../style/StorePhotosStyle";
import {ProgressBar} from "react-native-paper";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";
import {showMessage} from "react-native-flash-message";
import {connect} from "react-redux";
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from "react-native-responsive-screen";
import {Fonts} from "../utils/Fonts";
import {getPhotosArray,} from "../actions/StorePhotosAction";
import RNFetchBlob from 'rn-fetch-blob'
import RNFS, { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs';
import CustomSpinner from "./common/CustomSpinner";
import {store} from '../../configureStore';

const { ids, styles } = Styles;
import * as colors from '../style/Common/ColorsStyle';

const search = require("../assets/search-green.png");

const up_file = require("../assets/icons8-folder-128.png");
const checkIcn = require("../assets/icons8-checked-50.png");
const jpgIcn = require("../assets/icons8-jpg-100.png");
const del = require("../assets/del.png");
const viewicon = require("../assets/view.png");
const notesicon = require("../assets/clone-line.png");
const list = require("../assets/sample-product2.jpg");
const multiply = require("../assets/multiply.png");

let imageArray = [];
let sou_arr = [];
class AddNewPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navToprev:false,
      progressValue: 0,
      modalVisible: false,
      value: 1,
      filepath: {
        data: "",
        uri: "",
      },
      fileData: "",
      fileUri: "",
    };
  }

  async componentDidMount() {

    // this.chooseImageFromCamera()


    
    imageArray = [];
    this.setState({
      progressValue: 0,
    });
    
  }

 navtoprev() {
    this.props.navigation.navigate('storeNew',{ tab: 8 ,subTabVal:''})
  }

  async addImagesToArray() {
    let errors = [];
    // this.props.getPhotosArray(array);
    
    if (imageArray.length > 0) {
      store.dispatch({type: 'CustomSpinner:SHOW'});
      for (let index = 0; index < imageArray.length; index++) {

        let s_ = imageArray[index].fileData;
        let n_ = imageArray[index].fileName;
        let res = await this.saveImage(s_, n_);
        if (!res) {
          errors.push(index);
        }
        if (index == imageArray.length - 1) {
          store.dispatch({type: 'CustomSpinner:HIDE'});
          // Actions.reset("storeNew", { tab: 8 });
          // this.navtoprev()
          if (errors.length == imageArray.length) {
            showMessage({
              message: "KINGS SEEDS",
              description: "Failed to save the images",
              type: "danger",
              autoHide: true,
            });
          } else if (errors.length > 0) {
            showMessage({
              message: "KINGS SEEDS",
              description: "Failed to save some images",
              type: "warning",
              autoHide: true,
            });
          } else {
            showMessage({
              message: "KINGS SEEDS",
              description: "Images are saved in the gallery",
              type: "success",
              autoHide: true,
            });
          }
        }

        // this.props.navigation.navigate('storeNew',{ tab: 8 ,subTabVal:''})

      }

    } else {
      store.dispatch({type: 'CustomSpinner:HIDE'});
      showMessage({
        message: "KINGS SEEDS",
        description: "Upload images to save",
        type: "info",
        autoHide: true,
        animated: true
      });
    }

  }

  // takeImageFromGallery = () => {
  //   let options = {
  //     storageOptions: {
  //       path: 'images',
  //       mediaType:'photo'
  //     },
  //     includeBase64:true,
  //   };
  //   launchImageLibrary(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);

  //     } else {
  //       const source = { uri: 'data:image/jpeg;base64'+response.base64 };

  //       // You can also display the image using data:
  //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };
  //       // alert(JSON.stringify(response));s
  //       console.log('response', JSON.stringify(response));
  //       // this.setState({
  //       //   filePath: response,
  //       //   fileData: response.data,
  //       //   fileUri: response.uri
  //       // });
  //     }
  //   });
  // }

  async saveImage(source, filename) {
    //const folderPath = "data/user/0/com.kingseed/files/KingsSeeds";
    
    if (Platform.OS === "android") {
      const folderPath = DocumentDirectoryPath;
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          let isDir = await RNFetchBlob.fs.isDir(folderPath);
          if (isDir) {
            
            return await this.addImage(source, filename);
          } else {
            
            try {
              await RNFetchBlob.fs.mkdir(folderPath);
              
              return await this.addImage(source, filename);
            } catch (e) {
              return false;
            }
          }
        } catch (e) {
          return false;
        }
      } else {
        showMessage({
          message: "KINGS SEEDS",
          description: "Need file access to save pictures",
          type: "warning",
          autoHide: true,
        });
        return false;
      }
    } else {
      const folderPath = RNFS.DocumentDirectoryPath + "/";
      
      try {
        let isDir = await RNFetchBlob.fs.isDir(folderPath);
        if (isDir) {
          
          return await this.addImage(source, filename);
        } else {
          
          try {
            await RNFetchBlob.fs.mkdir(folderPath);
            
            return await this.addImage(source, filename);
          } catch (e) {
            return false;
          }
        }
      } catch (e) {
        return false;
      }
    }
  }

  async addImage(source, filename) {
    
    var randomChars = filename;
    var result = randomChars.substr(randomChars.length - 16);
    result = this.props.adminCustomerID + "_" + result;
    var re_ = result.split('_')[0];
    
    var Base64Code = source.split("data:image/jpg;base64,"); //source is my image base64 string
    const dirs = RNFetchBlob.fs.dirs;
    let path_ = (Platform.OS === "android" ? RNFS.DocumentDirectoryPath : RNFS.DocumentDirectoryPath) + "/" + result;

    try {
      let res = await RNFetchBlob.fs.writeFile(path_, source, "base64");
      
      return true;
      //   Actions.reset("storeNew", {tab:8});
    } catch (e) {
      return false;
    }

    // RNFetchBlob.fs.ls(dirs.DownloadDir + "/KingsSeeds/").then(files => {
    //   console.log(files);
    // }).catch(error => console.log(error))
    // let pa_= dirs.DownloadDir + "/KingsSeeds/0fcmje-92c.jpg"

    // RNFetchBlob.fs.readFile(pa_, "base64").then((data) => {
    //   // handle the data ..
    //   console.log(data);
    // });

    // RNFetchBlob.fs
    //   .createFile(path, RNFetchBlob.base64.encode(source), "base64")
    //   .then(() => {
    //     console.log("image saved");
    //   });
  }

  takeImageFromGallery = () => {
    this.setModalVisible(false);
    this.setState({
      progressValue: 0,
    });
    let options = {
      title: "Select Image",
      // saveToPhotos: true,
      selectionLimit: 10,
      includeBase64: true,
      customButtons: [
        { name: "customOptionKey", title: "Choose Photo from Custom Option" },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        
      } else if (response.error) {
        
      } else if (response.customButton) {
        
      //  alert(response.customButton);
      } else {
        const source = { uri: "data:image/jpeg;base64" + response.base64 };
        this.setState({
          progressValue: 0.5,
        });

        // You can also display the image using data:
        //   const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        //  console.log("response", JSON.stringify(response));

        // let imgDetails = {
        //   fileUri: response.assets[0].uri,
        //   fileName: response.assets[0].fileName,
        //   fileData:''
        // };
        for (let index = 0; index < response.assets.length; index++) {
          // this.saveImage(
          //   response.assets[index].base64,
          //   response.assets[index].fileName
          // );
          let imgDetails = {
            fileUri: response.assets[index].uri,
            fileName: response.assets[index].fileName,
            fileData: response.assets[index].base64,
            selected: false,
            synced: false,
          };
          // imgDetails.fileUri =  response.assets[index].uri;
          //   imgDetails.fileName =  response.assets[index].fileName;
          // imgDetails.fileData =  response.assets[0].base64;
          imageArray.push(imgDetails);
        }

        this.setState({
          progressValue: 1,
        });

        // response.assets.forEach(element => {
        //   imgDetails.fileUri =  element.uri;
        //   imgDetails.fileName =  element.fileName;
        //  // imgDetails.fileData =  element.base64;
        //   imageArray.push(imgDetails);
        //   console.log(imageArray);
        // });
        //   this.addImagesToArray(imageArray);
        //console.log(imageArray);
        //  imageArray.forEach(element => {
        //   console.log("Response = ");
        // });
      }
    });
  };
  setModalVisible = (visible) => {
    
    this.setState({ modalVisible: visible });
  };

  chooseImageFromCamera = async () => {
    
    this.setState({
      progressValue: 0,
    });

    let granted = null;
    
    if (Platform.OS === "android") {
      granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
      );
    }

    if ((Platform.OS === "android" && granted === PermissionsAndroid.RESULTS.GRANTED) || Platform.OS === "ios") {
      let options = {
        title: "Select Image",
        includeBase64: true,
        customButtons: [
          { name: "customOptionKey", title: "Choose Photo from Custom Option" },
        ],
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      };
      launchCamera(options, (response) => {
        this.setModalVisible(false);
        

        if (response.didCancel) {
          
        } else if (response.errorCode) {
          
          if(response.errorCode === "camera_unavailable" || response.errorCode === "permission"){
            showMessage({
              message: "KINGS SEEDS",
              description: "Need camera access to take pictures",
              type: "warning",
              autoHide: true,
            });
          } else {
            showMessage({
              message: "KINGS SEEDS",
              description: "Something went wrong! Please check device camera and its permissions",
              type: "warning",
              autoHide: true,
            });
          }
        } else if (response.customButton) {
          
         // alert(response.customButton);
        } else {
          const source = { uri: response.uri };

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          // alert(JSON.stringify(response));s
          
          // console.log("response", JSON.stringify(response));

          

          this.setState({
            progressValue: 0.3,
          });
          let imgDetails = {
            fileUri: response.assets[0].uri,
            fileName: response.assets[0].fileName,
            fileData: response.assets[0].base64,
            selected: false,
            synced: false,
          };
          // imgDetails.fileUri =  response.assets[index].uri;
          //   imgDetails.fileName =  response.assets[index].fileName;
          // imgDetails.fileData =  response.assets[0].base64;
          imageArray.push(imgDetails);

          this.setState({
            progressValue: 1,
          });

          // let imgDetails = {
          //   fileUri: response.assets[0].uri,
          //   fileName: response.assets[0].fileName,
          //   fileData:'',
          //   selected:false
          // };

          // imageArray.push(imgDetails);
          // console.log(imageArray);
        }
      });
    }
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={{ flex: 1 }}>
         <CustomSpinner/>
        <View style={styles.container}>
          <Modal
            animationType="fade"
            //fade , none,slide use for animation type
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={sty.centeredView}>
              <View style={sty.modalView}>
                <View
                  style={{
                    height: "20%",
                    width: "100%",
                    flexDirection: "row",
                    borderColor: "#e6e6e6",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text
                    style={{
                      marginTop: hp("0.8"),
                      marginLeft: wp("2"),
                      fontSize: hp("1.7"),
                      fontWeight: "bold",
                      fontFamily: Fonts.PoppinsBold,
                    }}
                  >
                    Select Photos
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                      width: "12%",
                      height: "100%",
                      position: "absolute",
                      right: 2,
                    }}
                    onPress={() => this.setModalVisible(!modalVisible)}
                  >
                    {/* <Image source={multiply} style={sty.cardImg1} /> */}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    height: "80%",
                    width: "100%",
                    marginTop: hp("1"),
                  }}
                >
                  <View style={sty.txtInputView}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={[sty.button, sty.buttonClose]}
                      onPress={() => this.takeImageFromGallery()}
                    >
                      <Text style={sty.textStyle}>Select From Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={[sty.button, sty.buttonClose]}
                      onPress={() => this.chooseImageFromCamera()}
                    >
                      <Text style={sty.textStyle}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={[sty.button, sty.buttonClose]}
                      onPress={() => this.setModalVisible(!modalVisible)}
                    >
                      <Text style={sty.textStyle}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* <Text style={sty.modalText}>Hello World!</Text>
                <TouchableOpacity activeOpacity={0.9}
                  style={[sty.button, sty.buttonClose]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={sty.textStyle}>Hide Modal</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </Modal>

          <View style={sty.titleView}>
            <Text style={sty.titleTxt} allowFontScaling={false}>
              Upload Your Images
            </Text>
            <Text style={sty.titleTxt1} allowFontScaling={false}>
              File should be jpg / png / bmp
            </Text>
          </View>
          <View style={sty.uploadView}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={sty.uploadArea}
              onPress={() => this.setModalVisible(!modalVisible)}
              // onPress={() => this.takeImageFromGallery()}
            >
              <View style={sty.uploadText}>
                <View style={styles.ashBtn}>
                  <Image source={up_file} style={sty.cardImg} />
                </View>
              </View>
              <Text style={sty.titleTxt2}>Click here to upload your files</Text>
            </TouchableOpacity>
          </View>
          <View style={sty.progressTextView}>
            <View style={sty.progressArea}>
              <Text style={sty.progressText} allowFontScaling={false}>
                Uploaded Files
              </Text>
            </View>
            <View style={sty.progressImg}>
              <View style={styles.ashBtn}>
                <Image source={jpgIcn} style={sty.cardImg} />
              </View>
              <View style={sty.progressBarArea}>
                <Text
                  style={{
                    fontSize: hp("1.5"),
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "right",
                    color: "#8A8C8C",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.progressValue * 100}%
                </Text>
                <ProgressBar
                  style={{ borderRadius: hp("0.5"), height: hp("0.5") }}
                  progress={this.state.progressValue}
                  color={"#90D98D"}
                />
              </View>
              <View style={sty.checkBtn}>
                {this.state.progressValue === 1 ? (
                  <Image source={checkIcn} style={sty.cardImg1} />
                ) : null}
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: hp("10"),
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity activeOpacity={0.9} style={sty.backtoBtn}
             onPress={() => {
              this.props.navigation.navigate('storeNew',{ tab: 8 ,subTabVal:''});
            }}
            >
              <Text
                style={sty.bakctobtnTxt}
                allowFontScaling={false}
              >
                BACK TO PHOTOS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={sty.saveBtn}
              onPress={() => {
                this.addImagesToArray();
              }}
            >
              <Text style={sty.savebtnTxt} allowFontScaling={false}>
                SAVE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    adminCustomerID: state.findStore.adminCustomerID,
    photosArray: state.storePhotos.photosArray,
  };
};

export default connect(mapStateToProps, {
  getPhotosArray,
})(AddNewPhotos);

const sty = StyleSheet.create({
  sendButtonView: {
    marginLeft: wp("2"),
    width: "92%",
    height: hp("4"),
    alignItems: "flex-end",
    justifyContent: "center",
  },
  button: {
    borderRadius: hp("0.5"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    marginTop: hp("1"),
    alignItems: "center",
    justifyContent: "center",
    height: hp("3.4"),
    width: wp("60"),
  },
  buttonOpen: {
    backgroundColor: colors.primaryColor,
  },
  buttonClose: {
    backgroundColor: colors.primaryColor,
  },
  TxtInput: {
    width: "95%",
    height: hp("4"),
    fontSize: hp(1.6),
    marginLeft: wp("3"),
    color: "#555656",
  },
  txtInputView: {
    marginLeft: wp("2"),
    width: "92%",
    height: hp("14"),
    alignItems: "center",
    justifyContent: "center",
  },
  cardImg1: {
    aspectRatio: 0.8,
    resizeMode: "contain",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: wp("70%"),
    height: hp("20%"),
    margin: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    borderRadius: hp("1.5"),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    textAlign: "center",
    fontSize: hp(1.6),
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  saveBtn: {
    width: wp("92") / 2,
    height: hp("4.8"),
    backgroundColor: colors.primaryColor,
    borderRadius: wp("2"),
    flexDirection: "row",
    //  marginTop: wp("-40"),
    alignItems: "center",
    justifyContent: "center",
  },
  backtoBtn: {
    width: wp("92") / 2,
    height: hp("4.8"),
    borderRadius: wp("2"),
    flexDirection: "row",
    //marginTop: wp("-40"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("1"),
    backgroundColor: "#fffcfc",
    borderWidth: hp("0.14"),
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
  ashBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("2"),
    height: hp("10"),
  },
  checkBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("3"),
    height: hp("5"),
  },
  cardImg1: {
    flex: 1,
    aspectRatio: 0.7,
    marginTop: hp("1"),
    resizeMode: "contain",
  },
  titleTxt: {
    fontSize: hp("2.5"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
  titleTxt1: {
    marginTop: hp("1"),
    fontSize: hp("1.4"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    alignSelf: "center",
    textAlign: "center",
  },
  titleTxt2: {
    marginTop: hp("1"),
    fontSize: hp("1.4"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    alignSelf: "center",
    textAlign: "center",
  },
  titleView: {
    width: "94%",
    height: hp("6"),
    marginTop: hp("2"),
    justifyContent: "center",
    alignItems: "center",
  },
  uploadView: {
    width: "94%",
    height: hp("30"),
    marginTop: hp("2"),
    justifyContent: "center",
    alignItems: "center",
  },
  uploadArea: {
    marginTop: hp("1"),
    fontSize: hp("1.4"),
    width: "70%",
    height: hp("27%"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "#ECFCFA",
    borderColor: "#6DF6E1",
    borderWidth: wp("0.4"),
    borderStyle: "dashed",
    borderRadius: 1,
  },
  uploadText: {
    width: "70%",
    height: hp("10%"),
    fontSize: hp("1.4"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: hp("7%"),
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.6,
    resizeMode: "contain",
    // borderRadius: 1,
  },
  progressTextView: {
    width: "94%",
    height: hp("6"),
    marginTop: hp("2"),
    alignItems: "center",
  },
  progressText: {
    fontSize: hp("1.8"),
    fontWeight: "bold",
    fontFamily: Fonts.PoppinsBold,
    color: "#8A8C8C",
  },
  progressArea: {
    width: "70%",
    height: hp("3%"),
    alignSelf: "center",
    textAlign: "center",
  },
  progressArea1: {
    width: "70%",
    height: hp("8%"),
    alignSelf: "center",
    textAlign: "center",
  },
  progressImg: {
    width: "70%",
    height: hp("7%"),
    fontSize: hp("1.4"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  progressBarArea: {
    width: "70%",
    height: hp("5%"),
    marginLeft: wp("2"),
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: hp("1"),
  },
});
