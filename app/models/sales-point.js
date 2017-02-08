'use strict'
let mongoose = require('mongoose')

// Create du schema Post
module.exports = mongoose.model('Salespoint', new mongoose.Schema({
    name: {
        type: String,
    },
    coordinates: {
        type: String,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true
}))
