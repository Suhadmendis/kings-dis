const INITIAL_STATE = {
  userName: '',
  password: '',
  loginToken: '',
  expiryDate:'',
  fullName: '',
  userRole:'',
  accountInfo: null,
  tknExpireCheck: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_USER_NAME':
      return {...state, userName: action.payload};
    case 'GET_PASSWORD':
      return {...state, password: action.payload};
    case 'GET_USER_LOGIN_TOKEN':
      // console.log('Call');
      // console.log(action.payload);
      return {...state, loginToken: action.payload};
    case 'GET_USER_EXPIRY_DATE':
        return {...state, expiryDate: action.payload};
    case 'GET_FULL_NAME':
        return {...state, fullName: action.payload};
    case 'GET_USER_ROLES':
        return {...state, userRole: action.payload};
    case 'ACCOUNT_INFO':
      return {...state, accountInfo: action.payload};
    case 'SIGN_OUT':
      return { 
        ...state,
        userName: '',
        password: '',
        loginToken: '',
        expiryDate:'',
        fullName: '',
        userRole:'',
        accountInfo: null,
        tknExpireCheck: true
      };
    default:
      return state;
  }
};
