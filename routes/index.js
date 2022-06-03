var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var express = require('express');

var ensureLoggedIn = ensureLogIn();


var router = express.Router();

router.get('/', ensureLoggedIn,(req,res)=>{
    res.render("main-page.ejs");

});

router.get('/announcements', ensureLoggedIn, (req,res)=>{
    res.render("announcements.ejs");
});

router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/login');
})

module.exports = router;
