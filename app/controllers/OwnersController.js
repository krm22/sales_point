'use strict'

let Controller = require('./Controller')
let formidable = require('formidable')

let fs = require('fs')

const OWNER = require('../models/owner')

class OwnersController extends Controller {

    constructor() {
        super(OWNER)
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

module.exports = OwnersController
