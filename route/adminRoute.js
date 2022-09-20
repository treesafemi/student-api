'use strict';
const express = require('express');
let router = express.Router();

module.exports = function (app) {


    var adminHandlers = require('../controllers/adminController.js');

    // todoList Routes
    app.route('/admin/login')
        .post(adminHandlers.login);
    app.route('/students/') 
        .get(adminHandlers.getAll); 
    app.route('/courses/') 
        .get(adminHandlers.getAllCourses);
    app.route('/add/course')
        .post(adminHandlers.addCourse);
    app.route('/getcounts/') 
        .get(adminHandlers.getCounts); 
     app.route('/users/paginate/')
        .post(adminHandlers.paginatedStudents);
     app.route('/courses/paginate/')
        .post(adminHandlers.paginatedCourses);

};