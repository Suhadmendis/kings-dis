import getBaseUrl from '../url/getBaseUrl';

module.exports = {
  "Mode": "TEST",
  "TEST": {
    "integrationKey": "TxC2QxaHG68KDXOrTh2cCldyFxkPatUj67ruNiTLk8LWyCT6rU",
    "integrationPassword": "FRWbR6L2VqDzA3eshciurUXe9KzF3JHBl6uvktv3XI7dOiftG0lOur5LUz8WPSFLg",
    "merchantSessionKey_URL": "https://pi-test.sagepay.com/api/v1/merchant-session-keys",
    "vendorName": "ewkingcolimited",
    "paymentForm_URL": `${getBaseUrl()}PaymentView/ThreeD`,
    "orderPaymentStatus_URL": `${getBaseUrl()}payment/orderpaymentstatus`
  },
  "LIVE": {
    "integrationKey": "SVcuTUCNhBEEAWkJeOvaEPY2LapdKG8kskoWe7sm3OmfzOzS39",
    "integrationPassword": "p9WNWREQSUs4GThExLla3dS7BdjsKZjAWCERcNMmSwKfSW9aVuyL3KN6wENwwNJcK",
    "merchantSessionKey_URL": "https://pi-live.sagepay.com/api/v1/merchant-session-keys",
    "vendorName": "ewkingcolimited",
    "paymentForm_URL": "https://sop.kingsseeds.com/api_live/PaymentView/ThreeD",
    "orderPaymentStatus_URL": "https://sop.kingsseeds.com/api_live/payment/orderpaymentstatus"
  }
}