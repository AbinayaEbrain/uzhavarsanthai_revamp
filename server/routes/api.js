const express =require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const mongoose = require('mongoose')
var multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const db = 'mongodb://user01:user01@ds023704.mlab.com:23704/farmersdb';
var http = require("http");

const User = require('../models/user')
const Post = require('../models/post')
const Multipost = require('../models/multipost')
const Category = require('../models/category')
const Blog = require('../models/blog')
const Contact = require('../models/contact');
const Count = require('../models/viewCount');
const Phone = require('../models/phone');
const Device = require('../models/devicedata');
const Notification = require('../models/notification');
const Orderrequest = require('../models/orderrequest');
const Signup = require('../models/signUp');

//email
var email = require('emailjs/email');

mongoose.connect(db, err => {
  if (err) {
    console.log('Error !' + err);
  } else {
    console.log('connected to mongoDB');
  }
});

//verify token
function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1]; //which splits at the space,so it will contain token value
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }
  let payload = jwt.verify(token, 'secretKey');
  if (!payload) {
    return res.status(401).send('Unauthorized request');
  }
  res.UserId = payload.subject;
  next();
}

router.get('/', (req, res) => {
  res.send('From API route');
});


router.post('/register', (req, res) => {
  let aaa = req.body.firstname;
  let name = aaa.toLowerCase();
  req.body.firstname = name.charAt(0).toUpperCase() + name.slice(1);
  let userData = req.body;
  let user = new User(userData);
  user.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      //  jwt
          let payload = { subject: data._id };
          let token = jwt.sign(payload, 'secretKey');

          //before adding jwt
         // res.status(200).send(registeredUser)

         //after add jwt
         //console.log(payload)
      res.status(200).send({ token, payload, user });
      // res.status(200).send(data);
    }
 })
});

// router.post('/registerSeller', (req, res) => {
//   let userData = req.body;
//   let user = new User(userData);
//   user.save((error, data) => {
//     if (error) {
//       console.log(error);
//     } else {
//       //  jwt
//           // let payload = { subject: data._id };
//           // let token = jwt.sign(payload, 'secretKey');

//          // before adding jwt
//          console.log(registeredUser);
//          res.status(200).send(registeredUser)

//          //after add jwt
//          //console.log(payload)
//       //res.status(200).send({ token, payload, user });
//       //console.log(token, payload, user);
//     }
//  })
// });

//postdeals

router.post('/post', (req, res) => {
  let aaa = req.body.name;
  let name = aaa.toLowerCase();
  req.body.name = name.charAt(0).toUpperCase() + name.slice(1);
  let userData = req.body;
  let user = new Post(userData);
  user.save((error, productData) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(productData);
    }
  });
});

// Multipost
router.post('/multipost', (req, res) => {
  let userData = req.body;
  let multipost = new Multipost(userData);
  multipost.save((error, productData) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(productData);
    }
  });
});

// get multipost
router.get('/getMultipost', (req, res) => {
  Multipost.find(function(err, result) {
    if (err) {
      console.log('no data2');
    } else {
      res.send(result);
      //console.log(result)
    }
  }).sort({date : -1});
});

//admin

router.post('/category',(req,res)=>{
    console.log(req.body);
    let categoryData = req.body
    let category = new Category(categoryData)
    category.save((error,productData)=>{
        if(error){
            console.log(error)
        }else{

            res.status(200).send(productData)

        }
    })
});

router.post('/blog',(req,res)=>{
    let blogData = req.body
    let blog = new Blog(blogData)
    blog.save((error,blogData)=>{
        if(error){
            console.log(error)
        }else{

            res.status(200).send(blogData)


        }
    })
});

router.get('/blogview', (req, res) => {
  Blog.find(function(err, result) {
    if (err) {
      console.log('no blog');
    } else {
      res.send(result);
    }
  }).sort({createdAt : -1});

});

//update blogs
router.put('/blogedit/:id', function(req, res) {
  Blog.findByIdAndUpdate(
    req.params.id,
    {
      $set: { username: req.body.username,commenttext: req.body.commenttext}
    },
    {
      new: true
    },
    function(err, updatedBlog) {
      if (err) {
        res.send('Error updating blog');
      } else {
        res.json(updatedBlog);
      }
    }
  );
});

