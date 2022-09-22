'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt'),
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

    return res.json({ admin, token: jwt.sign({ email: admin.email, }, 'RESTFULAPIs') });

  });
};

// students list 
exports.getAll = function (req, res, next) {

  User.find({}, (err, Students) => {
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

  Courses.find({}, (err, Courses) => {
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

      return res.status(200).send(user);
    }
  });
};


// get count of students 

exports.Scounts = async (req, res) => {
  try {

    let data = await User.count();
    res.send({ data });
  }
  catch (err) {
    console.log(err);
    return res.status(501).json(err);
  }
};

// get count of courses

exports.Ccounts = async (req, res) => {
  try {

    let data = await Courses.count();
    console.log(data)
    res.send({ data });
  }
  catch (err) {
    console.log(err);
    return res.status(501).json(err);
  }
};

//search and pagination

exports.paginatedStudents = async (req, res) => {
  // HMSLogger.log("students list : get students list" + JSON.stringify(req));
  console.log(req.body)
  try {
    var dataFrom, dataTo;
    var query = {}
    var sortingvalue, sortingparam;
    var limitcount = 0;
    var start = 0;

    if (req.body.SortingOrder == 'Ascending' || req.body.SortingOrder == undefined) {
      sortingvalue = 1
    } else {
      sortingvalue = -1
    }

    if (req.body.SortBy) {
      sortingparam = req.body.SortBy
    } else {
      sortingparam = "fullname"
    }

    if (req.body.limit != undefined) {
      limitcount = Number(req.body.limit);
    } else {
      limitcount = 3;
    }
    if (req.body.start != undefined) {
      start = Number(req.body.start);
    } else {
      start = 0;
    }
    var sortobj = {};
    sortobj[sortingparam] = sortingvalue
    var options = {
      page: 1,
      select: {},
      offset: start,
      limit: limitcount,
      sort: sortobj

    };
    if (req.body.SearchParam && req.body.SearchType && req.body.SearchType != "") {
      if (req.body.SearchType == 'fullname') {
        query[req.body.SearchType] = { $regex: req.body.SearchParam, $options: 'i' }
      } else {
        query[req.body.SearchType] = req.body.SearchParam
      }
    }

    console.log('query', query)
    // HMSLogger.log(query);
    //query['role']='Student';
    User.paginate(query, options, function (err, result) {
      console.log(result)
      //   userModel.aggregatePaginate
      // .then( students=>  {
      if (result) {
        console.log(result)
        return res.status(200).send(result);
      }
      console.log("henbllo2", err)
      //     // HMSLogger.log(students);
      //     res.status(null, students);

      // }).catch(err => {
      //     // HMSLogger.log("Error in fecthing  students DAO" + err);
      //     res.status(err, null);
      //     return;
      // })
    })
  } catch (error) {
    console.log(err, '==========')
    // HMSLogger.log("Error in get students list---" + error);
    res.status(error, null);
    return;

  }
};



exports.paginatedCourses = async (req, res) => {
  // HMSLogger.log("students list : get courses list" + JSON.stringify(req));
  console.log(req.body)
  try {
    console.log("hello1")
    var dataFrom, dataTo;
    var query = {}
    var sortingvalue, sortingparam;
    var limitcount = 0;
    var start = 0;

    if (req.body.SortingOrder == 'Ascending' || req.body.SortingOrder == undefined) {
      sortingvalue = 1
    } else {
      sortingvalue = -1
    }

    if (req.body.SortBy) {
      sortingparam = req.body.SortBy
    } else {
      sortingparam = "coursename"
    }

    if (req.body.limit != undefined) {
      limitcount = Number(req.body.limit);
    } else {
      limitcount = 3;
    }
    if (req.body.start != undefined) {
      start = Number(req.body.start);
    } else {
      start = 0;
    }
    var sortobj = {};
    sortobj[sortingparam] = sortingvalue
    var options = {
      page: 1,
      select: {},
      offset: start,
      limit: limitcount,
      sort: sortobj

    };

    if (req.body.SearchParam && req.body.SearchType && req.body.SearchType != "") {
      // if (req.body.SearchType == 'coursename') {
      query[req.body.SearchType] = { $regex: req.body.SearchParam, $options: 'i' }
    }
    else {
      query[req.body.SearchType] = req.body.SearchParam

    }
    // console.log('err')
    console.log(query);
    Courses.paginate(query, options, function (err, result) {
      if (result) {
        // console.log(result)
        return res.status(200).send(result);
      }
      //   coursesModel.aggregatePaginate
      // .then( courses=>  {
      // if (result) {
      //   console.log(result)

      // }
      // console.log("henbllo2", err)
      //     // HMSLogger.log(courses);
      //     res.status(null, courses);

      // }).catch(err => {
      //     // HMSLogger.log("Error in fecthing  courses DAO" + err);
      //     res.status(err, null);
      //     return;
      // })
    })
  } catch (error) {
    // HMSLogger.log("Error in get courses list---" + error);
    res.status(error, null);
    return;

  }
};
