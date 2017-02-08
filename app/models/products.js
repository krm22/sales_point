'use strict'
let mongoose = require('mongoose')

// Create du schema Post
module.exports = mongoose.model('Product', new mongoose.Schema({
  name: {
    type: String,
  },
  description:{
    type: String,
  },
  photo : {
    type: String,
  },
  price : {
    type: String,
  },
  owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner'
  }
},{
timestamps: true
}))
