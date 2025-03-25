import openDatabaseService from "../../Config";

async function AddNote(data) {
  const db = openDatabaseService();
  
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO local_int_contactnotes (CusId, Note, NoteTitle, Date) VALUES (?,?,?,?)',
        [data.Cusid, data.Note, data.NoteTitle, data.Date],
        (tx, results) => {
          resolve(results.rowsAffected);  
        }
      );
    });
  });
}

export default AddNote;
