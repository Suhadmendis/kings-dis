import openDatabaseService from "../Config";

export function GetDataTableFieldValue(sDBTableName = "", sWhere = "", sFieldName = "") {
    return new Promise((resolve, reject) => {
        let sOut = "";

        const db = openDatabaseService();
        db.transaction(tx => {
            tx.executeSql("SELECT " + sFieldName + " FROM " + sDBTableName + " WHERE " + sWhere + " LIMIT 1", [],
                function (tx, res) {
                    if (res.rows.length > 0) {
                        sOut = res.rows.item(0)[sFieldName]
                    }
                    resolve(sOut);
                }, function (tx, error) {
                    console.log('ExecuteSql ERROR: ' + error.message);
                    resolve(sOut);
                })
        }, error => {
            console.log('Transaction ERROR: ' + error.message);
            resolve(sOut);
        });
    });
}

export function GetDataTableValues(sDBTableName = "", sWhere = "", sFieldName = "", nTopN = 0) {
    return new Promise((resolve, reject) => {
        let sOut = "";

        const db = openDatabaseService();
        db.transaction(tx => {
            let query = "SELECT " + sFieldName + " FROM " + sDBTableName
            if (sWhere.length > 1) {
                query += " WHERE " + sWhere
            }
            if (nTopN > 0) {
                query += " LIMIT " + nTopN
            }
            tx.executeSql(query, [],
                function (tx, res) {
                    if (res.rows.length > 0) {
                        sOut = res.rows
                    }
                    resolve(sOut);
                }, function (tx, error) {
                    console.log('ExecuteSql ERROR: ' + error.message);
                    resolve(sOut);
                })
        }, error => {
            console.log('Transaction ERROR: ' + error.message);
            resolve(sOut);
        });
    });
}

export function LogTable(sDBTableName = "", sWhere = "", sFieldName = "") {
    return new Promise((resolve, reject) => {
        let sOut = "";

        const db = openDatabaseService();
        db.transaction(tx => {
            let query = "SELECT " + sFieldName + " FROM " + sDBTableName
            if (sWhere.length > 1) {
                query += " WHERE " + sWhere
            }
            tx.executeSql(query, [],
                function (tx, res) {
                    if (res.rows.length > 0) {
                        sOut = res.rows
                        for (let i = 0; i < res.rows.length; i++) {
                            console.log('row ', i, JSON.stringify(res.rows.item(i), null, 2))
                        }
                    }
                    resolve(sOut);
                }, function (tx, error) {
                    console.log('ExecuteSql ERROR: ' + error.message);
                    resolve(sOut);
                })
        }, error => {
            console.log('Transaction ERROR: ' + error.message);
            resolve(sOut);
        });
    });
}

export function RawQuery(query = "") {
    return new Promise((resolve, reject) => {
        let sOut = "";

        const db = openDatabaseService();
        db.transaction(tx => {
            tx.executeSql(query, [],
                function (tx, res) {
                    if (res.rows.length > 0) {
                        sOut = res.rows
                    }
                    resolve(sOut);
                }, function (tx, error) {
                    console.log('ExecuteSql ERROR: ' + error.message);
                    resolve(sOut);
                })
        }, error => {
            console.log('Transaction ERROR: ' + error.message);
            resolve(sOut);
        });
    });
}
