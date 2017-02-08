'use strict'
let mongoose = require('mongoose');
module.exports = mongoose.model('Owner', new mongoose.Schema({

    firstname: {
      type: String
    },
    lastname:{
      type: String
    },
    password: {
      type: String
   },
    avatar:{
      type: String
   }
 },{
    timestamps: true
}))
