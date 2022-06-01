
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bp = require('body-parser')
app.use(express.static('../public'));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const req = require('express/lib/request');



 const db = new sqlite3.Database("database/project_db.db",sqlite3.OPEN_READONLY,(err)=>{
    if(err) return console.error(err.message);
    console.log("connection successful");
    const username="thegreatestadmin";

}); 
 




// authenticate pass
passport.use(new LocalStrategy(function verify(username, password, cb) {
    db.get('SELECT * FROM USER WHERE username = ?', [ username ], function(err, row) {
      if (err) { return cb(err); }
      if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
  
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, row);
      });
    });
  }));



  db.close((err)=>{

    if(err) return console.error(err.message); 
    
    }); 

router.get('/',(req,res)=>{
    // res.json("you are vewing express");
     res.sendFile(path.join(__dirname,"../public/pages/login.html"));
    
 
 });
 
/*  router.post("/sign-up" ,function(req, res) {
     res.sendFile(path.join(__dirname,"../public/pages/Sign_up.html"));
 }); */
  router.post("/login",passport.authenticate('local', {
    successRedirect: '/login',
    failureRedirect: '/'
    
  })); 


     
module.exports = router;