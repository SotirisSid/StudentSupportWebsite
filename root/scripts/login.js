
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database/project_db.db",sqlite3.OPEN_READONLY,(err)=>{
    if(err) return console.error(err.message);
    console.log("connection successful");
}  );



db.close((err)=>{

if(err) return console.error(err.message); 

})

