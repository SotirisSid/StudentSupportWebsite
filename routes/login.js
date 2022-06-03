
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bp = require('body-parser');
app.use(express.static('../public'));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const req = require('express/lib/request');

//app.set("view-engine","ejs");
//thegreatestadmin
//yJ3GHhWNxuBS2CV3
//http://localhost:3000/login

 const db = new sqlite3.Database("database/project_db.db",sqlite3.OPEN_READONLY,(err)=>{
    if(err) return console.error(err.message);
    console.log("connection successful");
    

}); 
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}



// authenticate pass
passport.use(new LocalStrategy(function verify(username, password, cb) {
    db.get('SELECT * FROM USER WHERE username = ?', [ username ], function(err, row) {
      if (err) { return cb(err); }
      if (!row) { return cb(null, false )}//, { message: 'Incorrect username or password.' });
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          
          return cb(null, false);// { message: 'Incorrect username or password.' }
        }
        return cb(null, row);
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    return done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    db.get('SELECT id, username FROM USER WHERE id = ?', id, function(err, row) {
      if (!row) return done(null, false);
      return done(null, row);
    });
  });
/* 

   db.close((err)=>{

    if(err) return console.error(err.message); 
    
    });   */

router.get('/login',checkNotAuthenticated,(req,res)=>{
    //const message=req.flash("hello");
     res.render("login.ejs");//,{message});
    
 
 });

router.post("/login/pass",  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
    
  }));  


     
module.exports = router;
