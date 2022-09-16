'use strict';

var mongoose = require('mongoose'),
  Courses = mongoose.model('Courses');
const express = require('express');
const router = express.Router();

exports.getAll = function (req, res, next) {
    if (req.user) {
      next();
    } else {
  
      return res.status(401).json({ message: 'Unauthorized user!!' });
    }
  };


  

