import _ from "lodash";
import {store} from "../../configureStore";
import {
    createLocalOrderAddress,
    createLocalOrderItem,
    createOrderLocal,
    getStatusByName
} from "../offline/Services/OrderHelper";
import {RawQuery} from "../offline/Services/DataHelper";
import {createOrder} from "../url/API";
import {GetDecimal} from "./ValidationHelper";
import {GetPaymentOptionByName} from "../offline/Services/PaymentHelper";
import MssqlDTToSqlDT from "../components/helperComponents/MssqlDTToSqlDT";

export async function callCreateOrder(cartItems, selectedBillingAddress, selectedShippingAddress, deliveryPrice, deliveryTax, selectedShippingOption, paymentType, offlineOrder,
                                      orderNote = "", orderAccountsReference = null, orderAPayment = false, orderPaymentType = null, totalPrice = 0, quoteCartID = null, OrderToEmail = "", OrderRegNumber = '') {

    let OrderType = 'Standard';

    if ((selectedBillingAddress ?? null) == null) {
        throw new Error("Invalid Billing Address");
    } else if ((selectedShippingAddress ?? null) == null) {
        throw new Error("Invalid Shipping Address");
    }





    const pictorialItems = cartItems.filter(element => element.skuDiscountCat == 'A');

    if (pictorialItems.length > 0){
        OrderType = 'Pictorial';
    }

    console.log('OrderType2221');
    console.log(OrderType);
    console.log('OrderType2221');
    let state = store.getState();
    let customerId = state.findStore.adminCustomerID;
    let loggedInUserID = state.login.accountInfo?.customerUserID ?? null;
    let unavailableItems = state.checkout.unavailableItems ?? null;
    let OrderPreseason = state.checkout.preSeasonToggle;

    if (OrderPreseason) {
        OrderPreseason = 1;
    }else{
        OrderPreseason = 0;
    }


    let newOrderStatus = await getStatusByName("New");

    let quoteOrderID = null;

    if (quoteCartID != null) {
        const quoteOrderIdRes = await RawQuery(`select ItemID from local_ct_quotes where ItemShoppingCartID = ${quoteCartID}`);

        quoteOrderID =  quoteOrderIdRes != "" ?   quoteOrderIdRes.item(0).ItemID : null;

    }





    let paymentOption = await GetPaymentOptionByName(paymentType);
    console.log("paymentOption: ", paymentOption);

    let total = 0;
    let tax = deliveryTax;
    _.map(cartItems, (i, j) => {
        total += quoteOrderID == null ? i.totalPrice : i.cartItemQuoteYourPrice; // change
        tax += i.totalTax;
    })

    let timestamp = new Date();

    timestamp = MssqlDTToSqlDT(timestamp);


    let finalTotal = total + deliveryPrice + tax;

    totalPrice = GetDecimal(totalPrice);
    if (totalPrice > 0) {
        finalTotal = totalPrice;
    }



    let data = {
        OrderID: null,
        OrderShippingOptionID: selectedShippingOption,
        OrderTotalShipping: deliveryPrice,
        OrderTotalPrice: finalTotal,
        OrderTotalTax: tax,
        OrderDate: timestamp,
        OrderStatusID: newOrderStatus.StatusID, // New
        OrderCurrencyID: 1,
        OrderCustomerID: customerId,
        OrderCreatedByUserID: loggedInUserID,
        OrderNote: orderNote,
        OrderSiteID: 1,
        OrderPaymentOptionID: paymentOption.PaymentOptionID,
        OrderInvoice: '', //?
        OrderInvoiceNumber: null,
        OrderTrackingNumber: null,
        OrderLastModified: timestamp,
        OrderTotalPriceInMainCurrency: finalTotal,
        OrderIsPaid: null, //? for cards only
        OrderCulture: 'en-GB',
        OrderDiscounts: '<Summary />',
        OrderGrandTotal: finalTotal,
        OrderGrandTotalInMainCurrency: finalTotal,
        OrderOtherPayments: '<Summary />',
        OrderTaxSummary: '<Summary />',
        OrderCouponCodes: '<CouponCodes />',
        OrderPONumber: null,
        OrderAPayment: orderAPayment,
        OrderPaymentType: orderPaymentType,
        OrderDataSetID: null,
        OrderAccountsReference: orderAccountsReference,
        LastUpdate: null,
        OrderPartShipment: null,
        OrderComments: null,
        OrderType,
        OrderInsertedToDim: null,
        OrderSageVendorTxCode: null,
        OrderReceiptInseredToDim: null,
        OrderAbandonedStatus: "7",
        OrderQuoteID: quoteOrderID,
        OrderBillingAddress: null,
        OrderShippingAddress: null,
        OrderItems: [],
        CustomerShippingAddress: null,
        OrderToEmail,
        OrderRegNumber,
        OrderPreseason,
        UnavailableItems: unavailableItems.toString()
    }
    data.OrderBillingAddress = {
        AddressID: null,
        AddressLine1: selectedBillingAddress.addressLine1,
        AddressLine2: selectedBillingAddress.addressLine2,
        AddressCity: selectedBillingAddress.addressCity,
        AddressZip: selectedBillingAddress.addressZip,
        AddressPhone: selectedBillingAddress.addressPhone,
        AddressCountryID: selectedBillingAddress.addressCountryID,
        AddressStateID: '',
        AddressPersonalName: selectedBillingAddress.addressPersonalName,
        AddressGUID: selectedBillingAddress.addressGUID,
        AddressLastModified: selectedBillingAddress.addressLastModified,
        AddressOrderID: null,
        AddressType: 1,
        AddressLine3: selectedBillingAddress.addressLine3,
        AddressLine4: selectedBillingAddress.addressLine4,
        CustomerAddressID: selectedBillingAddress.webAddressID ?? null,
        LocalCustomerAddressID: null
    };
    data.OrderShippingAddress = {
        AddressID: null,
        AddressLine1: selectedShippingAddress.addressLine1,
        AddressLine2: selectedShippingAddress.addressLine2,
        AddressCity: selectedShippingAddress.addressCity,
        AddressZip: selectedShippingAddress.addressZip,
        AddressPhone: selectedShippingAddress.addressPhone,
        AddressCountryID: selectedShippingAddress.addressCountryID,
        AddressStateID: '',
        AddressPersonalName: selectedShippingAddress.addressPersonalName,
        AddressGUID: selectedShippingAddress.addressGUID,
        AddressLastModified: selectedShippingAddress.addressLastModified,
        AddressOrderID: null,
        AddressType: 2,
        AddressLine3: selectedShippingAddress.addressLine3,
        AddressLine4: selectedShippingAddress.addressLine4,
        CustomerAddressID: selectedShippingAddress.webAddressID ?? null,
        LocalCustomerAddressID: (selectedShippingAddress.webAddressID ?? null) == null ? selectedShippingAddress.addressID : null
    };
    // can only add shipping addresses offline. therefore no need to check the billing address
    if ((selectedShippingAddress.webAddressID ?? null) == null) {
        data.CustomerShippingAddress = {
            AddressID: selectedShippingAddress.addressID,
            AddressCustomerID: selectedShippingAddress.addressCustomerID,
            AddressAccCode: selectedShippingAddress.addressAccCode,
            AddressPersonalName: selectedShippingAddress.addressPersonalName,
            AddressLine1: selectedShippingAddress.addressLine1,
            AddressLine2: selectedShippingAddress.addressLine2,
            AddressLine3: selectedShippingAddress.addressLine3,
            AddressLine4: selectedShippingAddress.addressLine4,
            AddressCity: selectedShippingAddress.addressCity,
            AddressCountryID: selectedShippingAddress.addressCountryID,
            AddressZip: selectedShippingAddress.addressZip,
            AddressPhone: selectedShippingAddress.addressPhone,
            IsDefaultBilling: false,
            IsDefaultShipping: false
        };
    }


    console.log('selected5293052');

console.log(timestamp);


    let orderID = await createOrderLocal(data);
    console.log('successfully created order in the local db', orderID);
    //setting the order ID
    data.OrderID = orderID;
    data.OrderBillingAddress.AddressOrderID = orderID;
    data.OrderShippingAddress.AddressOrderID = orderID;

    cartItems.map(i => {


        data.OrderItems.push({
            OrderItemID: null,
            orderItemOrderID: orderID,
            orderItemSKUID: i.skuid,
            orderItemSKUName: i.skuName,
            orderItemUnitPrice: i.unitPrice,
            orderItemUnitCount: i.quantity,
            orderItemCustomData: null,
            orderItemGuid: null,
            orderItemParentGuid: null,
            orderItemLastModified: null,
            orderItemValidTo: null,
            orderItemBundleGUID: null,
            orderItemTotalPriceInMainCurrency: quoteOrderID == null ? i.totalPrice : i.cartItemQuoteYourPrice, // change
            orderItemSendNotification: null,
            orderItemText: i.priceOption,
            orderItemProductDiscounts: null,
            orderItemDiscountSummary: null,
            orderItemTotalPrice: quoteOrderID == null ? i.totalPrice : i.cartItemQuoteYourPrice, // change
            orderItemUnitListPrice: i.unitPrice,
            orderItemUnitDiscount: null,
            orderItemDiscountRate: 0,
            orderItemDataSetID: null,
            orderItemAccountsReference: null,
            orderItemOrderInvoiceNumber: null,
            orderItemQtyDelivered: null,
            orderItemQtyInvoiced: null,
            orderInvoiceNumber: null,
            orderInsertedToDim: null,
            od_OHID_DSID: null,
            batchName: null,
            orderItemPriceLine: i.priceLine,
            orderItemNote: i.itemNote,
            orderItemBackCard: i.backingCard
        })
    })


    let billingAddressID = await createLocalOrderAddress(data.OrderBillingAddress);
    console.log('successfully created order billing address in the local db', billingAddressID);
    //setting the order address id
    data.OrderBillingAddress.AddressID = billingAddressID;

    let shippingAddressID = await createLocalOrderAddress(data.OrderShippingAddress);
    console.log('successfully created order shipping address in the local db', shippingAddressID);
    //setting the order address id
    data.OrderShippingAddress.AddressID = shippingAddressID;

    for (let index = 0; index < data.OrderItems.length; index++) {
        const orderItem = data.OrderItems[index];
        const orderItemID = await createLocalOrderItem(orderItem);
        console.log(orderItem.orderItemSKUID, 'successfully created order item in the local db', orderItemID);
        //setting the order item id
        data.OrderItems[index].OrderItemID = orderItemID;
    }



    store.dispatch({
        type: 'SET_ORDER_ID',
        payload: {
            workingOrderID: orderID
        }
    });


    let webOrderID = null;
    console.log(JSON.stringify({...data}, null, 2));
    if (offlineOrder) {

        store.dispatch({
            type: "PRE_SEASON_TOGGLE",
            payload: {
              preSeasonToggle: false,
            },
          });


        store.dispatch({
            type: 'SET_BILLING_INFO',
            payload: {
                deliveryPrice,
                deliveryTax,
                shippingAddress: null,
                billingAddress: null,
                deliveryOption: null,
                // shippingAddress: selectedShippingAddress,
                // billingAddress: selectedBillingAddress,
                // deliveryOption: selectedShippingOption,
                paymentType,
                orderID,
                webOrderID,
                webOrderBillingAddressID: null,
                offlineOrder: offlineOrder,
                orderDate: timestamp,
                orderAPayment: orderAPayment,
                unavailableItems: 'CLEAR'
            }
        });
    } else {
        let apiRes = await createOrder(data);
        console.log('order sync api response ---> ', apiRes);

        //update WebOrderID
        webOrderID = apiRes[0].webOrderID;
        await RawQuery(`UPDATE local_com_order
            SET WebOrderID = ${webOrderID}
            WHERE OrderID = ${apiRes[0].appOrderID}`);

        await RawQuery(`UPDATE local_com_order
                SET OrderType = ${apiRes[0].orderType}
                WHERE OrderID = ${apiRes[0].appOrderID}`);
        //update billing WebOrderAddressID
        await RawQuery(`UPDATE local_com_orderaddress
          SET WebOrderAddressID = ${apiRes[0].orderBillingAddress.webOrderAddressID}, AddressOrderID = ${webOrderID}
          WHERE AddressID = ${apiRes[0].orderBillingAddress.appOrderAddressID}`);
        //update shipping WebOrderAddressID
        await RawQuery(`UPDATE local_com_orderaddress
          SET WebOrderAddressID = ${apiRes[0].orderShippingAddress.webOrderAddressID}, AddressOrderID = ${webOrderID}
          WHERE AddressID = ${apiRes[0].orderShippingAddress.appOrderAddressID}`);
        if(apiRes[0].customerShippingAddress != null) {
            //update WebAddressID
            await RawQuery(`UPDATE local_com_address
              SET WebAddressID = ${apiRes[0].customerShippingAddress.webAddressID}, ReadyToSync = 0
              WHERE AddressID = ${apiRes[0].customerShippingAddress.appAddressID}`);
            //update CustomerAddressID
            await RawQuery(`UPDATE local_com_orderaddress
              SET CustomerAddressID = ${apiRes[0].customerShippingAddress.webAddressID}, LocalCustomerAddressID = null
              WHERE AddressID = ${apiRes[0].orderShippingAddress.appOrderAddressID}`);
        }
        //update WebOrderItemIDs
        for (let index = 0; index < apiRes[0].orderItems.length; index++) {
            await RawQuery(`UPDATE local_com_orderitem
          SET WebOrderItemID = ${apiRes[0].orderItems[index].webOrderItemID}, OrderItemOrderID = ${webOrderID}
          WHERE OrderItemID = ${apiRes[0].orderItems[index].appOrderItemID}`);
        }

        store.dispatch({
            type: "PRE_SEASON_TOGGLE",
            payload: {
              preSeasonToggle: false,
            },
          });

        store.dispatch({
            type: 'SET_BILLING_INFO',
            payload: {
                deliveryPrice,
                deliveryTax,
                shippingAddress: null,
                billingAddress: null,
                deliveryOption: null,
                // shippingAddress: selectedShippingAddress,
                // billingAddress: selectedBillingAddress,
                // deliveryOption: selectedShippingOption,
                paymentType,
                orderID,
                webOrderID,
                webOrderBillingAddressID: apiRes[0]?.orderBillingAddress?.webOrderAddressID,
                offlineOrder: offlineOrder,
                orderDate: timestamp,
                orderAPayment: orderAPayment,
                unavailableItems: 'CLEAR',

            }
        });
    }

    return {orderID, webOrderID, finalTotal};
}
