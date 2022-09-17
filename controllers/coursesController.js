'use strict';

var mongoose = require('mongoose'),
  Courses = mongoose.model('Courses');
const express = require('express');
const router = express.Router();

exports.getAll = function (req, res, next) {

  Courses.find({}, (err, courses)=> {
    if (err) {
        res.send({ "message": "error happened" });
    } else {
      res.send(courses);
    }
    })
  };

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
    

  

  

