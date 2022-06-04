'use strict';
const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database/project_db.db",sqlite3.OPEN_READONLY,(err)=>{
    if(err) return console.error(err.message);
    console.log("connection successful");
    

}); 

let getUserById = (id, cb) => {
    db.get('SELECT id, username, fName, lName FROM USER WHERE id = ?', id, function(err, row) {
        if (!row) cb(null, false);
        cb(null, row);
    });
}
exports.getUserById = getUserById;


let checkIfAdmin = (id, cb) => {
    db.get('SELECT EXISTS (SELECT id FROM ADMIN WHERE id = ? LIMIT 0, 1) AS VERDICT', id, function(err, row) {
        if (!row) cb(null, false);
        cb(null, row);
    })
}
exports.checkIfAdmin = checkIfAdmin;

let checkIfProf = (id, cb) => {
    db.get('SELECT EXISTS (SELECT id FROM PROFESSOR WHERE id = ? LIMIT 0, 1) AS VERDICT', id, function(err, row) {
        if (!row) cb(null, false);
        cb(null, row);
    })
}
exports.checkIfProf = checkIfProf;

let checkIfStudent = (id, cb) => {
    db.get('SELECT EXISTS (SELECT id FROM STUDENT WHERE id = ? LIMIT 0, 1) AS VERDICT', id, function(err, row) {
        if (!row) cb(null, false);
        cb(null, row);
    })
}
exports.checkIfStudent = checkIfStudent;

let getUserAnnouncements = (userid, cb) => {
    db.get('SELECT * FROM ANNOUNCEMENT WHERE ann_id IN (SELECT announcement_id FROM SEES WHERE student_id= ?)', userid, function(err, row) {
        if (!row) cb(null, false);
        cb(null, row);
    })
}
exports.getUserAnnouncements = getUserAnnouncements;