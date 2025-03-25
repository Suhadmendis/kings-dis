import { showMessage } from 'react-native-flash-message';
import { store } from '../../configureStore';

export const checkDiscounts = () => {
   

    if (checkDiscountStatus()) {
        return true;
    } else {
        showMessage({
                    message: 'KINGS SEEDS',
                    description: `Please add discounts for this user to proceed`,
                    type: 'warning',
                    autoHide: true,
                });
                return false;
       
    }
}

const checkDiscountStatus = () => {
    let state = store.getState();

    let { pictorialPacketDiscount, openPollinatedDiscount, f1f2Discount, mail_order } = state.cart;

    if (!pictorialPacketDiscount || !openPollinatedDiscount || !f1f2Discount || !mail_order) {
        return false;
    }
    if (pictorialPacketDiscount == ''||pictorialPacketDiscount == 'null'||pictorialPacketDiscount == 'NaN') {
        return false;
    }
    if (openPollinatedDiscount == ''||openPollinatedDiscount == 'null'||openPollinatedDiscount == 'NaN') {
        return false;
    }
    if (f1f2Discount == ''||f1f2Discount == 'null'||f1f2Discount == 'NaN') {
        return false;
    }
    if (mail_order == ''||mail_order == 'null'||mail_order == 'NaN') {
        return false;
    }

    return true;
}
