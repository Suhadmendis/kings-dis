import openDatabaseService from "../Config";

async function createTable(tableName) {
  const db = openDatabaseService();


  let schema = "";

  if (tableName == "local_com_sku") {
    schema = `CREATE TABLE IF NOT EXISTS
      ${tableName}(
          SKUID INTEGER PRIMARY KEY,
          SKUNumber VARCHAR(200),
          SKUName VARCHAR(440),
          SKUDescription VARCHAR(10000),
          SKUPrice REAL(18,4),
          SKUEnabled INTEGER(10),
          SKUDepartmentID INTEGER(10),
          SKUManufacturerID INTEGER(10),
          SKUInternalStatusID INTEGER(10),
          SKUPublicStatusID INTEGER(10),
          SKUSupplierID INTEGER(10),
          SKUAvailableInDays INTEGER(10),
          SKUGUID TEXT(30),
          SKUImagePath VARCHAR(450),
          SKUWeight REAL(18,4),
          SKUWidth REAL(18,4),
          SKUDepth REAL(18,4),
          SKUHeight REAL(18,4),
          SKUAvailableItems INTEGER(10),
          SKUSellOnlyAvailable INTEGER(10),
          SKUCustomData VARCHAR(10000),
          SKUOptionCategoryID INTEGER(10),
          SKUOrder INTEGER(10),
          SKULastModified TEXT(30),
          SKUCreated TEXT(30),
          SKUSiteID INTEGER(10),
          SKUNeedsShipping INTEGER(10),
          SKUValidUntil TEXT(30),
          SKUProductType VARCHAR(50),
          SKUMaxItemsInOrder INTEGER(10),
          SKUValidity VARCHAR(50),
          SKUValidFor INTEGER(10),
          SKUMembershipGUID TEXT(30),
          SKUConversionName VARCHAR(100),
          SKUConversionValue VARCHAR(100),
          SKUBundleInventoryType VARCHAR(50),
          SKUMinItemsInOrder INTEGER(10),
          SKURetailPrice REAL(18,4),
          SKUParentSKUID INTEGER(10),
          SKUShortDescription VARCHAR(10000),
          SKUEproductFilesCount INTEGER(10),
          SKUBundleItemsCount INTEGER(10),
          SKUInStoreFrom TEXT(30),
          SKUReorderAt INTEGER(10),
          SKUTrackInventory VARCHAR(50),
          SKUTaxClassID INTEGER(10),
          SKUBrandID INTEGER(10),
          SKUCollectionID INTEGER(10),
          SKUClassCode VARCHAR(200),
          SKUClassTable VARCHAR(200),
          SKUDataSetID INTEGER(10),
          SKUImageLocation VARCHAR(200),
          SKUCatNumber VARCHAR(200),
          SKUPackSize VARCHAR(200),
          SKUFeatures VARCHAR(10000),
          SKUDelMonth VARCHAR(100),
          SKUBarCode VARCHAR(200),
          SKUPrice2 REAL(18,4),
          SKUPrice3 REAL(18,4),
          SKUPrice4 REAL(18,4),
          SKUPrice5 REAL(18,4),
          SKUPrice6 REAL(18,4),
          SKUPrice7 REAL(18,4),
          SKUPrice8 REAL(18,4),
          SKUPrice9 REAL(18,4),
          SKUPrice10 REAL(18,4),
          SKUPrice1Label VARCHAR(250),
          SKUPrice2Label VARCHAR(250),
          SKUPrice3Label VARCHAR(250),
          SKUPrice4Label VARCHAR(250),
          SKUPrice5Label VARCHAR(250),
          SKUPrice6Label VARCHAR(250),
          SKUPrice7Label VARCHAR(250),
          SKUPrice8Label VARCHAR(250),
          SKUPrice9Label VARCHAR(250),
          SKUPrice10Label VARCHAR(250),
          SKUAnalysis VARCHAR(50),
          SkuDiscountCat VARCHAR(10),
          SKUPictorialPackSize INTEGER,
          SkuPricePreSeason REAL(18,4),
          SkuPreSeason INTEGER,
          SkuPreSeasonOnly INTEGER
      )`;
  }

  if (tableName == "local_cms_country") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      CountryID INTEGER PRIMARY KEY,
      CountryDisplayName VARCHAR(10),
      CountryName VARCHAR(10),
      CountryGUID VARCHAR(70),
      CountryLastModified VARCHAR(70),
      CountryTwoLetterCode VARCHAR(7),
      CountryThreeLetterCode VARCHAR(7),
      CountryStateRequired INTEGER,
      CountryGroupCode VARCHAR(7),
      CountryGroupID INTEGER
    )`;
  }

  if (tableName == "local_cms_state") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      StateID INTEGER PRIMARY KEY,
      StateDisplayName VARCHAR(100),
      StateName VARCHAR(100),
      StateCode VARCHAR(10),
      CountryID INTEGER,
      StateGUID VARCHAR(70),
      StateLastModified VARCHAR(70)
    )`;
  }

  if (tableName == "local_cms_role") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      RoleID INTEGER PRIMARY KEY,
      RoleDisplayName VARCHAR(100),
      RoleName VARCHAR(100),
      RoleDescription VARCHAR(500),
      SiteID INTEGER,
      RoleGUID VARCHAR(100),
      RoleLastModified VARCHAR(100),
      RoleGroupID INTEGER,
      RoleIsGroupAdministrator INTEGER,
      RoleIsDomain INTEGER
    )`;
  }

  if (tableName == "local_cms_user") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      UserID INTEGER PRIMARY KEY,
      UserName VARCHAR(200),
      FirstName VARCHAR(50),
      MiddleName VARCHAR(100),
      LastName VARCHAR(100),
      FullName VARCHAR(100),
      Email VARCHAR(100),
      UserPassword VARCHAR(500),
      PreferredCultureCode VARCHAR(100),
      PreferredUICultureCode VARCHAR(100),
      UserEnabled INTEGER,
      UserIsExternal INTEGER,
      UserPasswordFormat VARCHAR(100),
      UserCreated VARCHAR(100),
      LastLogon VARCHAR(100),
      UserStartingAliasPath VARCHAR(100),
      UserGUID VARCHAR(100),
      UserLastModified VARCHAR(100),
      UserLastLogonInfo VARCHAR(100),
      UserIsHidden VARCHAR(100),
      UserVisibility VARCHAR(100),
      UserIsDomain VARCHAR(100),
      UserHasAllowedCultures VARCHAR(100),
      UserMFRequired VARCHAR(100),
      UserPrivilegeLevel INTEGER,
      UserSecurityStamp VARCHAR(100),
      UserMFSecret VARCHAR(100),
      UserMFTimestep VARCHAR(100),
      UserBuyerCode VARCHAR(100),
      UserDataSetID INTEGER,
      UserAccCode VARCHAR(50),
      UserUploadKey VARCHAR(100),
      UserPasswordChangedOnWeb VARCHAR(100),
      UserTitle VARCHAR(100),
      AgreedPromotions VARCHAR(100),
      WishToDeleteAccount VARCHAR(100),
      UserAPISecret VARCHAR(100),
      UserAPIEnabled VARCHAR(100)
    )`;
  }

  if (tableName == "local_cms_userrole") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      UserID INTEGER,
      RoleID INTEGER,
      ValidTo VARCHAR(100),
      UserRoleID INTEGER PRIMARY KEY
    )`;
  }

  if (tableName == "local_com_customer") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      CustomerID INTEGER PRIMARY KEY,
      CustomerFirstName VARCHAR(50),
      CustomerLastName VARCHAR(50),
      CustomerEmail VARCHAR(50),
      CustomerPhone VARCHAR(50),
      CustomerFax VARCHAR(50),
      CustomerCompany VARCHAR(50),
      CustomerUserID INTEGER,
      CustomerGUID VARCHAR(100),
      CustomerTaxRegistrationID INTEGER,
      CustomerOrganizationID INTEGER,
      CustomerLastModified VARCHAR(50),
      CustomerSiteID INTEGER,
      CustomerCreated VARCHAR(50),
      CustomerEnabled INTEGER,
      CustomerPreferredCurrencyID INTEGER,
      CustomerPreferredShippingOptionID INTEGER,
      CustomerPreferredPaymentOptionID INTEGER,
      CustomerAccCode VARCHAR(50),
      CustomerBuyerCode VARCHAR(50),
      CustomerDataSetID INTEGER,
      CustomerMobile VARCHAR(100),
      CustomerJob VARCHAR(100),
      CustomerWeb VARCHAR(100),
      CustomerDefaultPaymentAddressID INTEGER,
      CustomerDefaultDeliveryAddressID INTEGER,
      CustomerUploadKey VARCHAR(100),
      Customer_SyncStatus INTEGER,
      LastUpdate VARCHAR(100),
      CustomerContactTitle VARCHAR(50),
      CustomerAllotmentPlotID INTEGER,
      CustomerKey1 VARCHAR(100),
      CatYear VARCHAR(100),
      CustomerSalesRepKey VARCHAR(50)
    )`;
  }

  if (tableName == "local_com_address") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      AddressID INTEGER PRIMARY KEY,
      AddressName VARCHAR(200),
      AddressLine1 VARCHAR(200),
      AddressLine2 VARCHAR(200),
      AddressCity VARCHAR(200),
      AddressZip VARCHAR(200),
      AddressPhone VARCHAR(200),
      AddressCustomerID INTEGER,
      AddressCountryID INTEGER,
      AddressStateID INTEGER,
      AddressPersonalName VARCHAR(200),
      AddressGUID VARCHAR(200),
      AddressLastModified VARCHAR(200),
      AddressLine4 VARCHAR(200),
      AddressLine3 VARCHAR(200),
      AddressEnabled INTEGER,
      AddressIsBilling INTEGER,
      AddressIsShipping INTEGER,
      AddressWebOnly INTEGER,
      AddressIsDefault INTEGER,
      AddressAccCode VARCHAR(200),
      AddressCode VARCHAR(200),
      AddressDataSetID INTEGER,
      Address_SyncStatus VARCHAR(200),
      LastUpdate VARCHAR(200),
      AddressContactTitle VARCHAR(200),
      AddressFirstName VARCHAR(200),
      AddressLastName VARCHAR(200),
      AddressUploadKey VARCHAR(200),
      AddressOldID INTEGER,
      DisplayOrder INTEGER,
      WebAddressID INTEGER,
      ReadyToSync INTEGER
    )`;
  }

  if (tableName == "local_ct_userappointments") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      ItemCreatedBy INTEGER,
      ItemCreatedWhen VARCHAR(100),
      ItemModifiedBy INTEGER,
      ItemModifiedWhen VARCHAR(100),
      ItemOrder VARCHAR(200),
      ItemGUID VARCHAR(200),
      Email VARCHAR(100),
      Subject VARCHAR(500),
      Location VARCHAR(100),
      StartDate VARCHAR(100),
      EndDate VARCHAR(100),
      Note VARCHAR(500),
      TradeAccID INTEGER,
      IsDeleted INTEGER,
      ReadyToSync INTEGER,
      ReadyToUpdate INTEGER
    )`;
  }

  if (tableName == "local_com_shoppingcart") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ShoppingCartID INTEGER PRIMARY KEY,
      ShoppingCartGUID VARCHAR(100),
      ShoppingCartUserID INTEGER,
      ShoppingCartSiteID INTEGER,
      ShoppingCartLastUpdate VARCHAR(100),
      ShoppingCartCurrencyID INTEGER,
      ShoppingCartPaymentOptionID INTEGER,
      ShoppingCartShippingOptionID INTEGER,
      ShoppingCartBillingAddressID INTEGER,
      ShoppingCartShippingAddressID INTEGER,
      ShoppingCartCustomerID INTEGER,
      ShoppingCartNote VARCHAR(1000),
      ShoppingCartCompanyAddressID INTEGER,
      ShoppingCartCustomData VARCHAR(100),
      ShoppingCartContactID INTEGER,
      AppShoppingCartPreSeason VARCHAR(20),
      AppShoppingCartName VARCHAR(100),
      AppShoppingCartSaveFlag VARCHAR(10),
      ShoppingCartIsPreSeason INTEGER,
      ToEmail VARCHAR(100),
      ReadyToSync INTEGER
    )`;
  }

  if (tableName == "local_com_shoppingcartsku") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      CartItemID INTEGER PRIMARY KEY,
      ShoppingCartID INTEGER,
      SKUID INTEGER,
      SKUUnits INTEGER,
      CartItemCustomData VARCHAR(100),
      CartItemGuid VARCHAR(200),
      CartItemParentGuid VARCHAR(200),
      CartItemValidTo datetime2(7),
      CartItemBundleGUID VARCHAR(200),
      CartItemText VARCHAR(100),
      CartItemAutoAddedUnits INTEGER,
      CartItemUnitListPrice DECIMAL(19,4),
      CartItemUnitPrice DECIMAL(19,4),
      CartItemUnitDiscount DECIMAL(19,4),
      CartItemPrice DECIMAL(19,4),
      CartItemDiscountRate DECIMAL(19,4),
      CartItemQuoteLineDiscount DECIMAL(19,4),
      CartItemQuoteLineDiscountType VARCHAR(100),
      CartItemQuoteYourPrice DECIMAL(19,4),
      CartItemPriceLine INTEGER,
      CartItemLineTax DECIMAL(19,4),
      CartItemNote VARCHAR(3000),
      CartItemBackCard VARCHAR(200)
    )`;
  }

  if (tableName == "local_com_order") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      OrderID INTEGER PRIMARY KEY,
      OrderShippingOptionID INTEGER,
      OrderTotalShipping DECIMAL(5,9),
      OrderTotalPrice DECIMAL(5,9),
      OrderTotalTax DECIMAL(5,9),
      OrderDate VARCHAR(100),
      OrderStatusID INTEGER,
      OrderCurrencyID INTEGER,
      OrderCustomerID INTEGER,
      OrderCreatedByUserID INTEGER,
      OrderNote VARCHAR(5000),
      OrderSiteID INTEGER,
      OrderPaymentOptionID INTEGER,
      OrderInvoice VARCHAR(100000),
      OrderInvoiceNumber VARCHAR(100),
      OrderTrackingNumber VARCHAR(100),
      OrderCustomData VARCHAR(100),
      OrderPaymentResult VARCHAR(100),
      OrderGUID VARCHAR(100),
      OrderLastModified VARCHAR(100),
      OrderTotalPriceInMainCurrency DECIMAL(5,9),
      OrderIsPaid INTEGER,
      OrderCulture VARCHAR(100),
      OrderDiscounts VARCHAR(100),
      OrderGrandTotal DECIMAL(5,9),
      OrderGrandTotalInMainCurrency DECIMAL(5,9),
      OrderOtherPayments VARCHAR(100),
      OrderTaxSummary VARCHAR(100),
      OrderCouponCodes VARCHAR(100),
      OrderPONumber VARCHAR(100),
      OrderAPayment INTEGER,
      OrderPaymentType VARCHAR(100),
      OrderBillingAddressID INTEGER,
      OrderShippingAddressID INTEGER,
      OrderDataSetID INTEGER,
      OrderAccountsReference VARCHAR(100),
      LastUpdate VARCHAR(100),
      OrderPartShipment INTEGER,
      OrderComments VARCHAR(100),
      OrderType VARCHAR(100),
      OrderInsertedToDim INTEGER,
      OrderSageVendorTxCode VARCHAR(100),
      OrderReceiptInseredToDim INTEGER,
      OrderAbandonedStatus VARCHAR(100),
      OrderToEmail VARCHAR(100),
      OrderRegNumber VARCHAR(1000),
      OrderQuoteID INTEGER,
      UnavaiableItems VARCHAR(3000),
      OrderPreseason INTEGER,
      WebOrderID INTEGER
    )`;
  }

  if (tableName == "local_cms_settingskey") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      KeyID INTEGER PRIMARY KEY,
      KeyName VARCHAR(100),
      KeyDisplayName VARCHAR(100),
      KeyDescription VARCHAR(500),
      KeyValue VARCHAR(100),
      KeyType VARCHAR(100),
      KeyCategoryID INTEGER,
      SiteID INTEGER,
      KeyGUID varying(100),
      KeyLastModified varying(100),
      KeyOrder INTEGER,
      KeyDefaultValue VARCHAR(100),
      KeyValidation VARCHAR(100),
      KeyEditingControlPath VARCHAR(100),
      KeyIsGlobal INTEGER,
      KeyIsCustom INTEGER,
      KeyIsHidden INTEGER,
      KeyFormControlSettings VARCHAR(3000),
      KeyExplanationText VARCHAR(100)
    )`;
  }

  if (tableName == "local_com_orderaddress") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      AddressID INTEGER PRIMARY KEY,
      AddressLine1 VARCHAR(100),
      AddressLine2 VARCHAR(100),
      AddressCity VARCHAR(100),
      AddressZip VARCHAR(100),
      AddressPhone VARCHAR(100),
      AddressCountryID INTEGER,
      AddressStateID INTEGER,
      AddressPersonalName VARCHAR(100),
      AddressGUID VARCHAR(100),
      AddressLastModified VARCHAR(100),
      AddressOrderID INTEGER,
      AddressType INTEGER,
      AddressLine3 VARCHAR(100),
      AddressLine4 VARCHAR(100),
      CustomerAddressID INTEGER,
      WebOrderAddressID INTEGER,
      LocalCustomerAddressID INTEGER
    )`;
  }

  if (tableName == "local_com_orderitem") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      OrderItemID INTEGER PRIMARY KEY,
      OrderItemOrderID INTEGER,
      OrderItemSKUID INTEGER,
      OrderItemSKUName VARCHAR(100),
      OrderItemUnitPrice DECIMAL(4,10),
      OrderItemUnitCount INTEGER,
      OrderItemCustomData VARCHAR(100),
      OrderItemGuid VARCHAR(100),
      OrderItemParentGuid VARCHAR(100),
      OrderItemLastModified VARCHAR(100),
      OrderItemValidTo VARCHAR(100),
      OrderItemBundleGUID INTEGER,
      OrderItemTotalPriceInMainCurrency DECIMAL(4,10),
      OrderItemSendNotification,
      OrderItemText VARCHAR(100),
      OrderItemProductDiscounts VARCHAR(500),
      OrderItemDiscountSummary VARCHAR(100),
      OrderItemTotalPrice DECIMAL(4,10),
      OrderItemUnitListPrice DECIMAL(4,10),
      OrderItemUnitDiscount DECIMAL(4,10),
      OrderItemDiscountRate DECIMAL(4,10),
      OrderItemDataSetID INTEGER,
      OrderItemAccountsReference VARCHAR(100),
      OrderItemOrderInvoiceNumber VARCHAR(100),
      OrderItemQtyDelivered INTEGER,
      OrderItemQtyInvoiced INTEGER,
      OrderInvoiceNumber VARCHAR(100),
      OrderInsertedToDim INTEGER,
      od_OHID_DSID VARCHAR(100),
      BatchName VARCHAR(100),
      OrderItemPriceLine INTEGER,
      OrderItemNote VARCHAR(3000),
      OrderItemBackCard VARCHAR(200),
      WebOrderItemID INTEGER
    )`;
  }

  if (tableName == "local_com_orderstatus") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      StatusID INTEGER PRIMARY KEY,
      StatusName VARCHAR(100),
      StatusDisplayName VARCHAR(100),
      StatusOrder INTEGER,
      StatusEnabled INTEGER,
      StatusColor VARCHAR(100),
      StatusGUID VARCHAR(100),
      StatusLastModified VARCHAR(100),
      StatusSendNotification INTEGER,
      StatusSiteID INTEGER,
      StatusOrderIsPaid INTEGER
    )`;
  }

  if (tableName == "local_ct_tradeaccount") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      ItemCreatedBy VARCHAR(100),
      ItemCreatedWhen VARCHAR(100),
      ItemModifiedBy VARCHAR(100),
      ItemModifiedWhen VARCHAR(100),
      ItemOrder VARCHAR(100),
      ItemGUID VARCHAR(100),
      ItemDataSetID INTEGER,
      ItemCode VARCHAR(100),
      ItemName VARCHAR(100),
      ItemAdminFirstName VARCHAR(100),
      ItemAdminLastName VARCHAR(100),
      ItemAddressLine1 VARCHAR(100),
      ItemAddressLine2 VARCHAR(100),
      ItemCity VARCHAR(100),
      ItemCounty VARCHAR(100),
      ItemPostcode VARCHAR(100),
      ItemCountryId INTEGER,
      ItemAdminEmail VARCHAR(100),
      ItemAdminPhone VARCHAR(100),
      ItemNotes VARCHAR(100),
      ItemOnStop INTEGER,
      ItemEnabled INTEGER,
      ItemSiteID INTEGER,
      ItemAccBalance VARCHAR(100),
      ItemCreditLimit VARCHAR(100),
      ItemPriceKey INTEGER,
      ItemLineDiscount VARCHAR(100),
      ItemTotalDiscount VARCHAR(100),
      ItemTaxable INTEGER,
      ItemTaxCode VARCHAR(100),
      ItemCurrencyCode VARCHAR(100),
      ItemStaffEmail VARCHAR(100),
      ItemType VARCHAR(100),
      ItemKey1 VARCHAR(100),
      ItemKey2 VARCHAR(100),
      ItemKey3 VARCHAR(100),
      ItemDiscGroup1 VARCHAR(100),
      ItemDiscGroup2 VARCHAR(100),
      ItemDiscGroup3 VARCHAR(100),
      ItemDiscGroup4 VARCHAR(100),
      ItemAccAreaCode VARCHAR(100),
      IsSynced VARCHAR(1)
    )`;
  }

  if (tableName == "local_ct_tradeaccountcustomer") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      ItemCreatedBy VARCHAR(100),
      ItemCreatedWhen VARCHAR(100),
      ItemModifiedBy VARCHAR(100),
      ItemModifiedWhen VARCHAR(100),
      ItemOrder VARCHAR(100),
      ItemGUID VARCHAR(100),
      TradeAccId INTEGER,
      TradeAccName VARCHAR(100),
      CustomerId INTEGER,
      CustomerName VARCHAR(100),
      ItemIsAdmin INTEGER
    )`;
  }

  if (tableName == "local_ct_deliverymatrix") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      ItemCountryGroupID INTEGER,
      ItemPostcodeZoneID INTEGER,
      ItemDeliveryFactors VARCHAR(100),
      ItemShippingOptionID INTEGER,
      ItemPrice VARCHAR(100),
      ItemRestrictedToPaymentOption INTEGER,
      ItemCreatedBy INTEGER,
      ItemCreatedWhen VARCHAR(100),
      ItemModifiedBy INTEGER,
      ItemModifiedWhen VARCHAR(100),
      ItemOrder INTEGER,
      ItemGUID VARCHAR(100),
      ItemSiteID INTEGER,
      ItemSiteRoleID INTEGER,
      ItemDiscountedPrice VARCHAR(100),
      ItemPriceLabel VARCHAR(100)
    )`;
  }

  if (tableName == "local_ct_countrygroup") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      ItemName VARCHAR(100),
      ItemCreatedBy INTEGER,
      ItemCreatedWhen VARCHAR(100),
      ItemModifiedBy INTEGER,
      ItemModifiedWhen VARCHAR(100),
      ItemOrder INTEGER,
      ItemGUID VARCHAR(100)
    )`;
  }

  if (tableName == "local_ct_postcodes") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      ItemPostcode VARCHAR(100),
      ItemX INTEGER,
      ItemY INTEGER,
      ItemLatitude VARCHAR(100),
      ItemLongitude VARCHAR(100),
      ItemTown VARCHAR(100),
      ItemCounty VARCHAR(100),
      ItemCountyID INTEGER,
      ItemZone VARCHAR(100),
      ItemZoneID INTEGER,
      ItemCreatedBy INTEGER,
      ItemCreatedWhen VARCHAR(100),
      ItemModifiedBy VARCHAR(100),
      ItemModifiedWhen VARCHAR(100),
      ItemOrder VARCHAR(100),
      ItemGUID VARCHAR(100)
    )`;
  }

  if (tableName == "local_ct_postcodezone") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      ItemName VARCHAR(100),
      ItemCreatedBy INTEGER,
      ItemCreatedWhen VARCHAR(100),
      ItemModifiedBy INTEGER,
      ItemModifiedWhen VARCHAR(100),
      ItemOrder INTEGER,
      ItemGUID VARCHAR(100)
    )`;
  }

  if (tableName == "local_com_shippingoption") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ShippingOptionID INTEGER PRIMARY KEY,
      ShippingOptionName VARCHAR(100),
      ShippingOptionDisplayName VARCHAR(100),
      ShippingOptionEnabled INTEGER,
      ShippingOptionSiteID INTEGER,
      ShippingOptionGUID VARCHAR(100),
      ShippingOptionLastModified VARCHAR(100),
      ShippingOptionThumbnailGUID VARCHAR(100),
      ShippingOptionDescription VARCHAR(100),
      ShippingOptionCarrierID INTEGER,
      ShippingOptionCarrierServiceName VARCHAR(100),
      ShippingOptionTaxClassID INTEGER,
      ShippingOptionCountryIDs VARCHAR(100)
    )`;
  }

  if (tableName == "local_int_salestax") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      stax_Code VARCHAR(100),
      stax_Name VARCHAR(100),
      stax_Region VARCHAR(100),
      stax_RegionType INTEGER,
      stax_Rate VARCHAR(100),
      stax_IsFlatValue INTEGER,
      stax_DataSetID INTEGER,
      UploadKey VARCHAR(100),
      LastUpdate VARCHAR(100),
      Status INTEGER,
      ItemCreatedBy VARCHAR(100),
      ItemCreatedWhen VARCHAR(100),
      ItemModifiedBy VARCHAR(100),
      ItemModifiedWhen VARCHAR(100),
      ItemOrder VARCHAR(100),
      ItemGUID VARCHAR(100)
    )`;
  }

  if (tableName == "local_int_analysis") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      Ana_DataSetID INTEGER,
      Ana_Code VARCHAR(100),
      Ana_Name VARCHAR(100),
      Ana_VatCode VARCHAR(100),
      UploadKey VARCHAR(100),
      LastUpdate VARCHAR(100),
      Status INTEGER,
      ItemCreatedBy VARCHAR(100),
      ItemCreatedWhen VARCHAR(100),
      ItemModifiedBy VARCHAR(100),
      ItemModifiedWhen VARCHAR(100),
      ItemOrder INTEGER,
      ItemGUID VARCHAR(100)
    )`;
  }

  if (tableName == "local_int_contactnotes") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      CusId INTERGER,
      Note VARCHAR(200),
      NoteTitle VARCHAR(100),
      Date VARCHAR(100)
    )`;
  }

  if (tableName == "local_contacts") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100),
      addressLine1 VARCHAR(100),
      addressLine2 VARCHAR(100),
      addressLine3 VARCHAR(100),
      city VARCHAR(100),
      postCode VARCHAR(100),
      phone VARCHAR(100),
      email VARCHAR(100),
      state VARCHAR(100),
      country VARCHAR(100),
      countryId INTEGER,
      jobRole VARCHAR(100),
      notes VARCHAR(5000),
      customerId INTEGER
    )`;
  }

  if (tableName == "local_ct_quotes") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      ItemCustomerID INTEGER,
      ItemShoppingCartID INTEGER,
      ItemSiteID INTEGER,
      ItemCreatedBy INTEGER,
      ItemCreatedWhen DECIMAL(7),
      ItemModifiedBy INTEGER,
      ItemModifiedWhen DECIMAL(7),
      ItemOrder INTEGER,
      ItemGUID VARCHAR(200),
      ItemQuoteLabel VARCHAR(200),
      ItemQuoteTotal DECIMAL(19,4),
      ItemQuoteDelivery DECIMAL(19,4)
    )`;
  }

  if (tableName == "local_ct_quotestatus") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      ItemDisplayName VARCHAR(200),
      ItemName VARCHAR(200),
      ItemCreatedBy INTEGER,
      ItemCreatedWhen VARCHAR(50),
      ItemModifiedBy INTEGER,
      ItemModifiedWhen VARCHAR(50),
      ItemOrder INTEGER,
      ItemGUID VARCHAR(200)
    )`;
  }

  if (tableName == "local_ct_quotestatususer") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      ItemQuoteID INTEGER,
      ItemQuoteStatusID INTEGER,
      ItemSiteID INTEGER,
      ItemCreatedBy INTEGER,
      ItemCreatedWhen VARCHAR(50),
      ItemModifiedBy INTEGER,
      ItemModifiedWhen VARCHAR(50),
      ItemOrder INTEGER,
      ItemGUID VARCHAR(200)
    )`;
  }

  if (tableName == "local_orderpad") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      id INTEGER,
      uniqId INTEGER,
      title VARCHAR(10),
      des VARCHAR(100),
      code VARCHAR(50),
      packSize VARCHAR(20),
      priceOptions VARCHAR(1000),
      qty INTEGER,
      unitPrice DECIMAL(19,4),
      lineTotal DECIMAL(19,4)
    )`;
  }

  if (tableName == "local_cms_culture") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      CultureID INTEGER PRIMARY KEY,
      CultureName VARCHAR(255),
      CultureCode VARCHAR(55),
      CultureShortName VARCHAR(255),
      CultureGUID VARCHAR(255),
      CultureLastModified DECIMAL(19,4),
      CultureAlias VARCHAR(255),
      CultureIsUICulture VARCHAR(255)
    )`;
  }

  if (tableName == "local_cms_resource") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ResourceID INTEGER PRIMARY KEY,
      ResourceDisplayName VARCHAR(255),
      ResourceName VARCHAR(255),
      ResourceDescription VARCHAR(5000),
      ShowInDevelopment VARCHAR(255),
      ResourceURL VARCHAR(255),
      ResourceGUID VARCHAR(255),
      ResourceLastModified DECIMAL(19,4),
      ResourceIsInDevelopment VARCHAR(255),
      ResourceHasFiles VARCHAR(255),
      ResourceVersion VARCHAR(255),
      ResourceAuthor VARCHAR(255),
      ResourceInstallationState VARCHAR(255),
      ResourceInstalledVersion VARCHAR(255)
    )`;
  }

  if (tableName == "local_cms_resourcestring") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      StringID INTEGER PRIMARY KEY,
      StringKey VARCHAR(255),
      StringIsCustom VARCHAR(255),
      StringGUID VARCHAR(255)
    )`;
  }

  if (tableName == "local_cms_resourcetranslation") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      TranslationID INTEGER PRIMARY KEY,
      TranslationStringID INTEGER,
      TranslationText VARCHAR(255),
      TranslationCultureID INTEGER
    )`;
  }

  if (tableName == "local_int_navigation") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      ItemCreatedBy INTEGER,
      ItemCreatedWhen VARCHAR(100),
      ItemModifiedBy INTEGER,
      ItemModifiedWhen VARCHAR(100),
      ItemOrder INTEGER,
      ItemGUID VARCHAR(200),
      Nav_DatasetID INTEGER,
      Nav_ShopID INTEGER,
      Nav_NodeID VARCHAR(100),
      Nav_RangeNodeID VARCHAR(100),
      Nav_SKUNodeID INTEGER,
      Nav_SKUID INTEGER,
      Nav_StockCode VARCHAR(30),
      Nav_Navigation VARCHAR(1000),
      Nav_ItemAttribute1 VARCHAR(250),
      Nav_ItemAttribute2 VARCHAR(250),
      Nav_ItemAttribute3 VARCHAR(250),
      Nav_ItemAttribute4 VARCHAR(250),
      Nav_ItemAttribute5 VARCHAR(250),
      Nav_ItemAttribute6 VARCHAR(50),
      Nav_ItemAttribute7 VARCHAR(50),
      Nav_ItemAttribute8 VARCHAR(50),
      Nav_ItemAttribute9 VARCHAR(50),
      Nav_ItemAttribute10 VARCHAR(50),
      Nav_ItemAttribute11 VARCHAR(50),
      Nav_ItemAttribute12 VARCHAR(50),
      Nav_ItemAttribute13 VARCHAR(50),
      Nav_ItemAttribute14 VARCHAR(50),
      Nav_ItemAttribute15 VARCHAR(50),
      Nav_RangeDataHeadings VARCHAR(1000),
      Nav_ItemData1 VARCHAR(1000),
      Nav_ItemData2 VARCHAR(1000),
      Nav_ItemData3 VARCHAR(1000),
      Nav_ItemData4 VARCHAR(1000),
      Nav_ItemData5 VARCHAR(1000),
      Nav_ItemData6 VARCHAR(1000),
      Nav_ItemData7 VARCHAR(1000),
      Nav_ItemData8 VARCHAR(1000),
      Nav_ItemData9 VARCHAR(1000),
      Nav_ItemData10 VARCHAR(1000),
      Nav_Order INTEGER,
      Nav_Range VARCHAR(100),
      Nav_RangeDescription VARCHAR(5000),
      Nav_Suspend INTEGER,
      UploadKey VARCHAR(255),
      LastUpdate VARCHAR(100),
      Status INTEGER,
      Nav_RangeCode VARCHAR(50),
      Nav_GroupCode VARCHAR(50),
      Nav_SubGroupCode VARCHAR(50)
    )`;
  }

  if (tableName == "local_int_nav_attributes") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      Nav_DatasetID INTEGER,
      Nav_ShopID INTEGER,
      Nav_Path VARCHAR(1000),
      Nav_Lvl1 VARCHAR(100),
      Nav_ColumnLvl2 INTEGER,
      Nav_PositionLvl2 INTEGER,
      Nav_ClickableLvl2 VARCHAR(100),
      Nav_ColumnLvl3 INTEGER,
      Nav_PositionLvl3 INTEGER,
      Nav_ClickableLvl3 VARCHAR(100),
      Nav_itemattributelabel1 VARCHAR(50),
      Nav_itemattributefilter1 VARCHAR(10),
      Nav_itemattributelabel2 VARCHAR(50),
      Nav_itemattributefilter2 VARCHAR(10),
      Nav_itemattributelabel3 VARCHAR(50),
      Nav_itemattributefilter3 VARCHAR(10),
      Nav_itemattributelabel4 VARCHAR(50),
      Nav_itemattributefilter4 VARCHAR(10),
      Nav_itemattributelabel5 VARCHAR(50),
      Nav_itemattributefilter5 VARCHAR(10),
      Nav_itemattributelabel6 VARCHAR(50),
      Nav_itemattributefilter6 VARCHAR(10),
      Nav_itemattributelabel7 VARCHAR(50),
      Nav_itemattributefilter7 VARCHAR(10),
      Nav_itemattributelabel8 VARCHAR(50),
      Nav_itemattributefilter8 VARCHAR(10),
      Nav_itemattributelabel9 VARCHAR(50),
      Nav_itemattributefilter9 VARCHAR(10),
      Nav_itemattributelabel10 VARCHAR(50),
      Nav_itemattributefilter10 VARCHAR(10),
      Nav_itemattributelabel11 VARCHAR(50),
      Nav_itemattributefilter11 VARCHAR(10),
      Nav_itemattributelabel12 VARCHAR(50),
      Nav_itemattributefilter12 VARCHAR(10),
      Nav_itemattributelabel13 VARCHAR(50),
      Nav_itemattributefilter13 VARCHAR(10),
      Nav_itemattributelabel14 VARCHAR(50),
      Nav_itemattributefilter14 VARCHAR(10),
      Nav_itemattributelabel15 VARCHAR(50),
      Nav_itemattributefilter15 VARCHAR(10),
      Nav_Suspend INTEGER,
      UploadKey VARCHAR(255),
      LastUpdate datetime2(7),
      Status INTEGER,
      ItemCreatedBy INTEGER,
      ItemCreatedWhen VARCHAR(100),
      ItemModifiedBy INTEGER,
      ItemModifiedWhen VARCHAR(100),
      ItemOrder INTEGER,
      ItemGUID VARCHAR(100)
    )`;
  }

  if (tableName == "local_ct_deliveryfactors") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
        ItemID INTEGER PRIMARY KEY,
        ItemName VARCHAR(200),
        ItemFactor VARCHAR(200),
        ItemFreeDeliveryValue DECIMAL(10),
        ItemSiteID INTEGER,
        ItemCreatedBy VARCHAR(100),
        ItemCreatedWhen VARCHAR(100),
        ItemModifiedBy INTEGER,
        ItemModifiedWhen VARCHAR(100),
        ItemOrder INTEGER,
        ItemGUID VARCHAR(255)
    )`;
  }

  if (tableName == "local_com_paymentoption") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
        PaymentOptionID INTEGER PRIMARY KEY,
        PaymentOptionName VARCHAR(200),
        PaymentOptionDisplayName VARCHAR(200),
        PaymentOptionEnabled INTEGER,
        PaymentOptionSiteID INTEGER,
        PaymentOptionPaymentGateUrl VARCHAR(255),
        PaymentOptionAssemblyName VARCHAR(200),
        PaymentOptionClassName VARCHAR(200),
        PaymentOptionSucceededOrderStatusID INTEGER,
        PaymentOptionFailedOrderStatusID INTEGER,
        PaymentOptionGUID VARCHAR(255),
        PaymentOptionLastModified VARCHAR(100),
        PaymentOptionAllowIfNoShipping INTEGER,
        PaymentOptionThumbnailGUID VARCHAR(255),
        PaymentOptionDescription VARCHAR(255),
        PaymentOptionAuthorizedOrderStatusID INTEGER
    )`;
  }

  if (tableName == 'local_info') {
    schema = `CREATE TABLE ${tableName}(
      id INTEGER,
      isOffline INTEGER,
      isHomeScreen INTEGER,
      AppVersion VARCHAR(10),
      BuildNumber VARCHAR(10)
    )`;
  }

  if (tableName == "local_ct_storecomments") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY,
      ItemCreatedBy INTEGER,
      ItemCreatedWhen VARCHAR(100),
      ItemModifiedBy INTEGER,
      ItemModifiedWhen VARCHAR(100),
      ItemOrder VARCHAR(100),
      ItemGUID VARCHAR(100),
      ItemTitle VARCHAR(100),
      ItemComment VARCHAR(5000),
      TradeAccID INTEGER,
      ReadyToSync INTEGER,
      IsDeleted INTEGER
    )`;
  }

  if (tableName == "local_ct_customercontacts") {
    schema = `CREATE TABLE IF NOT EXISTS
    ${tableName}(
      ItemID INTEGER PRIMARY KEY AUTOINCREMENT,
      ItemCreatedBy INTEGER,
      ItemCreatedWhen VARCHAR(100),
      ItemModifiedBy INTEGER,
      ItemModifiedWhen VARCHAR(100),
      Name VARCHAR(100),
      ItemGUID VARCHAR(100),
      AddressLine1 VARCHAR(100),
      AddressLine2 VARCHAR(100),
      AddressLine3 VARCHAR(100),
      City VARCHAR(100),
      PostCode VARCHAR(100),
      Phone VARCHAR(100),
      Email VARCHAR(100),
      State VARCHAR(100),
      CountryId INTEGER,
      JobRole VARCHAR(100),
      Notes VARCHAR(100),
      CustomerId INTEGER,
      IsDeleted INTEGER,
      IsDefault INTEGER,
      ReadyToSync INTEGER,
      WebContactId INTEGER
    )`;
  }

  return new Promise((resolve, reject) => {
    if (schema != "") {
      db.transaction(
        (tx) => {
          // console.log(schema);
          tx.executeSql(`DROP TABLE IF EXISTS ${tableName}`, []);
          tx.executeSql(schema, []);
          tx.executeSql(createIndexStatment(tableName), [], function (tx, res) {
            resolve([{ tableName: tableName, created: "1" }]);
          });
          schema = "";
          // tx.executeSql(`PRAGMA table_info(${tableName});`,[],(tx, results) => console.log(results));
        },
        null,
        null
      );
    } else {
      resolve([{ tableName: tableName, created: "0" }]);
    }
  });
}

function createIndexStatment(tableName) {
  if (tableName == "local_com_sku") {
    return "CREATE INDEX idx_com_sku ON local_com_sku (SKUID)";
  }
  if (tableName == "local_cms_country") {
    return "CREATE INDEX idx_cms_country ON local_cms_country (CountryID)";
  }
  if (tableName == "local_cms_state") {
    return "CREATE INDEX idx_cms_state ON local_cms_state (StateID)";
  }
  if (tableName == "local_cms_role") {
    return "CREATE INDEX idx_cms_role ON local_cms_role (RoleID)";
  }
  if (tableName == "local_cms_user") {
    return "CREATE INDEX idx_cms_user ON local_cms_user (UserID)";
  }
  if (tableName == "local_cms_userrole") {
    return "CREATE INDEX idx_cms_userrole ON local_cms_userrole (UserRoleID)";
  }
  if (tableName == "local_com_customer") {
    return "CREATE INDEX idx_com_customer ON local_com_customer (CustomerID)";
  }
  if (tableName == "local_com_address") {
    return "CREATE INDEX idx_com_address ON local_com_address (AddressID)";
  }
  if (tableName == "local_ct_userappointments") {
    return "CREATE INDEX idx_ct_userappointments ON local_ct_userappointments (ItemID)";
  }
  if (tableName == "local_com_shoppingcart") {
    return "CREATE INDEX idx_com_shoppingcart ON local_com_shoppingcart (ShoppingCartID)";
  }
  if (tableName == "local_com_shoppingcartsku") {
    return "CREATE INDEX idx_com_shoppingcartsku ON local_com_shoppingcartsku (CartItemID)";
  }
  if (tableName == "local_com_order") {
    return "CREATE INDEX idx_com_order ON local_com_order (OrderID)";
  }
  if (tableName == "local_cms_settingskey") {
    return "CREATE INDEX idx_cms_settingskey ON local_cms_settingskey (keyID)";
  }
  if (tableName == "local_com_orderaddress") {
    return "CREATE INDEX idx_com_orderaddress ON local_com_orderaddress (AddressID)";
  }
  if (tableName == "local_com_orderitem") {
    return "CREATE INDEX idx_com_orderitem ON local_com_orderitem (OrderItemID)";
  }
  if (tableName == "local_com_orderstatus") {
    return "CREATE INDEX idx_com_orderstatus ON local_com_orderstatus (StatusID)";
  }
  if (tableName == "local_ct_tradeaccount") {
    return "CREATE INDEX idx_ct_tradeaccount ON local_ct_tradeaccount (ItemID)";
  }
  if (tableName == "local_ct_tradeaccountcustomer") {
    return "CREATE INDEX idx_ct_tradeaccountcustomer ON local_ct_tradeaccountcustomer (ItemID)";
  }
  if (tableName == "local_ct_deliverymatrix") {
    return "CREATE INDEX idx_ct_deliverymatrix ON local_ct_deliverymatrix (ItemID)";
  }
  if (tableName == "local_ct_countrygroup") {
    return "CREATE INDEX idx_ct_countrygroup ON local_ct_countrygroup (ItemID)";
  }
  if (tableName == "local_ct_postcodes") {
    return "CREATE INDEX idx_ct_postcodes ON local_ct_postcodes (ItemID)";
  }
  if (tableName == "local_ct_postcodezone") {
    return "CREATE INDEX idx_ct_postcodezone ON local_ct_postcodezone (ItemID)";
  }
  if (tableName == "local_com_shippingoption") {
    return "CREATE INDEX idx_com_shippingoption ON local_com_shippingoption (ShippingOptionID)";
  }
  if (tableName == "local_int_salestax") {
    return "CREATE INDEX idx_int_salestax ON local_int_salestax (ItemID)";
  }
  if (tableName == "local_int_analysis") {
    return "CREATE INDEX idx_int_analysis ON local_int_analysis (ItemID)";
  }
  if (tableName == "local_int_contactnotes") {
    return "CREATE INDEX idx_int_contactnotes ON local_int_contactnotes (Id)";
  }
  if (tableName == "local_contacts") {
    return "CREATE INDEX idx_contacts ON local_contacts (id)";
  }
  if (tableName == "local_ct_quotes") {
    return "CREATE INDEX idx_ct_quotes ON local_ct_quotes (ItemID)";
  }
  if (tableName == "local_ct_quotestatus") {
    return "CREATE INDEX idx_ct_quotestatus ON local_ct_quotestatus (ItemID)";
  }
  if (tableName == "local_ct_quotestatususer") {
    return "CREATE INDEX idx_ct_quotestatususer ON local_ct_quotestatususer (ItemID)";
  }
  if (tableName == "local_orderpad") {
    return "CREATE INDEX idx_local_orderpad ON local_orderpad (id)";
  }
  if (tableName == "local_cms_culture") {
    return "CREATE INDEX idx_cms_culture ON local_cms_culture (CultureID)";
  }
  if (tableName == "local_cms_resource") {
    return "CREATE INDEX idx_cms_resource ON local_cms_resource (ResourceID)";
  }
  if (tableName == "local_cms_resourcestring") {
    return "CREATE INDEX idx_cms_resourcestring ON local_cms_resourcestring (StringID)";
  }
  if (tableName == "local_cms_resourcetranslation") {
    return "CREATE INDEX idx_cms_resourcetranslation ON local_cms_resourcetranslation (TranslationID)";
  }
  if (tableName == "local_int_navigation") {
    return "CREATE INDEX idx_int_navigation ON local_int_navigation (ItemID)";
  }
  if (tableName == "local_int_nav_attributes") {
    return "CREATE INDEX idx_int_nav_attributes ON local_int_nav_attributes (ItemID)";
  }
  if (tableName == "local_ct_deliveryfactors") {
    return "CREATE INDEX idx_ct_deliveryfactors ON local_ct_deliveryfactors (ItemID)";
  }
  if (tableName == "local_com_paymentoption") {
    return "CREATE INDEX idx_com_paymentoption ON local_com_paymentoption (PaymentOptionID)";
  }
  if (tableName == "local_ct_storecomments") {
    return "CREATE INDEX idx_ct_storecomments ON local_ct_storecomments (ItemID)";
  }
  if (tableName == "local_ct_customercontacts") {
    return "CREATE INDEX idx_ct_customercontacts ON local_ct_customercontacts (ItemID)";
  }
  if(tableName == 'local_info'){
    return 'CREATE INDEX idx_info ON local_info (id)';
  }

}

export default createTable;
