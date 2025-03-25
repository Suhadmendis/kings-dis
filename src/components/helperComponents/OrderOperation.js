import { RawQuery } from "../../offline/Services/DataHelper";
import { getOrderAddressLocal } from "../../offline/Services/UserHelper";
import GetCustomerAddresses from "../GetCustomerAddresses";

export default function OrderOperation() {
    return '';
}
export async function getAccountCodeOrderId(isWebOrderId,orderId) {
    let orderRes;
    if (isWebOrderId) {
        orderRes = await RawQuery(`SELECT * FROM local_com_order WHERE WebOrderID ='${orderId}'`);
    } else {
        orderRes = await RawQuery(`SELECT * FROM local_com_order WHERE OrderID ='${orderId}'`);
    }


    console.log('88888888888882222229911 ',orderRes);
    if (orderRes.length > 0) {

    let addressRes = await RawQuery(`SELECT * FROM local_com_address WHERE AddressCustomerID ='${orderRes.item(0).OrderCustomerID}'`);

    if (addressRes.length > 0){
        return addressRes.item(0).AddressAccCode;
    }
    }

    return '';
}
export async function getBillingAddressOrderId(isWebOrderId,order) {

    let query = ``;

    console.log('order.OrderBillingAddressID');

    console.log(order);
    // where WebOrderAddressID = ${order.WebOrderID} and AddressType = '1'`;


    if (isWebOrderId) {
        if (order.OrderBillingAddressID != null) {
            query = `SELECT * FROM local_com_orderaddress where WebOrderAddressID = ${order.OrderBillingAddressID} and AddressType = '1'`;
        }else{
            query = `SELECT * FROM local_com_orderaddress where AddressOrderID = ${order.WebOrderID} and AddressType = '1'`;
        }

    }else{
        query = `SELECT * FROM local_com_orderaddress where AddressOrderID = ${order.OrderID} and AddressType = '1'`;
    }

    let addressRes = await RawQuery(query);
        if (addressRes.length > 0){
            console.log('======');

            let AddressID = addressRes.item(0).AddressID;
            let address = await getOrderAddressLocal(AddressID);
            return address;




    }
    // }

    return '';
}
export async function getDeliveryAddress(isWebOrderId,order) {

    let query = ``;

    if (isWebOrderId) {

        if (order.OrderShippingAddressID != null) {
            query = `SELECT * FROM local_com_orderaddress  WHERE WebOrderAddressID ='${order.OrderShippingAddressID}' and AddressType = '2'`;
        }else{
            query = `SELECT * FROM local_com_orderaddress  WHERE AddressOrderID = ${order.WebOrderID} and AddressType = '2'`;
        }
    }else{
        query = `SELECT * FROM local_com_orderaddress where AddressOrderID = ${order.OrderID} and AddressType = '2'`;
    }


        let addressRes = await RawQuery(query);


        for (let index = 0; index < addressRes.length; index++) {
            console.log(addressRes.item(index));


        }



        if (addressRes.length > 0){

console.log('=======');
console.log(addressRes.item(0));



            let AddressID = addressRes.item(0).AddressID;
            let address = await getOrderAddressLocal(AddressID);
            return address;

        }
    return '';
}
export async function getPaymentOption(isWebOrderId,orderId) {
    let orderRes;
    if (isWebOrderId) {
        orderRes = await RawQuery(`SELECT * FROM local_com_order WHERE WebOrderID ='${orderId}'`);
    } else {
        orderRes = await RawQuery(`SELECT * FROM local_com_order WHERE OrderID ='${orderId}'`);
    }

    if (orderRes.length > 0) {

        let addressRes = await RawQuery(`SELECT * FROM local_com_paymentoption WHERE PaymentOptionID ='${orderRes.item(0).OrderPaymentOptionID}'`);

        if (addressRes.length > 0){

              return  addressRes.item(0).PaymentOptionDisplayName

        }
    }
    return '';
}
export async function getDeliveryOption(isWebOrderId,orderId) {
    let orderRes;
    if (isWebOrderId) {
        orderRes = await RawQuery(`SELECT * FROM local_com_order WHERE WebOrderID ='${orderId}'`);
    } else {
        orderRes = await RawQuery(`SELECT * FROM local_com_order WHERE OrderID ='${orderId}'`);
    }

    if (orderRes.length > 0) {

        let addressRes = await RawQuery(`SELECT * FROM local_com_shippingoption WHERE ShippingOptionID ='${orderRes.item(0).OrderShippingOptionID}'`);

        if (addressRes.length > 0){

              return  addressRes.item(0).ShippingOptionName

        }
    }
    return '';
}