router.get('/blogetone/:id', (req, res) => {
  Blog.findById(req.params.id, function(errors, getoneuser) {
    if (errors) {
      console.log('Error updating' + errors);
    } else {
      res.json(getoneuser);
    }
  });
});

// get one multi post
router.get('/singleMultipost/:id', (req, res) => {
  Multipost.findById(req.params.id, function(errors, getoneuser) {
    if (errors) {
      console.log('Error updating' + errors);
    } else {
      res.json(getoneuser);
    }
  });
});

//delete multipost
router.delete('/dltMultiPost/:id', (req, res) => {
  Multipost.findByIdAndRemove(req.params.id, function(errors, deleteblog) {
    if (errors) {
      console.log('Error deleting' + errors);
    } else {
      res.json(deleteblog);
    }
  });
});

router.post('/updateMultipost/:id', function(req, res) {
  Multipost.find(
    {
      _id:req.params.id
    },
    async (err,result) =>{
      if(result.length > 0){
        await Multipost.update(
          {
            _id:req.params.id
          },
          {
            $set: {
              category: req.body.category,
              description: req.body.description,
              avlPlace: req.body.avlPlace,
              image: req.body.image,
              validityTime: req.body.validityTime
             }
          }
        )
        .then(() =>{
          res.status(200).json({ message: 'Multipost updated'});
        })
        .catch(err => {
          res.status(500).json({ message: 'Error occured' });
        });
      }
    }
  )
});

//delete blog
router.delete('/blogdel/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id, function(errors, deleteblog) {
    if (errors) {
      console.log('Error deleting' + errors);
    } else {
      res.json(deleteblog);
    }
  });
});

router.post('/login',(req,res)=>{
    let userData = req.body

    User.findOne({phone: userData.phone},(error,user)=>{
        if(error){
            console.log(error)

        }else{
            if(!user){
                res.status(401).send('Invalid Phone Number')

            }else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid Password')
                }else{
                //add jwt
                 let payload={subject:user._id}
                 let token =jwt.sign(payload,'secretKey')
                    //before add jwt
                   // res.status(200).send(user)

                    //after add jwt

                 res.status(200).send({token,payload,user})

                }
            }
        }
    });
});

//contact
router.post('/contact', (req, res) => {
  let contactData = req.body;
  let contact = new Contact(contactData);
  contact.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(data);
    }
  });
});

router.post('/sendMail', (req, res) => {
  var server = email.server.connect({
    user: 'support@ebraintechnologies.com',
    password: 'Ji#993te',
    host: 'smtp.gmail.com',
    ssl: true
  });
  server.send(
    {
      text: 'Contact mail',
      from: 'support@ebraintechnologies.com',
      to: 'support@ebraintechnologies.com',
      subject: 'Welcome to my app',
      attachment: [
        {
          data:
          "<html><h5>Name :</h5></html>" + req.body.name + "<html><br></html>" + "<html><h5>Email :</h5></html>" + req.body.email
           + "<html><br></html>" + "<html><h5>Phone :</h5></html>" + req.body.phone + "<html><br></html>" + "<html><h5>Message :</h5></html>" + req.body.message,
          alternative: true
        }
        //  {path:"pathtofile.zip", type:"application/zip", name:"renamed.zip"}
      ]
    },
    function(err, message) {
      if (err) console.log(err);
      else res.json({ success: true, msg: 'sent', message });
    }
  );
});

