


function createTableSchema(table, data, preSeason = '0', saveFlag = '', isInitial = false) {

    let schema = [];

    if (table == 'local_com_sku') {

      schema.push(data.skuid),
      schema.push(data.skuNumber),
      schema.push(data.skuName),
      schema.push(data.skuDescription),
      schema.push(data.skuPrice),
      schema.push(data.skuEnabled),
      schema.push(data.skuDepartmentID),
      schema.push(data.skuManufacturerID),
      schema.push(data.skuInternalStatusID),
      schema.push(data.skuPublicStatusID),
      schema.push(data.skuSupplierID),
      schema.push(data.skuAvailableInDays),
      schema.push(data.skuguid),
      schema.push(data.skuImagePath),
      schema.push(data.skuWeight),
      schema.push(data.skuWidth),
      schema.push(data.skuDepth),
      schema.push(data.skuHeight),
      schema.push(data.skuAvailableItems),
      schema.push(data.skuSellOnlyAvailable),
      schema.push(data.skuCustomData),
      schema.push(data.skuOptionCategoryID),
      schema.push(data.skuOrder),
      schema.push(data.skuLastModified),
      schema.push(data.skuCreated),
      schema.push(data.skuSiteID),
      schema.push(data.skuNeedsShipping),
      schema.push(data.skuValidUntil),
      schema.push(data.skuProductType),
      schema.push(data.skuMaxItemsInOrder),
      schema.push(data.skuValidity),
      schema.push(data.skuValidFor),
      schema.push(data.skuMembershipGUID),
      schema.push(data.skuConversionName),
      schema.push(data.skuConversionValue),
      schema.push(data.skuBundleInventoryType),
      schema.push(data.skuMinItemsInOrder),
      schema.push(data.skuRetailPrice),
      schema.push(data.skuParentSKUID),
      schema.push(data.skuShortDescription),
      schema.push(data.skuEproductFilesCount),
      schema.push(data.skuBundleItemsCount),
      schema.push(data.skuInStoreFrom),
      schema.push(data.skuReorderAt),
      schema.push(data.skuTrackInventory),
      schema.push(data.skuTaxClassID),
      schema.push(data.skuBrandID),
      schema.push(data.skuCollectionID),
      schema.push(data.skuClassCode),
      schema.push(data.skuClassTable),
      schema.push(data.skuDataSetID),
      schema.push(data.skuImageLocation),
      schema.push(data.skuCatNumber),
      schema.push(data.skuPackSize),
      schema.push(data.skuFeatures),
      schema.push(data.skuDelMonth),
      schema.push(data.skuBarCode),
      schema.push(data.skuPrice2),
      schema.push(data.skuPrice3),
      schema.push(data.skuPrice4),
      schema.push(data.skuPrice5),
      schema.push(data.skuPrice6),
      schema.push(data.skuPrice7),
      schema.push(data.skuPrice8),
      schema.push(data.skuPrice9),
      schema.push(data.skuPrice10),
      schema.push(data.skuPrice1Label),
      schema.push(data.skuPrice2Label),
      schema.push(data.skuPrice3Label),
      schema.push(data.skuPrice4Label),
      schema.push(data.skuPrice5Label),
      schema.push(data.skuPrice6Label),
      schema.push(data.skuPrice7Label),
      schema.push(data.skuPrice8Label),
      schema.push(data.skuPrice9Label),
      schema.push(data.skuPrice10Label),
      schema.push(data.skuAnalysis),
      schema.push(data.skuDiscountCat),
      schema.push(data.skuPictorialPackSize),
      schema.push(data.skuPricePreSeason),
      schema.push(data.skuPreSeason),
      schema.push(data.skuPreSeasonOnly)


    }

    if (table == 'local_cms_country') {

      schema.push(data.countryID),
      schema.push(data.countryDisplayName),
      schema.push(data.countryName),
      schema.push(data.countryGUID),
      schema.push(data.countryLastModified),
      schema.push(data.countryTwoLetterCode),
      schema.push(data.countryThreeLetterCode),
      schema.push(data.countryStateRequired),
      schema.push(data.countryGroupCode),
      schema.push(data.countryGroupID)

    }

    if (table == 'local_cms_state') {

      schema.push(data.stateID),
      schema.push(data.stateDisplayName),
      schema.push(data.stateName),
      schema.push(data.stateCode),
      schema.push(data.countryID),
      schema.push(data.stateGUID),
      schema.push(data.stateLastModified)

    }

    if (table == 'local_cms_role') {

      schema.push(data.roleID),
      schema.push(data.roleDisplayName),
      schema.push(data.roleName),
      schema.push(data.roleDescription),
      schema.push(data.siteID),
      schema.push(data.roleGUID),
      schema.push(data.roleLastModified),
      schema.push(data.roleGroupID),
      schema.push(data.roleIsGroupAdministrator),
      schema.push(data.roleIsDomain)

    }

    if (table == 'local_cms_user') {

      schema.push(data.userID),
      schema.push(data.userName),
      schema.push(data.firstName),
      schema.push(data.middleName),
      schema.push(data.lastName),
      schema.push(data.fullName),
      schema.push(data.email),
      schema.push(data.userPassword),
      schema.push(data.preferredCultureCode),
      schema.push(data.preferredUICultureCode)
      schema.push(data.userEnabled),
      schema.push(data.userIsExternal),
      schema.push(data.userPasswordFormat),
      schema.push(data.userCreated),
      schema.push(data.lastLogon),
      schema.push(data.userStartingAliasPath),
      schema.push(data.userGUID),
      schema.push(data.userLastModified),
      schema.push(data.userLastLogonInfo),
      schema.push(data.userIsHidden)
      schema.push(data.userVisibility),
      schema.push(data.userIsDomain),
      schema.push(data.userHasAllowedCultures),
      schema.push(data.userMFRequired),
      schema.push(data.userPrivilegeLevel),
      schema.push(data.userSecurityStamp),
      schema.push(data.userMFSecret),
      schema.push(data.userMFTimestep),
      schema.push(data.userBuyerCode),
      schema.push(data.userDataSetID)
      schema.push(data.userAccCode),
      schema.push(data.userUploadKey),
      schema.push(data.userPasswordChangedOnWeb),
      schema.push(data.userTitle),
      schema.push(data.agreedPromotions),
      schema.push(data.wishToDeleteAccount),
      schema.push(data.userAPISecret),
      schema.push(data.userAPIEnabled)

    }

    if (table == 'local_cms_userrole') {

      schema.push(data.userID),
      schema.push(data.roleID),
      schema.push(data.validTo),
      schema.push(data.userRoleID)

    }

    if (table == 'local_com_customer') {

      schema.push(data.customerID),
      schema.push(data.customerFirstName),
      schema.push(data.customerLastName),
      schema.push(data.customerEmail),
      schema.push(data.customerPhone),
      schema.push(data.customerFax),
      schema.push(data.customerCompany),
      schema.push(data.customerUserID),
      schema.push(data.customerGUID),
      schema.push(data.customerTaxRegistrationID),
      schema.push(data.customerOrganizationID),
      schema.push(data.customerLastModified),
      schema.push(data.customerSiteID),
      schema.push(data.customerCreated),
      schema.push(data.customerEnabled),
      schema.push(data.customerPreferredCurrencyID),
      schema.push(data.customerPreferredShippingOptionID),
      schema.push(data.customerPreferredPaymentOptionID),
      schema.push(data.customerAccCode),
      schema.push(data.customerBuyerCode),
      schema.push(data.customerDataSetID),
      schema.push(data.customerMobile),
      schema.push(data.customerJob),
      schema.push(data.customerWeb),
      schema.push(data.customerDefaultPaymentAddressID),
      schema.push(data.customerDefaultDeliveryAddressID),
      schema.push(data.customerUploadKey),
      schema.push(data.customer_SyncStatus),
      schema.push(data.lastUpdate),
      schema.push(data.customerContactTitle),
      schema.push(data.customerAllotmentPlotID),
      schema.push(data.customerKey1),
      schema.push(data.catYear),
      schema.push(data.customerSalesRepKey)

    }

    if (table == 'local_com_address') {

      schema.push(data.addressID),
      schema.push(data.addressName),
      schema.push(data.addressLine1),
      schema.push(data.addressLine2),
      schema.push(data.addressCity),
      schema.push(data.addressZip),
      schema.push(data.addressPhone),
      schema.push(data.addressCustomerID),
      schema.push(data.addressCountryID),
      schema.push(data.addressStateID),
      schema.push(data.addressPersonalName),
      schema.push(data.addressGUID),
      schema.push(data.addressLastModified),
      schema.push(data.addressLine4),
      schema.push(data.addressLine3),
      schema.push(data.addressEnabled),
      schema.push(data.addressIsBilling),
      schema.push(data.addressIsShipping),
      schema.push(data.addressWebOnly),
      schema.push(data.addressIsDefault),
      schema.push(data.addressAccCode),
      schema.push(data.addressCode),
      schema.push(data.addressDataSetID),
      schema.push(data.address_SyncStatus),
      schema.push(data.lastUpdate),
      schema.push(data.addressContactTitle),
      schema.push(data.addressFirstName),
      schema.push(data.addressLastName),
      schema.push(data.addressUploadKey),
      schema.push(data.addressOldID),
      schema.push(data.displayOrder),
      schema.push(data.addressID),
      schema.push(0)

    }

    if (table == 'local_ct_userappointments') {

      schema.push(data.itemID),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID),
      schema.push(data.email),
      schema.push(data.subject),
      schema.push(data.location),
      schema.push(data.startDate),
      schema.push(data.endDate),
      schema.push(data.note),
      schema.push(data.tradeAccID),
      schema.push(data.isDeleted ? 1 : 0),
      schema.push(0),
      schema.push(0)

    }

    if (table == 'local_com_shoppingcart') {


      schema.push(data.shoppingCartID),
      schema.push(data.shoppingCartGUID),
      schema.push(data.shoppingCartUserID),
      schema.push(data.shoppingCartSiteID),
      schema.push(data.shoppingCartLastUpdate),
      schema.push(data.shoppingCartCurrencyID),
      schema.push(data.shoppingCartPaymentOptionID),
      schema.push(data.shoppingCartShippingOptionID),
      schema.push(data.shoppingCartBillingAddressID),
      schema.push(data.shoppingCartShippingAddressID),
      schema.push(data.shoppingCartCustomerID),
      schema.push(data.shoppingCartNote),
      schema.push(data.shoppingCartCompanyAddressID),
      schema.push(data.shoppingCartCustomData),
      schema.push(data.shoppingCartContactID),
      schema.push(preSeason),
      schema.push('cartref'),
      schema.push(saveFlag),
      schema.push(data.shoppingCartIsPreSeason),
      schema.push(''),
      schema.push(data.readyToSync == 1 ? 1 : 0 )

    }


    if (table == 'local_com_shoppingcartsku') {

      schema.push(data.cartItemID),
      schema.push(data.shoppingCartID),
      schema.push(data.skuid),
      schema.push(data.skuUnits),
      schema.push(data.cartItemCustomData),
      schema.push(data.cartItemGuid),
      schema.push(data.cartItemParentGuid),
      schema.push(data.cartItemValidTo),
      schema.push(data.cartItemBundleGUID),
      schema.push(data.cartItemText),
      schema.push(data.cartItemAutoAddedUnits),
      schema.push(data.cartItemUnitListPrice),
      schema.push(data.cartItemUnitPrice),
      schema.push(data.cartItemUnitDiscount),
      schema.push(data.cartItemPrice),
      schema.push(data.cartItemDiscountRate),
      schema.push(data.cartItemQuoteLineDiscount),
      schema.push(data.cartItemQuoteLineDiscountType),
      schema.push(data.cartItemQuoteYourPrice),
      schema.push(data.cartItemPriceLine),
      schema.push(data.cartItemLineTax),
      schema.push(data.cartItemNote),
      schema.push(data.cartItemBackCard)


    }

    if (table == 'local_com_order') {

      schema.push(isInitial ? data.orderID : null),
      schema.push(data.orderShippingOptionID),
      schema.push(data.orderTotalShipping),
      schema.push(data.orderTotalPrice),
      schema.push(data.orderTotalTax),
      schema.push(data.orderDate),
      schema.push(data.orderStatusID),
      schema.push(data.orderCurrencyID),
      schema.push(data.orderCustomerID),
      schema.push(data.orderCreatedByUserID),
      schema.push(data.orderNote),
      schema.push(data.orderSiteID),
      schema.push(data.orderPaymentOptionID),
      schema.push(data.orderInvoice),
      schema.push(data.orderInvoiceNumber),
      schema.push(data.orderTrackingNumber),
      schema.push(data.orderCustomData),
      schema.push(data.orderPaymentResult),
      schema.push(data.orderGUID),
      schema.push(data.orderLastModified),
      schema.push(data.orderTotalPriceInMainCurrency),
      schema.push(data.orderIsPaid),
      schema.push(data.orderCulture),
      schema.push(data.orderDiscounts),
      schema.push(data.orderGrandTotal),
      schema.push(data.orderGrandTotalInMainCurrency),
      schema.push(data.orderOtherPayments),
      schema.push(data.orderTaxSummary),
      schema.push(data.orderCouponCodes),
      schema.push(data.orderPONumber),
      schema.push(data.orderAPayment),
      schema.push(data.orderPaymentType),
      schema.push(data.orderBillingAddressID),
      schema.push(data.orderShippingAddressID),
      schema.push(data.orderDataSetID),
      schema.push(data.orderAccountsReference),
      schema.push(data.lastUpdate),
      schema.push(data.orderPartShipment),
      schema.push(data.orderComments),
      schema.push(data.orderType),
      schema.push(data.orderInsertedToDim),
      schema.push(data.orderSageVendorTxCode),
      schema.push(data.orderReceiptInseredToDim),
      schema.push(data.orderAbandonedStatus),
      schema.push(''),
      schema.push(data.orderRegNumber),
      schema.push(data.orderQuoteID),
      schema.push(data.orderPreseason),
      schema.push(data.orderID)

    }


    if (table == 'local_cms_settingskey') {

      schema.push(data.keyID),
      schema.push(data.keyName),
      schema.push(data.keyDisplayName),
      schema.push(data.keyDescription),
      schema.push(data.keyValue),
      schema.push(data.keyType),
      schema.push(data.keyCategoryID),
      schema.push(data.siteID),
      schema.push(data.keyGUID),
      schema.push(data.keyLastModified),
      schema.push(data.keyOrder),
      schema.push(data.keyDefaultValue),
      schema.push(data.keyValidation),
      schema.push(data.keyEditingControlPath),
      schema.push(data.keyIsGlobal == true ? 1 : 0),
      schema.push(data.keyIsCustom == true ? 1 : 0),
      schema.push(data.keyIsHidden == true ? 1 : 0),
      schema.push(data.keyFormControlSettings),
      schema.push(data.keyExplanationText)
    }

    if (table == 'local_com_orderaddress') {

      schema.push(isInitial ? data.addressID : null),
      schema.push(data.addressLine1),
      schema.push(data.addressLine2),
      schema.push(data.addressCity),
      schema.push(data.addressZip),
      schema.push(data.addressPhone),
      schema.push(data.addressCountryID),
      schema.push(data.addressStateID),
      schema.push(data.addressPersonalName),
      schema.push(data.addressGUID),
      schema.push(data.addressLastModified),
      schema.push(data.addressOrderID),
      schema.push(data.addressType),
      schema.push(data.addressLine3),
      schema.push(data.addressLine4),
      schema.push(data.customerAddressID),
      schema.push(null),
      schema.push(data.addressID)
    }

    if (table == 'local_com_orderitem') {

      schema.push(isInitial ? data.orderItemID : null),
      schema.push(data.orderItemOrderID),
      schema.push(data.orderItemSKUID),
      schema.push(data.orderItemSKUName),
      schema.push(data.orderItemUnitPrice),
      schema.push(data.orderItemUnitCount),
      schema.push(data.orderItemCustomData),
      schema.push(data.orderItemGuid),
      schema.push(data.orderItemParentGuid),
      schema.push(data.orderItemLastModified),
      schema.push(data.orderItemValidTo),
      schema.push(data.orderItemBundleGUID),
      schema.push(data.orderItemTotalPriceInMainCurrency),
      schema.push(data.orderItemSendNotification),
      schema.push(data.orderItemText),
      schema.push(data.orderItemProductDiscounts),
      schema.push(data.orderItemDiscountSummary),
      schema.push(data.orderItemTotalPrice),
      schema.push(data.orderItemUnitListPrice),
      schema.push(data.orderItemUnitDiscount),
      schema.push(data.orderItemDiscountRate),
      schema.push(data.orderItemDataSetID),
      schema.push(data.orderItemAccountsReference),
      schema.push(data.orderItemOrderInvoiceNumber),
      schema.push(data.orderItemQtyDelivered),
      schema.push(data.orderItemQtyInvoiced),
      schema.push(data.orderInvoiceNumber),
      schema.push(data.orderInsertedToDim),
      schema.push(data.od_OHID_DSID),
      schema.push(data.batchName),
      schema.push(data.orderItemPriceLine),
      schema.push(data.orderItemNote),
      schema.push(data.orderItemBackCard),
      schema.push(data.orderItemID)

    }

    if (table == 'local_com_orderstatus') {

      schema.push(data.statusID),
      schema.push(data.statusName),
      schema.push(data.statusDisplayName),
      schema.push(data.statusOrder),
      schema.push(data.statusEnabled),
      schema.push(data.statusColor),
      schema.push(data.statusGUID),
      schema.push(data.statusLastModified),
      schema.push(data.statusSendNotification),
      schema.push(data.statusSiteID),
      schema.push(data.statusOrderIsPaid)

    }

    if (table == 'local_ct_tradeaccount') {

      schema.push(data.itemID),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID),
      schema.push(data.itemDataSetID),
      schema.push(data.itemCode),
      schema.push(data.itemName),
      schema.push(data.itemAdminFirstName),
      schema.push(data.itemAdminLastName),
      schema.push(data.itemAddressLine1),
      schema.push(data.itemAddressLine2),
      schema.push(data.itemCity),
      schema.push(data.itemCounty),
      schema.push(data.itemPostcode),
      schema.push(data.itemCountryId),
      schema.push(data.itemAdminEmail),
      schema.push(data.itemAdminPhone),
      schema.push(data.itemNotes),
      schema.push(data.itemOnStop),
      schema.push(data.itemEnabled),
      schema.push(data.itemSiteID),
      schema.push(data.itemAccBalance),
      schema.push(data.itemCreditLimit),
      schema.push(data.itemPriceKey),
      schema.push(data.itemLineDiscount),
      schema.push(data.itemTotalDiscount),
      schema.push(data.itemTaxable),
      schema.push(data.itemTaxCode),
      schema.push(data.itemCurrencyCode),
      schema.push(data.itemStaffEmail),
      schema.push(data.itemType),
      schema.push(data.itemKey1),
      schema.push(data.itemKey2),
      schema.push(data.itemKey3),
      schema.push(data.itemDiscGroup1),
      schema.push(data.itemDiscGroup2),
      schema.push(data.itemDiscGroup3),
      schema.push(data.itemDiscGroup4),
      schema.push(data.itemAccAreaCode),
      schema.push(1)

    }

    if (table == 'local_ct_tradeaccountcustomer') {

      schema.push(data.itemID),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID),
      schema.push(data.tradeAccId),
      schema.push(data.tradeAccName),
      schema.push(data.customerId),
      schema.push(data.customerName),
      schema.push(data.itemIsAdmin)

    }

    if (table == 'local_ct_deliverymatrix') {

      schema.push(data.itemID),
      schema.push(data.itemCountryGroupID),
      schema.push(data.itemPostcodeZoneID),
      schema.push(data.itemDeliveryFactors),
      schema.push(data.itemShippingOptionID),
      schema.push(data.itemPrice),
      schema.push(data.itemRestrictedToPaymentOption),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID),
      schema.push(data.itemSiteID),
      schema.push(data.itemSiteRoleID),
      schema.push(data.itemDiscountedPrice),
      schema.push(data.itemPriceLabel)

    }

    if (table == 'local_ct_countrygroup') {

      schema.push(data.itemID),
      schema.push(data.itemName),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID)

    }

    if (table == 'local_ct_postcodes') {

      schema.push(data.itemID),
      schema.push(data.itemPostcode),
      schema.push(data.itemX),
      schema.push(data.itemY),
      schema.push(data.itemLatitude),
      schema.push(data.itemLongitude),
      schema.push(data.itemTown),
      schema.push(data.itemCounty),
      schema.push(data.itemCountyID),
      schema.push(data.itemZone),
      schema.push(data.itemZoneID),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID)

    }

    if (table == 'local_ct_postcodezone') {

      schema.push(data.itemID),
      schema.push(data.itemName),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID)

    }

    if (table == 'local_com_shippingoption') {

      schema.push(data.shippingOptionID),
      schema.push(data.shippingOptionName),
      schema.push(data.shippingOptionDisplayName),
      schema.push(data.shippingOptionEnabled),
      schema.push(data.shippingOptionSiteID),
      schema.push(data.shippingOptionGUID),
      schema.push(data.shippingOptionLastModified),
      schema.push(data.shippingOptionThumbnailGUID),
      schema.push(data.shippingOptionDescription),
      schema.push(data.shippingOptionCarrierID),
      schema.push(data.shippingOptionCarrierServiceName),
      schema.push(data.shippingOptionTaxClassID),
      schema.push(data.shippingOptionCountryIDs)

    }

    if (table == 'local_int_salestax') {

      schema.push(data.itemID),
      schema.push(data.stax_Code),
      schema.push(data.stax_Name),
      schema.push(data.stax_Region),
      schema.push(data.stax_RegionType),
      schema.push(data.stax_Rate),
      schema.push(data.stax_IsFlatValue),
      schema.push(data.stax_DataSetID),
      schema.push(data.uploadKey),
      schema.push(data.lastUpdate),
      schema.push(data.status),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID)

    }

    if (table == 'local_int_analysis') {

      schema.push(data.itemID),
      schema.push(data.ana_DataSetID),
      schema.push(data.ana_Code),
      schema.push(data.ana_Name),
      schema.push(data.ana_VatCode),
      schema.push(data.uploadKey),
      schema.push(data.lastUpdate),
      schema.push(data.status),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID)

    }

    if (table == 'local_ct_quotes') {

      schema.push(data.itemID),
      schema.push(data.itemCustomerID),
      schema.push(data.itemShoppingCartID),
      schema.push(data.itemSiteID),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID),
      schema.push(data.itemQuoteLabel),
      schema.push(data.itemQuoteTotal),
      schema.push(data.itemQuoteDelivery)

    }

    if (table == 'local_ct_quotestatus') {
      schema.push(data.itemID),
      schema.push(data.itemDisplayName),
      schema.push(data.itemName),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID)
    }

    if (table == 'local_ct_quotestatususer') {

      schema.push(data.itemID),
      schema.push(data.itemQuoteID),
      schema.push(data.itemQuoteStatusID),
      schema.push(data.itemSiteID),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID)

    }
    if (table == 'local_cms_culture') {
        schema.push(data.cultureID),
        schema.push(data.cultureName),
        schema.push(data.cultureCode),
        schema.push(data.cultureShortName),
        schema.push(data.cultureGUID),
        schema.push(data.cultureLastModified),
        schema.push(data.cultureAlias),
        schema.push(data.cultureIsUICulture)

    }
    if (table == 'local_cms_resource') {
      schema.push(data.resourceID),
      schema.push(data.resourceDisplayName),
      schema.push(data.resourceName),
      schema.push(data.resourceDescription),
      schema.push(data.showInDevelopment),
      schema.push(data.resourceURL),
      schema.push(data.resourceGUID),
      schema.push(data.resourceLastModified),
      schema.push(data.resourceIsInDevelopment),
      schema.push(data.resourceHasFiles),
      schema.push(data.resourceVersion),
      schema.push(data.resourceAuthor),
      schema.push(data.resourceInstallationState),
      schema.push(data.resourceInstalledVersion)
    }
    if (table == 'local_cms_resourcestring') {
      schema.push(data.stringID),
      schema.push(data.stringKey),
      schema.push(data.stringIsCustom),
      schema.push(data.stringGUID)

    }
    if (table == 'local_cms_resourcetranslation') {
      schema.push(data.translationID),
      schema.push(data.translationStringID),
      schema.push(data.translationText),
      schema.push(data.translationCultureID)
    }

    if (table == 'local_int_navigation') {
      schema.push(data.itemID),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID),
      schema.push(data.nav_DatasetID),
      schema.push(data.nav_ShopID),
      schema.push(data.nav_NodeID),
      schema.push(data.nav_RangeNodeID),
      schema.push(data.nav_SKUNodeID),
      schema.push(data.nav_SKUID),
      schema.push(data.nav_StockCode),
      schema.push(data.nav_Navigation),
      schema.push(data.nav_ItemAttribute1),
      schema.push(data.nav_ItemAttribute2),
      schema.push(data.nav_ItemAttribute3),
      schema.push(data.nav_ItemAttribute4),
      schema.push(data.nav_ItemAttribute5),
      schema.push(data.nav_ItemAttribute6),
      schema.push(data.nav_ItemAttribute7),
      schema.push(data.nav_ItemAttribute8),
      schema.push(data.nav_ItemAttribute9),
      schema.push(data.nav_ItemAttribute10),
      schema.push(data.nav_ItemAttribute11),
      schema.push(data.nav_ItemAttribute12),
      schema.push(data.nav_ItemAttribute13),
      schema.push(data.nav_ItemAttribute14),
      schema.push(data.nav_ItemAttribute15),
      schema.push(data.nav_RangeDataHeadings),
      schema.push(data.nav_ItemData1),
      schema.push(data.nav_ItemData2),
      schema.push(data.nav_ItemData3),
      schema.push(data.nav_ItemData4),
      schema.push(data.nav_ItemData5),
      schema.push(data.nav_ItemData6),
      schema.push(data.nav_ItemData7),
      schema.push(data.nav_ItemData8),
      schema.push(data.nav_ItemData9),
      schema.push(data.nav_ItemData10),
      schema.push(data.nav_Order),
      schema.push(data.nav_Range),
      schema.push(data.nav_RangeDescription),
      schema.push(data.nav_Suspend),
      schema.push(data.uploadKey),
      schema.push(data.lastUpdate),
      schema.push(data.status),
      schema.push(data.nav_RangeCode),
      schema.push(data.nav_GroupCode),
      schema.push(data.nav_SubGroupCode)

    }

    if (table == 'local_int_nav_attributes') {
      schema.push(data.itemID),
      schema.push(data.nav_DatasetID),
      schema.push(data.nav_ShopID),
      schema.push(data.nav_Path),
      schema.push(data.nav_Lvl1),
      schema.push(data.nav_ColumnLvl2),
      schema.push(data.nav_PositionLvl2),
      schema.push(data.nav_ClickableLvl2),
      schema.push(data.nav_ColumnLvl3),
      schema.push(data.nav_PositionLvl3),
      schema.push(data.nav_ClickableLvl3),
      schema.push(data.nav_itemattributelabel1),
      schema.push(data.nav_itemattributefilter1),
      schema.push(data.nav_itemattributelabel2),
      schema.push(data.nav_itemattributefilter2),
      schema.push(data.nav_itemattributelabel3),
      schema.push(data.nav_itemattributefilter3),
      schema.push(data.nav_itemattributelabel4),
      schema.push(data.nav_itemattributefilter4),
      schema.push(data.nav_itemattributelabel5),
      schema.push(data.nav_itemattributefilter5),
      schema.push(data.nav_itemattributelabel6),
      schema.push(data.nav_itemattributefilter6),
      schema.push(data.nav_itemattributelabel7),
      schema.push(data.nav_itemattributefilter7),
      schema.push(data.nav_itemattributelabel8),
      schema.push(data.nav_itemattributefilter8),
      schema.push(data.nav_itemattributelabel9),
      schema.push(data.nav_itemattributefilter9),
      schema.push(data.nav_itemattributelabel10),
      schema.push(data.nav_itemattributefilter10),
      schema.push(data.nav_itemattributelabel11),
      schema.push(data.nav_itemattributefilter11),
      schema.push(data.nav_itemattributelabel12),
      schema.push(data.nav_itemattributefilter12),
      schema.push(data.nav_itemattributelabel13),
      schema.push(data.nav_itemattributefilter13),
      schema.push(data.nav_itemattributelabel14),
      schema.push(data.nav_itemattributefilter14),
      schema.push(data.nav_itemattributelabel15),
      schema.push(data.nav_itemattributefilter15),
      schema.push(data.nav_Suspend),
      schema.push(data.uploadKey),
      schema.push(data.lastUpdate),
      schema.push(data.status),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID)

    }

    if (table == 'local_ct_deliveryfactors') {
      schema.push(data.itemID),
      schema.push(data.itemName),
      schema.push(data.itemFactor),
      schema.push(data.itemFreeDeliveryValue),
      schema.push(data.itemSiteID),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID)
    }

    if (table == 'local_com_paymentoption') {
      schema.push(data.paymentOptionID),
      schema.push(data.paymentOptionName),
      schema.push(data.paymentOptionDisplayName),
      schema.push(data.paymentOptionEnabled),
      schema.push(data.paymentOptionSiteID),
      schema.push(data.paymentOptionPaymentGateUrl),
      schema.push(data.paymentOptionAssemblyName),
      schema.push(data.paymentOptionClassName),
      schema.push(data.paymentOptionSucceededOrderStatusID),
      schema.push(data.paymentOptionFailedOrderStatusID),
      schema.push(data.paymentOptionGUID),
      schema.push(data.paymentOptionLastModified),
      schema.push(data.paymentOptionAllowIfNoShipping),
      schema.push(data.paymentOptionThumbnailGUID),
      schema.push(data.paymentOptionDescription),
      schema.push(data.paymentOptionAuthorizedOrderStatusID)
    }

    if (table == 'local_ct_storecomments') {
      console.log(data.isDeleted);
      schema.push(data.itemID),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.itemOrder),
      schema.push(data.itemGUID),
      schema.push(data.itemTitle),
      schema.push(data.itemComment),
      schema.push(data.tradeAccID),
      schema.push(0),
      schema.push(data.isDeleted)
    }

    if (table == 'local_ct_customercontacts') {

      schema.push(data.itemID),
      schema.push(data.itemCreatedBy),
      schema.push(data.itemCreatedWhen),
      schema.push(data.itemModifiedBy),
      schema.push(data.itemModifiedWhen),
      schema.push(data.name),
      schema.push(data.itemGUID),
      schema.push(data.addressLine1),
      schema.push(data.addressLine2),
      schema.push(data.addressLine3),
      schema.push(data.city),
      schema.push(data.postCode),
      schema.push(data.phone),
      schema.push(data.email),
      schema.push(data.state),
      schema.push(data.countryId),
      schema.push(data.jobRole),
      schema.push(data.notes),
      schema.push(data.customerId),
      schema.push(data.isDeleted),
      schema.push(data.isDefault),
      schema.push(data.readyToSync == 1 ? 1 : 0 )
      schema.push(data.itemID)

    }


   return schema;

}


export default createTableSchema;
