'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

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
      department:{
        type: String,
        required: true
      },
     
    phonenumber : {
      type: Number,
      required: true  
      } 
    
  }
);

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

mongoose.model('User', UserSchema);