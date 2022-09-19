'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

/**
 * Admin Schema
 */
var AdminSchema = new Schema({
    email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
   hash_password:{
    type: String
    }
});

AdminSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };
  
  
  mongoose.model('Admin', AdminSchema);

