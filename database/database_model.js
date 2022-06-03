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
    const stmt = db.prepare("SELECT id, username, fName, lName FROM USER WHERE id = ? LIMIT 0, 1");
    let user;
    try {
        user = stmt.all(id);
    } catch (err) {
        cb(err, null);
    }

    cb(null, user)
}

let checkIfAdmin = (id, cb) => {
    const stmt = db.prepare("SELECT id FROM ADMIN WHERE id = ? LIMIT 0, 1");
    let user;
    let verdict=false;
    try {
        user = stmt.all(id);
        if(user[0]) {
            verdict=true;
        }
    } catch (err) {
        cb(err, null);
    }
    cb(null, verdict)
}

let checkIfProfessor = (id, cb) => {
    const stmt = db.prepare("SELECT id FROM PROFESSOR WHERE id = ? LIMIT 0, 1");
    let user;
    let verdict=false;
    try {
        user = stmt.all(id);
        if(user[0]) {
            verdict=true;
        }
    } catch (err) {
        cb(err, null);
    }
    cb(null, verdict)
}

let checkIfStudent = (id, cb) => {
    const stmt = db.prepare("SELECT id FROM STUDENT WHERE id = ? LIMIT 0, 1");
    let user;
    let verdict=false;
    try {
        user = stmt.all(id);
        if(user[0]) {
            verdict=true;
        }
    } catch (err) {
        cb(err, null);
    }
    cb(null, verdict)
}

