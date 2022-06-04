var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var express = require('express');
let mainPageC = require('../controller/main-page-controller.js');
var ensureLoggedIn = ensureLogIn();


var router = express.Router();

router.get('/', ensureLoggedIn,(req,res)=>{
    mainPageC.checkIdentity(req,res);
    

});

router.get('/announcements', ensureLoggedIn, (req,res)=>{
    mainPageC.checkIdentityAnn(req,res);
});

router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/login');
})

router.get('/getUserDetails', ensureLoggedIn, (req,res) =>{
    mainPageC.getUserById(req,res);
});

router.get('/getAllAnnouncements', ensureLoggedIn, (req,res) =>{
    mainPageC.getUserAnnouncements(req,res);
});
router.get('/addAnnouncement', ensureLoggedIn, (req,res) =>{
    mainPageC.addAnnouncement(req,res);
});
router.get('/addAnnouncement/:content/:title/:subject_id', ensureLoggedIn, (req,res) =>{
    mainPageC.addAnnouncement(req,res);
});

router.get("/createAnnouncement", ensureLoggedIn, (req,res)=>{
    mainPageC.checkIdentityNewAnn(req,res);

});

module.exports = router;
