//express package 
const express = require('express')
//middleware package 
const bodyParser =require('body-parser')
const cors=require('cors')
const path = require('path');
const api = require('./server/routes/api')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/api',api)

// Serve only the static files form the dist directory
 app.use(express.static(__dirname + './dist/farmers'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+ './dist/farmers/index.html'));
    });



// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);

