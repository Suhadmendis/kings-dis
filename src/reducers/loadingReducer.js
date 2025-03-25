const INITIAL_STATE = {
  loading: false,
  spinner: true,
  userName: '',
  password: '',
  connectionStatus: true,
  syncProcessStatus: false,
  connectionSyncTrigger: '0',
  logout:false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true };
    case 'CustomSpinner:SHOW':
      return { ...state, spinner: true };
    case 'CustomSpinner:HIDE':
      return { ...state, spinner: false };
      case 'logout:true':
      return { ...state, logout: true };
    case 'logout:false':
      return { ...state, logout: false };
    case 'UPDATE_CONNECTION_STATUS':
      return { ...state, connectionStatus: action.payload };
    case 'UPDATE_SYNC_PROCESS_STATUS':
      return { ...state, syncProcessStatus: action.payload };
    case 'UPDATE_CONNECTION_SYNC_TRIGGER':
      return { ...state, connectionSyncTrigger: action.payload };
    case 'SIGN_OUT':
      return { 
        ...state,
        loading: false,
        spinner: true,
        userName: '',
        password: '',
        connectionStatus: true,
        syncProcessStatus: false,
        connectionSyncTrigger: '0',
        logout:false
      };
    default:
      return state;
  }
};
