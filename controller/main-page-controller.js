const User = require('../database/user.js');
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
            res.status(200).json({ isProfessor: user });
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