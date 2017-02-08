'use strict'

let Controller = require('./Controller')

const SALES = require('../models/sales-point')

class SalespointController extends Controller {

    constructor() {
        super(SALES)
    }
    find(req, res, next) {
        // Get all documents and filter with queries string (req.query : ex. http://domain.ext/api/?query=string)
        this.model
        .find(req.query.id)
        .populate('product')
        .exec((err, documents) => {
            res.json(documents)
        })
     }
     findById(req, res, next) {
       // Get all documents and filter with queries string (req.query : ex. http://domain.ext/api/?query=string)
       this.model
       .findById(req.params.id)
       .populate('product')
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
                .populate('Product')
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
              .populate('product')
              .exec((err, product) => {
                res.json(product)
              })
            }
        })
    }




}

module.exports = SalespointController
