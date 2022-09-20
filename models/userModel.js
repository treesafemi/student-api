'use strict';

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
 var bcrypt = require('bcrypt');
 var Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  fullname: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
   hash_password:{
    type: String
  },
    gender:{
      type: String,
      required: true
    } ,
      nationality:{
        type: String,
        required: true
      },
     
    phonenumber : {
      type: Number,
      required: true  
      },
      
      role: {
        type: String,
        enum: ['admin', 'Student']
      },
      addCourses: [{type: Schema.Types.ObjectId, ref: 'Courses'}]
      
    
  }
);

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};
// paginate with this plugin
UserSchema.plugin(mongoosePaginate);


mongoose.model('User', UserSchema);