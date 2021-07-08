const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

require('../db/conn');
const User = require("../model/userschema");

router.get('/',(req,res) => {
    res.send(`hello auth`);

});

/* using promises
router.post('/register',(req, res) => {

    const {name,email,phone,work,password,cpassword} = req.body;
    
    if(!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({error: " please fill the field"});
    }

    User.findOne({email:email})
    .then((userExist) => {
        if(userExist){
            return res.status(422).json({error: "Email already Exist"});

        }
        const user = new User({name,email,phone,work,password,cpassword});

        user.save().then(() => {
            res.status(201).json({message: "user registered successfuly"});
        }).catch((err) => {
            res.status(500).json({ error: "Failed to registered"});
        })
    }).catch(err => {console.log(err); });
});*/

//using async

router.post('/register', async (req, res) => {

    const {name,email,phone,work,password,cpassword} = req.body;
    
    if(!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({error: " please fill the field"});
    }

    try {

    const userExist = await User.findOne({email:email});
    
        if(userExist){
            return res.status(422).json({error: "Email already Exist"});

        }else if (password != cpassword){
            return res.status(422).json({error: "password is not matching"});

        }else {

            const user = new User({name,email,phone,work,password,cpassword});
        
            const userRegister = await user.save();

                if (userRegister) {

                res.status(201).json({message: "user registered successfuly"});

        }

        }
        


    } catch (err) {
        console.log(err);

    }
    });

    //login
    router.post('/signin', async (req, res) => {
       try{

        

           const {email, password} = req.body;

           if(!email || !password) {
               return res.status(400).json({error: "please fill the data"})

           }

           const userLogin = await User.findOne({email:email});

          // console.log(userLogin);
          

          if (userLogin){


            const isMatch = await bcrypt.compare(password, userLogin.password);

            let token = await userLogin.generateAuthToken();
            console.log(token);
            console.log('token return');
            /*
             res.cookie('jwtoken', token , {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true*/

           if(!isMatch) {
            res.status(400).json({error:"Invalid user"});
           }else{
            res.json({message:"user signin successfully"});
               
           }


          }else{
            res.status(400).json({error:"Invalid user"});
              
          }


       } catch (err) {
           console.log(err);


       }
    });



    module.exports = router ;