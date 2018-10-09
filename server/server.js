//express package 
const express = require('express')
//middleware package 
const bodyParser =require('body-parser')
const cors=require('cors')

const api = require('./routes/api')

//define port of server 
const PORT = 3200

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/api',api)

app.get('/',function(req,res){
    res.send('Hello from the server ')
})

app.listen(PORT, function(){
    console.log("The express server is running on port : " + PORT)
})

