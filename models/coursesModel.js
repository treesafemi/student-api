'use strict';

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
 var bcrypt = require('bcrypt');
 var Schema = mongoose.Schema;

/**
 * Courses Schema
 */
var CoursesSchema = new Schema({
  course_name: {
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

// paginate with this plugin
CoursesSchema.plugin(mongoosePaginate);


mongoose.model('Courses', CoursesSchema);
