
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bp = require('body-parser')
var crypto = require('crypto');
const { info } = require('console');
//var db= require("../database/project_db.db");
app.use(express.static('../public'));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.set("view-engine","ejs");

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

router.get("/sign_up",checkNotAuthenticated,(req,res)=>{
   res.render("Sign_up.ejs");

});

const db = new sqlite3.Database("database/project_db.db",sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err.message);
    console.log("connection successful");

});



//signing up post

router.post('/sign_up',  function(req, res, next) {
    db.get("SELECT * FROM USER WHERE username=? ",[req.body.username], function(err, row) {
      if (err) { return cb(err); };
      if (!row) {
    console.log(req.body.username);

    var salt = crypto.randomBytes(16);
  
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return next(err); }
      console.log(hashedPassword);
      db.run('INSERT INTO USER (username,email,fName,lName, hashed_password, salt) VALUES (?, ?, ?, ?, ?, ?)', [
        req.body.username,
        req.body.email,
        req.body.fName,
        req.body.Lname,
        hashedPassword,
        salt
      ], function(err) {
        if (err) { return next(err); }
      res.redirect('/');
      
      
     

    });
  });
}
else{
  res.redirect('/sign_up?error=' + encodeURIComponent('Username_already_exists'));
 
}
});

});
 /* 
  
  db.close((err)=>{

    if(err) return console.error(err.message); 
    
    });  */

module.exports = router;