const extractOrCleanItems = (input) => {
    let result;

    // Check if input is an XML string by looking for specific tags
    if (typeof input === 'string' && input.includes('<UnavailableItems>')) {
        // Match the content inside <UnavailableItems>
        const match = input.match(/<UnavailableItems>(.*?)<\/UnavailableItems>/);
        if (match) {
            // Clean the matched content by removing trailing commas and whitespace
            result = match[1].replace(/,\s*$/, '').trim();
        } else {
            result = ''; // Return an empty string if not found
        }
    } else {
        // If not XML, treat it as a plain string
        result = input.replace(/,\s*$/, '').trim(); // Clean the plain string
    }

    return result;
};



export async function getUnavaiableItemsName(isWebOrderId,orderId) {

console.log('isWebOrderId', isWebOrderId);

    let orderRes;
    if (isWebOrderId) {


        orderRes = await RawQuery(`SELECT * FROM local_com_order WHERE WebOrderID ='${isWebOrderId}'`);
    } else {

        orderRes = await RawQuery(`SELECT * FROM local_com_order WHERE OrderID ='${orderId}'`);
    }
console.log(orderRes);

    if (orderRes.length > 0) {
        let orderCustomData;
        if (isWebOrderId) {
            orderCustomData = orderRes.item(0).OrderCustomData;

            if (orderCustomData == null) {
                orderCustomData = orderRes.item(0).UnavaiableItems;
            }
        } else {
            orderCustomData = orderRes.item(0).UnavaiableItems;
        }

        const updatedXml = extractOrCleanItems(orderCustomData);


        // const array = unavailableItem.split(',').filter(item => item !== "");
        const array = updatedXml.split(',').filter(item => item !== "");

        const arrayOfObjects = array.map(element => {
            return {
                SKU: element
            };
        });


        let skuName = [];
        for (let index = 0; index < arrayOfObjects.length; index++) {
            let element = array[index];
            let value = `"${element}"`;


            let addressRes = await RawQuery(`SELECT SKUNumber, SKUName FROM local_com_sku WHERE SKUNumber = '${element}'`);
            if (addressRes.length > 0) {
                let obj = {
                    SKUNumber: addressRes.item(0).SKUNumber,
                    SKUName: addressRes.item(0).SKUName
                };
                skuName.push(obj); // Push the object into the array
            }

        }




        // if (skuName.length > 0) {
        //    for (let index = 0; index < skuName.length; index++) {
        //     const element = skuName[index];

        //     console.log('5555555555555555555555555555555555555555555555555 ', element);
        //     return element
        //    }
        return skuName

        // const filteredArray = unavailableItem.filter(function(item) {
        //     return item !== "";
        //   });

        //   // Join without any separator
        //   const resultString = filteredArray.join('');

        //   // Add the result to a new array
        //   const resultArray = [resultString];

        //   console.log('4444444444444444444444444444444444444444444444444444444444444 ',resultArray);

        // let unItemArray = unavailableItem.split(',').map(Number);;
        // console.log(
        //     '2222222222222222222222222222222222222222200000000000000000000000000000 ',resultArray

        // );

        // unItemArray = unItemArray.filter(item => item !== 0);


        // let cleanedUnItem = unItemArray.join(',');

        // const numbersArray = cleanedUnItem.split(',').map(Number);


            // for (let index = 0; index < array.length; index++) {
            //     const element = String(array[index]);
            //     console.log('5555555555555555555555555555555555555555555555555 ',element);
            //     let addressRes = await RawQuery(`SELECT * FROM local_com_sku where SKUID =${element}`);

            //     if (addressRes.length > 0){
            //           return  addressRes.item(0).SKUName

            //     }
            // }

    }
    return '';
}