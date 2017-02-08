((app) => {
    'use strict'
    app.component('navbar', {
        templateUrl: 'js/components/common/navbar.html',
        controller: [ 'ProductsServices','OwnersServices', '$state', function( ProductsServices, OwnersServices, $state) {
            angular.extend(this, {
                $onInit() {
                    OwnersServices.getCurrent().then((user) => {
                        this.user = user
                    }).catch((err) => {

                    })
                },
                disconnect() {
                    OwnersServices.disconnect().then(() => {
                        Materialize.toast('Disconnected', 4000, 'toast-warning')
                        this.user = null
                        $state.reload()
                    })
                }
            })
        }]
    })
})(require('angular').module('app.common'))
