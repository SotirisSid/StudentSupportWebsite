const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const http = require('http');
const server = http.createServer(app);
const sqlite3 = require("sqlite3").verbose();
const bp = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);
var csrf = require('csurf');
var passport = require('passport');
var logger = require('morgan');
app.use(express.static('public'));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

/* var engines = require('consolidate');
app.set('views', path.join(__dirname,"./public/pages") );
app.engine('html', engines.mustache);
app.set('view engine', 'html');   */
//user: thegreatestadmin
//pass: yJ3GHhWNxuBS2CV3



 
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
 // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));


var indexRouter = require('./routes/login');
var signrouter= require('./routes/signup');
var mainapprouter=require("./routes/index");
app.locals.pluralize = require('pluralize');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//app.use(csrf());
app.use(passport.authenticate('session'));
/* app.use(function(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  req.session.messages = [];
  next();
}); */
/* app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});  */




    
app.use("/",mainapprouter);
app.use("/",indexRouter);
app.use("/",signrouter);
 


server.listen(3000,()=>{
   
    console.log("listening on 3000");

})