// Mail for signup rqst
router.post('/sendMailSignUp', (req, res) => {
  console.log(req.body);
  var server = email.server.connect({
    user: 'abishakshi1496@gmail.com',
    password: 'abiyuva14382',
    host: 'smtp.gmail.com',
    ssl: true
  });
  server.send(
    {
      text: 'Signup request from Uzhavarsanthai !',
      from: 'abishakshi1496@gmail.com',
      to: 'abishakshi1496@gmail.com',
      subject: 'Signup request from Uzhavarsanthai !',
      attachment: [
        {
          data:
         "<html><h2>" + req.body.user.firstname + "</h2></html>" + "<html><h4>has requested to signup as a seller!</h4></html>" +
          "<html><h3>Name :</h3></html>" + req.body.user.firstname + "<html><br></html>" + "<html><h3>Role :</h3></html>" + req.body.user.role
           + "<html><br></html>" + "<html><h3>Phone :</h3></html>" + req.body.user.phone + "<html><br></html>" + "<html><h3>Address :</h3></html>" + req.body.user.address.city.formatted_address
           + "<html><br></html>" + "<html><h3>City :</h3></html>" + req.body.user.address.city.locality ,
          alternative: true
        }
        //  {path:"pathtofile.zip", type:"application/zip", name:"renamed.zip"}
        // + "<html><br></html>" + "<html><h5>Address :</h5></html>" + req.body.address.city.formatted_address +
       // "<html><br></html>" + "<html><h5>City :</h5></html>" + req.body.address.city.locality

      ]
    },
    function(err, message) {
      if (err) console.log(err);
      else res.json({ success: true, msg: 'sent', message });
    }
  );
});

// Mail for buyer as seller signup rqst
router.post('/sendMailSignUpBuyer', (req, res) => {
  console.log(req.body);
  var server = email.server.connect({
    user: 'abishakshi1496@gmail.com',
    password: 'abiyuva14382',
    host: 'smtp.gmail.com',
    ssl: true
  });
  server.send(
    {
      text: 'Signup request from Uzhavarsanthai !',
      from: 'abishakshi1496@gmail.com',
      to: 'abishakshi1496@gmail.com',
      subject: 'Signup request from Uzhavarsanthai !',
      attachment: [
        {
          data:
         "<html><h2>" + req.body.firstname + "</h2></html>" + "<html><h4>has requested to signup as a seller!</h4></html>" +
          "<html><h3>Name :</h3></html>" + req.body.firstname + "<html><br></html>" + "<html><h3>Role :</h3></html>" + req.body.role
           + "<html><br></html>" + "<html><h3>Phone :</h3></html>" + req.body.phone + "<html><br></html>" + "<html><h3>Address :</h3></html>" + req.body.address.city.formatted_address
           + "<html><br></html>" + "<html><h3>City :</h3></html>" + req.body.address.city.locality ,
          alternative: true
        }
        //  {path:"pathtofile.zip", type:"application/zip", name:"renamed.zip"}
        // + "<html><br></html>" + "<html><h5>Address :</h5></html>" + req.body.address.city.formatted_address +
       // "<html><br></html>" + "<html><h5>City :</h5></html>" + req.body.address.city.locality

      ]
    },
    function(err, message) {
      if (err) console.log(err);
      else res.json({ success: true, msg: 'sent', message });
    }
  );
});

router.get('/deals', (req, res) => {
  Post.find(function(err, result) {
    if (err) {
      // console.log('no data1')
      console.log(err);
    } else {
      res.send(result);
    }
  }).sort({date : -1});
});

router.get('/category', (req, res) => {
  Category.find(function(err, result) {
    if (err) {
      console.log('no data2');
    } else {
      res.send(result);
      //console.log(result)
    }
  });
});

//get a user
router.get('/details', (req, res) => {
  User.find(function(err, result) {
    if (err) {
      console.log('no data4');
    } else {
      res.send(result);
    }
  });
});

//delete deals
router.delete('/deals/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, function(errors, deleteuser) {
    if (errors) {
      console.log('Error deleting' + errors);
    } else {
      res.json(deleteuser);
    }
  });
});

//delete category
router.delete('/category/:id', (req, res) => {
  Category.findByIdAndRemove(req.params.id, function(errors, deleteuser) {
    if (errors) {
      console.log('Error deleting' + errors);
    } else {
      res.json(deleteuser);
    }
  });
});

//delete user
router.delete('/details/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, function(errors, deleteuser) {
    if (errors) {
      console.log('Error deleting' + errors);
    } else {
      res.json(deleteuser);
    }
  });
});

