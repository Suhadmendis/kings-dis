import openDatabaseService from "../Config";
import createTableSchema from "./createTableSchema";
import createDataSchema from "./createDataSchema";
import InitialSyncBulk from "../../components/LoginOperation/InitialSyncBulk";

async function insertData(tableName, data, isInitial) {
  const db = openDatabaseService();

  return new Promise((resolve, reject) => {
    if (isInitial) {
      if (tableName != 'local_com_order' &&tableName != 'local_com_orderitem' &&tableName != 'local_com_orderaddress') {
        db.transaction((tx) => {
          tx.executeSql(`DELETE FROM ${tableName}`, [], (tx, results) => {
            console.log("Deleted", results.rowsAffected);
          });
        });
      }else{
        console.log(tableName, data.length);
      }

    }

    const tableSchema = createTableSchema(tableName);

    if (tableSchema == "") {
      resolve(`Table Schema Not Found in Code: ${tableName}`);
    } else {
      // resolve(`Table Schema Not Found in Code: ${tableName}`);

      // for (let index = 0; index < data.length; index++) {

      // un common tables
      if (tableName == "local_com_orderitem") {
        if (isInitial) {
          let orderItems = [];
          let fullBulk = [];
          console.log('Found local order----------------------------------------------------------------');

          for (let index1 = 0; index1 < data.length; index1++) {
            for (let index2 = 0; index2 < data[index1].orderItems.length; index2++) {

              fullBulk.push(data[index1].orderItems[index2])
            }
          }

          const res =  InitialSyncBulk(tableName, fullBulk);
          console.log(`Bulk Insertion: ${tableName}`);


          // try {
          //   data.map(element => {
          //     element.orderItems.map(item => {
          //       console.log(item);
          //       orderItems.push(item);
          //     });
          //   });
          // } catch (error) {
          //   console.error('An error occurred:', error);
          // }





        }else{
          for (let index1 = 0; index1 < data.length; index1++) {
            for (let index = 0; index < data[index1].orderItems.length; index++) {
              const dataSchema = createDataSchema(
                tableName,
                data[index1].orderItems[index],
                isInitial
              );
              if (dataSchema.length == 0) {
                resolve(`Table Schema Not Found in Code: ${tableName}`);
              } else {
                if (isInitial) {


                  db.transaction((tx) => {
                    tx.executeSql(tableSchema, dataSchema, function (tx, res) {
                      console.log(res);
                    });
                  });
                } else {
                  let updateOrInsert = "INSERT";

                  const primaryFeildName = getPrimaryFeildName(tableName);

                  db.transaction((tx) => {
                    let primaryFeildNameTemp = "WebOrderItemID";

                    tx.executeSql(
                      `SELECT * FROM ${tableName} where ${primaryFeildNameTemp} = ${data[index1].orderItems[index][primaryFeildName]}`,
                      [],
                      function (tx, res) {
                        if (res.rows.length == 1) {
                          updateOrInsert = "UPDATE";
                        }
                        if (res.rows.length == 0) {
                          updateOrInsert = "INSERT";
                        }
                      }
                    );
                  });

                  db.transaction((tx) => {
                    if (updateOrInsert == "UPDATE") {
                      dataSchema.shift();
                      let updateDataSchema = dataSchema;

                      const updateFeildNames = getUpdateFeildNames(tableName);
                      tx.executeSql(
                        `UPDATE ${tableName} SET ${updateFeildNames}`,
                        updateDataSchema,
                        function (tx, res) {
                          console.log(`Updated - ${res.rowsAffected}`);
                        }
                      );
                    }

                      if (updateOrInsert == "INSERT") {
                        tx.executeSql(
                          tableSchema,
                          dataSchema,
                          function (tx, res) {}
                        );
                      }

                  });
                }
              }
            }
          }
        }
      } else if (tableName == "local_com_orderaddress") {
        for (let index1 = 0; index1 < data.length; index1++) {
          if (data[index1].orderBillingAddress) {
            const dataSchema = createDataSchema(
              tableName,
              data[index1].orderBillingAddress,
              isInitial
            );

            if (dataSchema.length == 0) {
              resolve(`Table Schema Not Found in Code: ${tableName}`);
            } else {
              if (isInitial) {
                db.transaction((tx) => {
                  tx.executeSql(tableSchema, dataSchema, function (tx, res) {});
                });
              } else {
                let updateOrInsert = "INSERT";

                const primaryFeildName = getPrimaryFeildName(tableName);

                db.transaction((tx) => {
                  let primaryFeildNameTemp = "WebOrderAddressID";

                  tx.executeSql(
                    `SELECT * FROM ${tableName} where ${primaryFeildNameTemp} = ${data[index1].orderBillingAddress[primaryFeildName]}`,
                    [],
                    function (tx, res) {
                      if (res.rows.length == 1) {
                        updateOrInsert = "UPDATE";
                      }
                      if (res.rows.length == 0) {
                        updateOrInsert = "INSERT";
                      }
                    }
                  );
                });

                db.transaction((tx) => {
                  if (updateOrInsert == "UPDATE") {
                    dataSchema.shift();
                    let updateDataSchema = dataSchema;

                    const updateFeildNames = getUpdateFeildNames(tableName);
                    tx.executeSql(
                      `UPDATE ${tableName} SET ${updateFeildNames}`,
                      updateDataSchema,
                      function (tx, res) {
                        console.log(`Updated - ${res.rowsAffected}`);
                      }
                    );
                  }
                  if (updateOrInsert == "INSERT") {
                    tx.executeSql(
                      tableSchema,
                      dataSchema,
                      function (tx, res) {}
                    );
                  }
                });
              }
            }
          }

          if (data[index1].orderShippingAddress) {
            const dataSchema = createDataSchema(
              tableName,
              data[index1].orderShippingAddress,
              isInitial
            );

            if (dataSchema.length == 0) {
              resolve(`Table Schema Not Found in Code: ${tableName}`);
            } else {
              if (isInitial) {
                db.transaction((tx) => {
                  tx.executeSql(tableSchema, dataSchema, function (tx, res) {});
                });
              } else {
                let updateOrInsert = "INSERT";

                const primaryFeildName = getPrimaryFeildName(tableName);

                db.transaction((tx) => {
                  let primaryFeildNameTemp = "WebOrderAddressID";

                  tx.executeSql(
                    `SELECT * FROM ${tableName} where ${primaryFeildNameTemp} = ${data[index1].orderShippingAddress[primaryFeildName]}`,
                    [],
                    function (tx, res) {
                      if (res.rows.length == 1) {
                        updateOrInsert = "UPDATE";
                      }
                      if (res.rows.length == 0) {
                        updateOrInsert = "INSERT";
                      }
                    }
                  );
                });

                db.transaction((tx) => {
                  if (updateOrInsert == "UPDATE") {
                    dataSchema.shift();
                    let updateDataSchema = dataSchema;

                    const updateFeildNames = getUpdateFeildNames(tableName);
                    tx.executeSql(
                      `UPDATE ${tableName} SET ${updateFeildNames}`,
                      updateDataSchema,
                      function (tx, res) {
                        console.log(`Updated - ${res.rowsAffected}`);
                      }
                    );
                  }
                  if (updateOrInsert == "INSERT") {
                    tx.executeSql(
                      tableSchema,
                      dataSchema,
                      function (tx, res) {}
                    );
                  }
                });
              }
            }
          }
        }
      } else if (tableName == "local_com_shoppingcartsku") {
        for (let index1 = 0; index1 < data.length; index1++) {
          let updateOrInsert = "INSERT";

          const primaryFeildName = getPrimaryFeildName(tableName);

          db.transaction((tx) => {
            let primaryFeildNameTemp = "ShoppingCartID";

            tx.executeSql(
              `DELETE FROM ${tableName} where ${primaryFeildNameTemp} = ${data[index1].shoppingCartID}`,
              [],
              function (tx, res) {
                for (
                  let index2 = 0;
                  index2 < data[index1].shoppingCartItems.length;
                  index2++
                ) {
                  const dataSchema = createDataSchema(
                    tableName,
                    data[index1].shoppingCartItems[index2],
                    isInitial
                  );

                  if (dataSchema.length == 0) {
                    resolve(`Table Schema Not Found in Code: ${tableName}`);
                  } else {
                    db.transaction((tx) => {
                      tx.executeSql(
                        tableSchema,
                        dataSchema,
                        function (tx, res) {},
                        function (error) {
                          console.log("Failed to insert:", error);
                        }
                      );
                    });
                  }
                }
              }
            );
          });
        }
      } else {
        // normal tables






        if (isInitial) {

console.log('InitialSyncBulk');
          if (data.length > 0) {
            InitialSyncBulk(tableName, data);
          }


          resolve(`Bulk Insertion: ${tableName}`);

        }else{
          for (let index = 0; index < data.length; index++) {
            const dataSchema = createDataSchema(
              tableName,
              data[index],
              isInitial
            );

            if (dataSchema.length == 0) {
              resolve(`Table Schema Not Found in Code: ${tableName}`);
            } else {
              let updateOrInsert = "INSERT";

                const primaryFeildName = getPrimaryFeildName(tableName);

                db.transaction((tx) => {
                  let primaryFeildNameTemp = primaryFeildName;
                  if (tableName == "local_com_order")
                    primaryFeildNameTemp = "WebOrderID";
                  if (tableName == "local_ct_customercontacts")
                    primaryFeildNameTemp = "WebContactId";
                  console.log(
                    `SELECT * FROM ${tableName} where ${primaryFeildNameTemp} = ${data[index][primaryFeildName]}`
                  );
                  tx.executeSql(
                    `SELECT * FROM ${tableName} where ${primaryFeildNameTemp} = ${data[index][primaryFeildName]}`,
                    [],
                    function (tx, res) {
                      if (res.rows.length == 1) {
                        updateOrInsert = "UPDATE";
                      }
                      if (res.rows.length == 0) {
                        updateOrInsert = "INSERT";
                      }

                      console.log(updateOrInsert);
                    }
                  );
                });

                db.transaction((tx) => {
                  if (updateOrInsert == "UPDATE") {
                    let updateDataSchema;
                    if (tableName == "local_com_order") {
                      dataSchema.shift();
                      updateDataSchema = dataSchema;
                    } else {
                      let firstElement = dataSchema[0];
                      dataSchema.shift();

                      updateDataSchema = dataSchema;
                      updateDataSchema.push(firstElement);
                    }
                    const updateFeildNames = getUpdateFeildNames(tableName);

                    console.log(`UPDATE ${tableName} SET ${updateFeildNames}`);
                    console.log(updateDataSchema);
                    tx.executeSql(
                      `UPDATE ${tableName} SET ${updateFeildNames}`,
                      updateDataSchema,
                      function (tx, res) {
                        console.log(`Updated - ${res.rowsAffected}`);
                      },
                      function (error, er) {
                        console.log(error);
                        console.log(er);
                      }
                    );
                  }

                  if (updateOrInsert == "INSERT") {
                    tx.executeSql(
                      tableSchema,
                      dataSchema,
                      function (tx, res) {},
                      function (error, er) {
                        console.log(tableSchema);
                        console.log(dataSchema);
                        console.log(error);
                        console.log(er);
                      }
                    );
                  }
                });
            }
          }
        }
      }

      db.transaction((tx) => {
        tx.executeSql(`select * from ${tableName}`, [], (_, { rows }) => {
          const datadata = rows;

          resolve(`${datadata.length} in ${tableName}`);
        });
      });
    }
  });
}

