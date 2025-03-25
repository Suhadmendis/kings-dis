import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/routers";
import { useNavigation } from "@react-navigation/core";

export const logOut = (props) => async dispatch => {

  // const navigation = useNavigation();

  // console.log('logOut', props);
    try {
        AsyncStorage.removeItem("Token");
        AsyncStorage.clear();
        // props.navigation.navigate('signIn');
        props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'signIn' },
              ]
            })
          );

        dispatch({ type: 'SIGN_OUT' })
    } catch (error) {
        console.log(error)
    }
    return '';
}
export const accountRemove = (props) => async dispatch => {
  try {

    dispatch({ type: 'ACCOUNT_REMOVE' })

} catch (error) {
    console.log(error)
}
}