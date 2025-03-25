import openDatabaseService from "../../offline/Config";
import { RawQuery } from "../../offline/Services/DataHelper";

const db = openDatabaseService();


export async function setHomeScreen() {
  const isEmpty = await isTableEmpty();
  if (isEmpty) {
    await insertTuple();
  }else{
    await updateNavigationTuple(1);
  }



}


export async function getHomeScreen() {
  const isEmpty = await isTableEmpty();
  let isHomeScreen;
  console.log('isHomeScreen524623', isEmpty);
  if (isEmpty) {
    await insertTuple();

      isHomeScreen = await getTupleHomeScreen();


    console.log('isHomeScreen524623-----true');
  }else{
    console.log('isHomeScreen524623-----false');
    isHomeScreen = await getTupleHomeScreen();
  }

  return isHomeScreen;


}

export async function isOffline() {
  const isEmpty = await isTableEmpty();


  if (isEmpty) {
    return false;
  }else{
    return await getTupleIsOffline();
  }

  return isEmpty;
}

export async function offlineToOnline() {
  const isEmpty = await isTableEmpty();
  if (isEmpty) {
    await insertTuple();
  }else{
    await updateTuple(0);
  }



}

export async function onlineToOffline() {
  const isEmpty = await isTableEmpty();
  if (isEmpty) {
    await insertTuple();
  }else{
    await updateTuple(1);
  }
}

async function getTupleIsOffline() {
  let query = `select * from local_info`;
  const res = await RawQuery(query);

  return res.item(0).isOffline == 1 ? true : false;
}

async function getTupleHomeScreen() {
  let query = `select * from local_info`;
  const res = await RawQuery(query);
console.log(res.item(0));
  return res.item(0).isHomeScreen == 1 ? true : false;
}

async function isTableEmpty() {
  let query = `select count(*) as length from local_info`;
  const res = await RawQuery(query);

  return res.item(0).length == 0 ? true : false;
}

async function insertTuple() {
  let insertQuery = `INSERT INTO local_info (id, isOffline, isHomeScreen) VALUES (1, 0, 0)`;
  const res = await RawQuery(insertQuery);
  console.log('resul1t', res);
  // return res.item(0).length == 0 ? true : false;
}

async function updateTuple(flag) {

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE local_info SET isOffline = ?`
        ,[flag],
        (tx, results) => {
          console.log('result', results);
          resolve(results.rowsAffected);
        }
      );


    });

  });

}

async function updateNavigationTuple(flag) {

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE local_info SET isHomeScreen = ?`
        ,[flag],
        (tx, results) => {
          console.log('result', results);
          resolve(results.rowsAffected);
        }
      );


    });

  });

}