function getUpdateFeildNames(tableName) {
  if (tableName == "local_cms_country") {
    return "CountryDisplayName = ?, CountryName = ?, CountryGUID = ?, CountryLastModified = ?, CountryTwoLetterCode = ?, CountryThreeLetterCode = ?, CountryStateRequired = ?, CountryGroupCode = ?, CountryGroupID = ? where CountryID = ?";
  }
  if (tableName == "local_cms_state") {
    return "StateDisplayName = ?,StateName = ?,StateCode = ?,CountryID = ?,StateGUID = ?,StateLastModified = ? where StateID = ?";
  }
  if (tableName == "local_cms_role") {
    return "RoleDisplayName = ?,RoleName = ?,RoleDescription = ?,SiteID = ?,RoleGUID = ?,RoleLastModified = ?,RoleGroupID = ?,RoleIsGroupAdministrator = ?, RoleIsDomain = ? where RoleID = ?";
  }
  if (tableName == "local_cms_user") {
    return "UserName = ?,FirstName = ?,MiddleName = ?,LastName = ?,FullName = ?,Email = ?,UserPassword = ?,PreferredCultureCode = ?,PreferredUICultureCode = ?,UserEnabled = ?,UserIsExternal = ?,UserPasswordFormat = ?,UserCreated = ?,LastLogon = ?,UserStartingAliasPath = ?,UserGUID = ?,UserLastModified = ?,UserLastLogonInfo = ?,UserIsHidden = ?,UserVisibility = ?,UserIsDomain = ?,UserHasAllowedCultures = ?,UserMFRequired = ?,UserPrivilegeLevel = ?,UserSecurityStamp = ?,UserMFSecret = ?,UserMFTimestep = ?,UserBuyerCode = ?,UserDataSetID = ?,UserAccCode = ?,UserUploadKey = ?,UserPasswordChangedOnWeb = ?,UserTitle = ?,AgreedPromotions = ?,WishToDeleteAccount = ?,UserAPISecret = ?, UserAPIEnabled = ? where UserID = ?";
  }
  // if (tableName == 'local_cms_userrole') { return 'CMS_UserRole'; }
  if (tableName == "local_com_customer") {
    return "CustomerFirstName = ?, CustomerLastName = ?, CustomerEmail = ?, CustomerPhone = ?, CustomerFax = ?, CustomerCompany = ?, CustomerUserID = ?, CustomerGUID = ?, CustomerTaxRegistrationID = ?, CustomerOrganizationID = ?, CustomerLastModified = ?, CustomerSiteID = ?, CustomerCreated = ?, CustomerEnabled = ?, CustomerPreferredCurrencyID = ?, CustomerPreferredShippingOptionID = ?, CustomerPreferredPaymentOptionID = ?, CustomerAccCode = ?, CustomerBuyerCode = ?, CustomerDataSetID = ?, CustomerMobile = ?, CustomerJob = ?, CustomerWeb = ?, CustomerDefaultPaymentAddressID = ?, CustomerDefaultDeliveryAddressID = ?, CustomerUploadKey = ?, Customer_SyncStatus = ?, LastUpdate = ?, CustomerContactTitle = ?, CustomerAllotmentPlotID = ?, CustomerKey1 = ?, CatYear = ?, CustomerSalesRepKey = ? where CustomerID = ?";
  }
  if (tableName == "local_com_address") {
    return "AddressName = ?, AddressLine1 = ?, AddressLine2 = ?, AddressCity = ?, AddressZip = ?, AddressPhone = ?, AddressCustomerID = ?, AddressCountryID = ?, AddressStateID = ?, AddressPersonalName = ?, AddressGUID = ?, AddressLastModified = ?, AddressLine4 = ?, AddressLine3 = ?, AddressEnabled = ?, AddressIsBilling = ?, AddressIsShipping = ?, AddressWebOnly = ?, AddressIsDefault = ?, AddressAccCode = ?, AddressCode = ?, AddressDataSetID = ?, Address_SyncStatus = ?, LastUpdate = ?, AddressContactTitle = ?, AddressFirstName = ?, AddressLastName = ?, AddressUploadKey = ?, AddressOldID = ?, DisplayOrder = ?, WebAddressID = ?, ReadyToSync = ? where AddressID = ?";
  }
  if (tableName == "local_ct_userappointments") {
    return "ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ?, Email = ?, Subject = ?, Location = ?, StartDate = ?, EndDate = ?, Note = ?, TradeAccID = ?, IsDeleted = ?, ReadyToSync = ?, ReadyToUpdate = ? where ItemID = ?";
  }
  if (tableName == "local_com_sku") {
    return "SKUNumber = ?, SKUName = ?, SKUDescription = ?, SKUPrice = ?, SKUEnabled = ?, SKUDepartmentID = ?, SKUManufacturerID = ?, SKUInternalStatusID = ?, SKUPublicStatusID = ?, SKUSupplierID = ?, SKUAvailableInDays = ?, SKUGUID = ?, SKUImagePath = ?, SKUWeight = ?, SKUWidth = ?, SKUDepth = ?, SKUHeight = ?, SKUAvailableItems = ?, SKUSellOnlyAvailable = ?, SKUCustomData = ?, SKUOptionCategoryID = ?, SKUOrder = ?, SKULastModified = ?, SKUCreated = ?, SKUSiteID = ?, SKUNeedsShipping = ?, SKUValidUntil = ?, SKUProductType = ?, SKUMaxItemsInOrder = ?, SKUValidity = ?, SKUValidFor = ?, SKUMembershipGUID = ?, SKUConversionName = ?, SKUConversionValue = ?, SKUBundleInventoryType = ?, SKUMinItemsInOrder = ?, SKURetailPrice = ?, SKUParentSKUID = ?, SKUShortDescription = ?, SKUEproductFilesCount = ?, SKUBundleItemsCount = ?, SKUInStoreFrom = ?, SKUReorderAt = ?, SKUTrackInventory = ?, SKUTaxClassID = ?, SKUBrandID = ?, SKUCollectionID = ?, SKUClassCode = ?, SKUClassTable = ?, SKUDataSetID = ?, SKUImageLocation = ?, SKUCatNumber = ?, SKUPackSize = ?, SKUFeatures = ?, SKUDelMonth = ?, SKUBarCode = ?, SKUPrice2 = ?, SKUPrice3 = ?, SKUPrice4 = ?, SKUPrice5 = ?, SKUPrice6 = ?, SKUPrice7 = ?, SKUPrice8 = ?, SKUPrice9 = ?, SKUPrice10 = ?, SKUPrice1Label = ?, SKUPrice2Label = ?, SKUPrice3Label = ?, SKUPrice4Label = ?, SKUPrice5Label = ?, SKUPrice6Label = ?, SKUPrice7Label = ?, SKUPrice8Label = ?, SKUPrice9Label = ?, SKUPrice10Label = ?, SKUAnalysis = ?, SkuDiscountCat = ?, SKUPictorialPackSize = ?, SkuPricePreSeason = ?, SkuPreSeason = ?, SkuPreSeasonOnly = ? where SKUID  = ?";
  }
  if (tableName == "local_com_shoppingcart") {
    return "ShoppingCartGUID = ?, ShoppingCartUserID = ?, ShoppingCartSiteID = ?, ShoppingCartLastUpdate = ?, ShoppingCartCurrencyID = ?, ShoppingCartPaymentOptionID = ?, ShoppingCartShippingOptionID = ?, ShoppingCartBillingAddressID = ?, ShoppingCartShippingAddressID = ?, ShoppingCartCustomerID = ?, ShoppingCartNote = ?, ShoppingCartCompanyAddressID = ?, ShoppingCartCustomData = ?, ShoppingCartContactID = ?, AppShoppingCartPreSeason = ?, AppShoppingCartName = ?, AppShoppingCartSaveFlag = ?, ShoppingCartIsPreSeason = ?,ToEmail = ?, ReadyToSync = ? where ShoppingCartID = ?";
  }

  if (tableName == "local_cms_settingskey") {
    return "keyName = ?,keyDisplayName = ?,keyDescription = ?,keyValue = ?,keyType = ?,keyCategoryID = ?,siteID = ?,keyGUID = ?,keyLastModified = ?,keyOrder = ?,keyDefaultValue = ?,keyValidation = ?,keyEditingControlPath = ?,keyIsGlobal = ?,keyIsCustom = ?,keyIsHidden = ?,keyFormControlSettings = ?,keyExplanationText = ? where keyID = ?";
  }

  // RETURN same as local_com_shoppingcart
  // if (tableName == 'local_com_shoppingcartsku') { return 'COM_ShoppingCart'; }

  if (tableName == "local_com_order") {
    return "OrderShippingOptionID = ?, OrderTotalShipping = ?, OrderTotalPrice = ?, OrderTotalTax = ?, OrderDate = ?, OrderStatusID = ?, OrderCurrencyID = ?, OrderCustomerID = ?, OrderCreatedByUserID = ?, OrderNote = ?, OrderSiteID = ?, OrderPaymentOptionID = ?, OrderInvoice = ?, OrderInvoiceNumber = ?, OrderTrackingNumber = ?, OrderCustomData = ?, OrderPaymentResult = ?, OrderGUID = ?, OrderLastModified = ?, OrderTotalPriceInMainCurrency = ?, OrderIsPaid = ?, OrderCulture = ?, OrderDiscounts = ?, OrderGrandTotal = ?, OrderGrandTotalInMainCurrency = ?, OrderOtherPayments = ?, OrderTaxSummary = ?, OrderCouponCodes = ?, OrderPONumber = ?, OrderAPayment = ?, OrderPaymentType = ?, OrderBillingAddressID = ?, OrderShippingAddressID = ?, OrderDataSetID = ?, OrderAccountsReference = ?, LastUpdate = ?, OrderPartShipment = ?, OrderComments = ?, OrderType = ?, OrderInsertedToDim = ?, OrderSageVendorTxCode = ?, OrderReceiptInseredToDim = ?, OrderAbandonedStatus = ?, OrderToEmail = ?, OrderRegNumber = ?, OrderQuoteID = ?, OrderPreseason = ? where WebOrderID = ?";
  }
  if (tableName == "local_com_orderaddress") {
    return "AddressLine1 = ?, AddressLine2 = ?, AddressCity = ?, AddressZip = ?, AddressPhone = ?, AddressCountryID = ?, AddressStateID = ?, AddressPersonalName = ?, AddressGUID = ?, AddressLastModified = ?, AddressOrderID = ?, AddressType = ?, AddressLine3 = ?, AddressLine4 = ?, CustomerAddressID = ?, LocalCustomerAddressID = ? where WebOrderAddressID = ?";
  }

  if (tableName == "local_ct_customercontacts") {
    return "ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, Name = ?, ItemGUID = ?, AddressLine1 = ?, AddressLine2 = ?, AddressLine3 = ?, City = ?, PostCode = ?, Phone = ?, Email = ?, State = ?, CountryId = ?, JobRole = ?, Notes = ?, CustomerId = ?, IsDeleted = ?, IsDefault = ?, ReadyToSync = ?, ItemID = ? where WebContactId = ?";
  }

  // RETURN same as local_com_order
  if (tableName == "local_com_orderitem") {
    return "OrderItemOrderID = ?, OrderItemSKUID = ?, OrderItemSKUName = ?, OrderItemUnitPrice = ?, OrderItemUnitCount = ?, OrderItemCustomData = ?, OrderItemGuid = ?, OrderItemParentGuid = ?, OrderItemLastModified = ?, OrderItemValidTo = ?, OrderItemBundleGUID = ?, OrderItemTotalPriceInMainCurrency = ?, OrderItemSendNotification = ?, OrderItemText = ?, OrderItemProductDiscounts = ?, OrderItemDiscountSummary = ?, OrderItemTotalPrice = ?, OrderItemUnitListPrice = ?, OrderItemUnitDiscount = ?, OrderItemDiscountRate = ?, OrderItemDataSetID = ?, OrderItemAccountsReference = ?, OrderItemOrderInvoiceNumber = ?, OrderItemQtyDelivered = ?, OrderItemQtyInvoiced = ?, OrderInvoiceNumber = ?, OrderInsertedToDim = ?, od_OHID_DSID = ?, BatchName = ?, OrderItemPriceLine = ?, orderItemNote = ?, orderItemBackCard = ? where WebOrderItemID = ?";
  }
  if (tableName == "local_com_orderstatus") {
    return "StatusName = ?, StatusDisplayName = ?, StatusOrder = ?, StatusEnabled = ?, StatusColor = ?, StatusGUID = ?, StatusLastModified = ?, StatusSendNotification = ?, StatusSiteID = ?, StatusOrderIsPaid = ? where StatusID = ?";
  }
  if (tableName == "local_ct_tradeaccount") {
    return "ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ?, ItemDataSetID = ?, ItemCode = ?, ItemName = ?, ItemAdminFirstName = ?, ItemAdminLastName = ?, ItemAddressLine1 = ?, ItemAddressLine2 = ?, ItemCity = ?, ItemCounty = ?, ItemPostcode = ?, ItemCountryId = ?, ItemAdminEmail = ?, ItemAdminPhone = ?, ItemNotes = ?, ItemOnStop = ?, ItemEnabled = ?, ItemSiteID = ?, ItemAccBalance = ?, ItemCreditLimit = ?, ItemPriceKey = ?, ItemLineDiscount = ?, ItemTotalDiscount = ?, ItemTaxable = ?, ItemTaxCode = ?, ItemCurrencyCode = ?, ItemStaffEmail = ?, ItemType = ?, ItemKey1 = ?, ItemKey2 = ?, ItemKey3 = ?, ItemDiscGroup1 = ?, ItemDiscGroup2 = ?, ItemDiscGroup3 = ?, ItemDiscGroup4 = ?, ItemAccAreaCode = ?, IsSynced = ? where ItemID = ?";
  }
  if (tableName == "local_ct_tradeaccountcustomer") {
    return "ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ?, TradeAccId = ?, TradeAccName = ?, CustomerId = ?, CustomerName = ?, ItemIsAdmin = ? where ItemID = ?";
  }
  if (tableName == "local_ct_deliverymatrix") {
    return "ItemCountryGroupID = ?, ItemPostcodeZoneID = ?, ItemDeliveryFactors = ?, ItemShippingOptionID = ?, ItemPrice = ?, ItemRestrictedToPaymentOption = ?, ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ?, ItemSiteID = ?, ItemSiteRoleID = ?, ItemDiscountedPrice = ?, ItemPriceLabel = ? where ItemID = ?";
  }
  if (tableName == "local_ct_countrygroup") {
    return "ItemName = ?, ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ? where ItemID = ?";
  }
  if (tableName == "local_ct_postcodes") {
    return "ItemPostcode = ?, ItemX = ?, ItemY = ?, ItemLatitude = ?, ItemLongitude = ?, ItemTown = ?, ItemCounty = ?, ItemCountyID = ?, ItemZone = ?, ItemZoneID = ?, ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ? where ItemID = ?";
  }
  if (tableName == "local_ct_postcodezone") {
    return "ItemName = ?, ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ? where ItemID = ?";
  }
  if (tableName == "local_com_shippingoption") {
    return "ShippingOptionID = ?, ShippingOptionName = ?, ShippingOptionDisplayName = ?, ShippingOptionEnabled = ?, ShippingOptionSiteID = ?, ShippingOptionGUID = ?, ShippingOptionLastModified = ?, ShippingOptionThumbnailGUID = ?, ShippingOptionDescription = ?, ShippingOptionCarrierID = ?, ShippingOptionCarrierServiceName = ?, ShippingOptionTaxClassID = ?, ShippingOptionCountryIDs = ? where ShippingOptionID = ?";
  }
  if (tableName == "local_int_salestax") {
    return "stax_Code = ?, stax_Name = ?, stax_Region = ?, stax_RegionType = ?, stax_Rate = ?, stax_IsFlatValue = ?, stax_DataSetID = ?, UploadKey = ?, LastUpdate = ?, Status = ?, ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ? where ItemID = ?";
  }
  if (tableName == "local_int_analysis") {
    return "Ana_DataSetID = ?, Ana_Code = ?, Ana_Name = ?, Ana_VatCode = ?, UploadKey = ?, LastUpdate = ?, Status = ?, ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ? where ItemID = ?";
  }
  if (tableName == "local_ct_quotes") {
    return "ItemCustomerID = ?, ItemShoppingCartID = ?, ItemSiteID = ?, ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ?, ItemQuoteLabel = ?, ItemQuoteTotal = ?, ItemQuoteDelivery = ? WHERE ItemID = ?";
  } // done
  if (tableName == "local_ct_quotestatus") {
    return "ItemDisplayName = ?, ItemName = ?, ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ? where ItemID = ? ";
  }
  if (tableName == "local_ct_quotestatususer") {
    return "ItemQuoteID = ?, ItemQuoteStatusID = ?, ItemSiteID = ?, ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ? where ItemID = ?";
  }

  if (tableName == "local_cms_culture") {
    return "CultureName = ?, CultureCode = ?, CultureShortName = ?, CultureGUID = ?, CultureLastModified = ?, CultureAlias = ?, CultureIsUICulture = ? where CultureID = ?";
  }
  if (tableName == "local_cms_resource") {
    return "ResourceDisplayName = ?, ResourceName = ?, ResourceDescription = ?, ShowInDevelopment = ?, ResourceURL = ?, ResourceGUID = ?, ResourceLastModified = ?, ResourceIsInDevelopment = ?, ResourceHasFiles = ?, ResourceVersion = ?, ResourceAuthor = ?, ResourceInstallationState = ?, ResourceInstalledVersion = ? where ResourceID = ?";
  }
  if (tableName == "local_cms_resourcestring") {
    return "StringKey = ?, StringIsCustom = ?, StringGUID = ? where StringID = ?";
  }
  if (tableName == "local_cms_resourcetranslation") {
    return "TranslationStringID = ?, TranslationText = ?, TranslationCultureID = ? where TranslationID = ?";
  }
  if (tableName == "local_int_navigation") {
    return "ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ?, Nav_DatasetID = ?, Nav_ShopID = ?, Nav_NodeID = ?, Nav_RangeNodeID = ?, Nav_SKUNodeID = ?, Nav_SKUID = ?, Nav_StockCode = ?, Nav_Navigation = ?, Nav_ItemAttribute1 = ?, Nav_ItemAttribute2 = ?, Nav_ItemAttribute3 = ?, Nav_ItemAttribute4 = ?, Nav_ItemAttribute5 = ?, Nav_ItemAttribute6 = ?, Nav_ItemAttribute7 = ?, Nav_ItemAttribute8 = ?, Nav_ItemAttribute9 = ?, Nav_ItemAttribute10 = ?, Nav_ItemAttribute11 = ?, Nav_ItemAttribute12 = ?, Nav_ItemAttribute13 = ?, Nav_ItemAttribute14 = ?, Nav_ItemAttribute15 = ?, Nav_RangeDataHeadings = ?, Nav_ItemData1 = ?, Nav_ItemData2 = ?, Nav_ItemData3 = ?, Nav_ItemData4 = ?, Nav_ItemData5 = ?, Nav_ItemData6 = ?, Nav_ItemData7 = ?, Nav_ItemData8 = ?, Nav_ItemData9 = ?, Nav_ItemData10 = ?, Nav_Order = ?, Nav_Range = ?, Nav_RangeDescription = ?, Nav_Suspend = ?, UploadKey = ?, LastUpdate = ?, Status = ?, Nav_RangeCode = ?, Nav_GroupCode = ?, Nav_SubGroupCode = ? where ItemID = ?";
  }
  if (tableName == "local_int_nav_attributes") {
    return "Nav_DatasetID = ?, Nav_ShopID = ?, Nav_Path = ?, Nav_Lvl1 = ?, Nav_ColumnLvl2 = ?, Nav_PositionLvl2 = ?, Nav_ClickableLvl2 = ?, Nav_ColumnLvl3 = ?, Nav_PositionLvl3 = ?, Nav_ClickableLvl3 = ?, Nav_itemattributelabel1 = ?, Nav_itemattributefilter1 = ?, Nav_itemattributelabel2 = ?, Nav_itemattributefilter2 = ?, Nav_itemattributelabel3 = ?, Nav_itemattributefilter3 = ?, Nav_itemattributelabel4 = ?, Nav_itemattributefilter4 = ?, Nav_itemattributelabel5 = ?, Nav_itemattributefilter5 = ?, Nav_itemattributelabel6 = ?, Nav_itemattributefilter6 = ?, Nav_itemattributelabel7 = ?, Nav_itemattributefilter7 = ?, Nav_itemattributelabel8 = ?, Nav_itemattributefilter8 = ?, Nav_itemattributelabel9 = ?, Nav_itemattributefilter9 = ?, Nav_itemattributelabel10 = ?, Nav_itemattributefilter10 = ?, Nav_itemattributelabel11 = ?, Nav_itemattributefilter11 = ?, Nav_itemattributelabel12 = ?, Nav_itemattributefilter12 = ?, Nav_itemattributelabel13 = ?, Nav_itemattributefilter13 = ?, Nav_itemattributelabel14 = ?, Nav_itemattributefilter14 = ?, Nav_itemattributelabel15 = ?, Nav_itemattributefilter15 = ?, Nav_Suspend = ?, UploadKey = ?, LastUpdate = ?, Status = ?, ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ? where ItemID = ?";
  }

  if (tableName == "local_ct_deliveryfactors") {
    return "ItemName = ?, ItemFactor = ?, ItemFreeDeliveryValue = ?, ItemSiteID = ?, ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ? where ItemID = ?";
  }
  if (tableName == "local_com_paymentoption") {
    return "PaymentOptionName = ?, PaymentOptionDisplayName = ?, PaymentOptionEnabled = ?, PaymentOptionSiteID = ?, PaymentOptionPaymentGateUrl = ?, PaymentOptionAssemblyName = ?, PaymentOptionClassName = ?, PaymentOptionSucceededOrderStatusID = ?, PaymentOptionFailedOrderStatusID = ?, PaymentOptionGUID = ?, PaymentOptionLastModified = ?, PaymentOptionAllowIfNoShipping = ?, PaymentOptionThumbnailGUID = ?, PaymentOptionDescription = ?, PaymentOptionAuthorizedOrderStatusID = ? where PaymentOptionID = ?";
  }

  if (tableName == "local_ct_storecomments") {
    return "ItemCreatedBy = ?, ItemCreatedWhen = ?, ItemModifiedBy = ?, ItemModifiedWhen = ?, ItemOrder = ?, ItemGUID = ?, ItemTitle = ?, ItemComment = ?, TradeAccID = ?, ReadyToSync = ?, IsDeleted = ? where ItemID = ?";
  }
}

