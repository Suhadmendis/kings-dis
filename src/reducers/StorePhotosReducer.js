const INITIAL_STATE = {
  photosArray: [],
  selectedPhotosArray: [],
  syncedPhotosArray: [],
  storeModal:false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_PHOTOS_ARRAY":
      return { ...state, photosArray: action.payload };
    case "GET_SELECTED_PHOTOS_ARRAY":
      return { ...state, selectedPhotosArray: action.payload };
    case "GET_STORE_MODAL":
      return { ...state, storeModal: action.payload };
    // case 'SIGN_OUT':
    //   return {
    //     ...state,
    //     photosArray: [],
    //     selectedPhotosArray: [],
    //     syncedPhotosArray: [],
    //     storeModal:false
    //   };
    default:
      return state;
  }
};
