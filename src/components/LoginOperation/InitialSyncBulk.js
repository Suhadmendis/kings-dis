import openDatabaseService from '../../offline/Config';

async function InitialSyncBulk(
  table,
  data,
  preSeason = '0',
  saveFlag = '',
  isInitial = true
) {
  const db = openDatabaseService();

  const head = getHead(table);

  const sub = getSub(table, data, preSeason, saveFlag, isInitial);

  let query = `INSERT INTO ${table} ${head} VALUES ${sub}`;

  console.log(query);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        function (tx, res) {
          if (table == 'local_com_orderitem') {
            console.log('111111111----------------');
          }
          if (res.rows.length == 0) {
            resolve(null);
          } else {
            resolve('SUCCESS');
          }
        },
        function (errorTx, error) {
          console.log(errorTx);
          if (table == 'local_com_orderitem') {
            console.log('33333333----------------');
          }

          // console.error('Error occurred while executing SQL: ', error.message);
          reject(error);
        }
      );
    });
  });
}

function getHead(tableName) {
  let schema = '';

  if (tableName == 'local_com_sku') {
    schema =
      '(SKUID, SKUNumber, SKUName, SKUDescription, SKUPrice, SKUEnabled, SKUDepartmentID, SKUManufacturerID, SKUInternalStatusID, SKUPublicStatusID, SKUSupplierID, SKUAvailableInDays, SKUGUID, SKUImagePath, SKUWeight, SKUWidth, SKUDepth, SKUHeight, SKUAvailableItems, SKUSellOnlyAvailable, SKUCustomData, SKUOptionCategoryID, SKUOrder, SKULastModified, SKUCreated, SKUSiteID, SKUNeedsShipping, SKUValidUntil, SKUProductType, SKUMaxItemsInOrder, SKUValidity, SKUValidFor, SKUMembershipGUID, SKUConversionName, SKUConversionValue, SKUBundleInventoryType, SKUMinItemsInOrder, SKURetailPrice, SKUParentSKUID, SKUShortDescription, SKUEproductFilesCount, SKUBundleItemsCount, SKUInStoreFrom, SKUReorderAt, SKUTrackInventory, SKUTaxClassID, SKUBrandID, SKUCollectionID, SKUClassCode, SKUClassTable, SKUDataSetID, SKUImageLocation, SKUCatNumber, SKUPackSize, SKUFeatures, SKUDelMonth, SKUBarCode, SKUPrice2, SKUPrice3, SKUPrice4, SKUPrice5, SKUPrice6, SKUPrice7, SKUPrice8, SKUPrice9, SKUPrice10, SKUPrice1Label, SKUPrice2Label, SKUPrice3Label, SKUPrice4Label, SKUPrice5Label, SKUPrice6Label, SKUPrice7Label, SKUPrice8Label, SKUPrice9Label, SKUPrice10Label, SKUAnalysis, SkuDiscountCat, SKUPictorialPackSize, SkuPricePreSeason, SkuPreSeason, SkuPreSeasonOnly)';
  }

  if (tableName == 'local_cms_country') {
    schema =
      '(CountryID, CountryDisplayName, CountryName, CountryGUID, CountryLastModified, CountryTwoLetterCode, CountryThreeLetterCode, CountryStateRequired, CountryGroupCode, CountryGroupID)';
  }

  if (tableName == 'local_cms_state') {
    schema =
      '(StateID, StateDisplayName, StateName, StateCode, CountryID, StateGUID, StateLastModified)';
  }

  if (tableName == 'local_cms_role') {
    schema =
      '(RoleID, RoleDisplayName, RoleName, RoleDescription, SiteID, RoleGUID, RoleLastModified, RoleGroupID, RoleIsGroupAdministrator, RoleIsDomain)';
  }

  if (tableName == 'local_cms_user') {
    schema =
      '(UserID, UserName, FirstName, MiddleName, LastName, FullName, Email, UserPassword, PreferredCultureCode, PreferredUICultureCode, UserEnabled, UserIsExternal, UserPasswordFormat, UserCreated, LastLogon, UserStartingAliasPath, UserGUID, UserLastModified, UserLastLogonInfo, UserIsHidden, UserVisibility, UserIsDomain, UserHasAllowedCultures, UserMFRequired, UserPrivilegeLevel, UserSecurityStamp, UserMFSecret, UserMFTimestep, UserBuyerCode, UserDataSetID, UserAccCode, UserUploadKey, UserPasswordChangedOnWeb, UserTitle, AgreedPromotions, WishToDeleteAccount, UserAPISecret, UserAPIEnabled)';
  }

  if (tableName == 'local_cms_userrole') {
    schema = '(UserID, RoleID, ValidTo, UserRoleID)';
  }

  if (tableName == 'local_com_customer') {
    schema =
      '(CustomerID, CustomerFirstName, CustomerLastName, CustomerEmail, CustomerPhone, CustomerFax, CustomerCompany, CustomerUserID, CustomerGUID, CustomerTaxRegistrationID, CustomerOrganizationID, CustomerLastModified, CustomerSiteID, CustomerCreated, CustomerEnabled, CustomerPreferredCurrencyID, CustomerPreferredShippingOptionID, CustomerPreferredPaymentOptionID, CustomerAccCode, CustomerBuyerCode, CustomerDataSetID, CustomerMobile, CustomerJob, CustomerWeb, CustomerDefaultPaymentAddressID, CustomerDefaultDeliveryAddressID, CustomerUploadKey, Customer_SyncStatus, LastUpdate, CustomerContactTitle, CustomerAllotmentPlotID, CustomerKey1, CatYear, CustomerSalesRepKey)';
  }

  if (tableName == 'local_com_address') {
    schema =
      '(AddressID, AddressName, AddressLine1, AddressLine2, AddressCity, AddressZip, AddressPhone, AddressCustomerID, AddressCountryID, AddressStateID, AddressPersonalName, AddressGUID, AddressLastModified, AddressLine4, AddressLine3, AddressEnabled, AddressIsBilling, AddressIsShipping, AddressWebOnly, AddressIsDefault, AddressAccCode, AddressCode, AddressDataSetID, Address_SyncStatus, LastUpdate, AddressContactTitle, AddressFirstName, AddressLastName, AddressUploadKey, AddressOldID, DisplayOrder, WebAddressID, ReadyToSync)';
  }

  if (tableName == 'local_ct_userappointments') {
    schema =
      '(ItemID, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID, Email, Subject, Location, StartDate, EndDate, Note, TradeAccID, IsDeleted, ReadyToSync, ReadyToUpdate)';
  }

  if (tableName == 'local_com_shoppingcart') {
    schema =
      '(ShoppingCartID, ShoppingCartGUID, ShoppingCartUserID, ShoppingCartSiteID, ShoppingCartLastUpdate, ShoppingCartCurrencyID, ShoppingCartPaymentOptionID, ShoppingCartShippingOptionID, ShoppingCartBillingAddressID, ShoppingCartShippingAddressID, ShoppingCartCustomerID, ShoppingCartNote, ShoppingCartCompanyAddressID, ShoppingCartCustomData, ShoppingCartContactID, AppShoppingCartPreSeason, AppShoppingCartName, AppShoppingCartSaveFlag, ShoppingCartIsPreSeason, ToEmail, ReadyToSync)';
  }

  if (tableName == 'local_com_shoppingcartsku') {
    schema =
      '(CartItemID, ShoppingCartID, SKUID, SKUUnits, CartItemCustomData, CartItemGuid, CartItemParentGuid, CartItemValidTo, CartItemBundleGUID, CartItemText, CartItemAutoAddedUnits, CartItemUnitListPrice, CartItemUnitPrice, CartItemUnitDiscount, CartItemPrice, CartItemDiscountRate, CartItemQuoteLineDiscount, CartItemQuoteLineDiscountType, CartItemQuoteYourPrice, CartItemPriceLine, CartItemLineTax, CartItemNote, CartItemBackCard)';
  }

  if (tableName == 'local_com_order') {
    schema =
      '(OrderID, OrderShippingOptionID, OrderTotalShipping, OrderTotalPrice, OrderTotalTax, OrderDate, OrderStatusID, OrderCurrencyID, OrderCustomerID, OrderCreatedByUserID, OrderNote, OrderSiteID, OrderPaymentOptionID, OrderInvoice, OrderInvoiceNumber, OrderTrackingNumber, OrderCustomData, OrderPaymentResult, OrderGUID, OrderLastModified, OrderTotalPriceInMainCurrency, OrderIsPaid, OrderCulture, OrderDiscounts, OrderGrandTotal, OrderGrandTotalInMainCurrency, OrderOtherPayments, OrderTaxSummary, OrderCouponCodes, OrderPONumber, OrderAPayment, OrderPaymentType, OrderBillingAddressID, OrderShippingAddressID, OrderDataSetID, OrderAccountsReference, LastUpdate, OrderPartShipment, OrderComments, OrderType, OrderInsertedToDim, OrderSageVendorTxCode, OrderReceiptInseredToDim, OrderAbandonedStatus, OrderToEmail, OrderRegNumber, OrderQuoteID, UnavaiableItems, OrderPreseason, WebOrderID)';
  }

  if (tableName == 'local_cms_settingskey') {
    schema =
      '(KeyID, KeyName, KeyDisplayName, KeyDescription, KeyValue, KeyType, KeyCategoryID, SiteID, KeyGUID, KeyLastModified, KeyOrder, KeyDefaultValue, KeyValidation, KeyEditingControlPath, KeyIsGlobal, KeyIsCustom, KeyIsHidden, KeyFormControlSettings, KeyExplanationText)';
  }

  if (tableName == 'local_com_orderaddress') {
    schema =
      '(AddressID, AddressLine1, AddressLine2, AddressCity, AddressZip, AddressPhone, AddressCountryID, AddressStateID, AddressPersonalName, AddressGUID, AddressLastModified, AddressOrderID, AddressType, AddressLine3, AddressLine4, CustomerAddressID, WebOrderAddressID, LocalCustomerAddressID)';
  }

  if (tableName == 'local_com_orderitem') {
    schema =
      '(OrderItemID, OrderItemOrderID, OrderItemSKUID, OrderItemSKUName, OrderItemUnitPrice, OrderItemUnitCount, OrderItemCustomData, OrderItemGuid, OrderItemParentGuid, OrderItemLastModified, OrderItemValidTo, OrderItemBundleGUID, OrderItemTotalPriceInMainCurrency, OrderItemSendNotification, OrderItemText, OrderItemProductDiscounts, OrderItemDiscountSummary, OrderItemTotalPrice, OrderItemUnitListPrice, OrderItemUnitDiscount, OrderItemDiscountRate, OrderItemDataSetID, OrderItemAccountsReference, OrderItemOrderInvoiceNumber, OrderItemQtyDelivered, OrderItemQtyInvoiced, OrderInvoiceNumber, OrderInsertedToDim, od_OHID_DSID, BatchName, OrderItemPriceLine, OrderItemNote, OrderItemBackCard, WebOrderItemID)';
  }

  if (tableName == 'local_com_orderstatus') {
    schema =
      '(StatusID, StatusName, StatusDisplayName, StatusOrder, StatusEnabled, StatusColor, StatusGUID, StatusLastModified, StatusSendNotification, StatusSiteID, StatusOrderIsPaid)';
  }

  if (tableName == 'local_ct_tradeaccount') {
    schema =
      '(ItemID, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID, ItemDataSetID, ItemCode, ItemName, ItemAdminFirstName, ItemAdminLastName, ItemAddressLine1, ItemAddressLine2, ItemCity, ItemCounty, ItemPostcode, ItemCountryId, ItemAdminEmail, ItemAdminPhone, ItemNotes, ItemOnStop, ItemEnabled, ItemSiteID, ItemAccBalance, ItemCreditLimit, ItemPriceKey, ItemLineDiscount, ItemTotalDiscount, ItemTaxable, ItemTaxCode, ItemCurrencyCode, ItemStaffEmail, ItemType, ItemKey1, ItemKey2, ItemKey3, ItemDiscGroup1, ItemDiscGroup2, ItemDiscGroup3, ItemDiscGroup4, ItemAccAreaCode, IsSynced)';
  }

  if (tableName == 'local_ct_tradeaccountcustomer') {
    schema =
      '(ItemID, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID, TradeAccId, TradeAccName, CustomerId, CustomerName, ItemIsAdmin)';
  }

  if (tableName == 'local_ct_deliverymatrix') {
    schema =
      '(ItemID, ItemCountryGroupID, ItemPostcodeZoneID, ItemDeliveryFactors, ItemShippingOptionID, ItemPrice, ItemRestrictedToPaymentOption, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID, ItemSiteID, ItemSiteRoleID, ItemDiscountedPrice, ItemPriceLabel)';
  }

  if (tableName == 'local_ct_countrygroup') {
    schema =
      '(ItemID, ItemName, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID)';
  }

  if (tableName == 'local_ct_postcodes') {
    schema =
      '(ItemID, ItemPostcode, ItemX, ItemY, ItemLatitude, ItemLongitude, ItemTown, ItemCounty, ItemCountyID, ItemZone, ItemZoneID, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID)';
  }

  if (tableName == 'local_ct_postcodezone') {
    schema =
      '(ItemID, ItemName, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID)';
  }

  if (tableName == 'local_com_shippingoption') {
    schema =
      '(ShippingOptionID, ShippingOptionName, ShippingOptionDisplayName, ShippingOptionEnabled, ShippingOptionSiteID, ShippingOptionGUID, ShippingOptionLastModified, ShippingOptionThumbnailGUID, ShippingOptionDescription, ShippingOptionCarrierID, ShippingOptionCarrierServiceName, ShippingOptionTaxClassID, ShippingOptionCountryIDs)';
  }

  if (tableName == 'local_int_salestax') {
    schema =
      '(ItemID, stax_Code, stax_Name, stax_Region, stax_RegionType, stax_Rate, stax_IsFlatValue, stax_DataSetID, UploadKey, LastUpdate, Status, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID)';
  }

  if (tableName == 'local_int_analysis') {
    schema =
      '(ItemID, Ana_DataSetID, Ana_Code, Ana_Name, Ana_VatCode, UploadKey, LastUpdate, Status, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID)';
  }

  if (tableName == 'local_int_contactnotes') {
    schema = '(Id, CusId, Note, NoteTitle, Date)';
  }

  if (tableName == 'local_contacts') {
    schema =
      '(id, name, addressLine1, addressLine2, addressLine3, city, postCode, phone, email, state, country, countryId, jobRole, notes, customerId)';
  }

  if (tableName == 'local_ct_quotes') {
    schema =
      '(ItemID, ItemCustomerID, ItemShoppingCartID, ItemSiteID, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID, ItemQuoteLabel, ItemQuoteTotal, ItemQuoteDelivery)';
  }

  if (tableName == 'local_ct_quotestatus') {
    schema =
      '(ItemID, ItemDisplayName, ItemName, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID)';
  }

  if (tableName == 'local_ct_quotestatususer') {
    schema =
      '(ItemID, ItemQuoteID, ItemQuoteStatusID, ItemSiteID, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID)';
  }

  if (tableName == 'local_orderpad') {
    schema =
      '(id, uniqId, title, des, code, packSize, priceOptions, qty, unitPrice, lineTotal)';
  }

  if (tableName == 'local_cms_culture') {
    schema =
      '(CultureID, CultureName, CultureCode, CultureShortName, CultureGUID, CultureLastModified, CultureAlias, CultureIsUICulture)';
  }
  if (tableName == 'local_cms_resource') {
    schema =
      '(ResourceID, ResourceDisplayName, ResourceName, ResourceDescription, ShowInDevelopment, ResourceURL, ResourceGUID, ResourceLastModified, ResourceIsInDevelopment, ResourceHasFiles, ResourceVersion, ResourceAuthor, ResourceInstallationState, ResourceInstalledVersion)';
  }
  if (tableName == 'local_cms_resourcestring') {
    schema = '(StringID, StringKey, StringIsCustom, StringGUID)';
  }
  if (tableName == 'local_cms_resourcetranslation') {
    schema =
      '(TranslationID, TranslationStringID, TranslationText, TranslationCultureID)';
  }
  if (tableName == 'local_int_navigation') {
    schema =
      '(ItemID, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID, Nav_DatasetID, Nav_ShopID, Nav_NodeID, Nav_RangeNodeID, Nav_SKUNodeID, Nav_SKUID, Nav_StockCode, Nav_Navigation, Nav_ItemAttribute1, Nav_ItemAttribute2, Nav_ItemAttribute3, Nav_ItemAttribute4, Nav_ItemAttribute5, Nav_ItemAttribute6, Nav_ItemAttribute7, Nav_ItemAttribute8, Nav_ItemAttribute9, Nav_ItemAttribute10, Nav_ItemAttribute11, Nav_ItemAttribute12, Nav_ItemAttribute13, Nav_ItemAttribute14, Nav_ItemAttribute15, Nav_RangeDataHeadings, Nav_ItemData1, Nav_ItemData2, Nav_ItemData3, Nav_ItemData4, Nav_ItemData5, Nav_ItemData6, Nav_ItemData7, Nav_ItemData8, Nav_ItemData9, Nav_ItemData10, Nav_Order, Nav_Range, Nav_RangeDescription, Nav_Suspend, UploadKey, LastUpdate, Status, Nav_RangeCode, Nav_GroupCode, Nav_SubGroupCode)';
  }
  if (tableName == 'local_int_nav_attributes') {
    schema =
      '(ItemID, Nav_DatasetID, Nav_ShopID, Nav_Path, Nav_Lvl1, Nav_ColumnLvl2, Nav_PositionLvl2, Nav_ClickableLvl2, Nav_ColumnLvl3, Nav_PositionLvl3, Nav_ClickableLvl3, Nav_itemattributelabel1, Nav_itemattributefilter1, Nav_itemattributelabel2, Nav_itemattributefilter2, Nav_itemattributelabel3, Nav_itemattributefilter3, Nav_itemattributelabel4, Nav_itemattributefilter4, Nav_itemattributelabel5, Nav_itemattributefilter5, Nav_itemattributelabel6, Nav_itemattributefilter6, Nav_itemattributelabel7, Nav_itemattributefilter7, Nav_itemattributelabel8, Nav_itemattributefilter8, Nav_itemattributelabel9, Nav_itemattributefilter9, Nav_itemattributelabel10, Nav_itemattributefilter10, Nav_itemattributelabel11, Nav_itemattributefilter11, Nav_itemattributelabel12, Nav_itemattributefilter12, Nav_itemattributelabel13, Nav_itemattributefilter13, Nav_itemattributelabel14, Nav_itemattributefilter14, Nav_itemattributelabel15, Nav_itemattributefilter15, Nav_Suspend, UploadKey, LastUpdate, Status, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID)';
  }
  if (tableName == 'local_ct_deliveryfactors') {
    schema =
      '(ItemID, ItemName, ItemFactor, ItemFreeDeliveryValue, ItemSiteID, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID)';
  }
  if (tableName == 'local_com_paymentoption') {
    schema =
      '(PaymentOptionID, PaymentOptionName, PaymentOptionDisplayName, PaymentOptionEnabled, PaymentOptionSiteID, PaymentOptionPaymentGateUrl, PaymentOptionAssemblyName, PaymentOptionClassName, PaymentOptionSucceededOrderStatusID, PaymentOptionFailedOrderStatusID, PaymentOptionGUID, PaymentOptionLastModified, PaymentOptionAllowIfNoShipping, PaymentOptionThumbnailGUID, PaymentOptionDescription, PaymentOptionAuthorizedOrderStatusID)';
  }
  if (tableName == 'local_ct_storecomments') {
    schema =
      '(ItemID, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID, ItemTitle, ItemComment, TradeAccID, ReadyToSync, IsDeleted)';
  }
  if (tableName == 'local_ct_customercontacts') {
    schema =
      '(ItemID, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, Name, ItemGUID, AddressLine1, AddressLine2, AddressLine3, City, PostCode, Phone, Email, State, CountryId, JobRole, Notes, CustomerId, IsDeleted, IsDefault, ReadyToSync, WebContactId)';
  }

  return schema;
}

