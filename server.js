//express package 
const express = require('express')
// const getmac= require('getmac')
//middleware package 
const bodyParser =require('body-parser')
const cors=require('cors')
const path = require('path');
const api = require('./server/routes/api')
var multer = require('multer');
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/api',api)


const DIR = './server/uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
    
});

let upload = multer({storage: storage});

app.use(function(req, res, next) {
    //set headers to allow cross origin request.
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});
 
app.get('/api', function (req, res) {
  res.end('file catcher example');
});
 
app.post('/api/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        //   console.log(res)
        // return res.send({
        //   success: true,
        // }) 
       var path = ''
       path = req.file.filename;
       var path1 =  ("Upload Completed for "+path); 
       return res.send(path)
      }
});

    // Serve only the static files form the dist directory
//  app.use(express.static(__dirname + '/src'));
app.use(express.static(path.join(__dirname, '/dist/farmers')));


//  app.get('/*', function(req,res) {
//     res.sendFile(path.join((__dirname + '/src/index.html')));
//     });

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/farmers/index.html'));
});

    
// app.get('/', function(req,res) {
//     res.send("Hello");
//  });
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);


