const express =require('express')

const router = express.Router()
const User = require('../models/user')

const mongoose = require('mongoose')
const db ="mongodb://user01:user01@ds023704.mlab.com:23704/farmersdb"

mongoose.connect(db, err=>{
    if(err){
        console.log('Error !' + err)
    }
    else{
        console.log('connected to mongoDB')
    }
})


router.get('/',(req,res)=>{
    res.send('From API route')
})


router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((error,registeredUser)=>{
        if(error){
            console.log(error)
        }else{
            //jwt 
            // let payload={subject:registeredUser._id}
            // let token =jwt.sign(payload,'secretKey')

            //before adding jwt
            res.status(200).send(registeredUser)

            //after add jwt
           //res.status(200).send({token})
        }
    })
})

router.post('/login',(req,res)=>{
    let userData = req.body

    User.findOne({phone: userData.phone},(error,user)=>{
        if(error){
            console.log(error)

        }else{
            if(!user){
                res.status(401).send('Invalid email')
               
            }else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid Password')
                }else{
                //add jwt
                // let payload={subject:user._id}
                // let token =jwt.sign(payload,'secretKey')

                    //before add jwt
                    res.status(200).send(user)

                    //after add jwt
                   // res.status(200).send({token})
                }
            }
        }
    })
})


router.get('/deals',(req,res)=>{
    let deals =[
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          }
    ]

    res.json(deals)
})

//verfify token verifies the token
router.get('/post',(req,res)=>{
    let deals =[
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          }
    ]

    res.json(deals)
})

module.exports = router;