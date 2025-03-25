import URL from '../url/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from "@react-navigation/routers";
import openDatabaseService from '../offline/Config';

import createTable from '../offline/storeData/createTable';
import totalSync from '../offline/storeData/dataProvider';
import insertData from '../offline/storeData/insertData';
import inspectTable from '../offline/storeData/inspectTable';
import { isOffline } from '../components/common/OfflineToggle';
import { isTableExist } from '../components/common/AppVersion';

export const getUserName = text => async dispatch => {
  dispatch({
    type: 'GET_USER_NAME',
    payload: text,
  });
};

export const getPassword = text => async dispatch => {
  dispatch({
    type: 'GET_PASSWORD',
    payload: text,
  });
};

export const getLoginToken = text => async dispatch => {
  dispatch({
    type: 'GET_USER_LOGIN_TOKEN',
    payload: text,
  });
};

export const getExpiryDate = text => async dispatch => {
  dispatch({
    type: 'GET_USER_EXPIRY_DATE',
    payload: text,
  });
};

export const LoginUser = (email, password, navigation) => async dispatch => {
  try {
    let obj = {
      grant_type: 'password',
      Username: email,
      Userpassword: password,
      // Usersecret: 'a123456789',
    };
    let response = await URL.post('token', obj);

    // console.log(response.data);
    // console.log(response.data.auth_token);
    if ((response.data?.auth_token ?? null) == null) {
      if ((response.data?.error ?? "") !== "") {
        return {code: '01', message: response.data.error};
      } else {
        return {code: '01', message: 'Your login attempt was not successful. Please try again'};
      }
      // showMessage({
      //   message: 'KINGS SEEDS',
      //   description: 'Your login attempt was not successful. Please try again',
      //   type: 'warning',
      //   autoHide: true,
      // });
    }



    await insertInitialTables(response.data.auth_token).then((res) => {

      if (res == "ok") {
        if ((response.data?.auth_token ?? null) !== null) {
          dispatch({
            type: 'GET_USER_LOGIN_TOKEN',
            payload: response.data.auth_token,
          });
          AsyncStorage.setItem('Token', JSON.stringify(response.data.auth_token));
          dispatch({
            type: 'GET_USER_EXPIRY_DATE',
            payload: response.data.date_expiry,
          });
          AsyncStorage.setItem('ExpiryDate', JSON.stringify(response.data.date_expiry));
          dispatch({
            type: 'GET_FULL_NAME',
            payload: response.data.account_info.customerFirstName + ' ' + response.data.account_info.customerLastName
          });
          dispatch({
            type: 'GET_USER_ROLES',
            payload: response.data.user_roles
          });
          dispatch({
            type: 'ACCOUNT_INFO',
            payload: response.data.account_info
          });
          // showMessage({
          //   message: 'KINGS SEEDS',
          //   description: 'Login Success',
          //   type: 'success',
          //   autoHide: true,
          // });
          navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {name: 'drawer', screen: 'home',},
                ]
              })
          );
          return {code: '00', message: 'Your login attempt was successful'};
        } else {
          if ((response.data?.error ?? "") !== "") {
            return {code: '01', message: response.data.error};
          } else {
            return {code: '01', message: 'Your login attempt was not successful. Please try again'};
          }
          // showMessage({
          //   message: 'KINGS SEEDS',
          //   description: 'Your login attempt was not successful. Please try again',
          //   type: 'warning',
          //   autoHide: true,
          // });
        }
      }
    });


  } catch (error) {
    console.log("login error: ", error.message);
    return {code: '01', message: 'Your login attempt was not successful. Please try again'};
  }
};




async function insertInitialTables(loginToken) {

  // const syncType = 'FULL SYNC';


  //       Main(
  //         loginToken,
  //         this.getnNewProducts,
  //         this.startChangeStatus,
  //         this.endChangeStatus,
  //         syncType
  //       );

  const int_Navigation = await getApiData(loginToken, 'local_int_navigation', true); // done
  const int_Nav_Attributes = await getApiData(loginToken, 'local_int_nav_attributes', true); // done

  const isInfoExist = await isTableExist('local_info');
  if (!isInfoExist) {
    await createTable('local_info');
    await isOffline();
  }
  

  const db = openDatabaseService();


  return new Promise((resolve, reject) => {






          resolve('ok')
    // db.transaction(tx => {
    //   setTimeout(() => {
    //     resolve('ok');

    //   }, 5000);

    // });
  });
}



startChangeStatus = () => {

};

endChangeStatus = () => {

};

getnNewProducts = () => {

};





async function getApiData(token, tableName, isInitial) {


  const created = await createTable(tableName);
  console.log(created);
  const data = await totalSync(token, tableName);
  console.log(`API Data - ${data.length}`);
  const dataAdded = await insertData(tableName, data, isInitial);
  console.log(dataAdded.length);
  return tableName;
}


// async function tableDataOperation(token, tableName, isInitial) {

//   console.log(`${tableName} started`);
//   let inspected;


//       console.log(`${tableName} - Table doesn't Exist`);

//       const created = await createTable(tableName);

//       if(created[0].created == 1){
//           console.log(`Table Created: ${tableName}`);

//           let lastUpdate = null;



//           const data = await totalSync(token, tableName, lastUpdate);
//           console.log(`API Data - ${data.length}`);

//           const dataAdded = await insertData(tableName, data, isInitial);
//           console.log(dataAdded.length);

//       }else{
//           console.log(`Table Schema Not Found in Code: ${tableName}`);
//       }


//   console.log(`${tableName} ended`);
//   return tableName;
// }
