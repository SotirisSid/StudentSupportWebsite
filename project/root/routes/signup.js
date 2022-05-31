
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bp = require('body-parser')
var crypto = require('crypto');
var db= require("../database/project_db.db");
app.use(express.static('../public'));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))



router.get("/sign_up",(req,res)=>{
    //res.json("you are vewing express");
    res.sendFile(path.join(__dirname,"../public/pages/Sign_up.html"));
   

});

const db = new sqlite3.Database("database/project_db.db",sqlite3.OPEN_READONLY,(err)=>{
    if(err) return console.error(err.message);
    console.log("connection successful");

});

/* 
 router.post("/sign_up",(req,res)=>{
    res.redirect("/");
    console.log(req.body.username);
   
    var fname="sotirios";
    var lname="sidiropoulos";
    
});   */
 


router.post('/sign_up', function(req, res, next) {
    var salt = crypto.randomBytes(16);
    var fname="sotirios";
    var lname="sidiropoulos";
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return next(err); }
      console.log(hashedPassword);
      db.run('INSERT INTO USER (username,fName,lName, password, salt) VALUES (?, ?, ?, ?, ?, ?)', [
        req.body.username,
        fname,
        lname,
        hashedPassword,
        salt
      ], function(err) {
        if (err) { return next(err); }
      var user = {
        id: this.lastID,
        username: req.body.username
      };
      req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    });
  });
  res.redirect('/');

});

  
  db.close((err)=>{

    if(err) return console.error(err.message); 
    
    }); 

module.exports = router;