'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken');
   var bcrypt = require('bcrypt');
  var  User = mongoose.model('User');
  var Courses = mongoose.model('Courses');
const express = require('express');
const router = express.Router();

// student register
exports.register = function (req, res) {
  console.log("req", req.body)
  var newUser = new User(req.body);
  // newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function (err, user) {
    if (err) {
      console.log("error", err)
      return res.status(400).send({
        message: err
      });
    } else {
      // user.hash_password = undefined;
      return res.status(200).send(user);
    }
  });
};

// student sign_in
exports.sign_in = function (req, res) {
  console.log("req", req.body)
  User.findOne({
    email: req.body.email,
    hash_password: req.body.hash_password
  }, function (err, user) {
    console.log("user", err)
    if (err) {
      return res.status(401).json({ message: err });
    }
    if (!user)  {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    } else {
      return res.json({ user,token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
    }
  });
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};
exports.profile = function (req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  }
  else {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// get student profile using getById
exports.getById = function (req, res, next) {
  if (req.params.id) {
    User.findById(req.params.id, function (err, user) {
      res.send(user);
    })
  }
  else {
    return res.status(401).json({ message: 'Invalid id' });
  }
};

// student profile update
exports.update = async (req, res, next) => {
  const id = req.params.ids;
  if (id) {
    User.findByIdAndUpdate(id, req.body,(err,result)=> {
      if (err) {
        res.send(err)
      }
      else{
        console.log(result)
      res.send(result)
      }
    })
  }
};
    
  
  
// router.get('/getOne/:id', async (req, res) => {
//   console.log(res)
//   try {
//     const data = await Model.findById(req.params.id);
//     res.json(data)
//   }
//   catch (error) {
//     res.status(401).json({ message: error.message })
//   }
// });



exports.addCourses = (req, res, next) => {
  const id =  req.params.id

  const courseId = req.body.course_id
    if (id && courseId) {
      User.findByIdAndUpdate(id, {$push: { addCourses: courseId } }, (err, updateUser) => {
        if(err)
        res.send({ "error": err})
        else 
         res.send({ status: "updated", user: updateUser })
      })
      
    } 
    else {
      res.send({" error": "field are empty!" })
    }
  };
     
      
       
    
  

