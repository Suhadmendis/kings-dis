import URL from '../url/baseUrl';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../navigation/RootNavigation';
import {userLogOut} from "./HomeScreenAction";
import getBaseUrl from '../url/getBaseUrl';

export const UpdateProfileDetails = async (l_token, username, fname,lname,email,phone) => {

    if (l_token != 'blank') {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${l_token}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

        var raw = JSON.stringify({
            "FirstName": fname,
            "LastName": lname,
            "Email": email,
            "UserPhone": phone
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };


        fetch(`${getBaseUrl()}Account/EditProfile`, requestOptions)
          .then(response => response.text())
          .then(result => {
            const res = JSON.parse(result);
            // console.log("api results: "+JSON.stringify(result));
            // this.setState({ data: products });
            if(res["error"]!==""){
              showMessage({
              message: 'KINGS SEEDS',
              description: res["error"],
              type: 'warning',
              autoHide: true,
            });
         }
         else if(res["usernameChanged"]=== true){
          showMessage({
            message: 'KINGS SEEDS',
            description: 'Email changed. Please login again.',
            type: 'success',
            autoHide: true,
          });
              userLogOut();
         }
         else{
          showMessage({
            message: 'KINGS SEEDS',
            description: 'Profile edited!!',
            type: 'success',
            autoHide: true,
          });
         }

          })
          .catch(error => console.log('api error', error));

        } catch (error) {
          console.log(error);
        }
    }

  }

  export const ResetPasswordDetails = async (l_token, currentPassword, newPassword, conformPassword, navigation) => {
    // console.log('reset password m');
    if (l_token != 'blank') {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${l_token}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

        var raw = JSON.stringify({
            "ExistingPassword": currentPassword,
            "NewPassword": newPassword,
            "ConfirmPassword": conformPassword
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };


        fetch(`${getBaseUrl()}Account/ChangePassword`, requestOptions)
          .then(response => response.text())
          .then(result => {
            const res = JSON.parse(result);
           console.log(res["error"]);

           if(res["error"]!==""){
                showMessage({
                message: 'KINGS SEEDS',
                description: res["error"],
                type: 'warning',
                autoHide: true,
              });
           }
           else{
            navigation.navigate("home", { screen: "home", time: Date.now() })
            showMessage({
              message: 'KINGS SEEDS',
              description: 'Password changed! Please login with your new password',
              type: 'success',
              autoHide: true,
            });
              userLogOut();
           }

          })
          .catch(error => console.log('api error', error));

        } catch (error) {
          console.log(error);
        }
    }

  }

 
