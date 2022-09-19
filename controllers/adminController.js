'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = mongoose.model('User'),
  Courses = mongoose.model('Courses'),
  Admin = mongoose.model('Admin');
const express = require('express');
const router = express.Router();

// admin login
exports.login = function (req, res) {
    console.log("req", req.body)
    Admin.findOne({
      email: req.body.email,
      hash_password: req.body.hash_password
    }, function (err, admin) {
      console.log("admin", err)
      if (err) {
        return res.status(401).json({ message: err });
      }
      
        return res.json({admin, token: jwt.sign({ email: admin.email,}, 'RESTFULAPIs') });
      
    });
  };

 // students list 
exports.getAll = function (req, res, next) {

    User.find({}, (err, Students)=> {
      if (err) {
          res.send({ "message": "error happened" });
      } else {
        res.send(Students);
      }
      })
    };
  
    exports.update = function (req, res, next) {
  
    };

    // courses list
    exports.getAllCourses = function (req, res, next) {

      Courses.find({}, (err, Courses)=> {
        if (err) {
            res.send({ "message": "error happened" });
        } else {
          res.send(Courses);
        }
        })
      };
    
      exports.update = function (req, res, next) {
    
      }

      // addCourse
    exports.addCourse = function (req, res) {
        console.log("req", req.body)
        var newCourse = new Courses(req.body);
        
        newCourse.save(function (err, user) {
          if (err) {
            console.log("error", err)
            return res.status(400).send({
              message: err
            });
          } else {
            
            return res.status(200).send('some text');
          }
        });
      };

      // get count of students ,courses
      exports.getCounts = (req, res,next) =>  {
        let studentCount = 0;
        let courseCount = 0;

        User.countDocuments({}, (err, count) => {
          if (!err)
          studentCount = count;
        })

        Courses.countDocuments({}, (err, count) => {
          if(!err)
          courseCount = count;
        })

        res.status(200).send({ studentCount, courseCount });
      };