'use strict';


const express = require('express');
let port = process.env.PORT || 3000;
let app = express();
const cors = require('cors');


let User = require('./models/userModel');
let Courses = require('./models/coursesModel');
let Admin = require('./models/adminModel');
let bodyParser = require('body-parser');
let jsonwebtoken = require("jsonwebtoken");

const mongoose = require('mongoose');
const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000
};

const mongoURI = process.env.MONGODB_URI;
mongoose.connect('mongodb://127.0.0.1:27017/project').then(function () {
  console.log('connected successfully')
}, function (err) {
  console.log('connection failed', err)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

// app.use(function (req, res, next) {
//   if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//     jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
//       if (err) req.user = undefined;
//       req.user = decode;
//       next();
//     });
//   } else if (req.originalUrl === "/auth/signin") {
//     next();
//   } else {
//     req.user = undefined;
//     next();
//   }
// });
var routes = require('./route/userRoute');
// var routes = require('./route/coursesRoute');
routes(app);
var courseRoutes = require('./route/coursesRoute');
courseRoutes(app);
var adminRoutes = require('./route/adminRoute');
adminRoutes(app);

// app.use(function (req, res) {
//   res.status(404).send({ url: req.originalUrl + ' not found' })
// });co

app.listen(port);

console.log(' RESTful API server started on: ' + port);

module.exports = app;