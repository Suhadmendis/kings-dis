import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  Modal,
  PermissionsAndroid,
  ImageBackground,
  Alert,
} from "react-native";
import { Fonts } from "../utils/Fonts";
import Styles from "../style/StorePhotosStyle";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import RNFS, { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob'
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';
import _, { get } from "lodash";
import getBaseUrl from "../url/getBaseUrl";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FlatGrid } from "react-native-super-grid";
import {
  getPhotosArray,
  takeImageFromGallery_,
  getSelectedPhotosArray,
  getStoreModal,
} from "../actions/StorePhotosAction";

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import * as colors from "../style/Common/ColorsStyle"

import DeleteImageAPI from './PhotoOperation/DeleteImageAPI';

import { showMessage } from "react-native-flash-message";
import submited from "../offline/storeData/submitData";
import PhotoSyncModal from "../components/common/PhotoSyncModal";
import DownloadPhotosModal from "./helperComponents/DownloadPhotosModal";

import { syncImagesToApi, downloadImages } from "../actions/ImageSyncAction";
import { CheckDirectory, configDirectory } from "./DiskManagement/CommonOperations";


const search = require("../assets/search-green.png");

import ConfirmationBox from "./common/ConfirmationBox";

const filter = require("../assets/add2x.png");
const multiply = require("../assets/multiply.png");
const telicon = require("../assets/telephone.png");
const del = require("../assets/del.png");
const share = require("../assets/share2x.png");
const notesicon = require("../assets/clone-line.png");
const list = require("../assets/sample-product2.jpg");
const checkIcn = require("../assets/icons8-checked-50.png");

const items = [
  { name: "TURQUOISE", code: "#1abc9c" },
  { name: "EMERALD", code: "#2ecc71" },
  { name: "PETER RIVER", code: "#3498db" },
  { name: "AMETHYST", code: "#9b59b6" },
  { name: "WET ASPHALT", code: "#34495e" },
  { name: "GREEN SEA", code: "#16a085" },
  { name: "NEPHRITIS BELIZE GREEN HOLE", code: "#27ae60" },
  { name: "BELIZE HOLE", code: "#2980b9" },
  { name: "BELIZE HOLE", code: "#2980b9" },
];

const { ids, styles } = Styles;

let scrn_width = wp("100");
let gridSize = 185;

if (scrn_width > 400) {
  gridSize = 185;
} else {
  gridSize = 130;
}

class StorePhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      value: 1,
      offset: 0,
      pagesize: 8,

      selectedImgUri: '',

      resData: [
        {
          fileData: '',
          fileName: '',
          fileUri: '',
          selected: false,
          synced: false,
        },
      ],

      syncModal: false,

      //confirmation dialog
      showdialog: false,
      deleteYes: false,
      deleteItemId: '',
      contentText: '',
      btnName: '',

      //download modal
      downloadSyncModal: false,
      downloadStatus: 'downloading images...',
    };
  }

  confirmShowHide(contentTxt) {
    this.setState({
      showdialog: !this.state.showdialog,
      contentText: contentTxt,
    });
  }

  closeConfirmation() {
    this.setState({
      showdialog: !this.state.showdialog,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.resData == this.state.resData) {
      //   this.props.getStoreModal(false);
      
      if (Platform.OS === 'android') {
        this.getPhotosfromFolder();
      }else{
        this.getPhotosfromFolderIOS();
      }

      
      // this.getPhotosfromFolderCheck();
      // this.getPhotosfromFolderCheck();


      //prevState.resData == this.state.resData
    }
  }

  async componentDidMount() {
    // this.setState({
    //   resData: this.props.photosArray,
    // });
    // this.props.getStoreModal(false);


    // this.getPhotosfromFolderIOS();
    // this.getPhotosfromFolderCheck();
    

    if (Platform.OS === 'android') {
      this.getPhotosfromFolder();
    }else{
      this.getPhotosfromFolderIOS();
    }


    // configDirectory()




    // configDirectory();
    // CheckDirectory();

  }

  syncImages = async () => {
    //add selected images to file array

    let files_ = [];
    for (
      let index = 0;
      index < this.props.selectedPhotosArray.length;
      index++
    ) {
      const element = this.props.selectedPhotosArray[index];
      let i = 0;
      if (element.selected == true) {
        files_.push(element);
      }
    }

    if (files_.length == 0) {
      showMessage({
        message: 'KINGS SEEDS',
        description: 'Please select images to sync',
        type: 'info',
        autoHide: true,
      });
      //  navigation.navigate( 'storeNew', { tab: 8 });
    } else {
      // setModalVisible(true);
      this.props.getStoreModal(true);



      syncImagesToApi(
        this.props.selectedPhotosArray,
        this.props.accCode,
        this.props.addressId,
        this.props.loginToken,
      )
        .then(data => {
          // return;

        

          //console.log(modalVisible);
          //setModalVisible(false);
          //  setModalBtn(true)
          this.props.getStoreModal(false);
          if (data == 'success') {
            showMessage({
              message: 'KINGS SEEDS',
              description: 'Image sync successful',
              type: 'success',
              autoHide: true,
            });
          } else {
            showMessage({
              message: 'KINGS SEEDS',
              description: data,
              type: 'warning',
              autoHide: true,
            });
          }

          const flags = {
            main_operation: 'IMAGE SYNC',
            sub_operation: 'INSTANT',
            status: 'DONE',
          };
          const log_added = submited('add', flags); // create, add, read, delete

        })
        .catch(error => {
          
          //   setModalVisible(false);
          this.props.getStoreModal(false);
          showMessage({
            message: 'KINGS SEEDS',
            description: error,
            type: 'warning',
            autoHide: true,
          });
        });
    }
  };

  async deleteImage() {

  
    let AccCode = this.props.accCode;
    let AddressID =  this.props.addressId;


    var uri = this.state.selectedImgUri;

    var fn = uri.split('/');

    const dirs = RNFetchBlob.fs.dirs;
      let dir = RNFS.DocumentDirectoryPath;

    // var path = uri.split('///').pop();
    var path = dir + "/" + fn[fn.length-1];
    
    // Alert.alert(path);
    // console.log('====================================');
    // console.log(path);
    // console.log('====================================');
    var pathObj = path.split('/');
    var fileName = pathObj[pathObj.length - 1]
    

    let res = await DeleteImageAPI(AccCode, AddressID, fileName);
    
    res = JSON.parse(res);
    
    if (res.error == null) {
      

      if (res.images[0].error == null) {
      
        var path = uri.split('///').pop();
        this.setModalVisible(false);
        // this.closeConfirmation();
        RNFetchBlob.fs
          .unlink(path)
          .then(() => {
            this.getPhotosfromFolder();
    
            let newarray = [];
    
            if (this.props.selectedPhotosArray != undefined) {
              for (let i = 0; i < this.props.selectedPhotosArray.length; i++) {
                const elm = this.props.selectedPhotosArray[i];
                if (elm.fileUri != uri) {
                  newarray.push(elm);
                }
              }
            }
    
            this.props.getSelectedPhotosArray(newarray);
    
            showMessage({
              message: 'KINGS SEEDS',
              description: 'Image is deleted from the gallery',
              type: 'success',
              autoHide: true,
            });
          })
          .catch(err => {
            showMessage({
              message: 'KINGS SEEDS',
              description: 'Error occured..!!',
              type: 'warning',
              autoHide: true,
            });
          });
          

      }else{
        showMessage({
          message: 'KINGS SEEDS',
          description: res.images[0].error,
          type: 'warning',
          autoHide: true,
        });
      }

    }else{
      showMessage({
        message: 'KINGS SEEDS',
        description: 'Error occured. Please try again',
        type: 'warning',
        autoHide: true,
      });
    }
    

    

  
  }

  async getPhotosfromFolderIOS() {





    let isExists = await RNFS.readDir(RNFS.DocumentDirectoryPath);

    
    request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
      if(result != "granted"){
        
        check(PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log('This feature is not available (on this device / in this context)');
              break;
            case RESULTS.DENIED:
              console.log('The permission has not been requested / is denied but requestable');
              break;
            case RESULTS.LIMITED:
              console.log('The permission is limited: some actions are possible');
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log('The permission is denied and not requestable anymore');
              break;
          }
        })
        .catch((error) => {
          // …
        });
        
      }
     
    });


    let arrayToAdd = [];
    let cus_ID = this.props.adminCustomerID;
    const dirs = RNFetchBlob.fs.dirs;
    let dir = dirs.DocumentDir;




    RNFetchBlob.fs
        .ls(dir)
        .then(files => {


          for (let index = 0; index < files.length; index++) {
            let element = files[index];
            var re_ = element.split('_')[0];

            if (re_ == cus_ID) {
              let uri_ = dir + "/" + element;

              let arr = {
                fileData: '',
                fileName: element,
                fileUri: uri_,
                selected: false,
                synced: false,
              };
              if (this.props.selectedPhotosArray != undefined) {
                for (
                  let i = 0;
                  i < this.props.selectedPhotosArray.length;
                  i++
                ) {
                  const elm = this.props.selectedPhotosArray[i];
                  if (elm.fileName == element) {
                    arr.selected = elm.selected;
                    arr.synced = elm.synced;
                  }
                }
              }


              arrayToAdd.push(arr);
            }
          }
          this.setState({
            resData: arrayToAdd,
          });
          
        })
        .catch(error => console.log('error1', error));




  }

  async getPhotosfromFolderCheck() {

    let isExists = await RNFS.readDir(RNFS.DocumentDirectoryPath);



    
    
  }

  async getPhotosfromFolder() {
    let granted = null;
    if (Platform.OS === 'android') {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
    }
    if (
      (Platform.OS === 'android' &&
        granted === PermissionsAndroid.RESULTS.GRANTED) ||
      Platform.OS === 'ios'
    ) {


      let arrayToAdd = [];
      let cus_ID = this.props.adminCustomerID;
      const dirs = RNFetchBlob.fs.dirs;
      let dir = RNFS.DocumentDirectoryPath;

    
      console.log('====================================');
      console.log(dir);
      console.log('====================================');
      // return;
      // /data/user/0/com.kingsseeds/files/RNFetchBlobTmp_und1fy0mx4mfw3gbfhhgpu.zip
      // /data/user/0/com.kingsseeds/files/KingsSeeds/
      RNFetchBlob.fs
        .ls(dir + '/')
        .then(files => {
          for (let index = 0; index < files.length; index++) {
            let element = files[index];
            var re_ = element.split('_')[0];
            if (re_ == cus_ID) {
              let uri_ = 'file://' + dir + '/' + element;

              
              let arr = {
                fileData: '',
                fileName: element,
                fileUri: uri_,
                selected: false,
                synced: false,
              };
              if (this.props.selectedPhotosArray != undefined) {
                for (
                  let i = 0;
                  i < this.props.selectedPhotosArray.length;
                  i++
                ) {
                  const elm = this.props.selectedPhotosArray[i];
                  if (elm.fileName == element) {
                    arr.selected = elm.selected;
                    arr.synced = elm.synced;
                  }
                }
              }

             
              arrayToAdd.push(arr);
            }
          }
          this.setState({
            resData: arrayToAdd,
          });
          
        })
        .catch(error => console.log('error1', error));
    }
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  setSelectedPhoto(name, sel) {
    let inx = this.state.resData.findIndex(obj => obj.fileName === name);
    let b_sel = false;
    if (sel) {
      b_sel = false;
    } else {
      b_sel = true;
    }
    let im_arr = [];
    im_arr = this.state.resData;
    im_arr[inx].selected = b_sel;
    this.setState({
      resData: im_arr,
    });
    console.log(this.state.resData[inx]);

    this.props.getSelectedPhotosArray(this.state.resData);
  }

  setDownloadModalvisibility = () => {
    this.setState({
      downloadSyncModal: !this.state.downloadSyncModal,
    });
  };


  async saveDataForTileNewNew() {

    let data = {
      AccCode: this.props.accCode,
      AddressID: this.props.addressId,
    };

    let acc_code = this.props.accCode;
    let Address_ID = this.props.addressId;

    let token = this.props.loginToken;
    console.log(acc_code + ' ' + Address_ID);



    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      appendExt: 'zip',
      fileCache: true,
    })
      .fetch('POST', `${getBaseUrl()}Sync/GetImages`, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }, JSON.stringify(data))
      .then((res) => {
        // the temp file path
        console.log("The file saved to ", res.path());
        let status = res.info().status;

        if (status == 200) {
          // the conversion is done in native code
          let base64Str = res.base64()
          console.log('====================================');
          console.log(base64Str);
          console.log('====================================');
        }
        else {
          alert('Something went wrong')
        }

        const charset = 'UTF-8';

        unzip(res.path(), res.path(), charset)
          .then(path => {
            //unzip to unzip images folder
            console.log(`unzip completed (unzip) at ${path}`);

            // unzip(sourcePath, targetPath, charset)
            // .then(path => {
            //   //unzip to the folder
            //   console.log(`unzip completed at ${path}`);


            //   RNFetchBlob.fs
            //   .ls(targetDownloadedImgs)
            //   .then(files => {
            //     console.log(files);
            //   //updating sync tag
            //   let imgArray = [];
            //    imgArray = this.props.selectedPhotosArray;

            //   console.log(imgArray);
            //   for (let j = 0; j < files.length; j++) {
            //     const elmP = files[j];

            //     let el_ = _.find(imgArray, {fileName: elmP}) ?? null;
            //     if(el_ == null){
            //       let obj = {
            //         fileData: '',
            //         fileName: elmP,
            //         fileUri: folderPath + '/'+elmP,
            //         selected: false,
            //         synced: true,
            //       };
            //       imgArray.push(obj)
            //     }else{

            //       el_.synced = true;
            //       imgArray[el_].synced = true;
            //     }

            //     console.log('====================================');
            //     console.log(imgArray);
            //     console.log('====================================');
            //     this.props.getSelectedPhotosArray(imgArray);

            //   }



            //   })
            //   .catch(error => {
            //     console.log(error);

            //     this.setState({
            //       downloadSyncModal:false
            //     })
            //   });




            //   this.setState({
            //     downloadStatus: 'Completed',
            //   });
            //   this.setState({
            //     downloadSyncModal:false
            //   })
            //   this.getPhotosfromFolder();
            // })
            // .catch(error => {
            //   console.error(error);
            // });

          })
          .catch(error => {
            console.error(error);
          });



      });
  }

  async saveDataForTileNew(tile) {

    this.setState({
      downloadSyncModal: true,
      downloadStatus: 'downloading images...',
    });

    let data = {
      AccCode: this.props.accCode,
      AddressID: this.props.addressId,
    };


    let acc_code = this.props.accCode;
    let Address_ID = this.props.addressId;

    let token = this.props.loginToken;
    console.log(acc_code + ' ' + Address_ID);

    const dirs = RNFetchBlob.fs.dirs;

    const folderPath = `${dirs.DownloadDir}/KingsSeeds`;

    const rsp = await RNFetchBlob
      .config({
        fileCache: true,
        // by adding this option, the temp files will have a file extension
        appendExt: 'zip',

      })
      .fetch('POST', `${getBaseUrl()}Sync/GetImages`, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }, JSON.stringify(data))
      .progress((received, total) => {
        console.log('progress', received / total);
      })
      .then((res) => {

        let status = res.info().status;

        if (status == 200) {
          // the conversion is done in native code
          let base64Str = res.base64()

        }
        else {
          //alert('Something went wrong')
        }

        



        // the temp file path with file extension `png`
        console.log('The file saved to 1x', res.path())

        const sourcePath = folderPath + '/file1.zip';
        const targetPath = DocumentDirectoryPath;
        const targetDownloadedImgs = folderPath + '/downloaded/';
        const charset = 'UTF-8';


        if (res.respInfo.status == 200) {
          this.setState({
            downloadStatus: 'Unzipping images...',
          });
          unzip(res.path(), targetPath, charset)
            .then(path => {
              //unzip to unzip images folder
              console.log(`unzip completed (unzip) at ${path}`);


                this.setState({
                downloadStatus: 'Completed',
              });
              this.setState({
                downloadSyncModal:false
              })
              this.getPhotosfromFolder();

              // unzip(sourcePath, targetPath, charset)
              //   .then(path => {
              //     //unzip to the folder
              //     console.log(`unzip completed at ${path}`);


              //     RNFetchBlob.fs
              //       .ls(targetDownloadedImgs)
              //       .then(files => {
              //         console.log(files);
              //         //updating sync tag
              //         let imgArray = [];
              //         imgArray = this.props.selectedPhotosArray;

              //         console.log(imgArray);
              //         for (let j = 0; j < files.length; j++) {
              //           const elmP = files[j];

              //           let el_ = _.find(imgArray, { fileName: elmP }) ?? null;
              //           if (el_ == null) {
              //             let obj = {
              //               fileData: '',
              //               fileName: elmP,
              //               fileUri: folderPath + '/' + elmP,
              //               selected: false,
              //               synced: true,
              //             };
              //             imgArray.push(obj)
              //           } else {

              //             el_.synced = true;
              //             imgArray[el_].synced = true;
              //           }

              //           console.log('====================================');
              //           console.log(imgArray);
              //           console.log('====================================');
              //           this.props.getSelectedPhotosArray(imgArray);

              //         }



              //       })
              //       .catch(error => {
              //         console.log(error);

              //         this.setState({
              //           downloadSyncModal: false
              //         })
              //       });




              //     this.setState({
              //       downloadStatus: 'Completed',
              //     });
              //     this.setState({
              //       downloadSyncModal: false
              //     })
              //     this.getPhotosfromFolder();
              //   })
              //   .catch(error => {
              //     console.error(error);
              //   });

            })
            .catch(error => {
              console.error(error);
            });


        } else {
          this.setState({
            downloadSyncModal: false
          })
          showMessage({
            message: 'KINGS SEEDS',
            description: 'There are no images to download',
            type: 'warning',
            autoHide: true,
          });
        }


        // Beware that when using a file path as Image source on Android,
        // you must prepend "file://"" before the file path

      }).catch((errorMessage, statusCode) => {
        // error handling

      })







  }



  async saveDataForTileAndroid(tile) {

    this.setState({
      downloadSyncModal: true,
      downloadStatus: 'downloading images...',
    });

    let data = {
      AccCode: this.props.accCode,
      AddressID: this.props.addressId,
    };

    console.log(data);


    let acc_code = this.props.accCode;
    let Address_ID = this.props.addressId;

    let token = this.props.loginToken;
    console.log(acc_code + ' ' + Address_ID);

    const dirs = RNFetchBlob.fs.dirs;

    const folderPath = `${dirs.DownloadDir}/KingsSeeds`;

    const rsp = await RNFetchBlob
      .config({
        fileCache: true,
        // by adding this option, the temp files will have a file extension
        appendExt: 'zip',

      })
      .fetch('POST', `${getBaseUrl()}Sync/GetImages`, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }, JSON.stringify(data))
      .progress((received, total) => {
        console.log('progress', received / total);
      })
      .then((res) => {

        let status = res.info().status;

        if (status == 200) {
          // the conversion is done in native code
          let base64Str = res.base64()

        }
        else {
          //alert('Something went wrong')
        }



        // the temp file path with file extension `png`
        console.log('The file saved to 1x', res.path())

        const sourcePath = folderPath + '/file1.zip';
        const targetPath = DocumentDirectoryPath;
        const targetDownloadedImgs = folderPath + '/downloaded/';
        const charset = 'UTF-8';


        if (res.respInfo.status == 200) {
          this.setState({
            downloadStatus: 'Unzipping images...',
          });
          unzip(res.path(), targetPath, charset)
            .then(path => {
              //unzip to unzip images folder
              console.log(`unzip completed (unzip) at ${path}`);


              //   this.setState({
              //   downloadStatus: 'Completed',
              // });
              // this.setState({
              //   downloadSyncModal:false
              // })
              // this.getPhotosfromFolder();

              // unzip(sourcePath, targetPath, charset)
              //   .then(path => {
              //     //unzip to the folder
              //     console.log(`unzip completed at ${path}`);


              //     RNFetchBlob.fs
              //       .ls(targetDownloadedImgs)
              //       .then(files => {
              //         console.log(files);
              //         //updating sync tag
              //         let imgArray = [];
              //         imgArray = this.props.selectedPhotosArray;

              //         console.log(imgArray);
              //         for (let j = 0; j < files.length; j++) {
              //           const elmP = files[j];

              //           let el_ = _.find(imgArray, { fileName: elmP }) ?? null;
              //           if (el_ == null) {
              //             let obj = {
              //               fileData: '',
              //               fileName: elmP,
              //               fileUri: folderPath + '/' + elmP,
              //               selected: false,
              //               synced: true,
              //             };
              //             imgArray.push(obj)
              //           } else {

              //             el_.synced = true;
              //             imgArray[el_].synced = true;
              //           }

              //           console.log('====================================');
              //           console.log(imgArray);
              //           console.log('====================================');
              //           this.props.getSelectedPhotosArray(imgArray);

              //         }



              //       })
              //       .catch(error => {
              //         console.log(error);

              //         this.setState({
              //           downloadSyncModal: false
              //         })
              //       });




              this.setState({
                downloadStatus: 'Completed',
              });
              this.setState({
                downloadSyncModal:false
              })
              this.getPhotosfromFolder();

            })
            .catch(error => {
              console.error(error);
                 this.setState({
                downloadStatus: 'Completed',
              });
              this.setState({
                downloadSyncModal:false
              })
              this.getPhotosfromFolder();
            });


        } else {
          this.setState({
            downloadSyncModal: false
          })
          showMessage({
            message: 'KINGS SEEDS',
            description: 'There are no images to download',
            type: 'warning',
            autoHide: true,
          });
        }


        // Beware that when using a file path as Image source on Android,
        // you must prepend "file://"" before the file path

      }).catch((errorMessage, statusCode) => {
        // error handling

      })







  }


  async saveDataForTile(tile) {



    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
        // this.actualDownload();
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
      console.warn(err);
    }

    const dirs = RNFetchBlob.fs.dirs;


    // const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${tile.slice(0, 8)}/${tile}.osm.xml`
    const folderPath = RNFetchBlob.fs.dirs.DownloadDir + '/KingsSeeds/';

    const res = await this.check(folderPath);


    let data = {
      AccCode: this.props.accCode,
      AddressID: this.props.addressId,
    };

    let acc_code = this.props.accCode;
    let Address_ID = this.props.addressId;

    let token = this.props.loginToken;
    console.log(acc_code + ' ' + Address_ID);


    try {
      const rsp = await RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          path: `${dirs.DownloadDir}/test.zip`,
          useDownloadManager: true,
          mime: 'application/zip',
          notification: true,
          mediaScannable: true,
          title: 'test.zip',

        }
      }).fetch(
        'POST',
        `${getBaseUrl()}Sync/GetImages`,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Cookie': 'CMSPreferredUICulture=en-gb',
          'Cache-Control': 'no-store'
        },
        JSON.stringify(data),
      ).then((res) => {
        let status = res.info().status;

        if (status == 200) {
          // the conversion is done in native code
          let base64Str = res.base64()
          // the following conversions are done in js, it's SYNC
          let text = res.text()
          let json = res.json()
        } else {
          // handle other status codes
        }
      })
        // Something went wrong:
        .catch((errorMessage, statusCode) => {
          // error handling

        })


      // if (rsp.info().status !== 200) {
      //   console.log(`${url} failed with status code ${rsp.info().status}: ${await rsp.text()}`)
      //   throw new Error(`Request to ${url} failed with status code ${rsp.info().status}`)
      // }

      alert('ok');
    } catch (e) {
      console.log(e);
      alert('保存失败');
    }

    // RNFetchBlob
    //     .config({
    //         fileCache: true,
    //         path: folderPath + 'file1.zip',
    //         addAndroidDownloads : {
    //             useDownloadManager : true, // <-- this is the only thing required
    //             // Optional, override notification setting (default to true)
    //             notification : false,
    //             // Optional, but recommended since android DownloadManager will fail when
    //             // the url does not contains a file extension, by default the mime type will be text/plain
    //             mime : 'text/plain',
    //             description : 'File downloaded by download manager.'
    //         }
    //     })
    //     .fetch('GET', 'http://example.com/file/somefile')
    //     .then((resp) => {
    //       // the path of downloaded file
    //       resp.path()
    //     })



  }


  async check(bookUrl) {


    const res = await RNFetchBlob.fs.exists(bookUrl);

    return res;
  }


  async downloadImages_() {
    // downloadImages();
    //  accCode: state.findStore.accCode,
    //   addressId: state.findStore.addressId

    // this.setState({
    //   downloadSyncModal: true,
    //   downloadStatus: 'downloading images...',
    // });



    let acc_code = this.props.accCode;
    let Address_ID = this.props.addressId;

    let token = this.props.loginToken;
    console.log(acc_code + ' ' + Address_ID);



    const folderPath = RNFetchBlob.fs.dirs.PictureDir + '/KingsSeeds/';


    try {
      // 下载图片


      // await RNFetchBlob.config({
      //   fileCache: true,
      //   path: folderPath + 'file1.zip',
      // }).close().fetch('POST', `${getBaseUrl()}/token`);
      // // await FetchBlob.fs.scanFile([{ path: Dirs.DCIMDir + imageName, mime: '' }]);


      const rsp = await RNFetchBlob.config({
        fileCache: true,
        path: folderPath + 'file1.zip',
      }, close).fetch('POST', `${getBaseUrl()}/token`)
      // .then((response) =>{
      //   rsp.close();
      // });

      // RNFetchBlob.config({
      //   fileCache: true,
      //   path: folderPath + 'file1.zip',
      // })
      //   .fetch(
      //     'POST',
      //     `${getBaseUrl()}/token`,
      //     {
      //       Authorization: `Bearer ${token}`,
      //       'Content-Type': 'application/json',
      //     },
      //     JSON.stringify(data),
      //   )
      alert('ok');
    } catch (e) {
      console.log(e);
      alert('保存失败');
    }

    RNFetchBlob.config({
      fileCache: true,
      path: folderPath + 'file1.zip',
    })
      .fetch(
        'POST',
        `${getBaseUrl()}/token`,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        JSON.stringify(data),
      )
      .progress((received, total) => {
        console.log('progress', received / total);
      })
      .then(res => {
        // the temp file path
        console.log(res.respInfo.status); //https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip
        console.log('The file saved to ', res.path());

        const sourcePath = folderPath + '/file1.zip';
        const targetPath = folderPath;

        const targetDownloadedImgs = folderPath + '/downloaded/';
        const charset = 'UTF-8';
        // charset possible values: UTF-8, GBK, US-ASCII and so on. If none was passed, default value is UTF-8

        if (res.respInfo.status == 200) {
          this.setState({
            downloadStatus: 'Unzipping images...',
          });
          unzip(sourcePath, targetDownloadedImgs, charset)
            .then(path => {
              //unzip to unzip images folder
              console.log(`unzip completed (unzip) at ${path}`);

              unzip(sourcePath, targetPath, charset)
                .then(path => {
                  //unzip to the folder
                  console.log(`unzip completed at ${path}`);


                  RNFetchBlob.fs
                    .ls(targetDownloadedImgs)
                    .then(files => {
                      console.log(files);
                      //updating sync tag
                      let imgArray = [];
                      imgArray = this.props.selectedPhotosArray;

                      console.log(imgArray);
                      for (let j = 0; j < files.length; j++) {
                        const elmP = files[j];

                        let el_ = _.find(imgArray, { fileName: elmP }) ?? null;
                        if (el_ == null) {
                          let obj = {
                            fileData: '',
                            fileName: elmP,
                            fileUri: 'file:///storage/emulated/0/Pictures/KingsSeeds/' + elmP,
                            selected: false,
                            synced: true,
                          };
                          imgArray.push(obj)
                        } else {
                          imgArray[el_].synced = true;
                        }
                        this.props.getSelectedPhotosArray(imgArray);

                      }



                    })
                    .catch(error => console.log(error));




                  this.setState({
                    downloadStatus: 'Completed',
                  });
                  this.getPhotosfromFolder();
                })
                .catch(error => {
                  console.error(error);
                });

            })
            .catch(error => {
              console.error(error);
            });


        } else {
          this.setState({
            downloadSyncModal: false
          })
          showMessage({
            message: 'KINGS SEEDS',
            description: 'No images found!!',
            type: 'warning',
            autoHide: true,
          });
        }
      }).catch(error => {
        this.setState({
          downloadSyncModal: false
        })
      });
  };

  render() {
    const { modalVisible } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {this.props.storeModal == true ? <PhotoSyncModal /> : null}
          <ConfirmationBox
            showHide={this.state.showdialog}
            yes={() => {
              
              this.deleteImage();
    
                // this.setState({ isConnected: state.isConnected });
               
              
          
            }}
            no={() => this.closeConfirmation()}
            contentText={this.state.contentText}
          />

          <Modal
            animationType="none"
            //fade , none,slide use for animation type
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible);
            }}>
            <View style={sty.centeredView}>
              <View style={sty.modalView}>
                <View
                  style={{
                    height: '7%',
                    width: '100%',
                    flexDirection: 'row',
                    borderColor: '#e6e6e6',
                    borderBottomWidth: 1,
                  }}>
                  {/* <Text
                    style={{
                      marginTop: hp("0.8"),
                      marginLeft: wp("2"),
                      fontSize: hp("1.7"),
                      fontWeight: "bold",
                      fontFamily: Fonts.PoppinsBold,
                    }}
                  >
                    Send Photos
                  </Text> */}
                  <TouchableOpacity
                    style={{
                      width: '8.5%',
                      height: '100%',
                      position: 'absolute',
                      right: 2,
                    }}
                    onPress={() => {
                      this.setModalVisible(!modalVisible);
                    }}>
                    <Image source={multiply} style={sty.cardImg1} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    height: hp('45'),
                    width: '95%',
                    alignSelf: 'center',
                    marginTop: hp('1'),
                  }}>
                  <ImageBackground
                    blurRadius={10}
                    source={{ uri: this.state.selectedImgUri }}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}>
                    <Image
                      //  source={list}
                      //  blurRadius={2}
                      source={{ uri: this.state.selectedImgUri }}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                        backgroundColor: 'transparent',
                      }}
                    />
                  </ImageBackground>
                </View>
                {/* <Text style={sty.modalText}>Hello World!</Text>
                <TouchableOpacity
                  style={[sty.button, sty.buttonClose]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={sty.textStyle}>Hide Modal</Text>
                </TouchableOpacity> */}
                <View
                  style={{
                    width: '95%',
                    alignSelf: 'center',
                    height: hp('5'),
                    marginTop: hp('1'),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      //   this.deleteImage(this.state.selectedImgUri);
                      
                      
                      NetInfo.fetch().then(state => {
                        if (state.isConnected) {
                          this.deleteImage();
                          // this.setModalVisible(!modalVisible);

                          // this.confirmShowHide(
                          //   'Are you sure you want to delete this image?',
                          // );
                        }else{
                           showMessage({
                             message: 'KINGS SEEDS',
                             description: "Please check the Network Connection",
                             type: 'warning',
                             autoHide: true,
                           });
                           
                         }

                       
                      });

                      
                    }}
                    style={styles.modalDelete}>
                    <Image source={del} style={styles.addIcon} />
                    <Text style={styles.modaldelTxt}>DELETE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <DownloadPhotosModal
            modalvisible={this.state.downloadSyncModal}
            status_D={this.state.downloadStatus}
            setvisibilty={this.setDownloadModalvisibility}
          />

          <View style={sty.titleView}>
            {/* <View style={styles.contactTitle}>
              <Text style={styles.titleTxt} allowFontScaling={false}>
                Photos
              </Text>
            </View> */}
            <TouchableOpacity
              style={styles.sendCustomerBtn1}
              // onPress={() => {
              //   this.props.navigation.navigate(addStoreAddress();
              // }}
              onPress={() => {
                // this.saveDataForTile();


                NetInfo.fetch().then(state => {
    
                  // this.setState({ isConnected: state.isConnected });
                 if (state.isConnected) {
                    if (Platform.OS === 'android') {
                      this.saveDataForTileAndroid();
                    }else{
                      this.saveDataForTileNew();
                    }
                    
    
                 }else{
                  
                    showMessage({
                      message: 'KINGS SEEDS',
                      description: "Please check the Network Connection",
                      type: 'warning',
                      autoHide: true,
                    });
                  }
              
              
                });
              

                
                
                
                
                // this.saveDataForTileNewNew();
              }
              }>
              <Image source={share} style={styles.addIcon} />
              <Text style={styles.newContactTxt} allowFontScaling={false}>
                Download Sync
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sendCustomerBtn}
              // onPress={() => {
              //   this.props.navigation.navigate(addStoreAddress();
              // }}
              onPress={() => {

                NetInfo.fetch().then(state => {
    
                  // this.setState({ isConnected: state.isConnected });
                 if (state.isConnected) {
                  this.syncImages();
                 }else{
                  
                    showMessage({
                      message: 'KINGS SEEDS',
                      description: "Please check the Network Connection",
                      type: 'warning',
                      autoHide: true,
                    });
                  }
              
              
                });
              

                
              }}>
              <Image source={share} style={styles.addIcon} />
              <Text style={styles.newContactTxt} allowFontScaling={false}>
                Upload Sync
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addCustomerBtn}
              onPress={() => {
                this.props.navigation.navigate('storeNew', {
                  tab: 8,
                  subTabVal: 'addPhoto',
                });
                //  this.props.navigation.navigate(addNewPhotos();
              }}>
              <Image source={filter} style={styles.addIcon} />
              <Text style={styles.newContactTxt} allowFontScaling={false}>
                Add New Photos
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: hp('64.5%') }}>
            <FlatGrid
              // itemDimension={185}
              itemDimension={gridSize}
              data={this.state.resData}
              style={sty.gridView}
              spacing={hp('1')}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[sty.itemContainer]}
                  //   { backgroundColor: item.code }
                  // onPress={() => {
                  //   this.setSelectedPhoto(item.fileName, item.selected);
                  // }}
                  onPress={() => {
                    
                    this.setModalVisible(!modalVisible);
                    this.setState({
                      selectedImgUri: item.fileUri,
                    });
                    //this.selectedImgUri(item.fileUri)
                  }}>
                  <View
                    style={[
                      {
                        width: '100%',
                        height: '80%',
                        marginTop: '0%',
                        justifyContent: 'flex-end',
                        //   alignItems: "center",
                        position: 'absolute',
                        top: 3,
                        right: 1.6,
                      },
                      item.synced != true && item.selected == true
                        ? {
                          borderWidth: wp('0.4'),
                          borderRadius: wp('2'),
                          borderColor: '#2CDC0B',
                        }
                        : null,
                    ]}>
                    <Image
                      //  source={list}
                      source={{uri: item.fileUri}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: wp('1.5'),
                      }}
                    />
                    {/* {item.synced === true ? (
                      <Image
                      //  source={list}
                      source={{ uri: item.fileUri }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: wp("1.5"),
                      }}
                    />
                      ) : <Image
                      //  source={list}
                      source={{ uri: item.fileUri }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: wp("1.5"),
                        opacity:0.3,
                      }}
                    />} */}

                    {/* <Image source={list} /> */}
                  </View>
                  <TouchableOpacity
                    style={{
                      zIndex: 1,
                      width: hp('2'),
                      height: hp('2'),
                      backgroundColor: 'white',
                      borderColor: '#CCC',
                      borderWidth: wp('0.2'),
                      position: 'absolute',
                      left: 3,
                      bottom: 3,
                      borderRadius: hp('2') / 2,
                    }}
                    onPress={() => {
                      this.setSelectedPhoto(item.fileName, item.selected);
                    }}>
                    {item.selected === true ? (
                      <Image source={checkIcn} style={sty.cardImgCheck} />
                    ) : null}
                  </TouchableOpacity>
                  {item.synced === true ? (
                    <Text style={sty.itemName}>Synced</Text>
                  ) : (
                    <Text style={[sty.itemName, { color: colors.tertiaryColor }]}>Sync</Text>
                  )}

                  {/* <Text style={sty.itemName}>{item.fileName}</Text> */}
                </TouchableOpacity>
              )}
            />
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
    selectedPhotosArray: state.storePhotos.selectedPhotosArray,
    accCode: state.findStore.accCode,
    addressId: state.findStore.addressId,
    storeModal: state.storePhotos.storeModal,
  };
};

export default connect(mapStateToProps, {
  getSelectedPhotosArray,
  getStoreModal,
})(StorePhotos);

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
    width: wp("15"),
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
    height: hp("4"),
    borderColor: "#e6e6e6",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: hp("1"),
    marginTop: hp("1.1%"),
    borderWidth: hp("0.11"),
  },
  cardImgCheck: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: hp("2") / 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: wp("70%"),
    height: hp("57%"),
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
  //modal end

  cardImg1: {
    flex: 1,
    aspectRatio: 0.8,
    resizeMode: "contain",
    borderRadius: 1,
  },
  gridView: {
    width: wp("97%"),
    marginTop: 10,
    flex: 1,
    height: hp("70%"),
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: wp("0.4"),
    height: hp("17"),
  },
  itemName: {
    marginTop: hp("0.1"),
    fontSize: hp("1.5"),
    color: colors.primaryColor,
    marginLeft: wp("5"),
  },
  itemCode: {
    fontSize: 12,
    color: colors.primaryColor,
  },
  titleView: {
    width: "94%",
    height: hp("5"),
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: hp("1"),
    alignItems: "center",
  },
});