//update deals
router.put('/deals/:id', function(req, res) {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        category: req.body.category,
        name: req.body.name,
        quantity: req.body.quantity,
        qnty: req.body.qnty,
        subQuantity: req.body.subQuantity,
        subqnty: req.body.subqnty,
        price: req.body.price,
        description: req.body.description,
        validityTime: req.body.validityTime,
        avlPlace: req.body.avlPlace,
        image: req.body.image
      }
    },
    {
      new: true
    },
    function(err, updatedUser) {
      if (err) {
        res.send('Error updating user');
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//update user
router.put('/updateuser/:id', function(req, res) {
  // console.log('Update a userprofile');
  console.log(req.body._id)
  console.log(req.params.id)

  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        phone : req.body.phone,
        status: req.body.status,
        firstname: req.body.firstname,
        password : req.body.password,
        address: req.body.address,
        role: req.body.role,
        roleStatus : req.body.roleStatus
      }
    },
    {
      new: true
    },
    function(err, updatedUser) {
      if (err) {
        res.send('Error updating userprofile');
      } else {
        console.log(updatedUser);
        res.json(updatedUser);
      }
    }
  );
});

//update deals
router.put('/category/:id', function(req, res) {
  // console.log('Update a user');
  // console.log(req.body)
  //let userData = req.body
  // let User = new User(userData)
  Category.findByIdAndUpdate(
    req.params.id,
    {
      $set: { productCategory: req.body.productCategory, image: req.body.image }
    },
    {
      new: true
    },
    function(err, updatedUser) {
      if (err) {
        res.send('Error updating user');
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Deactivate account
router.post('/admin-user/deactive/:id', function(req, res) {
  User.find(
    {
      _id:req.params.id
    },
    async (err,result) =>{
      if(result.length > 0){
        await User.update(
          {
            _id:req.params.id
          },
          {
            $set: { status: 'DEACTIVE' }
          }
        )
        .then(() =>{
          res.status(200).json({ message: 'Status set'});
        })
        .catch(err => {
          res.status(500).json({ message: 'Error occured' });
        });
      }
      await Post.update(
        {
          accountId:req.params.id
        },
        {
          $set: { status: 'DEACTIVE' }
        }
      )
    }
  )
});


router.post(
  '/sendImage',
  multer({
    storage: cloudinaryStorage({
      cloudinary: cloudinary,
      allowedFormats: ['jpg', 'png'],
      destination: function(req, file, callback) {
        callback(null, './uploads');
      }
    }) //MyImage is the name of the image which will be uploaded to your Cloudinary storage
  }).single('Image'),
  function(req, res) {
    //To return OK status to the user after uploading
    let path = JSON.stringify(req.file.secure_url);
    return res.send(path);
  }
);

//activate account
router.post('/admin-user/active/:id', function(req, res) {
  User.find(
    {
      _id:req.params.id
    },
    async (err,result) =>{
      if(result.length > 0){
        await User.update(
          {
            _id:req.params.id
          },
          {
            $set: { status: 'ACTIVE' }
          }
        )
        .then(() =>{
          res.status(200).json({ message: 'Status set'});
        })
        .catch(err => {
          res.status(500).json({ message: 'Error occured' });
        });
      }
      await Post.update(
        {
          accountId:req.params.id
        },
        {
          $set: { status: 'ACTIVE' }
        }
      )
    }
  )
});

// Viewed product count
router.post('/getCount', (req, res) => {
  Count.find(
    {
      $and : [
        {
          productId : req.body.productId
        },
        {
          ipAddress:req.body.ipAddress
        },
      ]
    },
    async (err,result) =>{
      if(result.length > 0){
        await Count.update(
          {
            $and : [
              {
                productId : req.body.productId
              },
              {
                ipAddress:req.body.ipAddress
              },
            ]
          },
          {
              $inc: { count: 1 }
          }
      )
      .then(() =>{
        res.status(200).json({ message: 'Updated '});
      })
      .catch(err => {
        res.status(500).json({ message: 'Error occured' });
      });
      } else{
        let contactData = req.body;
        let count = new Count(contactData);
        count.save((error, data) => {
          if (error) {
            console.log(error);
          } else {
          res.status(200).send(data);
          }
        })
      };
      await Post.update(
        {
          _id : req.body.productId
        },
        {
          $inc: { count: 1 }
        }
      )
    }
  )
});

// Forgot password

router.post('/forgotPwd',(req , res) => {
  let contactData = req.body;
  let phoneVerify = new Phone(contactData);

  Phone.find(
    {
    phone: req.body.phone1
   },
   async (err, exuser) => {
  if (exuser.length > 0) {
   await Phone.update(
      {
        phone: contactData.phone1
      },
      {
        $set: { otp: contactData.otp }
      }
  )
    res.status(200).json({ message: 'Updated '});
     var options = {
      "method": "POST",
      "hostname": "control.msg91.com",
      "port": null,
      "path": "/api/sendotp.php?authkey=267433AasRmmBdVC5c8a1c2b&sender=UZHAVAN&otp_expiry=1&otp=" + contactData.otp + "&mobile=" + contactData.phone1,
      "headers": {}
    };
    // /api/sendotp.php?authkey=267433AasRmmBdVC5c8a1c2b&otp_expiry=1&otp=" + req.body.phone + "&mobile=" + req.body.phone **** "path": "/api/sendotp.php?otp_length=4&authkey=267433AasRmmBdVC5c8a1c2b&message=Your verification code is&sender=ABCDEF&mobile=919677424386&otp=1234&otp_expiry=1440",

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.end();
  }
   else {
    res.status(401).send('Please enter registered phone number');
  }
});

})

router.post('/sendotpverf',(req , res) => {
  let contactData = req.body;
  let phoneVerify = new Phone(contactData);

User.findOne({ phone: contactData.phone }, (err, exuser) => {
  if (exuser == null) {
    phoneVerify.save((error, registeredUser) => {
      if (error) {
        console.log(error);
      } else {
        //jwt
        res.status(200).send(registeredUser);
      }

      var options = {
        "method": "POST",
        "hostname": "control.msg91.com",
        "port": null,
        "path": "/api/sendotp.php?authkey=267433AasRmmBdVC5c8a1c2b&sender=UZHAVAN&otp_expiry=1&otp=" + contactData.otp + "&mobile=" + contactData.phone,
        "headers": {}
      };
      // /api/sendotp.php?authkey=267433AasRmmBdVC5c8a1c2b&otp_expiry=1&otp=" + req.body.phone + "&mobile=" + req.body.phone **** "path": "/api/sendotp.php?otp_length=4&authkey=267433AasRmmBdVC5c8a1c2b&message=Your verification code is&sender=ABCDEF&mobile=919677424386&otp=1234&otp_expiry=1440",

      var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
        });
      });

      req.end();
    });
  } else {
    res.status(401).send('Number already exist');
  }
});
})

router.post('/resetPassword/:phone',(req , res) =>{
  User.find(
    {
      phone:req.params.phone
    },
    async (err,result) =>{
      if(result.length > 0){
        await User.update(
          {
            phone:req.params.phone
          },
          {
            $set: { password: req.body.confirmPassword }
          }
      )
      .then(() =>{
        res.status(200).json({ message: 'Changed password successfully!'});
      })
      .catch(err => {
        res.status(500).json({ message: 'Error occured' });
      });
      }
    }
  )
});

//get device data
router.post('/getdevicedata', (req, res) => {
  Device.find(
    {
      deviceId:req.body.deviceId
    },
    async (err,result) =>{
      if(result.length > 0){
        console.log("ALready exist");
      }else{
        console.log(req.body);
        let device = req.body;
        let deviceData = new Device(device);
        deviceData.save((error, data) => {
          if (error) {
            console.log(error);
          } else {
            console.log(data);
            res.status(200).send(data);
          }
        });
      }
    }
  )
});

//notification to all
router.post('/notificationtoall', (req, res) => {
  let userData = req.body;
  console.log(req.body)
  console.log('hai')
  let user = new Notification(userData);
  console.log(userData)
var sendNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic NjExYjYxY2UtMGI1Yi00MjIxLTg1NmQtZGIxN2NiNmFhNDg1"
  };

  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };

  var https = require('https');
  var req = https.request(options, function(res) {
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });

  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(data));
  req.end();
};

