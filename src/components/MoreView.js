import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as colors from '../style/Common/ColorsStyle';
import styles from '../style/MoreViewStyle';
import {
  getAccountCodeOrderId,
  getBillingAddressOrderId,
  getDeliveryAddress,
  getDeliveryOption,
  getPaymentOption,
  getUnavaiableItemsName,
} from './helperComponents/OrderOperation';
import moment from 'moment';
import { momentUTSLocal } from './common/DateTimeGeneration';
const MoreView = (value) => {
  // console.log(details);

  const [enable, setEnable] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [accCode, setAccCode] = useState('');
  const [billAddress, setBillAddress] = useState('');
  const [paymentOption, setPaymentOption] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [date, setData] = useState('');
  const [unavaiableItems, setUnavaiableItems] = useState('');

  let data = value.details;
  let o_date;

  // {"LastUpdate": null,
  //    "OrderAPayment": 0,
  //    "OrderAbandonedStatus": "7",
  //    "OrderAccountsReference": null,
  //    "OrderBillingAddressID": 9053,
  //    "OrderComments": null,
  //    "OrderCouponCodes": "<CouponCodes />",
  //    "OrderCreatedByUserID": 96528,
  //    "OrderCulture": "en-GB",
  //    "OrderCurrencyID": 1,
  //    "OrderCustomData": null,
  //    "OrderCustomerID": 112325,
  //    "OrderDataSetID": null,
  //    "OrderDate": "2024-11-21T11:48:07",
  //    "OrderDiscounts": "<Summary />",
  //    "OrderGUID": null,
  //    "OrderGrandTotal": 33.6,
  //    "OrderGrandTotalInMainCurrency": 33.6,
  //    "OrderID": 1,
  //    "OrderInsertedToDim": null,
  //    "OrderInvoice": "",
  //    "OrderInvoiceNumber": null,
  //    "OrderIsPaid": null,
  //    "OrderLastModified": "2024-11-21T11:48:07",
  //    "OrderNote": "",
  //    "OrderOtherPayments": "<Summary />",
  //    "OrderPONumber": null,
  //    "OrderPartShipment": null,
  //    "OrderPaymentOptionID": 2,
  //    "OrderPaymentResult": null,
  //    "OrderPaymentType": null,
  //    "OrderPreseason": 0,
  //    "OrderQuoteID": null,
  //    "OrderReceiptInseredToDim": null,
  //    "OrderRegNumber": "",
  //    "OrderSageVendorTxCode": null,
  //    "OrderShippingAddressID": 9054,
  //    "OrderShippingOptionID": 1, "OrderSiteID": 1,
  //     "OrderStatusID": 2,
  //     "OrderTaxSummary": "<Summary />",
  //     "OrderToEmail": "shemal@stacktech.io",
  //     "OrderTotalPrice": 33.6,
  //     "OrderTotalPriceInMainCurrency": 33.6,
  //      "OrderTotalShipping": 6.5,
  //      "OrderTotalTax": 5.6,
  //      "OrderTrackingNumber": null, "OrderType": null, "UnavaiableItems": ",,,", "WebOrderID": 162982}

  console.log('datdasdsa',data);

  if (data != '') {
    let d_date = data.OrderDate.replace('/', '-');
    d_date = d_date.replace('/', '-');

    let dsdate = d_date.split('T');

    o_date = dsdate[0] + ' ' + dsdate[1];
  }

  // setData(data.OrderDate)
  useEffect(() => {
    if (data != '') {
      getMoreViewData();
    }
  });

  const getMoreViewData = async () => {
    let orderId;
    let accCode;
    let billAddress;
    let paymentOption;
    let deliveryOption;
    let deliveryAddress;
    let isWebOrderId = false;


console.log('fsdgsd', data.WebOrderID == null);


    if (data.WebOrderID == null) {
      isWebOrderId = false;

      accCode = await getAccountCodeOrderId(isWebOrderId, data.OrderID);
      setAccCode(accCode);
      billAddress = await getBillingAddressOrderId(isWebOrderId, data);
      setBillAddress(billAddress);
      if (billAddress == '') {
        billAddress = await getBillingAddressOrderId(
          isWebOrderId,
          data
        );
        setBillAddress(billAddress);
      }


      paymentOption = await getPaymentOption(isWebOrderId, data.OrderID);
      setPaymentOption(paymentOption);
      deliveryOption = await getDeliveryOption(isWebOrderId, data.OrderID);
      setDeliveryOption(deliveryOption);
      deliveryAddress = await getDeliveryAddress(isWebOrderId, data);
      setDeliveryAddress(deliveryAddress);
      if (deliveryAddress == '') {
        deliveryAddress = await getDeliveryAddress(
          isWebOrderId,
          data
        );


        setDeliveryAddress(deliveryAddress);
      }
      orderId = data.OrderID;
      setOrderId(orderId);
    } else {


      isWebOrderId = true;
      accCode = await getAccountCodeOrderId(isWebOrderId, data.WebOrderID);
      setAccCode(accCode);
      billAddress = await getBillingAddressOrderId(
        isWebOrderId,
        data
      );
      console.log('billAddress', billAddress);

      setBillAddress(billAddress);
      paymentOption = await getPaymentOption(isWebOrderId, data.WebOrderID);
      setPaymentOption(paymentOption);
      deliveryOption = await getDeliveryOption(isWebOrderId, data.WebOrderID);
      setDeliveryOption(deliveryOption);
      deliveryAddress = await getDeliveryAddress(isWebOrderId, data);
      setDeliveryAddress(deliveryAddress);
      console.log('deliveryAddress................................');
      console.log(billAddress);

      setOrderId(data.WebOrderID);
    }

    const array = data.UnavaiableItems.split(',').filter((item) => item !== '');
    console.log('element', data);
    const skuArray = array.map((element) => {
      return {
        SKU: element,
      };
    });
    const unavaiableItemsNameArray = await getUnavaiableItemsName(data.WebOrderID, orderId);
    console.log('unavaiableItemsNameArray', unavaiableItemsNameArray);

    const mappedArray = unavaiableItemsNameArray.map((skuObj, index) => {
      console.log(skuObj);

      const sku = skuObj.SKU;
      console.log(skuObj);

      const skuNameObj = unavaiableItemsNameArray[index];
      const skuName = skuNameObj ? skuNameObj.SKUName : 'Unknown';
      return `${skuObj.SKUNumber}-${skuObj.SKUName}`;
    });

    const output = mappedArray.join(', ');

    setUnavaiableItems(output);

    //  let moreData = {
    //    orderNumber: orderId,
    //    OrderDate: data.OrderDate,
    //    OrderType: data.OrderType,
    //    UnavaiableItems: output,
    //    accountCode: accCode,
    //    billAddress: billAddress,
    //    deliveryAddress: deliveryAddress,
    //    paymentOption: paymentOption,
    //    deliveryOption: deliveryOption,
    //    OrderNote: data.OrderNote,

    //  }

    //  return moreData;
  };
  return (
    <View style={styles.main}>
      <View style={styles.topView}>
        <View style={styles.firstRow}>
          <Text style={{ color: colors.primaryColor }}>Order Number:</Text>
          <Text style={{ color: colors.primaryColor, marginTop: 5 }}>
            Account Code:
          </Text>
        </View>
        <View style={styles.secondRow}>
          <Text style={{ color: '#000' }}>{orderId}</Text>
          <Text style={{ color: '#000', marginTop: 5 }}>{accCode}</Text>
        </View>
        <View style={styles.arrowView}>
          <TouchableOpacity
            onPress={() => setEnable(!enable)}
            style={styles.arrowBtn}
          >
            {enable ? (
              <Image source={require('../assets/arrowUp.png')}/>
            ) : (
              <Image source={require('../assets/arrowDown.png')}/>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {enable && (
        <View style={styles.midView}>
          <View style={styles.midRowView}>
            <View style={styles.midFirstRow}>
              <Text style={{ color: colors.primaryColor, marginTop: 0 }}>
                Order Date:
              </Text>
              <Text style={{ color: colors.primaryColor, marginTop: 10 }}>
                Payment Method:
              </Text>
            </View>
            <View style={styles.midSecondRow}>

              <Text style={{ color: '#000', marginTop: 0 }}>{ momentUTSLocal(o_date) }</Text>
              <Text style={{ color: '#000', marginTop: 7 }}>
                {paymentOption}
              </Text>
            </View>
          </View>

          <View style={styles.addressView}>
            <View style={styles.addressRowView}>
              <View style={styles.addressRow}>
                <Text style={{ color: colors.primaryColor, marginTop: 0 }}>
                  Billing Address:
                </Text>
              </View>
              <View style={styles.addressRowData}>
                <Text style={{ color: '#000', marginTop: 0 }}>
                  {billAddress}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomView}>
            <View style={styles.bottomRowView}>
              <View style={styles.bottomRow}>
                <Text style={{ color: colors.primaryColor, marginTop: 0 }}>
                  Delivery Address:{' '}
                </Text>
              </View>
              <View style={styles.bottomRowData}>
                <Text style={{ color: '#000', marginTop: 0 }}>
                  {deliveryAddress}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.deliveryOptionView}>
            <View style={styles.deliveryOptionRowView}>
              <View style={styles.deliveryOptionRow}>
                <Text style={{ color: colors.primaryColor, marginTop: 5 }}>
                  Order Type:
                </Text>
                <Text style={{ color: colors.primaryColor, marginTop: 5 }}>
                  Delivery Option:
                </Text>
                <Text style={{ color: colors.primaryColor, marginTop: 5 }}>
                  Order & Delivery Note:
                </Text>
              </View>
              <View style={styles.deliveryOptionRowData}>
                <Text style={{ color: '#000', marginTop: 5 }}>
                  {data.OrderType}
                </Text>
                <Text style={{ color: '#000', marginTop: 5 }}>
                  {deliveryOption}
                </Text>
                <Text style={{ color: '#000', marginTop: 5 }}>
                  {data.OrderNote}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.UnavailableItemView}>
            <View style={styles.UnavailableItemRow}>
              <Text style={{ color: colors.primaryColor, marginTop: 5 }}>
                Unavailable items:
              </Text>
            </View>
            <View style={styles.UnavailableItemRowData}>
              <Text style={{ color: '#000', marginTop: 5 }}>
                {' '}
                {unavaiableItems}{' '}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default MoreView;
