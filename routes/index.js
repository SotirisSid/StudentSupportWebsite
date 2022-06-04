var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var express = require('express');
let mainPageC = require('../controller/main-page-controller.js');
var ensureLoggedIn = ensureLogIn();

let model = require('../database/database_model.js');

var router = express.Router();

router.get('/', ensureLoggedIn,(req,res)=>{
    mainPageC.checkIdentity(req,res);
    

});

router.get('/announcements', ensureLoggedIn, (req,res)=>{
    mainPageC.getUserAnnouncements(req,res);
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

router.post("/submit_announcement",(req,res)=>{

console.log(req.session.passport.user);

model.getSubjectId(req.body.subject, (err, sub) => {
    if (err) {
        res.json(err);
    }
    const cur_announcment={content:req.body.text,title:req.body.title,subject_id:sub.sub_id};
    console.log(cur_announcment);
    model.addAnnouncement(cur_announcment,req.session.passport.user,(err, sub) => {
        if (err) {
            res.json(err);
        }
    });
});
res.redirect("/createAnnouncement");

});


module.exports = router;
