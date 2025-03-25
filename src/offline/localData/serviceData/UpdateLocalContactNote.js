import openDatabaseService from "../../Config";

async function UpdateLocalContactNote(data) {
  console.log(data);
  const db = openDatabaseService();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE local_int_contactnotes SET Note = ?, NoteTitle = ? WHERE Id = ?`,
        [data.note,data.title,data.id],
        (tx, results) => {
          resolve(results.rowsAffected);  
        }
      );
   

    });
  });
}

export default UpdateLocalContactNote;
