import getBaseUrl from '../../url/getBaseUrl';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { DrawerActions } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/core';
import { CommonActions } from "@react-navigation/routers";
import { getLoginToken } from '../../actions/LoginScreenAction';



 async function LoginFunction(email, password, navigation, edit) {
   console.log(email);
    let obj = {
        grant_type: 'password',
        Username: email,
        Userpassword: password,
        // Usersecret: 'a123456789',
      };
      await URL.post('token', obj)
        .then(response => {
          // console.log(response.data);
          // console.log(response.data.auth_token);
        //   dispatch({
        //     type: 'GET_USER_LOGIN_TOKEN',
        //     payload: response.data.auth_token,
        //   });

          getLoginToken(response.data.auth_token)
          AsyncStorage.setItem('Token', JSON.stringify(response.data.auth_token));
          
          if (response.data.auth_token !== null) {
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
                  { name: 'drawer', screen: 'home', },
                ]
              })
            );
            return { code: '00', message: 'login success'};
          } else {
              console.log('====function======');
              return { code: '00', message: 'Please enter valid username and password'};
            //return 'Your login attempt was not successful. Please try again'
            // showMessage({
            //   message: 'KINGS SEEDS',
            //   description: 'Your login attempt was not successful. Please try again',
            //   type: 'warning',
            //   autoHide: true,
            // });
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
  
}

export default LoginFunction;





