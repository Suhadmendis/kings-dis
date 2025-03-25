import openDatabaseService from '../../offline/Config';

const db = openDatabaseService();

export default async function getSettingsValue(name){
    return new Promise((resolve, reject) => {

        let keyName = name;
        
        db.transaction((tx) => {
          tx.executeSql(`SELECT KeyValue FROM local_cms_settingskey WHERE KeyName = '${keyName}' limit 1`,
            [],
            function (tx, res) {
              let data = [];
              
              for (let index = 0; index < res.rows.length; index++) {
                
                data.push(res.rows.item(index).KeyValue);
              }
              resolve(data);
            }
          );
        });
      });
    
    

    
}


