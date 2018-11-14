//express package 
const express = require('express')
//middleware package 
const bodyParser =require('body-parser')
const cors=require('cors')
const path = require('path');
const api = require('./routes/api')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/api',api)

// Serve only the static files form the dist directory
 app.use(express.static('/src'));

app.get('', function(req,res) {
    res.sendFile(path.join('/src','index.html'));
    });

// app.get('/', function(req,res) {
//     res.send("Hello");
//  });
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);


