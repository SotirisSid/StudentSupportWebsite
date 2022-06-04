'use strict';
const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database/project_db.db",sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err.message);
    console.log("connection successful");
    

}); 

let getfname = (id, cb) => {
    db.get('SELECT fName FROM USER WHERE id = ?', id, function(err, row) {
        if (!row) cb(null, false);
        cb(null, row);
    });
}
exports.getfname = getfname;


let getUserById = (id, cb) => {
    db.get('SELECT id, username, fName, lName FROM USER WHERE id = ?', id, function(err, row) {
        if (!row) cb(null, false);
        cb(null, row);
    });
}
exports.getUserById = getUserById;


let getSubjectId = (sub_name, cb) => {
    db.get('SELECT * FROM SUBJECT WHERE title = ?', sub_name, function(err, row) {
        if (!row) cb(null, false);
        cb(null, row);
    });
}
exports.getSubjectId = getSubjectId;


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
    if (userid==0) {
        db.all('SELECT * FROM ANNOUNCEMENT ORDER BY upload_date DESC', function(err, row) {
            if (!row) cb(null, false);
            cb(null, row);
        })
    }
    else {
        db.all('SELECT * FROM ANNOUNCEMENT WHERE ann_id IN (SELECT announcement_id FROM SEES WHERE student_id= ?) OR professor_id = ? ORDER BY upload_date DESC', userid, userid, function(err, row) {
            if (!row) cb(null, false);
            cb(null, row);
        })
    }
}
exports.getUserAnnouncements = getUserAnnouncements;

let getAnnouncement = (annid, userid, cb) => {
    db.get('SELECT * FROM ANNOUNCEMENT WHERE ann_id = ? AND ann_id IN (SELECT announcement_id FROM SEES WHERE student_id= ? OR professor_id = ? ORDER BY upload_date DESC)', annid, userid, userid, function(err, row) {
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

let getUserSubjects = (userid, cb) => {
    if (userid==0) {
        db.all('SELECT * FROM SUBJECT', function(err, row) {
            if (!row) cb(null, false);
            cb(null, row);
        })
    }
    else {
        db.all('SELECT * FROM SUBJECT JOIN ATTENDS ON sub_id=ATTENDS.subject_id JOIN TEACHES ON sub_id=TEACHES.subject_id WHERE student_id= ? OR professor_id= ? GROUP by sub_id', userid, userid, function(err, row) {
            if (!row) cb(null, false);
            cb(null, row);
        })
    }
}
exports.getUserSubjects = getUserSubjects;