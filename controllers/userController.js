'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
var Courses = mongoose.model('Courses');
const express = require('express');
const router = express.Router();

// student register
exports.register = async function (req, res) {
  var newUser = new User(req.body);
  // newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  const userEmail = await User.findOne({ email: req.body.email });
  console.log("req", userEmail)
  if (userEmail && Object.keys(userEmail).length > 0) {
    return res.status(401).send({
      message: 'Email already exist'
    });
  } else {
    newUser.save(async function (err, user) {
      if (err) {
        console.log("error", err)
        return res.status(400).send({
          message: err
        });
      } else {
        return res.status(200).send(user);
      }
    }
    )
  }
}

// student sign_in
exports.sign_in = function (req, res) {
  // let returndata = {}
  console.log("req", req.body)
  User.findOne({
    email: req.body.email,
    hash_password: req.body.hash_password
  }, function (err, useres) {
    console.log(useres, err)
    if (err) {
      return res.status(401).json({ message: err });
    }
    if (!useres) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    } else {
      console.log(useres,"****")
      var UserPromise = Promise.all(useres.addCourses.map(function (row) {
       return Courses.findOne({ "_id": mongoose.Types.ObjectId(row), "ActiveStatus": true })
      }))
      console.log(UserPromise, "poo")
      UserPromise.then(function (result) {
        var coursename = {};
        coursename.Courses = result;
        let returndata = {
          addCourses: coursename,
          userdata: useres
        }
        useres.status = (err,null)
        console.log(returndata)
        return res.json({ returndata, token: jwt.sign({ email: useres.email, fullName: useres.fullName, _id: useres._id }, 'RESTFULAPIs') });

      }) 
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
    User.findByIdAndUpdate(id, req.body, (err, result) => {
      if (err) {
        res.send(err)
      }
      else {
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



exports.addCourses = async(req, res, next) => {
  const id = req.params.id

  const courseId = req.body.course_id
  console.log("hello", id, courseId)
  const  userCourse= await User.findOne({"_id": id, addCourses: courseId });
  console.log("req", userCourse)
  if (userCourse ) {
    return res.status(401).send({
      message: 'Course already exist'
    });
  }
    else{
        
  if (id && courseId) {
    User.findByIdAndUpdate(id, { $push: { addCourses: courseId } }, (err, updateUser) => {
      if (err)
        res.send({ "error": err })
      else
        res.send({ status: "updated", user: updateUser })
    })

  }
  else {
    res.send({ " error": "field are empty!" })
  }
}
};

exports.courseslist = function (req, res, next) {
  if (req.params.id) {
    User.findById(req.params.id, function (err, useres) {
      //res.send(useres);
      console.log(useres)
      {
        var UserPromise = Promise.all(useres.addCourses.map(function (row) {
          return Courses.findOne({ "_id": mongoose.Types.ObjectId(row)})
         }))
         console.log(UserPromise, "poo")
         UserPromise.then(function (result) {
           var coursename = {};
           coursename.Courses = result;
           let returndata = {
             addCourses: coursename,
           
           }
          //useres.status = (err,null)
           console.log(returndata)
           return res.json({ returndata  });
   
         }) 
       }
   
     })
    }
  };





