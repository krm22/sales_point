
((app) => {
    'use strict'

    app.service('SalespointServices', function($http) {
        return {
            get() {
                return $http.get('/api/sales-points')
            },
            getById(id) {
                return $http.get('/api/sales-points/' + id)
            },
            add(salespoint) {
                return $http.post('/api/sales-points', salespoint)
            },
            getUniq() {
                return $http.get('/api/owners')
            },

            getOwner(owner) {
                return $http.get('/api/owners', owner)
            },

            save(salespoint) {

                if (salespoint._id) {
                    // HTTP Request method PUT (update) with param and data (post) to our express API
                    return $http.put('/api/sales-points/' + salespoint._id, salespoint)
                } else {
                    // HTTP Request method POST (create) with data (post) to our express API
                    return $http.post('/api/sales-points', salespoint)
                }
            },
            edit(salespoint) {
                return $http.put('/api/sales-points/' + salespoint._id, salespoint)
            },
            delete(salespoint) {
                return $http.delete('/api/sales-points/' + salespoint._id)
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
                                reject()
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
                return $http.get('/api/sales-points', {
                    params: filtre
                })
            }
        }
    })
})(angular.module('app.services'))
