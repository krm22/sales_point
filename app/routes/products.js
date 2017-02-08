
'use strict'

let ProductsController = require('../controllers/ProductsController')

module.exports = (app) => {
    // Create new controller
    let ctrl = new ProductsController();

    //GET (for READ)  method
    app.get('/products', (req, res, next) => {
        return ctrl.find(req, res, next)
    })

    //GET (for READ) method with request params id
    app.get('/products/:id', (req, res, next) => {
        return ctrl.findById(req, res, next)
    })

    //POST (for CREATE) method
    app.post('/products', (req, res, next) => {
        return ctrl.create(req, res, next)
    })

    app.post('/upload', (req, res, next) => {
        return ctrl.upload(req, res, next)
    })

    //PUT (for UPDATE) method with request params id
    app.put('/products/:id', (req, res, next) => {
        return ctrl.update(req, res, next)
    })

    //DELETE (for DELETE) method with request params id
    app.delete('/products/:id', (req, res, next) => {
        return ctrl.delete(req, res, next)
    })

}
