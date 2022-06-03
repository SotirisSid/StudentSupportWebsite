const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const http = require('http');
const server = http.createServer(app);
const sqlite3 = require("sqlite3").verbose();
const bp = require('body-parser')
app.use(express.static('public'));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
/* var engines = require('consolidate');
app.set('views', path.join(__dirname,"./public/pages") );
app.engine('html', engines.mustache);
app.set('view engine', 'html');   */
//user: thegreatestadmin
//pass: yJ3GHhWNxuBS2CV3

var indexRouter = require('./routes/login');
var signrouter= require('./routes/signup');


    

app.use("/",indexRouter);
app.use("/",signrouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

server.listen(3000,()=>{
   
    console.log("listening on 3000");

})


