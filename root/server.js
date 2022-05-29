const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");


app.use(express.static('css'));
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/',function(req,res){
    res.sendFile('login.html', { root: "pages"});
    
});


//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');