function getPrimaryFeildName(tableName) {
  if (tableName == "local_cms_country") {
    return "countryID";
  }
  if (tableName == "local_cms_state") {
    return "stateID";
  }
  if (tableName == "local_cms_role") {
    return "roleID";
  }
  if (tableName == "local_cms_user") {
    return "userID";
  }
  // if (tableName == 'local_cms_userrole') { return 'CMS_UserRole'; }
  if (tableName == "local_com_customer") {
    return "customerID";
  }
  if (tableName == "local_com_address") {
    return "addressID";
  }
  if (tableName == "local_ct_userappointments") {
    return "itemID";
  }
  if (tableName == "local_com_sku") {
    return "skuid";
  }
  if (tableName == "local_com_shoppingcart") {
    return "shoppingCartID";
  }

  if (tableName == "local_cms_settingskey") {
    return "keyID";
  }

  // RETURN same as local_com_shoppingcart
  if (tableName == "local_com_shoppingcartsku") {
    return "cartItemID";
  }

  if (tableName == "local_com_order") {
    return "orderID";
  }
  if (tableName == "local_com_orderaddress") {
    return "addressID";
  }

  // RETURN same as local_com_order
  if (tableName == "local_com_orderitem") {
    return "orderItemID";
  }
  if (tableName == "local_com_orderstatus") {
    return "statusID";
  }
  if (tableName == "local_ct_tradeaccount") {
    return "itemID";
  }
  if (tableName == "local_ct_tradeaccountcustomer") {
    return "itemID";
  }
  if (tableName == "local_ct_deliverymatrix") {
    return "itemID";
  }
  if (tableName == "local_ct_countrygroup") {
    return "itemID";
  }
  if (tableName == "local_ct_postcodes") {
    return "itemID";
  }
  if (tableName == "local_ct_postcodezone") {
    return "itemID";
  }
  if (tableName == "local_com_shippingoption") {
    return "shippingOptionID";
  }
  if (tableName == "local_int_salestax") {
    return "itemID";
  }
  if (tableName == "local_int_analysis") {
    return "itemID";
  }
  if (tableName == "local_ct_quotes") {
    return "itemID";
  }
  if (tableName == "local_ct_quotestatus") {
    return "itemID";
  }
  if (tableName == "local_ct_quotestatususer") {
    return "itemID";
  }

  if (tableName == "local_ct_customercontacts") {
    return "itemID";
  }

  if (tableName == "local_cms_culture") {
    return "cultureID";
  }
  if (tableName == "local_cms_resource") {
    return "resourceID";
  }
  if (tableName == "local_cms_resourcestring") {
    return "stringID";
  }
  if (tableName == "local_cms_resourcetranslation") {
    return "translationID";
  }
  if (tableName == "local_int_navigation") {
    return "itemID";
  }
  if (tableName == "local_int_nav_attributes") {
    return "itemID";
  }
  if (tableName == "local_ct_deliveryfactors") {
    return "itemID";
  }
  if (tableName == "local_com_paymentoption") {
    return "paymentOptionID";
  }
  if (tableName == "local_ct_storecomments") {
    return "itemID";
  }
}

export default insertData;
