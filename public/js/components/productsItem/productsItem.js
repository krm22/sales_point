((app) => {
    'use strict'
    app.component('productItem', {
        bindings: {
            editMode: "<"
        },
        templateUrl: 'js/components/productsItem/productsItem.html',
        controller: ['OwnersServices', 'ProductsServices', '$stateParams', '$state', function(OwnersServices, ProductsServices, $stateParams, $state) {

            let _previous = {}

            ProductsServices.getById($stateParams.id).then((res) => {
                // when this request receives response we affect response data to this controller variable post
                this.product = res.data;
            })

            ProductsServices.getOwner($stateParams.id).then((res) => {
                // when this request receives response we affect response data to this controller variable post
                this.owner = res.data;
            })


            // Call getCurrent() method from UsersService.
            // When this request receive response we affect response data to this controller variable user
            OwnersServices.getCurrent().then((res) => {
                this.owner = res.data
            }).catch((err) => {

            })



            this.edit = (product) => {
             if (product.editMode) {
                ProductsServices.edit(this.product).then((res) => {
                    product.editMode = false
                    this.product = res.data
                })
            } else {
                _previous[this.product._id] = angular.copy(product)
                 product.editMode = true
               }
             }

            // Create delete function.
            // If you want to use in view you can call with $ctrl.delete()
            this.delete = () => {
                // Call delete method form PostsService with post
                ProductsServices.delete(this.product).then((res) => {
                    // when this request receive response we change state to app.blog.list (redirection to list)
                    $state.go('product.list')
                })
            }

            // Create save function.
            // If you want to use in view you can call with $ctrl.save()


        }]
    })
})(require('angular').module('app.productsItem'))
