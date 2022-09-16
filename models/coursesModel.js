'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

/**
 * Courses Schema
 */
var CoursesSchema = new Schema({
  coursename: {
    type: "String",
    required: true,
    trim: true
  },
  rate: {
    type: "number",
    required: true
  },
  duration: {
    type: "String",
    required: "true"
  },
  teacher: {
    type: "String",
    required: "true"
}
});

mongoose.model('Courses', CoursesSchema);