var message = {
  app_id: "2670fedc-e8d7-41fa-bcbd-3e82b4ba8e08",
  headings:{"en": '' + userData.msgTile},
  contents: {"en": '' + userData.msgBody},
  included_segments: ["All"]
};

sendNotification(message);
res.status(200).send(message);
});
//notification for specific Users
router.post('/notificationospecificeusers', (req, res) => {
  let userData = req.body;
  console.log(req.body)
  console.log('hai')
  let user = new Notification(userData);
  console.log(userData)
var sendNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic NjExYjYxY2UtMGI1Yi00MjIxLTg1NmQtZGIxN2NiNmFhNDg1"
  };

  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };

  var https = require('https');
  var req = https.request(options, function(res) {
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });

  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(data));
  req.end();
};

var message = {
  app_id: "2670fedc-e8d7-41fa-bcbd-3e82b4ba8e08",
  headings:{"en": '' +userData.msgBodyone},
  contents: {"en": '' + userData.msgTileone},
  included_segments: [userData.msgCategory]
};
sendNotification(message);
console.log(message)
res.status(200).send(message);
});
//for post notifications
router.post('/notificationforpost', (req, res) => {
  let userData = req.body;
  let lat1 = userData.avlPlace.lat * 1.015;
  let lat2 = userData.avlPlace.lat / 1.03;
  let user = new Post(userData);
  console.log(userData)
var sendNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic NjExYjYxY2UtMGI1Yi00MjIxLTg1NmQtZGIxN2NiNmFhNDg1"
  };

  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };

  var https = require('https');
  var req = https.request(options, function(res) {
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });

  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(data));
  req.end();
};

