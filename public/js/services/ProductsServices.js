((app) => {
    'use strict'
    app.service('ProductsServices', function($http) {
        return {
            get() {
                return $http.get('/api/products')
            },
            getById(id) {
                return $http.get('/api/products/' + id)
            },
            add(product) {
                return $http.post('/api/products', product)
            },
            getUniq() {
                return $http.get('/api/owners')
            },

            getOwner(owner) {
                return $http.get('/api/owners', owner)
            },

            save(product) {

                if (product._id) {
                    // HTTP Request method PUT (update) with param and data (post) to our express API
                    return $http.put('/api/products/' + product._id, product)
                } else {
                    // HTTP Request method POST (create) with data (post) to our express API
                    return $http.post('/api/products', product)
                }
            },
            edit(product) {
                return $http.put('/api/products/' + product._id, product)
            },
            delete(product) {
                return $http.delete('/api/products/' + product._id)
            },

            upload(image) {
                return new Promise((resolve, reject) => {
                    let url = '/api/upload'
                    let xhr = new XMLHttpRequest()
                    let fd = new FormData()
                    xhr.open("POST", url, true);
                    //  xhr.setRequestHeader("Authorization", $cookies.get('token'));
                    xhr.onreadystatechange = function(e) {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                resolve()
                            } else {
                              
                            }
                        }
                    };
                    fd.append('file', image)
                    xhr.send(fd)
                })
            },
            filter(filtre) {
                if (!filtre.name)
                    delete filtre.name
                return $http.get('/api/products', {
                    params: filtre
                })
            }
        }
    })
})(angular.module('app.services'))
