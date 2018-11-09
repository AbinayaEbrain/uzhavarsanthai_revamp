//express package 
const express = require('express')
//middleware package 
const bodyParser =require('body-parser')
const cors=require('cors')
const path = require('path');
const api = require('./routes/api')

//define port of server 
const PORT = 8080

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/api',api)

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/farmers'));

// app.get('/',function(req,res){
//     res.send('Hello from the server ')
// })
app.get('/*', function(req,res) {
    
    res.sendFile(path.join(__dirname+'/dist/farmers/index.html'));
    });

app.listen(PORT, function(){
    console.log("The express server is running on port : " + PORT)
})