var message = {
  app_id: "2670fedc-e8d7-41fa-bcbd-3e82b4ba8e08",
  headings:{"en": '' +'Hurry Up!'},
  contents: {"en":'' + 'Hi customer ' + 'a new ' + userData.name + ' product is posted under the '
  + userData.category + ' category by ' + userData.username + '. Available Place - '
  + userData.avlPlace.formatted_address + '. Quantity -' + userData.quantity + userData.qnty + '. Price - '
  + userData.price + '/' + userData.qnty },
  included_segments: ["All"]
};
sendNotification(message);
res.status(200).send(message);
});

//order request mail for admin
router.post('/sendorderrequest', (req, res) => {
  var server = email.server.connect({
    user: 'abishakshi1496@gmail.com',
    password: 'abiyuva14382',
    host: 'smtp.gmail.com',
    ssl: true
  });
  server.send(
    {
      text: 'You have signed up',
      from: 'abishakshi1496@gmail.com',
      to: 'abishakshi1496@gmail.com',
      subject: 'Buyer Order Request - Uzhavarsanthai',
      attachment: [
        {
          data:
          "<html><h6>Buyer Order Request</h6></html>" +
           "<html><h3> Request Number:</h3></html>"+ req.body.requestId +
           "<html><br></html>" +
           "<html><h3> Buyer Name :</h3></html>" + req.body.buyerName +
           "<html><br></html>" +
           "<html><h3>Buyer Phone :</h3></html>" + req.body.buyerPhone +
           "<html><br></html>" +
           "<html><h3>Buyer Address :</h3></html>" + req.body.buyerAddress +
           "<html><br></html>" +
           "<html><h3>Buyer City :</h3></html>" + req.body.buyerCity +
           "<html><br></html>" +
           "<html><h3>Buyer Query :</h3></html>" + req.body.description +
           "<html><br></html>" +
           "<html><h3>Buyer Urgency :</h3></html>" + req.body.urgency +
           "<html><br></html>" + "<html><hr></html>" +

           "<html><h5>Seller Details</h5></html>" +
           "<html><h3>Seller Name :</h3></html>" + req.body.sellerName +
           "<html><br></html>" +
           "<html><h3>Seller Phone :</h3></html>" + req.body.sellerPhone +
           "<html><br></html>" +
           "<html><h3>Seller Address :</h3></html>" + req.body.sellerAddress +
           "<html><br></html>" +
           "<html><h3>Seller City :</h3></html>" + req.body.sellerCity +
           "<html><br></html>" +
           "<html><h3>Product Available Place :</h3></html>" + req.body.prdctAvlplace,
          alternative: true
        }
        //  {path:"pathtofile.zip", type:"application/zip", name:"renamed.zip"}
      ]
    },
    function(err, message) {
      if (err) console.log(err);
      else res.json({ success: true, msg: 'sent', message });
      console.log(message);
    }
  );
});

//store order request
router.post('/storeorderrequest', (req, res) => {
  let orderData = req.body;
  let order = new Orderrequest(orderData);
  order.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(data);
    }
  });
});

