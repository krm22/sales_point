'use strict'
let OwnersController = require('../controllers/OwnersController')

module.exports = (app) => {
    // Create new controller
    let ctrl = new OwnersController();

    app.get('/owners', (req, res, next) => {
        return ctrl.find(req, res, next)
    })
    app.get('owners/:id', (req, res, next) => {
        return ctrl.findById(req, res, next)
    })
    app.post('/owners', (req, res, next) => {
        return ctrl.create(req, res, next)
    })

    app.put('owners/:id', (req, res, next) => {
        return ctrl.update(req, res, next)
    })
    app.delete('owners/:id', (req, res, next) => {
      return ctrl.delete(req, res, next)
    })

}
