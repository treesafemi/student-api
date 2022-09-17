'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  Admin = mongoose.model('Admin');
const express = require('express');
const router = express.Router();

exports.login = function (req, res) {
    console.log("req", req.body)
    Admin.findOne({
      email: req.body.email
    }, function (err, admin) {
      console.log("admin", err)
      if (err) {
        return res.status(401).json({ message: err });
      }
      if (!admin|| admin.hash_password != req.body.password) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      } else {
        return res.json({ token: jwt.sign({ email: admin.email,}, 'RESTFULAPIs') });
      }
    });
  };

  
exports.getAll = function (req, res, next) {

    Students.find({}, (err, Students)=> {
      if (err) {
          res.send({ "message": "error happened" });
      } else {
        res.send(Students);
      }
      })
    };
  
    exports.update = function (req, res, next) {
  
    }

    exports.addCourse = function (req, res) {
        console.log("req", req.body)
        var newCourse = new Course(req.body);
        
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