'use strict';
const express = require('express');
let router = express.Router();

module.exports = function (app) {


    var userHandlers = require('../controllers/userController.js');

    // todoList Routes
    app.route('/tasks')
        .get(userHandlers.loginRequired, userHandlers.profile);
    app.route('/auth/register')
        .post(userHandlers.register);//Post Method
    app.route('/auth/signin')
        .post(userHandlers.sign_in);
    app.route('/student/:id')
        .get(userHandlers.getById);
};

//Post Method
router.post('/post', (req, res) => {
    res.send('Post API')
});

//Get by ID Method
// router.get('/getOne/:id', (req, res) => {
//     res.send('Get by ID API')
// })
