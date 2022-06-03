var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var express = require('express');

var ensureLoggedIn = ensureLogIn();


var router = express.Router();

router.get('/', ensureLoggedIn,(req,res)=>{
    res.render("main-page.ejs");

});

module.exports = router;
