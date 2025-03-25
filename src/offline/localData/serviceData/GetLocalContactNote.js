
   
import openDatabaseService from '../../Config';


async function GetLocalContactNote(data1) {
  

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_int_contactnotes WHERE CusId==${data1}`,[],

        function (tx, res) {
          let data = [];
          
          for (let index = 0; index < res.rows.length; index++) {
            data.push({ 
              Id: res.rows.item(index).Id,
              CusId: res.rows.item(index).CusId,
              Note: res.rows.item(index).Note,
              NoteTitle: res.rows.item(index).NoteTitle,
              Date: res.rows.item(index).Date
            });            

          }
          resolve(data);
        })
    });
  });
}


export default GetLocalContactNote;