function getSub(tableName, data, preSeason, saveFlag, isInitial) {
  let schema = '';
  // let ary = [];
  // for (let index = 0; index <280; index++) {
  //   ary.push(data[index])  
  // }
  if (tableName == 'local_com_sku') {
    data.forEach((element) => {
      element.skuNumber = element.skuNumber
        ? element.skuNumber.replace(/'/g, "''")
        : '';
      element.skuName = element.skuName
        ? element.skuName.replace(/'/g, "''")
        : '';
      element.skuDescription = element.skuDescription
        ? element.skuDescription.replace(/'/g, "''")
        : '';
      element.skuguid = element.skuguid
        ? element.skuguid.replace(/'/g, "''")
        : '';
      element.skuImagePath = element.skuImagePath
        ? element.skuImagePath.replace(/'/g, "''")
        : '';
      element.skuCustomData = element.skuCustomData
        ? element.skuCustomelement.replace(/'/g, "''")
        : '';
      element.skuLastModified = element.skuLastModified
        ? element.skuLastModified.replace(/'/g, "''")
        : '';
      element.skuCreated = element.skuCreated
        ? element.skuCreated.replace(/'/g, "''")
        : '';
      element.skuValidUntil = element.skuValidUntil
        ? element.skuValidUntil.replace(/'/g, "''")
        : '';
      element.skuProductType = element.skuProductType
        ? element.skuProductType.replace(/'/g, "''")
        : '';
      element.skuMembershipGUID = element.skuMembershipGUID
        ? element.skuMembershipGUID.replace(/'/g, "''")
        : '';
      element.skuConversionName = element.skuConversionName
        ? element.skuConversionName.replace(/'/g, "''")
        : '';
      element.skuConversionValue = element.skuConversionValue
        ? element.skuConversionValue.replace(/'/g, "''")
        : '';
      element.skuBundleInventoryType = element.skuBundleInventoryType
        ? element.skuBundleInventoryType.replace(/'/g, "''")
        : '';
      element.skuShortDescription = element.skuShortDescription
        ? element.skuShortDescription.replace(/'/g, "''")
        : '';
      element.skuInStoreFrom = element.skuInStoreFrom
        ? element.skuInStoreFrom.replace(/'/g, "''")
        : '';
      element.skuTrackInventory = element.skuTrackInventory
        ? element.skuTrackInventory.replace(/'/g, "''")
        : '';
      element.skuClassCode = element.skuClassCode
        ? element.skuClassCode.replace(/'/g, "''")
        : '';
      element.skuClassTable = element.skuClassTable
        ? element.skuClassTable.replace(/'/g, "''")
        : '';
      element.skuImageLocation = element.skuImageLocation
        ? element.skuImageLocation.replace(/'/g, "''")
        : '';
      element.skuCatNumber = element.skuCatNumber
        ? element.skuCatNumber.replace(/'/g, "''")
        : '';
      element.skuPackSize = element.skuPackSize
        ? element.skuPackSize.replace(/'/g, "''")
        : '';
      element.skuFeatures = element.skuFeatures
        ? element.skuFeatures.replace(/'/g, "''")
        : '';
      element.skuDelMonth = element.skuDelMonth
        ? element.skuDelMonth.replace(/'/g, "''")
        : '';
      element.skuPrice1Label = element.skuPrice1Label
        ? element.skuPrice1Label.replace(/'/g, "''")
        : '';
      element.skuPrice2Label = element.skuPrice2Label
        ? element.skuPrice2Label.replace(/'/g, "''")
        : '';
      element.skuPrice3Label = element.skuPrice3Label
        ? element.skuPrice3Label.replace(/'/g, "''")
        : '';
      element.skuPrice4Label = element.skuPrice4Label
        ? element.skuPrice4Label.replace(/'/g, "''")
        : '';
      element.skuPrice5Label = element.skuPrice5Label
        ? element.skuPrice5Label.replace(/'/g, "''")
        : '';
      element.skuPrice6Label = element.skuPrice6Label
        ? element.skuPrice6Label.replace(/'/g, "''")
        : '';
      element.skuPrice7Label = element.skuPrice7Label
        ? element.skuPrice7Label.replace(/'/g, "''")
        : '';
      element.skuPrice8Label = element.skuPrice8Label
        ? element.skuPrice8Label.replace(/'/g, "''")
        : '';
      element.skuPrice9Label = element.skuPrice9Label
        ? element.skuPrice9Label.replace(/'/g, "''")
        : '';
      element.skuPrice10Label = element.skuPrice10Label
        ? element.skuPrice10Label.replace(/'/g, "''")
        : '';

      schema += `(${element.skuid},'${element.skuNumber}','${
        element.skuName
      }','${element.skuDescription}',${element.skuPrice},${
        element.skuEnabled ? 1 : 0
      },${element.skuDepartmentID},${element.skuManufacturerID},${
        element.skuInternalStatusID
      },${element.skuPublicStatusID},${element.skuSupplierID},${
        element.skuAvailableInDays
      },'${element.skuguid}','${element.skuImagePath}',${element.skuWeight},${
        element.skuWidth
      },${element.skuDepth},${element.skuHeight},${element.skuAvailableItems},${
        element.skuSellOnlyAvailable ? 1 : 0
      },'${element.skuCustomData}',${element.skuOptionCategoryID},${
        element.skuOrder
      },'${element.skuLastModified}','${element.skuCreated}',${
        element.skuSiteID
      },${element.skuNeedsShippin ? 1 : 0},'${element.skuValidUntil}','${
        element.skuProductType
      }',${element.skuMaxItemsInOrder},'${element.skuValidity}',${
        element.skuValidFor
      },'${element.skuMembershipGUID}','${element.skuConversionName}','${
        element.skuConversionValue
      }','${element.skuBundleInventoryType}',${element.skuMinItemsInOrder},${
        element.skuRetailPrice
      },${element.skuParentSKUID},'${element.skuShortDescription}',${
        element.skuEproductFilesCount
      },${element.skuBundleItemsCount},'${element.skuInStoreFrom}',${
        element.skuReorderAt
      },'${element.skuTrackInventory}',${element.skuTaxClassID},${
        element.skuBrandID
      },${element.skuCollectionID},'${element.skuClassCode}','${
        element.skuClassTable
      }',${element.skuDataSetID},'${element.skuImageLocation}','${
        element.skuCatNumber
      }','${element.skuPackSize}','${element.skuFeatures}','${
        element.skuDelMonth
      }','${element.skuBarCode}',${element.skuPrice2},${element.skuPrice3},${
        element.skuPrice4
      },${element.skuPrice5},${element.skuPrice6},${element.skuPrice7},${
        element.skuPrice8
      },${element.skuPrice9},${element.skuPrice10},'${
        element.skuPrice1Label
      }','${element.skuPrice2Label}','${element.skuPrice3Label}','${
        element.skuPrice4Label
      }','${element.skuPrice5Label}','${element.skuPrice6Label}','${
        element.skuPrice7Label
      }','${element.skuPrice8Label}','${element.skuPrice9Label}','${
        element.skuPrice10Label
      }','${element.skuAnalysis}','${element.skuDiscountCat}',${
        element.skuPictorialPackSize
      },${
        element.skuPricePreSeason
      },${
        element.skuPreSeason  ? 1 : 0
      },${
        element.skuPreSeasonOnly ? 1 : 0
      }),`;
    });
  }

  // let ary = [];

  // ary.push(data[0])
  if (tableName == 'local_cms_country') {
    data.forEach((element) => {
      element.countryDisplayName = element.countryDisplayName
        ? element.countryDisplayName.replace(/'/g, "''")
        : '';
      element.countryName = element.countryName
        ? element.countryName.replace(/'/g, "''")
        : '';
      element.countryGUID = element.countryGUID
        ? element.countryGUID.replace(/'/g, "''")
        : '';
      element.countryLastModified = element.countryLastModified
        ? element.countryLastModified.replace(/'/g, "''")
        : '';
      element.countryTwoLetterCode = element.countryTwoLetterCode
        ? element.countryTwoLetterCode.replace(/'/g, "''")
        : '';
      element.countryThreeLetterCode = element.countryThreeLetterCode
        ? element.countryThreeLetterCode.replace(/'/g, "''")
        : '';
      element.countryGroupCode = element.countryGroupCode
        ? element.countryGroupCode.replace(/'/g, "''")
        : '';

      // Append a SQL tuple to the `schema` string for each element
      schema += `(${element.countryID},'${element.countryDisplayName}','${element.countryName}','${element.countryGUID}','${element.countryLastModified}','${element.countryTwoLetterCode}','${element.countryThreeLetterCode}',${element.countryStateRequired ? 1 :0},'${element.countryGroupCode}',${element.countryGroupID}),`;
    });
  }

  if (tableName == 'local_cms_state') {
    data.forEach((element) => {
      element.stateDisplayName = element.stateDisplayName
        ? element.stateDisplayName.replace(/'/g, "''")
        : '';
      element.stateName = element.stateName
        ? element.stateName.replace(/'/g, "''")
        : '';
      element.stateCode = element.stateCode
        ? element.stateCode.replace(/'/g, "''")
        : '';
      element.stateGUID = element.stateGUID
        ? element.stateGUID.replace(/'/g, "''")
        : '';
      element.stateLastModified = element.stateLastModified
        ? element.stateLastModified.replace(/'/g, "''")
        : '';

      schema += `(${element.stateID},'${element.stateDisplayName}','${element.stateName}','${element.stateCode}',${element.countryID},'${element.stateGUID}','${element.stateLastModified}'),`;
    });
  }

  if (tableName == 'local_cms_role') {
    data.forEach((element) => {
      element.roleDisplayName = element.roleDisplayName
        ? element.roleDisplayName.replace(/'/g, "''")
        : '';
      element.roleName = element.roleName
        ? element.roleName.replace(/'/g, "''")
        : '';
      element.roleDescription = element.roleDescription
        ? element.roleDescription.replace(/'/g, "''")
        : '';
      element.roleGUID = element.roleGUID
        ? element.roleGUID.replace(/'/g, "''")
        : '';
      element.roleLastModified = element.roleLastModified
        ? element.roleLastModified.replace(/'/g, "''")
        : '';

      schema += `(${element.roleID},'${element.roleDisplayName}','${
        element.roleName
      }','${element.roleDescription}',${element.siteID},'${
        element.roleGUID
      }','${element.roleLastModified}',${element.roleGroupID},${
        element.roleIsGroupAdministrator ? 1 : 0
      },${element.roleIsDomain ? 1 : 0}),`;
    });
  }

  if (tableName == 'local_cms_user') {
    data.forEach((element) => {
      element.userName = element.userName
        ? element.userName.replace(/'/g, "''")
        : '';
      element.firstName = element.firstName
        ? element.firstName.replace(/'/g, "''")
        : '';
      element.middleName = element.middleName
        ? element.middleName.replace(/'/g, "''")
        : '';
      element.lastName = element.lastName
        ? element.lastName.replace(/'/g, "''")
        : '';
      element.fullName = element.fullName
        ? element.fullName.replace(/'/g, "''")
        : '';
      element.email = element.email ? element.email.replace(/'/g, "''") : '';
      element.userPassword = element.userPassword
        ? element.userPassword.replace(/'/g, "''")
        : '';
      element.preferredCultureCode = element.preferredCultureCode
        ? element.preferredCultureCode.replace(/'/g, "''")
        : '';
      element.preferredUICultureCode = element.preferredUICultureCode
        ? element.preferredUICultureCode.replace(/'/g, "''")
        : '';
      element.userPasswordFormat = element.userPasswordFormat
        ? element.userPasswordFormat.replace(/'/g, "''")
        : '';
      element.userCreated = element.userCreated
        ? element.userCreated.replace(/'/g, "''")
        : '';
      element.lastLogon = element.lastLogon
        ? element.lastLogon.replace(/'/g, "''")
        : '';
      element.userStartingAliasPath = element.userStartingAliasPath
        ? element.userStartingAliasPath.replace(/'/g, "''")
        : '';
      element.userGUID = element.userGUID
        ? element.userGUID.replace(/'/g, "''")
        : '';
      element.userLastModified = element.userLastModified
        ? element.userLastModified.replace(/'/g, "''")
        : '';
      element.userLastLogonInfo = element.userLastLogonInfo
        ? element.userLastLogonInfo.replace(/'/g, "''")
        : '';
      // element.userIsHidden = element.userIsHidden ? element.userIsHidden.replace(/'/g, "''") : '';
      element.userVisibility = element.userVisibility
        ? element.userVisibility.replace(/'/g, "''")
        : '';
      // element.userIsDomain = element.userIsDomain ? element.userIsDomain.replace(/'/g, "''") : '';
      // element.userHasAllowedCultures = element.userHasAllowedCultures ? element.userHasAllowedCultures.replace(/'/g, "''") : '';
      // element.userMFRequired = element.userMFRequired ? element.userMFRequired.replace(/'/g, "''") : '';
      element.userSecurityStamp = element.userSecurityStamp
        ? element.userSecurityStamp.replace(/'/g, "''")
        : '';
      element.userMFSecret = element.userMFSecret
        ? element.userMFSecret.replace(/'/g, "''")
        : '';
      element.userMFTimestep = element.userMFTimestep
        ? element.userMFTimestep.replace(/'/g, "''")
        : '';
      element.userBuyerCode = element.userBuyerCode
        ? element.userBuyerCode.replace(/'/g, "''")
        : '';
      element.userAccCode = element.userAccCode
        ? element.userAccCode.replace(/'/g, "''")
        : '';
      element.userUploadKey = element.userUploadKey
        ? element.userUploadKey.replace(/'/g, "''")
        : '';
      element.userPasswordChangedOnWeb = element.userPasswordChangedOnWeb
        ? element.userPasswordChangedOnWeb.replace(/'/g, "''")
        : '';
      element.userTitle = element.userTitle
        ? element.userTitle.replace(/'/g, "''")
        : '';
      element.agreedPromotions = element.agreedPromotions
        ? element.agreedPromotions.replace(/'/g, "''")
        : '';
      element.wishToDeleteAccount = element.wishToDeleteAccount
        ? element.wishToDeleteAccount.replace(/'/g, "''")
        : '';
      element.userAPISecret = element.userAPISecret
        ? element.userAPISecret.replace(/'/g, "''")
        : '';
      element.userAPIEnabled = element.userAPIEnabled
        ? element.userAPIEnabled.replace(/'/g, "''")
        : '';

      schema +=`(${element.userID},'${element.userName}','${element.firstName}','${element.middleName}','${element.lastName}','${element.fullName}','${element.email}','${element.userPassword}','${element.preferredCultureCode}','${element.preferredUICultureCode}',${element.userEnabled ? 1 : 0},${element.userIsExternal ? 1 : 0},'${element.userPasswordFormat}','${element.userCreated}','${element.lastLogon}','${element.userStartingAliasPath}','${element.userGUID}','${element.userLastModified}','${element.userLastLogonInfo}',${element.userIsHidden ? 1 : 0},'${element.userVisibility}',${element.userIsDomain ? 1 : 0},${element.userHasAllowedCultures ? 1 : 0},${element.userMFRequired ? 1 : 0},${element.userPrivilegeLevel},'${element.userSecurityStamp}','${element.userMFSecret}','${element.userMFTimestep}','${element.userBuyerCode}',${element.userDataSetID},'${element.userAccCode}','${element.userUploadKey}','${element.userPasswordChangedOnWeb}','${element.userTitle}','${element.agreedPromotions}','${element.wishToDeleteAccount}','${element.userAPISecret}','${element.userAPIEnabled}'),`;
    });
  }

  if (tableName == 'local_cms_userrole') {
    data.forEach((element) => {
      element.validTo = element.validTo
        ? element.validTo.replace(/'/g, "''")
        : '';

      schema += `(${element.userID},${element.roleID},'${element.validTo}',${element.userRoleID}),`;
    });
  }

  if (tableName == 'local_com_customer') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes for all string fields
      element.customerFirstName = element.customerFirstName
        ? element.customerFirstName.replace(/'/g, "''")
        : '';
      element.customerLastName = element.customerLastName
        ? element.customerLastName.replace(/'/g, "''")
        : '';
      element.customerEmail = element.customerEmail
        ? element.customerEmail.replace(/'/g, "''")
        : '';
      element.customerPhone = element.customerPhone
        ? element.customerPhone.replace(/'/g, "''")
        : '';
      element.customerFax = element.customerFax
        ? element.customerFax.replace(/'/g, "''")
        : '';
      element.customerCompany = element.customerCompany
        ? element.customerCompany.replace(/'/g, "''")
        : '';
      element.customerGUID = element.customerGUID
        ? element.customerGUID.replace(/'/g, "''")
        : '';
      element.customerLastModified = element.customerLastModified
        ? element.customerLastModified.replace(/'/g, "''")
        : '';
      element.customerCreated = element.customerCreated
        ? element.customerCreated.replace(/'/g, "''")
        : '';
      element.customerAccCode = element.customerAccCode
        ? element.customerAccCode.replace(/'/g, "''")
        : '';
      element.customerBuyerCode = element.customerBuyerCode
        ? element.customerBuyerCode.replace(/'/g, "''")
        : '';
      element.customerMobile = element.customerMobile
        ? element.customerMobile.replace(/'/g, "''")
        : '';
      element.customerJob = element.customerJob
        ? element.customerJob.replace(/'/g, "''")
        : '';
      element.customerWeb = element.customerWeb
        ? element.customerWeb.replace(/'/g, "''")
        : '';
      element.customerUploadKey = element.customerUploadKey
        ? element.customerUploadKey.replace(/'/g, "''")
        : '';
      element.lastUpdate = element.lastUpdate
        ? element.lastUpdate.replace(/'/g, "''")
        : '';
      element.customerContactTitle = element.customerContactTitle
        ? element.customerContactTitle.replace(/'/g, "''")
        : '';
      element.customerKey1 = element.customerKey1
        ? element.customerKey1.replace(/'/g, "''")
        : '';
      element.catYear = element.catYear
        ? element.catYear.replace(/'/g, "''")
        : '';
      element.customerSalesRepKey = element.customerSalesRepKey
        ? element.customerSalesRepKey.replace(/'/g, "''")
        : '';

      // Append a SQL tuple to the `schema` string for each element
      schema += `(${element.customerID},'${element.customerFirstName}','${element.customerLastName}','${element.customerEmail}','${element.customerPhone}','${element.customerFax}','${element.customerCompany}',${element.customerUserID},'${element.customerGUID}',${element.customerTaxRegistrationID},${element.customerOrganizationID},'${element.customerLastModified}',${element.customerSiteID},'${element.customerCreated}',${element.customerEnabled ? 1: 0},${element.customerPreferredCurrencyID},${element.customerPreferredShippingOptionID},${element.customerPreferredPaymentOptionID},'${element.customerAccCode}','${element.customerBuyerCode}',${element.customerDataSetID},'${element.customerMobile}','${element.customerJob}','${element.customerWeb}',${element.customerDefaultPaymentAddressID},${element.customerDefaultDeliveryAddressID},'${element.customerUploadKey}',${element.customer_SyncStatus},'${element.lastUpdate}','${element.customerContactTitle}',${element.customerAllotmentPlotID},'${element.customerKey1}','${element.catYear}','${element.customerSalesRepKey}'),`;
    });
  }

  if (tableName == 'local_com_address') {
    data.forEach((element) => {
      element.addressName = element.addressName ? element.addressName.replace(/'/g, "''") : '';
      element.addressLine1 = element.addressLine1 ? element.addressLine1.replace(/'/g, "''") : '';
      element.addressLine2 = element.addressLine2 ? element.addressLine2.replace(/'/g, "''") : '';
      element.addressCity = element.addressCity ? element.addressCity.replace(/'/g, "''") : '';
      element.addressZip = element.addressZip ? element.addressZip.replace(/'/g, "''") : '';
      element.addressPhone = element.addressPhone ? element.addressPhone.replace(/'/g, "''") : '';
      element.addressPersonalName = element.addressPersonalName ? element.addressPersonalName.replace(/'/g, "''") : '';
      element.addressGUID = element.addressGUID ? element.addressGUID.replace(/'/g, "''") : '';
      element.addressLastModified = element.addressLastModified ? element.addressLastModified.replace(/'/g, "''") : '';
      element.addressLine4 = element.addressLine4 ? element.addressLine4.replace(/'/g, "''") : '';
      element.addressLine3 = element.addressLine3 ? element.addressLine3.replace(/'/g, "''") : '';
      element.addressAccCode = element.addressAccCode ? element.addressAccCode.replace(/'/g, "''") : '';
      element.addressContactTitle = element.addressContactTitle ? element.addressContactTitle.replace(/'/g, "''") : '';
      element.addressFirstName = element.addressFirstName ? element.addressFirstName.replace(/'/g, "''") : '';
      element.addressLastName = element.addressLastName ? element.addressLastName.replace(/'/g, "''") : '';
      element.addressUploadKey = element.addressUploadKey ? element.addressUploadKey.replace(/'/g, "''") : '';

      schema += `(${element.addressID},'${element.addressName}','${
        element.addressLine1
      }','${element.addressLine2}','${element.addressCity}','${
        element.addressZip
      }','${element.addressPhone}',${element.addressCustomerID},${
        element.addressCountryID
      },${element.addressStateID},'${element.addressPersonalName}','${
        element.addressGUID
      }','${element.addressLastModified}','${element.addressLine4}','${
        element.addressLine3
      }',${element.addressEnabled ? 1 : 0},${element.addressIsBilling ? 1 : 0},${
        element.addressIsShipping ? 1 : 0
      },${element.addressWebOnly ? 1 : 0},${element.addressIsDefault},'${
        element.addressAccCode
      }','${element.addressCode}',${element.addressDataSetID},'${
        element.address_SyncStatus
      }','${element.lastUpdate}','${element.addressContactTitle}','${
        element.addressFirstName
      }','${element.addressLastName}','${element.addressUploadKey}',${
        element.addressOldID
      },${element.displayOrder},${element.addressID},${0}),`;
    });
  }



  if (tableName == 'local_ct_userappointments') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes for all string fields
      element.itemCreatedWhen = element.itemCreatedWhen
        ? element.itemCreatedWhen.replace(/'/g, "''")
        : '';
      element.itemModifiedWhen = element.itemModifiedWhen
        ? element.itemModifiedWhen.replace(/'/g, "''")
        : '';
      element.itemOrder = element.itemOrder
        ? element.itemOrder.replace(/'/g, "''")
        : '';
      element.itemGUID = element.itemGUID
        ? element.itemGUID.replace(/'/g, "''")
        : '';
      element.email = element.email ? element.email.replace(/'/g, "''") : '';
      element.subject = element.subject
        ? element.subject.replace(/'/g, "''")
        : '';
      element.location = element.location
        ? element.location.replace(/'/g, "''")
        : '';
      element.startDate = element.startDate
        ? element.startDate.replace(/'/g, "''")
        : '';
      element.endDate = element.endDate
        ? element.endDate.replace(/'/g, "''")
        : '';
      element.note = element.note ? element.note.replace(/'/g, "''") : '';

      // Append a SQL tuple to the `schema` string for each element
      schema += `(${element.itemID},${element.itemCreatedBy},'${
        element.itemCreatedWhen
      }',${element.itemModifiedBy},'${element.itemModifiedWhen}','${
        element.itemOrder
      }','${element.itemGUID}','${element.email}','${element.subject}','${
        element.location
      }','${element.startDate}','${element.endDate}','${element.note}',${
        element.tradeAccID
      },${element.isDeleted ? 1 : 0},${0},${0}),`;
    });
  }
  // let ary = [];

  // for (let index = 0; index < 5; index++) {
  //   ary.push(data[index])
    
  // }
  if (tableName == 'local_com_shoppingcart') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes
      element.shoppingCartGUID = element.shoppingCartGUID
        ? element.shoppingCartGUID.replace(/'/g, "''")
        : '';
      element.shoppingCartLastUpdate = element.shoppingCartLastUpdate
        ? element.shoppingCartLastUpdate.replace(/'/g, "''")
        : '';
      element.shoppingCartNote = element.shoppingCartNote
        ? element.shoppingCartNote.replace(/'/g, "''")
        : '';
      element.shoppingCartCustomData = element.shoppingCartCustomData
        ? element.shoppingCartCustomelement.replace(/'/g, "''")
        : '';
      // Assuming 'preSeason', 'cartref', and 'saveFlag' are variables that hold string values and need to be escaped
      let preSeasonEscaped = preSeason ? preSeason.replace(/'/g, "''") : '';
      let saveFlagEscaped = saveFlag ? saveFlag.replace(/'/g, "''") : '';
      let readyToSyncEscaped = element.readyToSync == 1 ? '1' : '0';

      schema += `(${element.shoppingCartID},'${element.shoppingCartGUID}',${element.shoppingCartUserID},${element.shoppingCartSiteID},'${element.shoppingCartLastUpdate}',${element.shoppingCartCurrencyID},${element.shoppingCartPaymentOptionID},${element.shoppingCartShippingOptionID},${element.shoppingCartBillingAddressID},${element.shoppingCartShippingAddressID},${element.shoppingCartCustomerID},'${element.shoppingCartNote}',${element.shoppingCartCompanyAddressID},'${element.shoppingCartCustomData}',${element.shoppingCartContactID},'${preSeasonEscaped}','cartref','${saveFlagEscaped}',${element.shoppingCartIsPreSeason ? 1 : 0},'','${element.readyToSync ? 1 : 0}'),`;
    });
  }

  if (tableName == 'local_com_shoppingcartsku') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes for all string fields
      element.cartItemCustomData = element.cartItemCustomData
        ? element.cartItemCustomelement.replace(/'/g, "''")
        : '';
      element.cartItemGuid = element.cartItemGuid
        ? element.cartItemGuid.replace(/'/g, "''")
        : '';
      element.cartItemParentGuid = element.cartItemParentGuid
        ? element.cartItemParentGuid.replace(/'/g, "''")
        : '';
      element.cartItemValidTo = element.cartItemValidTo
        ? element.cartItemValidTo.replace(/'/g, "''")
        : '';
      element.cartItemBundleGUID = element.cartItemBundleGUID
        ? element.cartItemBundleGUID.replace(/'/g, "''")
        : '';
      element.cartItemText = element.cartItemText
        ? element.cartItemText.replace(/'/g, "''")
        : '';
      element.cartItemQuoteLineDiscountType =
        element.cartItemQuoteLineDiscountType
          ? element.cartItemQuoteLineDiscountType.replace(/'/g, "''")
          : '';
      element.cartItemQuoteYourPrice = element.cartItemQuoteYourPrice
        ? element.cartItemQuoteYourPrice.replace(/'/g, "''")
        : '';
      element.cartItemNote = element.cartItemNote
        ? element.cartItemNote.replace(/'/g, "''")
        : '';
      element.cartItemBackCard = element.cartItemBackCard
        ? element.cartItemBackCard.replace(/'/g, "''")
        : '';

      // Append a SQL tuple to the `schema` string for each element
      schema += `(${element.cartItemID},${element.shoppingCartID},${element.skuid},${element.skuUnits},'${element.cartItemCustomData}','${element.cartItemGuid}','${element.cartItemParentGuid}','${element.cartItemValidTo}','${element.cartItemBundleGUID}','${element.cartItemText}',${element.cartItemAutoAddedUnits},${element.cartItemUnitListPrice},${element.cartItemUnitPrice},${element.cartItemUnitDiscount},${element.cartItemPrice},${element.cartItemDiscountRate},${element.cartItemQuoteLineDiscount},'${element.cartItemQuoteLineDiscountType}','${element.cartItemQuoteYourPrice}',${element.cartItemPriceLine},${element.cartItemLineTax},'${element.cartItemNote}','${element.cartItemBackCard}'),`;
    });

    // Remove the last comma from the `schema` string
  }

  // let ary = [];

  // ary.push(data[0])

  if (tableName == 'local_com_order') {
    try {
      data.forEach((element) => {
        // Escape single quotes by replacing them with two single quotes for all string fields
        // console.log(element.orderCustomData);
        element.orderNote = element.orderNote
          ? element.orderNote.replace(/'/g, "''")
          : '';
        element.orderInvoice = element.orderInvoice
          ? element.orderInvoice.replace(/'/g, "''")
          : '';
        element.orderInvoiceNumber = element.orderInvoiceNumber
          ? element.orderInvoiceNumber.replace(/'/g, "''")
          : '';
        element.orderTrackingNumber = element.orderTrackingNumber
          ? element.orderTrackingNumber.replace(/'/g, "''")
          : '';
        // element.orderCustomData = element.orderCustomData ? element.orderCustomelement.replace(/'/g, "''") : '';
        element.orderPaymentResult = element.orderPaymentResult
          ? element.orderPaymentResult.replace(/'/g, "''")
          : '';
        element.orderGUID = element.orderGUID
          ? element.orderGUID.replace(/'/g, "''")
          : '';
        element.orderLastModified = element.orderLastModified
          ? element.orderLastModified.replace(/'/g, "''")
          : '';
        element.orderCulture = element.orderCulture
          ? element.orderCulture.replace(/'/g, "''")
          : '';
        element.orderDiscounts = element.orderDiscounts
          ? element.orderDiscounts.replace(/'/g, "''")
          : '';
        element.orderOtherPayments = element.orderOtherPayments
          ? element.orderOtherPayments.replace(/'/g, "''")
          : '';
        element.orderTaxSummary = element.orderTaxSummary
          ? element.orderTaxSummary.replace(/'/g, "''")
          : '';
        element.orderCouponCodes = element.orderCouponCodes
          ? element.orderCouponCodes.replace(/'/g, "''")
          : '';
        element.orderPONumber = element.orderPONumber
          ? element.orderPONumber.replace(/'/g, "''")
          : '';
        element.orderPaymentType = element.orderPaymentType
          ? element.orderPaymentType.replace(/'/g, "''")
          : '';
        element.orderAccountsReference = element.orderAccountsReference
          ? element.orderAccountsReference.replace(/'/g, "''")
          : '';
        element.lastUpdate = element.lastUpdate
          ? element.lastUpdate.replace(/'/g, "''")
          : '';
        element.orderComments = element.orderComments
          ? element.orderComments.replace(/'/g, "''")
          : '';
        element.orderType = element.orderType
          ? element.orderType.replace(/'/g, "''")
          : '';
        element.orderSageVendorTxCode = element.orderSageVendorTxCode
          ? element.orderSageVendorTxCode.replace(/'/g, "''")
          : '';
        element.orderAbandonedStatus = element.orderAbandonedStatus
          ? element.orderAbandonedStatus.replace(/'/g, "''")
          : '';

        // Append a SQL tuple to the `schema` string for each element
        schema += `(${isInitial ? element.orderID : 'NULL'},${
          element.orderShippingOptionID
        },${element.orderTotalShipping},${element.orderTotalPrice},${
          element.orderTotalTax
        },'${element.orderDate}',${element.orderStatusID},${
          element.orderCurrencyID
        },${element.orderCustomerID},${element.orderCreatedByUserID},'${
          element.orderNote
        }',${element.orderSiteID},${element.orderPaymentOptionID},'${
          element.orderInvoice
        }','${element.orderInvoiceNumber}','${element.orderTrackingNumber}','${
          element.orderCustomData
        }','${element.orderPaymentResult}','${element.orderGUID}','${
          element.orderLastModified
        }',${element.orderTotalPriceInMainCurrency},${element.orderIsPaid ? 1 : 0},'${
          element.orderCulture
        }','${element.orderDiscounts}',${element.orderGrandTotal},${
          element.orderGrandTotalInMainCurrency
        },'${element.orderOtherPayments}','${element.orderTaxSummary}','${
          element.orderCouponCodes
        }','${element.orderPONumber}',${element.orderAPayment ? 1 : 0},'${
          element.orderPaymentType
        }',${element.orderBillingAddressID},${element.orderShippingAddressID},${
          element.orderDataSetID
        },'${element.orderAccountsReference}','${element.lastUpdate}',${
          element.orderPartShipment ? 1 : 0
        },'${element.orderComments}','${element.orderType}',${
          element.orderInsertedToDim ? 1 : 0
        },'${element.orderSageVendorTxCode}',${
          element.orderReceiptInseredToDim ? 1 : 0
        },'${element.orderAbandonedStatus}'
        ,'${element.orderToEmail}'
        ,'${element.orderRegNumber}'
        ,${element.orderQuoteID}
        ,'${element.unavaiableItems}'
        ,'${element.orderPreseason}'
        ,${element.orderID}),`;
      });

      // console.log('hfsiduguishgsgbdhf');
      // console.log(schema);
      // If you have any code that executes the SQL or does something with the schema string, it should also be inside the try block
      // For example:
      // executeSQL(schema);
    } catch (error) {
      console.error('An error occurred while processing the data:', error);
      // Handle the error, possibly re-throw, or perform other actions depending on your needs
    }
  }

  if (tableName == 'local_cms_settingskey') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes for all string fields
      element.keyName = element.keyName
        ? element.keyName.replace(/'/g, "''")
        : '';
      element.keyDisplayName = element.keyDisplayName
        ? element.keyDisplayName.replace(/'/g, "''")
        : '';
      element.keyDescription = element.keyDescription
        ? element.keyDescription.replace(/'/g, "''")
        : '';
      element.keyValue = element.keyValue
        ? element.keyValue.replace(/'/g, "''")
        : '';
      element.keyType = element.keyType
        ? element.keyType.replace(/'/g, "''")
        : '';
      element.keyGUID = element.keyGUID
        ? element.keyGUID.replace(/'/g, "''")
        : '';
      element.keyLastModified = element.keyLastModified
        ? element.keyLastModified.replace(/'/g, "''")
        : '';
      element.keyDefaultValue = element.keyDefaultValue
        ? element.keyDefaultValue.replace(/'/g, "''")
        : '';
      element.keyValidation = element.keyValidation
        ? element.keyValidation.replace(/'/g, "''")
        : '';
      element.keyEditingControlPath = element.keyEditingControlPath
        ? element.keyEditingControlPath.replace(/'/g, "''")
        : '';
      element.keyFormControlSettings = element.keyFormControlSettings
        ? element.keyFormControlSettings.replace(/'/g, "''")
        : '';
      element.keyExplanationText = element.keyExplanationText
        ? element.keyExplanationText.replace(/'/g, "''")
        : '';

      // Append a SQL tuple to the `schema` string for each element
      schema += `(${element.keyID},'${element.keyName}','${
        element.keyDisplayName
      }','${element.keyDescription}','${element.keyValue}','${
        element.keyType
      }',${element.keyCategoryID},${element.siteID},'${element.keyGUID}','${
        element.keyLastModified
      }',${element.keyOrder},'${element.keyDefaultValue}','${
        element.keyValidation
      }','${element.keyEditingControlPath}',${element.keyIsGlobal ? 1 : 0},${
        element.keyIsCustom ? 1 : 0
      },${element.keyIsHidden ? 1 : 0},'${element.keyFormControlSettings}','${
        element.keyExplanationText
      }'),`;
    });
  }

  if (tableName == 'local_com_orderaddress') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes for all string fields
      element.addressLine1 = element.addressLine1
        ? element.addressLine1.replace(/'/g, "''")
        : '';
      element.addressLine2 = element.addressLine2
        ? element.addressLine2.replace(/'/g, "''")
        : '';
      element.addressCity = element.addressCity
        ? element.addressCity.replace(/'/g, "''")
        : '';
      element.addressZip = element.addressZip
        ? element.addressZip.replace(/'/g, "''")
        : '';
      element.addressPhone = element.addressPhone
        ? element.addressPhone.replace(/'/g, "''")
        : '';
      element.addressPersonalName = element.addressPersonalName
        ? element.addressPersonalName.replace(/'/g, "''")
        : '';
      element.addressGUID = element.addressGUID
        ? element.addressGUID.replace(/'/g, "''")
        : '';
      element.addressLastModified = element.addressLastModified
        ? element.addressLastModified.replace(/'/g, "''")
        : '';
      element.addressLine3 = element.addressLine3
        ? element.addressLine3.replace(/'/g, "''")
        : '';
      element.addressLine4 = element.addressLine4
        ? element.addressLine4.replace(/'/g, "''")
        : '';

      // Append a SQL tuple to the `schema` string for each element
      schema +=
        `(${isInitial ? element.addressID : 'NULL'},'${
          element.addressLine1
        }','${element.addressLine2}',` +
        `'${element.addressCity}','${element.addressZip}','${element.addressPhone}',` +
        `${element.addressCountryID},${element.addressStateID},'${element.addressPersonalName}',` +
        `'${element.addressGUID}','${element.addressLastModified}',${element.addressOrderID},` +
        `${element.addressType},'${element.addressLine3}','${element.addressLine4}',` +
        `${element.customerAddressID},'NULL',${element.addressID}),`;
    });
  }

  if (tableName == 'local_com_orderitem') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes for all string fields

      try {
        element.orderItemSKUName = element.orderItemSKUName
          ? element.orderItemSKUName.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error occurred: 1', error);
      }
      try {
        element.orderItemCustomData = element.orderItemCustomData
          ? element.orderItemCustomelement.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error occurred: 2', error);
      }
      try {
        element.orderItemGuid = element.orderItemGuid
          ? element.orderItemGuid.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error occurred: 3', error);
      }
      try {
        element.orderItemParentGuid = element.orderItemParentGuid
          ? element.orderItemParentGuid.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error occurred: 4', error);
      }
      try {
        element.orderItemLastModified = element.orderItemLastModified
          ? element.orderItemLastModified.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error occurred: 5', error);
      }
      try {
        element.orderItemValidTo = element.orderItemValidTo
          ? element.orderItemValidTo.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error occurred: 6', error);
      }
      try {
        element.orderItemText = element.orderItemText
          ? element.orderItemText.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error occurred: 7', error);
      }
      try {
        element.orderItemProductDiscounts = element.orderItemProductDiscounts
          ? element.orderItemProductDiscounts.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error occurred: 8', error);
      }
      try {
        element.orderItemDiscountSummary = element.orderItemDiscountSummary
          ? element.orderItemDiscountSummary.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error occurred: 9', error);
      }
      try {
        element.orderItemAccountsReference = element.orderItemAccountsReference
          ? element.orderItemAccountsReference.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error occurred: 10', error);
      }
      try {
        element.orderItemOrderInvoiceNumber =
          element.orderItemOrderInvoiceNumber
            ? element.orderItemOrderInvoiceNumber.replace(/'/g, "''")
            : '';
      } catch (error) {
        console.error('An error occurred: 11', error);
      }
      try {
        element.orderInvoiceNumber = element.orderInvoiceNumber
          ? element.orderInvoiceNumber.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error occurred: 12', error);
      }
      // try {
      //   element.od_OHID_DSID = element.od_OHID_DSID ? element.od_OHID_DSID.replace(/'/g, "''") : '';
      // } catch (error) {
      //   console.error('An error occurred: 13', error);
      // }
      try {
        element.batchName = element.batchName
          ? element.batchName.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error occurred: 14', error);
      }
      try {
        element.orderItemNote = element.orderItemNote
          ? element.orderItemNote.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error occurred: 15', error);
      }
      // try {
      //   element.orderItemBackCard = element.orderItemBackCard ? element.orderItemBackCard.replace(/'/g, "''") : '';
      // } catch (error) {
      //   console.error('An error occurred: 16', error);
      // }

      // Append a SQL tuple to the `schema` string for each element
      schema += `(${isInitial ? element.orderItemID : 'NULL'},${
        element.orderItemOrderID
      },${element.orderItemSKUID},'${element.orderItemSKUName}',${
        element.orderItemUnitPrice
      },${element.orderItemUnitCount},'${element.orderItemCustomData}','${
        element.orderItemGuid
      }','${element.orderItemParentGuid}','${element.orderItemLastModified}','${
        element.orderItemValidTo
      }',${element.orderItemBundleGUID},${
        element.orderItemTotalPriceInMainCurrency
      },${element.orderItemSendNotification ? 1 : 0},'${element.orderItemText}','${
        element.orderItemProductDiscounts
      }','${element.orderItemDiscountSummary}',${element.orderItemTotalPrice},${
        element.orderItemUnitListPrice
      },${element.orderItemUnitDiscount},${element.orderItemDiscountRate},${
        element.orderItemDataSetID
      },'${element.orderItemAccountsReference}','${
        element.orderItemOrderInvoiceNumber
      }',${element.orderItemQtyDelivered},${element.orderItemQtyInvoiced},'${
        element.orderInvoiceNumber
      }',${element.orderInsertedToDim ? 1 : 0},'${element.od_OHID_DSID}','${
        element.batchName
      }',${element.orderItemPriceLine},'${element.orderItemNote}','${
        element.orderItemBackCard ? 1 : 0
      }',${element.orderItemID}),`;
    });
  }

  if (tableName == 'local_com_orderstatus') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes for all string fields
      element.statusName = element.statusName
        ? element.statusName.replace(/'/g, "''")
        : '';
      element.statusDisplayName = element.statusDisplayName
        ? element.statusDisplayName.replace(/'/g, "''")
        : '';
      element.statusColor = element.statusColor
        ? element.statusColor.replace(/'/g, "''")
        : '';
      element.statusGUID = element.statusGUID
        ? element.statusGUID.replace(/'/g, "''")
        : '';
      element.statusLastModified = element.statusLastModified
        ? element.statusLastModified.replace(/'/g, "''")
        : '';

      // Append a SQL tuple to the `schema` string for each element
      schema += `(${element.statusID},'${element.statusName}','${element.statusDisplayName}',${element.statusOrder},${element.statusEnabled ? 1 : 0},'${element.statusColor}','${element.statusGUID}','${element.statusLastModified}',${element.statusSendNotification ? 1 : 0},${element.statusSiteID},${element.statusOrderIsPaid ? 1 : 0}),`;
    });
  }

  if (tableName == 'local_ct_tradeaccount') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes

      element.itemCreatedWhen = element.itemCreatedWhen.replace(/'/g, "''");

      element.itemModifiedWhen = element.itemModifiedWhen.replace(/'/g, "''");

      element.itemGUID = element.itemGUID.replace(/'/g, "''");

      element.itemCode = element.itemCode.replace(/'/g, "''");

      element.itemName = element.itemName.replace(/'/g, "''");

      element.itemAddressLine1 = element.itemAddressLine1.replace(/'/g, "''");

      element.itemCity = element.itemCity.replace(/'/g, "''");

      element.itemCounty = element.itemCounty.replace(/'/g, "''");

      element.itemPostcode = element.itemPostcode.replace(/'/g, "''");

      element.itemNotes = element.itemNotes.replace(/'/g, "''");

      element.itemTaxCode = element.itemTaxCode.replace(/'/g, "''");

      element.itemCurrencyCode = element.itemCurrencyCode.replace(/'/g, "''");

      element.itemStaffEmail = element.itemStaffEmail.replace(/'/g, "''");

      element.itemType = element.itemType.replace(/'/g, "''");

      // element.itemKey2 = element.itemKey2.replace(/'/g, "''");

      element.itemAccAreaCode = element.itemAccAreaCode.replace(/'/g, "''");

      element.itemAdminFirstName = element.itemAdminFirstName || '';
      element.itemAdminLastName = element.itemAdminLastName || '';
      element.itemDiscGroup1 = element.itemDiscGroup1;
      element.itemDiscGroup2 = element.itemDiscGroup2;
      element.itemDiscGroup3 = element.itemDiscGroup3;
      element.itemDiscGroup4 = element.itemDiscGroup4;

      schema +=
        `(${element.itemID},'${element.itemCreatedBy}','${element.itemCreatedWhen}','${element.itemModifiedBy}',` +
        `'${element.itemModifiedWhen}','${element.itemOrder}','${element.itemGUID}',${element.itemDataSetID},` +
        `'${element.itemCode}','${element.itemName}','${element.itemAdminFirstName}','${element.itemAdminLastName}',` +
        `'${element.itemAddressLine1}','${element.itemAddressLine2}','${element.itemCity}','${element.itemCounty}',` +
        `'${element.itemPostcode}',${element.itemCountryId},'${element.itemAdminEmail}','${element.itemAdminPhone}',` +
        `'${element.itemNotes}',${element.itemOnStop ? 1 : 0},${element.itemEnabled ? 1 : 0},${element.itemSiteID},` +
        `'${element.itemAccBalance}','${element.itemCreditLimit}',${element.itemPriceKey},'${element.itemLineDiscount}',` +
        `'${element.itemTotalDiscount}',${element.itemTaxable ? 1 : 0},'${element.itemTaxCode}','${element.itemCurrencyCode}',` +
        `'${element.itemStaffEmail}','${element.itemType}','${element.itemKey1}','${element.itemKey2}',` +
        `'${element.itemKey3}','${element.itemDiscGroup1}','${element.itemDiscGroup2}','${element.itemDiscGroup3}','${element.itemDiscGroup4}',` +
        `'${element.itemAccAreaCode}','1'),`;
    });
  }

  if (tableName == 'local_ct_tradeaccountcustomer') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes

      element.itemCreatedBy = element.itemCreatedBy
        ? element.itemCreatedBy.replace(/'/g, "''")
        : '';

      element.itemCreatedWhen = element.itemCreatedWhen
        ? element.itemCreatedWhen.replace(/'/g, "''")
        : '';

      element.itemModifiedBy = element.itemModifiedBy
        ? element.itemModifiedBy.replace(/'/g, "''")
        : '';

      element.itemModifiedWhen = element.itemModifiedWhen
        ? element.itemModifiedWhen.replace(/'/g, "''")
        : '';

      element.itemOrder = element.itemOrder
        ? element.itemOrder.replace(/'/g, "''")
        : '';

      // element.itemGUID = element.itemGUID ? element.itemGUID.replace(/'/g, "''") : '';

      element.tradeAccName = element.tradeAccName
        ? element.tradeAccName.replace(/'/g, "''")
        : '';

      element.customerName = element.customerName
        ? element.customerName.replace(/'/g, "''")
        : '';

      schema +=
        `(${element.itemID},'${element.itemCreatedBy}','${element.itemCreatedWhen}','${element.itemModifiedBy}',` +
        `'${element.itemModifiedWhen}','${element.itemOrder}','${element.itemGUID}',${element.tradeAccId},` +
        `'${element.tradeAccName}',${element.customerId},'${element.customerName}',${element.itemIsAdmin ? 1 : 0}),`;
    });
  }

  if (tableName == 'local_ct_deliverymatrix') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes

      element.itemDeliveryFactors = element.itemDeliveryFactors
        ? element.itemDeliveryFactors.replace(/'/g, "''")
        : '';
      element.itemCreatedWhen = element.itemCreatedWhen
        ? element.itemCreatedWhen.replace(/'/g, "''")
        : '';
      element.itemModifiedWhen = element.itemModifiedWhen
        ? element.itemModifiedWhen.replace(/'/g, "''")
        : '';
      element.itemGUID = element.itemGUID
        ? element.itemGUID.replace(/'/g, "''")
        : '';
      element.itemDiscountedPrice = element.itemDiscountedPrice
        ? element.itemDiscountedPrice.replace(/'/g, "''")
        : '';
      element.itemPriceLabel = element.itemPriceLabel
        ? element.itemPriceLabel.replace(/'/g, "''")
        : '';

      schema +=
        `(${element.itemID},${element.itemCountryGroupID},${element.itemPostcodeZoneID},'${element.itemDeliveryFactors}',` +
        `${element.itemShippingOptionID},'${element.itemPrice}',${element.itemRestrictedToPaymentOption},` +
        `${element.itemCreatedBy},'${element.itemCreatedWhen}',${element.itemModifiedBy},'${element.itemModifiedWhen}',` +
        `'${element.itemOrder}','${element.itemGUID}',${element.itemSiteID},${element.itemSiteRoleID},` +
        `'${element.itemDiscountedPrice}','${element.itemPriceLabel}'),`;
    });
  }

  if (tableName == 'local_ct_countrygroup') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes
      element.itemName = element.itemName
        ? element.itemName.replace(/'/g, "''")
        : '';
      element.itemCreatedWhen = element.itemCreatedWhen
        ? element.itemCreatedWhen.replace(/'/g, "''")
        : '';
      element.itemModifiedWhen = element.itemModifiedWhen
        ? element.itemModifiedWhen.replace(/'/g, "''")
        : '';
      element.itemGUID = element.itemGUID
        ? element.itemGUID.replace(/'/g, "''")
        : '';

      schema +=
        `(${element.itemID},'${element.itemName}',${element.itemCreatedBy},'${element.itemCreatedWhen}',` +
        `${element.itemModifiedBy},'${element.itemModifiedWhen}',${element.itemOrder},'${element.itemGUID}'),`;
    });
  }


  if (tableName == 'local_ct_postcodes') {
    try {
      data.forEach((element) => {
        // Escape single quotes by replacing them with two single quotes
        element.itemPostcode = element.itemPostcode
          ? element.itemPostcode.replace(/'/g, "''")
          : '';
        // element.itemLatitude = element.itemLatitude ? element.itemLatitude.replace(/'/g, "''") : '';
        // element.itemLongitude = element.itemLongitude ? element.itemLongitude.replace(/'/g, "''") : '';
        element.itemTown = element.itemTown
          ? element.itemTown.replace(/'/g, "''")
          : '';
        element.itemCounty = element.itemCounty
          ? element.itemCounty.replace(/'/g, "''")
          : '';
        element.itemZone = element.itemZone
          ? element.itemZone.replace(/'/g, "''")
          : '';
        element.itemCreatedWhen = element.itemCreatedWhen
          ? element.itemCreatedWhen.replace(/'/g, "''")
          : '';
        // element.itemModifiedBy = element.itemModifiedBy ? element.itemModifiedBy.replace(/'/g, "''") : '';
        element.itemModifiedWhen = element.itemModifiedWhen
          ? element.itemModifiedWhen.replace(/'/g, "''")
          : '';
        // element.itemOrder = element.itemOrder ? element.itemOrder.replace(/'/g, "''") : '';
        // element.itemGUID = element.itemGUID ? element.itemGUID.replace(/'/g, "''") : '';

        schema +=
          `(${element.itemID},'${element.itemPostcode}',${element.itemX},${element.itemY},'${element.itemLatitude}',` +
          `'${element.itemLongitude}','${element.itemTown}','${element.itemCounty}',${element.itemCountyID},` +
          `'${element.itemZone}',${element.itemZoneID},${element.itemCreatedBy},'${element.itemCreatedWhen}',` +
          `'${element.itemModifiedBy}','${element.itemModifiedWhen}','${element.itemOrder}','${element.itemGUID}'),`;
      });
    } catch (error) {
      console.error('An error occurred while processing the data:', error);
      // Handle the error, possibly re-throw, or perform other actions depending on your needs
    }
  }

  if (tableName == 'local_ct_postcodezone') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes
      element.itemName = element.itemName
        ? element.itemName.replace(/'/g, "''")
        : '';
      element.itemCreatedWhen = element.itemCreatedWhen
        ? element.itemCreatedWhen.replace(/'/g, "''")
        : '';
      element.itemModifiedWhen = element.itemModifiedWhen
        ? element.itemModifiedWhen.replace(/'/g, "''")
        : '';
      element.itemGUID = element.itemGUID
        ? element.itemGUID.replace(/'/g, "''")
        : '';

      schema +=
        `(${element.itemID},'${element.itemName}',${element.itemCreatedBy},'${element.itemCreatedWhen}',` +
        `${element.itemModifiedBy},'${element.itemModifiedWhen}',${element.itemOrder},'${element.itemGUID}'),`;
    });
  }

  if (tableName == 'local_com_shippingoption') {
    data.forEach((element) => {
      // Escape single quotes by replacing them with two single quotes
      element.shippingOptionName = element.shippingOptionName
        ? element.shippingOptionName.replace(/'/g, "''")
        : '';
      element.shippingOptionDisplayName = element.shippingOptionDisplayName
        ? element.shippingOptionDisplayName.replace(/'/g, "''")
        : '';
      element.shippingOptionGUID = element.shippingOptionGUID
        ? element.shippingOptionGUID.replace(/'/g, "''")
        : '';
      element.shippingOptionLastModified = element.shippingOptionLastModified
        ? element.shippingOptionLastModified.replace(/'/g, "''")
        : '';
      element.shippingOptionThumbnailGUID = element.shippingOptionThumbnailGUID
        ? element.shippingOptionThumbnailGUID.replace(/'/g, "''")
        : '';
      element.shippingOptionDescription = element.shippingOptionDescription
        ? element.shippingOptionDescription.replace(/'/g, "''")
        : '';
      element.shippingOptionCarrierServiceName =
        element.shippingOptionCarrierServiceName
          ? element.shippingOptionCarrierServiceName.replace(/'/g, "''")
          : '';
      element.shippingOptionCountryIDs = element.shippingOptionCountryIDs
        ? element.shippingOptionCountryIDs.replace(/'/g, "''")
        : '';

      schema +=
        `(${element.shippingOptionID},'${element.shippingOptionName}','${element.shippingOptionDisplayName}',` +
        `${element.shippingOptionEnabled ? 1 : 0},${element.shippingOptionSiteID},'${element.shippingOptionGUID}',` +
        `'${element.shippingOptionLastModified}','${element.shippingOptionThumbnailGUID}',` +
        `'${element.shippingOptionDescription}',${element.shippingOptionCarrierID},` +
        `'${element.shippingOptionCarrierServiceName}',${element.shippingOptionTaxClassID},` +
        `'${element.shippingOptionCountryIDs}'),`;
    });
  }
  // let ary = [];

  // ary.push(data[0])

  if (tableName == 'local_int_salestax') {
    data.forEach((element) => {
      element.stax_Code = element.stax_Code
        ? element.stax_Code.replace(/'/g, "''")
        : '';
      element.stax_Name = element.stax_Name
        ? element.stax_Name.replace(/'/g, "''")
        : '';
      // element.stax_Rate = element.stax_Rate ? element.stax_Rate.replace(/'/g, "''") : '';
      element.uploadKey = element.uploadKey
        ? element.uploadKey.replace(/'/g, "''")
        : '';
      element.lastUpdate = element.lastUpdate
        ? element.lastUpdate.replace(/'/g, "''")
        : '';
      element.itemCreatedBy = element.itemCreatedBy
        ? element.itemCreatedBy.replace(/'/g, "''")
        : '';
      element.itemCreatedWhen = element.itemCreatedWhen
        ? element.itemCreatedWhen.replace(/'/g, "''")
        : '';
      element.itemModifiedBy = element.itemModifiedBy
        ? element.itemModifiedBy.replace(/'/g, "''")
        : '';
      element.itemModifiedWhen = element.itemModifiedWhen
        ? element.itemModifiedWhen.replace(/'/g, "''")
        : '';
      element.itemOrder = element.itemOrder
        ? element.itemOrder.replace(/'/g, "''")
        : '';

      // element.stax_Region = element.stax_Region ? element.stax_Region.replace(/'/g, "''") : '';
      // element.itemGUID = element.itemGUID ? element.itemGUID.replace(/'/g, "''") : '';

      schema += `(${element.itemID},'${element.stax_Code}','${element.stax_Name}','${element.stax_Region}',${element.stax_RegionType},'${element.stax_Rate}',${element.stax_IsFlatValue ? 1 : 0},${element.stax_DataSetID},'${element.uploadKey}','${element.lastUpdate}',${element.status ? 1 : 0},'${element.itemCreatedBy}','${element.itemCreatedWhen}','${element.itemModifiedBy}','${element.itemModifiedWhen}','${element.itemOrder}','${element.itemGUID}'),`;
    });
  }

  if (tableName == 'local_int_analysis') {
    data.forEach((element) => {
      element.ana_Code = element.ana_Code
        ? element.ana_Code.replace(/'/g, "''")
        : '';
      element.ana_Name = element.ana_Name
        ? element.ana_Name.replace(/'/g, "''")
        : '';
      element.ana_VatCode = element.ana_VatCode
        ? element.ana_VatCode.replace(/'/g, "''")
        : '';
      element.uploadKey = element.uploadKey
        ? element.uploadKey.replace(/'/g, "''")
        : '';
      element.lastUpdate = element.lastUpdate
        ? element.lastUpdate.replace(/'/g, "''")
        : '';
      element.itemCreatedBy = element.itemCreatedBy
        ? element.itemCreatedBy.replace(/'/g, "''")
        : '';
      element.itemCreatedWhen = element.itemCreatedWhen
        ? element.itemCreatedWhen.replace(/'/g, "''")
        : '';
      element.itemModifiedBy = element.itemModifiedBy
        ? element.itemModifiedBy.replace(/'/g, "''")
        : '';
      element.itemModifiedWhen = element.itemModifiedWhen
        ? element.itemModifiedWhen.replace(/'/g, "''")
        : '';
      element.itemGUID = element.itemGUID
        ? element.itemGUID.replace(/'/g, "''")
        : '';

      schema += `(${element.itemID},${element.ana_DataSetID},'${element.ana_Code}','${element.ana_Name}','${element.ana_VatCode}','${element.uploadKey}','${element.lastUpdate}',${element.status ? 1 : 0},'${element.itemCreatedBy}','${element.itemCreatedWhen}','${element.itemModifiedBy}','${element.itemModifiedWhen}',${element.itemOrder},'${element.itemGUID}'),`;
    });
  }

  if (tableName == 'local_ct_quotes') {
    data.forEach((element) => {
      element.itemCreatedWhen = element.itemCreatedWhen
        ? element.itemCreatedWhen.replace(/'/g, "''")
        : '';
      element.itemModifiedWhen = element.itemModifiedWhen
        ? element.itemModifiedWhen.replace(/'/g, "''")
        : '';
      element.itemOrder = element.itemOrder
        ? element.itemOrder.replace(/'/g, "''")
        : '';
      element.itemGUID = element.itemGUID
        ? element.itemGUID.replace(/'/g, "''")
        : '';
      element.itemQuoteLabel = element.itemQuoteLabel
        ? element.itemQuoteLabel.replace(/'/g, "''")
        : '';

      schema += `(${element.itemID},${element.itemCustomerID},${element.itemShoppingCartID},${element.itemSiteID},'${element.itemCreatedBy}','${element.itemCreatedWhen}','${element.itemModifiedBy}','${element.itemModifiedWhen}','${element.itemOrder}','${element.itemGUID}','${element.itemQuoteLabel}',${element.itemQuoteTotal},${element.itemQuoteDelivery}),`;
    });
  }

  if (tableName == 'local_ct_quotestatus') {
    data.forEach((element) => {
      element.itemDisplayName = element.itemDisplayName
        ? element.itemDisplayName.replace(/'/g, "''")
        : '';
      element.itemName = element.itemName
        ? element.itemName.replace(/'/g, "''")
        : '';
      element.itemCreatedWhen = element.itemCreatedWhen
        ? element.itemCreatedWhen.replace(/'/g, "''")
        : '';
      element.itemModifiedWhen = element.itemModifiedWhen
        ? element.itemModifiedWhen.replace(/'/g, "''")
        : '';
      element.itemGUID = element.itemGUID
        ? element.itemGUID.replace(/'/g, "''")
        : '';

      schema += `(${element.itemID},'${element.itemDisplayName}','${element.itemName}',${element.itemCreatedBy},'${element.itemCreatedWhen}',${element.itemModifiedBy},'${element.itemModifiedWhen}',${element.itemOrder},'${element.itemGUID}'),`;
    });
  }

  if (tableName == 'local_ct_quotestatususer') {
    data.forEach((element) => {
      element.itemCreatedWhen = element.itemCreatedWhen
        ? element.itemCreatedWhen.replace(/'/g, "''")
        : '';
      element.itemModifiedWhen = element.itemModifiedWhen
        ? element.itemModifiedWhen.replace(/'/g, "''")
        : '';
      element.itemGUID = element.itemGUID
        ? element.itemGUID.replace(/'/g, "''")
        : '';

      schema += `(${element.itemID},${element.itemQuoteID},${element.itemQuoteStatusID},${element.itemSiteID},${element.itemCreatedBy},'${element.itemCreatedWhen}',${element.itemModifiedBy},'${element.itemModifiedWhen}',${element.itemOrder},'${element.itemGUID}'),`;
    });
  }

  if (tableName == 'local_cms_culture') {
    data.forEach((element) => {
      element.cultureName = element.cultureName
        ? element.cultureName.replace(/'/g, "''")
        : '';
      element.cultureCode = element.cultureCode
        ? element.cultureCode.replace(/'/g, "''")
        : '';
      element.cultureShortName = element.cultureShortName
        ? element.cultureShortName.replace(/'/g, "''")
        : '';
      element.cultureGUID = element.cultureGUID
        ? element.cultureGUID.replace(/'/g, "''")
        : '';
      element.cultureLastModified = element.cultureLastModified
        ? element.cultureLastModified.replace(/'/g, "''")
        : '';
      element.cultureAlias = element.cultureAlias
        ? element.cultureAlias.replace(/'/g, "''")
        : '';

      schema += `(${element.cultureID},'${element.cultureName}','${
        element.cultureCode
      }','${element.cultureShortName}','${element.cultureGUID}','${
        element.cultureLastModified
      }','${element.cultureAlias}',${element.cultureIsUICulture ? 1 : 0}),`;
    });
  }

  // let ary = [];

  // ary.push(data[0])

  if (tableName == 'local_cms_resource') {
    data.forEach((element) => {
      element.resourceDisplayName = element.resourceDisplayName
        ? element.resourceDisplayName.replace(/'/g, "''")
        : '';
      element.resourceName = element.resourceName
        ? element.resourceName.replace(/'/g, "''")
        : '';
      element.resourceDescription = element.resourceDescription
        ? element.resourceDescription.replace(/'/g, "''")
        : '';
      element.resourceURL = element.resourceURL
        ? element.resourceURL.replace(/'/g, "''")
        : '';
      element.resourceGUID = element.resourceGUID
        ? element.resourceGUID.replace(/'/g, "''")
        : '';
      element.resourceLastModified = element.resourceLastModified
        ? element.resourceLastModified.replace(/'/g, "''")
        : '';
      element.resourceVersion = element.resourceVersion
        ? element.resourceVersion.replace(/'/g, "''")
        : '';
      element.resourceAuthor = element.resourceAuthor
        ? element.resourceAuthor.replace(/'/g, "''")
        : '';
      element.resourceInstalledVersion = element.resourceInstalledVersion
        ? element.resourceInstalledVersion.replace(/'/g, "''")
        : '';

      schema += `(${element.resourceID},'${element.resourceDisplayName}','${
        element.resourceName
      }','${element.resourceDescription}',${
        element.showInDevelopment ? 1 : 0
      },'${element.resourceURL}','${element.resourceGUID}','${
        element.resourceLastModified
      }',${element.resourceIsInDevelopment ? 1 : 0},${
        element.resourceHasFiles ? 1 : 0
      },'${element.resourceVersion}','${element.resourceAuthor}','${
        element.resourceInstallationState
      }','${element.resourceInstalledVersion}'),`;
    });
  }

  if (tableName == 'local_cms_resourcestring') {
    data.forEach((element) => {
      element.stringKey = element.stringKey
        ? element.stringKey.replace(/'/g, "''")
        : '';
      element.stringGUID = element.stringGUID
        ? element.stringGUID.replace(/'/g, "''")
        : '';

      schema += `(${element.stringID},'${element.stringKey}',${
        element.stringIsCustom ? 1 : 0
      },'${element.stringGUID}'),`;
    });
  }

  if (tableName == 'local_cms_resourcetranslation') {
    data.forEach((element) => {
      element.translationText = element.translationText
        ? element.translationText.replace(/'/g, "''")
        : '';

      schema += `(${element.translationID},${element.translationStringID},'${element.translationText}',${element.translationCultureID}),`;
    });
  }

  if (tableName == 'local_int_navigation') {
    data.forEach((element) => {
      schema += `(${element.itemID}, ${element.itemCreatedBy}, '${element.itemCreatedWhen}', ${element.itemModifiedBy}, '${element.itemModifiedWhen}', ${element.itemOrder}, '${element.itemGUID}', ${element.nav_DatasetID}, ${element.nav_ShopID}, '${element.nav_NodeID}', '${element.nav_RangeNodeID}', ${element.nav_SKUNodeID}, ${element.nav_SKUID}, '${element.nav_StockCode}', '${element.nav_Navigation}', '${element.nav_ItemAttribute1}', '${element.nav_ItemAttribute2}', '${element.nav_ItemAttribute3}', '${element.nav_ItemAttribute4}', '${element.nav_ItemAttribute5}', '${element.nav_ItemAttribute6}', '${element.nav_ItemAttribute7}', '${element.nav_ItemAttribute8}', '${element.nav_ItemAttribute9}', '${element.nav_ItemAttribute10}', '${element.nav_ItemAttribute11}', '${element.nav_ItemAttribute12}', '${element.nav_ItemAttribute13}', '${element.nav_ItemAttribute14}', '${element.nav_ItemAttribute15}', '${element.nav_RangeDataHeadings}', '${element.nav_ItemData1}', '${element.nav_ItemData2}', '${element.nav_ItemData3}', '${element.nav_ItemData4}', '${element.nav_ItemData5}', '${element.nav_ItemData6}', '${element.nav_ItemData7}', '${element.nav_ItemData8}', '${element.nav_ItemData9}', '${element.nav_ItemData10}', ${element.nav_Order}, '${element.nav_Range}', '${element.nav_RangeDescription}', ${element.nav_Suspend ? 1 : 0}, '${element.uploadKey}', '${element.lastUpdate}', ${element.status ? 1 : 0}, '${element.nav_RangeCode}', '${element.nav_GroupCode}', '${element.nav_SubGroupCode}'),`;
    });
  }

  //     let ary = [];

  // ary.push(data[0])

  if (tableName == 'local_int_nav_attributes') {
    data.forEach((element) => {
      // element.nav_Path = element.nav_Path ? element.nav_Path.replace(/'/g, "''") : '';
      // element.nav_Lvl1 = element.nav_Lvl1 ? element.nav_Lvl1.replace(/'/g, "''") : '';
      // element.nav_ClickableLvl2 = element.nav_ClickableLvl2 ? element.nav_ClickableLvl2.replace(/'/g, "''") : '';
      // element.nav_ClickableLvl3 = element.nav_ClickableLvl3 ? element.nav_ClickableLvl3.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel1 = element.nav_itemattributelabel1 ? element.nav_itemattributelabel1.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter1 = element.nav_itemattributefilter1 ? element.nav_itemattributefilter1.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel2 = element.nav_itemattributelabel2 ? element.nav_itemattributelabel2.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter2 = element.nav_itemattributefilter2 ? element.nav_itemattributefilter2.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel3 = element.nav_itemattributelabel3 ? element.nav_itemattributelabel3.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter3 = element.nav_itemattributefilter3 ? element.nav_itemattributefilter3.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel4 = element.nav_itemattributelabel4 ? element.nav_itemattributelabel4.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter4 = element.nav_itemattributefilter4 ? element.nav_itemattributefilter4.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel5 = element.nav_itemattributelabel5 ? element.nav_itemattributelabel5.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter5 = element.nav_itemattributefilter5 ? element.nav_itemattributefilter5.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel6 = element.nav_itemattributelabel6 ? element.nav_itemattributelabel6.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter6 = element.nav_itemattributefilter6 ? element.nav_itemattributefilter6.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel7 = element.nav_itemattributelabel7 ? element.nav_itemattributelabel7.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter7 = element.nav_itemattributefilter7 ? element.nav_itemattributefilter7.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel8 = element.nav_itemattributelabel8 ? element.nav_itemattributelabel8.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter8 = element.nav_itemattributefilter8 ? element.nav_itemattributefilter8.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel9 = element.nav_itemattributelabel9 ? element.nav_itemattributelabel9.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter9 = element.nav_itemattributefilter9 ? element.nav_itemattributefilter9.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel10 = element.nav_itemattributelabel10 ? element.nav_itemattributelabel10.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter10 = element.nav_itemattributefilter10 ? element.nav_itemattributefilter10.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel11 = element.nav_itemattributelabel11 ? element.nav_itemattributelabel11.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter11 = element.nav_itemattributefilter11 ? element.nav_itemattributefilter11.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel12 = element.nav_itemattributelabel12 ? element.nav_itemattributelabel12.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter12 = element.nav_itemattributefilter12 ? element.nav_itemattributefilter12.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel13 = element.nav_itemattributelabel13 ? element.nav_itemattributelabel13.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter13 = element.nav_itemattributefilter13 ? element.nav_itemattributefilter13.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel14 = element.nav_itemattributelabel14 ? element.nav_itemattributelabel14.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter14 = element.nav_itemattributefilter14 ? element.nav_itemattributefilter14.replace(/'/g, "''") : '';
      // element.nav_itemattributelabel15 = element.nav_itemattributelabel15 ? element.nav_itemattributelabel15.replace(/'/g, "''") : '';
      // element.nav_itemattributefilter15 = element.nav_itemattributefilter15 ? element.nav_itemattributefilter15.replace(/'/g, "''") : '';
      // element.uploadKey = element.uploadKey ? element.uploadKey.replace(/'/g, "''") : '';
      // element.itemCreatedWhen = element.itemCreatedWhen ? element.itemCreatedWhen.replace(/'/g, "''") : '';
      // element.itemModifiedWhen = element.itemModifiedWhen ? element.itemModifiedWhen.replace(/'/g, "''") : '';
      // element.itemGUID = element.itemGUID ? element.itemGUID.replace(/'/g, "''") : '';

      schema += `(${element.itemID}, ${element.nav_DatasetID}, ${element.nav_ShopID}, '${element.nav_Path}', '${element.nav_Lvl1}', ${element.nav_ColumnLvl2}, ${element.nav_PositionLvl2}, '${element.nav_ClickableLvl2 ? 1 : 0}', ${element.nav_ColumnLvl3}, ${element.nav_PositionLvl3}, '${element.nav_ClickableLvl3 ? 1 : 0}', '${element.nav_itemattributelabel1}', '${element.nav_itemattributefilter1}', '${element.nav_itemattributelabel2}', '${element.nav_itemattributefilter2}', '${element.nav_itemattributelabel3}', '${element.nav_itemattributefilter3}', '${element.nav_itemattributelabel4}', '${element.nav_itemattributefilter4}', '${element.nav_itemattributelabel5}', '${element.nav_itemattributefilter5}', '${element.nav_itemattributelabel6}', '${element.nav_itemattributefilter6}', '${element.nav_itemattributelabel7}', '${element.nav_itemattributefilter7}', '${element.nav_itemattributelabel8}', '${element.nav_itemattributefilter8}', '${element.nav_itemattributelabel9}', '${element.nav_itemattributefilter9}', '${element.nav_itemattributelabel10}', '${element.nav_itemattributefilter10}', '${element.nav_itemattributelabel11}', '${element.nav_itemattributefilter11}', '${element.nav_itemattributelabel12}', '${element.nav_itemattributefilter12}', '${element.nav_itemattributelabel13}', '${element.nav_itemattributefilter13}', '${element.nav_itemattributelabel14}', '${element.nav_itemattributefilter14}', '${element.nav_itemattributelabel15}', '${element.nav_itemattributefilter15}', ${element.nav_Suspend ? 1 : 0}, '${element.uploadKey}', '${element.lastUpdate}', ${element.status ? 1 : 0}, ${element.itemCreatedBy}, '${element.itemCreatedWhen}', ${element.itemModifiedBy}, '${element.itemModifiedWhen}', ${element.itemOrder}, '${element.itemGUID}'),`;
    });
  }

  if (tableName == 'local_ct_deliveryfactors') {
    data.forEach((element) => {
      try {
        element.itemName = element.itemName
          ? element.itemName.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An 1 the data:', error);
        // Handle the error, possibly re-throw, or perform other actions depending on your needs
      }
      try {
        element.itemFactor = element.itemFactor
          ? element.itemFactor.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An 2 the data:', error);
        // Handle the error, possibly re-throw, or perform other actions depending on your needs
      }
      // try {
      //   element.itemCreatedBy = element.itemCreatedBy ? element.itemCreatedBy.replace(/'/g, "''") : '';
      //   } catch (error) {
      //     console.error("An 3 the data:", error);
      //     // Handle the error, possibly re-throw, or perform other actions depending on your needs
      //   }
      try {
        element.itemCreatedWhen = element.itemCreatedWhen
          ? element.itemCreatedWhen.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An 4 the data:', error);
        // Handle the error, possibly re-throw, or perform other actions depending on your needs
      }
      // try {
      //   element.itemModifiedBy = element.itemModifiedBy ? element.itemModifiedBy.replace(/'/g, "''") : '';
      //   } catch (error) {
      //     console.error("An 5 the data:", error);
      //     // Handle the error, possibly re-throw, or perform other actions depending on your needs
      //   }
      try {
        element.itemModifiedWhen = element.itemModifiedWhen
          ? element.itemModifiedWhen.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An 6 the data:', error);
        // Handle the error, possibly re-throw, or perform other actions depending on your needs
      }
      try {
        element.itemGUID = element.itemGUID
          ? element.itemGUID.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An 7 the data:', error);
        // Handle the error, possibly re-throw, or perform other actions depending on your needs
      }

      schema += `(${element.itemID},'${element.itemName}','${element.itemFactor}',${element.itemFreeDeliveryValue},${element.itemSiteID},'${element.itemCreatedBy}','${element.itemCreatedWhen}',${element.itemModifiedBy},'${element.itemModifiedWhen}',${element.itemOrder},'${element.itemGUID}'),`;
    });
  }
    // let ary = [];
  // for (let index = 0; index <280; index++) {
  //   ary.push(data[index])  
  // }

  if (tableName == 'local_com_paymentoption') {
    data.forEach((element) => {
      try {
        element.paymentOptionName = element.paymentOptionName
          ? element.paymentOptionName.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error 1', error);
      }

      try {
        element.paymentOptionDisplayName = element.paymentOptionDisplayName
          ? element.paymentOptionDisplayName.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error 1', error);
      }

      try {
        element.paymentOptionPaymentGateUrl =
          element.paymentOptionPaymentGateUrl
            ? element.paymentOptionPaymentGateUrl.replace(/'/g, "''")
            : '';
      } catch (error) {
        console.error('An error 1', error);
      }

      try {
        element.paymentOptionAssemblyName = element.paymentOptionAssemblyName
          ? element.paymentOptionAssemblyName.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error 1', error);
      }

      try {
        element.paymentOptionClassName = element.paymentOptionClassName
          ? element.paymentOptionClassName.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error 1', error);
      }

      try {
        element.paymentOptionGUID = element.paymentOptionGUID
          ? element.paymentOptionGUID.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error 1', error);
      }

      try {
        element.paymentOptionLastModified = element.paymentOptionLastModified
          ? element.paymentOptionLastModified.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error 1', error);
      }

      try {
        element.paymentOptionThumbnailGUID = element.paymentOptionThumbnailGUID
          ? element.paymentOptionThumbnailGUID.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error 1', error);
      }

      try {
        element.paymentOptionDescription = element.paymentOptionDescription
          ? element.paymentOptionDescription.replace(/'/g, "''")
          : '';
      } catch (error) {
        console.error('An error 1', error);
      }

      schema += `(${element.paymentOptionID},'${element.paymentOptionName}','${element.paymentOptionDisplayName}',${element.paymentOptionEnabled ? 1 :0},${element.paymentOptionSiteID},'${element.paymentOptionPaymentGateUrl}','${element.paymentOptionAssemblyName}','${element.paymentOptionClassName}',${element.paymentOptionSucceededOrderStatusID},${element.paymentOptionFailedOrderStatusID},'${element.paymentOptionGUID}','${element.paymentOptionLastModified}',${element.paymentOptionAllowIfNoShipping ? 1 : 0},'${element.paymentOptionThumbnailGUID}','${element.paymentOptionDescription}',${element.paymentOptionAuthorizedOrderStatusID}),`;
    });
  }

  if (tableName == 'local_ct_storecomments') {
    data.forEach((element) => {
      element.itemTitle = element.itemTitle
        ? element.itemTitle.replace(/'/g, "''")
        : '';
      element.itemComment = element.itemComment
        ? element.itemComment.replace(/'/g, "''")
        : '';

      schema += `(${element.itemID},${element.itemCreatedBy},'${element.itemCreatedWhen}',${element.itemModifiedBy},'${element.itemModifiedWhen}','${element.itemOrder}','${element.itemGUID}','${element.itemTitle}','${element.itemComment}',${element.tradeAccID},0,${element.isDeleted ? 1 : 0}),`;
    });
  }

  if (tableName == 'local_ct_customercontacts') {
    data.forEach((element) => {
      element.name = element.name ? element.name.replace(/'/g, "''") : '';
      element.itemGUID = element.itemGUID
        ? element.itemGUID.replace(/'/g, "''")
        : '';
      element.addressLine1 = element.addressLine1
        ? element.addressLine1.replace(/'/g, "''")
        : '';
      element.addressLine2 = element.addressLine2
        ? element.addressLine2.replace(/'/g, "''")
        : '';
      element.addressLine3 = element.addressLine3
        ? element.addressLine3.replace(/'/g, "''")
        : '';
      element.city = element.city ? element.city.replace(/'/g, "''") : '';
      element.postCode = element.postCode
        ? element.postCode.replace(/'/g, "''")
        : '';
      element.phone = element.phone ? element.phone.replace(/'/g, "''") : '';
      element.email = element.email ? element.email.replace(/'/g, "''") : '';
      element.state = element.state ? element.state.replace(/'/g, "''") : '';
      element.jobRole = element.jobRole
        ? element.jobRole.replace(/'/g, "''")
        : '';
      element.notes = element.notes ? element.notes.replace(/'/g, "''") : '';

      // Assuming `readyToSync` translates to a boolean, which needs to be converted to `1` or `0` for SQL.
      let readyToSyncValue = element.readyToSync ? 1 : 0;

      schema += `(${element.itemID},${element.itemCreatedBy},'${element.itemCreatedWhen}',${element.itemModifiedBy},'${element.itemModifiedWhen}','${element.name}','${element.itemGUID}','${element.addressLine1}','${element.addressLine2}','${element.addressLine3}','${element.city}','${element.postCode}','${element.phone}','${element.email}','${element.state}',${element.countryId},'${element.jobRole}','${element.notes}',${element.customerId},${element.isDeleted ? 1 : 0},${element.isDefault ? 1 : 0},${readyToSyncValue},${element.itemID}),`;
    });
  }

  // if (tableName == 'local_ct_customercontacts') {
  //   console.log(schema);
  // }

  schema = schema.slice(0, -1);

  return schema;
}

export default InitialSyncBulk;
