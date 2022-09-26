'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
 var  bcrypt = require('bcrypt');
 var  User = mongoose.model('User');
 var Courses = mongoose.model('Courses');
const express = require('express');
const router = express.Router();
const Sequelize = require("sequelize");

// get courses list
exports.getAll = function (req, res, next) {

  Courses.find({}, (err, courses)=> {
    if (err) {
        res.send({ "message": "error happened" });
    } else {
      res.send(courses);
    }
    })
  };

  //update courses list
  exports.update = function (req, res, next) {

  }

  exports.update = function (req, res, next) {
    const id = req.params.id;
      if (id) {
        console.log(req.body);
        Courses.findByIdAndUpdate( id , req.body, (err,result) => {
        if(err){
          res.send(err);
      } 
      else {
        console.log(result)
        res.send(result);
      }
      })
    }
  };
    

  

  

