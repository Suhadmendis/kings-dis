function createTableSchema(table) {


    let schema = "";

    if (table == 'local_com_sku') {

      schema = `insert into ${table}
      (
        SKUID,
        SKUNumber,
        SKUName,
        SKUDescription,
        SKUPrice,
        SKUEnabled,
        SKUDepartmentID,
        SKUManufacturerID,
        SKUInternalStatusID,
        SKUPublicStatusID,
        SKUSupplierID,
        SKUAvailableInDays,
        SKUGUID,
        SKUImagePath,
        SKUWeight,
        SKUWidth,
        SKUDepth,
        SKUHeight,
        SKUAvailableItems,
        SKUSellOnlyAvailable,
        SKUCustomData,
        SKUOptionCategoryID,
        SKUOrder,
        SKULastModified,
        SKUCreated,
        SKUSiteID,
        SKUNeedsShipping,
        SKUValidUntil,
        SKUProductType,
        SKUMaxItemsInOrder,
        SKUValidity,
        SKUValidFor,
        SKUMembershipGUID,
        SKUConversionName,
        SKUConversionValue,
        SKUBundleInventoryType,
        SKUMinItemsInOrder,
        SKURetailPrice,
        SKUParentSKUID,
        SKUShortDescription,
        SKUEproductFilesCount,
        SKUBundleItemsCount,
        SKUInStoreFrom,
        SKUReorderAt,
        SKUTrackInventory,
        SKUTaxClassID,
        SKUBrandID,
        SKUCollectionID,
        SKUClassCode,
        SKUClassTable,
        SKUDataSetID,
        SKUImageLocation,
        SKUCatNumber,
        SKUPackSize,
        SKUFeatures,
        SKUDelMonth,
        SKUBarCode,
        SKUPrice2,
        SKUPrice3,
        SKUPrice4,
        SKUPrice5,
        SKUPrice6,
        SKUPrice7,
        SKUPrice8,
        SKUPrice9,
        SKUPrice10,
        SKUPrice1Label,
        SKUPrice2Label,
        SKUPrice3Label,
        SKUPrice4Label,
        SKUPrice5Label,
        SKUPrice6Label,
        SKUPrice7Label,
        SKUPrice8Label,
        SKUPrice9Label,
        SKUPrice10Label,
        SKUAnalysis,
        SkuDiscountCat,
        SKUPictorialPackSize,
        SkuPricePreSeason,
        SkuPreSeason,
        SkuPreSeasonOnly
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_cms_country') {

      schema = `insert into ${table}
      (
        CountryID,
        CountryDisplayName,
        CountryName,
        CountryGUID,
        CountryLastModified,
        CountryTwoLetterCode,
        CountryThreeLetterCode,
        CountryStateRequired,
        CountryGroupCode,
        CountryGroupID
      ) values (?,?,?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_cms_state') {

      schema = `insert into ${table}
      (
        StateID,
        StateDisplayName,
        StateName,
        StateCode,
        CountryID,
        StateGUID,
        StateLastModified
      ) values (?,?,?,?,?,?,?)`;
    }

    if (table == 'local_cms_role') {

      schema = `insert into ${table}
      (
        RoleID,
        RoleDisplayName,
        RoleName,
        RoleDescription,
        SiteID,
        RoleGUID,
        RoleLastModified,
        RoleGroupID,
        RoleIsGroupAdministrator,
        RoleIsDomain
      ) values (?,?,?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_cms_user') {

      schema = `insert into ${table}
      (
        UserID,
        UserName,
        FirstName,
        MiddleName,
        LastName,
        FullName,
        Email,
        UserPassword,
        PreferredCultureCode,
        PreferredUICultureCode,
        UserEnabled,
        UserIsExternal,
        UserPasswordFormat,
        UserCreated,
        LastLogon,
        UserStartingAliasPath,
        UserGUID,
        UserLastModified,
        UserLastLogonInfo,
        UserIsHidden,
        UserVisibility,
        UserIsDomain,
        UserHasAllowedCultures,
        UserMFRequired,
        UserPrivilegeLevel,
        UserSecurityStamp,
        UserMFSecret,
        UserMFTimestep,
        UserBuyerCode,
        UserDataSetID,
        UserAccCode,
        UserUploadKey,
        UserPasswordChangedOnWeb,
        UserTitle,
        AgreedPromotions,
        WishToDeleteAccount,
        UserAPISecret,
        UserAPIEnabled
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_cms_userrole') {

      schema = `insert into ${table}
      (
        UserID,
        RoleID,
        ValidTo,
        UserRoleID
      ) values (?,?,?,?)`;
    }

    if (table == 'local_com_customer') {

      schema = `insert into ${table}
      (
        CustomerID,
        CustomerFirstName,
        CustomerLastName,
        CustomerEmail,
        CustomerPhone,
        CustomerFax,
        CustomerCompany,
        CustomerUserID,
        CustomerGUID,
        CustomerTaxRegistrationID,
        CustomerOrganizationID,
        CustomerLastModified,
        CustomerSiteID,
        CustomerCreated,
        CustomerEnabled,
        CustomerPreferredCurrencyID,
        CustomerPreferredShippingOptionID,
        CustomerPreferredPaymentOptionID,
        CustomerAccCode,
        CustomerBuyerCode,
        CustomerDataSetID,
        CustomerMobile,
        CustomerJob,
        CustomerWeb,
        CustomerDefaultPaymentAddressID,
        CustomerDefaultDeliveryAddressID,
        CustomerUploadKey,
        Customer_SyncStatus,
        LastUpdate,
        CustomerContactTitle,
        CustomerAllotmentPlotID,
        CustomerKey1,
        CatYear,
        CustomerSalesRepKey
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_com_address') {

      schema = `insert into ${table}
      (
        AddressID,
        AddressName,
        AddressLine1,
        AddressLine2,
        AddressCity,
        AddressZip,
        AddressPhone,
        AddressCustomerID,
        AddressCountryID,
        AddressStateID,
        AddressPersonalName,
        AddressGUID,
        AddressLastModified,
        AddressLine4,
        AddressLine3,
        AddressEnabled,
        AddressIsBilling,
        AddressIsShipping,
        AddressWebOnly,
        AddressIsDefault,
        AddressAccCode,
        AddressCode,
        AddressDataSetID,
        Address_SyncStatus,
        LastUpdate,
        AddressContactTitle,
        AddressFirstName,
        AddressLastName,
        AddressUploadKey,
        AddressOldID,
        DisplayOrder,
        WebAddressID,
        ReadyToSync
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_ct_userappointments') {

      schema = `insert into ${table}
      (
        itemID,
        itemCreatedBy,
        itemCreatedWhen,
        itemModifiedBy,
        itemModifiedWhen,
        itemOrder,
        itemGUID,
        email,
        subject,
        location,
        startDate,
        endDate,
        note,
        tradeAccID,
        isDeleted,
        ReadyToSync,
        ReadyToUpdate
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    }


    if (table == 'local_com_shoppingcart') {

      schema = `insert into ${table}
      (
        ShoppingCartID,
        ShoppingCartGUID,
        ShoppingCartUserID,
        ShoppingCartSiteID,
        ShoppingCartLastUpdate,
        ShoppingCartCurrencyID,
        ShoppingCartPaymentOptionID,
        ShoppingCartShippingOptionID,
        ShoppingCartBillingAddressID,
        ShoppingCartShippingAddressID,
        ShoppingCartCustomerID,
        ShoppingCartNote,
        ShoppingCartCompanyAddressID,
        ShoppingCartCustomData,
        ShoppingCartContactID,
        AppShoppingCartPreSeason,
        AppShoppingCartName,
        AppShoppingCartSaveFlag,
        ShoppingCartIsPreSeason,
        ToEmail,
        ReadyToSync
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_com_shoppingcartsku') {

      schema = `insert into ${table}
      (
        CartItemID,
        ShoppingCartID,
        SKUID,
        SKUUnits,
        CartItemCustomData,
        CartItemGuid,
        CartItemParentGuid,
        CartItemValidTo,
        CartItemBundleGUID,
        CartItemText,
        CartItemAutoAddedUnits,
        CartItemUnitListPrice,
        CartItemUnitPrice,
        CartItemUnitDiscount,
        CartItemPrice,
        CartItemDiscountRate,
        CartItemQuoteLineDiscount,
        CartItemQuoteLineDiscountType,
        CartItemQuoteYourPrice,
        CartItemPriceLine,
        CartItemLineTax,
        CartItemNote,
        CartItemBackCard
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_com_order') {

      schema = `insert into ${table}
      (
        OrderID,
        OrderShippingOptionID,
        OrderTotalShipping,
        OrderTotalPrice,
        OrderTotalTax,
        OrderDate,
        OrderStatusID,
        OrderCurrencyID,
        OrderCustomerID,
        OrderCreatedByUserID,
        OrderNote,
        OrderSiteID,
        OrderPaymentOptionID,
        OrderInvoice,
        OrderInvoiceNumber,
        OrderTrackingNumber,
        OrderCustomData,
        OrderPaymentResult,
        OrderGUID,
        OrderLastModified,
        OrderTotalPriceInMainCurrency,
        OrderIsPaid,
        OrderCulture,
        OrderDiscounts,
        OrderGrandTotal,
        OrderGrandTotalInMainCurrency,
        OrderOtherPayments,
        OrderTaxSummary,
        OrderCouponCodes,
        OrderPONumber,
        OrderAPayment,
        OrderPaymentType,
        OrderBillingAddressID,
        OrderShippingAddressID,
        OrderDataSetID,
        OrderAccountsReference,
        LastUpdate,
        OrderPartShipment,
        OrderComments,
        OrderType,
        OrderInsertedToDim,
        OrderSageVendorTxCode,
        OrderReceiptInseredToDim,
        OrderAbandonedStatus,
        OrderToEmail,
        OrderRegNumber,
        OrderQuoteID,
        OrderPreseason,
        WebOrderID
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    }

    if (table == 'local_cms_settingskey') {

      schema = `insert into ${table}
      (
        keyID,
        keyName,
        keyDisplayName,
        keyDescription,
        keyValue,
        keyType,
        keyCategoryID,
        siteID,
        keyGUID,
        keyLastModified,
        keyOrder,
        keyDefaultValue,
        keyValidation,
        keyEditingControlPath,
        keyIsGlobal,
        keyIsCustom,
        keyIsHidden,
        keyFormControlSettings,
        keyExplanationText
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    }

    if (table == 'local_com_orderaddress') {

      schema = `insert into ${table}
      (
        AddressID,
        AddressLine1,
        AddressLine2,
        AddressCity,
        AddressZip,
        AddressPhone,
        AddressCountryID,
        AddressStateID,
        AddressPersonalName,
        AddressGUID,
        AddressLastModified,
        AddressOrderID,
        AddressType,
        AddressLine3,
        AddressLine4,
        CustomerAddressID,
        LocalCustomerAddressID,
        WebOrderAddressID
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    }

    if (table == 'local_com_orderitem') {

      schema = `insert into ${table}
      (
        OrderItemID,
        OrderItemOrderID,
        OrderItemSKUID,
        OrderItemSKUName,
        OrderItemUnitPrice,
        OrderItemUnitCount,
        OrderItemCustomData,
        OrderItemGuid,
        OrderItemParentGuid,
        OrderItemLastModified,
        OrderItemValidTo,
        OrderItemBundleGUID,
        OrderItemTotalPriceInMainCurrency,
        OrderItemSendNotification,
        OrderItemText,
        OrderItemProductDiscounts,
        OrderItemDiscountSummary,
        OrderItemTotalPrice,
        OrderItemUnitListPrice,
        OrderItemUnitDiscount,
        OrderItemDiscountRate,
        OrderItemDataSetID,
        OrderItemAccountsReference,
        OrderItemOrderInvoiceNumber,
        OrderItemQtyDelivered,
        OrderItemQtyInvoiced,
        OrderInvoiceNumber,
        OrderInsertedToDim,
        od_OHID_DSID,
        BatchName,
        OrderItemPriceLine,
        OrderItemNote,
        OrderItemBackCard,
        WebOrderItemID
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    }

    if (table == 'local_com_orderstatus') {

      schema = `insert into ${table}
      (
        StatusID,
        StatusName,
        StatusDisplayName,
        StatusOrder,
        StatusEnabled,
        StatusColor,
        StatusGUID,
        StatusLastModified,
        StatusSendNotification,
        StatusSiteID,
        StatusOrderIsPaid
      ) values (?,?,?,?,?,?,?,?,?,?,?)`;

    }

    if (table == 'local_ct_tradeaccount') {

      schema = `insert into ${table}
      (
        ItemID,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID,
        ItemDataSetID,
        ItemCode,
        ItemName,
        ItemAdminFirstName,
        ItemAdminLastName,
        ItemAddressLine1,
        ItemAddressLine2,
        ItemCity,
        ItemCounty,
        ItemPostcode,
        ItemCountryId,
        ItemAdminEmail,
        ItemAdminPhone,
        ItemNotes,
        ItemOnStop,
        ItemEnabled,
        ItemSiteID,
        ItemAccBalance,
        ItemCreditLimit,
        ItemPriceKey,
        ItemLineDiscount,
        ItemTotalDiscount,
        ItemTaxable,
        ItemTaxCode,
        ItemCurrencyCode,
        ItemStaffEmail,
        ItemType,
        ItemKey1,
        ItemKey2,
        ItemKey3,
        ItemDiscGroup1,
        ItemDiscGroup2,
        ItemDiscGroup3,
        ItemDiscGroup4,
        ItemAccAreaCode,
        IsSynced
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    }

    if (table == 'local_ct_tradeaccountcustomer') {

      schema = `insert into ${table}
      (
        ItemID,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID,
        TradeAccId,
        TradeAccName,
        CustomerId,
        CustomerName,
        ItemIsAdmin
      ) values (?,?,?,?,?,?,?,?,?,?,?,?)`;

    }

    if (table == 'local_ct_deliverymatrix') {

      schema = `insert into ${table}
      (
        ItemID,
        ItemCountryGroupID,
        ItemPostcodeZoneID,
        ItemDeliveryFactors,
        ItemShippingOptionID,
        ItemPrice,
        ItemRestrictedToPaymentOption,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID,
        ItemSiteID,
        ItemSiteRoleID,
        ItemDiscountedPrice,
        ItemPriceLabel
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    }

    if (table == 'local_ct_countrygroup') {

      schema = `insert into ${table}
      (
        ItemID,
        ItemName,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID
      ) values (?,?,?,?,?,?,?,?)`;

    }

    if (table == 'local_ct_postcodes') {

      schema = `insert into ${table}
      (
        ItemID,
        ItemPostcode,
        ItemX,
        ItemY,
        ItemLatitude,
        ItemLongitude,
        ItemTown,
        ItemCounty,
        ItemCountyID,
        ItemZone,
        ItemZoneID,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    }

    if (table == 'local_ct_postcodezone') {

      schema = `insert into ${table}
      (
        ItemID,
        ItemName,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID
      ) values (?,?,?,?,?,?,?,?)`;

    }

    if (table == 'local_com_shippingoption') {

      schema = `insert into ${table}
      (
        ShippingOptionID,
        ShippingOptionName,
        ShippingOptionDisplayName,
        ShippingOptionEnabled,
        ShippingOptionSiteID,
        ShippingOptionGUID,
        ShippingOptionLastModified,
        ShippingOptionThumbnailGUID,
        ShippingOptionDescription,
        ShippingOptionCarrierID,
        ShippingOptionCarrierServiceName,
        ShippingOptionTaxClassID,
        ShippingOptionCountryIDs
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    }

    if (table == 'local_int_salestax') {

      schema = `insert into ${table}
      (
        ItemID,
        stax_Code,
        stax_Name,
        stax_Region,
        stax_RegionType,
        stax_Rate,
        stax_IsFlatValue,
        stax_DataSetID,
        UploadKey,
        LastUpdate,
        Status,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    }

    if (table == 'local_int_analysis') {

      schema = `insert into ${table}
      (
        ItemID,
        Ana_DataSetID,
        Ana_Code,
        Ana_Name,
        Ana_VatCode,
        UploadKey,
        LastUpdate,
        Status,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    }


    if (table == 'local_ct_quotes') {

      schema = `insert into ${table}
      (
        ItemID,
        ItemCustomerID,
        ItemShoppingCartID,
        ItemSiteID,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID,
        ItemQuoteLabel,
        ItemQuoteTotal,
        ItemQuoteDelivery
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_ct_quotestatus') {

      schema = `insert into ${table}
      (
        ItemID,
        ItemDisplayName,
        ItemName,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID
      ) values (?,?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_ct_quotestatususer') {

      schema = `insert into ${table}
      (
        ItemID,
        ItemQuoteID,
        ItemQuoteStatusID,
        ItemSiteID,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID
      ) values (?,?,?,?,?,?,?,?,?,?)`;
    }


    if (table == 'local_cms_culture') {

      schema = `insert into ${table}
      (
        CultureID,
        CultureName,
        CultureCode,
        CultureShortName,
        CultureGUID,
        CultureLastModified,
        CultureAlias,
        CultureIsUICulture
      ) values (?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_cms_resource') {

      schema = `insert into ${table}
      (
        ResourceID,
        ResourceDisplayName,
        ResourceName,
        ResourceDescription,
        ShowInDevelopment,
        ResourceURL,
        ResourceGUID,
        ResourceLastModified,
        ResourceIsInDevelopment,
        ResourceHasFiles,
        ResourceVersion,
        ResourceAuthor,
        ResourceInstallationState,
        ResourceInstalledVersion
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_cms_resourcestring') {

      schema = `insert into ${table}
      (
        StringID,
        StringKey,
        StringIsCustom,
        StringGUID
      ) values (?,?,?,?)`;
    }

    if (table == 'local_cms_resourcetranslation') {

      schema = `insert into ${table}
      (
        TranslationID,
        TranslationStringID,
        TranslationText,
        TranslationCultureID
      ) values (?,?,?,?)`;
    }

    if (table == 'local_int_navigation') {

      schema = `insert into ${table}
      (
        ItemID,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID,
        Nav_DatasetID,
        Nav_ShopID,
        Nav_NodeID,
        Nav_RangeNodeID,
        Nav_SKUNodeID,
        Nav_SKUID,
        Nav_StockCode,
        Nav_Navigation,
        Nav_ItemAttribute1,
        Nav_ItemAttribute2,
        Nav_ItemAttribute3,
        Nav_ItemAttribute4,
        Nav_ItemAttribute5,
        Nav_ItemAttribute6,
        Nav_ItemAttribute7,
        Nav_ItemAttribute8,
        Nav_ItemAttribute9,
        Nav_ItemAttribute10,
        Nav_ItemAttribute11,
        Nav_ItemAttribute12,
        Nav_ItemAttribute13,
        Nav_ItemAttribute14,
        Nav_ItemAttribute15,
        Nav_RangeDataHeadings,
        Nav_ItemData1,
        Nav_ItemData2,
        Nav_ItemData3,
        Nav_ItemData4,
        Nav_ItemData5,
        Nav_ItemData6,
        Nav_ItemData7,
        Nav_ItemData8,
        Nav_ItemData9,
        Nav_ItemData10,
        Nav_Order,
        Nav_Range,
        Nav_RangeDescription,
        Nav_Suspend,
        UploadKey,
        LastUpdate,
        Status,
        Nav_RangeCode,
        Nav_GroupCode,
        Nav_SubGroupCode
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_int_nav_attributes') {

      schema = `insert into ${table}
      (
        ItemID,
        Nav_DatasetID,
        Nav_ShopID,
        Nav_Path,
        Nav_Lvl1,
        Nav_ColumnLvl2,
        Nav_PositionLvl2,
        Nav_ClickableLvl2,
        Nav_ColumnLvl3,
        Nav_PositionLvl3,
        Nav_ClickableLvl3,
        Nav_itemattributelabel1,
        Nav_itemattributefilter1,
        Nav_itemattributelabel2,
        Nav_itemattributefilter2,
        Nav_itemattributelabel3,
        Nav_itemattributefilter3,
        Nav_itemattributelabel4,
        Nav_itemattributefilter4,
        Nav_itemattributelabel5,
        Nav_itemattributefilter5,
        Nav_itemattributelabel6,
        Nav_itemattributefilter6,
        Nav_itemattributelabel7,
        Nav_itemattributefilter7,
        Nav_itemattributelabel8,
        Nav_itemattributefilter8,
        Nav_itemattributelabel9,
        Nav_itemattributefilter9,
        Nav_itemattributelabel10,
        Nav_itemattributefilter10,
        Nav_itemattributelabel11,
        Nav_itemattributefilter11,
        Nav_itemattributelabel12,
        Nav_itemattributefilter12,
        Nav_itemattributelabel13,
        Nav_itemattributefilter13,
        Nav_itemattributelabel14,
        Nav_itemattributefilter14,
        Nav_itemattributelabel15,
        Nav_itemattributefilter15,
        Nav_Suspend,
        UploadKey,
        LastUpdate,
        Status,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    }

    if (table == 'local_ct_deliveryfactors') {

      schema = `insert into ${table}
      (
        ItemID,
        ItemName,
        ItemFactor,
        ItemFreeDeliveryValue,
        ItemSiteID,
        ItemCreatedBy,
        ItemCreatedWhen,
        ItemModifiedBy,
        ItemModifiedWhen,
        ItemOrder,
        ItemGUID
      ) values (?,?,?,?,?,?,?,?,?,?,?)`;
    }

  if (table == 'local_com_paymentoption') {

    schema = `insert into ${table}
      (
        PaymentOptionID,
        PaymentOptionName,
        PaymentOptionDisplayName,
        PaymentOptionEnabled,
        PaymentOptionSiteID,
        PaymentOptionPaymentGateUrl,
        PaymentOptionAssemblyName,
        PaymentOptionClassName,
        PaymentOptionSucceededOrderStatusID,
        PaymentOptionFailedOrderStatusID,
        PaymentOptionGUID,
        PaymentOptionLastModified,
        PaymentOptionAllowIfNoShipping,
        PaymentOptionThumbnailGUID,
        PaymentOptionDescription,
        PaymentOptionAuthorizedOrderStatusID
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  }

  if (table == 'local_ct_storecomments') {

    schema = `insert into ${table}
    (
      ItemID,
      ItemCreatedBy,
      ItemCreatedWhen,
      ItemModifiedBy,
      ItemModifiedWhen,
      ItemOrder,
      ItemGUID,
      ItemTitle,
      ItemComment,
      TradeAccID,
      ReadyToSync,
      IsDeleted
    ) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
  }

  if (table == 'local_ct_customercontacts') {

    schema = `insert into ${table}
    (
      ItemID,
      ItemCreatedBy,
      ItemCreatedWhen,
      ItemModifiedBy,
      ItemModifiedWhen,
      Name,
      ItemGUID,
      AddressLine1,
      AddressLine2,
      AddressLine3,
      City,
      PostCode,
      Phone,
      Email,
      State,
      CountryId,
      JobRole,
      Notes,
      CustomerId,
      IsDeleted,
      IsDefault,
      ReadyToSync,
      WebContactId
    ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  }

   return schema;



}


export default createTableSchema;