//Get order request
router.get('/getorderrequest', (req, res) => {
  Orderrequest.find(function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  }).sort({date : -1});
});

//update order request
router.put('/updateorderrequest/:id', function(req, res) {
  Orderrequest.findByIdAndUpdate(
    req.params.id,
    {
      $set: { status: req.body.status
      }
    },
    {
      new: true
    },
    function(err, updatedOrder) {
      if (err) {
        res.send('Error updating blog');
      } else {
        res.json(updatedOrder);
      }
    }
  );
});

//Update order request
router.post('/orderReqPost/:id', function(req, res) {
  Post.find(
    {
      _id:req.params.id
    },
    async (err,result) =>{
      if(result.length > 0){
        await Post.update(
          {
            _id:req.params.id,
            'orderrequests.requestedPersonId': req.body.buyerId
          },
          {
            $set: {
              orderrequests: { orderStatus: req.body.orderStatus }
            }
          }
        )
          .then(() => {
            res.status(200).json({ message: 'Deleted successfully' });
          })
          .catch(err => {
            res.status(500).json({ message: 'Error occured' });
          });
      }
    }
  )
});

//send order request created msg to seller
router.post('/sendordersmstoseller',(req , res) => {
  let sellerMsgData = req.body;
  console.log(sellerMsgData);
  var options = {
        "method": "GET",
        "hostname": "api.msg91.com",
        "port": null,
        "path": "/api/sendhttp.php?route=4&sender=UZHAVA&mobiles="+sellerMsgData.sellerPhone+
        "&authkey=267433AasRmmBdVC5c8a1c2b&message=Hai%20"+
        sellerMsgData.sellerName+"%20!%20"+"Order%20Request%20No%20"+sellerMsgData.requestId+"%20" +sellerMsgData.buyerName+"%20wants%20to%20purchase%20your%20product.%20Our%20executive%20will%20contact%20you%20and%20provide%20additional%20information%20Thank%20You!&country=91",
        "headers": {}
      };
      var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
        });
      });

      req.end();

})
//send order request created msg to buyer
router.post('/sendbuyersmsUrl',(req , res) => {
  let sellerMsgData = req.body;
  console.log(sellerMsgData);
  var options = {
        "method": "GET",
        "hostname": "api.msg91.com",
        "port": null,
        "path": "/api/sendhttp.php?route=4&sender=UZHAVA&mobiles="+sellerMsgData.buyerPhone+
        "&authkey=267433AasRmmBdVC5c8a1c2b&message=Hai%20"+
        sellerMsgData.buyerName+"%20!%20"+"Your%20order%20request%20created%20successfully.%20Order%20Request%20No%20"+sellerMsgData.requestId+"%20Our%20executive%20will%20contact%20you%20and%20provide%20additional%20information%20Thank%20You!&country=91",
        "headers": {}
      };
      var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
        });
      });
      req.end();

})

// SMS to seller signup rqst
router.post('/sendSmsToSeller',(req , res) => {
  let signupData = req.body;

  var options = {
        "method": "GET",
        "hostname": "api.msg91.com",
        "port": null,
        "path": "/api/sendhttp.php?route=4&sender=UZHAVA&mobiles=" + signupData.phone + "&authkey=267433AasRmmBdVC5c8a1c2b&message=Hai!%20You%20have%20been%20activated%20successfully%20by%20Uzhavarsanthai.%20You%20can%20login%20now.%20Connect%20with%20us%20and%20Do%20The%20Miracles%20in%20Agriculture!!!&country=91",
        "headers": {}
      };

      var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
        });
      });

      req.end();

})

//map userId with POST
router.post('/mapuserpostUrl', function(req, res) {
  console.log(req.body);
  Post.find(
    {
      _id:req.body.requestedProductId
    },
    async (err,result) =>{
      if(result.length > 0){
        await Post.update(
          {
            _id:req.body.requestedProductId
          },
          {
            $push: {
            orderrequests:{
              requestedPersonId: req.body.requestedPersonId
            }
             }
          }
        )
        .then(() =>{
          res.status(200).json({ message: 'post id updated'});
        })
        .catch(err => {
          res.status(500).json({ message: 'Error occured' });
        });
      }
    }
  )
});

module.exports = router;
