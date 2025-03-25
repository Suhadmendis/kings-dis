
const INITIAL_STATE = {
    deliveryPrice: 0,
    deliveryTax: 0,
    shippingAddress: null,
    billingAddress: null,
    deliveryOption: null,
    paymentType: 'sagepay',
    orderID: null,
    webOrderID: null,
    webOrderBillingAddressID: null,
    offlineOrder: null,
    orderDate: null,
    orderAPayment: false,
    orderNotes:'',
    registerNumber:'',
    preSeasonToggle: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_BILLING_INFO":

        let unavailableItemsList = [];



        if (action.payload.unavailableItems != 'CLEAR') {


            if (state.unavailableItems != undefined) {
                unavailableItemsList = [...state.unavailableItems];

                console.log('tracked...', state.unavailableItems);

                console.log('fff-----fetching == ' + unavailableItemsList);
                if (state.unavailableItems.length > 0) {
                    const filter_number = unavailableItemsList.filter(unavailableItem => {
                        if (unavailableItem == action.payload?.unavailableItems) {
                            return action.payload?.unavailableItems;
                        }
                    });
                    if (filter_number == 0) {
                        unavailableItemsList.push(action.payload?.unavailableItems);
                    }
                }else{
                    unavailableItemsList.push(action.payload?.unavailableItems);
                }
            }else{
                unavailableItemsList.push(action.payload?.unavailableItems);
            }
        }




    console.log('unavailableItems.toString()');
    console.log(unavailableItemsList.toString());
    console.log(action.payload.unavailableItems);
    console.log('unavailableItems.toString()');

            return {
                ...state,
                customerEmail: action.payload.customerEmail,
                deliveryPrice: action.payload.deliveryPrice,
                deliveryTax: action.payload.deliveryTax,
                shippingAddress: action.payload.shippingAddress,
                billingAddress: action.payload.billingAddress,
                deliveryOption: action.payload.deliveryOption,
                paymentType: action.payload.paymentType,
                orderID: action.payload.orderID,
                webOrderID: action.payload.webOrderID,
                webOrderBillingAddressID: action.payload.webOrderBillingAddressID,
                offlineOrder: action.payload.offlineOrder,
                orderDate: action.payload.orderDate,
                orderAPayment: action.payload.orderAPayment,
                orderNotes: action.payload.orderNotes,
                cartItemNotes: action.payload.cartItemNotes,
                unavailableItems: unavailableItemsList,
                registerNumber: action.payload.registerNumber,
            }
        case "SET UNAVAILABLEITEMS":
            return {
                ...state,
                unavailableItems: action.payload.id,
            }
        case "PRE_SEASON_TOGGLE":
            return {
                ...state,
                preSeasonToggle: action.payload.preSeasonToggle,
            }
        case 'SET_ORDER_NOTES':
            return { ...state, orderNotes: action.payload };
        case 'SET_ORDER_ID':
            console.log(action.payload)
            return { ...state, workingOrderID: action.payload.workingOrderID };
        case 'SIGN_OUT':
            return {
                ...state,
                deliveryPrice: 0,
                deliveryTax: 0,
                shippingAddress: null,
                billingAddress: null,
                deliveryOption: null,
                paymentType: 'sagepay',
                orderID: null,
                webOrderID: null,
                webOrderBillingAddressID: null,
                offlineOrder: null,
                orderDate: null,
                orderAPayment: false,
                orderNotes:''
            };

        default:
            return state
    }
}
