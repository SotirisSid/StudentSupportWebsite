'use strict';
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database/project_db.db",sqlite3.OPEN_READONLY,(err)=>{
    if(err) return console.error(err.message);
    console.log("connection successful");
    

}); 

let getUserById = (id, callback) => {
    const stmt = sql.prepare("SELECT id, username, fName, lName FROM USER WHERE id = ? LIMIT 0, 1");
    let user;
    try {
        user = stmt.all(id);
    } catch (err) {
        callback(err, null);
    }

    callback(null, user[0])
}

