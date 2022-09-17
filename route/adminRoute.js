'use strict';
const express = require('express');
let router = express.Router();

module.exports = function (app) {


    var adminHandlers = require('../controllers/adminController.js');

    // todoList Routes
    app.route('/auth/login')
        .post(adminHandlers.login);
    app.route('/students/') 
        .get(adminHandlers.getAll);  
    app.route('/add/course')
        .post(adminHandlers.addCourse);

};