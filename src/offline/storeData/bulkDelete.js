import openDatabaseService from '../Config';
import { RawQuery } from '../Services/DataHelper';


export default async function deleteLocalRows(tableName,data) {

  const db = openDatabaseService();

  if (data.length == 0) { return 'No orders to delete'; }

  let rowIds = getRowIds(data);


  const deleteQuery = await getDeleteQuery(tableName, rowIds);
  const deleteRows = await runDelete(deleteQuery);

  return 'delete local'
}




async function getDeleteQuery(tableName, rowIds) {

  const db = openDatabaseService();

  let ids = ``;

  rowIds.map(rowId => { ids += `'${rowId}',`; });

  ids = ids.replace(/,$/, '');

  let query = ``;

  if (tableName == 'local_com_order') { query = `DELETE FROM ${tableName} WHERE WebOrderID IN (${ids})`; }
  if (tableName == 'local_com_orderitem') { query = `DELETE FROM ${tableName} WHERE OrderItemOrderID IN (${ids})`; }
  if (tableName == 'local_com_orderaddress') { query = `DELETE FROM ${tableName} WHERE AddressOrderID IN (${ids})`; }

  return query;

}


async function runDelete(deleteQuery) {

  const db = openDatabaseService();

  console.log(deleteQuery);
  let res = await RawQuery(deleteQuery);
  console.log(res);

}


function getRowIds(data) {

  const ids = data.map(element => element.orderID);

  return ids;
}





