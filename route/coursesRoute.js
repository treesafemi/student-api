'use strict';
const express = require('express');
let router = express.Router();

module.exports = function (app) {


    var coursesHandlers = require('../controllers/coursesController.js');

    // todoList Routes
    app.route('/course/') 
        .get(coursesHandlers.getAll);
};