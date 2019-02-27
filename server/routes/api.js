const express =require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Post = require('../models/post')
const Category = require('../models/category')
const Blog = require('../models/blog')
const Contact = require('../models/contact');
const mongoose = require('mongoose')
var multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const db = 'mongodb://user01:user01@ds023704.mlab.com:23704/farmersdb';

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
  let userData = req.body;
  let user = new User(userData);

  User.findOne({ phone: userData.phone }, (err, exuser) => {
    if (exuser == null) {
      user.save((error, registeredUser) => {
        if (error) {
          console.log(error);
        } else {
          //jwt
          let payload = { subject: registeredUser._id };
          let token = jwt.sign(payload, 'secretKey');

          //before adding jwt
          // res.status(200).send(registeredUser)

          //after add jwt
          //console.log(payload)
          res.status(200).send({ token, payload, user });
        }
      });
    } else {
      res.status(401).send('Number already exist');
    }
  });
});

//postdeals

router.post('/post', (req, res) => {
  let userData = req.body;
  let user = new Post(userData);
  user.save((error, productData) => {
    if (error) {
      console.log(error);
    } else {
      //jwt
      //  let payload={subject:productData._id}
      //  let token =jwt.sign(payload,'secretKey')
      //before adding jwt

      res.status(200).send(productData);

      //after add jwt
      //    res.status(200).send({token})
    }
  });
});

//admin

router.post('/category',(req,res)=>{
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
    })
})

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
      text: 'You have signed up',
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

router.post('/login', (req, res) => {
  let userData = req.body;

  User.findOne({ phone: userData.phone }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send('Invalid Phone Number');
      } else {
        if (user.password !== userData.password) {
          res.status(401).send('Invalid Password');
        } else {
          //add jwt
          let payload = { subject: user._id };
          let token = jwt.sign(payload, 'secretKey');
          //before add jwt
          // res.status(200).send(user)

          //after add jwt

          res.status(200).send({ token, payload, user });
        }
      }
    }
  });
});

router.get('/deals', (req, res) => {
  Post.find(function(err, result) {
    if (err) {
      // console.log('no data1')
      console.log(err);
    } else {
      res.send(result);
    }
  });
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
  // console.log('Update a user');
  // console.log(req.body)
  //let userData = req.body
  // let User = new User(userData)
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
  // console.log(req.body)

  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstname: req.body.firstname,
        lastName: req.body.lastName,
        gender: req.body.gender,
        address: req.body.address
      }
    },
    {
      new: true
    },
    function(err, updatedUser) {
      if (err) {
        res.send('Error updating userprofile');
      } else {
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
router.put('/admin-user/deactive/:id', function(req, res) {
  // console.log('Update a user');
  // console.log(req.body)
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: { status: 'DEACTIVE' }
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
router.put('/admin-user/active/:id', function(req, res) {
  //console.log('Update a user');
  // console.log(req.body)
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: { status: 'ACTIVE' }
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

module.exports = router;
