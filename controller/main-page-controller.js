const User = require('../database/user.js');
const Announcement = require('../database/announcement.js');
let model = require('../database/database_model.js');





function getUserById(req,res) {
    model.getUserById(req.session.passport.user, (err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            res.status(200).json({ user: user });
        }
    })
}
exports.getUserById = getUserById;

function checkIfAdmin(req,res) {
    model.checkIfAdmin(req.session.passport.user, (err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            res.status(200).json({ isAdmin: user });
        }
    })
}
exports.checkIfAdmin=checkIfAdmin;

function checkIfProf(req,res) {
    model.checkIfProf(req.session.passport.user, (err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            console.log(user.VERDICT);
            return user.VERDICT;
        }
    })
}
exports.checkIfProf=checkIfProf;

function checkIfStudent(req,res) {
    model.checkIfStudent(req.session.passport.user, (err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            res.status(200).json({ isStudent: user });
        }
    })
}
exports.checkIfStudent=checkIfStudent;




function checkIdentity(req,res) {
    model.checkIfAdmin(req.session.passport.user, (err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            if (user.VERDICT == 1) {                
                model.getUserById(req.session.passport.user,(err, user) => {
                    if (err) {
                        res.json(err);
                    }                   
                    res.render("proffesor_main_page.ejs",{namevar:user.fName,lastnamevar: user.lName});                
                });                  
            }
        }
    });
    model.checkIfProf(req.session.passport.user, (err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            if (user.VERDICT == 1) {
                model.getUserById(req.session.passport.user,(err, user) => {
                    if (err) {
                        res.json(err);
                    }                   
                    res.render("proffesor_main_page.ejs",{namevar:user.fName,lastnamevar: user.lName});            
                });  
            }
        }
    });
    model.checkIfStudent(req.session.passport.user, (err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            if (user.VERDICT == 1) {
                model.getUserById(req.session.passport.user,(err, user) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render("main-page.ejs",{namevar:user.fName,lastnamevar: user.lName});
                });  
            }
        }
    })
}
exports.checkIdentity = checkIdentity;



function checkIdentityAnn(req,res) {
    model.checkIfAdmin(req.session.passport.user, (err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            if (user.VERDICT == 1) {                
                model.getUserById(req.session.passport.user,(err, user) => {
                    if (err) {
                        res.json(err);
                    }                   
                    res.render("prof_announcements.ejs",{namevar:user.fName,lastnamevar: user.lName});
                });                  
            }
        }
    });
    model.checkIfProf(req.session.passport.user, (err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            if (user.VERDICT == 1) {
                model.getUserById(req.session.passport.user,(err, user) => {
                    if (err) {
                        res.json(err);
                    }                   
                    res.render("prof_announcements.ejs",{namevar:user.fName,lastnamevar: user.lName});            
                });  
            }
        }
    });
    model.checkIfStudent(req.session.passport.user, (err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            if (user.VERDICT == 1) {
                model.getUserById(req.session.passport.user,(err, user) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render("announcements.ejs",{namevar:user.fName,lastnamevar: user.lName});
                });  
            }
        }
    })
}
exports.checkIdentityAnn = checkIdentityAnn;


function checkIdentityNewAnn(req,res) {
    model.checkIfAdmin(req.session.passport.user, (err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            if (user.VERDICT == 1) {                
                model.getUserById(req.session.passport.user,(err, user) => {
                    if (err) {
                        res.json(err);
                    }                   
                    res.render("proffessor_announcement.ejs",{namevar:user.fName,lastnamevar: user.lName});                
                });                  
            }
        }
    });
    model.checkIfProf(req.session.passport.user, (err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            if (user.VERDICT == 1) {
                model.getUserById(req.session.passport.user,(err, user) => {
                    if (err) {
                        res.json(err);
                    }                   
                    res.render("proffessor_announcement.ejs",{namevar:user.fName,lastnamevar: user.lName});            
                });  
            }
        }
    });
    model.checkIfStudent(req.session.passport.user, (err, user) => {
        if (err) {
            res.json(err);
        }
        else {
            if (user.VERDICT == 1) {
                model.getUserById(req.session.passport.user,(err, user) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render("main-page.ejs",{namevar:user.fName,lastnamevar: user.lName});
                });  
            }
        }
    })
}
exports.checkIdentityNewAnn = checkIdentityNewAnn;



function getUserAnnouncements(req, res) {
    model.getUserAnnouncements(req.session.passport.user, (err, announcements) => {
        if (err) {
            res.json(err);
        }
        else {
            res.status(200).json({ Announcements: announcements });
        }
    })
}
exports.getUserAnnouncements = getUserAnnouncements;

function addAnnouncement(req, res) {
    const newAnnouncement = new Announcement(null, req.params.content, null, req.params.title, req.params.subject_id);
    model.addAnnouncement(newAnnouncement, req.session.passport.user, (err, lastInsertId) => {
        if (err) {
            console.log(err);
            res.json(err);
        }
        else {
            model.getAnnouncement(lastInsertId, req.session.passport.user, (err, row) => {
                if(err) {
                    console.log(err);
                    res.json(err);
                } else {
                    res.status(200).send(row);
                }
            });
        }
    });
}
exports.addAnnouncement = addAnnouncement;