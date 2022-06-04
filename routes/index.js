var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var express = require('express');
let mainPageC = require('../controller/main-page-controller.js');
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

router.get('/getUserDetails', ensureLoggedIn, (req,res) =>{
    mainPageC.getUserById(req,res);
});
router.get('/isAdmin', ensureLoggedIn, (req,res) =>{
    mainPageC.checkIfAdmin(req,res);
});
router.get('/isProfessor', ensureLoggedIn, (req,res) =>{
    mainPageC.checkIfProf(req,res);
});
router.get('/isStudent', ensureLoggedIn, (req,res) =>{
    mainPageC.checkIfStudent(req,res);
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

router.get("/createAnnouncement",(req,res)=>{
    res.render("proffessor_announcement.ejs");

});

module.exports = router;
