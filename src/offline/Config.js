import React from 'react';
import { Platform } from "react-native";
import { openDatabase } from 'react-native-sqlite-storage';


function openDatabaseService() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
  
    var db = openDatabase({ name: 'kingsseeds.db' });
    return db;
}

export default openDatabaseService;