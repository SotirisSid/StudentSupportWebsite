'use strict';
const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database/project_db.db",sqlite3.OPEN_READWRITE,(err)=>{
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

let getAnnouncement = (annid, userid, cb) => {
    db.get('SELECT * FROM ANNOUNCEMENT WHERE ann_id = ? AND ann_id IN (SELECT announcement_id FROM SEES WHERE student_id= ?)', annid, userid, function(err, row) {
        if (!row) cb(null, false);
        cb(null, row);
    })
}
exports.getAnnouncement = getAnnouncement;

let addAnnouncement = (newAnnouncement, userId, cb) => {
    let info=db.run('INSERT INTO ANNOUNCEMENT (content, upload_date, title, subject_id, professor_id) VALUES (?, DATE("now"), ?, ?, ?)', [
        newAnnouncement.content,
        newAnnouncement.title,
        newAnnouncement.subject_id,
        userId
      ], function(err) {
        if (err) cb(err);
    });

    db.get('SELECT ann_id FROM ANNOUNCEMENT ORDER BY ann_id DESC LIMIT 1', function(err, row1) {
        if (!row1) cb(null, false);

        db.all('SELECT student_id FROM ATTENDS WHERE subject_id = ?', newAnnouncement.subject_id, function(err, row2) {
            if (!row2) cb(null, false);
            for (let i=0; i<row2.length; i++) {
                let st_id= row2[i].student_id;
                db.run ('INSERT INTO SEES (student_id, announcement_id) VALUES (?, ?)', [
                    st_id,
                    row1
                ], function(err) {
                    if (err) cb(err);
                })
            }
        })
    })
    cb(null, info.lastInsertRowId);
};
exports.addAnnouncement = addAnnouncement;
