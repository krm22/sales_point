
'use strict'
// Require parent class
let Controller = require('./Controller');
let formidable = require('formidable'),
fs = require('fs')

const PRODUCT = require('../models/products')

class ProductsController extends Controller {

    constructor() {
      // Call parent constructor with model param
      super(PRODUCT)
    }
    find(req, res, next) {
        // Get all documents and filter with queries string (req.query : ex. http://domain.ext/api/?query=string)
        this.model
        .find(req.query.id)
        .populate('owner')
        .exec((err, documents) => {
            res.json(documents)
        })
     }
     findById(req, res, next) {
       // Get all documents and filter with queries string (req.query : ex. http://domain.ext/api/?query=string)
       this.model
       .findById(req.params.id)
       .populate('owner')
       .exec((err, documents) => {
           res.json(documents)
       })
    }

    create(req, res, next) {
        // Create a document with data from body request (req.body)
        this.model.create(req.body, (err, document) => {
            if (err) {
                next(err)
            } else {
                this.model
                .findById(document._id, {
                  password: 0
                })
                .populate('Owner')
                .exec((err, product) => {

                  res.json(product)
                })
              }
            })
          }

       update(req, res, next) {
        // Update a document by request param, this param needs to be the id with the data from body request (req.body)
        this.model.update({
            _id: req.params.id
        }, req.body, (err) => {
            if (err) {
                next(err)
            } else {
              this.model
              .findById(req.params.id, {
                password: 0
              })
              .populate('owner')
              .exec((err, product) => {
                res.json(product)
              })
            }
        })
    }
     upload(req, res, next) {
          // parse a file upload
          let form = new formidable.IncomingForm();

          form.uploadDir = './public/static/img/'

          if (!fs.existsSync(form.uploadDir)) fs.mkdirSync(form.uploadDir)

          form.on('file', (field, file) => {
                  fs.rename(file.path, form.uploadDir + file.name)
              })
              .on('end', () => {
                  console.log("uploaded")
                  res.sendStatus(200)
              })

          form.parse(req)
      }

}

module.exports = ProductsController
